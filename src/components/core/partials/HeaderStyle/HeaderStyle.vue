<template>
    <div class="iq-top-navbar">
        <div class="iq-navbar-custom">
          <div class="iq-sidebar-logo">
            <div class="top-logo">
              <router-link :to="{ name: 'dashboard.home-1' }" class="logo">
                <div class="iq-light-logo">
                  <img src="../../../../assets/images/logo.gif" class="img-fluid" alt="logo">
                </div>
                <div class="iq-dark-logo">
                  <!-- <img src="../../../../assets/images/logo-dark.gif" class="img-fluid" alt="logo"> -->
                </div>
                <span>{{ appName }}</span>
              </router-link>
            </div>
          </div>
           <nav class="navbar navbar-expand-lg navbar-light p-0">
               <div class="navbar-left">
                  <!-- <ul id="topbar-data-icon" class="d-flex p-0 topbar-menu-icon">
                     <li v-for="(item, index) in bookmark" :key="index">
                        <router-link :to="item.link" class="nav-item" style="color: var(--iq-primary)">
                          <i :class="`${item.icon}`"></i>
                        </router-link>
                      </li>
                  </ul> -->
                  <!-- <div class="iq-search-bar d-none d-md-block">
                    <form action="#" class="searchbox">
                      <input type="text" class="text search-input" style="cursor: pointer" @click="openSearch" v-model="globalSearch"
                            placeholder="Type here to search...">
                      <a class="search-link" href="#"><i class="ri-search-line"></i></a>
                      <GlobalSearch :search="globalSearch" @closeSearch="removeClass "/>
                    </form>
                  </div> -->
                  <!-- <div class="table-responsive mb-0">
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
                  </div> -->
               </div>
                <b-navbar-toggle target="nav-collapse" class="">
                  <i class="ri-menu-3-line"></i>
                </b-navbar-toggle>
                <div class="iq-menu-bt align-self-center" v-if="$route.meta.layout !== 'two-sidebar'">
                  <div class="wrapper-menu" @click="sidebarMini">
                    <div class="main-circle"><i class="ri-arrow-left-s-line"></i></div>
                    <div class="hover-circle"><i class="ri-arrow-right-s-line"></i></div>
                  </div>
                </div>
                <b-collapse id="nav-collapse" is-nav>
                  <ul class="navbar-nav ml-auto navbar-list">
                    <!-- <li class="nav-item">
                      <a class="search-toggle iq-waves-effect language-title" href="#"><img :src="selectedLang.image" alt="img-flaf" class="img-fluid mr-1" style="height: 16px; width: 16px;" /><i class="ri-arrow-down-s-line"></i></a>
                      <div class="iq-sub-dropdown">
                        <a class="iq-sub-card" href="javascript:void(0)" v-for="(lang, i) in langsOptions" :key="`Lang${i}`" @click="langChange(lang)">
                          <img :src="lang.image" alt="img-flaf" class="img-fluid mr-2" />{{ lang.title }}
                        </a>
                      </div>
                    </li> -->
                    <!-- <li class="nav-item">
                      <div class="iq-sub-dropdown">
                        <div class="iq-card shadow-none m-0">
                          <div class="iq-card-body p-0 ">
                            <div class="bg-primary p-3">
                              <h5 class="mb-0 text-white">{{ $t('nav.allCarts') }}</h5>
                            </div>
                            <div class="iq-sub-card" v-for="(item, index) in cartItems" :key="index">
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
                            </div>
                            <router-link :to="{ name: 'app.e-commerce.cart'}"><b-button variant=" iq-bg-primary" block><i class="fas fa-cart-plus"/>{{ $t('nav.viewCarts') }}</b-button></router-link>
                          </div>
                        </div>
                      </div>
                    </li> -->
                    <!-- <li class="nav-item">
                      <a href="#" class="search-toggle iq-waves-effect">
                        <lottie :option="require('../../../../assets/images/small/lottie-bell')" id="lottie-beil" />
                        <span class="bg-danger dots"></span>
                      </a>
                      <div class="iq-sub-dropdown">
                        <div class="iq-card shadow-none m-0">
                          <div class="iq-card-body p-0 ">
                            <div class="bg-primary p-3">
                              <h5 class="mb-0 text-white">{{ $t('nav.allNotifications') }}<small class="badge  badge-light float-right pt-1">4</small></h5>
                            </div>
                            <a href="#" class="iq-sub-card" v-for="(item, index) in notification" :key="index">
                              <div class="media align-items-center">
                                <div class="">
                                  <img class="avatar-40 rounded" :src="item.image" alt="img">
                                </div>
                                <div class="media-body ml-3">
                                  <h6 class="mb-0 ">{{ item.name}}</h6>
                                  <small class="float-right font-size-12">{{ item.date}}</small>
                                  <p class="mb-0">{{ item.description}}</p>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </li> -->
                    <!-- <li class="nav-item">
                      <a href="javascript:void(0)" class="iq-waves-effect search-toggle">
                        <i class="ri-shopping-cart-2-line" />
                        <span class="menu-tag ml-2">{{ cartCount }}</span>
                      </a>
                      <div class="iq-sub-dropdown">
                        <div class="iq-card shadow-none m-0">
                          <div class="iq-card-body p-0 ">
                            <div class="bg-primary p-3">
                              <h5 class="mb-0 text-white">{{ $t('nav.allCarts') }}</h5>
                            </div>
                            <div class="iq-sub-card" v-for="(item, index) in cartItems" :key="index">
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
                            </div>
                            <router-link :to="{ name: 'app.e-commerce.cart'}"><b-button variant=" iq-bg-primary" block><i class="fas fa-cart-plus"/>{{ $t('nav.viewCarts') }}</b-button></router-link>
                          </div>
                        </div>
                      </div>
                    </li> -->
                  </ul>
               </b-collapse>
                <ul class="navbar-list">
                  <li class="rounded">
                    <a href="#" class="search-toggle iq-waves-effect d-flex align-items-center bg-primary rounded">
                      <img :src="user.profile_image" class="img-fluid rounded mr-3" alt="user">
                      <div class="caption">
                        <h6 class="mb-0 text-white line-height">Hello, {{ username }}</h6>
                          <span v-if="userrole == 1">
                            <i v-if="dataUsers.verified == true" v-b-tooltip.top="'Selamat! Akun anda sudah diverifikasi.'" class="fas fa-check-circle ml-1"></i>
                            <i v-else v-b-tooltip.top="'Akun anda belum di verifikasi, mohon lengkapi data.'" class="fas fa-times-circle ml-1"></i>
                          </span>
                      <span class="text-white font-size-12">{{ $t('nav.user.available') }}</span>
                      </div>
                    </a>
                    <div class="iq-sub-dropdown iq-user-dropdown">
                      <div class="iq-card shadow-none m-0">
                        <div class="iq-card-body p-0 ">
                          <div class="bg-primary p-3">
                            <h5 class="mb-0 text-white line-height">Hello, {{ username }}</h5>
                            <span class="text-white font-size-12">{{ $t('nav.user.available') }}</span>
                          </div>
                          <a :href="`https://market.proyekita.id/vendor/${dataUsers.user.username}`" target="_blank" class="iq-sub-card iq-bg-primary-hover">
                            <div class="media align-items-center">
                              <div class="rounded iq-card-icon iq-bg-primary">
                                <i class="ri-file-user-line"></i>
                              </div>
                              <div class="media-body ml-3">
                                <h6 class="mb-0 ">{{ $t('nav.user.profileTitle') }}</h6>
                                <p class="mb-0 font-size-12">{{ $t('nav.user.profileSub') }}</p>
                              </div>
                            </div>
                          </a>
                          <router-link :to="`/edit-data-vendor`" class="iq-sub-card iq-bg-primary-hover">
                            <div class="media align-items-center">
                              <div class="rounded iq-card-icon iq-bg-primary">
                                <i class="ri-file-user-line"></i>
                              </div>
                              <div class="media-body ml-3">
                                <h6 class="mb-0 ">Ubah Data Vendor</h6>
                                <p class="mb-0 font-size-12">Update informasi data</p>
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
                          <div class="d-inline-block w-100 text-center p-3">
                            <a class="bg-primary iq-sign-btn" href="javascript:void(0)" @click="logout" role="button">{{ $t('nav.user.signout') }}<i class="ri-login-box-line ml-2"></i></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
           </nav>
          </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
