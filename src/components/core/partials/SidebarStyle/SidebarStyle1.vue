<template>
    <div>
          <div class="iq-sidebar-small bg-sidebar">
            <div class="sidebar-top">
                <div class="iq-sidebar-small-logo">
                    <router-link to="/">
                    <img src="../../../../assets/images/logo-b.png" :class="`img-fluid ${logoClass}`" alt="">
                    </router-link>
                </div>
                <div class="sidebar-menu-icon">
                    <!-- <router-link :to="item.link" class="iq-waves-effect" v-b-tooltip.right.hover :title="item.title" v-for="(item, index) in topMenu" :key="index"> -->
                    <template  v-for="(item, index) in topMenu">
                      <a v-if="item.children !== undefined" href="#" :key="index" @click="showSideMenu(item)" placement="right" v-b-tooltip.hover :title="`${item.title}`" :class="{'topactive': isActive == item.name}">
                        <i :class="`${item.icon}`"></i>
                        <div class="title-menu">{{ item.title }}</div>
                      </a>
                      <a v-else href="javascript:void(0);" @click="showSideMenu(item)" :key="index" v-b-tooltip.hover :title="`${item.title}`" :class="{'topactive': isActive == item.name}">
                        <i :class="`${item.icon}`"></i>
                        <div class="title-menu">{{ item.title }}</div>
                      </a>
                    </template>
                    <!-- </router-link> -->
                </div>
            </div>
            <div class="sidebar-bottom">
            <div class="sidebar-menu-icon">
                <a href="account-setting.html" class="iq-waves-effect" data-toggle="tooltip" data-placement="right" title="" data-original-title="Setting"><i class="ri-settings-2-fill"></i></a>
                <div class="iq-menu-bt align-self-center">
                    <div class="wrapper-menu" @click="sidebarMini">
                        <div class="menu-close"><i class="ri-arrow-left-line"></i></div>
                        <div class="menu-open"><i class="ri-arrow-right-line"></i></div>
                    </div>
                </div>
            </div>
            </div>
          </div>
          <div class="iq-sidebar">
               <div class="iq-sidebar-logo d-flex justify-content-between">
                    <router-link :to="{ name: 'dashboard.home-1' }">
                        <span >{{ appName }}</span>
                    </router-link>
               </div>
                <div class="iq-search-bar">
                  <div class="searchbox w-100">
                    <input type="text" class="text search-input" style="cursor: pointer" @click="openSearch" v-model="globalSearch"
                          placeholder="Cari menu disini...">
                    <a class="search-link" href="#"><i class="ri-search-line"></i></a>
                    <GlobalSearch :search="globalSearch" @closeSearch="removeClass"/>
                  </div>
                </div>
               <div id="sidebar-scrollbar" class="mt-0">
                <div class="pl-3 pr-3 pt-3 pb-0" v-if="userrole.user.role == 1">
                  <div class="color: #cdced0;">
                    <ul class="list-unstyled">
                      <!-- <b-media tag="li" class="mb-3">
                        <template #aside>
                          <b-img width="80" :src="user.profile_image" rounded alt="placeholder"></b-img>
                        </template>
                        <h5 class="mt-0 mb-1 text-white">ini vendor</h5>
                        <div>
                          <span class="fa fa-star"></span>
                          <span class="fa fa-star"></span>
                          <span class="fa fa-star"></span>
                          <span class="fa fa-star"></span>
                          <span class="fa fa-star"></span>
                        </div>
                      </b-media> -->
                      <li>
                        <b-progress :max="maxBar" class="mb-3" height="1.5rem" v-b-tooltip.hover.html="tipData">
                          <b-progress-bar :value="valueBar">
                            <span>Verifikasi : <strong>{{ valueBar }} / {{ maxBar }}</strong></span>
                          </b-progress-bar>
                        </b-progress>
                      </li>
                      <!-- <li class="mb-3">
                        <div style="padding: 3px 10px;border: solid 2px #eaf3f7;border-radius: 10px;">
                          <span class="font-weight-bold">Vendor Regular</span>
                          <span class="text-success float-right">Upgrade</span>
                        </div>
                      </li> -->
                      <li>
                        <div>
                          <span>Toko Buka</span>
                          <span class="float-right"><i class="fas fa-clock"></i> {{ jambuka }}</span>
                        </div>
                      </li>
                    </ul>
                    <ul class="list-unstyled">
                      <li class="mb-2">
                        <div>
                          <span>Dompet</span>
                          <span class="float-right">Rp -</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="pl-3 pr-3 pt-3 pb-0" v-if="userrole.user.role == 10">
                </div>
                    <nav class="iq-sidebar-menu" >
                        <CollapseMenu :items="roleMenu" :open="true"  :sidebarGroupTitle="true" :reloadDt="renderComponent"/>
                    </nav>
                     <div class="p-3"></div>
                </div>
          </div>
    </div>
</template>
<script>
import { core, APPNAME, urlAssets } from '../../../../config/pluginInit'
import { mapGetters } from 'vuex'
import CollapseMenu from '../../menus/CollapseMenu'
import SideBarItems from '../../../../FackApi/json/SideBar'
import TopMenuItems from '../../../../FackApi/json/TopMenu'
import ApiProf from '@/services/vendor/profile'
import ApiSetting from '@/services/vendor/setting'
import GlobalSearch from '../../search/GlobalSearch'

