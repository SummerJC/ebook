<template>
	<div class="m-cell" style="height:100%;position:absolute">
    <div class="cell-item">
        <div class="cell-left">手机号：</div>
        <div class="cell-right"><input type="number" pattern="[0-9]*" class="cell-input" placeholder="请输入手机号" autocomplete="off" v-model="phoneNum"/></div>
    </div>
     <div class="cell-item">
        <div class="cell-left">验证码：</div>
        <div class="cell-right">
         <input type="number"  class="cell-input" placeholder="请输入验证码" autocomplete="off" v-model="code"/>
        	<div v-on:click="getVcode">
            <button v-show="show" type="button" class="btn" 
            style="background:#32ba7c;color:#fff">
            <span >获取短信验证码</span>  
          </button>
        	<button v-show="!show" type="button" class="btn btn-disabled ">
         		<span  class="count">{{count}} s  后重新获取</span>
        	</button>
        </div>
        </div>
    </div>
    <button style="width:calc(100% - 40px);margin-left:20px"type="button" class="btn-block btn-primary" v-on:click="bindNumber">确定</button>
    </div>

</template>
<script>
import http from '../utils/axios'
import api from '../utils/api'
import { Toast } from 'mint-ui'
export default {
	name:'',
	mounted(){

	},
  created() {
      document.title = '绑定手机号'
      console.log(this.phoneNum)
    },
	data(){
		return {
	        show: true,
	        count: '',
	        timer: null,
          prePhoneNum:this.$route.query.phoneNum,
	        phoneNum:'',
          code:''
	      }
	},
	methods:{
		getVcode: async function(){
      if(!(/^1[34578]\d{9}$/.test(this.phoneNum))){
         return this.alertMessage('手机号码有误，请重新填写');

      }else if(this.prePhoneNum ==this.phoneNum.trim()){
        return this.alertMessage('该手机号已绑定');
      }
          let parms ={
          	phoneNumber:this.phoneNum
          };
         const res = await http.get(api.senVtfCode,parms)
         if(res.status==200){
            const TIME_COUNT = 60;
            if (!this.timer) {
                  this.count = TIME_COUNT;
                  this.show = false;
                  this.timer = setInterval(() => {
                    if (this.count > 0 && this.count <= TIME_COUNT) {
                      this.count--;
                    } else {
                      this.show = true;
                      clearInterval(this.timer);
                      this.timer = null;
                    }
                  }, 1000)
                }
         }
		},
    bindNumber:async function(){
         let parms ={
            captcha:this.code,
            phoneNumber:this.phoneNum
          };
         const res = await http.post(api.bindMobile,parms)
         if(res.status==200){
            this.$router.push({path: '/myCenter'});
         }else{
            this.alertMessage(res.data.message);
         }
    },
     alertMessage(message){
          Toast({
              message: message,
              position: 'center',
              duration: 2000
            });
     }
	}

}
</script>
<style lang="sass">
.btn-primary
	background:#32ba7c
</style>