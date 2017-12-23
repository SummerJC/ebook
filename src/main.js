// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueResource from 'vue-resource'
import YDUI from 'vue-ydui';
import MintUi from 'mint-ui';
import 'vue-ydui/dist/ydui.rem.css';
import 'mint-ui/lib/style.css';
  import http from './utils/axios'
  import api from './utils/api'
Vue.use(YDUI);
Vue.use(MintUi);
Vue.use(VueResource)
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
    data(){
  	return{
  		 sharePram : {
          'title' : 'E本书',
          'desc' : '一家专门做教材租赁的网站！',
          'link' : 'http://www.ebenshu.cn',
          'img':'http://www.ebenshu.cn/logo.png'
        },
        number:1,
        openId:''
  	}
  },
  mounted() {
  	//this.getAccessCode();
    this.getCode();
  },
  methods:{
     getAccessCode() {
       this.openId=this.getcookie("wxopenid");
      var access_code=this.GetQueryString('code');
      if (this.openId==""){
        if (access_code == null) {
          var fromurl = this.UrlEncode(location.href);
          var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2b2bb3b3bac7d695&redirect_uri=' + fromurl+ '&response_type=code&scope=snsapi_base&state=123#wechat_redirect';
          window.location.href=url;
        }else {
          this.getCode(access_code);
        }
      }else{
          this.getCode();
      }
    },
    getCode: async function (access_code){
      this.openId=this.getcookie("wxopenid");
      /*var params = '';*/
      let params = {
           openid:'oVesdwaO1Ae4cKEaY9ktbjJylgu0',
        }
    /*  if(this.openId==""){
        params = {
          code:access_code
        }
      }else{
        params = {
           openid:this.openId,
        }
      }  */
      if(JSON.parse(window.localStorage.getItem('isLogin'))!='ok'){
          const res = await http.get(api.login, params);
          if (res.status == 200) {            
            this.openId= res.data.data.user.username;
            this.addcookie('wxopenid',this.openId,72000);
            window.localStorage.setItem('isLogin', JSON.stringify('ok'));
            window.location.reload();
           
          }
        }else{
          this.getShareReady();
        }
      },
       GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
          return unescape(r[2]);
        return null;
      },
      UrlEncode(str) {
        var ret = "";
        var strSpecial = "!\"#$%&'()*+,/:;<=>?[]^`{|}~%";
        var tt = "";

        for (var i = 0; i < str.length; i++) {
          var chr = str.charAt(i);
          var c = this.str2asc(chr);
          tt += chr + ":" + c + "n";
          if (parseInt("0x" + c) > 0x7f) {
            ret += "%" + c.slice(0, 2) + "%" + c.slice(-2);
          } else {
            if (chr == " ")
              ret += "+";
            else if (strSpecial.indexOf(chr) != -1)
              ret += "%" + c.toString(16);
            else
              ret += chr;
          }
        }
        return ret;
      },
      str2asc(strstr) {
        return ("0" + strstr.charCodeAt(0).toString(16)).slice(-2);
      },
       addcookie(name,value,expireHours){
        var cookieString=name+"="+escape(value)+"; path=/";
        //判断是否设置过期时间
        if(expireHours>0){
          var date=new Date();
          date.setTime(date.getTime+expireHours*3600*1000);
          cookieString=cookieString+"; expire="+date.toGMTString();
        }
        document.cookie=cookieString;
      },
      getcookie(name){
        var strcookie=document.cookie;
        var arrcookie=strcookie.split("; ");
        for(var i=0;i<arrcookie.length;i++){
          var arr=arrcookie[i].split("=");
          if(arr[0]==name)return decodeURIComponent(arr[1]); //增加对特殊字符的解析
        }
        return "";
      },
      delCookie(name){//删除cookie
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval=getcookie(name);
        if(cval!=null) document.cookie= name + "="+cval+"; path=/;expires="+exp.toGMTString();
      },
  	getShareReady: async function(){
        let parms = {
          targetUrl:window.location.href
        }
        const res = await http.get(api.findSign,parms)
        if(res.status == 200){
          var myself=this;
            var wxConfig=res.data.data;
            wx.config({
//                debug: true,
                appId: wxConfig.appid,
                timestamp: wxConfig.timestamp,
                nonceStr: wxConfig.noncestr,
                signature: wxConfig.signature,
                jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo']
            });
            wx.ready(function () {
             wx.onMenuShareAppMessage({
                title: myself.sharePram.title,
                link:  myself.sharePram.link,
                desc:  myself.sharePram.desc,
                imgUrl:  myself.sharePram.img,
                success: function () {

                },
                cancel: function () {
                  alert('取消了分享');
                }
              });
              wx.onMenuShareTimeline({
                title: myself.sharePram.title,
                link:  myself.sharePram.link,
                desc:  myself.sharePram.desc,
                imgUrl:  myself.sharePram.img,
                success: function () {

                },
                cancel: function () {
                  alert('取消了分享');
                }
              });
              wx.onMenuShareQQ({
		          title: myself.share.title,
		          link: myself.share.link,
		          imgUrl: myself.share.img,
		          success: function () {

		          },
		          cancel: function () {
		            alert('取消了分享');
		          }
		        });
		        wx.onMenuShareWeibo({
		          title: myself.share.title,
		          link: myself.share.link,
		          imgUrl: myself.share.img,
		          success: function () {

		          },
		          cancel: function () {
		            alert('取消了分享');
		          }
		        });
            });

          wx.error(function(res) {
             
          });
        }

      }
  }
})
