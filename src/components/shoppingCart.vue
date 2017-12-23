<template>
<div class="shoppingCartContent">

   <div>
  <div class="scNoAddContent">
    <div class="header">
       <ul>
        <span v-if="selecteAll" v-on:click="cancleSlectedAll">
           <img class ="selecteAll"src="../assets/image/selected.png"/>
        </span>
        <span v-else v-on:click="selectedAll">
           <img  class ="selecteAll"src="../assets/image/secnor.png"/>
        </span>
        全选
        <span v-on:click="deleteAll">清空购物车</span>
      </ul>
  </div>
    <div  v-for="(site,index) in contentList">
      <div>
        <span v-if="site.selected" v-on:click="cancleSlected(site,index)">
           <img class ="checkBox"src="../assets/image/selected.png"/>
        </span>
        <span v-else v-on:click="selected(site,index)">
           <img class ="checkBox"src="../assets/image/secnor.png"/>
        </span>
      </div>
      <div class="goodsImg">
        <img v-bind:src="'http://' + site.productIcon">
      </div>
      <ul class="goodsInfo">
        <li class="name">{{site.productName}}</li>
        <li class="selectedType">
          <span v-if="site.productType==0">
            类型：纪念品
           </span>
           <span v-else>
            类型：租赁
           </span>
        </li>
        <li class="cost">￥{{site.productPrice}}
          <span style="margin-left: 2px" v-if="site.productType==1">
            e币
           </span>
        </li>
        <ul class="btn-numbox">
              <li><span class="number" style="margin-right: 5px">数量：</span></li>
              <li>
                  <ul class="count">
                      <li><span v-on:click="minus(site,index)" class="num-jian">
                      -</span></li>
                      <li><input type="text" class="input-num"
                      v-model="site.count" /></li>
                      <li><span v-on:click="add(site,index)" class="num-jia">+</span></li>
                  </ul>
              </li>
  　　　  </ul>
      </ul>
    </div>
   </div>
    <div class="sendOeder">
      <ul>
        <li v-if="total>0"><button v-on:click="goPay">去结算</button></li>
        <li v-else><button style="background:#ccc">去结算</button></li>
        <li><p>实付</p><p>￥{{total}}</p></li>
        </ul>
    </div>

    </div>
</div>
</template>

<script>
  import http from '../utils/axios'
  import api from '../utils/api'
export default {
  name: 'payMethod',
  data () {
    return {
     selecteAll:false,
     total:0,
     contentList:[

     ]

    }
  },
  created() {
      document.title = '购物车'
    },
  mounted(){
    this.getInfo();
  },
  methods:{
    minus: async function (site,index){
          if(this.contentList[index].count==1){
            let params = {
              bookid :site.productId
            };
             const res = await http.post(api.delGoods, params)
              if (res.status == 200) {
                  this.contentList.splice(index,1);
                  this.selecteAll = false;
              }
          }else{
            site.count=parseInt(site.count)-1;
          }
          if(site.selected){
             this.countTotal(site);
          }

     },
     countTotal(site){
       var total = 0;
        this.contentList.forEach(function(arr){
               if(arr.selected){
                 total= (total*1000+arr.productPrice*1000*arr.count)/1000;
               }
            });
         this.total =total;
     },
     add(site,index){
       this.contentList[index].count=parseInt(this.contentList[index].count)+1;
       if(site.selected){
        this.total= (this.total*1000+site.productPrice*1000)/1000;
       }

     },
     cancleSlectedAll(){
        this.selecteAll = false;
        this.contentList.forEach(function(arr){
            arr.selected=false;
        });
        this.total=0;
     },
     selectedAll(){
        this.selecteAll = true;
        var total = 0;
        this.contentList.forEach(function(arr){
            arr.selected=true;
            total=(total*1000+arr.productPrice*1000*arr.count)/1000;
        });
        this.total =total;
     },
     cancleSlected(site,index){
          this.contentList[index].selected = false;
          var obj =  this.contentList[index];
          this.contentList.splice(index,1,obj);
          this.selecteAll = false;
          this.countTotal();
          this.selecteAll = false;


     },
     goPay(){
        var arr=[];
        var total=0;
        this.contentList.forEach(function(str){
            if(str.selected){
                arr.push(str);
                total= (total*1000+str.productPrice*str.count*1000)/1000;
            }
        });
        var obj = {
            product:arr,
            total:total
        }
        window.localStorage.setItem('goPay',JSON.stringify(obj));
        this.$router.push({path: '/scNoAdd',replace:true});
     },
     selected(site,index){
          this.contentList[index].selected = true;
          var obj =  this.contentList[index];
          this.contentList.splice(index,1,obj);
          var notSelectedAll = false;
          notSelectedAll = this.contentList.every(function(e){
              return e.selected;
          });
          if(notSelectedAll){
            this.selecteAll = true;
          }
          this.total = (this.total*1000+site.productPrice*site.count*1000)/1000;;
     },
     deleteAll:async function(){
          const res = await http.post(api.delGoods)
              if (res.status == 200) {
                 this.contentList.splice(0);
              }
     },
    getInfo: async function(){
        const res = await http.get(api.findShoppingCart)
          if (res.status == 200) {
            this.contentList = res.data.data
          }
     }

  }
}
</script>

<style scoped>
 @import '../assets/style/main.css';
 @import '../assets/style/info.css';
 .payButton{margin-top:20px;}
</style>
