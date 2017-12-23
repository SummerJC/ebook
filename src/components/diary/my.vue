<template>
  <div style="padding: 0.2rem;">
    <p class="year">2017</p>
    <div class="diaryMy">
      <article class="item" v-for="(item,index) in diaryList">
        <div class="date">{{item.createTime|month}}</div>
       
        <div class="arc">
           <p class="tit">
             <router-link :to="{ path: '/diary/detail', query: { diaryid: item.id }}">
            <span style="width:calc(100% - 20px);float:left">
           {{item.title}}</span>
           </router-link>
            <span v-on:click="deleteDiary(item,index)"class="delete">
              <img src="../../assets/image/delete.png">
            </span>
          </p>
          <router-link :to="{ path: '/diary/detail', query: { diaryid: item.id }}">
          <p class="time">{{item.createTime|time}}</p>
          <p class="dis" style="overflow:hidden">{{item.content}}</p>
          <div class="img">
            <img v-for="site in item.icons"v-bind:src="'http://' + site" alt="">

          </div>
          <p class="bot">
            <a href="javascript:;" class="love">{{item.likedTimes}}</a>
            <a href="javascript:;" class="comment">{{item.commentTimes}}</a>
          </p>
          </router-link>
        </div>
      
      </article>

    </div>
  </div>
</template>

<script type="text/babel">
  import http from '../../utils/axios'
  import api from '../../utils/api'

  import Vue from 'vue'
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

    return H +':'+i;
  });
  Vue.filter('month', function (value) {//value为13位的时间戳
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

    return add0(m) + '/' + add0(d);
  });
  export default {
    name: 'hello1',
    data() {
      return {
        diaryList: ''
      }
    },
    created() {
      document.title = '我的日记'
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
        const res = await http.get(api.selectMyDiary,params)
        if (res.status == 200) {
          this.diaryList = res.data.data.rows
          console.log(this.diaryList)
        }
      },
      deleteDiary: async function(item,index) {
        let params = {
          id:item.id
        }
        const res = await http.post(api.delDiary,params)
        if (res.status == 200) {
          this.diaryList.splice(index,1);
          
        }
      }
    }
  }
</script>


<style lang="sass" scoped>
  .year
    font: bold 0.35rem/0.24rem '微软雅黑'
  .diaryMy
    margin-left: 0.5rem
    border-left: 1px solid #ddd
    .item
      padding: 0.3rem
      margin-bottom: 0.3rem
      border-lfet: 1px soild #eee
      position: relative
      .date
        display: flex
        background: #fff
        flex-direction: row
        border-radius: 3px
        width: 1rem
        height: 0.3rem
        position: absolute
        left: -0.3rem
        top: 0.3rem
        font: 0.12rem/0.24rem '微软雅黑'
        text-align: center
        left: -0.5rem
        justify-content: center
        align-items: center
      .arc
        background: url("../../assets/image/bookbg.png") no-repeat
        background-size: 6.35rem 5.62rem
        padding: 0.5rem 0.5rem
        height: 5.52rem
        width: 6.35rem
        .tit
          font: 0.28rem/0.4rem '宋体'
          color: #666
          height: auto
          overflow: hidden
        .time
          font: 0.24rem/0.5rem '宋体'
          color: #999
        .dis
          font: 0.24rem/0.3rem '宋体'
          color: #666
          max-height: 70px
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
        .delete
          img
           width: 0.4rem
           height: 0.4rem
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

