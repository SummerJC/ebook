<template>
  <div class="my">
    <article>
      <div class="top arrow">
        <span v-if="icon!=''">
          <img  v-bind:src="icon" alt="">
        </span>
        <span v-else>
          <img src="../assets/image/userhead.png" alt="">
        </span>
        <div class="right">
          <p>用户名: {{userName}}</p>
          <p v-if="phoneNum">电话：<span style="color:#32ba7c">
            {{phoneNum}}</span>
          </p>
          <p v-else>电话：<router-link :to="{ path: '/bindPhoneNum', query: {  phoneNum: phoneNum}}">绑定电话</router-link></p>
        </div>
        <router-link class="next"to="myInfo">
        <div class="modify">
              <img src="../assets/image/ebterarrow.png">
        </div>
        </router-link>
      </div>
      <div style="margin-left: 15px;height: 60px;border-top: 1px solid #e1e1e1;display: flex">
        <img style="width: 0.4rem;text-align: center; margin: auto 0;" slot="icon" src="../assets/image/money.png" >
        <p style="font-size: 0.3rem;height: 60px;line-height: 60px;margin-left: 4px">余额：</p>
        <p style="font-size: 18px;color: #333333;height: 60px;line-height: 60px">{{blance}} e币</p>
        <P style="line-height: 60px;width:calc(100% - 150px);text-align: right;margin-right: 15px">
          <router-link to="/Donatedbooks"><span   style="padding:12px 16px 12px 16px;border: 1px solid #32ba7c;font-size: 14px;color: #ffffff;border-radius: 5px;background: #32ba7c" >充值</span></router-link></P>
      </div>
    </article>

     <yd-cell-group>
      <yd-cell-item arrow href="/shoppingCart" type="link" >
        <img slot="icon" src="../assets/image/shopcart.png" >
        <span slot="left">购物车</span>
      </yd-cell-item>
      <yd-cell-item arrow href="/Study" type="link">
        <img slot="icon" src="../assets/image/wdsf.png">
        <span slot="left">我的书房</span>
      </yd-cell-item>
      <yd-cell-item arrow href="/myOder" type="link">
        <img slot="icon" src="../assets/image/wddd.png" >
        <span slot="left">我的订单</span>
      </yd-cell-item>
      <yd-cell-item arrow href="/addList" type="link">
        <img slot="icon" src="../assets/image/shdz.png">
        <span slot="left">收货地址</span>
      </yd-cell-item>
      <yd-cell-item arrow href="" type="link">
        <img slot="icon" src="../assets/image/syzn.png" >
        <span slot="left">使用指南</span>
      </yd-cell-item>
    </yd-cell-group>

    <BottomMenu v-bind:selectedId='selectedId'></BottomMenu>

  </div>
</template>
<script type="text/babel">
  import http from '../utils/axios'
  import api from '../utils/api'
  import BottomMenu from '../components/bottomMenu'
 export default {
    name: 'hello1',
    components:{BottomMenu},
     data() {
      return {
          userName:'',
          icon:'',
          blance:'',
          phoneNum:null,
          selectedId:'4'

      };
    },
    created() {
        document.title = '我的'
    },
    mounted() {
      window.localStorage.clear();
      this.getUserInfo();
    },
    methods:{
        getUserInfo: async function(){
         const res = await http.get(api.getUserInfo);
          if(res.status == 200){
              this.userName=res.data.data.petName;
              this.icon = res.data.data.icon;
              this.blance=res.data.data.blance;
              this.phoneNum = res.data.data.phone;
          }
        }
    }
}
</script>

<style lang="sass">
  .my
    yd-cell-group
      padding: 0.2rem 0
    article
      margin-bottom: 0.3rem
      background: #fff
      .top
        padding: 0.4rem
        display: flex
        font-family: YDUI-INLAY
        font-size: .34rem
        color: #c9c9c9
        content: "\E608"
        box-sizing: border-box
        outline: none
        margin-left: .05rem
        margin-right: -.08rem
        img
          border-radius: 2rem
          height: 1.0rem
          width: 1.0rem
        .right
          padding-left: 0.3rem
          p
            font: .3rem/.5rem 'Ping-Fang-SC-Regular'
            color: #999
            a
              border: 1px solid #32ba7c
              display: inline-block
              padding: 0 0.2rem
              border-radius: 3px
              color:#32ba7c
        .modify
          margin-left: 90%
          img
            width: 16px
            height: 28px
            margin: 10px 10px
        .next
          margin-left: 20%
</style>
