<template>
  <div class="diary">

  <article class="item">
    <div class="tit">
      <img v-bind:src="detail.usericon" alt="">
      <div class="con">
        <h3>{{detail.username}}</h3>
      </div>
    </div>
    <div class="arc">
      <p class="tit">
       {{detail.title}}
      </p>
      <p class="time">{{detail.createTime|time}}</p>
      <p class="dis">{{detail.content}}</p>
      <div class="img"> 
        <img v-for="site in detail.icons" v-bind:src="'http://'+site" alt="">

      </div>
      <p class="bot">
        <a href="javascript:;" class="love">{{detail.likedTimes}}</a>
        <a href="javascript:;" class="comment">{{detail.commentTimes}}</a>
      </p>
    </div>
  </article>

  <article class="comment" >
    <h3 class="tit">评论</h3>
    <ul>
      <li v-for="item in diaryCommentList.rows">
        <img v-bind:src="item.usericon" alt="">
        <div class="con">
          <h4>{{item.username}}<span>{{item.createTime|time}}</span></h4>
          <p>{{item.content}}</p>
        </div>
      </li>
    </ul>
  </article>
  <article class="bottom">
    <a v-if="detail.isLiked == false" class="love" href="javascript:;" @click="loveDiary"><img src="../../assets/image/zanbtn.png" alt="">喜欢</a>
    <a v-if="detail.isLiked == true" class="love" href="javascript:;" @click="removeLoveDiary"><img src="../../assets/image/likeico.png" alt="">喜欢</a>
    <router-link  :to="{ path: '/diary/comment', query: { diaryid: detail.id }}" class="comment"><img src="../../assets/image/commentbtn.png" alt="">评论</router-link>
  </article>

  </div>
</template>

<script type="text/babel">
  import http from '../../utils/axios'
  import api from '../../utils/api'
  import Vue from 'vue'
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
    data() {
      return {
        diaryid: this.$route.query.diaryid,
        detail: '',
        diaryCommentList: ''
      }
    },
    created() {
      document.title = '日记详情'
      console.log(this.diaryid)
    },
    mounted() {
      this.findDiaryDetail();
      this.findDiaryComments();
    },
    methods: {
      findDiaryDetail: async function () {
        let params = {
          diaryId: this.diaryid,
        }
        const res = await http.get(api.findDiaryDetail,params)
        if (res.status == 200) {
          this.detail = res.data.data
          console.log(this.detail.isLiked)
        }
      },
      findDiaryComments: async function () {
        let params = {
          diaryId: this.diaryid,
        }
       const res = await http.get(api.findDiaryComments,params)
        if (res.status == 200) {
          this.diaryCommentList = res.data.data
        }
      },
      loveDiary: async function () {
        let params = {
          diaryId: this.diaryid,
        }
        const res = await http.post(api.addLike,params)
        if (res.status == 200) {
          this.alertMessage("点赞成功")
          this.findDiaryDetail();
        }
      },
      removeLoveDiary: async function () {
        let params = {
          diaryId: this.diaryid,
        }
        const res = await http.post(api.removeLike,params)
        if (res.status == 200) {
          this.alertMessage("已取消赞")
          this.findDiaryDetail();
        }
      },
      alertMessage(message){
          Toast({
              message: message,
              position: 'center',
              duration: 2000
            });
     },
    deleteDiary: async function(item,index) {
        let params = {
          id:this.detail.id
        }
        const res = await http.post(api.delDiary,params)
        if (res.status == 200) {
          this.$router.go(-1);
        }
      }
    }
  }
</script>


<style lang="sass" scoped>
  .diary
    .bottom
      display: flex
      width: 100%
      background: #fff
      position: fixed
      left: 0
      bottom: 0
      a
        color: #666
        font: 0.24rem/0.8rem '宋体'
        flex: 1
        align-items: center
        justify-items: center
        justify-content: center
        display: flex
        &.love
          img
            width: 0.41rem
            height: 0.34rem
        &.comment
          border-left: 1px solid #eee
          margin-left: 0.3rem
          img
            width: 0.4rem
            height: 0.38rem

    .comment

      h3
        padding-left: 0.3rem
        font: 0.34rem/0.3rem '宋体'
        margin-bottom: 0.3rem
        color: #666
      ul
        background: #fff
        margin-bottom: 50px
        li
          display: flex
          flex-direction: row
          border-bottom: 1px solid #f7f6f6
          padding: 0.2rem 0.3rem
          img
            width: 1rem
            height: 1rem
            border-radius: 0.6rem
          .con
            flex: 1
            padding-left: 0.2rem
            h4
              font: 0.3rem/0.5rem '宋体'
              color: #666
              display: flex
              span
                flex: 1
                text-align: right
                font: 0.14rem/0.5rem '宋体'
            p
              font: 0.14rem/0.5rem '宋体'
              color: #999
    .item
      background: #fff
      padding: 0.3rem
      margin-bottom: 0.3rem
      .tit
        display: flex
        flex-direction: row
        img
          width: 1rem
          height: 1rem
          border-radius: 0.6rem
        .con
          flex: 1
          padding-left: 0.2rem
          h3
            font: 0.34rem/0.5rem '宋体'
            color: #666
          p
            font: 0.14rem/0.5rem '宋体'
            color: #999
        .delete
          img
           width: 0.4rem
           height: 0.4rem
      .arc
        background: url("../../assets/image/bookbg.png") no-repeat
        background-size: 100% 100%
        margin-left: 0.8rem
        padding: 0.5rem 0.5rem
        height: auto
        width: 6.35rem
        .tit
          font: 0.28rem/0.4rem '宋体'
          color: #666
        .time
          font: 0.24rem/0.4rem '宋体'
          color: #999
        .dis
          font: 0.24rem/0.4rem '宋体'
          color: #666
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

