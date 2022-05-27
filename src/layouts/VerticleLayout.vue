<template>
  <div>
    <Loader />
    <b-navbar toggleable="lg" type="dark" variant="primary" fixed="top" style="z-index:1000;" class="p-0">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav v-for="(menu,i) in topMenu" :key="i">
          <b-nav-item v-if="menu.children !== undefined" :text="menu.name" @click="showSideMenu(menu)">{{ menu.title }}</b-nav-item>
          <b-nav-item v-if="menu.children === undefined" :text="menu.name" :href="'/'+menu.link.name">{{ menu.title }}</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav  class="ml-auto">
          <b-nav-item @click="addToFav(favMenuTitle)">Fav</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <Customizer @onLogo="changeLogo" @toggle="sidebarMini" @animationChange="routerAnimationChange" />
    <div class="wrapper">
      <!-- Sidebar  -->
      <SmallSidebar v-if="$route.name === 'dashboard.home-5'" :logo="SmallSidebarLogo" @toggle="sidebarMini" />
      <Sidebar :items="roleMenu" :logo="logo" :onlyLogo="onlyLogo" :onlyLogoText="onlyLogoText" @toggle="sidebarMini" :toggleButton="toggleSideIcon" :sidebarGroupTitle="sidebarGroupTitle" :reloadDt="renderComponent" />
      <!-- TOP Nav Bar -->
      <DefaultNavBar title="Dashboard" :homeURL="{ name: 'dashboard.home-1' }" :sidebarGroupTitle="sidebarGroupTitle" @toggle="sidebarMini" :logo="logo">
        <template slot="responsiveRight">
          <ul class="navbar-nav ml-auto navbar-list">
            <li class="nav-item">
              <!-- <a class="search-toggle iq-waves-effect language-title" href="#"><img :src="selectedLang.image" alt="img-flaf" class="img-fluid mr-1" style="height: 16px; width: 16px;" /> {{ selectedLang.title }} <i class="ri-arrow-down-s-line"></i></a> -->
              <div class="iq-sub-dropdown">
                <a class="iq-sub-card" href="javascript:void(0)" v-for="(lang, i) in langsOptions" :key="`Lang${i}`" @click="langChange(lang)">
                  <img :src="lang.image" alt="img-flaf" class="img-fluid mr-2" />{{ lang.title }}
                </a>
              </div>
            </li>
            <li class="nav-item">
              <!-- <a href="javascript:void(0)" class="iq-waves-effect"> -->
              <!-- <a href="javascript:void(0)" class="iq-waves-effect" :class="cartCount > 0 ? 'search-toggle' : ''"> -->
                <!-- <i class="ri-shopping-cart-2-line" />
                <span class="menu-tag ml-2">0</span> -->
                <!-- <span class="menu-tag ml-2">{{ cartCount }}</span> -->
              <!-- </a> -->
              <div class="iq-sub-dropdown">
                <div class="iq-card shadow-none m-0">
                  <div class="iq-card-body p-0 ">
                    <div class="bg-primary p-3">
                      <h5 class="mb-0 text-white">{{ $t('nav.allCarts') }}</h5>
                    </div>
                    <!-- <div class="iq-sub-card" v-for="(item, index) in cartItems" :key="index">
                      <div class="media align-items-center">
                        <div class="w-20 text-center d-none justify-content-center d-md-block">
                          <img :src="item.image" :alt="item.name" class="w-100 align-self-center mr-3" />
                        </div>
                        <div class="media-body ml-3">
                          <b-button variant=" iq-bg-danger mt-3" size="sm" class="float-right" @click="removeToCart(item)">X</b-button>
                          <h6 class="mb-0 ">{{ item.name.substring(0,20) + '...' }}</h6>
                          <p class="mb-0 font-size-12">{{ item.description.substring(0,20) + '...' }}</p>
                          <p class="mb-0"><b>$ {{ item.price }}</b></p>
                        </div>
                      </div>
                    </div> -->
                    <!-- <router-link :to="{ name: 'app.e-commerce.cart'}"><b-button variant=" iq-bg-primary" block><i class="fas fa-cart-plus"/>{{ $t('nav.viewCarts') }}</b-button></router-link> -->
                  </div>
                </div>
              </div>
            </li>
            <!-- <li class="nav-item">
              <a href="#" class="search-toggle iq-waves-effect">
                <lottie :option="require('../assets/images/small/lottie-bell')" id="lottie-beil" />
                <span class="bg-danger dots"></span>
                <div data-icon="x" class="icon mt-1"></div>
              </a>
              <div class="iq-sub-dropdown">
                <div class="iq-card shadow-none m-0">
                  <div class="iq-card-body p-0 ">
                    <div class="bg-primary p-3">
                      <h5 class="mb-0 text-white">{{ $t('nav.allNotifications') }}<small class="badge  badge-light float-right pt-1">1</small></h5>
                    </div>
                    <a href="#" class="iq-sub-card" v-for="(item, index) in notification" :key="index">
                      <div class="media align-items-center">
                        <div class="">
                          <img class="avatar-40" :src="item.image" alt="img">
                        </div>
                        <div class="media-body ml-3">
                          <h6 class="mb-0 ">{{ item.name }}</h6>
                          <small class="float-right font-size-12">{{ item.date }}</small>
                          <p class="mb-0">{{ item.description.substring(0,40) + '...' }}</p>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </li> -->
            <!-- <li class="nav-item">
              <a href="#" class="search-toggle iq-waves-effect">
                <lottie :option="require('../assets/images/small/lottie-mail')" id="lottie-mail" />
                <span class="bg-primary count-mail"></span>
                <div data-icon="" class="icon mt-1"></div>
              </a>
              <div class="iq-sub-dropdown">
                <div class="iq-card shadow-none m-0">
                  <div class="iq-card-body p-0 ">
                    <div class="bg-primary p-3">
                      <h5 class="mb-0 text-white">{{ $t('nav.allMessages') }}<small class="badge  badge-light float-right pt-1">0</small></h5>
                    </div>
                    <a href="#" class="iq-sub-card" v-for="(item,index) in message" :key="index">
                      <div class="media align-items-center">
                        <div class="">
                          <img class="avatar-40 rounded" :src="item.image" alt="img">
                        </div>
                        <div class="media-body ml-3">
                          <h6 class="mb-0 ">{{ item.name }}</h6>
                          <small class="float-left font-size-12">{{ item.date }}</small>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </li> -->
          </ul>
        </template>
        <template slot="right">
          <ul class="navbar-list">
            <li class="">
              <a href="#" class="search-toggle iq-waves-effect d-flex align-items-center bg-primary rounded">
                <img :src="userProfile" class="img-fluid rounded mr-3" alt="user">
                <div class="caption">
                  <h6 class="mb-0 line-height text-white">{{ username }}
                  <span v-if="this.userrole == 1">
                    <i v-if="dataUsers.verified == true" v-b-tooltip.top="'Selamat! Akun anda sudah diverifikasi.'" class="fas fa-check-circle ml-1 text-white"></i>
                    <i v-else v-b-tooltip.top="'Akun anda belum di verifikasi, mohon lengkapi data.'" class="fas fa-times-circle ml-1 text-white"></i>
                  </span>
                  </h6>
                  <span class="font-size-12 text-white">{{ $t('nav.user.available') }}</span>
                </div>
              </a>
              <div class="iq-sub-dropdown iq-user-dropdown">
                <div class="iq-card shadow-none m-0">
                  <div class="iq-card-body p-0 ">
                    <div class="bg-primary p-3">
                      <h5 class="mb-0 text-white line-height">Hello, {{ username }}</h5>
                      <span class="text-white font-size-12">{{ $t('nav.user.available') }}</span>
                    </div>
                    <router-link :to="`/profile/${dataUsers.user.id}`" class="iq-sub-card iq-bg-primary-hover">
                      <div class="media align-items-center">
                        <div class="rounded iq-card-icon iq-bg-primary">
                          <i class="ri-file-user-line"></i>
                        </div>
                        <div class="media-body ml-3">
                          <h6 class="mb-0 ">{{ $t('nav.user.profileTitle') }}</h6>
                          <p class="mb-0 font-size-12">{{ $t('nav.user.profileSub') }}</p>
                        </div>
                      </div>
                    </router-link>
                    <router-link to="/edit-data-vendor" class="iq-sub-card iq-bg-primary-hover" :style="displayNone">
                      <div class="media align-items-center">
                        <div class="rounded iq-card-icon iq-bg-primary">
                          <i class="ri-profile-line"></i>
                        </div>
                        <div class="media-body ml-3">
                          <h6 class="mb-0 ">{{ $t('nav.user.profileEditTitle') }}</h6>
                          <p class="mb-0 font-size-12">{{ $t('nav.user.profileEditSub') }}</p>
                        </div>
                      </div>
                    </router-link>
                    <router-link to="/profile-edit" class="iq-sub-card iq-bg-primary-hover">
                      <div class="media align-items-center">
                        <div class="rounded iq-card-icon iq-bg-primary">
                          <i class="ri-account-box-line"></i>
                        </div>
                        <div class="media-body ml-3">
                          <h6 class="mb-0 ">{{ $t('nav.user.accountSettingTitle') }}</h6>
                          <p class="mb-0 font-size-12">{{ $t('nav.user.accountSettingSub') }}</p>
                        </div>
                      </div>
                    </router-link>
                    <!-- <a href="#" class="iq-sub-card iq-bg-primary-hover">
                      <div class="media align-items-center">
                        <div class="rounded iq-card-icon iq-bg-primary">
                          <i class="ri-lock-line"></i>
                        </div>
                        <div class="media-body ml-3">
                          <h6 class="mb-0 ">{{ $t('nav.user.privacySettingTitle') }}</h6>
                          <p class="mb-0 font-size-12">{{ $t('nav.user.privacySettingSub')}}</p>
                        </div>
                      </div>
                    </a> -->
                    <div class="d-inline-block w-100 text-center p-3">
                      <a class="bg-primary iq-sign-btn" href="javascript:void(0)" @click="logout" role="button">{{ $t('nav.user.signout') }}<i class="ri-login-box-line ml-2"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </template>
      </DefaultNavBar>
      <!-- TOP Nav Bar END -->
      <div id="content-page" class="content-page" style="padding:155px 15px 0 !important;">
        <b-container class="forBreadcrumb" fluid="" v-if="!notBookmarkRouts.includes($route.name)">
          <b-row>
            <BreadCrumb />
          </b-row>
        </b-container>
        <transition name="router-anim" :enter-active-class="`animated ${animated.enter}`" mode="out-in"
                    :leave-active-class="`animated ${animated.exit}`">
          <router-view/>
        </transition>
      </div>
      <!-- <LayoutFixRightSide v-if="$route.name === 'dashboard.home-1' " /> -->
    </div>
    <LayoutFooter />
    <!-- <b-navbar v-if="favMenu === true" toggleable="lg" type="dark" variant="primary" fixed="bottom" style="z-index:1000;" class="p-0">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>-</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar> -->

    <div class="snack-wrap" v-if="dataUsers.verified == false && this.userrole != 10">
      <input type="checkbox" class="snackclose animated" @click="toEditProfile" id="close"/><label class="snacklable snacklabel animated" for="close"></label>
      <div class="snackbar animated">
        <p class="mb-0"><strong>Perhatian:</strong> Akun anda belum di verifikasi oleh admin.</p>
      </div>
    </div>
  </div>
