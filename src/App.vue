<template>
  <div class="container">
    <div class="title">Vue Virtual Masonry</div>
    <div class="masonry">
      <VirtualMasonry
        :items="items"
        :col="10"
        :fit="true"
        :colWidth="100"
        :rowsPersection="1"
        :itemHeightGetter="heightGetter"
      >
        <template slot-scope="props">
          <p>{{ props.data._masonryIndex }}</p>
        </template>
      </VirtualMasonry>
    </div>
    <div class="footer">
      <span>Made by BackRunner.</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    };
  },
  created() {
    // generate items
    const items = new Array(30000).fill(1).map(() => {
      return {
        height: this.getRandomInt(50, 500),
      };
    });
    this.$set(this, 'items', items);
  },
  methods: {
    heightGetter(item) {
      return item.height;
    },
    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
  },
};
</script>

<style lang="less">
html,
body,
#app {
  width: 100%;
  min-height: 100vh;
}
body,
#app {
  margin: 0;
  position: relative;
}
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  .title {
    height: 120px;
    .center();
  }
  .masonry {
    flex: 1;
    .masonry-container {
      margin: 0 auto;
      .masonry-item {
        background: #1faeff;
        color: #fff;
        .center();
      }
    }
  }
  .footer {
    height: 64px;
    .center();
  }
}
</style>
