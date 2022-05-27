<template>
  <ValidationObserver ref="form" v-slot="{ handleSubmit }">
    <form class="mt-4" novalidate @submit.prevent="handleSubmit(aesEncrypt)">
      <ValidationProvider vid="email" name="Alamat Email" :rules="`required|email`" v-slot="{ errors }">
        <div class="form-group">
          <label for="emailInput">Alamat Email</label>
          <input type="email" :class="'form-control mb-0' +(errors.length > 0 ? ' is-invalid' : '')"
                 id="emailInput" aria-describedby="emailHelp"
                 v-model="user.email" placeholder="app.proyekita@gmail.com" required>
          <div class="invalid-feedback">
            <span>{{ errors[0] }}</span>
          </div>
        </div>
      </ValidationProvider>
      <ValidationProvider vid="password" name="Kata Sandi" rules="required" v-slot="{ errors }">
        <div class="form-group">
          <label for="passwordInput">Kata Sandi</label>
          <router-link to="/auth/password-reset1" class="iq-waves-effect pr-4 float-right">
            Lupa password?
          </router-link>
            <input :type="type"  :class="'form-control mb-0 w-85 d-inline' +(errors.length > 0 ? ' is-invalid' : '')" id="passwordInput" v-model="user.password" placeholder="******" autocomplete="off" required>
            <b-button variant="info" class="ml-2" @click="showPassword" v-b-tooltip.hover :title="tooltipEye"><span :class="iconEye"></span></b-button>
            <div class="invalid-feedback">
              <span>{{ errors[0] }}</span>
            </div>
        </div>
      </ValidationProvider>
      <div class="d-inline-block w-100">
        <div class="custom-control custom-checkbox d-inline-block mt-2 pt-1">
          <input type="checkbox" class="custom-control-input" :id="formType">
          <label class="custom-control-label" :for="formType">Ingatkan saya</label>
        </div>
        <button type="submit" class="btn btn-primary float-right">Masuk</button>
      </div>
      <div class="sign-info">
          <span class="dark-color d-inline-block line-height-2">
            Tidak punya akun akses?
            <router-link to="/auth/sign-up1" class="iq-waves-effect pr-4">
              Daftar
            </router-link>
          </span>
        <!-- <social-login-form></social-login-form> -->
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
// import SocialLoginForm from './SocialLoginForm'
// import { core } from '../../../../config/pluginInit'
import API from '@/services/auth'
import { mapActions } from 'vuex'
import { core } from '@/config/pluginInit'
import firebase from 'firebase/app'
import 'firebase/messaging'
import dtF from '@/config/constant'
import CryptoJS from 'crypto-js'
// import Cookies from 'js-cookie'

