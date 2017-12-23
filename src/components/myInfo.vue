<template>
	<div class="myInfo">

      <div>

        <mt-field  label="昵称" v-model="info.petName" readonly id="nickName">
        </mt-field>
        <mt-field  label="学校"  v-model="info.college"readonly id="school">
        </mt-field>
        <mt-field  label="学院"  v-model="info.academy" readonly id="college">
        </mt-field>
        <mt-field  label="专业"  v-model="info.profession"readonly id="major">
        </mt-field>
        <mt-field  label="年级"  v-model="info.grade"readonly  id="classNum">
        </mt-field>
    </div>
     <mt-button size="large" class="onSave" v-on:click="modifyData">
          修改个人信息
      </mt-button>
	</div>
</template>
<script>


  import http from '../utils/axios'
  import api from '../utils/api'
  import axios from 'axios'
  import { Toast } from 'mint-ui'
  import ModifyInfo from '../components/modifyInfo'
export default {
  name: 'test',
  components:{ModifyInfo},
  data () {
    return {
      info:{
      }


    }
  },
  created() {
      document.title = '个人信息'
    },
  mounted () {
    this.getUserInfo();
    this.addEvent();
   },
  methods:{
    getUserInfo: async function(){
       const res = await http.get(api.getUserInfo);
        if(res.status == 200){
            this.info = res.data.data;
        }
      },
      modifyData(){
         window.localStorage.setItem('modify', JSON.stringify(this.info));
          this.$router.push({path: '/modifyInfo'});
      },
    addEvent: async function(){
      var that = this;
      document.activeElement.blur();
      document.getElementById('school').onclick = function(event){
        $('#school').find("input")[0].blur();
        event.stopPropagation();
      };
      document.getElementById('nickName').onclick = function(event){
        $('#nickName').find("input")[0].blur();
        event.stopPropagation();
      };
      document.getElementById('college').onclick = function(event){
        $('#college').find("input")[0].blur();
        event.stopPropagation();
      };
      document.getElementById('major').onclick = function(event){
        $('#major').find("input")[0].blur();
        event.stopPropagation();
      };
      document.getElementById('classNum').onclick = function(event){
        $('#classNum').find("input")[0].blur();
        event.stopPropagation();
      };

    }
   },
    

  
}

</script>
<style scoped>
    .mint-button--large{
		width: calc(100% - 40px);
		margin: 10px auto;
	}
	.onSave{
		background: #32ba7c;
		color: #fff;
	}
  .myInfo{background: #fff;background-size: cover;position: absolute;width: 100%;height: 100%}
  
   @import '../assets/style/main.css';
</style>