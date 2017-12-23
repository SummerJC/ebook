<template>
    <div>
      <button  v-on:click='scanQR' href="javascript:;" style="width:calc(100% - 40px);margin-left:20px;background: #32ba7c;color: #ffffff" type="button"  class="btn-block btn-primary">捐书得e币</button>
      <ul class="comment">
        <li  style="    width: calc(100% - 30px); height: auto; background: #fff7e4; color: #9e781f; margin: 10px auto;"> <p style="padding: 15px 10px;">注：捐书可以获得e币，租书所使用的e币会在每学期还书时退还到账户，第二学期可继续使用，大学四年免费</p></li>
      </ul>
    </div>
</template>
<style scoped>
</style>
<script>
  import http from '../utils/axios'
  import api from '../utils/api'
  import axios from 'axios'
  export default {
    name: 'hello1',
    data() {
      return {
      }
    },
    created() {
      document.title = '捐书'
    },
    mounted() {
      this.getReady();
    },
    methods: {
      getReady: async function(){
        let parms = {
          targetUrl:window.location.href
        }
        const res = await http.get(api.findSign,parms)
        if(res.status == 200){
            var wxConfig=res.data.data;
            wx.config({
                appId: wxConfig.appid,
                timestamp: wxConfig.timestamp,
                nonceStr: wxConfig.noncestr,
                signature: wxConfig.signature,
                jsApiList: ['scanQRCode']
            });
            wx.ready(function () {

            })
          wx.error(function(res) {
             // alert("出错了：" + res.errMsg);
          });
        }

      },
      scanQR: async function(){
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
        this.$router.push({path: '/bookInfo'});
      },
      seeBook(site){
        if(window.localStorage){
          window.localStorage.removeItem('openBookInfo');
          window.localStorage.setItem('openBookInfo', JSON.stringify(site.id));
          this.$router.push({path: '/bookInfo'});
        }
      }
    }

}</script>
