<template>
<div>
  <div class="commodityInfo" >
      <div class="imgInfo">
        <img v-bind:src="'http://' + bookContent.icon">
      </div>
        <mt-cell v-bind:title="bookContent.name">
          </mt-cell>

        <mt-cell class ="money" v-bind:title="'￥'+ bookContent.price"></mt-cell>
        <mt-cell v-bind:title="'简介：' + bookContent.introduce"></mt-cell>

         <ul class="btn-numbox">
            <li><span class="number">数量:</span></li>
            <li>
                <ul class="count">
                    <li><span v-on:click="minus()" class="num-jian">-</span></li>
                    <li><input type="text" class="input-num"
                    v-model="count" /></li>
                    <li><span v-on:click="add()" class="num-jia">+</span></li>
                </ul>
            </li>
　　　  </ul>
    </div>
    <div class="actionButton">
            <button>私人定制</button>
            <!-- <button v-on:click="alertMessage('此功能暂未开放,可到店里选购！')">加入购物车</button> -->
            <button v-on:click="addShoppingCart">加入购物车</button>
      <!--addShoppingCart-->
    </div>
    <div class="myshopCart" v-on:click="alertMessage('此功能暂未开放!')">
       <!-- <router-link to="/shoppingCart"> -->
          <img src="../assets/image/shopcart.png">
       <!--  </router-link> -->
    </div>
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
      count:1,
      collected:false,
      bookContent:{}
    }
  },
  mounted () {
    this.getBookInfo();
   },
   created() {
      document.title = '商品详情'
    },
  methods:{
      minus(){
        if(this.count>1){
          this.count=parseInt(this.count)-1;
        }
     },
     add(){
       this.count=parseInt(this.count)+1;
     },
     /* addShoppingCart: async function(){
      let params = {
        productid :this.bookContent.id
      }
      const res = await http.get(api.addShoppingCart, params)
      if (res.status == 200) {
        this.bookContent = res.data.data;
      }

    },*/
    getBookInfo: async function(){
      this.bookContent = JSON.parse(window.localStorage.getItem('openBookInfo'));
    },
     addShoppingCart: async function(){
        let params = {
          productid :this.bookContent.id,
          numbers:this.count
        }
        const res = await http.post(api.addShoppingCart, params)
          if (res.status == 200) {
             this.alertMessage('加入购物车成功');
          }
     },
     alertMessage(message){
          Toast({
              message: message,
              position: 'center',
              duration: 2000
            });
     }
  },

}

</script>
<style scoped>
    @import '../assets/style/info.css';

</style>
