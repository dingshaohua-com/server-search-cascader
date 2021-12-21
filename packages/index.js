import Cmp from './index.vue';
Cmp.install = function(Vue) {
    console.log('Vue', Vue);
    Vue.component(Cmp.name, Cmp);
};
export default Cmp;
