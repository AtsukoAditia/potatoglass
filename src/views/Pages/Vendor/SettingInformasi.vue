<template>
  <b-container fluid>
    <b-row>
      <b-col md="12">
        <iq-card>
          <template v-slot:body>
            <ul class="nav nav-pills nav-fill mb-3">
              <li class="nav-item">
                <a class="nav-link active" href="#">Informasi</a>
              </li>
              <li class="nav-item">
                <router-link to="/setting/penjualan" class="nav-link iq-waves-effect pr-4">
                  Penjualan
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/setting/etalase" class="nav-link iq-waves-effect pr-4">
                  Etalase
                </router-link>
              </li>
              <!-- <li class="nav-item">
                <router-link to="/setting/pengiriman" class="nav-link iq-waves-effect pr-4">
                  Pengiriman
                </router-link>
              </li> -->
              <li class="nav-item">
                <router-link to="/setting/promo-voucher" class="nav-link iq-waves-effect pr-4">
                  Promo &amp; Voucher
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/setting/template-chat" class="nav-link iq-waves-effect pr-4">
                  Pesan
                </router-link>
              </li>
            </ul>
            <iq-card>
                <template v-slot:headerTitle>
                    <h4 class="card-title ">Informasi Toko</h4>
                </template>
                <template v-slot:body>
                    <b-row>
                        <b-col md="6">
                            <b-form-group label="Nama Toko :" label-for="nama_toko">
                                <b-form-input id="nama_toko" v-model="namatoko" type="text"></b-form-input>
                            </b-form-group>
                            <b-form-group label="Slogan :" label-for="slogan_toko">
                                <b-form-input id="slogan_toko" v-model="slogan" type="text"></b-form-input>
                            </b-form-group>
                            <b-form-group label="Deskripsi Toko :" label-for="desc_vendor">
                                <ckeditor editorUrl="https://cdnjs.cloudflare.com/ajax/libs/ckeditor/4.17.1/ckeditor.js" v-model="deskripsi" rows="5" cols="70" id="ckfill" name="ckfill" :config="editorConfig"></ckeditor>
                            </b-form-group>
                        </b-col>
                        <b-col md="6">
                            <label class="d-block">Foto Profil</label>
                            <b-row>
                                <b-col md="4">
                                    <div class="profile-img-edit">
                                        <b-img :src="user.profile_image" class="profile-pic height-150 width-150" alt="profile-pic"/>
                                        <input type="hidden" v-model="user.logo">
                                        <!-- <div class="p-image">
                                            <div class="position-relative">
                                            <i class="ri-pencil-line upload-button"></i>
                                            <b-form-file :state="Boolean(user.logo)" class="h-100 position-absolute" accept=".jpg, .png, .jpeg" style="opacity: 0;" @change="previewImage"></b-form-file>
                                            </div>
                                        </div> -->
                                    </div>
                                </b-col>
                                <b-col md="8">
                                    <div class="mb-3">Ukuran optimal 300 x 300 piksel dengan Besar file: Maksimum 2MB. Ekstensi file yang diperbolehkan: JPG, JPEG, PNG</div>
                                      <b-form-group
                                        label-for="customFile"
                                    >
                                        <b-form-file
                                        placeholder="Pilih foto terbaik untuk profil toko"
                                        id="customFile"
                                        ref="file"
                                        accept=".jpg, .png, .jpeg"
                                        @change="previewImage"
                                        ></b-form-file>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                        </b-col>
                        <b-col md="2" offset-md="10">
                            <b-button variant="primary" class="btn-block" @click="updateInfonya">Simpan</b-button>
                        </b-col>
                    </b-row>
                </template>
            </iq-card>
            <iq-card>
                <template v-slot:headerTitle>
                    <h4 class="card-title ">Atur Jadwal Toko
                    </h4>
                </template>
                <template v-slot:body>
                    <b-row>
                        <b-col md="12">
                            <b-card class="mb-2">
                              <b-row>
                                <b-col md="12" class="mb-3">
                                  <h4 class="d-block text-dark font-weight-bold">Tutup Toko Sementara</h4>

                                  <div class="float-right">
                                    <button v-if="status == '1'" v-b-tooltip.hover title="Tutup toko sekarang?" @click="closeVendor">
                                      <h4><b-badge variant="success"><i class="va-inherit ri-eye-fill"></i> Toko Buka</b-badge></h4>
                                    </button>
                                    <button v-else v-b-tooltip.hover title="Buka toko sekarang?" @click="closeVendor">
                                      <h4><b-badge variant="danger"><i class="va-inherit ri-eye-off-fill"></i> Toko Sedang Tutup</b-badge></h4>
                                    </button>
                                  </div>

                                  <span class="d-block text-dark w-75">Aktifkan Fitur Tutup Toko Sementara agar Pembeli tidak dapat membuat pesanan. Pesanan yang ada tetap harus diselesaikan. Kamu akan tetap menerima permintaan pengembalian/pembatalan, mohon tetap membalas permintaan tersebut.</span>
                                </b-col>
                                <b-col md="12">
                                  <b-form-group>
                                  <h4 class="d-block text-dark font-weight-bold">Tentukan Hari Buka Toko</h4>
                                  <span class="d-block text-dark">Klik hari dibawah untuk mengatur hari apa toko anda buka di aplikasi ini, hari yang tidak di pilih akan dihitung sebagai hari libur.</span>
                                  <b-form-checkbox-group
                                    v-model="daySelect"
                                    :options="selectDay"
                                    class="mb-3"
                                    value-field="value"
                                    text-field="name"
                                    buttons
                                    button-variant="info"
                                    size="md"
                                    name="btnselDay"
                                  ></b-form-checkbox-group>
                                  </b-form-group>
                                </b-col>
                                <b-col md="12">
                                  <h4 class="d-block text-dark font-weight-bold">Tentukan Jam Buka & Tutup Toko</h4>
                                </b-col>
                                <b-col md="2">
                                  <b-form-group label="Jam Buka" label-for="setJamOpen">
                                    <!-- <b-form-timepicker
                                      id="setJamOpen"
                                      v-model="jamOpen"
                                      :locale="locale"
                                      show-seconds
                                      @context="onContextOpen"
                                    ></b-form-timepicker> -->
                                    <input type="time" class="form-control" v-model="jamOpen" id="setJamOpen">
                                  </b-form-group>
                                </b-col>
                                <b-col md="2">
                                  <b-form-group label="Jam Tutup" label-for="setJamClose">
                                    <!-- <b-form-timepicker
                                      v-model="jamClose"
                                      :locale="locale"
                                      show-seconds
                                      @context="onContextClose"
                                    ></b-form-timepicker> -->
                                    <input type="time" class="form-control" v-model="jamClose" id="setJamClose">
                                  </b-form-group>
                                </b-col>
                                <b-col md="12">
                                  <b-button variant="primary" class="" @click="saveOpen">Simpan</b-button>
                                </b-col>
                              </b-row>
                            </b-card>
                        </b-col>
                    </b-row>
                </template>
            </iq-card>
          </template>
        </iq-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import {
  core
} from '../../../config/pluginInit'
import API from '@/services/vendor/setting'
import CKEditor from 'ckeditor4-vue'
import constant from '@/config/constant'

