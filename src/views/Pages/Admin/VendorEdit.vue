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
                    <tab-nav-items class="col-md-6 p-0" :active="true" href="#info-perusahaan" title="Info Perusahaan" />
                    <tab-nav-items class="col-md-6 p-0" :active="false" href="#lokasi-vendor" title="Lokasi Vendor" />
                    <!-- <tab-nav-items class="col-md-2 p-0" :active="false" href="#data-transportasi" title="Data Transportasi" /> -->
                    <!-- <tab-nav-items class="col-md-2 p-0" :active="false" href="#peta-lokasi" title="Peta Lokasi" /> -->
                    <!-- <tab-nav-items class="col-md-2 p-0" :active="false" href="#logo" title="Logo" />
                    <tab-nav-items class="col-md-2 p-0" :active="false" href="#banner" title="Banner" /> -->
                  </tab-nav>
                </div>
              </template>
            </iq-card>
          </b-col>
          <b-col lg="12">
            <div class="iq-edit-list-data">
              <tab-content id="pills-tabContent-2">
                <tab-content-item :active="true" id="info-perusahaan" >
                  <iq-card>
                    <template v-slot:headerTitle>
                      <h4 class="card-title">Info Perusahaan</h4>
                    </template>
                    <template v-slot:body>
                        <br>
                        <b-row align-v="center">
                          <b-form-group class="col-md-12" label="Nama Vendor" label-for="nperusahaan">
                            <ValidationProvider name="Nama Vendor" rules="required" v-slot="{ errors }">
                              <b-form-input v-model="vendor.vendor_name" type="text" placeholder="Nama Vendor" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                              <div class="invalid-feedback">
                                <span>{{ errors[0] }}</span>
                              </div>
                            </ValidationProvider>
                          </b-form-group>
                          <b-form-group class="col-md-6" label="Nama Contact Person Vendor" label-for="cvendor">
                            <ValidationProvider name="Contact Person Vendor" rules="required" v-slot="{ errors }">
                              <b-form-input v-model="vendor.contact_person" type="text" placeholder="Contact Person Vendor" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                              <div class="invalid-feedback">
                                <span>{{ errors[0] }}</span>
                              </div>
                            </ValidationProvider>
                          </b-form-group>
                          <b-form-group class="col-md-6" label="Telpon Vendor" label-for="tvendor">
                            <ValidationProvider name="Telpon Vendor" rules="required" v-slot="{ errors }">
                              <b-form-input v-model="vendor.phone" type="tel" placeholder="Telpon Vendor" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                              <div class="invalid-feedback">
                                <span>{{ errors[0] }}</span>
                              </div>
                            </ValidationProvider>
                          </b-form-group>
                          <b-form-group class="col-md-6" label="Email Vendor" label-for="evendor">
                            <ValidationProvider name="Email Vendor" rules="required" v-slot="{ errors }">
                              <b-form-input v-model="vendor.email" type="email" placeholder="Email Vendor" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                              <div class="invalid-feedback">
                                <span>{{ errors[0] }}</span>
                              </div>
                            </ValidationProvider>
                          </b-form-group>
                          <b-form-group class="col-md-6" label="Website Vendor" label-for="wvendor">
                            <ValidationProvider name="Website Vendor" rules="required" v-slot="{ errors }">
                              <b-form-input v-model="vendor.website" type="text" placeholder="Website Vendor" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                              <div class="invalid-feedback">
                                <span>{{ errors[0] }}</span>
                              </div>
                            </ValidationProvider>
                          </b-form-group>
                          <b-form-group class="col-md-6" label="NPWP Vendor" label-for="npwpvendor">
                            <ValidationProvider name="NPWP Vendor" rules="required" v-slot="{ errors }">
                              <b-form-input v-model="vendor.npwp_vendor" type="number" placeholder="NPWP Vendor" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                              <div class="invalid-feedback">
                                <span>{{ errors[0] }}</span>
                              </div>
                            </ValidationProvider>
                          </b-form-group>
                        </b-row>
                    </template>
                  </iq-card>
                </tab-content-item>
                <tab-content-item :active="false" id="lokasi-vendor">
                  <iq-card>
                    <template v-slot:headerTitle>
                      <h4 class="card-title">Lokasi Vendor</h4>
                    </template>
                    <template v-slot:body>
                      <b-row align-v="center">
                        <b-form-group class="col-md-6" label="Alamat Vendor" label-for="alvendor">
                          <ValidationProvider name="Alamat Vendor" rules="required" v-slot="{ errors }">
                            <b-form-input v-model="vendor.alamat" type="text" placeholder="Alamat Vendor" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                            <div class="invalid-feedback">
                              <span>{{ errors[0] }}</span>
                            </div>
                          </ValidationProvider>
                        </b-form-group>
                        <b-form-group class="col-md-6" label="Kota" label-for="kotvendor">
                          <ValidationProvider name="Kota" rules="required" v-slot="{ errors }">
                            <b-form-input v-model="vendor.kota" type="text" placeholder="Kota" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                            <div class="invalid-feedback">
                              <span>{{ errors[0] }}</span>
                            </div>
                          </ValidationProvider>
                        </b-form-group>
                        <b-form-group class="col-md-6" label="Provinsi" label-for="kotbagvendor">
                          <ValidationProvider name="Provinsi" rules="required" v-slot="{ errors }">
                            <b-form-input v-model="vendor.provinsi" type="text" placeholder="Provinsi" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                            <div class="invalid-feedback">
                              <span>{{ errors[0] }}</span>
                            </div>
                          </ValidationProvider>
                        </b-form-group>
                        <b-form-group class="col-md-6" label="Kode Pos" label-for="kodpvendor">
                          <ValidationProvider name="Kode Pos" rules="required" v-slot="{ errors }">
                            <b-form-input v-model="vendor.kode_pos" type="number" placeholder="Kode Pos" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                            <div class="invalid-feedback">
                              <span>{{ errors[0] }}</span>
                            </div>
                          </ValidationProvider>
                        </b-form-group>
                        <b-form-group class="col-md-6" label="Latitude" label-for="lat">
                          <ValidationProvider name="lat" rules="required" v-slot="{ errors }">
                            <b-form-input v-model="vendor.address_lat" type="text" placeholder="-" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                            <div class="invalid-feedback">
                              <span>{{ errors[0] }}</span>
                            </div>
                          </ValidationProvider>
                        </b-form-group>
                        <b-form-group class="col-md-6" label="Longitude" label-for="lng">
                          <ValidationProvider name="Longitude" rules="required" v-slot="{ errors }">
                            <b-form-input v-model="vendor.address_long" type="text" placeholder="-" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                            <div class="invalid-feedback">
                              <span>{{ errors[0] }}</span>
                            </div>
                          </ValidationProvider>
                        </b-form-group>
                        </b-row>
                    </template>
                  </iq-card>
                </tab-content-item>
                <!-- <tab-content-item :active="false" id="data-transportasi">
                  <iq-card>
                    <template v-slot:headerTitle>
                      <h4 class="card-title">Data Transportasi</h4>
                    </template>
                    <template v-slot:body>
                      <b-row align-v="center">
                        <b-form-radio-group
                          v-model="selectOptionPool"
                          :options="selPool"
                          class="col-md-12 mb-3"
                          value-field="item"
                          text-field="name"
                          disabled-field="notEnabled"
                        ></b-form-radio-group>
                        <b-col md="12">
                          <b-row align-v="center" v-if="selectOptionPool == '1'">
                              <b-form-group class="col-md-12" label="Jarak Tempuh dari Pool" label-for="jaraktempuh">
                                <ValidationProvider name="Jarak Tempuh dari Pool">
                                  <b-form-input v-model="vendor.jaraktempuh" type="text" placeholder="-- KM" disabled></b-form-input>
                                </ValidationProvider>
                              </b-form-group>
                              <b-form-group class="col-md-6" label="Status biaya ke pool dari vendor" label-for="statcostfromvendor">
                                <ValidationProvider name="Status biaya ke pool dari vendor" rules="required" v-slot="{ errors }">
                                  <b-form-input v-model="vendor.statcostfromvendor" type="number" placeholder="Status biaya ke pool dari vendor" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                                  <div class="invalid-feedback">
                                    <span>{{ errors[0] }}</span>
                                  </div>
                                </ValidationProvider>
                              </b-form-group>
                              <b-form-group class="col-md-6" label="Jenis ton mobil yang dapat lewat" label-for="toncartype">
                                <ValidationProvider name="Jenis ton mobil yang dapat lewat" rules="required" v-slot="{ errors }">
                                  <b-form-input v-model="vendor.toncartype" type="number" placeholder="Jenis ton mobil yang dapat lewat" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                                  <div class="invalid-feedback">
                                    <span>{{ errors[0] }}</span>
                                  </div>
                                </ValidationProvider>
                              </b-form-group>
                              <b-form-group class="col-md-6" label="Status kirim dari data material" label-for="statdatamaterial">
                                <ValidationProvider name="Status kirim dari data material" rules="required" v-slot="{ errors }">
                                  <b-form-input v-model="vendor.statdatamaterial" type="number" placeholder="Status kirim dari data material" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                                  <div class="invalid-feedback">
                                    <span>{{ errors[0] }}</span>
                                  </div>
                                </ValidationProvider>
                              </b-form-group>
                          </b-row>

                          <b-row v-else>
                            <b-col md="12">
                              <h2 class="font-weight-bold text-center">Schema Logistic Coming Soon</h2>
                            </b-col>
                          </b-row>
                        </b-col>
                      </b-row>
                    </template>
                  </iq-card>
                </tab-content-item> -->
                <!-- <tab-content-item :active="false" id="peta-lokasi">
                  <iq-card>
                    <template v-slot:headerTitle>
                      <h4 class="card-title">Peta Lokasi</h4>
                    </template>
                    <template v-slot:body>
                      <b-row align-v="center">
                        <b-form-group class="col-md-12" label="Cari Alamat" label-for="datmap">
                          <ValidationProvider name="Cari Alamat">
                            <b-form-input v-model="vendor.datmap" type="text" placeholder="Cari Alamat"></b-form-input>
                          </ValidationProvider>
                        </b-form-group>
                        <iframe class="w-100" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3902543.2003194243!2d-118.04220880485131!3d36.56083290513502!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80be29b9f4abb783%3A0x4757dc6be1305318!2sInyo%20National%20Forest!5e0!3m2!1sen!2sin!4v1576668158879!5m2!1sen!2sin"  height="500" allowfullscreen=""></iframe>
                      </b-row>
                    </template>
                  </iq-card>
                </tab-content-item> -->
                <!-- <tab-content-item :active="false" id="logo">
                  <iq-card>
                    <template v-slot:headerTitle>
                      <h4 class="card-title">Logo</h4>
                    </template>
                    <template v-slot:body>
                      <b-form>
                          <b-form-group class="row align-items-center">
                          <b-col md="12">
                            <div class="profile-img-edit">
                              <b-img :src="vendor.logo" class="profile-pic height-150 width-150" alt="profile-pic"/>
                              <input type="hidden" v-model="vendor.logo">
                              <div class="p-image">
                                <div class="position-relative">
                                  <i class="ri-pencil-line upload-button"></i>
                                  <b-form-file class="h-100 position-absolute" accept="image/*" style="opacity: 0;" @change="prevImageLogo"></b-form-file>
                                </div>
                              </div>
                            </div>
                          </b-col>
                        </b-form-group>
                      </b-form>
                    </template>
                  </iq-card>
                </tab-content-item> -->
                <!-- <tab-content-item :active="false" id="banner">
                  <iq-card>
                    <template v-slot:headerTitle>
                      <h4 class="card-title">Banner</h4>
                    </template>
                    <template v-slot:body>
                      <b-form>
                        <b-form-group>
                          <div class="add-img-user">
                            <b-img :src="vendor.banner" fluid alt="profile-picss" width="500" />
                            <input type="hidden" v-model="vendor.banner">
                            <div class="p-image">
                              <b-button variant="none" class="upload-button iq-bg-primary position-relative">
                                <input type="file" @change="prevImageBanner" class="h-100 position-absolute" accept="image/*" style="opacity: 0;" />
                                File Upload
                              </b-button>
                            </div>
                          </div>
                          <div class="img-extension mt-3">
                            <div class="d-inline-block align-items-center">
                              <span>Only</span>
                              <b-link href="javascript:void();">.jpg</b-link>
                              <b-link href="javascript:void();">.png</b-link>
                              <b-link href="javascript:void();">.jpeg</b-link>
                              <span>allowed</span>
                            </div>
                          </div>
                        </b-form-group>
                      </b-form>
                    </template>
                  </iq-card>
                </tab-content-item> -->
              </tab-content>
            </div>
          </b-col>
          <b-col lg="12">
              <template>
                <div class="iq-edit-list">
                    <b-button variant="primary" type="submit" class="mb-3 float-right mr-1 btn-lg w-25"><i class="ri-bill-fill"></i>Ubah Data Vendor</b-button>
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
import { mapActions } from 'vuex'