</template>
<script>
import { core } from '../config/pluginInit'
import { Users } from '../FackApi/api/chat'
import { mapActions, mapGetters } from 'vuex'
import Loader from '../components/core/loader/Loader'
import Sidebar from '../components/core/sidebars/Sidebar'
import DefaultNavBar from '../components/core/navbars/DefaultNavBar'
import SideBarItems from '../FackApi/json/SideBar'
import TopMenuItems from '../FackApi/json/TopMenu'
import profile from '../assets/images/user/blank-profile.jpg'
import loader from '../assets/images/proyekita.png'
import darkLoader from '../assets/images/darkMode/dark-logo.gif'
// import Lottie from '../components/core/lottie/Lottie'
import Customizer from './Components/Customizer'
// import LayoutFixRightSide from './Components/LayoutFixRightSide'
import WhiteLogo from '../assets/images/logo-2.png'
import SmallSidebar from '../components/core/sidebars/SmallSidebar'
import BreadCrumb from '../components/core/breadcrumbs/BreadCrumb'
import LayoutFooter from './Components/LayoutFooter'

var dataUser = JSON.parse(localStorage.getItem('user'))
export default {
  name: 'VerticleLayout',
  props: {
    editProfile: { type: Object, default: () => ({ name: 'user.edit' }) }
  },
  components: {
    LayoutFooter,
    // LayoutFixRightSide,
    Customizer,
    // Lottie,
    Loader,
    Sidebar,
    DefaultNavBar,
    SmallSidebar,
    BreadCrumb
  },
  mounted () {
    this.layoutSetting(this.$route.name)
    this.getUsers()
    this.checkFavMenu()
  },
  computed: {
    ...mapGetters({
      // cartCount: 'Ecommerce/cartCountState',
      // cartItems: 'Ecommerce/cartState',
      selectedLang: 'Setting/langState',
      langsOptions: 'Setting/langOptionState',
      darkMode: 'Setting/darkModeState',
      colors: 'Setting/colorState',
      stateUsers: 'Setting/authUserState',
      dataUser: 'Setting/dataUserState'
    }),
    toggleSideIcon () {
      let show = true
      switch (this.$route.name) {
        case 'dashboard.home-1':
        case 'dashboard.home-3':
        case 'dashboard.home-4':
        case 'dashboard.home-5':
        case 'dashboard.home-6':
          show = false
          break
      }
      return show
    },
    roleMenu () {
      const sideMenu = SideBarItems[0]['dashboard']
      var menuList
      if (dataUser.user.role === '10') {
        menuList = sideMenu.concat(SideBarItems[2]['admin'])
      } else if (dataUser.user.role === '1') {
        menuList = sideMenu.concat(SideBarItems[1]['vendor'])
      } else if (dataUser.user.role === '2') {
        menuList = sideMenu.concat(SideBarItems[3]['contractor'])
      } else if (dataUser.user.role === '0') {
        menuList = sideMenu.concat(SideBarItems[4]['noncontractor'])
      } else if (dataUser.user.role === '99') {
        const mDash = Object.values(SideBarItems[0]).flat()
        const mAdm = Object.values(SideBarItems[1]).flat()
        const mVen = Object.values(SideBarItems[2]).flat()
        const mCont = Object.values(SideBarItems[3]).flat()
        const mNon = Object.values(SideBarItems[4]).flat()
        menuList = mDash.concat(mAdm).concat(mVen).concat(mCont).concat(mNon)
      }
      return menuList
    },
    topMenu () {
      const sideMenu = []
      var topMenuList
      if (dataUser.user.role === '10') {
        topMenuList = sideMenu.concat(TopMenuItems[2]['admin'])
      } else if (dataUser.user.role === '1') {
        topMenuList = sideMenu.concat(TopMenuItems[1]['vendor'])
      } else if (dataUser.user.role === '2') {
        topMenuList = sideMenu.concat(TopMenuItems[3]['contractor'])
      } else if (dataUser.user.role === '0') {
        topMenuList = sideMenu.concat(TopMenuItems[4]['noncontractor'])
      } else if (dataUser.user.role === '99') {
        const mDash = Object.values(TopMenuItems[0]).flat()
        const mAdm = Object.values(TopMenuItems[1]).flat()
        const mVen = Object.values(TopMenuItems[2]).flat()
        const mCont = Object.values(TopMenuItems[3]).flat()
        const mNon = Object.values(TopMenuItems[4]).flat()
        topMenuList = mDash.concat(mAdm).concat(mVen).concat(mCont).concat(mNon)
      }
      return topMenuList
    }
  },
  watch: {
    '$route': function (to, from) {
      this.layoutSetting(to.name)
    }
  },
  // sidebarTicket
  data () {
    return {
      animated: { enter: 'zoomIn', exit: 'zoomOut' },
      // verticalMenu: SideBarItems,
      userProfile: profile,
      onlyLogo: false,
      onlyLogoText: false,
      sidebarGroupTitle: true,
      logo: loader,
      usersList: Users,
      rtl: false,
      SmallSidebarLogo: WhiteLogo,
      message: [
      ],
      notification: [
        {
          image: '-',
          name: 'Material Name',
          date: '1 day ago',
          description: 'Order telah diterima.'
        }
      ],
      notBookmarkRouts: [
        'dashboard.home-1'
      ],
      dataUsers: {
        user: {}
      },
      displayNone: '',
      username: '',
      userrole: '',
      renderComponent: true,
      favMenu: false,
      favMenuTitle: ''
    }
  },
  methods: {
    layoutSetting (routeName) {
      this.onlyLogo = true
      this.onlyLogoText = true
      this.sidebarGroupTitle = true
      switch (routeName) {
        case 'dashboard.home-5':
          this.onlyLogoText = true
          this.onlyLogo = false
          break
        case 'dashboard.home-6':
          this.logo = WhiteLogo
          this.onlyLogo = true
          this.onlyLogoText = false
          this.sidebarGroupTitle = false
          break
        default:
          if (this.darkMode) {
            this.logo = darkLoader
          } else {
            this.logo = loader
          }
          break
      }
    },
    changeLogo (e) {
      this.logo = e
    },
    sidebarMini () {
      core.triggerSet()
      this.$store.dispatch('Setting/miniSidebarAction')
    },
    logout () {
      localStorage.removeItem('user')
      localStorage.removeItem('access_token')
      this.$router.push({ name: 'auth1.sign-in1' })
    },
    getUsers () {
      const localUser = JSON.parse(localStorage.getItem('user'))
      this.$store.dispatch('Setting/dataUserAction', localUser)
      this.dataUsers = this.dataUser
      this.username = this.dataUser.user.username
      this.userrole = this.dataUser.user.role
      if (localUser.user.role !== 1) {
        this.displayNone = 'display:none;'
      }
    },
    langChange (lang) {
      this.langChangeState(lang)
      this.$i18n.locale = lang.value
      document.getElementsByClassName('iq-show')[0].classList.remove('iq-show')
      if (lang.value === 'ar') {
        this.rtlAdd(lang)
      } else {
        this.rtlRemove(lang)
      }
    },
    routerAnimationChange (e) {
      this.animated = e
    },
    toEditProfile () {
      this.$router.push({ name: 'profile.edit-data-vendor' })
    },
    showSideMenu (e) {
      this.roleMenu.length = 0
      // console.log(e)
      var i
      if (e.children !== undefined) {
        if (e.name === 'profile') {
          const subMenus = this.topMenu[0].children
          for (i in subMenus) {
            const dt = subMenus[i]
            this.roleMenu.push(dt)
          }
        // this.roleMenu.push(Object.values(subMenus[0].children[0]).flat())
        } else if (e.name === 'mystore') {
          const subMenus = this.topMenu[1].children
          for (i in subMenus) {
            const dt = subMenus[i]
            this.roleMenu.push(dt)
          }
        } else if (e.name === 'transaction') {
          const subMenus = this.topMenu[3].children
          for (i in subMenus) {
            const dt = subMenus[i]
            this.roleMenu.push(dt)
          }
        } else if (e.name === 'help') {
          const subMenus = this.topMenu[4].children
          for (i in subMenus) {
            const dt = subMenus[i]
            this.roleMenu.push(dt)
          }
        } else {

        }
      } else {
        this.$router.push({ name: e.link.name })
      }
      this.favMenuTitle = e.title
      this.renderComponent = false

      this.$nextTick(() => {
        this.renderComponent = true
      })

      // setTimeout(() => {
      core.triggerSet()
      this.$store.dispatch('Setting/miniSidebarAction')
      // }, 100)
    },
    checkFavMenu () {
      const lsMenu = localStorage.getItem('menu')
      if (lsMenu == null || lsMenu === undefined || lsMenu === '') {
        this.favMenu = false
      } else {
        this.favMenu = true
      }
      // console.log(lsMenu)
    },
    addToFav (title) {
      const menu = []
      const getCurrURL = window.location.href
      var dtMenu = {
        title: title,
        link: getCurrURL
      }
      menu.push(dtMenu)
      localStorage.setItem('menu', JSON.stringify(menu))
      // console.log(menu)
    },
    ...mapActions({
      removeToCart: 'Ecommerce/removeToCartAction',
      langChangeState: 'Setting/setLangAction',
      rtlAdd: 'Setting/setRtlAction',
      rtlRemove: 'Setting/removeRtlAction'
    })
  }
}
</script>
<style>
  @import url("../assets/css/custom.css");
  @import url("../assets/css/PriceSlider.css");

  .snack-wrap {
  display:block;
  position:fixed;
  bottom:0px;
  left:10px;
  padding:0px;
  z-index: 1000;
}

