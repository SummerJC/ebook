<template>
	<div class="allSortContent">
		<ul  class="sortContent">
		<div class="sortItem">
			 <li  v-for="(site,index) in leftMenu">
					<div v-bind:class="[site.show ? show:hidden]"
					 v-on:click="switchPanel(site,index+1)" >
					{{site.name}}
					</div>
				</li>
	 </div>
		<li class="content">
			<div v-for="(site,index) in bookContent" v-on:click="seeBook(site)">
				<img v-bind:src="'http://' + site.icon">
				<p>{{site.title}}</p>
			</div>
		</li>
    </ul>
    </div>

</template>
<script>

  import http from '../utils/axios'
  import api from '../utils/api'
  import axios from 'axios'
  import SearchResult from '../components/searchResult'
export default {
  name: 'page-navbar',
  data() {
    return {
      value:'',
      show:'show',
      hidden:'hidden',
      lastIndex:0,
      leftMenu:[
      ],
      bookContent:[],
      result:[],
    };
  },
  created() {
      document.title = '常用分类'
    },
  mounted() {

    this.getKinds();
     window.localStorage.clear();
  },
  methods: {
    getKinds: async function () {
      const res = await http.get(api.allkindsBook)
      if (res.status == 200) {
        this.leftMenu = res.data.data.bookclass
        this.leftMenu[0].show=true;
       this.bookContent= res.data.data.kaoyan
      }
    },
    getBook: async function (currentSite,index) {
      let params = {
        classid :currentSite,
      }
      const res = await http.get(api.allBook, params)
      if (res.status == 200) {
        this.bookContent = res.data.data
      }
    },
    switchPanel(currentSite,index){
        var  lastSite =this.leftMenu[this.lastIndex];
        lastSite.show=false;
        currentSite.show = true;
        this.leftMenu.splice(this.lastIndex,1,lastSite);
        this.leftMenu.splice(index-1,1,currentSite);
        this.lastIndex = index-1;
        this.getBook(currentSite.id,index)

    },
    seeBook(site){
      if(window.localStorage){
       window.localStorage.removeItem('openBookInfo');
        window.localStorage.setItem('openBookInfo', JSON.stringify(site.id));
        this.$router.push({path: '/bookInfo'});
      }
    }
  }

}
</script>
<style scoped>
    @import '../assets/style/main.css';

</style>
