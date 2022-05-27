<template>
  <!-- TOP Nav Bar -->
  <div class="iq-top-navbar bg-transparent" style="top:30px !important;">
    <div class="iq-navbar-custom" :class="horizontal ? 'd-flex align-items-center justify-content-between' : ''">
      <div class="iq-sidebar-logo">
        <div class="top-logo">
          <router-link :to="homeURL">
            <img :src="logo" class="img-fluid" alt="logo">
            <span>{{ appName }}</span>
          </router-link>
        </div>
      </div>
      <div class="iq-menu-horizontal" v-if="horizontal">
        <div class="iq-sidebar-menu">
          <CollapseMenu :items="items" :open="true" :horizontal="horizontal" :sidebarGroupTitle="sidebarGroupTitle"
            class="collapse-menu" />
          <HoverMenu :items="items" :sidebarGroupTitle="sidebarGroupTitle" class="hover-menu" />
        </div>
      </div>
      <nav class="navbar navbar-expand-lg navbar-light pt-0 pb-0 pl-3 pr-0">
        <div class="navbar-left w-50" v-if="!horizontal">
          <!-- <ul id="topbar-data-icon" class="d-flex p-0 topbar-menu-icon">
            <li v-for="(item, index) in bookmark" :key="index">
              <router-link :to="item.link" class="nav-link" style="color: var(--iq-primary)">
                <i :class="`${item.icon}`"></i>
              </router-link>
            </li>
          </ul> -->
          <!-- <div class="iq-search-bar">
            <form action="#" class="searchbox">
              <input type="text" class="text search-input" @click="openSearch" v-model="globalSearch"
                     placeholder="Ketik disini untuk mencari...">
              <a class="search-link" href="#"><i class="ri-search-line"></i></a>
              <GlobalSearch :search="globalSearch" @closeSearch="removeClass "/>
            </form>
          </div> -->
          <div class="table-responsive mb-0">
            <table class="table table-borderless table-sm">
              <tbody>
                <tr>
                  <th scope="row">Total Material</th>
                  <th scope="row">VP Aktif</th>
                  <th scope="row">Penawaran Aktif</th>
                  <th scope="row">Tiket Aktif</th>
                  <th scope="row"><b-badge variant="primary">Order Baru</b-badge></th>
                  <th scope="row"><b-badge variant="warning">Order Perlu Kirim</b-badge></th>
                </tr>
                <tr>
                  <td><a href="/material">{{ materialNum }}</a></td>
                  <td><a href="/material">0</a></td>
                  <td><a href="/material">0</a></td>
                  <td><a href="/ticket">{{ ticketNum }}</a></td>
                  <td><a href="/booking">{{ orderNum }}</a></td>
                  <td><a href="/booking">0</a></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <b-navbar-toggle target="nav-collapse" class="mr-2">
          <i class="ri-menu-3-line"></i>
        </b-navbar-toggle>
        <div class="iq-menu-bt align-self-center">
          <div class="wrapper-menu" @click="miniSidebar">
            <div class="main-circle"><i class="ri-arrow-left-s-line"></i></div>
            <div class="hover-circle"><i class="ri-arrow-right-s-line"></i></div>
          </div>
        </div>
        <b-collapse id="nav-collapse" is-nav>
          <slot name="responsiveRight" />
        </b-collapse>
        <slot name="right" />
      </nav>
    </div>
  </div>
  <!-- TOP Nav Bar END -->
</template>
<script>
import {
  APPNAME
} from '../../../config/pluginInit'
import ApiProf from '@/services/vendor/profile'
import {
  mapGetters
} from 'vuex'
import HoverMenu from '../menus/HoverMenu'
// import GlobalSearch from '../search/GlobalSearch'
import CollapseMenu from '../menus/CollapseMenu'
export default {
  name: 'DefaultNavBar',
  props: {
    homeURL: {
      type: Object,
      default: () => ({
        name: 'dashboard.home-1'
      })
    },
    logo: {
      type: String,
      default: require('../../../assets/images/logo.png')
    },
    horizontal: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array
    },
    sidebarGroupTitle: {
      type: Boolean,
      default: true
    }
  },
  mounted () {
    if (!this.horizontal) {
      document.addEventListener('click', this.closeSearch, true)
    }
    this.getCount()
  },
  components: {
    HoverMenu,
    // GlobalSearch,
    CollapseMenu
  },
  computed: {
    ...mapGetters({
      bookmark: 'Setting/bookmarkState',
      userData: 'authModule/getUserData'
    })
  },
  data () {
    return {
      appName: APPNAME,
      globalSearch: '',
      showSearch: false,
      showMenu: false,
      ticketNum: '',
      materialNum: '',
      orderNum: ''
    }
  },
  methods: {
    miniSidebar () {
      this.$emit('toggle')
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
      let classList = event.target.classList
      if (!classList.contains('searchbox') && !classList.contains('search-input')) {
        this.removeClass()
      }
    },
    getCount () {
      ApiProf.getMaterialC(this.userData().user.id).then(response => {
        const dt = response.data.data[0]
        this.materialNum = dt.count_material
      }).finally(() => { this.loading = false })

      ApiProf.getTicketC(this.userData().user.id).then(response => {
        const dt = response.data.data[0]
        this.ticketNum = dt.count_active_ticket
      }).finally(() => { this.loading = false })

      ApiProf.getOrderC(this.userData().user.id).then(response => {
        const dt = response.data.data[0]
        this.orderNum = dt.jumlah_order
      }).finally(() => { this.loading = false })
    },
    removeClass () {
      this.showSearch = false
      this.showMenu = ''
      this.globalSearch = ''
      if (document.getElementById('searchbox-datalink') !== null && document.getElementById('searchbox-datalink') !==
          undefined) {
        document.getElementById('searchbox-datalink').classList.remove('show-data')
      }
    }
  }
}

</script>

<style scoped lang="scss">
  .collapse-menu {
    @media (min-width:1300px) {
      display: none;
    }
  }

  .iq-sidebar-menu .iq-menu.hover-menu {
    display: flex;

    @media (max-width:1299px) {
      display: none !important;
    }
  }

</style>
