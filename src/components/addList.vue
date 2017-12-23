<template>
<div class="main">
  <div class="content">
  <ul>
    <li v-for="(site,index) in contentList">
    <div v-on:click="selectedAdd(site,index)">
       <mt-cell v-bind:title = "site.username+' '+site.phone" 
       v-bind:label="site.college+ ' '+site.flat+ ' '+
       site.roomNum" >
       <div v-on:click.stop="addItem(site,index)">
       编辑
       </div>
       </mt-cell>
       </div>
     </li>
    </ul>
  </div>
  <mt-tabbar class="buttom">
      <mt-button class="activeButton" v-on:click="newAdd">新增地址</mt-button>
  </mt-tabbar>
</div>
</template>
<script>
import http from '../utils/axios'
import api from '../utils/api'
export default {
  name: 'Login',
  data (){
   return{
   contentList:[
     ],
     donatebookIsbn:''
     
   }
  
  },
   created() {
      document.title = '收货地址'
    },
  mounted(){
    this.getmyAddress();
    this.donatebookIsbn =JSON.parse(window.localStorage.getItem('donate'));
  },
  methods : {
    addItem(item,index){
    if(window.localStorage){
        var obj = {
          id:item.id,
          username : item.username,
          phone:item.phone,
          college:item.college,
          flat:item.flat,
          roomNum :item.roomNum,
        };
        window.localStorage.setItem('info', JSON.stringify(obj))
        this.$router.push({path: '/inputAdd'});
      }
    },
    newAdd(){
      this.$router.push({path: '/inputAdd'});
    },
    selectedAdd : async function(site){
        const id={
            addressid:site.id
        };
        const res = await http.post(api.modifydefAddress,id)
          if (res.status == 200){
            if(this.donatebookIsbn!=''&&this.donatebookIsbn){
              site.donatebookIsbn = this.donatebookIsbn;
              window.localStorage.setItem('selected', JSON.stringify(site))
              this.$router.push({path: '/bookInfo'});
            }else{
               this.$router.push({path: '/scNoAdd'});
            }
           
          }  
    },
    getmyAddress: async function(){
      const res = await http.get(api.myAddress)
      if (res.status == 200){
       this.contentList = res.data.data
      }
    }
  },
  
}

</script>
<style scoped>
.main{width:100%;height:100%;padding:0;margin:0;}
.main .buttom{height:60px;}
.main .content button{background:#32ba7c;color:#ffffff;}
.main .buttom button{width:90%;margin:9px auto;background:#32ba7c;color:#fff;}
</style>