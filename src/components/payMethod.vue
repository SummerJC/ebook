<template>
<div class="payMethosContent">
    <div class="title">请选择支付方式</div>
    <mt-radio
    align="right"
    v-model="value"
    :options="optionList">
  </mt-radio>
    <mt-button size="large" class="payButton" v-on:click="payOnSure">
     确认付款
    </mt-button>
</div>
</template>

<script>
 import http from '../utils/axios'
 import api from '../utils/api'
import { Toast } from 'mint-ui'
export default {
  name: 'payMethod',
  data () {
    return {
     value:'1',
     optionList:[{
        label: '直接购买',
        value: '1'
      },
      {
        label: '仅预定（只需支付服务费￥）',
        value: '2'
      }],
      productInfo:{}
    }
  },
  mounted(){
     var all =JSON.parse(window.localStorage.getItem('payMoney'));
     this.optionList[0].label='直接购买 ￥'+all.value;
     this.optionList[1].label='仅预定（只需支付服务费￥'+all.prevalue+')';

     this.productInfo ={
        productNum: all.orderNo,
        finalPay:all.value,
        prePay:all.prevalue,
      };

  },
   created() {
      document.title = '支付方式'
    },
  methods:{
    payOnSure: async function(){
        var that = this;
//        alert("finalPay=="+this.productInfo.finalPay+"prvalue=="+this.productInfo.prePay);
        var fee = this.value=='1'?this.productInfo.finalPay:this.productInfo.prePay;
        const parms={
          fee:fee,
          orderNo:this.productInfo.productNum
        };
        const res = await http.get(api.prePay,parms);
        if(res.status==200){
//          alert("fee=="+fee+"order=="+this.productInfo.productNum);
//          alert("wxcofig=="+res.data.data);
           var wxConfig=res.data.data;
            wx.config({
                appId: wxConfig.appId,
                timestamp: wxConfig.timeStamp,
                nonceStr: wxConfig.nonceStr,
                signature: wxConfig.paySign,
                jsApiList: ['chooseWXPay']
            });
            wx.ready(function () {
                that.onBridgeReady(wxConfig);
            })
        }
    },
    onBridgeReady(wxConfig){
      var that=this;
      if (typeof WeixinJSBridge == "undefined"){
            if( document.addEventListener ){
                document.addEventListener('WeixinJSBridgeReady', that.onBridgeReady, false);
            }else if (document.attachEvent){
                document.attachEvent('WeixinJSBridgeReady', that.onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', that.onBridgeReady);
            }
        }else{

         WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
                "appId":wxConfig.appId,
                "timeStamp":wxConfig.timeStamp,
                "nonceStr":wxConfig.nonceStr,
                "package":wxConfig.package,
                "signType":"MD5",
                "paySign":wxConfig.paySign
            },
            function(res){
                if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                     Toast({
                      message: '支付成功',
                      position: 'center',
                      iconClass: 'icon icon-success',
                      duration: 2000
                    });
                    var isbn = window.localStorage.getItem('openBookInfo');
                    window.localStorage.clear();
                    window.localStorage.setItem('openBookInfo',isbn);
                    window.history.go(-3);
                }else{
                    Toast({
                      message: '支付失败',
                      position: 'center',
                      duration: 2000
                    });
                }
          }
          );
        }
    }
  }
}
</script>

<style scoped>
 @import '../assets/style/main.css';
 .payButton{margin-top:20px;}
</style>
