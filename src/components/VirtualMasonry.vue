<template>
  <div class="masonry-container" ref="container" :style="containerStyle">
    <div
      class="masonry-item"
      v-for="item in displayItems"
      :key="item._masonryIndex"
      :style="{
        width: `${colWidth}px`,
        height: `${positionMap[item._masonryIndex].height}px`,
        top: `${positionMap[item._masonryIndex].top}px`,
        left: `${positionMap[item._masonryIndex].left}px`
      }"
    >
      <slot
        :data="item"
        :position="{
          ...positionMap[item._masonryIndex],
          colWidth
        }"
      >
      </slot>
    </div>
  </div>
</template>

<script>
import config from "../config";

const GROUP_SIZE = 500;

export default {
  props: {
    itemHeightGetter: {
      type: Function,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    colWidth: {
      type: Number,
      required: true
    },
    col: {
      type: Number,
      default: 0
    },
    gap: {
      type: Number,
      default: 16
    },
    fit: {
      type: Boolean,
      default: false
    },
    rowsPerSection: {
      type: Number,
      default: 3
    },
    groupSize: {
      type: Number,
      default: GROUP_SIZE
    }
  },
  data() {
    return {
      positionMap: {},
      widthStore: {},
      heightStore: {},
      group: {},
      inGroup: {},
      sections: [{}],
      sectionsIdx: 0,
      displayItems: [],
      storedItemsLength: 0,
      currentSectionCount: 0,
      containerWidth: 0,
      maxHeight: 0,
      screenWidth: document.documentElement.clientWidth,
      screenHeight: document.documentElement.clientHeight,
      scrollTop: document.documentElement.scrollTop,
      containerOffset: 0,
      additionalDistance: config.options.additionalDistance
    };
  },
  computed: {
    columns() {
      if (this.col) {
        return this.col;
      } else {
        return Math.floor(
          (this.containerWidth + this.gap) / (this.colWidth + this.gap)
        );
      }
    },
    containerFitWidth() {
      return this.col * this.colWidth + (this.col - 1) * this.gap;
    },
    containerStyle() {
      const width = this.fit && this.col ? `${this.containerFitWidth}px` : null;
      const height = `${this.maxHeight || 0}px`;
      return {
        width,
        height
      };
    }
  },
  watch: {
    items: "itemsChanged",
    columns: "columnsChanged",
    colWidth: "colWidthChanged",
    screenWidth(value) {
      if (this.resizeTimer) {
        clearTimeout(this.resizeTimer);
      }
      this.resizeTimer = setTimeout(() => {
        this.screenWidthChanged(value);
      }, 300);
    }
  },
  created() {
    this.resetWidthStore();
    this.resetHeightStore();
    this.resetPositionMap();
    window.addEventListener("resize", this.handleWindowResize);
    window.addEventListener("scroll", this.handleScroll, {
      passive: true
    });
  },
  mounted() {
    this.containerWidth = this.getContainerWidth();
    this.containerOffset = this.getContainerOffset();
    this.renderMasonry();
  },
  updated() {
    this.containerWidth = this.getContainerWidth();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleWindowResize);
    window.removeEventListener("scroll", this.handleScroll, {
      passive: true
    });
  },
  methods: {
    // waterfall container
    getContainerWidth() {
      if (this.fit && this.col) {
        return this.containerFitWidth;
      }
      if (this.$refs.container) {
        return this.$refs.container.offsetWidth;
      } else {
        return 0;
      }
    },
    getContainerOffset() {
      if (!this.$refs.container) {
        return;
      }
      const bodyRect = document.documentElement.getBoundingClientRect();
      const elRect = this.$refs.container.getBoundingClientRect();
      return elRect.top - bodyRect.top;
    },
    // waterfall items
    itemsChanged() {
      if (this.items.length <= this.storedItemsLength) {
        this.renderMasonry();
      } else {
        this.computePosition();
        this.setMaxHeight();
        this.setDisplay();
      }
      this.storedItemsLength = this.items.length;
    },
    columnsChanged() {
      this.renderMasonry();
    },
    colWidthChanged() {
      this.renderMasonry();
    },
    screenWidthChanged() {
      this.containerWidth = this.getContainerWidth();
    },
    renderMasonry() {
      this.resetGroup();
      this.resetSections();
      this.resetWidthStore();
      this.resetHeightStore();
      this.resetPositionMap();
      this.setMaxHeight();
      this.setDisplay();
    },
    setDisplay() {
      const countPerSection = this.rowsPerSection * this.columns;
      const showCondHead = this.scrollTop - this.additionalDistance;
      const showCondTail =
        this.scrollTop + this.screenHeight + this.additionalDistance;
      const start = Math.floor(showCondHead / this.groupSize);
      const end = Math.floor(showCondTail / this.groupSize);

      let list = [];
      let inList = {};

      for (let i = start; i <= end; i++) {
        if (!this.group[i]) {
          continue;
        }
        this.group[i].forEach(idx => {
          if (inList[idx]) {
            return;
          }
          list = list.concat(
            this.items.slice(idx * countPerSection, (idx + 1) * countPerSection)
          );
          inList[idx] = true;
        });
      }

      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(() => {
          this.displayItems = list;
          this.$forceUpdate();
        });
      } else {
        this.displayItems = list;
        this.$forceUpdate();
      }
    },
    resetWidthStore() {
      this.widthStore = {};
      for (let i = 0; i < this.columns; i++) {
        this.widthStore[i] = (this.colWidth + this.gap) * i;
      }
    },
    resetHeightStore() {
      this.heightStore = {};
      for (let i = 0; i < this.columns; i++) {
        this.heightStore[i] = 0;
      }
    },
    resetPositionMap() {
      this.positionMap = {};
      this.computePosition();
    },
    resetGroup() {
      this.group = {};
      this.inGroup = {};
    },
    resetSections() {
      this.sections = [{}];
      this.currentSectionCount = 0;
    },
    computePosition() {
      if (!this.widthStore || !this.heightStore || !this.columns) {
        return;
      }
      const countPerSection = this.columns * this.rowsPerSection;
      this.items.forEach((item, index) => {
        // ignore computed
        const mapKey = index;
        item._masonryIndex = index;
        if (this.positionMap[mapKey]) {
          return;
        }
        this.$set(this.positionMap, mapKey, {});
        // compute load height
        const h = this.itemHeightGetter(item);
        this.$set(this.positionMap[mapKey], "height", h);
        // compute position
        let left;
        let top;
        let storeIdx;
        if (index < this.columns) {
          left = this.widthStore[index];
          top = 0;
          storeIdx = index;
        } else {
          const minHeightIdx = this.getMinHeightCol();
          left = this.widthStore[minHeightIdx];
          top = this.heightStore[minHeightIdx];
          storeIdx = minHeightIdx;
        }
        // check section count
        if (this.currentSectionCount < countPerSection) {
          this.currentSectionCount += 1;
        } else {
          this.currentSectionCount = 1;
          this.sections.push({});
        }
        // set position
        this.$set(this.positionMap[mapKey], "left", left);
        this.$set(this.positionMap[mapKey], "top", top);
        this.heightStore[storeIdx] += h + this.gap;
        // console.log('index', index, 'top', top);
        // console.log('heightStore', this.heightStore);
        // set position to section
        const sectionIdx = this.sections.length - 1;
        // console.log('sectionIdx', sectionIdx);
        const { head, tail } = this.sections[sectionIdx];
        if (typeof head === "undefined" || top < head) {
          this.sections[sectionIdx].head = top;
        }
        const bottom = top + h;
        if (typeof tail === "undefined" || bottom > tail) {
          this.sections[sectionIdx].tail = bottom;
        }
      });
      this.sections.forEach((section, idx) => {
        // 把所有的section放到groupMap里面
        if (this.inGroup[idx]) {
          return;
        }
        const { head, tail } = section;
        if (typeof head === "undefined" || typeof tail === "undefined") {
          return;
        }
        const start = Math.floor(head / this.groupSize);
        const end = Math.floor(tail / this.groupSize);
        for (let i = start; i <= end; i++) {
          if (!this.group[i]) {
            this.group[i] = [];
          }
          this.group[i].push(idx);
        }
        this.inGroup[idx] = true;
      });
    },
    getMinHeightCol() {
      let min = Number.MAX_VALUE;
      let minIndex = 0;
      for (let i = 0; i < this.columns; i++) {
        if (this.heightStore[i] < min) {
          min = this.heightStore[i];
          minIndex = i;
        }
      }
      return minIndex;
    },
    getMaxHeight() {
      let max = 0;
      for (let i = 0; i < this.columns; i++) {
        if (this.heightStore[i] > max) {
          max = this.heightStore[i];
        }
      }
      return max;
    },
    setMaxHeight() {
      this.maxHeight = this.getMaxHeight();
    },
    // window event handler
    handleWindowResize() {
      this.screenWidth = document.documentElement.clientWidth;
      this.screenHeight = document.documentElement.clientHeight;
      this.containerOffset = this.getContainerOffset();
    },
    handleScroll(timeout = false) {
      if (!timeout && this.lastScroll && Date.now() - this.lastScroll < 200) {
        return;
      }
      if (!timeout) {
        if (this.scrollTimer) {
          clearTimeout(this.scrollTimer);
        }
        this.scrollTimer = setTimeout(() => {
          this.handleScroll.apply(this, [true]);
        }, 200);
      }
      this.lastScroll = Date.now();
      this.containerOffset = this.getContainerOffset();
      this.scrollTop =
        document.documentElement.scrollTop - this.containerOffset;
      this.setDisplay();
    }
  }
};
</script>

<style lang="less" scoped>
.masonry-container {
  position: relative;
  transform: translate3d(0, 0, 0);
  .masonry-item {
    position: absolute;
  }
}
</style>
