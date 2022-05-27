<template>
  <b-container fluid>
        <b-row>
          <b-col lg="12">
            <iq-card body-class="p-0">
              <template v-slot:body>
                <div class="iq-edit-list">
                  <tab-nav :pills="true" class="iq-edit-profile d-flex">
                    <tab-nav-items class="col-md-4 p-0" :active="true" href="#userdata" title="Data Pengguna" />
                    <tab-nav-items v-if="getUserState.user.role == 10" class="col-md-4 p-0" href="#adminsetting" title="Admin Setting" />
                    <tab-nav-items class="col-md-4 p-0" href="#notif" title="Notifikasi" />
                  </tab-nav>
                </div>
              </template>
            </iq-card>
          </b-col>
          <b-col lg="12">
            <div class="iq-edit-list-data">
              <tab-content id="pills-tabContent-2">
                <tab-content-item :active="true" id="userdata" >
                  <iq-card>
                    <template v-slot:headerTitle>
                      <h4 class="card-title">Data Pengguna</h4>
                    </template>
                    <template v-slot:body>
                      <ValidationObserver v-slot="{ handleSubmit }">
                        <form @submit.prevent="handleSubmit(onSubmit)">
                          <!-- <span class="font-weight-bold text-muted">#{{ user.id }}</span> -->
                          <b-row align-v="center">
                            <b-form-group class="col-md-6" label="Username" label-for="username">
                              <ValidationProvider name="Username" rules="required" v-slot="{ errors }">
                                <b-form-input v-model="user.username" type="text" placeholder="-" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                                <div class="invalid-feedback">
                                  <span>{{ errors[0] }}</span>
                                </div>
                              </ValidationProvider>
                            </b-form-group>
                            <b-form-group class="col-md-6" label="Alamat Email" label-for="email">
                              <ValidationProvider name="Alamat Email" rules="required" v-slot="{ errors }">
                                <b-form-input v-model="user.email" type="email" placeholder="-" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                                <div class="invalid-feedback">
                                  <span>{{ errors[0] }}</span>
                                </div>
                              </ValidationProvider>
                            </b-form-group>
                          </b-row>
                          <b-button type="submit" variant="primary" class="mr-2">Ubah Data</b-button>
                          <b-button type="reset" variant="none" class="iq-bg-danger">Batal</b-button>
                        </form>
                      </ValidationObserver>
                    </template>
                  </iq-card>
                  <iq-card>
                    <template v-slot:headerTitle>
                      <h4 class="card-title">Pengaturan Rekening Bank</h4>
                    </template>
                    <template v-slot:body>
                      <b-row>
                        <b-col md="6">
                          <b-form-group
                            label-for="selBank"
                            label="Pilih Rekening Bank :">
                            <b-form-select v-model="rek.selecBank" id="selBank" class="mb-3">
                              <b-form-select-option :value="0">Pilih Salah Satu</b-form-select-option>
                              <b-form-select-option value="BCA">BANK BCA</b-form-select-option>
                              <b-form-select-option value="MANDIRI">BANK MANDIRI</b-form-select-option>
                              <b-form-select-option value="BRI">BANK BRI</b-form-select-option>
                              <b-form-select-option value="MAYBANK">BANK MAYBANK</b-form-select-option>
                              <b-form-select-option value="PERMATA">BANK PERMATA</b-form-select-option>
                            </b-form-select>
                          </b-form-group>
                        </b-col>
                        <b-col md="6">
                          <b-form-group id="input-group-2" label="Nama Sesuai Rekening(a/n) :" label-for="inputNamaRekening">
                            <b-form-input
                              id="inputNamaRekening"
                              v-model="rek.anRekening"
                              placeholder="-"
                            ></b-form-input>
                          </b-form-group>
                        </b-col>
                        <b-col md="6">
                          <b-form-group id="input-group-2" label="Masukan Nomor Rekening :" label-for="inputRekening">
                            <b-form-input
                              id="inputRekening"
                              v-model="rek.noRekening"
                              placeholder="-"
                            ></b-form-input>
                          </b-form-group>
                        </b-col>
                      </b-row>
                      <div class="text-right">
                        <b-button @click="submitRek" ref="submitForm" variant="primary" class="mr-2">Simpan Rekening</b-button>
                        <b-button type="reset" variant="none" class="iq-bg-danger">Batal</b-button>
                      </div>
                    </template>
                  </iq-card>
                  <iq-card>
                    <template v-slot:headerTitle>
                      <h4 class="card-title">Pengaturan Password</h4>
                    </template>
                    <template v-slot:body>
                      <ValidationObserver v-slot="{ handleSubmit }">
                        <b-form @submit.prevent="handleSubmit(changePassword)">
                            <b-row>
                              <b-form-group class="col-md-8" label="Kata Sandi Lama:" label-for="oldpass">
                                <ValidationProvider name="Kata Sandi" v-slot="{ errors }">
                                  <b-form-input v-model="pass.old_password" type="password" placeholder="Password lama" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                                  <div class="invalid-feedback">
                                    <span>{{ errors[0] }}</span>
                                  </div>
                                </ValidationProvider>
                              </b-form-group>
                              <b-form-group class="col-md-6" label="Kata Sandi Baru:" label-for="pass">
                                <ValidationProvider name="Kata Sandi" rules="confirmed:repeat_password" v-slot="{ errors }">
                                  <b-form-input v-model="pass.new_password" type="password" placeholder="Password" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                                  <div class="invalid-feedback">
                                    <span>{{ errors[0] }}</span>
                                  </div>
                                </ValidationProvider>
                              </b-form-group>
                              <b-form-group class="col-md-6" label="Ulangi Kata Sandi:" label-for="rpass">
                                <ValidationProvider vid="repeat_password" name="Ulangi Kata Sandi" rules="required" v-slot="{ errors }">
                                  <b-form-input v-model="pass.retype_password" type="password" placeholder="-" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                                  <div class="invalid-feedback">
                                    <span>{{ errors[0] }}</span>
                                  </div>
                                </ValidationProvider>
                              </b-form-group>
                            </b-row>
                            <div class="text-right">
                              <b-button type="submit" variant="primary" class="mr-2">Ubah Password</b-button>
                              <b-button type="reset" variant="none" class="iq-bg-danger">Batal</b-button>
                            </div>
                        </b-form>
                      </ValidationObserver>
                    </template>
                  </iq-card>
                  <iq-card>
                    <template v-slot:headerTitle>
                      <h4 class="card-title">Pengaturan Lanjutan</h4>
                    </template>
                    <template v-slot:body>
                      <b-alert :show="true" variant="danger">
                        <div class="iq-alert-text">
                          <b-form-checkbox class="d-inline float-right" id="checkVP" v-model="checkDel" switch @change="toggleDel">
                          </b-form-checkbox>
                          <h5 class="text-danger font-weight-bold">Matikan Akun Anda</h5>
                          Fitur ini digunakan apabila anda tidak setuju atau ingin menghapus data akun yang anda/kami buat di aplikasi ini.
                          </div>
                      </b-alert>
                    </template>
                  </iq-card>
                </tab-content-item>
                <tab-content-item id="notif" >
                  <iq-card>
                    <template v-slot:body>
                        <b-row align-v="center">
                          <b-form-group class="col-md-4" label="Pilih penerimaan notifikasi anda:">
                            <b-form-checkbox v-model="check.selEmail" name="check-email">Email
                            </b-form-checkbox>
                            <b-form-input v-if="check.selEmail == true" v-model="check.emailVal" class="mt-2" type="email" placeholder="Alamat email..."></b-form-input>
                          </b-form-group>
                          <b-form-group class="col-md-4" label=":">
                            <b-form-checkbox v-model="check.selWA" name="check-wa">WhatsApp
                            </b-form-checkbox>
                            <b-form-input v-if="check.selWA == true" v-model="check.waVal" class="mt-2" type="text" placeholder="Nomor whatsapp anda..."></b-form-input>
                          </b-form-group>
                          <b-form-group class="col-md-4" label=":">
                            <b-form-checkbox v-model="check.selSMS" name="check-wa">SMS
                            </b-form-checkbox>
                            <b-form-input v-if="check.selSMS == true" v-model="check.waSMS" class="mt-2" type="text" placeholder="Nomor handphone anda..."></b-form-input>
                          </b-form-group>
                        </b-row>
                        <b-button type="submit" variant="primary" class="mr-2">Simpan</b-button>
                        <b-button type="reset" variant="none" class="iq-bg-danger">Batal</b-button>
                    </template>
                  </iq-card>
                </tab-content-item>
                <tab-content-item id="adminsetting" >
                  <iq-card>
                    <template v-slot:body>
                        <b-row align-v="center">
                          <b-form-group class="col-md-1" label="Admin Fee" label-for="adminfee">
                            <b-input-group size="lg" append="%">
                              <b-form-input v-model="adminfee" type="text" placeholder="-" class="tarvol1"></b-form-input>
                            </b-input-group>
                          </b-form-group>
                        </b-row>
                        <b-button type="button" variant="primary" class="mr-2" @click="adminFeeAct">Simpan</b-button>
                        <b-button type="reset" variant="none" class="iq-bg-danger">Batal</b-button>
                    </template>
                  </iq-card>
                </tab-content-item>
              </tab-content>
            </div>
          </b-col>
        </b-row>

    <b-modal id="confirmPass" title="Konfirmasi Password" @ok="submitPass">
      <b-form-row>
        <b-col>
          <b-form-input type="password" placeholder="Masukan password anda" v-model="confirmPassTxt"></b-form-input>
        </b-col>
      </b-form-row>
    </b-modal>
  </b-container>
