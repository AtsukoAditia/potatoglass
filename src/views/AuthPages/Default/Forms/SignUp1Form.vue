<template>
  <div>
    <form-wizard color="#58CBF5" @onComplete="aesEncrypt">
      <tab-content title="About You" :selected="true">
        <b-row>
          <!-- <b-col md="12" class="text-center">
            <span class="labelTextSlide lbl-left">Vendor</span>
            <label class="switch mb-0" @click="toggleCheckbox">
              <input type="checkbox" disabled class="checkCls" @click="toggleCheckbox">
              <div class="slider round">
              </div>
            </label>
            <span class="labelTextSlide lbl-right">Kontraktor</span>
          </b-col> -->
          <b-col md="12">
            <div class="form-group mb-1">
              <label class="mb-1" for="perusahaan">* Nama Lengkap</label>
              <input class="form-control mb-0" type="text" :class="hasError('fullname') ? 'is-invalid' : ''"
                v-model="formData.fullname">
              <div v-if="hasError('fullname')" class="invalid-feedback">
                <div class="error" v-if="!$v.formData.fullname.required">Field ini sangat dibutuhkan.</div>
              </div>
            </div>
          </b-col>
          <b-col md="6">
            <div class="form-group mb-1">
              <label class="mb-1" for="username">* Username</label>
              <input class="form-control mb-0" type="text" :class="hasError('username') ? 'is-invalid' : ''"
                v-model="formData.username" @input="checkUname">
              <div v-if="hasError('username')" class="invalid-feedback">
                <div class="error" v-if="!$v.formData.username.required">Field ini sangat dibutuhkan.</div>
                <div class="error" v-if="!$v.formData.username.minLength">Minimal username adalah 6 huruf.</div>
              </div>
            </div>
          </b-col>
          <b-col md="6">
            <div class="form-group mb-1">
              <label class="mb-1" for="perusahaan">* Nama Perusahaan</label>
              <input class="form-control mb-0" type="text" :class="hasError('perusahaan') ? 'is-invalid' : ''"
                v-model="formData.perusahaan">
              <div v-if="hasError('perusahaan')" class="invalid-feedback">
                <div class="error" v-if="!$v.formData.perusahaan.required">Field ini sangat dibutuhkan.</div>
              </div>
            </div>
          </b-col>
          <b-col md="7">
            <div class="form-group mb-1">
              <label class="mb-1" for="email">* Email</label>
              <input class="form-control mb-0" type="text" :class="hasError('email') ? 'is-invalid' : ''"
                v-model="formData.email" @input="checkEmail">
              <div v-if="hasError('email')" class="invalid-feedback">
                <div class="error" v-if="!$v.formData.email.required">Field ini sangat dibutuhkan.</div>
                <div class="error" v-if="!$v.formData.email.email">Format email harus benar.</div>
              </div>
            </div>
          </b-col>
          <b-col md="5">
            <div class="form-group mb-1">
              <label class="mb-1" for="telp">* Nomor Telepon Utama</label>
              <input class="form-control mb-0" type="text" :class="hasError('telp') ? 'is-invalid' : ''"
                v-model="formData.telp">
              <div v-if="hasError('telp')" class="invalid-feedback">
                <div class="error" v-if="!$v.formData.telp.required">Field ini sangat dibutuhkan.</div>
                <div class="error" v-if="!$v.formData.telp.numeric">Field harus berformat angka.</div>
                <div class="error" v-if="!$v.formData.telp.minLength">Minimal nomor adalah 8 angka.</div>
              </div>
            </div>
          </b-col>
          <b-col md="6">
            <div class="form-group mb-1">
              <label class="mb-1" for="perusahaan">* Password</label>
              <input type="password" class="form-control mb-0" :class="hasError('password') ? 'is-invalid' : ''"
                v-model="formData.password" autocomplete="off">
              <div v-if="hasError('password')" class="invalid-feedback">
                <div class="error" v-if="!$v.formData.password.required">Field ini sangat dibutuhkan.</div>
                <div class="error" v-if="!$v.formData.password.minLength">Minimal password adalah 6 huruf.</div>
              </div>
            </div>
          </b-col>
          <b-col md="6">
            <div class="form-group mb-1">
              <label class="mb-1" for="perusahaan">* Konfirmasi Password</label>
              <input type="password" class="form-control mb-0" :class="hasError('confirmpass') ? 'is-invalid' : ''"
                v-model="formData.confirmpass" autocomplete="off">
              <div v-if="hasError('confirmpass')" class="invalid-feedback">
                <div class="error" v-if="!$v.formData.confirmpass.required">Field ini sangat dibutuhkan.</div>
                <div class="error" v-if="!$v.formData.confirmpass.sameAs">Password tidak sama.</div>
              </div>
            </div>
          </b-col>
        </b-row>
      </tab-content>
      <tab-content title="Contact You">
        <b-row>
          <b-col md="6">
            <div class="form-group mb-1">
              <label class="mb-1" for="cp1">* No. Whatsapp 1</label>
              <input class="form-control mb-0" v-model="formData.cp1" type="text"
                :class="hasError('cp1') ? 'is-invalid' : ''">
              <div v-if="hasError('cp1')" class="invalid-feedback">
                <div class="error" v-if="!$v.formData.cp1.required">Field ini sangat dibutuhkan.</div>
                <div class="error" v-if="!$v.formData.cp1.numeric">Field harus berformat angka.</div>
                <div class="error" v-if="!$v.formData.cp1.minLength">Minimal nomor adalah 10 angka.</div>
              </div>
            </div>
          </b-col>
          <b-col md="6">
            <div class="form-group mb-1">
              <label class="mb-1" for="cp2">No. Whatsapp 2</label>
              <input class="form-control mb-0" v-model="formData.cp2" type="text"
                :class="hasError('cp2') ? 'is-invalid' : ''">
              <div v-if="hasError('cp2')" class="invalid-feedback">
                <div class="error" v-if="!$v.formData.cp2.numeric">Field harus berformat angka.</div>
                <div class="error" v-if="!$v.formData.cp2.minLength">Minimal nomor adalah 10 angka.</div>
              </div>
            </div>
          </b-col>
          <b-col md="7">
            <div class="form-group mb-1">
              <label class="mb-1" for="url">Url Website</label>
              <input class="form-control mb-0" v-model="formData.url" type="text">
            </div>
          </b-col>
          <!-- <b-col md="5">
            <div class="form-group mb-1">
              <label class="mb-1" for="sumber_info">Sumber Informasi</label>
              <input class="form-control mb-0" v-model="formData.sumber_info" type="text">
            </div>
          </b-col> -->
          <b-col md="12">
            <div class="form-group mb-1">
              <label class="mb-1" for="alamat">* Alamat</label>
              <input class="form-control mb-0" v-model="formData.alamat" type="text"
                :class="hasError('alamat') ? 'is-invalid' : ''">
              <div v-if="hasError('alamat')" class="invalid-feedback">
                <div class="error" v-if="!$v.formData.alamat.required">Field ini sangat dibutuhkan.</div>
              </div>
            </div>
          </b-col>
          <b-col md="12">
            <div class="form-group mb-1">
              <label class="mb-1" for="postal">* Kode Pos</label>
              <!-- <input class="form-control mb-0" @change="getKodePos" v-model="formData.postal" type="text" :class="hasError('postal') ? 'is-invalid' : ''"> -->
              <multiselect v-model="postalNya" id="postal" :custom-label="postalLabel" track-by="kodepos"
                placeholder="Ketik 5 Digit Kode Pos disini untuk mencari wilayah..." open-direction="bottom" :options="postalSel"
                :searchable="true" :internal-search="false" :options-limit="10" :loading="isLoading"
                :max-height="600" @search-change="asyncFind" @select="actSelSearch" :class="hasError('postal') ? 'is-invalid' : ''">
                <span slot="noOptions">Maaf, pilihan tidak tersedia</span>
                <span slot="noResult">Ups! Nama yang anda cari tidak tersedia atau belum terdaftar</span>
              </multiselect>
              <div v-if="hasError('postal')" class="invalid-feedback">
                <div class="error" v-if="!$v.formData.postal.required">Field ini sangat dibutuhkan.</div>
              </div>
            </div>
          </b-col>
          <b-col md="10">
            <div class="form-group mb-1">
              <label class="mb-1" for="jenis_material">* Jenis Material yang akan Dipasarkan</label>
              <multiselect v-model="bahanMaster" :options="getBahan" placeholder="Bisa pilih lebih dari satu..." label="name_category" :multiple="true" track-by="name_category" :close-on-select="false" :preserve-search="true" open-direction="bottom"></multiselect>
              <div v-if="jenbahan" class="invalid-feedback d-block">
                <div class="error">Field ini sangat dibutuhkan.</div>
              </div>
            </div>
          </b-col>
        </b-row>
      </tab-content>
    </form-wizard>
    <div class="sign-info">
      <span class="dark-color d-inline-block line-height-2">
        Sudah punya akun ?
        <router-link to="/auth/sign-in1" class="iq-waves-effect pr-4">
          Masuk disini
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import API from '@/services/auth'
// import SocialLoginForm from './SocialLoginForm'
import {
  mapActions
} from 'vuex'
import debounce from 'lodash.debounce'
import {
  core
} from '../../../../config/pluginInit'
import {
  FormWizard,
  TabContent,
  ValidationHelper
} from 'vue-step-wizard'
import 'vue-step-wizard/dist/vue-step-wizard.css'
import {
  required,
  minLength,
  numeric,
  email,
  sameAs
} from 'vuelidate/lib/validators'
import CryptoJS from 'crypto-js'
// import Cookies from 'js-cookie'