export default {
  name: 'SettingInformasi',
  components: {
    ckeditor: CKEditor.component
  },
  mounted () {
    core.index()
    this.getInfoToko()
  },
  computed: {},
  data () {
    return {
      user: {
        profile_image: require('../../../assets/images/logo-b.png')
      },
      checked: false,
      status: '1',
      checkDay1: true,
      checkDay2: true,
      checkDay3: true,
      checkDay4: true,
      checkDay5: true,
      checkDay6: false,
      checkDay7: false,
      daySelect: [],
      selectDay: [
        { value: 1, name: 'Senin' },
        { value: 2, name: 'Selasa' },
        { value: 3, name: 'Rabu' },
        { value: 4, name: 'Kamis' },
        { value: 5, name: 'Jumat' },
        { value: 6, name: 'Sabtu' },
        { value: 7, name: 'Minggu' }
      ],
      locale: 'en-US',
      contextOpen: null,
      contextClose: null,
      jamOpen: '',
      jamClose: '',
      file: '',
      namatoko: '',
      slogan: '',
      deskripsi: '',
      editorConfig: {
        toolbar: [
          ['Bold', 'Italic', 'Underline', 'StrikeThrough', '-', 'Undo', 'Redo', '-', 'Cut', 'Copy', 'Paste', 'Find', 'Replace']
        ]
      }
    }
  },
  methods: {
    onContextOpen (ctx) {
      this.contextOpen = ctx
    },
    onContextClose (ctx) {
      this.contextClose = ctx
    },
    getInfoToko () {
      core.custLoader(true)
      API.informasi
        .getinfo().then(response => {
          var dt = response.data
          if (response.status === 200) {
            this.namatoko = dt.data.namatoko
            this.slogan = dt.data.slogan
            this.deskripsi = dt.data.deskripsi
            if (dt.data.hari_buka !== null) {
              const dayOpen = dt.data.hari_buka.split(',')
              this.daySelect = dayOpen
            }
            this.jamOpen = dt.data.jam_buka
            this.jamClose = dt.data.jam_tutup
            this.status = dt.data.status
            if (dt.data.logo != null) {
              this.user.profile_image = `${constant.urlAssetsPHP}vendor/` + dt.data.user_id + `/logo/` + dt.data.logo
            }
          }
        }).finally(() => {
          core.custLoader(false)
        })
    },
    updateInfonya () {
      core.custLoader(true)
      const dataPost = new FormData()
      dataPost.append('desc', this.deskripsi)
      dataPost.append('slogan', this.slogan)
      dataPost.append('logo', this.file)
      dataPost.append('nama', this.namatoko)
      API.informasi
        .updateinfo(dataPost).then(response => {
          if (response.status === 200) {
            core.showSnackbar('success', 'Berhasil mengubah informasi...')
            window.location.reload()
          }
        }).finally(() => {
          core.custLoader(false)
        })
    },
    saveOpen () {
      core.custLoader(true)
      const sendData = {
        day: this.daySelect.join(','),
        open: this.jamOpen,
        close: this.jamClose
      }
      API.informasi
        .open(sendData).then(response => {
          if (response.status === 200) {
            core.showSnackbar('success', 'Berhasil mengubah informasi...')
            window.location.reload()
          }
        }).finally(() => {
          core.custLoader(false)
        })
    },
    closeVendor () {
      core.custLoader(true)
      API.informasi
        .closeNow().then(response => {
          if (response.status === 200) {
            this.getInfoToko()
            core.showSnackbar('success', 'Berhasil mengubah status buka/tutup toko')
          }
        }).finally(() => {
          core.custLoader(false)
        })
    },
    previewImage: function (event) {
      const input = event.target

      if (input.files && input.files[0]) {
        const reader = new FileReader()

        reader.onload = (e) => {
          this.user.profile_image = e.target.result
        }

        reader.readAsDataURL(input.files[0])

        this.file = input.files[0]
      }
    }
  }
}

</script>

<style lang="less">
.form-control {
  height: auto !important;
  line-height: 1.5 !important;
  border-radius: 3px !important;
}
</style>