.snackbar {
  display:block;
  background:#00B0F0;
  border:#f2f2f2;
  padding:10px 40px 10px 20px;
  color:#fff;
  font-family:Arial;
  position:relative;
  left:0px;
  bottom:-70px;
  transition: bottom 0.5s ease-in-out;
  z-index:9;
}
.snackbar > p {
  font-size: 12pt;
}
.snackclose, .snacklabel {
  bottom:-70px;
  position:absolute;
  border:0;
}
.snackclose {
  display:none;
  z-index:10;
}
.snacklabel {
  z-index:11;
  display:block;
  width:100%;
  height:100%;
  color:rgba(255,255,255,0.8);
  cursor:pointer;
}
.animated {
  animation-name: snackbar-show;
  animation-duration: 2s;
  animation-direction: forwards;
  animation-timing-function: ease-in-out;
  animation-delay:1s;
  animation-fill-mode: forwards;
}
.snackclose:checked~.snackbar, .snackclose:checked, .snackclose:checked+.snacklabel {
  animation-name: snackbar-hide;
  animation-delay:0s;
}
@keyframes snackbar-show {
   0%{ bottom:-70px; }
  90%, 95% {bottom:15px; }
  92.5%, 100% {bottom:10px; }
}
@keyframes snackbar-hide {
   0%, 7.5% {bottom:10px; }
  5%,10% {bottom:15px; }
  100% {bottom:-70px; }
}
.navbar-dark .navbar-nav .nav-link {
  color: #fff;
  font-weight: bold;
}
.dropdown-toggle::after {
  display: none;
}
</style>
