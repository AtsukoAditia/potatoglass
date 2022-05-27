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
                    <b-form-group class="col-md-12" label="* Nama Vendor" label-for="nperusahaan">
                      <ValidationProvider name="Nama Vendor" rules="required" v-slot="{ errors }">
                        <b-form-input v-model="vendor.perusahaan" type="text" placeholder="Nama Vendor"
                          :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="* Contact Person 1" label-for="cvendor">
                      <ValidationProvider name="Contact Person Vendor" rules="required" v-slot="{ errors }">
                        <b-form-input v-model="vendor.cp1" type="tel" :formatter="formatPhone" placeholder="Contact Person Vendor"
                          :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="Contact Person 2" label-for="cvendor">
                        <b-form-input v-model="vendor.cp2" type="tel" :formatter="formatPhone" placeholder="Contact Person Vendor"></b-form-input>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="Telpon Vendor" label-for="tvendor">
                      <ValidationProvider name="Telpon Vendor" rules="required" v-slot="{ errors }">
                        <b-form-input v-model="vendor.telp" type="tel" :formatter="formatPhone" placeholder="Telpon Vendor"
                          :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="* Email Vendor" label-for="evendor">
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
                    <b-form-group class="col-md-6" label="* Jenis Material yang akan Dipasarkan" label-for="jenmater">
                      <ValidationProvider name="Jenis Material" rules="required" v-slot="{ errors }">
                        <multiselect v-model="bahanMaster" :options="getBahan.map(x => x.bahan_id)" :custom-label="opt => getBahan.find(x => x.bahan_id == opt).name_category" placeholder="Bisa pilih lebih dari satu..." label="name_category" :multiple="true" :close-on-select="false" :preserve-search="true" open-direction="bottom" :class="(errors.length > 0 ? ' is-invalid' : '')"></multiselect>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="NPWP Vendor (16 Digit)" label-for="npwpvendor">
                      <span class="text-danger" v-if="npwpDigit == true">NPWP kurang dari 16 digit.</span>
                        <b-form-input v-model="vendor.npwp" :formatter="formatNPWP" @input="inputNPWP" type="number" placeholder="NPWP Vendor"></b-form-input>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="Upload Foto NPWP" label-for="fotonpwp" description="Foto NPWP digunakan untuk keamanan transaksi dan menambah point score verifikasi toko">
                      <b-alert variant="success" show v-if="fotonpwp != null">Foto NPWP sudah terkirim</b-alert>
                      <b-form-file id="fotonpwp" accept=".jpg, .png, .jpeg" v-model="vendor.file_npwp" placeholder="Pilih dokumen foto NPWP anda"></b-form-file>
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
                    <b-form-group class="col-md-12" label="* Alamat Vendor" label-for="alvendor">
                      <ValidationProvider name="Alamat Vendor" rules="required" v-slot="{ errors }">
                        <b-form-input v-model="vendor.alamat" type="text" placeholder="Alamat Vendor"
                          :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-col md="12" class="mb-3">
                      <b-row>
                        <b-col md="12">
                          <label class="">Lokasi Peta</label>
                        </b-col>
                        <b-col md="8" class="mb-3">
                          <div>
                            <GmapAutocomplete
                              @place_changed='setPlace'
                              class="form-control"
                              placeholder="Cari lokasi anda disini"
                            />
                            <!-- <div id="forSearch"> -->
                              <!-- <input type="text" autocomplete="false" class="form-control" id="forSearchField"> -->
                            <!-- </div> -->
                          </div>
                        </b-col>
                        <b-col md="4" class="mb-3">
                            <b-button variant="info" class="float-right" size="lg" @click="geolocate">Deteksi Lokasi</b-button>
                        </b-col>
                        <b-col md="12">
                          <div class="w-100 d-flex">
                            <!-- <GmapMap :center="center" :zoom="18" map-style-id="roadmap" :options="mapOptions"
                            style="width: 100vmax; height: 35vmin" ref="mapRef" @click="handleMapClick">
                              <GmapMarker :position="marker.position" :clickable="true" :draggable="true"
                                @drag="handleMarkerDrag" @click="panToMarker" />
                            </GmapMap> -->
                            <div id="mapContainer"></div>
                            <!-- <mgl-map :accessToken="accessToken" :mapStyle="mapStyle">
                              <mgl-geocoder-control
                                  :accessToken="accessToken"
                                  :input.sync="defaultInput"
                                  @results="handleSearch">
                                </mgl-geocoder-control>
                            </mgl-map> -->
                          </div>
                        </b-col>
                      </b-row>
                    </b-col>

                    <!-- <b-form-group class="col-md-6" label="Latitude" label-for="lat">
                      <ValidationProvider name="lat" rules="required" v-slot="{ errors }"> -->
                        <input readonly v-model="vendor.address_lat" type="hidden" placeholder="-">
                        <!-- <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group> -->
                    <!-- <b-form-group class="col-md-6" label="Longitude" label-for="lng">
                      <ValidationProvider name="Longitude" rules="required" v-slot="{ errors }"> -->
                        <input readonly v-model="vendor.address_long" type="hidden" placeholder="-">
                        <!-- <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group> -->
                  </b-row>
                </template>
              </iq-card>
          </b-col>
          <b-col lg="12">
            <template>
              <div class="iq-edit-list">
                <b-button variant="primary" ref="submitForm" type="submit" class="mb-3 mr-1 btn-lg float-right"><i
                    class="ri-bill-fill"></i>Simpan Data Saya</b-button>
              </div>
            </template>
          </b-col>
          <b-col md="12">
            <iq-card>
                <template v-slot:headerTitle>
                  <h4 class="card-title mt-2">Dokumen diperlukan untuk melakukan transaksi</h4>
                  <span class="text-muted">Lengkapi data untuk menambahkan point verifikasi, Ukuran file foto: Maksimum 2MB. Ekstensi file yang diperbolehkan: JPG, JPEG, PNG</span>
                </template>
                <template v-slot:body>
                  <b-row align-v="center">
                    <b-col md="12">
                      <b-form-group label="Link Video Toko :" label-for="link-yt">
                        <b-input-group>
                        <template #prepend>
                          <b-input-group-text><i class="ri-link"></i></b-input-group-text>
                        </template>
                        <b-form-input @keyup="checkYoutube" v-model="vendor.link_youtube" id="link-yt" type="text" class="disvol1" placeholder="https://www.youtube.com/watch?v=GaHlJFGUoT8" v-bind:class="[isActive ? linkError : '', linkActive]"></b-form-input>
                        </b-input-group>
                        <small class="form-text text-muted d-block">Disarankan link youtube. Kesulitan untuk upload video di Youtube? <a class="font-weight" target="_blank" href="https://api.whatsapp.com/send?phone=6282139697776&text=Halo%20admin%20Proyekita.id%2C%20saya%20mau%20minta%20bantuan%20untuk%20video%20toko%20saya.%20Terimakasih.">Klik disini untuk bantuan</a></small>
                      </b-form-group>
                    </b-col>
                    <b-col md="4">
                      <b-form-group label-for="foto_ktp" label="Upload foto KTP">
                        <div class="text-center">
                          <b-img v-if="fotoktp !== null" :src="fotoktp" fluid class="mb-1 w-100 border" style="max-width:200px;height:150px;object-fit:contain;" @error="imgError"></b-img>
                        </div>
                        <!-- <ValidationProvider name="Foto KTP" rules="required" v-slot="{ errors }"> -->
                        <b-form-file accept=".jpg, .png, .jpeg" placeholder="Pilih dokumen foto KTP anda" id="foto_ktp" @change="previewKTP"
                          v-model="vendor.identitas"></b-form-file>
                          <!-- <div class="invalid-feedback">
                            <span>{{ errors[0] }}</span>
                          </div>
                        </ValidationProvider> -->
                      </b-form-group>
                    </b-col>
                    <b-col md="4">
                      <b-form-group label-for="foto_selfi" label="Upload foto diri dengan KTP">
                        <div class="text-center">
                          <b-img v-if="fotoselfie !== null" :src="fotoselfie" fluid class="mb-1 w-100 border" style="max-width:200px;height:150px;object-fit:contain;" @error="imgError"></b-img>
                        </div>
                      <!-- <ValidationProvider name="Foto Toko" rules="required" v-slot="{ errors }"> -->
                        <b-form-file accept=".jpg, .png, .jpeg" placeholder="Pilih dokumen foto diri dengan KTP anda" id="foto_selfi" @change="previewSelfie"
                          v-model="vendor.selfie_ktp"></b-form-file>
                          <!-- <div class="invalid-feedback">
                            <span>{{ errors[0] }}</span>
                          </div>
                        </ValidationProvider> -->
                      </b-form-group>
                    </b-col>
                    <b-col md="4">
                      <b-form-group label-for="foto_toko" label="Upload Foto Toko">
                        <div class="text-center">
                          <b-img v-if="fototoko !== null" :src="fototoko" fluid class="mb-1 w-100 border" style="max-width:200px;height:150px;object-fit:contain;" @error="imgError"></b-img>
                        </div>
                      <!-- <ValidationProvider name="Foto Toko" rules="required" v-slot="{ errors }"> -->
                        <b-form-file accept=".jpg, .png, .jpeg" placeholder="Pilih dokumen foto toko anda" id="foto_toko" @change="previewToko"
                          v-model="vendor.photo_toko"></b-form-file>
                          <!-- <div class="invalid-feedback">
                            <span>{{ errors[0] }}</span>
                          </div>
                        </ValidationProvider> -->
                      </b-form-group>
                    </b-col>
                  </b-row>
                </template>
            </iq-card>
          </b-col>
          <b-col lg="12">
            <template>
              <div class="iq-edit-list">
                <b-button variant="primary" ref="submitForm" type="submit" class="mb-3 mr-1 btn-lg float-right"><i
                    class="ri-bill-fill"></i>Simpan Data Dokumen</b-button>
              </div>
            </template>
          </b-col>
        </b-row>
      </form>
    </ValidationObserver>

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
import {
  core, brokenImage
} from '../../../config/pluginInit'
import API from '@/services/admin'
import APIs from '@/services/vendor/profile'
// import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'
import constant from '@/config/constant'
import L from 'leaflet'
import 'leaflet-geosearch/assets/css/leaflet.css'

