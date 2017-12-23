<template>
    <yd-tabbar style="position: fixed;bottom: 0;" id="bottom">
      <yd-tabbar-item title="首页" link="/"
        v-bind:style="{'color':selected=='1'?'#32ba7c':'#333'}">
       <img v-if="selected=='1'" slot="icon" src="../assets/image/homeh.png">
      <img v-else slot="icon" src="../assets/image/home.png" >
      </yd-tabbar-item>

       <!-- link="/schoolCulture" 去掉cliick加上link即可激活此功能 -->
     <yd-tabbar-item title="校园文化" link="/schoolCulture"
     v-bind:style="{'color':selected=='2'?'#32ba7c':'#333'}">
        <img v-if="selected=='2'" slot="icon" src="../assets/image/xywhh.png">
      <img v-else slot="icon" src="../assets/image/xywn.png" >
      </yd-tabbar-item>

      <yd-tabbar-item title="四年日记" link="/diary"
      v-bind:style="{'color':selected=='3'?'#32ba7c':'#333'}">
         <img v-if="selected=='3'" slot="icon" src="../assets/image/rjh.png">
        <img v-else slot="icon" src="../assets/image/rj.png"
        >
      </yd-tabbar-item>
      <yd-tabbar-item title="我的" link="/myCenter"
      v-bind:style="{'color':selected=='4'?'#32ba7c':'#333'}">
          <img v-if="selected=='4'" slot="icon" src="../assets/image/meh.png">
          <img v-else slot="icon" src="../assets/image/me.png" >
      </yd-tabbar-item>
    </yd-tabbar>
</template>
<script type="text/babel">
import { Toast } from 'mint-ui'
export default {
  name: 'hello1',
  data(){
    return{
     selected:'1'
    }
  },
  mounted(){
    this.selected = this.selectedId;
  },
  methods:{
   alertMessage(message){
          Toast({
              message: '此功能暂未开放',
              position: 'center',
              duration: 2000
            });
     },
   },
   props:['selectedId']
}
</script>
