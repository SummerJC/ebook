<template>
  <div class="home">
  <yd-slider autoplay="3000">
    <yd-slider-item v-for="(item,index) in bookBanner">
      <a v-bind:href="item.dictCode">
        <img :src="'http://' + item.icon">
      </a>
    </yd-slider-item>
  </yd-slider>
  <article class="nav">
    <mt-button style="margin-top: 10px" type="default" v-on:click="seach">
      请输入书籍的ISBN、书名、或作者
    </mt-button>
       <p style="height: 40px">
    <a v-on:click='scanQR' href="javascript:;"><img style="width: 27px;margin-top: 6px" src="../assets/image/jrkt.png" alt="">我要e币</a>
      <router-link  to="allSort" ><img style="width: 27px;margin-top: 6px" src="../assets/image/rdcp.png" alt="">常用分类
       </router-link>
         <router-link to="findBookByContent"><img style="width: 27px;margin-top: 6px" src="../assets/image/zyfl.jpg" alt="">专业分类
         </router-link>
    </p>
  </article>
  <article class="bookClass">
    <h2>热门书籍</h2>
    <mt-navbar v-model="selected">
      <mt-tab-item id="大一">大一</mt-tab-item>
      <mt-tab-item id="大二">大二</mt-tab-item>
      <mt-tab-item id="大三">大三</mt-tab-item>
      <mt-tab-item id="大四">大四</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item v-bind:id="selected">
       <div v-for="(site,index) in hotBook" v-on:click="seeBook(site)">
        <img class="hotBook" v-bind:src="'http://' + site.icon">
      </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </article>

  <BottomMenu v-bind:selectedId='selectedId'></BottomMenu>

  </div>
</template>

<style lang="sass" scoped>
  .home
    button
      font: 0.28rem 'Ping-Fang-SC-Regular'
      background: #fff
    .bookClass
      background: #fff
      padding: 0.3rem
      padding-bottom: 1rem
      /*margin-top: 5px*/
      h2
        font: bold 0.34rem/0.8rem 'Ping-Fang-SC-Regular'
        text-align: center
      ul
        display: flex
        flex-direction: row
        li
          width: 2.3rem
          margin-top: 0.2rem
          &:nth-of-type(even)
            margin: 0.3rem
          a
            display: flex
            flex: 1
            &:nth-child(2)
              margin-left: 0.3rem
            img
              width: 2rem
              height: 2.5rem
    .nav
      padding: 0.1rem 0.3rem 0.3rem
      display: flex
      flex-direction: column
      p
        display: flex
        margin-top: 0.2rem
        input
          font: 0.24rem/0.8rem 'Ping-Fang-SC-Regular'
          flex: 1
          text-align: center
          background: #fff
          border-radius: 5px
          border: 0
          outline: none
        a
          width: 3.3rem
          /*height: 1rem*/
          font: bold 0.3rem/0.8rem 'Ping-Fang-SC-Regular'
          background: #fff
          border-radius: 5px
          display: flex
          justify-content: center
          align-items: center
          &:nth-child(2)
            margin-left: 0.3rem
          &:last-child
            margin-left: 0.3rem
          img
            width: 0.8rem
            margin-top: 0.2rem
    .hotBook
      width: 2.0rem
      height: 2.7rem
      float: left
      margin: 0.2rem 0.1rem

</style>

<script type="text/babel">
  import http from '../utils/axios'
  import api from '../utils/api'
  import axios from 'axios'
  import BottomMenu from '../components/bottomMenu'
  export default {
    name: 'hello1',
    components:{BottomMenu},
    data() {
      return {
        datetime1: '05:21',
        hotBook: '',
        bookBanner: '',
        selected:'大一',
        openId:'',
        selectedId:'1',
        isLogin:''
      }
    },
    created() {
       document.title = '首页';
    },
    mounted() {
      window.localStorage.removeItem('isLogin');
      this.openId=this.getcookie("wxopenid");
      if(this.openId!=''){
        this.gitBanner();
      }
      
    },
    methods: {
       getcookie(name){
        var strcookie=document.cookie;
        var arrcookie=strcookie.split("; ");
        for(var i=0;i<arrcookie.length;i++){
          var arr=arrcookie[i].split("=");
          if(arr[0]==name)return decodeURIComponent(arr[1]); //增加对特殊字符的解析
        }
        return "";
      },
      gitBanner: async function () {
        const res = await http.get(api.banner)
        if (res.status == 200) {
          this.bookBanner = res.data.data
          this.selected = '大一';
         this.getBook();
          this.getReady();

        }else{
          alert('请刷新页面');
        }
      },
      getBook: async function () {
        let params = {
          grade:this.selected
        }
        const res = await http.get(api.allBook, params)
        if (res.status == 200) {
          this.hotBook = res.data.data;
          if(this.hotBook.length>=9){
            this.hotBook.length = 9;
          }
        }
      },
     
      getReady: async function(){
        let parms = {
          targetUrl:window.location.href
        }
        const res = await http.get(api.findSign,parms)
        if(res.status == 200){
          var myself=this;
            var wxConfig=res.data.data;
            wx.config({
                appId: wxConfig.appid,
                timestamp: wxConfig.timestamp,
                nonceStr: wxConfig.noncestr,
                signature: wxConfig.signature,
                jsApiList: ['scanQRCode']
            });
            wx.ready(function () {
            

            });
          wx.error(function(res) {

          });
        }

      },
      scanQR: function(){
          const self = this;
           wx.scanQRCode({
              needResult : 1,
               desc : 'scanQRCode desc',
              success : function(res) {
                self.scanBook(res);
              }
          });
      },
      scanBook (res){
        var result = res.resultStr;
        var index = result.indexOf(',')+1;
        var isbn =  result.substr(index);
        window.localStorage.setItem('openBookInfo', JSON.stringify(isbn));
        window.localStorage.setItem('isScan', JSON.stringify("1"));
        this.$router.push({path: '/bookInfo'});
      },
      seeBook(site){
        if(window.localStorage){
         window.localStorage.removeItem('openBookInfo');
          window.localStorage.setItem('openBookInfo', JSON.stringify(site.id));
          this.$router.push({path: '/bookInfo'});
        }
      },
      seach(){
          this.$router.push({path: '/searchAll'});
      },
     
      //微信分享
      isWeixin (){
    var ua = navigator.userAgent.toLowerCase();
    return ua.match(/MicroMessenger/i) == "micromessenger" ? true : false;
  },
  
      
    },
    watch: {
      selected:async function (val, oldVal) {
        this.getBook(val);
        }
      },
  }
</script>
