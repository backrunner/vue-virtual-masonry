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
    }
  },
  data() {
    return {
      positionMap: {},
      widthStore: {},
      heightStore: {},
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
    },
    scrollTop: "pageScrolled"
  },
  created() {
    this.resetWidthStore();
    this.resetHeightStore();
    this.resetPositionMap();
    window.addEventListener("resize", this.handleWindowResize);
    window.addEventListener("scroll", this.handleScroll, true);
  },
  mounted() {
    this.containerWidth = this.getContainerWidth();
    this.containerOffset = this.getContainerOffset();
    this.renderWaterfall();
    console.log("additionalDistance", this.additionalDistance);
  },
  updated() {
    this.containerWidth = this.getContainerWidth();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleWindowResize);
    window.removeEventListener("scroll", this.handleScroll, true);
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
        this.renderWaterfall();
      } else {
        this.computePosition();
        this.setMaxHeight();
        this.setDisplay();
      }
      this.storedItemsLength = this.items.length;
    },
    columnsChanged() {
      this.renderWaterfall();
    },
    colWidthChanged() {
      this.renderWaterfall();
    },
    screenWidthChanged() {
      this.containerWidth = this.getContainerWidth();
    },
    pageScrolled() {
      this.setDisplay();
    },
    renderWaterfall() {
      this.resetSections();
      this.resetWidthStore();
      this.resetHeightStore();
      this.resetPositionMap();
      this.setMaxHeight();
      this.setDisplay();
    },
    setDisplay() {
      const countPerSection = this.columns * this.rowsPerSection;
      let list = [];
      for (let i = 0; i < this.sections.length; i++) {
        const section = this.sections[i];
        const { head, tail } = section;
        // console.log('index', i, 'head', head, 'tail', tail);
        // console.log('scrollTop', this.scrollTop, 'cond', head <= this.scrollTop + this.screenHeight + ADDITIONAL_DISTANCE && tail > this.scrollTop - ADDITIONAL_DISTANCE);
        const showCondHead =
          this.scrollTop + this.screenHeight + this.additionalDistance;
        const showCondTail = this.scrollTop - this.additionalDistance;
        if (head <= showCondHead && tail > showCondTail) {
          list = list.concat(
            this.items.slice(i * countPerSection, (i + 1) * countPerSection)
          );
        }
        if (head > showCondHead) {
          // 有序数据，后面的都不会显示出来没必要遍历了
          break;
        }
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
        // set group position
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
