<template>
	<div class="myInfo">
	 <div class="m-cell">

        <mt-field  label="昵称" placeholder="请输入姓名" v-model="info.petName">
        </mt-field>
        <mt-field  label="学校" placeholder="请输入学校" v-model="info.college" >
        </mt-field>
         <mt-field  label="学院" placeholder="请输入学院" v-model="info.academy" >
        </mt-field>
        <mt-field  label="专业" placeholder="请输入专业" v-model="info.profession">
        </mt-field>
        <mt-field  label="年级" placeholder="请输入年级" v-model="info.grade">
        </mt-field>
    </div>
    <mt-button size="large" class="onSave" v-on:click="modify">
			确认修改
		</mt-button>
	</div>
</template>
<script>


  import http from '../utils/axios'
  import api from '../utils/api'
  import axios from 'axios'
  import { Toast } from 'mint-ui'
export default {
  name: 'test',
  data () {
    return {

      popupVisible:false,
      info:{},
      

    }
  },
  created() {
      document.title = '修改个人信息'
    },
  mounted () {
     this.info=JSON.parse(window.localStorage.getItem('modify'));
     window.localStorage.removeItem('modify');
   },
  methods:{
	  modify: async function(){
      const user={
        petName:this.info.petName,
        college:this.info.college,
        academy:this.info.academy,
        profession:this.info.profession,
        grade:this.info.grade
      }
       const res = await http.post(api.modifyUserInfo,user)
        if(res.status == 200){
          this.$destroy();
          /*this.$router.push({path: '/myInfo',replace:true});*/
          this.$router.go(-1);
        }
      
    }

  }

}

</script>
<style scoped>
	.mint-popup-bottom{width:100%;}
    .selected{padding: 5px 8px;color: #32ba7c;}
    .selected span:last-child{float: right;padding: 3px}
    .spanel{background: #fdfdfd;width: 100%;}
    .mint-button--large{
		width: calc(100% - 40px);
		margin: 10px auto;
	}
	.onSave{
		background: #32ba7c;
		color: #fff;
	}
    .myInfo{background: #fff;background-size: cover;position: absolute;width: 100%;height: 100%}
</style>