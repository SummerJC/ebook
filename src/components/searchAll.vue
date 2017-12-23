<template>
	<div class="allSortContent">
		<ul class="searchInput">
			<li class="back">
				<img src="../assets/image/backico.png">
			</li>
			<li class="search">
				<img src="../assets/image/serico.png">
				<input placeholder="请输入书籍的ISBN、书名或作者" v-on:input="searchBook"v-model="searchContent" id="searchInput">
			</li>
		</ul>
        <SearchResult v-bind:result="result"></SearchResult>

	</div>
</template>
<script>

  import http from '../utils/axios'
  import api from '../utils/api'
  import axios from 'axios'
  import SearchResult from '../components/searchResult'
export default {
  name: 'page-navbar',
  components:{SearchResult},
  data() {
    return {
      searchContent:'',
      result:[],

    };
  },
  created() {
      document.title = '常用分类'
    },
  mounted() {
     $("#searchInput").focus();
  },
  methods: {
    searchBook: async function(){
      let params = {
        content :this.searchContent.trim()
      }
      const res = await http.get(api.searchBook, params)
       if (res.status == 200) {
        this.result= res.data.data
      }

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
    .searchInput{border-bottom:1px solid #f6f6f6;
                  padding-top:5px;
                  overflow: auto;
                  background: #fff}
</style>
