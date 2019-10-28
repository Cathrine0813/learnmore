<template>
    <div>
        <!--label显示-->
        <label v-if="label">{{label}}</label>
        <!--input显示-->
        <slot></slot>
        <!--错误信息显示-->
        <p class="error" v-if="error">{{error}}</p>
        {{form.rules[prop]}}
        <!--所以<c-form-item label="用户名" prop="username">中的prop主要是做校验用的-->
    </div>
</template>
<script>
    /* eslint-disable */
    import Schema from 'async-validator'

    export default {
        inject:['form'],
        props:{
            label:{
                type:String,
                default:''
            },
            prop:{
                type:String,
                default:''
            }
        },
        data(){
            return{
                error:''
            }
        },
        // 创建是自上而下，挂载是自下而上，所以在mounted这里子组件已经创建完了
        mounted(){
            // 监听
            this.$on('validate', () => {
                this.validate()                
            })
        },
        methods: {
            // cnpm i async-validator -s  校验的第三方工具
            validate(){
                // 0、获取校验規則和当前值
                const rules = this.form.rules[this.prop]
                const value = this.form.model[this.prop]
                // 1、创建Schema实例
                const schema = new Schema({
                    // [xxx] es6计算属性
                    [this.prop]:rules
                })
                // 2、使用该实例进行创建
                schema.validate({
                    [this.prop]:value
                },errors => {
                    if(errors){
                        this.error = errors[0].message
                    }else{
                        this.error = ''
                    }
                })
            }
        }
    }
</script>
<style scoped>
    .error{
        color: red;
    }
</style>

