<template>
  <b-container fluid>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(onSubmit)">
        <b-row>
          <b-col lg="12">
            <iq-card body-class="p-0">
              <template v-slot:body>
                <div class="iq-edit-list">
                  <tab-nav :pills="true" class="iq-edit-profile d-flex">
                    <tab-nav-items class="col-md-4 p-0" :active="true" href="#info-login" title="Info Akun" />
                    <tab-nav-items class="col-md-4 p-0" :active="false" href="#info-perusahaan" title="Info Perusahaan" />
                    <tab-nav-items class="col-md-4 p-0" :active="false" href="#lokasi-contractor" title="Lokasi Contractor" />
                  </tab-nav>
                </div>
              </template>
            </iq-card>
          </b-col>
          <b-col lg="12">
            <div class="iq-edit-list-data">
              <tab-content id="pills-tabContent-2">
                <tab-content-item :active="true" id="info-login" >
                  <iq-card>
                    <template v-slot:headerTitle>
                      <h4 class="card-title">Info Akun</h4>
                    </template>
                    <template v-slot:body>
                        <!-- <span class="font-weight-bold text-muted">#3313</span> -->
                        <br>
                        <b-row align-v="center">
                          <b-form-group class="col-md-12" label="Username" label-for="username">
                            <ValidationProvider name="Username" rules="required" v-slot="{ errors }">
                              <b-form-input v-model="contractor.username" type="text" placeholder="Username" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                              <div class="invalid-feedback">
                                <span>{{ errors[0] }}</span>
                              </div>
                            </ValidationProvider>
                          </b-form-group>
                          <b-form-group class="col-md-12" label="Password" label-for="username">
                            <ValidationProvider name="Password" rules="required" v-slot="{ errors }">
                              <b-form-input v-model="contractor.password" type="password" placeholder="Password" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                              <div class="invalid-feedback">
                                <span>{{ errors[0] }}</span>
                              </div>
                            </ValidationProvider>
                          </b-form-group>
                        </b-row>
                    </template>
                  </iq-card>
                </tab-content-item>
                <tab-content-item :active="false" id="info-perusahaan" >
                  <iq-card>
                    <template v-slot:headerTitle>
                      <h4 class="card-title">Info Perusahaan</h4>
                    </template>
                    <template v-slot:body>
                        <!-- <span class="font-weight-bold text-muted">#3313</span> -->
                        <br>
                        <b-row align-v="center">
                          <b-form-group class="col-md-12" label="Nama Contractor" label-for="nperusahaan">
                            <ValidationProvider name="Nama Contractor" rules="required" v-slot="{ errors }">
                              <b-form-input v-model="contractor.nama_perusahaan" type="text" placeholder="Nama Contractor" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                              <div class="invalid-feedback">
                                <span>{{ errors[0] }}</span>
                              </div>
                            </ValidationProvider>
                          </b-form-group>
                          <b-form-group class="col-md-6" label="Nama Contact Person Contractor" label-for="ccontractor">
                            <ValidationProvider name="Contact Person Contractor" rules="required" v-slot="{ errors }">
                              <b-form-input v-model="contractor.nama_lengkap" type="text" placeholder="Contact Person Contractor" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                              <div class="invalid-feedback">
                                <span>{{ errors[0] }}</span>
                              </div>
                            </ValidationProvider>
                          </b-form-group>
                          <b-form-group class="col-md-6" label="Telpon Contractor" label-for="tcontractor">
                            <ValidationProvider name="Telpon Contractor" rules="required" v-slot="{ errors }">
                              <b-form-input v-model="contractor.telp_usaha" type="tel" placeholder="Telpon Contractor" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                              <div class="invalid-feedback">
                                <span>{{ errors[0] }}</span>
                              </div>
                            </ValidationProvider>
                          </b-form-group>
                          <b-form-group class="col-md-6" label="Nomor Whatsapp" label-for="tcontractor">
                            <ValidationProvider name="Nomor Whatsapp" rules="required" v-slot="{ errors }">
                              <b-form-input v-model="contractor.no_wa" type="tel" placeholder="Nomor Whatsapp" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                              <div class="invalid-feedback">
                                <span>{{ errors[0] }}</span>
                              </div>
                            </ValidationProvider>
                          </b-form-group>
                          <b-form-group class="col-md-6" label="Nomor Whatsapp 2" label-for="tcontractor">
                            <ValidationProvider name="Nomor Whatsapp 2" rules="required" v-slot="{ errors }">
                              <b-form-input v-model="contractor.no_wa_dua" type="tel" placeholder="Nomor Whatsapp 2" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                              <div class="invalid-feedback">
                                <span>{{ errors[0] }}</span>
                              </div>
                            </ValidationProvider>
                          </b-form-group>
                          <b-form-group class="col-md-6" label="Email Contractor" label-for="econtractor">
                            <ValidationProvider name="Email Contractor" rules="required" v-slot="{ errors }">
                              <b-form-input v-model="contractor.email" type="email" placeholder="Email Contractor" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                              <div class="invalid-feedback">
                                <span>{{ errors[0] }}</span>
                              </div>
                            </ValidationProvider>
                          </b-form-group>
                          <b-form-group class="col-md-6" label="Website Contractor" label-for="wcontractor">
                            <ValidationProvider name="Website Contractor" rules="required" v-slot="{ errors }">
                              <b-form-input v-model="contractor.website" type="text" placeholder="Website Contractor" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                              <div class="invalid-feedback">
                                <span>{{ errors[0] }}</span>
                              </div>
                            </ValidationProvider>
                          </b-form-group>
                          <b-form-group class="col-md-6" label="Jenis Material" label-for="wcontractor">
                            <ValidationProvider name="Jenis Material" rules="required" v-slot="{ errors }">
                              <b-form-input v-model="contractor.jenis_material" type="text" placeholder="Jenis Material" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                              <div class="invalid-feedback">
                                <span>{{ errors[0] }}</span>
                              </div>
                            </ValidationProvider>
                          </b-form-group>
                          <b-form-group class="col-md-6" label="Jenis Usaha" label-for="wcontractor">
                            <ValidationProvider name="Jenis Usaha" rules="required" v-slot="{ errors }">
                              <b-form-input v-model="contractor.jenis_usaha" type="text" placeholder="Jenis Usaha" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                              <div class="invalid-feedback">
                                <span>{{ errors[0] }}</span>
                              </div>
                            </ValidationProvider>
                          </b-form-group>
                          <!-- <b-form-group class="col-md-6" label="Kategori Jenis Material" label-for="tcontractor">
                            <ValidationProvider vid="kategorijenismaterial" name="Kategori Jenis Material" rules="required" v-slot="{ errors }">
                              <div class="form-group">
                                <b-form-select plain v-model="contractor.kategorijenismaterial" :options="options" id="kategorijenismaterial" :class="'form-control mb-0' +(errors.length > 0 ? ' is-invalid' : '')">
                                </b-form-select>
                                <div class="invalid-feedback">
                                  <span>{{ errors[0] }}</span>
                                </div>
                              </div>
                            </ValidationProvider>
                          </b-form-group> -->
                        </b-row>
                    </template>
                  </iq-card>
                </tab-content-item>
                <tab-content-item :active="false" id="lokasi-contractor">
                  <iq-card>
                    <template v-slot:headerTitle>
                      <h4 class="card-title">Lokasi Contractor</h4>
                    </template>
                    <template v-slot:body>
                      <b-row align-v="center">
                        <b-form-group class="col-md-6" label="Alamat Contractor" label-for="alcontractor">
                          <ValidationProvider name="Alamat Contractor" rules="required" v-slot="{ errors }">
                            <b-form-input v-model="contractor.alamat_lengkap" type="text" placeholder="Alamat Contractor" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                            <div class="invalid-feedback">
                              <span>{{ errors[0] }}</span>
                            </div>
                          </ValidationProvider>
                        </b-form-group>
                        <b-form-group class="col-md-6" label="Kode Pos" label-for="kodpcontractor">
                          <ValidationProvider name="Kode Pos" rules="required" v-slot="{ errors }">
                            <b-form-input v-model="contractor.kode_pos" type="number" placeholder="Kode Pos" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                            <div class="invalid-feedback">
                              <span>{{ errors[0] }}</span>
                            </div>
                          </ValidationProvider>
                        </b-form-group>
                        <b-form-group class="col-md-6" label="RT" label-for="kodpcontractor">
                          <ValidationProvider name="RT" rules="required" v-slot="{ errors }">
                            <b-form-input v-model="contractor.rt" type="number" placeholder="RT" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                            <div class="invalid-feedback">
                              <span>{{ errors[0] }}</span>
                            </div>
                          </ValidationProvider>
                        </b-form-group>
                        <b-form-group class="col-md-6" label="RW" label-for="kodpcontractor">
                          <ValidationProvider name="RW" rules="required" v-slot="{ errors }">
                            <b-form-input v-model="contractor.rw" type="number" placeholder="RW" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                            <div class="invalid-feedback">
                              <span>{{ errors[0] }}</span>
                            </div>
                          </ValidationProvider>
                        </b-form-group>
                        <b-form-group class="col-md-6" label="Latitude" label-for="lat">
                          <ValidationProvider name="Latitude" rules="required" v-slot="{ errors }">
                            <b-form-input v-model="contractor.lat" type="number" placeholder="-213.333" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                            <div class="invalid-feedback">
                              <span>{{ errors[0] }}</span>
                            </div>
                          </ValidationProvider>
                        </b-form-group>
                        <b-form-group class="col-md-6" label="Longitude" label-for="latlng">
                          <ValidationProvider name="Longitude" rules="required" v-slot="{ errors }">
                            <b-form-input v-model="contractor.lng" type="number" placeholder="119.999" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                            <div class="invalid-feedback">
                              <span>{{ errors[0] }}</span>
                            </div>
                          </ValidationProvider>
                        </b-form-group>
                        <!-- <b-form-group class="col-md-6" label="ID Lokasi" label-for="idlokasi">
                          <ValidationProvider name="ID Lokasi" rules="required" v-slot="{ errors }">
                            <b-form-input v-model="contractor.idlokasi" type="number" placeholder="ID Lokasi" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                            <div class="invalid-feedback">
                              <span>{{ errors[0] }}</span>
                            </div>
                          </ValidationProvider>
                        </b-form-group>
                        <b-form-group class="col-md-6" label="ID Lokasi Contractor" label-for="idlokasicontractor">
                          <ValidationProvider name="ID Lokasi Contractor" rules="required" v-slot="{ errors }">
                            <b-form-input v-model="contractor.idlokasicontractor" type="number" placeholder="ID Lokasi Contractor" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                            <div class="invalid-feedback">
                              <span>{{ errors[0] }}</span>
                            </div>
                          </ValidationProvider>
                        </b-form-group> -->
                        </b-row>
                    </template>
                  </iq-card>
                </tab-content-item>
              </tab-content>
            </div>
          </b-col>
          <b-col lg="12">
              <template>
                <div class="iq-edit-list">
                    <b-button variant="primary" type="submit" class="mb-3 float-right mr-1 btn-lg w-25"><i class="ri-bill-fill"></i>Tambahkan Contractor</b-button>
                    <b-button variant="danger" class="mb-3 float-right mr-1 btn-lg w-25"><i class="ri-heart-fill"></i>Batalkan</b-button>
                </div>
              </template>
          </b-col>
        </b-row>
      </form>
    </ValidationObserver>
  </b-container>