</template>
<script>
import { core } from '../../config/pluginInit'
import { mapGetters, mapActions } from 'vuex'
import API from '@/services/user'
import CryptoJS from 'crypto-js'

export default {
  name: 'ProfileEdit',
  mounted () {
    core.index()
    this.getDataProfile()
  },
  computed: {
    ...mapGetters({
      getUserState: 'authModule/getUserData'
    })
  },
  data () {
    return {
      user: {
        id: '',
        username: '',
        email: ''
        // profile_image: require('../../assets/images/user/user-11.png')
      },
      pass: {
        old_password: '',
        new_password: '',
        retype_password: ''
      },
      check: {
        selEmail: false,
        selWA: false,
        selSMS: false,
        emailVal: '',
        waVal: '',
        smsVal: ''
      },
      checkDel: false,
      adminfee: '',
      currentPassword: '',
      selected: [],
      allSelected: false,
      indeterminate: false,
      rek: {
        selecBank: 0,
        noRekening: '',
        anRekening: ''
      },
      confirmPassTxt: ''
    }
  },
  methods: {
    ...mapActions({
      storeUserData: 'authModule/authUserAction'
    }),
    onSubmit () {
      this.updateProfile()
    },
    previewImage: function (event) {
      const input = event.target

      if (input.files && input.files[0]) {
        const reader = new FileReader()

        reader.onload = (e) => {
          this.user.profile_image = e.target.result
        }

        reader.readAsDataURL(input.files[0])
      }
    },
    toggleAll (checked) {
      this.selected = checked ? this.notifApp.slice() : []
    },

    aesEncrypt (txt) {
      const cipher = CryptoJS.SHA256(txt).toString(CryptoJS.enc.Hex)
      return cipher
    },
    changePassword: function () {
      this.pass.new_password = this.aesEncrypt(this.pass.new_password)
      this.pass.old_password = this.aesEncrypt(this.pass.old_password)
      this.pass.retype_password = this.aesEncrypt(this.pass.retype_password)
      const conf = confirm('Ubah password?')

      if (conf) {
        core.custLoader(true)
        API.editPass(this.pass).then(response => {
          const dt = response.data
          if (response.status) {
            if (dt.message === 'SUCCESS') {
              core.showSnackbar('success', 'Password berhasil di ubah.')
            } else {
              core.showSnackbar('error', dt.data)
            }
          } else {
            core.showSnackbar('error', 'Maaf, terjadi kesalahan pada sistem.')
          }
        }).finally(() => {
          this.pass.new_password = ''
          this.pass.old_password = ''
          this.pass.retype_password = ''
          core.custLoader(false)
        }).catch(() => {
          core.showSnackbar('error', 'Maaf, terjadi kesalahan pada sistem.')
        })
      }
    },
    getDataProfile () {
      API.getUserProfile(this.getUserState.user.id).then(response => {
        this.user = {
          id: response.data.result.id,
          username: response.data.result.username,
          email: response.data.result.email
        }
        // console.log(response)
      }).finally(() => { this.loading = false })

      API.getrek().then(response => {
        const dt = response.data

        this.rek.anRekening = dt.data.atas_nama
        this.rek.noRekening = dt.data.rek
        this.rek.selecBank = dt.data.bank
        if (dt.data.bank === null) {
          this.rek.selecBank = 0
        }
      }).finally(() => { this.loading = false })
    },
    adminFeeAct () {
      core.custLoader(true)
      const fd = new FormData()
      fd.append('loyalty', parseInt(this.adminfee))
      API.editAdminFee(fd).then(response => {
        const dt = response.data
        if (response.status) {
          core.showSnackbar('success', dt.message)
          core.custLoader(false)
        }
      })
    },
    updateProfile () {
      core.custLoader(true)
      var localS = JSON.parse(localStorage.getItem('user'))
      API.editProfile(this.user).then(response => {
        if (response.status) {
          const userD = {
            auth: localS.auth,
            authType: 'passport',
            verified: localS.verified,
            user: {
              address: localS.user.address,
              coordinates: localS.user.coordinates,
              id: localS.user.id,
              role: localS.user.role,
              email: this.user.email,
              username: this.user.username
            },
            isLoggedin: true
          }
          this.storeUserData(userD)
          localStorage.setItem('user', JSON.stringify(userD))

          core.showSnackbar('success', 'User has been added successfully.')
        } else if (response.data.errors.length > 0) {
          this.$refs.form.setErrors(response.data.errors)
        }
      }).catch(() => {
        core.showSnackbar('error', 'Maaf, terjadi kesalahan.')
      }).finally(() => {
        window.location.reload()
      })
    },
    toggleDel () {
      if (this.checkDel === true) {
        alert('Development...')
      }
    },
    showPassword () {
      this.$root.$emit('bv::show::modal', 'confirmPass', '#submitForm')
    },
    submitRek () {
      core.custLoader(true)
      const dataPost = new FormData()
      dataPost.append('selectBank', this.rek.selecBank)
      dataPost.append('noRekening', this.rek.noRekening)
      dataPost.append('anRekening', this.rek.anRekening)
      API
        .updaterek(dataPost).then(response => {
          if (response.status === 200) {
            this.getDataProfile()
            core.showSnackbar('success', 'Berhasil mengubah rekening...')
          }
        }).finally(() => {
          core.custLoader(false)
        })
    },
    submitPass () {
      if (this.confirmPassTxt !== '12345') {
        alert('Password salah...')
      } else {
        alert('Sukses, masih dalam pengembangan')
      }
    }
  }
}
</script>

<style>
[dir=ltr][mode=light] ul.iq-edit-profile li:last-child a {
  border-radius: 15px !important;
}
  .tarvol1 {
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
    border: 1px solid #e9edf4;
  }
</style>
