<template>
  <div>
    <div class="bookInfoContent" >
        <div class="imgInfo">
          <img v-bind:src="'http://' + bookContent.icon">
        </div>

          <mt-cell v-bind:title="bookContent.title">
            <span v-if="collected">
             <img src="../assets/image/saveh.png" v-on:click="changeStates()">
          </span>
            <span v-else>
             <img src="../assets/image/savenor.png" v-on:click="changeStates()">
          </span>
            <span>收藏</span>
            </mt-cell>

          <ul class ="bookInfoMoney">
            <li>
            ￥{{bookContent.ePrice}}e币
            <span>原价：<s>{{bookContent.initCost}}</s></span>
            <!--<span>其他平台：{{bookContent.otherCost}}</span>-->
            <span>节省：{{bookContent.saveCose}}</span>
            </li>
          </ul>
          <ul class="comment">
             <li> <p>注：捐书可以获得e币，租书所使用的E币会在每学期还书时退还到账户，第二学期可继续使用，大学四年免费</p></li>
          </ul>
          <ul class="bookInfo">
             <li> ISBN:{{bookContent.isbn}}</li>
             <li> 作者:{{bookContent.author}}</li>
             <li> 出版社:{{bookContent.publisher}}</li>
          </ul>
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
        <ul class="someComment">
            <li>
            还书截止日：从拿书就开始计算，半年时间换一次（180天）
            </li>
            <li>
            注：租赁书籍将每本书收取5元押金，当书籍归还时自动退还至微信。书籍可以做笔记，不要浸湿残损即可。租赁到期后，如果您想保留此书，只需支付剩余差价即可。
            </li>
        </ul>
    </div>
    <div class="actionButton">
            <button v-on:click="rent">我要租书<span>￥{{bookContent.ePrice}}e币/学期</span></button>
            <!-- <button v-on:click="alertMessage('此功能暂未开放,可到店里选购！')">
              我要租书<span>￥{{bookContent.ePrice}}e币/学期</span>
            </button> -->
            <button v-on:click="donate">我要捐书<span>可得：￥{{bookContent.getEprice}}e币</span></button>
    </div>
    <mt-popup
  v-model="donateVisible"
  position="center" width="90%" class="donateDialog">
      <div class="donation">
        <mt-radio
          title="笔记"
          v-model="value"
          :options="options"
          class="note">
        </mt-radio>
          <mt-field label="类型"  v-model="type"></mt-field>
          <div class="m-cell" id="selectedAdd">
            <div class="cell-item">
                <div class="cell-left">地址</div>
                <div class="cell-right cell-arrow">{{address}}</div>
            </div>
        </div>
        <div class="m-cell" >
            <div class="cell-item">
                <div class="cell-left">上门</div>
                <div class="cell-right cell-arrow">每学期末，E书上门取书</div>
            </div>
        </div>
        <div class="twoButton">
            <button v-on:click="cancleDonate">取消</button>
            <button v-on:click="donateBook">捐赠此书</button>
       </div>
      </div>
      </mt-popup>

      <div class="myshopCartB">
        <router-link to="/shoppingCart">
          <img src="../assets/image/shopcart.png">
        </router-link>
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
      bookContent:{},
      type:'七成新',
      address:'',
      donateVisible:false,
      value:1,
      options:[
        {label:'有笔记',value:1},
        {label:'无笔记',value:0}
      ]


    }
  },
  created() {
      document.title = '图书详情'
    },
  mounted () {
  var that= this;
    document.getElementById('selectedAdd').onclick = function(){
        that.selecteAdd();
      };
      var address = JSON.parse(window.localStorage.getItem('selected'));
    if(address){
      this.address = address.username+address.phone+address.college;
      this.address = this.address.substr(0,20)+'..';
      this.addressId = address.id;

      this.donateVisible = true;
    }
    var isbn = JSON.parse(window.localStorage.getItem('openBookInfo'));
    this.getBookInfo(isbn);
    window.localStorage.removeItem('selected');
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
    addHotValue:async function (bookId) {
      let params = {
        bookid:this.bookContent.id,
      }
      const res = await http.get(api.hotValue, params)
      if (res.status == 200) {

      }

    },
    changeStates:async function(bookId){
         let params = {
        bookid :this.bookContent.id
      }
      if(this.collected){
          const res = await http.post(api.removeCollectBook, params)
          if (res.status == 200) {
             this.collected = !this.collected;
             this.alertMessage('已取消收藏');
          }
      }else{
          const res = await http.post(api.collectBook, params)
          if (res.status == 200) {
             this.collected = !this.collected;
             this.alertMessage('收藏成功');
          }
      }
    },
    donate :async function(){
      this.donateVisible = true;
    },
    selecteAdd(){
        if(window.localStorage){
          window.localStorage.removeItem('donate');
          window.localStorage.setItem('donate',JSON.stringify(this.bookContent.isbn));
          this.$router.push({path: '/addList'});
        }
    },
    rent :async function(){
        let params = {
          productid : this.bookContent.id,
          numbers:this.count
        }
        const res = await http.post(api.addShoppingCart, params)
          if (res.status == 200) {
           this.alertMessage('加入购物车成功');
          }
    },
    getBookInfo :async function(key){
         
          const res ={};
          var isScan = JSON.parse(window.localStorage.getItem('isScan'));
          if(isScan){
            let params = {
              content :key.trim()
            };
            const res = await http.get(api.findBookByIsbn, params)
             if (res.status == 200) {
            this.bookContent = res.data.data[0];

              if(!this.bookContent){
                this.alertMessage('没有找到此书');
                //this.$router.push({path: '/'});
              }
              window.localStorage.removeItem('isScan');
            }

          }else{
            let params = {
                bookid:key,
              }
              const res = await http.get(api.hotValue, params)
              if (res.status == 200) {
                  this.bookContent = res.data.data;
              }
          }

    },
    cancleDonate(){
      this.donateVisible = false;
    },
    donateBook:async function(){
      let params = {
            bookId :this.bookContent.id,
            addressId:this.addressId,
            degree:this.type,
            isNote:this.value
          }
          const res = await http.post(api.donateBook, params)
          if (res.status == 200) {
            this.donateVisible = false;
            this.alertMessage('捐赠成功');
          }else{
            this.alertMessage('捐赠失败');
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
<style scoped>
    @import '../assets/style/info.css';
.mint-popup{width:90%}
.mint-field .mint-cell-title{width:55px !important;position:absolute}
.m-cell:after{border-bottom:none;}
.m-cell{margin-bottom:0px}

</style>
