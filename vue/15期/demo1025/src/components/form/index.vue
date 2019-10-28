<template>
  <div>
      <c-form :model="model" :rules="rules">
          <c-form-item label="用户名" prop="username">
            <c-input v-model="model.username" placeholder="请输入用户名"></c-input>
        </c-form-item>
        <c-form-item label="密码" prop="password">
            <c-input v-model="model.password" placeholder="请输入密码"></c-input>
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
        CInput
    },
    mounted(){

    },
    methods:{

    }
}
</script>