export default {
  name: 'SidebarStyle1',
  props: {
    logoClass: { type: String, default: '' }
  },
  components: {
    CollapseMenu,
    GlobalSearch
  },
  mounted () {
    core.SmoothScrollbar()
    if (!this.horizontal) {
      document.addEventListener('click', this.closeSearch, true)
    }
    this.getVerifProfil()
  },
  data () {
    return {
      appName: APPNAME,
      SideBarItems: SideBarItems,
      renderComponent: true,
      maxBar: 5,
      valueBar: '',
      tipData: {},
      globalSearch: '',
      user: {
        profile_image: require('../../../../assets/images/user/user-1.jpg')
      },
      jambuka: '- Jam',
      isActive: '',
      userrole: this.userData()
    }
  },
  computed: {
    roleMenu () {
      const sideMenu = SideBarItems[0]['dashboard']
      var menuList
      if (this.userrole.user.role === '10') {
        menuList = sideMenu.concat(SideBarItems[2]['admin'])
      } else if (this.userrole.user.role === '1') {
        menuList = sideMenu.concat(SideBarItems[1]['vendor'])
      } else if (this.userrole.user.role === '2') {
        menuList = sideMenu.concat(SideBarItems[3]['contractor'])
      } else if (this.userrole.user.role === '0') {
        menuList = sideMenu.concat(SideBarItems[4]['noncontractor'])
      } else if (this.userrole.user.role === '99') {
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
      if (this.userrole.user.role === '10') {
        topMenuList = sideMenu.concat(TopMenuItems[2]['admin'])
      } else if (this.userrole.user.role === '1') {
        topMenuList = sideMenu.concat(TopMenuItems[1]['vendor'])
      } else if (this.userrole.user.role === '2') {
        topMenuList = sideMenu.concat(TopMenuItems[3]['contractor'])
      } else if (this.userrole.user.role === '0') {
        topMenuList = sideMenu.concat(TopMenuItems[4]['noncontractor'])
      } else if (this.userrole.user.role === '99') {
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
  methods: {
    ...mapGetters({
      userData: 'authModule/getUserData'
    }),
    sidebarMini () {
      core.triggerSet()
    },
    getVerifProfil () {
      ApiProf.profile.getVerifBar().then(response => {
        const dt = response.data
        this.valueBar = dt.data.rate
        this.tipData = {
          title: `Proses Verifikasi Data: <br> <ul><li><span class="font-weight-bold">${this.checkFile(dt.data.sub.email)} Verifikasi Email</span></li><li><span class="font-weight-bold">${this.checkFile(dt.data.sub.ktp)} Foto KTP</span></li><li><span class="font-weight-bold">${this.checkFile(dt.data.sub.npwp)} Nomor NPWP</span></li><li><span class="font-weight-bold">${this.checkFile(dt.data.sub.toko)} Foto Toko</span></li><li><span>${this.checkFile(dt.data.sub.video_ktp)} Foto Selfie KTP</span></li></ul>`,
          variant: 'info'
        }
      }).finally(() => { this.loading = false })

      ApiSetting.informasi
        .getinfo().then(response => {
          var dt = response.data
          if (response.status === 200) {
            this.namatoko = dt.data.namatoko
            this.jambuka = dt.data.jam
            this.user.profile_image = urlAssets + 'vendor/' + dt.data.user_id + '/logo/' + dt.data.logo
          }
        })
    },
    checkFile (check) {
      if (check === true) {
        return '<i class="ri-checkbox-line"></i>'
      } else {
        return '<i class="ri-checkbox-blank-line"></i>'
      }
    },
    openSearch () {
      this.showSearch = true
      this.showMenu = 'iq-show'
      this.globalSearch = ''
      if (document.getElementById('searchbox-datalink') !== null) {
        document.getElementById('searchbox-datalink').classList.add('show-data')
      }
    },
    closeSearch (event) {
      const classList = event.target.classList
      if (!classList.contains('searchbox') && !classList.contains('search-input')) {
        this.removeClass()
      }
    },
    removeClass () {
      this.showSearch = false
      this.showMenu = ''
      this.globalSearch = ''
      if (document.getElementById('searchbox-datalink') !== null && document.getElementById('searchbox-datalink') !== undefined) {
        document.getElementById('searchbox-datalink').classList.remove('show-data')
      }
    },
    showSideMenu (e) {
      this.isActive = e.name
      this.roleMenu.length = 0
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
          const subMenus = this.topMenu[5].children
          for (i in subMenus) {
            const dt = subMenus[i]
            this.roleMenu.push(dt)
          }
        } else if (e.name === 'vendor') {
          const subMenus = this.topMenu[1].children
          for (i in subMenus) {
            const dt = subMenus[i]
            this.roleMenu.push(dt)
          }
        } else if (e.name === 'contractor') {
          const subMenus = this.topMenu[2].children
          for (i in subMenus) {
            const dt = subMenus[i]
            this.roleMenu.push(dt)
          }
        } else if (e.name === 'master') {
          const subMenus = this.topMenu[3].children
          for (i in subMenus) {
            const dt = subMenus[i]
            this.roleMenu.push(dt)
          }
        } else if (e.name === 'report') {
          const subMenus = this.topMenu[4].children
          for (i in subMenus) {
            const dt = subMenus[i]
            this.roleMenu.push(dt)
          }
        } else if (e.name === 'users') {
          const subMenus = this.topMenu[5].children
          for (i in subMenus) {
            const dt = subMenus[i]
            this.roleMenu.push(dt)
          }
        } else {

        }
      } else {
        this.$router.push({ name: e.link.name })
      }
      this.renderComponent = false

      this.$nextTick(() => {
        this.renderComponent = true
      })
    }
  }
}
</script>

<style lang="less">
.iq-sidebar {
  background: var(--iq-darks) !important;
}
.bg-sidebar {
  background: var(--iq-primary) !important;
}
.searchbox-datalink {
  z-index: 1;
}
.title-menu {
  font-size: 10px;
  font-weight: 600;
  margin-top: -5px;
}
.topactive {
  background: var(--iq-darks);
}
</style>