</template>
<script>
import { core } from '../../../config/pluginInit'
import API from '@/services/admin'
import { mapGetters } from 'vuex'

export default {
  name: 'ContractorAdd',
  mounted () {
    core.index()
    this.getUserData()
  },
  firestore () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      dataUser: 'Setting/dataUserState'
    })
  },
  data () {
    return {
      dataUsers: '',
      contractor: {
        nama_perusahaan: '',
        nama_lengkap: '',
        telp_usaha: '',
        email: '',
        no_wa: '',
        no_wa_dua: '',
        website: '',
        alamat_lengkap: '',
        rt: '',
        rw: '',
        lat: '',
        lng: '',
        kode_pos: ''
      },
      selectOptionPool: '1',
      selPool: [
        { item: '1', name: 'Sistem Hitung' },
        { item: '2', name: 'Sistem Logistik' }
      ],
      countries: [
        { value: 'Canada', text: 'Canada' },
        { value: 'Niada', text: 'Niada' },
        { value: 'USA', text: 'USA' },
        { value: 'India', text: 'India' },
        { value: 'Africa', text: 'Africa' }
      ],
      states: [
        { value: 'California', text: 'California' },
        { value: 'Florida', text: 'Florida' },
        { value: 'Georgia', text: 'Georgia' },
        { value: 'Connecticut', text: 'Connecticut' },
        { value: 'Louisiana', text: 'Louisiana' }
      ],
      options: [
        { value: null, text: 'Please select an option' },
        { value: 'Batu', text: 'Ini Batu' },
        { value: 'Bata', text: 'Ini Bata' }
      ]
    }
  },
  methods: {
    getUserData () {
      this.dataUsers = this.dataUser
    },
    onSubmit () {
      this.addContractorData()
    },
    // prevImageLogo: function (event) {
    //   const input = event.target

    //   if (input.files && input.files[0]) {
    //     const reader = new FileReader()

    //     reader.onload = (e) => {
    //       this.contractor.logo = e.target.result
    //     }

    //     reader.readAsDataURL(input.files[0])
    //   }
    // },
    // prevImageBanner: function (event) {
    //   const input = event.target

    //   if (input.files && input.files[0]) {
    //     const reader = new FileReader()

    //     reader.onload = (e) => {
    //       this.contractor.banner = e.target.result
    //     }

    //     reader.readAsDataURL(input.files[0])
    //   }
    // },
    hasNumber (myString) {
      const testing = /\d/.test(myString)
      if (testing) {
        return parseInt(myString)
      } else {
        return myString
      }
    },

    addContractorData () {
      // for (var i in this.contractor) {
      //   this.contractor[i] = this.hasNumber(this.contractor[i])
      // }
      this.contractor.kode_pos = parseInt(this.contractor.kode_pos)
      this.contractor.rt = parseInt(this.contractor.rt)
      this.contractor.rw = parseInt(this.contractor.rw)

      API.contractor
        .addContractor(this.contractor).then(response => {
          if (response.status) {
            this.$router.replace('/contractor')
          } else if (response.data.errors.length > 0) {
            this.$refs.form.setErrors(response.data.errors)
            core.showSnackbar('error', response.data.errors)
          }
        }).catch(error => {
          this.errorMessage = error
          core.showSnackbar('error', error)
        }).finally(() => { this.loading = false })
    }
  }
}
</script>
