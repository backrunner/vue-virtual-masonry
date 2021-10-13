import config from './config';
import VirtualMasonry from './components/VirtualMasonry.vue';

const lib = {
  install(Vue, options) {
    if (options) {
      Object.assign(config.options, options);
    }
    Vue.component('VirtualMasonry', VirtualMasonry);
  },
};

export default lib;
