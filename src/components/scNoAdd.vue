<template>
<div>
	<div class="scNoAddContent">
		<div>
			<span v-if="displayNew" >
				<router-link to="addList">
					<mt-button class="selectAdd" size="large">
				     	选择收货地址
				    </mt-button>
			    </router-link>
			</span>
			<span v-else >
			    <div>
			       <mt-cell v-bind:title = "address.username+' '+address.phone"
			       v-bind:label="address.college+ ' '+address.flat+ ' '+
			       address.roomNum" style="min-height:56px">
				       <div class="selectAdd" >
				       		<router-link to="addList">
				       			<img src="../assets/image/ebterarrow.png"/>
				       		</router-link>
				       </div>
			       </mt-cell>
			      </div>
			</span>
		</div>
    <div style="margin-top:3px"></div>
		<div v-for="site in contentList">
			<div class="goodsImg">
				<img v-bind:src="'http://' + site.productIcon">
			</div>
			<ul class="goodsInfo">
				<li class="name">{{site.productName}}<span>数量:{{site.count}}</span>
				</li>
				<li class="money">￥{{site.productPrice}}
          <span v-if="site.productType==1">
            e币
           </span>
        </li>
				<li class="cost">
				 <div v-if="site.productType==1"> <span >折旧费:</span>￥{{site.depPrice}}</div>
				 <div v-if="site.productType==1">  <span v-if="site.productType==1">押金:</span>￥{{site.desposit}}</div>
				</li>
				<li class="totalInfo"><span>小计:</span>
          {{site.productPrice*10*site.count/10}}
          <span v-if="site.productType==1">
            e币
           </span>
         </li>
			</ul>
		</div>


		<div>
			<ul class="totalPayInfo">
				<li  v-if='canUserEb!=0 && somePrice.zujin'>租金:<s>￥{{somePrice.zujin}}e币</s></li>
				<li  v-if='canUserEb!=0'>折旧费:￥<span>{{somePrice.zhejiu}}</span></li>
				<li  v-if='canUserEb!=0'><span>押金:￥{{somePrice.yajin}}</span></li>
				<li><span>合计：￥</span><span>{{somePrice.amount}}</span></li>
			</ul>
		</div>
		<div v-if='canUserEb!=0'>
			<ul class="useEB">
				<li>可使用E币{{ownerEB}}个,使用E币
          <input type="number" v-on:input="useEb"
				v-model.number="eBNumber"/>个 - ￥{{eBToMoney}}</li>
			</ul>
			<ul class="note">
				<li>备注:捐书可以获得E币,E币可以重复使用四年，免费用书</li>
			</ul>
		</div>
		<div>
			<mt-cell title="配送方式" class="deliveryType">
				上门配送<img src="../assets/image/ebterarrow.png"/>
			</mt-cell>
		</div>
		<div class="leaveMessage">
			<mt-field label="给我留言" placeholder="输入您的留言内容"
			type="text"v-model="message" >
			</mt-field>
		</div>
	</div>

		<div class="sendOeder">
			<ul>
				<li v-if="displayNew"><button style="background:#ccc">提交订单
				</button></li>
				<li v-else><button v-on:click="submotOrder">提交订单</button></li>
				<li><p>实付</p><p>￥{{needPay}}</p></li>
		    </ul>
		</div>
</div>
</template>
<script>
  import http from '../utils/axios'
  import api from '../utils/api'
  import { Toast } from 'mint-ui'
export default {
  name: 'scNoAddContent',
  mounted(){
  	this.getInfo();
  },
  data() {
    return {
    	eBNumber:0,
    	eBToMoney:0,
    	displayNew:true,
      ownerEB:50,
    	address: {
          name:'',
          phone:'',
          university:'',
          dormBuilding:'',
          roomNumber:''
        },
		  needPay:0,
		  total:0,
      contentList:[],
      totaldepPrice:0,
      totaldesposit:0,
      canUserEb:0,
      message:'',
      somePrice:{
        zhejiu:0,
        zujin:0,
        yajin:0,
        amount:0
      }
    };
  },
  created() {
      document.title = '确认订单信息'
    },
  mounted(){

  	window.localStorage.removeItem('donate');
  	var all = JSON.parse(window.localStorage.getItem('goPay'));
  	if(all){
  		this.contentList = all.product;
  		this.total = all.total;
  		this.getCountAll(all.product);
  	}
    this.computePrice();
  	this.getInfo();
  },
  methods:{
    computePrice: async function(){
      var productids='';
      var self = this;
      this.contentList.forEach(function(arr){
        productids+=arr.productId+","+arr.count+";";
        if(arr.productType==1){
          self.canUserEb += (arr.productPrice*arr.count);
        }
      });
      var obj={
        productids:productids
      };
      const res = await http.post(api.computePrice,obj)
      if(res.status==200){
        this.somePrice = res.data.data;
        this.needPay = res.data.data.amount;
      }

    },
  	useEb(){
      if(this.eBNumber>this.ownerEB && this.eBNumber<this.canUserEb){
          this.alertMessage('E币余额不足');
          this.eBToMoney=0;
          this.needPay = this.somePrice.amount;
          return;
      }else if(this.eBNumber>this.canUserEb){
          this.alertMessage('E币使用数量不能超出订单金额！');
          this.eBToMoney=0;
          this.needPay = this.somePrice.amount;
           return;
      }
  		if(this.eBNumber==''){
  			this.eBToMoney=0;
        this.needPay = this.somePrice.amount;
  		}else{
  			this.eBToMoney=parseInt(this.eBNumber);
  			this.needPay = this.somePrice.amount-this.eBToMoney;
  		}

  	},
  	getInfo: async function(){
  		const parms={
  			def:true
  		};
  		const res = await http.get(api.myAddress,parms);
	      if (res.status == 200){
		       this.address = res.data.data[0];
		       this.displayNew = false;
	      }
      const rest = await http.get(api.getUserInfo);
          if(rest.status == 200){
              this.ownerEB = rest.data.data.blance;
          }
     },
     submotOrder: async function(){
    	let that=this;
    	var obj={};
    	var productids="";
    	var addresid=that.address.id;
    	that.contentList.forEach(function(arr){
    		productids+=arr.productId+","+arr.count+";";
    	});
    	var obj={
    		productids:productids,
    		addressid:addresid,
    		message:this.message,
        enumbers:this.eBNumber
    	};
    	const res = await http.post(api.submitOrder,obj)
    	if(res.status==200){
    		 window.localStorage.setItem('payMoney',JSON.stringify(res.data.data));
    		this.$router.push({path: '/payMethod'});
    	}

     },
     getCountAll(values){
     	var that = this;
      var totaldepPrice=0;
      var totaldesposit =0;
     	values.forEach(function(str){
     		  totaldepPrice+= str.depPrice;
        	totaldesposit += str.desposit;
     	});
      that.totaldepPrice = totaldepPrice;
      that.totaldesposit = totaldesposit;
     },
     alertMessage(message){
          Toast({
              message: message,
              position: 'center',
              duration: 2000
            });
     }
  }
};
</script>
<style  lang="sass" scoped>
    @import '../assets/style/main.css'
</style>
