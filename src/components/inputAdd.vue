<template>
<div class="main">
  <div class="content">
    <mt-field label="联系人" placeholder="请输入真实姓名" v-model="List.username">
    </mt-field>
	<mt-field label="手机号码" placeholder="请输入手机号码" type="tel" v-model="List.phone">
	</mt-field>
	<mt-field label="请选择学校" placeholder="请选择学校"  v-model="List.college" id="school" v-on:click.stop="selectSchool"  readonly >
	</mt-field>
	<mt-field label="请选择宿舍" placeholder="请选择宿舍" type="tel"
	v-model="List.flat" id="myFlat"  readonly></mt-field>

	<mt-field label="请输入室号" placeholder="请输入室号" type="url"
	 v-model="List.roomNum" ></mt-field>
	<mt-button size="large" class="onSave" v-on:click="onSave()">
		保存
	</mt-button>
	<mt-button size="large"  class="cancle" v-on:click="deleteAdd">删除</mt-button>
</div>
		<mt-popup v-model="popupVisible" position="bottom">
			<div class="selected"><span v-on:click="cancleChange">取消</span>
				<span v-on:click="changeSchool">完成</span></div>
	        <mt-picker :slots="slots" class="spanel" @change="change">
	        </mt-picker>
	    </mt-popup>
	    <mt-popup v-model="flatVisible" position="bottom">
	    	<div class="selected"><span v-on:click="cancleChange">取消</span>
				<span v-on:click="changeFlat">完成</span></div>
	        <mt-picker :slots="flatslots" @change="change" >
	        </mt-picker>
	    </mt-popup>
</div>
</template>
<script>

  import http from '../utils/axios'
  import api from '../utils/api'
  import { MessageBox } from 'mint-ui';
export default {
 	name: '',
 	components:{

 	},
 	mounted(){
 		this.anaysisi();
 		this.addEvent();
 	},
 	data (){
 	return{
 		action:'add',
 		popupVisible:false,
 		flatVisible:false,
 		slots:[{values:[]}],
 		flatslots:[{values:[]}],
 		List:{},
 		selecte:''
 	}

 	},
 	created() {
      document.title = '编辑收货地址'
    },
 	methods:{
 		anaysisi(){
	 		if(window.localStorage){
	 			var obj = JSON.parse(window.localStorage.getItem('info'));
	 			if(obj){
	 				this.List=obj;
	 				window.localStorage.removeItem('info');
	 				this.action="ModifyInfo";
 				}else{
 					this.action="add";
 				}
	 		}
	 	},
	 	cancleChange(){
	 		this.popupVisible=false;
 			this.flatVisible=false;
	 	},
	 	selectSchool: async function(){
	 		const res = await http.get(api.myCollege)
				if (res.status == 200){
					this.slots[0].values = res.data.data;
					this.popupVisible = true;
				}
	 	},
	 	change(picker,value){
	 		this.selecte= value[0];
	 	},
	 	changeSchool(){
	 		this.List.college = this.selecte;
	 		this.popupVisible=false;
	 	},
	 	changeFlat(){
	 		this.List.flat = this.selecte;
	 		this.flatVisible=false;
	 	},
	 	selectFlat: async function(){
	 		if(!this.List.college){
	 			MessageBox('提示', '请先选择校区！');
	 			return;
	 		}
	 		const parms = {
	 			collegename:this.List.college
	 		}
	 		const res = await http.get(api.myFlat,parms)
				if (res.status == 200){
					this.flatslots[0].values = res.data.data;
					this.flatVisible = true;
				}
	 	},
	 	addEvent: async function(){
	 		var that = this;
	 		document.activeElement.blur();
 			document.getElementById('school').onclick = function(event){
				$('#school').find("input")[0].blur();
				that.selectSchool();
				event.stopPropagation();
 			};
 			document.getElementById('myFlat').onclick = function(event){
				$('#myFlat').find("input")[0].blur();
				that.selectFlat();
				event.stopPropagation();
 			};
	 	},
	 	onSave: async function(){
	 		var item = this.List;
	 		if(!item.username||!item.phone||!item.college||!item.flat||!item.roomNum){
	 			MessageBox('提示', '请确保所有信息都已填写！');
	 			return;
	 		}
		 	var obj = {
	          username : item.username,
	          phone:item.phone,
	          college:item.college,
	          flat:item.flat,
	          roomNum :item.roomNum,
	        };
	        if(this.action=="add"){
	        	const res = await http.post(api.addAddress,obj)
				if (res.status == 200){
			 		this.$router.push({path: '/addList'})
				}
	        }else{
	       		obj.id = this.List.id;
	        	const res = await http.post(api.addAddress,obj)
	        	if (res.status == 200){
			 		this.$router.push({path: '/addList'})
				}
	        }


	 	},
	 	forbid(){
	 		return false;
	 	},
	 	deleteAdd: async function(){
	 	if(!this.List.id){
	 		this.$router.push({path: '/addList'})
	 	}else{
	 		const parm = {
		 		addressid:this.List.id
		 	};
	 		const res = await http.post(api.deleteAddress,parm)
				if (res.status == 200){
			 		this.$router.push({path: '/addList'})
				}
		 	}
	 	}

 	},

}
</script>
<style scoped>
    @import '../assets/style/main.css';
    .mint-popup-bottom{width:100%;}
    .selected{padding: 5px 8px;color: #32ba7c;}
    .selected span:last-child{float: right;padding: 3px}
    .spanel{background: #fdfdfd;width: 100%;}
</style>