export default {
  name: 'VendorAdd',
  mounted () {
    core.index()
    this.getDataVendor()
  },
  firestore () {
    return {
    }
  },
  computed: {
  },
  data () {
    return {
      vendor: {
        address_lat: '',
        address_long: '',
        alamat: '',
        banner: '/img/user-11.889f2489.png',
        contact_person: '',
        email: '',
        kode_pos: '',
        kota: '',
        logo: '/img/user-11.889f2489.png',
        master_type_id: 9,
        npwp_vendor: '',
        phone: '',
        provinsi: '',
        vendor_name: '',
        website: ''
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
    ...mapActions({
      storeUserData: 'Setting/authUserAction'
    }),

    getDataVendor () {
      API.vendor
        .getDetailVendor(this.$route.params.id).then(response => {
          this.vendor = response.data.result
        })
    },

    onSubmit () {
      this.editVendorData()
    },
    prevImageLogo: function (event) {
      const input = event.target

      if (input.files && input.files[0]) {
        const reader = new FileReader()

        reader.onload = (e) => {
          this.vendor.logo = e.target.result
        }

        reader.readAsDataURL(input.files[0])
      }
    },
    prevImageBanner: function (event) {
      const input = event.target

      if (input.files && input.files[0]) {
        const reader = new FileReader()

        reader.onload = (e) => {
          this.vendor.banner = e.target.result
        }

        reader.readAsDataURL(input.files[0])
      }
    },
    editVendorData () {
      this.vendor.address_lat = parseFloat(this.vendor.address_lat)
      this.vendor.address_long = parseFloat(this.vendor.address_long)
      API.vendor
        .editVendor(this.$route.params.id, this.vendor).then(response => {
          if (response.status === 200) {
            core.showSnackbar('success', 'Ubah data vendor berhasil.')
            this.$router.replace('/vendor')
          } else if (response.data.errors.length > 0) {
            this.$refs.form.setErrors(response.data.errors)
            core.showSnackbar('error', 'Terjadi kesalahan pada sistem.')
          }
        }).finally(() => { this.loading = false })
    }
  }
}
</script>
