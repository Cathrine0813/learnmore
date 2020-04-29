<template>
    <div>
        index page
        <p>{{$store.state.count}}</p>
        <button @click="$store.commit('add')">add</button>
    </div>
</template>

<script>
    export default {
        // 约定预取逻辑编写在预取钩子asyncData中 
        // 组件创建前传递数据进来asyncData
        asyncData({ store, route }) { 
            console.log(store, route)
            return store.dispatch("getCount");  //返回一个promise请求
        }
    }
</script>

<style lang="scss" scoped>

</style>