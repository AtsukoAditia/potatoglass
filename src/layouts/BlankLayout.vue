<template>
  <div>
    <Loader />
    <b-navbar toggleable="md" type="light" variant="primary" class="mb-4">
      <b-navbar-brand href="#">
        <div class="top-logo">
            <img :src="logo" class="img-fluid" alt="logo" width="40px">
            <span class="text-white font-weight-bold">{{ appName }}</span>
        </div>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <!-- <b-nav-item href="#">Link</b-nav-item> -->
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-navbar-nav>
            <b-nav-item href="/auth/sign-up1">Daftar</b-nav-item>
            <b-nav-item href="/auth/sign-in1">Masuk</b-nav-item>
          </b-navbar-nav>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div class="wrapper">
      <router-view/>
    </div>
  </div>
</template>
<script>
import Loader from '../components/core/loader/Loader'
import { core, APPNAME } from '../config/pluginInit'
export default {
  name: 'BlankLayout',
  components: {
    Loader
  },
  mounted () {
    core.mainIndex()
  },
  data () {
    return {
      appName: APPNAME,
      logo: require('../assets/images/logo.png')
    }
  }
}
</script>
<style>
  @import url("../assets/css/custom.css");
  .modal-backdrop {
    opacity: .5;
  }
</style>
