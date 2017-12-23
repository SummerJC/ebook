<template>
<div>
  <div class="myOder" style="background: #e9e9e9;" v-for="site in myOrders">
    <div style="height: 210px;background: #fff;margin-bottom: 10px">
      <mt-cell v-bind:title="'订单编号:'+site.orderNo" style="font-size: 15px;color: #5a5a5a;padding-right:5px;padding-left:5px;border-bottom: 1px solid #e9e9e9">
        <span v-if="site.orderStatus==0"style="font-size: 15px;color: #909090">未支付</span>
        <span v-if="site.orderStatus==1"style="font-size: 15px;color: #73c54f">已支付</span>
        <span v-if="site.orderStatus==2"style="font-size: 15px;color: #909090">已取消</span>
        <span v-if="site.orderStatus==3"style="font-size: 15px;color: #73c54f">已预定</span>
      </mt-cell>
      <div style="padding:15px;width:100%;overflow:hidden">
        <div class="oderImg">
          <img style="float: left ;width: 65px;height: 87px" v-bind:src="'http://'+site.productIcon">
        </div>
        <ul class="goodsInfo" style="margin-left: 10px;">
          <li class="name"style="font-size: 15px;color: #5a5a5a;">
          {{site.productName}}</li>
          <li class="odermoney" style="font-size: 12px;color: #ff6600;">
            {{site.productPrice+'X'+site.count}}
          </li>
        </ul>
      </div>
      <div>
        <mt-cell width="100%">
          <span class="time">下单时间：{{site.createTime | time}}</span>
        </mt-cell>
      </div>
    </div>

  </div>
  
</div>
</template>
<script>
import http from '../utils/axios'
import api from '../utils/api'
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

    return y + '.' + add0(m) + '.' + add0(d)+' '+H +':'+add0(i)+':'+s;
});
export default{
    name:'myOder',
    data(){
      return{
        myOrders:[]
      }
    },
    created() {
      document.title = '我的订单'
    },
    mounted(){
      this.getMyOrders();
    },
    methods:{
       getMyOrders: async function(){
        const res = await http.get(api.myOrders)
          if (res.status == 200){
             this.myOrders = res.data.data
          }
      },
    

  }
}
</script>
<style  scoped>
.myOder{
  height: calc(100% - 50px)!important;
  overflow: auto;
}
.myOder.odermoney{
  width: 63px;
  height: 97px;
  float: left;
  padding: 15px;
}
.myOder .goodsInfo{
  width: calc(100% - 100px);
  float: left;
  line-height: 22px;
}
.myOder.goodsInfo.odermoney{
  color: red;
}
.time{
  font-size:13px;
}

</style>
