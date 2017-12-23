  <template>
    <div class="page-navbar schoolCulture">
      <!-- navbar -->
      <mt-navbar class="page-part" v-model="selected">
         <mt-tab-item id="1">校园文创</mt-tab-item>
         <mt-tab-item id="2">文化</mt-tab-item>
       </mt-navbar>
      <!-- tabcontainer -->
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <div class="ListContent ">
            <ul class="sortContent">
              <li class="content">
                  <img v-for="(site,index) in cultureContent" v-on:click="seleteBook(site)" v-bind:src="'http://' + site.icon">
              </li>
            </ul>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <div class="ListContent">
            <ul >
              <li class="content">
                  <img v-for="(site,index) in cultureContent" v-on:click="seleteBook(site)" width="64px" height="80px" v-bind:src="'http://' + site.icon" >
              </li>
            </ul>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
       <BottomMenu v-bind:selectedId='selectedId'></BottomMenu>
    </div>
</template>
<style>
@import "../assets/style/main.css";
</style>
<script>
  import http from '../utils/axios'
  import api from '../utils/api'
  import BottomMenu from '../components/bottomMenu'
export default {
  name: 'page-navbar',
  components:{BottomMenu},
    data() {
    return{
      selected: '1',
      cultureContent:[],
      selectedId:'2'
    }
    },
  mounted() {
    this.getInfo()
    window.localStorage.clear();
  },
  created() {
      document.title = '校园文化'
    },
  methods:{
    getInfo:async function(){
      let parms = {
        type:1
      };
      if(this.selected=='2'){
        parms.type=2
      }
      const res = await http.get(api.schoolCulture,parms)
      if (res.status == 200) {
        this.cultureContent = res.data.data
      }
    },
    seleteBook(site){
        if(window.localStorage){
          window.localStorage.setItem('openBookInfo', JSON.stringify(site));
          this.$router.push({path: '/commodityInfo'});
        }
    }
  },
  watch: {
    selected:async function (val, oldVal) {
      this.getInfo();
    }
  },

}
</script>
