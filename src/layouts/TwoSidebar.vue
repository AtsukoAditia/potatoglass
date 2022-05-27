<template>
  <div>
    <Loader />
    <div class="wrapper">
        <Customizer @onLogo="changeLogo" @toggle="sidebarMini" @animationChange="routerAnimationChange" />
       <SidebarStyle1 logoClass="w-75" />
       <HeaderStyle />
       <div class="content-page" id="content-page">
         <b-container class="forBreadcrumb" fluid="" v-if="!notBookmarkRouts.includes($route.name)">
          <b-row>
            <b-col md="12" v-if="dataUsers.verified == false && userrole != 10">
              <b-alert variant="dark" show dismissible dismiss-label="Tutup">
                <p class="mb-0"><strong>Perhatian :</strong> Akun anda belum di verifikasi oleh admin. Silahkan isi data vendor anda pada halaman <router-link :to="`/edit-data-vendor`">'Ubah Data Vendor'</router-link></p>
              </b-alert>
            </b-col>
            <b-col md="12" v-if="dataUsers.user.verify_email == false && userrole != 10">
              <b-alert variant="dark" show dismissible dismiss-label="Tutup">
                <p class="mb-0"><strong>Perhatian :</strong> Anda belum melakukan aktivasi email. Cek Kotak Masuk pada email anda atau kirim ulang <span class="text-primary" style="cursor:pointer;" @click="resendVerifEmail">'Klik Disini'</span></p>
              </b-alert>
            </b-col>
            <b-col md="12" v-if="verifemail == 'true'">
              <b-alert variant="success" show dismissible>
                <p class="mb-0"><strong>Selamat!</strong> Email anda telah terverifikasi. </p>
              </b-alert>
            </b-col>
            <BreadCrumb />
          </b-row>
        </b-container>
           <transition name="router-anim" enter-active-class="animated  fadeInUp" mode="out-in"
                    leave-active-class="animated fadeOut" >
              <router-view />
            </transition>
        </div>
     </div>
    <LayoutFooter />
    <ChatWidget />
  </div>
</template>
<script>
import { core } from '../config/pluginInit'
import { mapGetters } from 'vuex'
import API from '@/services/auth'
import HeaderStyle from '../components/core/partials/HeaderStyle/HeaderStyle.vue'
import SidebarStyle1 from '../components/core/partials/SidebarStyle/SidebarStyle1.vue'
import LayoutFooter from '../layouts/Components/LayoutFooter.vue'
import ChatWidget from '../layouts/Components/ChatWidget.vue'
import Loader from '../components/core/loader/Loader'
import Customizer from './Components/Customizer'
import BreadCrumb from '../components/core/breadcrumbs/BreadCrumb'
export default {
  name: 'TwoSidebar',
  components: {
    Loader,
    HeaderStyle,
    SidebarStyle1,
    Customizer,
    LayoutFooter,
    ChatWidget,
    BreadCrumb
  },
  data () {
    return {
      notBookmarkRouts: [
        'dashboard.home-1'
      ],
      dataUsers: {
        user: {}
      },
      userrole: '',
      verifemail: ''
    }
  },
  mounted () {
    document.body.classList = 'two-sidebar'
    this.getUsers()
  },
  destroyed () {
    document.body.classList = 'two-sidebar'
  },
  methods: {
    changeLogo (e) {
      this.logo = e
    },
    sidebarMini () {
      core.triggerSet()
      this.$store.dispatch('Setting/miniSidebarAction')
    },
    routerAnimationChange (e) {
      this.animated = e
    },
    ...mapGetters({
      userData: 'authModule/getUserData'
    }),

    getUsers () {
      var localUser = this.userData()
      this.dataUsers = localUser
      this.username = localUser.user.username
      this.userrole = localUser.user.role
      if (this.$route.query.verifemail === 'true') {
        this.verifemail = this.$route.query.verifemail
        localUser.user.verify_email = true
        localStorage.setItem('user', JSON.stringify(localUser))
      }
    },

    resendVerifEmail () {
      core.custLoader(true)
      API.resendVerifEmail(this.dataUsers.user.id).then(response => {
        var dt = response.data
        if (dt.message === 'SUCCESS') {
          core.showSnackbar('success', 'Verifikasi ulang email berhasil, silahkan cek email anda.')
        }
      }).catch(error => {
        const dterr = error.response
        if (dterr.data.message === 'FAILED') {
          core.showSnackbar('error', dterr.data.data)
        } else {
          core.showSnackbar('error', 'Terjadi kesalahan pada sistem...')
        }
      }).finally(() => { core.custLoader(false) })
    }
  }
}
</script>
<style>
  @import url("../assets/css/custom.css");
  @import url("../assets/css/PriceSlider.css");
</style>
