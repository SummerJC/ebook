<template>
  <div style="">
    <div class="relContent" v-for="site in result">
       <ul class="resultContent" style="width: 100%">
         <li class="content" style="width: 100%;background: #ffffff;border-bottom: 1px solid #e9e9e9"v-on:click="seeBook(site)" >
           <div style="margin:15px">
             <div class="oderImg">
               <img style="float: left ;width: 65px;height: 87px;margin-bottom: 15px"  v-bind:src="'http://'+site.icon">
             </div>
             <ul class="goodsInfo" style="margin-left: 10px;float: left;width:calc(100% - 160px)">
               <li class="name"style="font-size: 15px;color: #5a5a5a;width: 100%;margin-top: 10px;height:24px;overflow:hidden;white-space:nowrap;
               text-overflow:ellipsis">{{site.title}}</li>
               <li class="odermoney" style="font-size: 12px;color: #9b9b9b;margin-top: 10px">作者：<span>{{site.author}}</span></li>
               <li class="odermoney" style="font-size: 14px;color: #ff6600;margin-top: 10px">￥{{site.ePrice}}<span style="color: #9b9b9b">&ensp;e币</span><span style="color: #9b9b9b">/学期</span><span style="margin-left: 5px;font-size:12px;color: #9b9b9b"><s>{{site.initCost}}</s></span></li>
             </ul>
             <div style="float: right;text-align: center">
               <mt-button size="large" class="payButton" style="	background: #32ba7c;	color: #fff;width:75px;height: 30px;font-size: 14px;margin-right: 5px;margin-top: 25px " >
                 在线预订
               </mt-button>
             </div>
           </div>
         </li>
       </ul>
    </div>
  </div>
</template>
<script>
 import http from '../utils/axios'
  import api from '../utils/api'
export default {
  name:"search",
  data(){
    return{
      resultList:[]
    }
  },
  created() {
      document.title = '搜索结果'
    },
  mounted(){

  },
  methods:{
      seeBook(site){
      if(window.localStorage){
         window.localStorage.removeItem('openBookInfo');
         window.localStorage.setItem('openBookInfo', JSON.stringify(site.id));
        this.$router.push({path: '/bookInfo'});
      }
    }
  },
  props:['result']
}
</script>
<style lang="sass" scoped>
  @import "../assets/style/main.css"
</style>
