<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ul>
      <li v-for="feature in features" :key="feature.id">
        {{feature.name}}
        <span class="tag">{{feature.version}}</span>
      </li>
    </ul>
    <!-- 1.添加输入框 -->
    <div>
      <input type="text" placeholder="输入新特性" @keyup.enter="addFeature" />
    </div>
    <!-- 计算属性 -->
    <p>总数:{{total}}</p>
  </div>
</template>


<script lang="ts">
/* eslint-disable */
// 加了lang='ts'
import { Component, Prop, Vue, Emit, Watch } from "vue-property-decorator";
// 导入约束类型
import Feature from "@/models/feature";
import {getFeature} from "@/api/feature";

// 添加了装饰器
@Component
// @Component({ //可以写配置参数的,变成了工厂函数里面的工厂函数，相当于加多了一层嵌套
//   props:[]
// })

// 导出的类型现在是继承vue构造函数的一个class
export default class HelloWorld extends Vue {
  // @Prop() 函数型装饰器，父组件传递进来的
  // 装饰器里面的参数是给vue，类型是大写
  @Prop({type: String, required: true}) 
  private msg!: string; //！是明确赋值断言，小写是给ts

  // 在这里声明属性就会成为data
  /**
   * 修饰符
   * public：公共属性，随便用
   * private：私有属性，只能自己用
   * protected：保护属性，自己和继承者都能使用
   *
   */
  private features: Feature[] = [];
  // [
  //   { id: 1, name: "类型注解", version: "1.0" },
  //   { id: 2, name: "类型注解2", version: "2.0" }
  // ];

  // 监听
  @Watch('msg')
  onMsgChange(val: string, oldVal: string){
    console.log(val, oldVal)
  }

  // 派发事件装饰器
  @Emit()
  // 声明方法，可以作为事件回调函数
  addFeature(event: KeyboardEvent) {
    //  const input = event.target //事件的派发者，先转换成input类型
    const input = event.target as HTMLInputElement; //断言，确定成input类型,HTMLInputElement是由DOM提供的结构声明
    const feature = {
      id: this.features.length + 1,
      name: input.value,
      version: "1.0"
    };
    
    // 这样就有value了，input.value
    this.features.push(feature);

    // 清空
    input.value = ''

    // 派发事件，返回值是自定义事件的参数
    return feature;
  }

  // 存取器可以用作计算属性
  get total(){
    return this.features.length
  }

  // 生命周期钩子和以前一样
  mounted() {
    // 异步数据获取
    // getFeature返回的是promise
    getFeature().then(res => {
      this.features = res.data
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
