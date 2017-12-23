<template>
	<div>
    <div v-if="search">
        <SearchResult v-bind:result="result"></SearchResult>
      </div>
    <div v-else>
	     <div class="m-cell" id="selectedAdd">
            <div v-for="(site,index) in conditionList" class="cell-item"
             v-on:click="getContent(site,index)">
                <div class="cell-left">{{site.name}}</div>
                <div class="cell-right cell-arrow">{{site.selected}}</div>
            </div>
        </div>
        <mt-button v-if="selecteAll"size="large" class="onSave"  v-on:click="searchbook">
          班级团购
    		</mt-button>
        <mt-button v-else size="large" class="disabled ">
          班级团购
        </mt-button>
        <mt-popup v-model="popupVisible" position="bottom">
			<div class="selected"><span v-on:click="cancleChange">取消</span>
				<span v-on:click="completeChange">完成</span></div>
	        <mt-picker :slots="slots" class="spanel" @change="change"> </mt-picker>
	    </mt-popup>
    </div>
	</div>
</template>
<script>


  import http from '../utils/axios'
  import api from '../utils/api'
  import axios from 'axios'
  import { Toast } from 'mint-ui'
  import SearchResult from '../components/searchResult'
export default {
  name: 'test',
  components:{SearchResult},
  data () {
    return {
      conditionList:[
      	{name:'选择学校',id:'collegeName',selected:''},
      	{name:'选择学院',id:'academyName',selected:''},
      	{name:'选择专业',id:'professionName',selected:''},
      	{name:'选择年级',id:'grade',selected:''}
      ],
      popupVisible:false,
      slots:[{values:[]}],
      dataByName:{},
      collegeName:[],
      selecte:'',
      index:0,
      selecteAll:false,
       result:[],
       search:false,

    }
  },
  created() {
      document.title = '班级团购'
    },
  mounted () {

   },
  methods:{
	  getContent:async function(site,index){
      this.index = index;
	  	var obj = {};
	  	//obj[site.id] = ;
	  	if(site.id=="collegeName"){
	  		const res = await http.get(api.findCollege)
		  	 if(res.status ==200){
		  	 	var data = res.data.data;
          this.collegeName = [];
		  	 	for(var i=0;i<data.length;i++){
		  	 		this.dataByName[data[i].collegeName]=data[i];
		  	 		this.collegeName.push(data[i].collegeName);
		  	 	}
		  	 	this.slots[0].values = this.collegeName;
          this.popupVisible = true;
		  	 	//alert(JSON.stringify(res.data));
		  	 }
	  	}else if(index==1){
        if(this.conditionList[0].selected==''){
          return this.alertMessage('请先选择学校');
        }
        this.popupVisible = true;
        this.slots[0].values = [];
        var academyList= this.dataByName[this.conditionList[0].selected].academyList;
        for(var str in academyList){
          return this.slots[0].values.push(str);
        }
      }else if(index==2){
        if(this.conditionList[1].selected==''){
          return this.alertMessage('请先选择学院');
        }
        this.popupVisible = true;
        var professionName = this.dataByName[this.conditionList[0].selected].academyList[this.conditionList[1].selected];
        this.slots[0].values=professionName;
      }else if(index = 3){
        if(this.conditionList[2].selected==''){
          return this.alertMessage('请先选择专业');
        }
        this.popupVisible = true;
        this.slots[0].values = ['大一上学期','大一下学期','大二上学期','大二下学期','大三上学期','大三下学期','大四上学期','大四下学期'];
      }


	  },
    change(picker,value){
      this.selecte= value[0];
    },
    completeChange(){

      if(this.index==3){
        this.selecteAll =true;
        this.conditionList[this.index]['selected'] = this.selecte.substr(0,3);
      }else{
        this.conditionList[this.index]['selected'] = this.selecte;
      }
      this.popupVisible=false;
    },
    cancleChange(){
      this.popupVisible=false;
    },
    searchbook:async function(){
        var obj = {};
        this.conditionList.forEach(function(arr){
            obj[arr.id] = arr.selected;
        });
       const res = await http.get(api.selectMajorBook,obj)
       if(res.status ==200){
          this.result=res.data.data;
          this.search=true;
//          alert(JSON.stringify(res.data));
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
	.mint-popup-bottom{width:100%;}
    .selected{padding: 5px 8px;color: #32ba7c;}
    .selected span:last-child{float: right;padding: 3px}
    .spanel{background: #fdfdfd;width: 100%;}
    .mint-button--large{
		width: calc(100% - 40px);
		margin: 10px auto;
	}
	.onSave{
		background: #32ba7c;
		color: #fff;
	}
</style>
