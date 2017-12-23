<template>
  <div class="page-navbar studyBody">
    <!-- navbar -->
    <mt-navbar class="page-part" v-model="selected">
      <mt-tab-item id="1">我的收藏</mt-tab-item>
      <mt-tab-item id="2">我的捐书</mt-tab-item>
    </mt-navbar>


    <!-- tabcontainer -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <div class="ListContent" v-for="site in mycollectContent">
        	<div>
        	<img class="" slot="icon" v-bind:src="'http://' + site.bookIcon"
           width="60" height="60">
        	 </div>
        	<div class="itemContent">
        		<p>{{site.bookName}}</p>
        		<p>￥{{site.eValue}}（e币）</p>
        	</div>
        	<div class="cancleCollect">
        		<button v-on:click="cancle(site,index)">取消收藏</button>
        	</div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="ListContent" v-for="site in myDonate">
        	<div>
        	<img slot="icon" v-bind:src="'http://' + site.bookIcon" width="60" height="60">
              </div>
        	<div class="itemContent myDonate">
        		<p>{{site.bookName}}</p>
        		<p>￥{{site.eValue}}</p>
        	</div>
        	<div class="getMoney">
           获得 ￥{{site.eValue}}（e币）
        	</div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
  import http from '../utils/axios'
  import api from '../utils/api'
  import axios from 'axios'
export default {
  name: 'page-navbar',

  data() {
    return {
      selected: '1',
      mycollectContent:[],
      myDonate:[]
    };
  },
  created() {
    document.title = '我的书房'
  },
  mounted () {
    this.myCollected();
  },
  methods:{
      myCollected: async function(){
        const res = await http.get(api.myCollecte)
          if (res.status == 200) {
            this.mycollectContent = res.data.data
          }
      },
      cancle:async function(site,index){
           let params = {
            bookid :site.id
          }
         const res = await http.post(api.removeCollectBook, params)
          if (res.status == 200) {
              this.mycollectContent.splice(index,1);
          }
      },
  },
  watch: {
      selected:async function (val, oldVal) {
          if(val=="2"){
             const res = await http.get(api.myDonation)
              if (res.status == 200) {
                  this.myDonate=res.data.data;
              }
          }
      }
    },

};
</script>
<style scoped>
    @import '../assets/style/main.css';

</style>
