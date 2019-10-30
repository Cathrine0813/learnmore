<template>
  <div>
      <c-form :model="model" :rules="rules" ref="loginForm">
          <c-form-item label="用户名" prop="username">
            <c-input v-model="model.username" placeholder="请输入用户名"></c-input>
        </c-form-item>
        <c-form-item label="密码" prop="password">
            <c-input v-model="model.password" placeholder="请输入密码"></c-input>
        </c-form-item>
        <!--搞个全局校验,没有prop不需要校验-->
        <c-form-item>
            <button @click="onLogin">提交</button>
        </c-form-item>
      </c-form>
    

    <!--思考：.sync和v-model区别-->
    <div>{{model}}</div>
  </div>
</template>
<script>
/* eslint-disable */
import CForm from './CForm'
import CFormItem from './CFormItem'
import CInput from './CInput'
import Notice from '@/components/Notice.vue'
// import Notice from '../../components/Notice.vue'

export default {
    data () {
        return {
            model:{
                username:'Cathrine',
                password:'',
            }, 
            
            rules:{
                // 校验規則一般是数组
                username:[{required:true, message:'请输入用户名'}],
                password:[{required:true, message:'请输入密码'}]
            }
        }
    },
    components:{
        CForm,
        CFormItem,
        CInput,
        Notice
    },
    mounted(){

    },
    methods:{
        // api设计,把当前表单起名字,设置校验方法,并且告知是否校验成功
        onLogin(){
            this.$refs.loginForm.validate((isValid)=>{
                // if (isValid) {
                //     alert('成功')
                // }else{
                //     alert('失败')
                // }

                // 自定义弹窗组件,通过js调用  声明一个Notice 实现一个create方法去创建Notice实例
                this.$create(Notice,{
                    title:'自定义组件',
                    message:`表单校验${isValid}`,
                    duration:2000, //2秒后自动关闭
                }).show()
            })
        }
    }
}
</script>
