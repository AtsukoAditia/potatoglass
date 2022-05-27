<template>
  <div>
    <h1 class="mb-0">Lupa password?</h1>
    <p>Masukan WhatsApp yang ada pada akun anda, kami akan mengirimkan pesan.</p>
    <b-row v-if="checkTelp">
      <b-col md="12">
        <b-form-group label="Masukan Nomor Telepon:" label-for="notelp">
          <b-form-input id="notelp" type="text" v-model="notelp" placeholder="-" :state="phoneValidation"></b-form-input>
          <b-form-invalid-feedback :state="phoneValidation">
            Masukan nomor handphone WhatsApp dengan benar.
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="phoneValidation">
            Nomor valid
          </b-form-valid-feedback>
        </b-form-group>
      </b-col>
      <b-col md="12">
        <div class="d-inline-block w-100">
          <button type="submit" class="btn btn-primary float-right" @click="clickToOTP">Kirim OTP</button>
        </div>
      </b-col>
    </b-row>
    <b-row v-if="checkOTP">
      <b-col md="12">
        <b-form-group label="Kode OTP" label-for="otpInput" description="Harap jangan beritahu Kode OTP pada siapapun...">
          <otp-input
            ref="otpInput"
            id="otpInput"
            input-classes="otp-input"
            separator="-"
            :num-inputs="6"
            :should-auto-focus="true"
            :is-input-num="true"
            @on-change="handleOnChange"
            @on-complete="handleOnComplete"
          />
        </b-form-group>
        <div>Kode OTP tidak terkirim?
          <span v-if="!resendOTP">Mohon Tunggu {{ timerCount }}</span>
          <b-button variant="link" size="sm" v-if="resendOTP" @click="clickToOTP">Kirim Ulang</b-button>
        </div>
      </b-col>
      <b-col md="12">
        <div class="d-inline-block w-100">
          <button type="submit" class="btn btn-primary float-right" @click="actionOTP">Submit</button>
        </div>
      </b-col>
    </b-row>
    <b-row v-if="checkPass">
      <b-col md="12">
        <b-form-group label="Masukan Password Baru:" label-for="password">
          <b-form-input id="password" type="password" v-model="password" placeholder="-" :state="passValidation"></b-form-input>
          <b-form-invalid-feedback :state="passValidation">
            Minimal password adalah 6 huruf, disarankan dengan simbol atau angka.
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="passValidation">
            Password valid
          </b-form-valid-feedback>
        </b-form-group>
      </b-col>
      <b-col md="12">
        <div class="d-inline-block w-100">
          <button type="submit" class="btn btn-primary float-right" @click="changePass">Ubah Password</button>
        </div>
      </b-col>
    </b-row>
    <b-row v-if="allDone">
      <b-col md="12">
        <div class="text-center font-weight-bold text-dark">
          <h4>Password telah berhasil diubah. Mohon jaga password anda.</h4>
          <router-link to="/auth/sign-in1" class="iq-waves-effect pr-4 d-block mt-2">
            <b-button variant="success" size="sm">Masuk Disini</b-button>
          </router-link>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="12">
        <div class="sign-info">
            <span class="dark-color d-inline-block line-height-2">
              Sudah ingat password?
              <router-link to="/auth/sign-in1" class="iq-waves-effect pr-4">
                Masuk
              </router-link>
            </span>
        </div>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import {
  core
} from '../../../config/pluginInit'
import API from '@/services/auth'
import OtpInput from '@bachdgvn/vue-otp-input'
import { mapGetters } from 'vuex'
import CryptoJS from 'crypto-js'
// import Cookies from 'js-cookie'

export default {
  name: 'RecoverPassword1',
  components: {
    OtpInput
  },
  data () {
    return {
      notelp: '',
      checkTelp: true,
      checkOTP: false,
      checkPass: false,
      allDone: false,
      nootp: '',
      timerCount: 60,
      password: '',
      resendOTP: false
    }
  },
  watch: {
    timerCount: {
      handler (value) {
        if (value > 0) {
          setTimeout(() => {
            this.timerCount--
          }, 1000)
        } else {
          this.resendOTP = true
        }
      },
      immediate: true // This ensures the watcher is triggered upon creation
    }

  },
  computed: {
    phoneValidation () {
      return this.notelp.length > 10 && this.notelp.length < 13
    },
    passValidation () {
      return this.password.length > 5
    },
    ...mapGetters({
      dataUser: 'Setting/dataUserState'
    })
  },
  methods: {
    aesEncrypt (txt) {
      const cipher = CryptoJS.SHA256(txt).toString(CryptoJS.enc.Hex)
      return cipher
    },
    clickToOTP () {
      core.custLoader(true)
      API.sendOTP({
        msisdn: this.notelp
      }).then(response => {
        if (response.data.result) {
          this.checkOTP = true
          this.checkTelp = false
          this.resendOTP = false
          this.timerCount = 60
        } else {
          core.showSnackbar('error', 'Maaf, nomor telpon tidak terdaftar pada aplikasi')
        }
      }).catch(() => {
        // console.log(error)
        core.showSnackbar('error', 'Error...')
      }).finally(() => {
        core.custLoader(false)
      })
    },
    actionOTP () {
      core.custLoader(true)
      API.verifyOTP({ msisdn: this.notelp, otp: this.nootp }).then(response => {
        if (response.data.result.status) {
          localStorage.setItem('access_token', response.data.header['x-token'])
          localStorage.setItem('token_exp', response.data.header['x-expired'])

          this.checkOTP = false
          this.checkPass = true
        } else {
          core.showSnackbar('error', 'Kode OTP Salah, harap masukan dengan benar')
          this.$refs.otpInput.clearInput()
        }
      }).catch(() => {
        // console.log(error)
        core.showSnackbar('error', 'Kode OTP Salah, harap masukan dengan benar')
        this.$refs.otpInput.clearInput()
      }).finally(() => { core.custLoader(false) })
    },
    changePass () {
      const conf = confirm('Yakin ingin mengubah password?')
      if (conf) {
        core.custLoader(true)
        API.changePass({ password: this.aesEncrypt(this.password) }).then(response => {
          if (response.data.result) {
            core.showSnackbar('success', 'Ubah password berhasil, silahkan login ulang')
            localStorage.removeItem('access_token')
            localStorage.removeItem('token_exp')
            this.checkPass = false
            this.allDone = true
          }
        }).catch(() => {
          // console.log(error)
          core.showSnackbar('error', 'Error...')
        }).finally(() => { core.custLoader(false) })
      }
    },
    handleOnComplete (value) {
      this.nootp = value
      this.actionOTP()
    },
    handleOnChange (value) {
    },
    isNumber: function (evt) {
      evt = (evt) || window.event
      var charCode = (evt.which) ? evt.which : evt.keyCode
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault()
      } else {
        return true
      }
    }
  }
}

</script>
<style lang="less">
  .otp-input {
    width: 40px;
    height: 40px;
    padding: 5px;
    margin: 0 10px;
    font-size: 20px;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    text-align: center;
    &.error {
      border: 1px solid red !important;
    }
  }
  .otp-input::-webkit-inner-spin-button,
  .otp-input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>
