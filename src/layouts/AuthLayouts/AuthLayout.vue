<template>
  <div>
    <Loader />
    <section class="sign-in-page" style="height:100vh;">
      <b-container class="bg-white p-0 h-100">
        <div class="row no-gutters h-100">
          <div class="col-sm-6 align-self-center">
            <div class="sign-in-from pt-5 pb-5">
              <router-view></router-view>
            </div>
          </div>
          <div class="col-sm-6 text-center" style="right:0;">
            <div class="sign-in-detail text-white" :style="'background: url('+bgImageURL+') no-repeat 0 0; background-size: cover;'">
            <div>
              <a class="sign-in-logo mb-3" href="#">
              <!-- <img :src="logo" class="img-fluid" alt="logo"> -->
              <h2 class="text-white font-weight-bold">PROYEKITA.ID</h2>
              </a>
              <Slick :option="slickOptions">
                <div class="item">
                  <img :src="require('../../assets/images/login/login-imgvendor.png')" class="img-fluid mb-4" alt="logo">
                  <h4 class="mb-1 text-white">Manage your orders Construction</h4>
                  <p>Easy to Use and Save more budget for your project. BOMA.</p>
                </div>
                <div class="item">
                  <img :src="require('../../assets/images/login/login-imgvendor.png')" class="img-fluid mb-4" alt="logo">
                  <h4 class="mb-1 text-white">Manage your orders Construction</h4>
                  <p>Easy to Use and Save more budget for your project. BOMA.</p>
                </div>
                <div class="item">
                  <img :src="require('../../assets/images/login/login-imgvendor.png')" class="img-fluid mb-4" alt="logo">
                  <h4 class="mb-1 text-white">Manage your orders Construction</h4>
                  <p>Easy to Use and Save more budget for your project. BOMA.</p>
                </div>
              </Slick>
            </div>
            </div>
          </div>
        </div>
      </b-container>
    </section>
  </div>
</template>
<script>
import Loader from '../../components/core/loader/Loader'
import logo from '../../assets/images/logo-boma-white.png'
import { core } from '../../config/pluginInit'
import bgImage from '../../assets/images/login/login-2.jpg'
export default {
  name: 'AuthLayout',
  components: {
    Loader
  },
  mounted () {
    core.index()
  },
  data () {
    return {
      slickOptions: {
        slidesToShow: 1,
        arrows: false
      },
      logo: logo,
      bgImageURL: bgImage
    }
  }
}
</script>
<style>
  @import url("../../assets/css/custom.css");

  .sign-in-detail {
    height: 100% !important;
  }
</style>
