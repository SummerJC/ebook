<template>
  <div class="comment">
    <p class="title"><input type="text" class="title" placeholder="标题 （必填，20字以内）"v-model="DiaryTitle" v-on:input="checkTitle"></p>
    <div class="context">
      <textarea placeholder="写下你的心情日记，或者他想和朋友交流的话题，300字以内" v-model="DiaryComment" v-on:input="checkContent"></textarea>
      <div id="preView" style="width:100%;overflow:hidden">
        <div style="float:left">

            <img  v-if="images.length>0" v-for="site in images" v-bind:src = "'http://'+site" 
            style="margin:3px;width:50px;float:left">
            <img src="" style="display:none"v-else>
        </div>
        <form enctype="multipart/form-data" method="post" target="nm_iframe">
          <a href="javascript:;" class="upload" style="float:left">
           <input type="file"  name="file" id="imgLoad"  multiple="multiple"  @change="onFileChange">
          </a>
            </form>
            <div style="width:50px;height:50px;float:left;line-height:45px;
            margin:3px;border:1px solid #ccc;color:#ccc;font-size:26px;
            text-align:center" v-on:click="delImg">—</div>
        </div>
            <iframe id="id_iframe" name="nm_iframe" style="display:none;"></iframe>
      </div>

    <p class="lookToMe">
      <span>仅自己可见</span>
      <yd-switch v-model="switch1"></yd-switch>
    </p>
    <div id="result"></div>
    <p class="commit"><a href="javascript:;"  v-on:click="commitdiary" >提交</a></p>
  </div>
</template>

