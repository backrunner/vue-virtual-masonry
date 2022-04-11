# vue-virtual-masonry

This is a Vue component for quickly building a virtual scrolling masonry.

Inspired by starkwang's [vue-virtual-collection](https://github.com/starkwang/vue-virtual-collection)

## Install

```bash
npm i vue-virtual-masonry
```

## Usage

Firstly, import the component.

```js
import Vue from 'vue';
import VirtualMasonry from 'vue-virtual-masonry';

Vue.use(VirtualMasonry, {
  additionalDistance: 500, // option value
});
```

The `additionalDistance` is a additional distance to screen edge to judge if the cells should be visible.

If set to `500`, cell will be visible when its top edge reaches `500px` below the viewport.

It's the same for cell leaving viewport, if its bottom edge reaches `500px` upper the viewport, it will be invisible.

The default value of `additionalDistance` is `300`,

In your page, use the component like this:

```vue
<template>
  <div class="masonry">
    <VirtualMasonry :items="items" :colWidth="200" :itemHeightGetter="heightGetter">
      <template slot-scope="props"></template>
    </VirtualMasonry>
  </div>
</template>
```

The `itemHeightGetter` is a function in methods, here's an example:

```js
export default {
  methods: {
    heightGetter(item) {
      return item.height;
    },
  },
};
```

The function should return the height of this item.

If `col` is not set, component will calculate the columns count automatically by the width of masonry container.

If you want to render a certain columns masonry, you can set the component like this:

```vue
<template>
  <div class="masonry">
    <VirtualMasonry
      :items="items"
      :colWidth="200"
      :col="3"
      :fit="true"
      :itemHeightGetter="heightGetter"
    >
      <template slot-scope="props"></template>
    </VirtualMasonry>
  </div>
</template>
```

It's recommend to set `fit` true, the container will fit the width of inner content.

You can find more details in the reference.

## Reference

### Props

#### items

Type: `Array`

Required: `true`

The collecton you want to render in masonry.

#### colWidth

Type: `Number`

Required: `true`

The width of column in masonry.

#### itemHeightGetter

Type: `Function`

Required: `true`

Returns: `Number`

A function return the height of each cells. It should return a number indicating the height of the cell corresponding to the parameter item.

#### col

Type: `Number`

Default: `0`

If `col` is above 0, component will render certain columns you set in masonry.

#### fit

Type: `Boolean`

Default: `false`

Only effect when `col` is above 0, the width of container will fit inner contents automatically.

#### gap

Type: `Number`

Default: `16`

The gap of cells in masonry.

### rowPerSection

Type: `Number`

Default: `3`

Component will build several sections to simplify the calculation of elements visibility.

By default, 3 rows of cells will be grouped up as a section.

Most of time, this value doesn't need to be modified.

### Slot

Default slot is the only slot in the component, it will pass two props that you need use `slot-scope` to receive it in your code.

Example:

```vue
<template slot-scope="props">
  <p>{{ props.data }}</p>
</template>
```

In this example, `props.data` is the item in collection which is used to be rendered this cell.

Every data will be added a property named `_masonryIndex` to show the index of this item in the masonry.

Also, you can get position info from slot, here's an example of position info:

```js
{
  left: 200,  // absolute left position of the cell
  top: 0,  // absolute top position of the cell
  height: 332, // height of the cell
}
```

## License

MIT
