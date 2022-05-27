<template>
  <b-container fluid>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(onSubmit)">
        <b-row>
          <b-col md="6">
              <iq-card>
                <template v-slot:headerTitle>
                  <h4 class="card-title">Info Perusahaan</h4>
                </template>
                <template v-slot:body>
                  <b-row align-v="center">
                    <b-form-group class="col-md-12" label="Nama Vendor" label-for="nperusahaan">
                      <ValidationProvider name="Nama Vendor" rules="required" v-slot="{ errors }">
                        <b-form-input v-model="vendor.perusahaan" type="text" placeholder="Nama Vendor"
                          :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="Contact Person 1" label-for="cvendor">
                      <ValidationProvider name="Contact Person Vendor" rules="required" v-slot="{ errors }">
                        <b-form-input v-model="vendor.cp1" type="text" placeholder="Contact Person Vendor"
                          :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="Contact Person 2" label-for="cvendor">
                        <b-form-input v-model="vendor.cp2" type="text" placeholder="Contact Person Vendor"></b-form-input>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="Telpon Vendor" label-for="tvendor">
                      <ValidationProvider name="Telpon Vendor" rules="required" v-slot="{ errors }">
                        <b-form-input v-model="vendor.telp" type="tel" placeholder="Telpon Vendor"
                          :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="Email Vendor" label-for="evendor">
                      <ValidationProvider name="Email Vendor" rules="required" v-slot="{ errors }">
                        <b-form-input v-model="vendor.email" type="email" placeholder="Email Vendor"
                          :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="Website Vendor" label-for="wvendor">
                        <b-form-input v-model="vendor.url" type="text" placeholder="Website Vendor"></b-form-input>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="NPWP Vendor" label-for="npwpvendor">
                      <ValidationProvider name="NPWP Vendor" rules="required" v-slot="{ errors }">
                        <b-form-input v-model="vendor.npwp" type="number" placeholder="NPWP Vendor"
                          :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="Sumber Informasi" label-for="wvendor">
                        <b-form-input v-model="vendor.sumber_info" type="text" placeholder="Sumber Informasi"></b-form-input>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="Jenis Material" label-for="jenmater">
                      <ValidationProvider name="Jenis Material" rules="required" v-slot="{ errors }">
                        <b-form-input v-model="vendor.jenis_material" type="text" placeholder="Jenis Material"
                          :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                  </b-row>
                </template>
              </iq-card>
          </b-col>
          <b-col md="6">
              <iq-card>
                <template v-slot:headerTitle>
                  <h4 class="card-title">Lokasi Vendor</h4>
                </template>
                <template v-slot:body>
                  <b-row align-v="center">
                    <b-form-group class="col-md-12" label="Alamat Vendor" label-for="alvendor">
                      <ValidationProvider name="Alamat Vendor" rules="required" v-slot="{ errors }">
                        <b-form-input v-model="vendor.alamat" type="text" placeholder="Alamat Vendor"
                          :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="Provinsi" label-for="provbagvendor">
                      <ValidationProvider name="Provinsi" rules="required" v-slot="{ errors }">
                          <multiselect id="provbagvendor" v-model="vendor.provinsi" :options="getProv" track-by="nama" label="nama" :class="(errors.length > 0 ? ' is-invalid' : '')" @select="getKota"></multiselect>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group v-if="vendor.provinsi != null" class="col-md-6" label="Kota" label-for="kotbagvendor">
                      <ValidationProvider name="Kota" rules="required" v-slot="{ errors }">
                          <multiselect id="kotbagvendor" v-model="vendor.kota" :options="getKab" track-by="nama" label="nama" :class="(errors.length > 0 ? ' is-invalid' : '')" @select="getKecamatan"></multiselect>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group v-if="vendor.kota != null" class="col-md-4" label="Kecamatan" label-for="kecbagvendor">
                      <ValidationProvider name="Kecamatan" rules="required" v-slot="{ errors }">
                          <multiselect id="kecbagvendor" v-model="vendor.kecamatan" :options="getKec" track-by="nama" label="nama" :class="(errors.length > 0 ? ' is-invalid' : '')" @select="getKelurahan"></multiselect>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group v-if="vendor.kecamatan != null" class="col-md-4" label="Kelurahan" label-for="kelbagvendor">
                      <ValidationProvider name="Kelurahan" rules="required" v-slot="{ errors }">
                          <multiselect id="kelbagvendor" v-model="vendor.kelurahan" :options="getKel" track-by="nama" label="nama"></multiselect>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-4" label="Kode Pos" label-for="kodpvendor">
                      <ValidationProvider name="Kode Pos" rules="required" v-slot="{ errors }">
                        <b-form-input v-model="vendor.postal" type="number" placeholder="Kode Pos"
                          :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="Latitude" label-for="lat">
                      <ValidationProvider name="lat" rules="required" v-slot="{ errors }">
                        <b-form-input v-model="vendor.address_lat" type="text" placeholder="-"
                          :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="Longitude" label-for="lng">
                      <ValidationProvider name="Longitude" rules="required" v-slot="{ errors }">
                        <b-form-input v-model="vendor.address_long" type="text" placeholder="-"
                          :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-col md="12">
                      <b-button variant="info" class="float-right" size="sm" @click="geolocate">Deteksi Lokasi</b-button>
                      <div class="w-100 d-flex">
                        <GmapMap :center="center" :zoom="18" map-style-id="roadmap" :options="mapOptions"
                        style="width: 100vmax; height: 35vmin" ref="mapRef" @click="handleMapClick">
                          <GmapMarker :position="marker.position" :clickable="true" :draggable="true"
                            @drag="handleMarkerDrag" @click="panToMarker" />
                        </GmapMap>
                      </div>
                    </b-col>
                  </b-row>
                </template>
              </iq-card>
          </b-col>
          <b-col lg="12">
            <template>
              <div class="iq-edit-list">
                <b-button variant="primary" type="submit" class="mb-3 mr-1 btn-lg float-right"><i
                    class="ri-bill-fill"></i>Tambahkan Vendor</b-button>
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
    this.geolocate()
    this.getProvinsi()
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
        cp1: '',
        cp2: '',
        email: '',
        postal: '',
        kota: null,
        logo: '/img/user-11.889f2489.png',
        master_type_id: '',
        npwp: '',
        telp: '',
        provinsi: null,
        kecamatan: null,
        kelurahan: null,
        perusahaan: '',
        url: '',
        sumber_info: '',
        jenis_material: '',
        password: '12345678'
      },
      marker: {
        position: {
          lat: 10,
          lng: 10
        }
      },
      center: {
        lat: 10,
        lng: 10
      },
      mapOptions: {
        disableDefaultUI: true
      },
      getProv: [],
      getKab: [],
      getKec: [],
      getKel: []
    }
  },
  methods: {
    ...mapActions({
      storeUserData: 'Setting/authUserAction'
    }),

    onSubmit () {
      this.addVendorData()
    },

    getProvinsi () {
      API.address
        .getAddress('prov', 'no').then(response => {
          var dt = response.data
          if (response.status === 200) {
            this.getProv = dt.data
          }
        })
    },
    getKota (dt) {
      API.address
        .getAddress('kab', dt.id_prov).then(response => {
          var dt = response.data
          if (response.status === 200) {
            this.getKab = dt.data
          }
        })
    },
    getKecamatan (dt) {
      API.address
        .getAddress('kec', dt.id_kab).then(response => {
          var dt = response.data
          if (response.status === 200) {
            this.getKec = dt.data
          }
        })
    },
    getKelurahan (dt) {
      API.address
        .getAddress('kel', dt.id_kec).then(response => {
          var dt = response.data
          if (response.status === 200) {
            this.getKel = dt.data
          }
        })
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
    addVendorData () {
      this.vendor.address_lat = parseFloat(this.vendor.address_lat)
      this.vendor.address_long = parseFloat(this.vendor.address_long)
      var fd = new FormData()
      fd.append('address_lat', this.vendor.address_lat)
      fd.append('address_long', this.vendor.address_long)
      fd.append('alamat', this.vendor.alamat)
      fd.append('cp1', this.vendor.cp1)
      fd.append('cp2', this.vendor.cp2)
      fd.append('email', this.vendor.email)
      fd.append('provinsi', JSON.stringify(this.vendor.provinsi))
      fd.append('kota', JSON.stringify(this.vendor.kota))
      fd.append('kecamatan', JSON.stringify(this.vendor.kecamatan))
      fd.append('kelurahan', JSON.stringify(this.vendor.kelurahan))
      fd.append('kode_pos', this.vendor.postal)
      fd.append('npwp_vendor', this.vendor.npwp)
      fd.append('telp', this.vendor.telp)
      fd.append('perusahaan', this.vendor.perusahaan)
      fd.append('url', this.vendor.url)
      fd.append('sumber_info', this.vendor.sumber_info)
      fd.append('jenis_material', this.vendor.jenis_material)
      fd.append('identitas', this.vendor.identitas)
      fd.append('photo_toko', this.vendor.photo_toko)

      API.vendor
        .addVendorPHP(fd).then(response => {
          if (response.status === 200) {
            core.showSnackbar('success', 'Data vendor telah di tambahkan.')
            this.$router.push({
              name: 'vendor.vendor'
            })
          } else if (response.data.errors.length > 0) {
            this.$refs.form.setErrors(response.data.errors)
            core.showSnackbar('error', 'Terjadi kesalahan pada sistem.')
          }
        }).catch(() => {
          core.showSnackbar('error', 'Maaf, terjadi kesalahan. Pada Sistem')
          // setTimeout(function () { window.location.reload() }, 2000)
        }).finally(() => {
          core.custLoader(false)
        })
    },

    geolocate () {
      navigator.geolocation.getCurrentPosition((position) => {
        this.marker.position = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        this.vendor.address_lat = position.coords.latitude
        this.vendor.address_long = position.coords.longitude

        this.panToMarker()
      })
    },

    handleMarkerDrag (e) {
      this.marker.position = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      }
      this.vendor.address_lat = e.latLng.lat()
      this.vendor.address_long = e.latLng.lng()
    },

    panToMarker () {
      this.$refs.mapRef.panTo(this.marker.position)
      // this.$refs.mapRef.setZoom(18)
    },

    handleMapClick (e) {
      this.marker.position = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      }
      this.vendor.address_lat = e.latLng.lat()
      this.vendor.address_long = e.latLng.lng()
      // console.log(e)
    }
  }
}
</script>
