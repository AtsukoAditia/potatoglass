<template>
  <div class="iq-sidebar" style="top:36px;background: #2B343B;">
    <div class="iq-sidebar-logo d-flex justify-content-between">
      <router-link :to="homeURL">
        <img :src="logo" v-if="onlyLogo" class="img-fluid cstAppLogo" alt="logo">
        <span v-if="onlyLogoText" class="text-primary font-weight-bold cstAppName">{{ appName }}</span>
      </router-link>
      <div class="iq-menu-bt-sidebar" v-if="toggleButton">
        <div class="iq-menu-bt align-self-center">
          <div class="wrapper-menu" @click="miniSidebar">
            <div class="main-circle"><i class="ri-arrow-left-s-line"></i></div>
            <div class="hover-circle"><i class="ri-arrow-right-s-line"></i></div>
          </div>
        </div>
      </div>
    </div>
    <div id="sidebar-scrollbar" :style="miniDashboard">
      <nav class="iq-sidebar-menu" :class="horizontal ? 'd-xl-none' : ''">
      <CollapseMenu :reloadDt="reloadDt" :items="items" :open="true" :horizontal="horizontal" :sidebarGroupTitle="sidebarGroupTitle" />
      </nav>
      <div class="p-3"></div>
    </div>
    <!-- <div class="sb-height" v-if="this.userrole != 10">
      <dd class="css-usbzvy">
        <dl class="css-1sdk2kx">
          <div class="css-bqvohl">
            <dt>
              <p class="css-aot6by-unf-heading">Total Material</p>
            </dt>
            <dd>
              <p class="css-d8brx2-unf-heading">-</p>
            </dd>
          </div>
          <div class="css-bqvohl">
            <dt>
              <p class="css-aot6by-unf-heading">Total Order</p>
            </dt>
            <dd>
              <p class="css-d8brx2-unf-heading">-</p>
            </dd>
          </div>
        </dl>
      </dd>
    </div> -->
  </div>
  <!-- TOP Nav Bar -->
</template>

<script>
import CollapseMenu from '../menus/CollapseMenu'
import {
  APPNAME
} from '../../../config/pluginInit'
export default {
  name: 'Sidebar',
  props: {
    homeURL: {
      type: Object,
      default: () => ({
        name: 'dashboard.home-1'
      })
    },
    items: {
      type: Array
    },
    logo: {
      type: String,
      default: require('../../../assets/images/logo.png')
    },
    horizontal: {
      type: Boolean
    },
    toggleButton: {
      type: Boolean,
      default: true
    },
    logoShow: {
      type: Boolean,
      default: true
    },
    onlyLogo: {
      type: Boolean,
      default: false
    },
    onlyLogoText: {
      type: Boolean,
      default: false
    },
    reloadDt: {
      type: Boolean,
      default: true
    },
    sidebarGroupTitle: {
      type: Boolean,
      default: true
    }
  },
  components: {
    CollapseMenu
  },
  mounted () {
    this.checkUser()
  },
  methods: {
    miniSidebar () {
      this.$emit('toggle')
    },
    checkUser () {
      let locData = this.$store.getters.getUserData
      this.userrole = locData.user.role
      if (this.userrole !== 10) {
        this.miniDashboard = 'height: 80% !important;'
        this.$emit('toggle')
      }
    }
  },
  data () {
    return {
      appName: APPNAME,
      miniDashboard: '',
      userrole: ''
    }
  }
}

</script>

<style scoped>
  .sb-heigh {
    height: 20%;
  }
  .css-usbzvy {
    display: inline-block;
    vertical-align: top;
    width: 100%;
    padding: 5px 10px;
    margin: 0px;
}
.css-bqvohl {
    display: inline-block;
    padding: 0px 16px;
    width: 50%;
}
.css-bqvohl:first-of-type {
    padding-left: 0px;
}
.css-aot6by-unf-heading {
    display: block;
    position: relative;
    font-weight: 400;
    font-size: 0.857143rem;
    line-height: 18px;
    color: rgba(49, 53, 59, 0.68);
    text-decoration: initial;
    margin: 0px;
    text-transform: capitalize;
}
.css-d8brx2-unf-heading {
    display: block;
    position: relative;
    font-weight: 700;
    font-size: 1rem;
    line-height: 20px;
    color: rgba(49, 53, 59, 0.96);
    text-decoration: initial;
    margin: 2px 0px 0px;
    text-transform: capitalize;
}
.cstAppName {
  font-size: 20px !important;
  line-height: 40px !important;
  margin-left: 5px !important;
}
.cstAppLogo {
  height: 40px !important;
}
.iq-sidebar-logo {
  padding-left: 5px !important;
}
</style>
