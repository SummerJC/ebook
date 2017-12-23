import Vue from 'vue'
import Router from 'vue-router'

const index = r => require.ensure([], () => r(require('../components/index')), 'index')
// const sort = r => require.ensure([], () => r(require('../components/sort')), 'sort')
const myCenter = r => require.ensure([], () => r(require('../components/my')), 'myCenter')
const scNoAdd = r => require.ensure([], () => r(require('../components/scNoAdd')), 'scNoAdd')
const addList = r => require.ensure([], () => r(require('../components/addList')), 'addList')
const allSort = r => require.ensure([], () => r(require('../components/allSort')), 'allSort')
const bookInfo = r => require.ensure([], () => r(require('../components/bookInfo')), 'bookInfo')
const commodityInfo = r => require.ensure([], () => r(require('../components/commodityInfo')), 'commodityInfo')
const inputAdd = r => require.ensure([], () => r(require('../components/inputAdd')), 'inputAdd')
const payMethod = r => require.ensure([], () => r(require('../components/payMethod')), 'payMethod')
const shoppingCart = r => require.ensure([], () => r(require('../components/shoppingCart')), 'shoppingCart')
const Study = r => require.ensure([], () => r(require('../components/Study')), 'Study')
const schoolCulture = r => require.ensure([], () => r(require('../components/schoolCulture')), 'schoolCulture')
const myOder = r => require.ensure([], () => r(require('../components/myOder')), 'myOder')


const diary = r => require.ensure([], () => r(require('../components/diary/index')), 'diary')
const detail = r => require.ensure([], () => r(require('../components/diary/detail')), 'diary')
const myDiary = r => require.ensure([], () => r(require('../components/diary/my')), 'diary')
const comment = r => require.ensure([], () => r(require('../components/diary/comment')), 'comment')
const searchResult = r => require.ensure([], () => r(require('../components/searchResult')), 'searchResult')
const bindPhoneNum = r => require.ensure([], () => r(require('../components/bindPhoneNum')), 'bindPhoneNum')


const addDiary = r => require.ensure([], () => r(require('../components/diary/add')), 'addDiary')
const donatedbooks = r => require.ensure([], () => r(require('../components/Donatedbooks')), 'donatedbooks')
const searchAll = r => require.ensure([], () => r(require('../components/searchAll')), 'searchAll')
const findBookByContent = r => require.ensure([], () => r(require('../components/findBookByContent')), 'findBookByContent')
const myInfo = r => require.ensure([], () => r(require('../components/myInfo')), 'myInfo')
const modifyInfo = r => require.ensure([], () => r(require('../components/modifyInfo')), 'modifyInfo')
const bottomMenu = r => require.ensure([], () => r(require('../components/bottomMenu')), 'modifyInfo')

Vue.use(Router)

export default new Router({
  mode: 'history',
  history: true,
  routes: [
    {path: '/',component: index},
    // {path: '/sort',component: sort},
    {path: '/myCenter',component: myCenter},
    {path: '/scNoAdd',component: scNoAdd},

    {path: '/addList',component: addList},
    {path: '/allSort',component: allSort},
    {path: '/bookInfo',component: bookInfo},

    {path: '/commodityInfo',component: commodityInfo},
    {path: '/inputAdd',component: inputAdd},
    {path: '/payMethod',component: payMethod},
    {path: '/shoppingCart',component: shoppingCart},
    {path: '/Study',component: Study},
    {
      path: '/diary',
      component: diary
    },
    {
      path: '/diary/detail',
      component: detail
    },
    {
      path: '/diary/my',
      component: myDiary
    },
    {
      path: '/diary/comment',
      component: comment
    },
    {
      path: '/schoolCulture',
      component: schoolCulture
    },
    {
      path: '/myOder',
      component: myOder
    },
    {
      path:'/searchResult',
      component:searchResult
    },
    {
      path:'/bindPhoneNum',
      component:bindPhoneNum
    },

    {
      path:'/diary/add',
      component:addDiary
    },
    {
      path:'/Donatedbooks',
      component:donatedbooks
    },
    {
      path:'/searchAll',
      component:searchAll
    },
    {
      path:'/findBookByContent',
      component:findBookByContent
    },
    {
      path:'/myInfo',
      component:myInfo
    },
    {
      path:'/modifyInfo',
      component:modifyInfo
    },
    {
      path:'/bottomMenu',
      component:bottomMenu
    }
  ]
})
