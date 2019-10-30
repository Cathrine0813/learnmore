//自下向上派发事件
function $dispatch(eventName, data) {
  let parent = this.$parent;
  // 查找父元素
  while (parent) {
    // 父元素用$emit触发
    parent.$emit(eventName, data);
    // 递归查找父元素
    parent = parent.$parent;
  }
}

//向下广播,这个消耗大,能不用就不用
function boardcast(eventName, data) {
  this.$children.forEach(child => {
    // 子元素触发$emit
    child.$emit(eventName, data);
    if (child.$children.length) {
      // 递归调用，通过call修改this指向 child
      boardcast.call(child, eventName, data);
    }
  });
}
export default {
  // 利用了vue的混入mixin
  methods: {
    $dispatch,
    $boardcast: function(eventName, data) {
      boardcast.call(this, eventName, data);
    },
  },
};