<script type="text/babel">
  import http from '../../utils/axios'
  import api from '../../utils/api'
  import { Toast } from 'mint-ui'
  //import axios from 'axios'
  export default {
    name: 'hello1',
    data() {
      return {
        diaryId: this.$route.query.diaryid,
        DiaryComment: '',
        DiaryTitle:'',
        switch1: false,
        images:[]
      }
    },
    created() {
      document.title = '写日记'
    },
    mounted() {
    },
    methods: {
      $$(obj) {
        return document.getElementById(obj);
      },

      onFileChange: function(e) {
        var that = this;
        var fileObj = document.getElementById("imgLoad").files;
        console.log(fileObj[0]);
        if( that.images.length>1 || fileObj.length>2){
          this.alertMessage("最多只能上传两张照片！");
          return;
        }
        var FileController = api.uploadImg;
        var preView = document.getElementById("preView");
                     
        for(var i=0;i<fileObj.length;i++){
            var img = fileObj[i];
            if(img.size/1024 > 1025){
              that.photoCompress(img, {
                      width:500,
                      height:500,
                      quality: 0.2
                  }, function(base64Codes){
                      //console.log("压缩后：" + base64Codes.length / 1024 );
                      var bl = that.convertBase64UrlToBlob(base64Codes);
                     var form = new FormData();   
                      form.append("file", bl, "file_"+Date.parse(new Date())+".jpg"); // 文件对象
                      var xhr = new XMLHttpRequest();  // XMLHttpRequest 对象
                      xhr.open("post", FileController, true); //post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
                      xhr.onload = function () {
                        if(xhr.responseText)
                          that.images.push(JSON.parse(xhr.responseText).data.imgpaths[0]);
                      }; //请求完成
                      xhr.onerror = function () {
                       that.alertMessage("新增图片失败");
                      };
                      xhr.send(form); //开始上传，发送form数据
                  });
            }else{
              var form = new FormData();   
                form.append("file", img); // 文件对象
                var xhr = new XMLHttpRequest();  // XMLHttpRequest 对象
                xhr.open("post", FileController, true);
                //post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
                xhr.onload = function () {
                      if(xhr.responseText)
                         that.images.push(JSON.parse(xhr.responseText).data.imgpaths[0]);
                      }; //请求完成
                xhr.onerror = function () {
                       that.alertMessage("新增图片失败");
                      }; //请求失败
                  //开始上传，发送form数据
                xhr.send(form);  
              }
        }  
            
               
        },
        photoCompress(file,w,objDiv){
          var that = this;
            var ready=new FileReader();
                ready.readAsDataURL(file);
                ready.onload=function(){
                    var re=this.result;
                    that.canvasDataURL(re,w,objDiv)
                }
        },
        canvasDataURL(path, obj, callback){
             var img = new Image();
             img.src = path;
             img.onload = function(){
              var that = this;
              // 默认按比例压缩
              var w = that.width,
               h = that.height,
               scale = w / h;
               w = obj.width || w;
               h = obj.height || (w / scale);
              var quality = 0.2;  // 默认图片质量为0.5
              //生成canvas
              var canvas = document.createElement('canvas');
              var ctx = canvas.getContext('2d');
              // 创建属性节点
              var anw = document.createAttribute("width");
              anw.nodeValue = w;
              var anh = document.createAttribute("height");
              anh.nodeValue = h;
              canvas.setAttributeNode(anw);
              canvas.setAttributeNode(anh); 
              ctx.drawImage(that, 0, 0, w, h);
              // 图像质量
              if(obj.quality && obj.quality <= 1 && obj.quality > 0){
               quality = obj.quality;
              }
              // quality值越小，所绘制出的图像越模糊
              var base64 = canvas.toDataURL('image/jpeg', quality);
              // 回调函数返回base64的值
              callback(base64);
            }
        },
        /**  
         * 将以base64的图片url数据转换为Blob  
         * @param urlData  
         *            用url方式表示的base64图片数据  
         */  
       convertBase64UrlToBlob(urlData){  
            var arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], {type:mime});
        },
        delImg(){
          if(this.images.length>0)
            this.images.shift();
        },
        commitdiary: async function () {
          var images = this.images.join(";");
        let params = {
//          diaryId: this.diaryId,
          content : this.DiaryComment,
          title:this.DiaryTitle,
          visibility:!this.switch1,
          icon:images
        }
        const res = await http.post(api.addDiary,params)
        if (res.status == 200) {
          this.$router.push({ path: '/diary/my', query: { diaryid: this.diaryId }})

        }
      },
      checkContent(){
          if(this.DiaryComment.length>300){
              this.alertMessage("日记最多可输入300字");
              this.DiaryComment=this.DiaryComment.substr(0,300);

          }
      },
      checkTitle(){
        if(this.DiaryTitle.length>20){
              this.alertMessage("日记标题最多可输入20字");
              this.DiaryComment=this.DiaryComment.substr(0,20);

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
  .comment
    .title
      width: 100%
      font: 0.3rem/1rem '宋体'
      background: #fff
      input
        border: 0px
        border-bottom: 1px solid #eee
        padding: 0px
        padding: 0 3%
    .context
      position: relative
      .loadImg
        position: absolute
        left: 0.5rem
        bottom: 1rem
        img
          width: 1.5rem
          height: 1.5rem

      textarea
        width: 100%
        height: 7.5rem
        padding: 3%
        font: 0.3rem/0.5rem '宋体'
        border: 0
    .lookToMe
      background: #fff
      border-bottom: 1px solid #eee
      font: 0.3rem/1rem '宋体'
      display: flex
      padding: 0 0.5rem
      color: #666
      span
        flex: 1
      input
        margin-top: 0.15rem
    p.commit
      display: flex
      justify-content: center
      align-items: center
      margin-top: 0.4rem
      a
        height: 0.8rem
        width: 6.7rem
        justify-content: center
        align-items: center
        color: #fff
        display: flex
        background: #32ba7c
        border-radius: 2px
        font: 0.3rem/0.8rem '宋体'
    .upload
          padding: 10px 6px
          height: 1rem
          margin: 3px
          line-height: 1rem
          width: 1rem
          position: relative
          border: 1px solid #ccc
          text-decoration: none
          color: #666
          display: block
          background: url("../../assets/image/addphoto.png")24px 24px
          input
                position: absolute
                overflow: hidden
                right: 0
                top: 0
                opacity: 0

</style>
