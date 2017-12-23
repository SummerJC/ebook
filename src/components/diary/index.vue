<template>
  <div class="diary">
    <article class="item" v-for="item in diaryList">
      <div class="tit">
        <img v-bind:src="item.usericon" alt="">
        <div class="con">
          <h3>{{item.username}}</h3>
          <p>{{item.title}}</p>
        </div>
      </div>
     <!--  <router-link :to="{ path: '/diary/detail', query: { diaryid: item.id }}"> -->
        <div class="arc">
          <!--<p class="tit">{{item.title}}</p>-->
          <p class="time">{{item.createTime|time}}</p>
          <!--13:14 星期日-->
          <p class="dis" style="overflow:hidden">{{item.content}}</p>
          <div class="img">
           <img v-for="site in item.icons"v-bind:src="'http://' + site" alt="">
          </div>
          <p class="bot">
            <a href="javascript:;" class="love">{{item.likedTimes}}</a>
            <a href="javascript:;" class="comment">{{item.commentTimes}}</a>
          </p>
        </div>
    <!--   </router-link> -->
    </article>
    <BottomMenu v-bind:selectedId='selectedId'></BottomMenu>

    <router-link class="point edit" to="/diary/my"></router-link>
   <!--  <div v-on:click="alertMessage('此功能暂未开放!')">
    <router-link class="point edit" to=""></router-link>
  </div> -->
    <router-link class="point add" :to="{ path: '/diary/add', query: { userId: 123 }}"></router-link>
   <!-- <div class="point add" v-on:click="alertMessage('此功能暂未开放!')"> -->
    <!-- <router-link class="point add" to="" ></router-link> -->
  <!-- </div> -->
  </div>
</template>

<script type="text/babel">

  import http from '../../utils/axios'
  import api from '../../utils/api'
  import Vue from 'vue'
   import BottomMenu from '../../components/bottomMenu'
     import { Toast } from 'mint-ui'
  Vue.filter('time', function (value) {//value为13位的时间戳
    function add0(m) {
      return m < 10 ? '0' + m : m
    }
    var time = new Date(parseInt(value));
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var H = time.getHours(),
      i = time.getMinutes(),
      s = time.getSeconds();

    return add0(m) + '月' + add0(d)+'日'+H +':'+i;
  });
  //import axios from 'axios'
  export default {
    name: 'hello1',
    components:{BottomMenu},
    data() {
      return {
        diaryList: '',
        selectedId:'3'
      }
    },
    created() {
      document.title = '四年日记'
    },
    mounted() {
      this.gitDiary();
    },
    methods: {

      gitDiary: async function() {
        let params = {
          page: 1,
          row: 10
        }
        const res = await http.get(api.selectDiary,params)
        if (res.status == 200) {
          this.diaryList = res.data.data.rows
          console.log(this.diaryList)
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


<style lang="sass" scoped>
  .diary
    position: relative
    .point
      position: fixed
      right: 0.2rem
      width: 0.8rem
      height: 0.8rem
      border-radius: 0.8rem
      display: block
      box-shadow: 0px 3px 3px #ddd;
    .edit
      background: #fff url("../../assets/image/wdrj_btn.png") no-repeat center center
      background-size: 0.8rem 0.8rem
      bottom: 1.3rem
    .add
      background: #fff url("../../assets/image/xrj_btn.png") no-repeat center center
      background-size: 0.8rem 0.8rem
      bottom: 2.2rem
    .item
      background: #fff
      padding: 0.3rem
      margin-bottom: 0.3rem
      .tit
        display: flex
        flex-direction: row
        img
          width: 0.7rem
          height: 0.7rem
          border-radius: 0.6rem
        .con
          flex: 1
          padding-left: 0.2rem
          h3
            font: 0.17rem/0.5rem '宋体'
            color: #666
          p
            font: 0.24rem/0.3rem '宋体'
            color: #999
      .arc
        background: url("../../assets/image/bookbg.png") no-repeat
        background-size: 6.35rem 5.62rem
        margin-left: 0.5rem
        padding: 0.5rem 0.5rem
        height: 5.52rem
        width: 6.35rem
        .tit
          font: 0.34rem/0.5rem '宋体'
          color: #666
        .time
          font: 0.24rem/0.5rem '宋体'
          color: #999
        .dis
          font: 0.24rem/0.3rem '宋体'
          color: #666
          max-height: 70px
          line-height: 17px
          overflow:hidden
          text-overflow:ellipsis
        .img
          margin-top: 0.2rem
          display: flex
          flex-direction: row
          img
            width: 2.2rem
            height: 1.6rem
            &:last-child
              margin-left: 0.2rem
        .bot
          a
            color: #999999
            font: 0.14rem/0.8rem '宋体'
            padding-left: 0.3rem
          .love
            background: url("../../assets/image/likeico.png") no-repeat left center
            background-size: 0.26rem 0.23rem
          .comment
            background: url("../../assets/image/commentnum.png") no-repeat left center
            background-size: 0.24rem 0.23rem
            margin-left: 0.3rem

</style>