// import GlobalSearch from '../../search/GlobalSearch'
import { core, APPNAME, urlAssets } from '../../../../config/pluginInit'
// import langChange from '../../../../Mixins/langchange'
// import Lottie from '../../../../components/core/lottie/Lottie'
import ApiProf from '@/services/vendor/profile'
import ApiSetting from '@/services/vendor/setting'
// import Cookies from 'js-cookie'
export default {
  name: 'HeaderStyle',
  // mixins: [langChange],
  components: {
    // HoverMenu,
    // GlobalSearch,
    // CollapseMenu
    // Lottie
  },
  data () {
    return {
      appName: APPNAME,
      globalSearch: '',
      notification: [
        { image: require('../../../../assets/images/user/user-01.jpg'), name: 'Emma Watson Nik', date: 'Just Now', description: '95 MB' },
        { image: require('../../../../assets/images/user/user-02.jpg'), name: 'New customer is join', date: '5 days ago', description: 'Jond Nik' },
        { image: require('../../../../assets/images/user/user-03.jpg'), name: 'Two customer is left', date: '2 days ago', description: 'Jond Nik' },
        { image: require('../../../../assets/images/user/user-04.jpg'), name: 'New Mail from Fenny', date: '3 days ago', description: 'Jond Nik' }
      ],
      message: [
        { image: require('../../../../assets/images/user/user-01.jpg'), name: 'Nik Emma Watson', date: '13 jan' },
        { image: require('../../../../assets/images/user/user-02.jpg'), name: 'Lorem Ipsum Watson', date: '20 Apr' },
        { image: require('../../../../assets/images/user/user-03.jpg'), name: 'Why do we use it?', date: '30 Jun' },
        { image: require('../../../../assets/images/user/user-04.jpg'), name: 'Variations Passages', date: '12 Sep' },
        { image: require('../../../../assets/images/user/user-05.jpg'), name: 'Lorem Ipsum generators', date: '5 Dec' }
      ],
      dataUsers: {
        user: {}
      },
      user: {
        profile_image: require('../../../../assets/images/user/user-1.jpg')
      },
      displayNone: '',
      username: '',
      userrole: '',
      ticketNum: '',
      materialNum: '',
      orderNum: ''
    }
  },
  mounted () {
    if (!this.horizontal) {
      document.addEventListener('click', this.closeSearch, true)
    }
    this.getUsers()
  },

  computed: {
    // ...mapGetters({
    //   cartCount: 'Ecommerce/cartCountState',
    //   cartItems: 'Ecommerce/cartState',
    //   bookmark: 'Setting/bookmarkState',
    //   langsOptions: 'Setting/langOptionState',
    //   selectedLang: 'Setting/langState',
    //   userData: 'authModule/getUserData'
    // })
  },

  methods: {
    ...mapGetters({
      userData: 'authModule/getUserData'
    }),

    sidebarMini () {
      core.triggerSet()
    },
    getUsers () {
      const localUser = this.userData()
      this.dataUsers = localUser
      this.username = localUser.user.username
      this.userrole = localUser.user.role
      if (localUser.user.role !== 1) {
        this.displayNone = 'display:none;'
      }

      ApiSetting.informasi
        .getinfo().then(response => {
          var dt = response.data
          if (response.status === 200) {
            if (dt.data.logo != null && localUser.user.role === '1') {
              this.namatoko = dt.namatoko
              this.user.profile_image = urlAssets + 'vendor/' + dt.data.user_id + '/logo/' + dt.data.logo
            }
          }
        }).catch(error => {
          this.err = error
          localStorage.removeItem('user')
          localStorage.removeItem('access_token')
          window.location.href = '/'
        })
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
      if (document.getElementById('searchbox-datalink') !== null && document.getElementById('searchbox-datalink') !== undefined) {
        document.getElementById('searchbox-datalink').classList.remove('show-data')
      }
    },
    toEditProfile () {
      this.$router.push({ name: 'profile.edit-data-vendor' })
    },
    logout () {
      localStorage.removeItem('user')
      localStorage.removeItem('access_token')
      // this.$router.push({ name: 'auth1.sign-in1' })
      window.location.href = '/'
    },
    ...mapActions({
      removeToCart: 'Ecommerce/removeToCartAction',
      // langChangeState: 'Setting/setLangAction',
      rtlAdd: 'Setting/setRtlAction',
      rtlRemove: 'Setting/removeRtlAction'
    })

  }
}
</script>

<style lang="less">
  .iq-top-navbar {
    background: none !important;
    right: 10px !important;
  }
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