export default {
  name: 'SignIn1Form',
  // components: { SocialLoginForm },
  props: ['formType', 'unique', 'password'],
  data: () => ({
    user: {
      email: '',
      password: ''
    },
    saltLength: 11,
    type: 'password',
    iconEye: 'fa fa-eye',
    tooltipEye: 'Tampilkan password'
  }),
  mounted () {
    this.user.unique = this.$props.unique
    this.user.password = this.$props.password
  },
  computed: {
  },
  methods: {
    ...mapActions({
      storeUserData: 'authModule/authUserAction',
      storeTokenAuth: 'authModule/tokenUserAction',
      storeTokenExp: 'authModule/tokenExpAction',
      storeIsLogin: 'authModule/checkLoginAction'
    }),
    showPassword () {
      if (this.type === 'password') {
        this.type = 'text'
        this.iconEye = 'fa fa-eye-slash'
        this.tooltipEye = 'Sembunyikan password'
      } else {
        this.type = 'password'
        this.iconEye = 'fa fa-eye'
        this.tooltipEye = 'Tampilkan password'
      }
    },

    aesEncrypt () {
      const cipher = CryptoJS.SHA256(this.user.password).toString(CryptoJS.enc.Hex)
      this.user.password = cipher

      this.onSubmit()
    },

    onSubmit () {
      if (this.formType === 'passport') {
        this.actionLogin()
      }
    },

    actionLogin () {
      core.custLoader(true)
      let formData = new FormData()
      formData.append('email', this.user.email)
      formData.append('password', this.user.password)

      API.loginPHP(formData).then(response => {
        var dt = response.data
        if (dt.message === 'SUCCESS') {
          core.showSnackbar('success', 'Login berhasil...')
          this.getTokenFCM()
          const userD = {
            auth: true,
            authType: 'passport',
            verified: dt.data['verified_vendor'],
            user: dt.data.user,
            isLoggedin: true
          }
          this.storeUserData(userD)
          localStorage.setItem('user', JSON.stringify(userD))
          localStorage.setItem('access_token', dt.data.access['token'])
          localStorage.setItem('token_exp', dt.data.access['exp'])
          if (dt.data.user.role === '1') {
            if (dt.data.verified_vendor === false) {
              // this.$router.push({ name: 'profile.edit-data-vendor' })
              window.location.href = '/edit-data-vendor'
            } else {
              // this.$router.push({ name: 'dashboard.vdashboard' })
              window.location.href = '/vdashboard'
            }
          } else if (dt.data.user.role === '10') {
            // this.$router.push({ name: 'dashboard.home-1' })
            window.location.href = '/home-1'
          } else if (dt.data.user.role === '2') {
            window.location.href = '/cdashboard'
          } else {
            window.location.href = '/'
          }
        }
      }).catch(error => {
        const dterr = error.response
        if (dterr.data.message === 'FAILED') {
          core.showSnackbar('error', 'Email atau Password salah, silahkan periksa kembali...')
        } else if (dterr.data.message === 'BANNED') {
          core.showSnackbar('warning', dterr.data.data)
        } else {
          core.showSnackbar('error', 'Terjadi kesalahan pada sistem...')
        }
        this.user.password = ''
      }).finally(() => { core.custLoader(false) })
    },
    getTokenFCM () {
      var config = {
        apiKey: dtF.firebaseConfig.apiKey,
        authDomain: dtF.firebaseConfig.authDomain,
        databaseURL: `https://${dtF.firebaseConfig.projectId}.firebaseio.com`,
        projectId: dtF.firebaseConfig.projectId,
        storageBucket: `${dtF.firebaseConfig.projectId}.appspot.com`,
        messagingSenderId: dtF.firebaseConfig.messagingSenderId,
        appId: '1:1023189231134:web:cb6c8fb8cf8f2d5fb6700f'
      }
      if (!firebase.apps.length) {
        firebase.initializeApp(config)
      } else {
        firebase.app()
      }

      const messaging = firebase.messaging()

      messaging.usePublicVapidKey('BGQsBy20RXZAFZY4mn8Fo-83J6_fIhrdAi1QZ_Hh_tggIGmYHiti4xsPUatEROFjPfedgGSU95fNd7vgb5yhFbk')

      messaging.requestPermission().then(() => {
        // console.log('Notification permission granted.')
        messaging.getToken().then((token) => {
          // console.log('New token created: ', token)
          this.saveNotificationToken(token)
        })
      }).catch(() => {
        // console.log('Unable to get permission to notify.', err)
      })

      messaging.onTokenRefresh(function () {
        messaging.getToken().then(function (newToken) {
          // console.log('Token refreshed: ', newToken)
          this.saveNotificationToken(newToken)
        }).catch(function () {
          // console.log('Unable to retrieve refreshed token ', err)
        })
      })
    },
    saveNotificationToken (token) {
      const payload = {
        token: token
      }
      API.sendTokenFCM(payload)
        .then((response) => {
          // console.log('Successfully saved notification token!')
          // console.log(response.data)
        })
        .catch((error) => {
          // console.log('Error: could not save notification token')
          if (error.response) {
            // console.log(error.response.status)
            // Most of the time a "this field must be unique" error will be returned,
            // meaning that the token already exists in db, which is good.
            if (error.response.data.registration_id) {
              // for (let err of error.response.data.registration_id) {
              // console.log(err)
              // }
            } else {
              // console.log('No reason returned by backend')
            }
            // If the request could not be sent because of a network error for example
          } else if (error.request) {
            // console.log('A network error occurred.')
            // For any other kind of error
          } else {
            // console.log(error.message)
          }
        })
    }
  }
}
</script>
<style scoped>
.w-85 {
  width: 85% !important;
}
</style>