export default {
  name: 'SignUp1Form',
  components: {
    FormWizard,
    TabContent
  },
  mixins: [ValidationHelper],
  props: ['formType'],
  computed: {},
  mounted () {
    this.getMasterBahan()
  },
  data () {
    return {
      formData: {
        fullname: '',
        username: '',
        perusahaan: '',
        telp: null,
        email: null,
        password: '',
        confirmpass: '',
        cp1: null,
        cp2: null,
        alamat: '',
        postal: '',
        url: '',
        sumber_info: '-',
        prov: '',
        prov_id: '',
        kab: '',
        kab_id: '',
        kec: '',
        kec_id: '',
        kel: '',
        kel_id: '',
        checkbox: false
      },
      jenbahan: false,
      postalNya: null,
      validationRules: [{
        fullname: {
          required
        },
        username: {
          required,
          minLength: minLength(6)
        },
        perusahaan: {
          required
        },
        telp: {
          required,
          minLength: minLength(8),
          numeric
        },
        email: {
          required,
          email
        },
        password: {
          required,
          minLength: minLength(6)
        },
        confirmpass: {
          required,
          minLength: minLength(6),
          sameAs: sameAs('password')
        }
      }, {
        cp1: {
          required,
          minLength: minLength(10),
          numeric
        },
        cp2: {
          minLength: minLength(10),
          numeric
        },
        alamat: {
          required
        },
        postal: {
          required
        }
      }],
      bahanMaster: '',
      getBahan: [],
      postalSel: [],
      isLoading: false
    }
  },
  methods: {
    ...mapActions({
      storeUserData: 'authModule/authUserAction',
      storeTokenAuth: 'authModule/tokenUserAction',
      storeTokenExp: 'authModule/tokenExpAction',
      storeIsLogin: 'authModule/checkLoginAction'
    }),

    aesEncrypt (txt) {
      if (this.bahanMaster !== '' || this.bahanMaster.length !== 0) {
        const cipher = CryptoJS.SHA256(this.formData.password).toString(CryptoJS.enc.Hex)
        this.formData.password = cipher
        this.jenbahan = false

        this.onSubmit()
      } else {
        core.showSnackbar('error', 'Jenis Material yang akan dipasarkan harus diisi!')
        this.jenbahan = true
      }
    },

    getMasterBahan () {
      core.custLoader(true)
      API.getBahanPHP()
        .then(response => {
          const dt = response.data
          if (response.status) {
            this.getBahan = dt.data
          }
        }).catch(() => {
          core.showSnackbar('error', 'Maaf, terjadi kesalahan.')
        }).finally(() => {
          core.custLoader(false)
        })
    },
    getKodePos () {
      const val = this.postalNya
      core.custLoader(true)
      API.getKodePosPHP(val)
        .then(response => {
          // const dt = response.data
          if (response.status) {
            // console.log(dt)
          }
        }).catch(() => {
          core.showSnackbar('error', 'Maaf, terjadi kesalahan.')
        }).finally(() => {
          core.custLoader(false)
        })
    },
    onComplete () {
      // console.log(this.formData)
      // this.passportRegister()
      this.setBcryptHash()
    },
    postalLabel ({
      // eslint-disable-next-line camelcase
      kodepos, kelurahan, kecamatan, kabupaten, provinsi }) {
      // eslint-disable-next-line camelcase
      return `${kodepos} - ${kelurahan}, ${kecamatan}, ${kabupaten}, ${provinsi}`
    },
    asyncFind: debounce(
      function (name) {
        if (name.length >= 5) {
          this.isLoading = true
          API
            .getKodePosPHP(name).then(response => {
              this.postalSel = response.data.data
              this.isLoading = false
            })
        }
      }, 1000),
    actSelSearch (e) {
      this.formData.postal = e.kodepos
      this.formData.prov = e.provinsi
      this.formData.prov_id = ''
      this.formData.kab = e.kabupaten
      this.formData.kab_id = ''
      this.formData.kec = e.kecamatan
      this.formData.kec_id = ''
      this.formData.kel = e.kelurahan
      this.formData.kel_id = ''
    },
    onSubmit () {
      if (this.formType === 'passport') {
        this.passportRegister()
      }
    },
    passportRegister () {
      core.custLoader(true)
      const fd = new FormData()
      Object.keys(this.formData).forEach(key => {
        fd.append(key, this.formData[key])
      })
      fd.append('bahan', JSON.stringify(this.bahanMaster.map(x => x.bahan_id)))
      API.registerVendor(fd).then(response => {
        if (response.status) {
          core.showSnackbar('success', 'Pendaftaran berhasil, halaman akan dialihkan')
          var dt = response.data
          if (dt.message === 'SUCCESS') {
            core.showSnackbar('success', 'Login berhasil...')
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
                this.$router.push({
                  name: 'profile.edit-data-vendor'
                })
              } else {
                this.$router.push({
                  name: 'dashboard.vdashboard'
                })
              }
            } else {
              this.$router.push({
                name: 'dashboard.home-1'
              })
            }
          } else if (dt.message === 'FAIL_EMAIL' || dt.message === 'FAIL_UNAME') {
            core.showSnackbar('error', 'Maaf, Email / Username yang anda masukan telah terdaftar.')
          } else {
            core.showSnackbar('error', 'Maaf, terjadi kesalahan.')
          }
        } else if (response.data.errors.length > 0) {
          this.$refs.form.setErrors(response.data.errors)
          core.showSnackbar('error', 'Maaf, terjadi kesalahan.')
        }
      }).catch(() => {
        core.showSnackbar('error', 'Maaf, terjadi kesalahan. Pada Sistem')
        setTimeout(function () {
          window.location.reload()
        }, 2000)
      }).finally(() => {
        core.custLoader(false)
      })
    },
    checkUname: debounce(
      function (name) {
        if (name.target.value.length >= 6) {
          core.custLoader(true)
          API
            .checkAccount(this.formData.username, '').then(response => {
              const dt = response.data.data
              if (dt === 200) {
                core.showSnackbar('error', 'Maaf, Username sudah terdaftar. Silahkan buat username baru.')
                this.formData.username = ''
              }
            }).catch(() => {
              core.showSnackbar('error', 'Maaf, terjadi kesalahan saat cek username')
            }).finally(() => {
              core.custLoader(false)
            })
        }
      }, 500),
    checkEmail: debounce(
      function (name) {
        if (name.target.value.length >= 6) {
          core.custLoader(true)
          API
            .checkAccount('', this.formData.email).then(response => {
              const dt = response.data.data
              if (dt === 200) {
                core.showSnackbar('error', 'Maaf, email sudah terdaftar. Silahkan buat email baru.')
                this.formData.email = ''
              }
            }).catch(() => {
              core.showSnackbar('error', 'Maaf, terjadi kesalahan saat cek email')
            }).finally(() => {
              core.custLoader(false)
            })
        }
      }, 500),
    toggleCheckbox () {
      // console.log(this.checkbox)
      // if (!this.checkbox) {
      alert('Maaf, fitur belum tersedia..')
      // }
      // this.checkbox = !this.checkbox
    }
  }
}

</script>

<style scope>
  .wizard-tab-content {
    padding: 20px 0
  }

  .vue-step-wizard {
    width: 100%;
    padding: 0;
    background: none;
  }

  .step-body {
    box-shadow: none !important;
    padding: 1rem 0 0 0;
  }

  .step-header {
    display: none;
  }

  .form-control {
    border-radius: 5px !important;
  }

  .wizard-header {
    display: none;
  }

  .wizard-nav-pills {
    display: none !important;
  }

  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }

  .switch input {
    display: none;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #5fccf5;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked+.slider {
    background-color: #126ede;
  }

  input:focus+.slider {
    box-shadow: 0 0 1px #101010;
  }

  input:checked+.slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }

  .labelTextSlide {
    vertical-align: top;
    font-size: 14pt;
    font-weight: 800;

  }

  .lbl-left {
    color: #5fccf5;
    margin-right: 15px;
  }

  .lbl-right {
    color: #126ede;
    margin-left: 15px;
  }

</style>