// import { MglMap } from 'vue-mapbox'
// import Mapbox from 'mapbox-gl'
// import MglGeocoderControl from 'vue-mapbox-geocoder'

import {
  mapGetters,
  mapActions
} from 'vuex'

var mapDiv

export default {
  name: 'EditDataProfile',
  // components: { MglMap, MglGeocoderControl },
  mounted () {
    core.index()

    mapDiv = L.map('mapContainer')

    this.getMasterBahan()
    this.getProvinsi()
    this.setupLeafletMap()
  },
  firestore () {
    return {}
  },
  computed: {
    ...mapGetters({
      dataUser: 'Setting/dataUserState'
    })
  },
  data () {
    return {
      constant: constant,
      vendor: {
        address_lat: '',
        address_long: '',
        alamat: '',
        banner: '/img/user-11.889f2489.png',
        cp1: '',
        cp2: '',
        email: '',
        postal: '',
        kota: '',
        logo: '/img/user-11.889f2489.png',
        master_type_id: '',
        npwp: '',
        telp: '',
        provinsi: '',
        kecamatan: '',
        kelurahan: '',
        perusahaan: '',
        url: '',
        file_npwp: [],
        selfie_ktp: [],
        link_youtube: '',
        // sumber_info: '',
        // jenis_material: '',
        identitas: [],
        photo_toko: []
      },
      npwpDigit: false,
      fotoktp: '',
      fotoselfie: '',
      fototoko: '',
      fotonpwp: '',
      marker: {
        position: {
          lat: 10,
          lng: 10
        }
      },
      center: {
        lat: -6.200000,
        lng: 106.816666
      },
      currentPlace: null,
      mapOptions: {
        disableDefaultUI: true,
        fullscreenControl: true,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        disableDefaultUi: false
      },
      getProv: [],
      getKab: [],
      getKec: [],
      getKel: [],
      bahanMaster: '',
      getBahan: [],
      places: '',
      vendorID: '',
      confirmPassTxt: '',
      isActive: false,
      linkActive: 'done-link',
      linkError: 'error-link',
      accessToken: 'pk.eyJ1IjoiYm9tYWRldiIsImEiOiJja3d1amJqMDExcXphMzFueXRxeWQ1YWdmIn0.20Zz54kSijIKBq_hmtkp7Q',
      mapStyle: 'mapbox://styles/bomadev/ckwujekgn51kk14mns0xi33p6',
      defaultInput: 'Jakarta',
      checkMarker: ''
    }
  },
  created () {
    // this.mapbox = Mapbox
  },
  methods: {
    ...mapActions({
      storeUserData: 'authModule/authUserAction'
    }),
    ...mapGetters({
      userData: 'authModule/getUserData'
    }),

    getDataProfile () {
      const datU = this.userData()
      this.vendorID = datU.user.id
      APIs.profile
        .profileDetailPHP(datU.user.id).then(response => {
          var dt = response.data.data[0]
          const ktp = dt.identitas
          const toko = dt.photo_toko
          const selfie = dt.selfie_ktp
          const npwp = dt.file_npwp
          if (response.status === 200) {
            this.vendor.perusahaan = dt.name_vendor
            this.vendor.cp1 = dt.cp1
            this.vendor.cp2 = dt.cp2
            this.vendor.telp = dt.phone
            this.vendor.email = dt.email
            this.vendor.url = dt.website
            this.vendor.npwp = dt.npwp_vendor
            this.vendor.postal = dt.kode_pos
            this.vendor.npwp = dt.npwp_vendor
            this.vendor.alamat = dt.alamat
            this.vendor.address_lat = dt.address_lat
            this.vendor.address_long = dt.address_long
            if (dt.address_lat !== '' || dt.address_lat !== null) {
              if (this.checkMarker) {
                mapDiv.removeLayer(this.checkMarker)
              }
              const mapss = {
                coords: {
                  latitude: dt.address_lat,
                  longitude: dt.address_long
                }
              }
              this.pointingMap(mapss)
            } else {
              this.geolocate()
            }
            this.center.lat = dt.address_lat
            this.center.lng = dt.address_long
            this.vendor.identitas = ktp
            this.vendor.photo_toko = toko
            this.vendor.link_youtube = dt.link_youtube
            this.fotoktp = constant.urlAssetsPHP + 'vendor/' + this.vendorID + '/identitas/' + ktp
            this.fototoko = constant.urlAssetsPHP + 'vendor/' + this.vendorID + '/photo_toko/' + toko
            this.fotoselfie = constant.urlAssetsPHP + 'vendor/' + this.vendorID + '/selfie_ktp/' + selfie
            this.fotonpwp = npwp

            const ssa = JSON.parse(dt.bahan)
            const aaa = ssa.map(Number)
            this.bahanMaster = aaa
            // this.vendor.sumber_info = dt.sumber_info
          }
        })
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
    getKota (id) {
      API.address
        .getAddress('kab', id).then(response => {
          var dt = response.data
          if (response.status === 200) {
            this.getKab = dt.data
          }
        })
    },
    getKecamatan (id) {
      API.address
        .getAddress('kec', id).then(response => {
          var dt = response.data
          if (response.status === 200) {
            this.getKec = dt.data
          }
        })
    },
    getKelurahan (id) {
      API.address
        .getAddress('kel', id).then(response => {
          var dt = response.data
          if (response.status === 200) {
            this.getKel = dt.data
          }
        })
    },

    onSubmit () {
      // this.$root.$emit('bv::show::modal', 'confirmPass', '#submitForm')
      this.addVendorData()
    },
    submitPass () {
      // if (this.confirmPassTxt !== '12345') {
      //   alert('Password salah...')
      // } else {
      this.addVendorData()
      // }
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
      const datU = this.userData()
      var fd = new FormData()
      fd.append('address_lat', this.vendor.address_lat)
      fd.append('address_long', this.vendor.address_long)
      fd.append('alamat', this.vendor.alamat)
      fd.append('cp1', this.vendor.cp1)
      fd.append('cp2', this.vendor.cp2)
      fd.append('email', this.vendor.email)
      fd.append('provinsi', this.vendor.provinsi)
      fd.append('kota', this.vendor.kota)
      fd.append('kecamatan', this.vendor.kecamatan)
      fd.append('kelurahan', this.vendor.kelurahan)
      fd.append('postal', this.vendor.postal)
      fd.append('npwp_vendor', this.vendor.npwp)
      fd.append('telp', this.vendor.telp)
      fd.append('perusahaan', this.vendor.perusahaan)
      fd.append('url', this.vendor.url)
      fd.append('link_youtube', this.vendor.link_youtube)
      // fd.append('sumber_info', this.vendor.sumber_info)
      fd.append('bahan', JSON.stringify(this.bahanMaster))
      if (this.vendor.identitas != null || this.vendor.photo_toko != null || this.vendor.file_npwp != null || this.vendor.selfie_ktp != null) {
        fd.append('identitas', this.vendor.identitas)
        fd.append('photo_toko', this.vendor.photo_toko)
        fd.append('file_npwp', this.vendor.file_npwp)
        fd.append('selfie_ktp', this.vendor.selfie_ktp)
      }

      core.custLoader(true)
      if (datU.verified === false) {
        API.vendor
          .editVendorPHP(fd).then(response => {
            if (response.status === 200) {
              const localUser = this.userData()
              const dataVerified = {
                verified: false,
                auth: true,
                authType: 'passport',
                user: localUser.user
              }
              this.storeUserData(dataVerified)
              core.showSnackbar('success', 'Data vendor telah di ubah, harap menunggu konfirmasi Admin.')
              // this.$router.push({
              //   name: 'dashboard.vdashboard'
              // })
            } else if (response.data.errors.length > 0) {
              this.$refs.form.setErrors(response.data.errors)
              core.showSnackbar('error', 'Terjadi kesalahan pada sistem.')
            }
          }).finally(() => {
            core.custLoader(false)
          })
      } else {
        API.vendor
          .editVendorPHP(fd).then(response => {
            if (response.status === 200) {
              const localUser = this.userData()
              const dataVerified = {
                verified: true,
                auth: true,
                authType: 'passport',
                user: localUser.user
              }
              this.storeUserData(dataVerified)
              core.showSnackbar('success', 'Data vendor telah di tambahkan.')
              // this.$router.push({
              //   name: 'dashboard.vdashboard'
              // })
            } else if (response.data.errors.length > 0) {
              this.$refs.form.setErrors(response.data.errors)
              core.showSnackbar('error', 'Terjadi kesalahan pada sistem.')
            }
          }).finally(() => {
            core.custLoader(false)
          })
      }
    },

    getMasterBahan () {
      core.custLoader(true)
      APIs.getBahanPHP()
        .then(response => {
          const dt = response.data
          if (response.status) {
            this.getBahan = dt.data
          }
        }).catch(() => {
          core.showSnackbar('error', 'Maaf, terjadi kesalahan.')
        }).finally(() => {
          this.getDataProfile()
          core.custLoader(false)
        })
    },

    geolocate () {
      if (this.checkMarker) {
        mapDiv.removeLayer(this.checkMarker)
      }
      navigator.geolocation.getCurrentPosition((position) => {
        this.marker.position = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        this.center.lat = position.coords.latitude
        this.center.lng = position.coords.longitude
        this.vendor.address_lat = position.coords.latitude
        this.vendor.address_long = position.coords.longitude

        this.setupLeafletMap(position)
      })
    },

    pointingMap (e) {
      this.marker.position = {
        lat: e.coords.latitude,
        lng: e.coords.longitude
      }
      this.center.lat = e.coords.latitude
      this.center.lng = e.coords.longitude

      this.setupLeafletMap(e)
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

    setPlace (place) {
      this.currentPlace = place
      const marker = {
        lat: this.currentPlace.geometry.location.lat(),
        lng: this.currentPlace.geometry.location.lng()
      }
      this.center = marker
      this.marker.position = {
        lat: marker.lat,
        lng: marker.lng
      }
      this.vendor.address_lat = marker.lat
      this.vendor.address_long = marker.lng
      const dtMarker = {
        coords: {
          latitude: marker.lat,
          longitude: marker.lng
        }
      }
      this.setupLeafletMap(dtMarker)
    },

    checkYoutube () {
      if (this.ytVidId(this.vendor.link_youtube) !== false) {
        this.isActive = false
      } else {
        this.isActive = true
      }
    },

    handleMapClick (e) {
      this.marker.position = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      }
      this.vendor.address_lat = e.latLng.lat()
      this.vendor.address_long = e.latLng.lng()
    },

    setupLeafletMap: function (e) {
      if (e != null) {
        mapDiv.on('locationfound', this.setMarker(e))
        mapDiv.setView(this.center, 17)
      } else {
        mapDiv.setView(this.center, 13)
      }
      L.tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapDiv)
      mapDiv.on('click', (cl) => {
        if (this.checkMarker) {
          mapDiv.removeLayer(this.checkMarker)
        }
        this.vendor.address_lat = cl.latlng.lat
        this.vendor.address_long = cl.latlng.lng
        const marker = {
          coords: {
            latitude: cl.latlng.lat,
            longitude: cl.latlng.lng
          }
        }
        this.setMarker(marker)
      })
    },
    setMarker: function (e) {
      const markerIco = L.icon({
        iconUrl: 'https://icon-library.com/images/android-marker-icon/android-marker-icon-8.jpg',
        iconSize: [30, 30]
      })
      this.checkMarker = L.marker([e.coords.latitude, e.coords.longitude], { icon: markerIco }).addTo(mapDiv)
    },

    ytVidId (url) {
      var p = /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?(?=.*v=((\w|-){11}))(?:\S+)?$/
      return (url.match(p)) ? RegExp.$1 : false
    },

    previewKTP: function (event) {
      const input = event.target

      if (input.files && input.files[0]) {
        const reader = new FileReader()

        reader.onload = (e) => {
          this.fotoktp = e.target.result
        }

        reader.readAsDataURL(input.files[0])

        this.file = input.files[0]
      }
    },

    previewSelfie: function (event) {
      const input = event.target

      if (input.files && input.files[0]) {
        const reader = new FileReader()

        reader.onload = (e) => {
          this.fotoselfie = e.target.result
        }

        reader.readAsDataURL(input.files[0])

        this.file = input.files[0]
      }
    },

    previewToko: function (event) {
      const input = event.target

      if (input.files && input.files[0]) {
        const reader = new FileReader()

        reader.onload = (e) => {
          this.fototoko = e.target.result
        }

        reader.readAsDataURL(input.files[0])

        this.file = input.files[0]
      }
    },

    formatPhone (e) {
      return String(e).substring(0, 13)
    },

    formatNPWP (e) {
      return String(e).substring(0, 16)
    },
    inputNPWP (e) {
      if (String(e).length < 16) {
        this.npwpDigit = true
      } else {
        this.npwpDigit = false
      }
    },

    handleSearch (event) {
      // console.log(event)
    },
    imgError (e) {
      e.target.src = brokenImage
    }
  }
}

</script>

<style lang="less">
#hargasebelum, #hargasekarang, .disvol1 {
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
  border: 1px solid #e9edf4;
}
.error-link {
  border-color: var(--danger) !important;
}
#mapContainer {
 width: 100vw;
 height: 50vh;
 z-index: 1;
}
.geosearch {
  position: absolute;
  left: 300%;
}
.mgl-map-wrapper .mapboxgl-map {
  position: relative !important;
}
</style>
