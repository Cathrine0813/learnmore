<template>
    <div>
        <Node :data="datas" :props="defaultProps" @nodeClick="handleNodeClick"></Node>
        <!--<el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>-->
    </div>
</template>

<script>
    /* eslint-disable */
    import Node from './Node'
    export default {
        data () {
            return {
                datas:{
                    id: "1",
                    title: "递归组件",
                    children: [
                        { 
                            id: "1-1", 
                            title: "node1-1" ,
                            children:[
                                { id: "1-1-1",  title: "node1-1-1" },
                                { id: "1-1-2",  title: "node1-1-2" }
                            ]
                        },
                        { 
                            id: "1-2", 
                            title: "node1-2" ,
                            children:[
                                { id: "1-2-1",  title: "node1-2-1" },
                                { id: "1-2-2",  title: "node1-2-2" }
                            ]
                        },
                    ]
                },
                defaultProps:{
                    label: 'title',
                    children: 'children'
                }
            }
        },
        components: {
            Node
        },
        mounted () {
        //   this.$on('nodeClick', (data)=> {
        //     console.log('父',data)
        // })  
            // this.$bus.$on('nodeClick',(data)=> {
            //     console.log('父',data)
            // })
        },
        methods: {
            handleNodeClick(data){
                console.log('父1',data)
            }
        }
    }
</script>
