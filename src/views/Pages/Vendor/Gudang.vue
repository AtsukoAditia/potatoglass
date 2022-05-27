<template>
  <b-container fluid="">
    <b-row>
      <b-col md="12" sm="12">
        <iq-card>
          <template v-slot:headerTitle>
          </template>
          <template v-slot:headerAction>
            <b-button variant="primary" class="float-right" v-b-modal.modalAddGudang><i class="ri-bill-fill"></i>Tambah
              Gudang</b-button>
          </template>
          <template v-slot:body>
            <b-row>
              <b-col md="6" class="my-1">
                <label for="searchInput">Pencarian</label>
                <b-form-input id="searchInput" v-model="filter" type="search" size="md"
                  placeholder="Ketik disini untuk mencari..."></b-form-input>
              </b-col>
            </b-row>
            <br>
            <b-table show-empty :items="getList" :fields="fields" :current-page="currentPage" :per-page="perPage" ref="dTable">
              <template v-slot:cell(no)="row">
                <span :v-for="row">
                  {{ ((currentPage - 1) * perPage) + (row.index + 1) }}
                </span>
              </template>
              <template v-slot:cell(created_at)="row">
                {{ row.item.created_at | moment }}
              </template>
              <template v-slot:cell(active)="row">
                <div>
                  <button v-if="row.item.active == '1'" v-b-tooltip.hover title="Matikan pengiriman dari gudang ini?" @click="statusDeliv(row.item)">
                    <b-badge variant="success">Aktif Pengiriman</b-badge>
                  </button>
                  <button v-else-if="row.item.active == '0'" v-b-tooltip.hover title="Aktifkan pengiriman dari gudang ini?" @click="statusDeliv(row.item)">
                    <b-badge variant="dark">Tidak Aktif</b-badge>
                  </button>
                  <button v-else v-b-tooltip.hover title="Atur data pengiriman terlebih dahulu.">
                    <b-badge variant="dark">Pengiriman Tidak Ada</b-badge>
                  </button>
                </div>
              </template>
              <template v-slot:cell(detail_uk)="row">
                <p v-if="row.item.panjang_muat != null">
                  <span v-b-tooltip.hover title="Panjang Muat (Cm)"><b>P</b>
                    {{ row.item.panjang_muat.slice(0, -3) }}</span> x
                  <span v-b-tooltip.hover title="Lebar Muat (Cm)"><b>L</b>
                    {{ row.item.lebar_muat.slice(0, -3) }}</span> x
                  <span v-b-tooltip.hover title="Tinggi Muat (Cm)"><b>T</b>
                    {{ row.item.tinggi_muat.slice(0, -3) }}</span>
                  <span class="d-block" v-b-tooltip.hover title="Berat Muat"><b>Berat</b>
                    {{ row.item.berat_muat.slice(0, -3) }} Kg</span>
                </p>
                <p v-else>-</p>
              </template>
              <template v-slot:cell(actions)="row">
                <b-button size="sm" v-b-tooltip.top="'Tambah data pengiriman gudang'" variant="info" class="mr-1" v-b-modal="`modalAddDeliv${row.item.gudang_id}`">
                  Atur Pengiriman
                </b-button>
                <b-modal :id="`modalAddDeliv${row.item.gudang_id}`" title="Tambah data pengiriman pada gudang ini" size="lg" ok-title="Tambah Data" cancel-title="Batal" @ok="addDelivGudang(row.item.gudang_id)" @show="showModalDeliv(row.item)" @hidden="hideModalDeliv">
                  <form>
                    <b-container>
                      <b-row>
                        <b-col md="4">
                          <b-form-group label-for="radius_deliv" label="* Radius Pengiriman">
                            <b-input-group size="md" append="KM">
                              <money v-model="delivery.radius_delivery" id="radius_deliv" v-bind="money" class="form-control"></money>
                            </b-input-group>
                          </b-form-group>
                        </b-col>
                        <b-col md="4">
                          <b-form-group label-for="est_deliv" label="* Estimasi Pengiriman">
                            <b-input-group size="md" append="Hari">
                              <money v-model="delivery.estimate_day_delivery" id="est_deliv" v-bind="money" class="form-control"></money>
                            </b-input-group>
                          </b-form-group>
                        </b-col>
                        <b-col md="4">
                          <b-form-group label-for="cubic_deliv" label="* Muat Kubik">
                            <b-input-group size="md" append="M">
                              <money v-model="delivery.cubic_muat" id="cubic_deliv" v-bind="money" class="form-control"></money>
                            </b-input-group>
                          </b-form-group>
                        </b-col>
                        <b-col md="6">
                          <b-form-group label-for="price_first" label="* Harga Pengiriman /KM">
                            <b-input-group size="md" prepend="Rp">
                              <money v-model="delivery.price_first_km" id="price_first" v-bind="money" class="form-control"></money>
                            </b-input-group>
                          </b-form-group>
                        </b-col>
                        <b-col md="6">
                          <b-form-group label-for="price_second" label="* Harga Pengiriman Setelah Lewat KM">
                            <b-input-group size="md" prepend="Rp">
                              <money v-model="delivery.price_next_km" id="price_second" v-bind="money" class="form-control"></money>
                            </b-input-group>
                          </b-form-group>
                        </b-col>
                        <b-col md="3">
                          <b-form-group label-for="panjang_" label="* Panjang Muat">
                            <b-input-group size="md" append="CM">
                              <money v-model="delivery.panjang_muat" id="panjang_" v-bind="money" class="form-control"></money>
                            </b-input-group>
                          </b-form-group>
                        </b-col>
                        <b-col md="3">
                          <b-form-group label-for="lebar_" label="* Lebar Muat">
                            <b-input-group size="md" append="CM">
                              <money v-model="delivery.lebar_muat" id="lebar_" v-bind="money" class="form-control"></money>
                            </b-input-group>
                          </b-form-group>
                        </b-col>
                        <b-col md="3">
                          <b-form-group label-for="tinggi_" label="* Tinggi Muat">
                            <b-input-group size="md" append="CM">
                              <money v-model="delivery.tinggi_muat" id="tinggi_" v-bind="money" class="form-control"></money>
                            </b-input-group>
                          </b-form-group>
                        </b-col>
                        <b-col md="3">
                          <b-form-group label-for="berat_" label="* Berat Muat">
                            <b-input-group size="md" append="KG">
                              <money v-model="delivery.berat_muat" id="berat_" v-bind="money" class="form-control"></money>
                            </b-input-group>
                          </b-form-group>
                        </b-col>
                        <b-col md="12">
                          <b-form-group label-for="note_" label="Catatan">
                            <ckeditor editorUrl="https://cdnjs.cloudflare.com/ajax/libs/ckeditor/4.17.1/ckeditor.js" v-model="delivery.note" rows="5" cols="70" id="ckfill" name="ckfill" :config="editorConfig"></ckeditor>
                          </b-form-group>
                        </b-col>
                      </b-row>
                    </b-container>
                  </form>
                </b-modal>

                <b-button size="sm" v-b-tooltip.top="'Ubah Data Gudang?'" variant="info" class="mr-1" @click="getDetailGudang(row.item.gudang_id)">Ubah</b-button>

                <b-button size="sm" class="mr-1" variant="info" v-b-modal="`showMaterial${row.item.gudang_id}`">Lihat Material</b-button>

                <b-button size="sm" v-b-tooltip.top="'Hapus Data'" variant="danger" class="mr-1"
                  @click="delWarehouse(row.item)">
                  <div data-icon="" class="icon"></div>
                </b-button>

                <b-modal size="lg" :id="`showMaterial${row.item.gudang_id}`" ref="showMaterial" title="Daftar Material di Gudang" @show="getListMaterial(row.item.gudang_id)">
                  <b-table show-empty stacked="md" :items="getDataList" :fields="fieldsList">
                    <template v-slot:cell(image)="row">
                      <a :href="assetUrl + 'material/' + userrole.user.id + '/' + cekImg(row.item.image)" target="_blank">
                        <b-img :src="assetUrl + 'material/' + userrole.user.id + '/' + cekImg(row.item.image)" class="imgTBL"
                          :alt="row.item.name_material" @error="imgError"></b-img>
                      </a>
                    </template>
                    <template v-slot:cell(name_material)="row">
                      <router-link :to="`material/${row.item.m_id}`" class="text-dark title-material">
                        {{ row.item.alias_name }}
                      </router-link>
                    </template>
                    <template v-slot:cell(harga_material)="row">
                      Rp {{ separatorNum(row.item.harga_material) }}
                    </template>
                    <template v-slot:cell(available_stock)="row">
                      <span v-if="row.item.available_stock != null">{{ separatorNum(row.item.available_stock) }}</span>
                      <span v-else>0</span>
                    </template>
                    <template v-slot:cell(status_material_vendor)="row">
                      <div>
                          <b-badge v-if="row.item.status_material == '1'" variant="success"><i class="va-inherit ri-eye-fill"></i> Published</b-badge>
                          <b-badge v-else variant="dark"><i class="va-inherit ri-eye-off-fill"></i> Draft</b-badge>
                      </div>
                    </template>
                  </b-table>
                  <b-row>
                    <b-col md="12">
                    </b-col>
                  </b-row>
                </b-modal>
              </template>
            </b-table>
            <b-col sm="12" md="6" class="my-1">
              <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="fill" size="sm"
                class="my-0"></b-pagination>
            </b-col>
          </template>
        </iq-card>
      </b-col>
    </b-row>
    <b-modal id="modalAddGudang" ref="modalAdd" title="Tambah data gudang" size="lg" ok-title="Tambah Gudang" cancel-title="Batal"
      @ok="addNewGudang" @show="geolocate" @hidden="resetFormGudang">
      <form>
        <b-container>
          <b-row>
            <b-col md="12">
              <b-form-group label-for="nama_gudang" label="Nama Gudang">
                <b-form-input id="nama_gudang" v-model="gudang.nama_gudang" type="text" placeholder="-"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="12">
              <b-form-group label-for="alamat" label="Alamat Gudang">
                <b-form-input id="alamat" v-model="gudang.alamat" type="text" placeholder="-"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col class="mb-2" md="12">
              <b-form-group label-for="placemap" label="Tandai di Peta">
                <div>
                  <GmapAutocomplete
                  @place_changed='setPlace'
                  id="placemap"
                  class="form-control"
                  placeholder="Cari lokasi anda disini"
                />
                </div>
              </b-form-group>
            </b-col>
            <b-col md="12" class="mb-2">
              <div class="w-100 d-flex">
                <GmapMap :center="center" :zoom="18" map-style-id="roadmap" :options="mapOptions"
                style="width: 100vmax; height: 35vmin" ref="mapRefGudang" @click="handleMapClick">
                  <GmapMarker :position="marker.position" :clickable="true" :draggable="true"
                    @drag="handleMarkerDrag" @click="panToMarker" />
                </GmapMap>
              </div>
            </b-col>
            <b-col md="6">
              <b-form-group label-for="pic" label="Nama PIC">
                <b-form-input id="pic" v-model="gudang.pic" type="text" placeholder="-"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group label-for="no_telp" label="No. Telephone">
                <b-form-input id="no_telp" v-model="gudang.no_telp" type="text" placeholder="-"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
        </b-container>
      </form>
    </b-modal>
  </b-container>
</template>
<script>
import {
  core,
  brokenImage
} from '../../../config/pluginInit'
import API from '@/services/vendor/warehouse'
import moment from 'moment'
import CKEditor from 'ckeditor4-vue'
import { Money } from 'v-money'
import constant from '@/config/constant'
import {
  mapGetters
} from 'vuex'
export default {
  name: 'Gudang',
  props: {},
  mounted () {
    core.index()
  },
  data () {
    return {
      fields: [{
        key: 'no',
        label: 'No.',
        sortable: true,
        sortDirection: 'asc'
      },
      {
        key: 'nama_gudang',
        label: 'Nama Gudang'
      },
      {
        key: 'alamat',
        label: 'Alamat'
      },
      {
        key: 'pic',
        label: 'PIC'
      },
      {
        key: 'no_telp',
        label: 'No. Telp'
      },
      {
        key: 'detail_uk',
        label: 'Muat'
      },
      { key: 'active', label: 'Status' },
      {
        key: 'actions',
        label: 'Aksi'
      }
      ],
      money: {
        thousands: '.',
        precision: 0,
        masked: false
      },
      totalRows: '',
      currentPage: 1,
      perPage: 15,
      pageOptions: [5, 10, 15],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      gudang: {
        nama_gudang: '',
        alamat: '',
        no_telp: '',
        pic: '',
        lat: '',
        lng: '',
        alamat_maps: '',
        id: ''
      },
      delivery: {
        id: '',
        radius_delivery: '',
        price_first_km: '',
        price_next_km: '',
        estimate_day_delivery: '',
        note: '',
        panjang_muat: '',
        lebar_muat: '',
        tinggi_muat: '',
        cubic_muat: '',
        gudang_id: '',
        berat_muat: ''
      },
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
      editorConfig: {
        toolbar: [
          ['Bold', 'Italic', 'Underline', 'StrikeThrough', '-', 'Undo', 'Redo', '-', 'Cut', 'Copy', 'Paste', 'Find', 'Replace']
        ]
      },
      getDataList: [],
      fieldsList: [
        {
          key: 'image',
          label: 'Foto'
        },
        {
          key: 'name_material',
          label: 'Nama Material'
        },
        {
          key: 'harga_material',
          label: 'Harga Toko',
          sortable: true
        },
        {
          key: 'available_stock',
          label: 'Stok'
        },
        {
          key: 'status_material_vendor',
          label: 'Status'
        }
      ],
      userrole: this.userData(),
      assetUrl: constant.urlAssetsPHP
    }
  },
  filters: {
    moment: function (date) {
      return moment(date).format('D MMMM YYYY')
    }
  },
  components: {
    ckeditor: CKEditor.component,
    Money
  },
  computed: {},
  methods: {
    ...mapGetters({
      userData: 'authModule/getUserData'
    }),
    getList (ctx) {
      core.custLoader(true)
      let currPage = (ctx.currentPage - 1) * ctx.perPage
      if (ctx.currentPage === 1) {
        currPage = 0
      }
      let name = ctx.filter
      if (name === null) {
        name = ''
      }
      return API
        .getList(currPage, ctx.perPage).then(response => {
          const dt = response.data
          if (response.status) {
            this.totalRows = dt._meta.total
            const items = dt.data
            return items || []
          } else if (dt.errors.length > 0) {
            this.$refs.dTable.setErrors(dt.errors)
          }
        }).catch(() => {
          core.showSnackbar('error', 'Terjadi kesalahan sistem...')
        }).finally(() => {
          core.custLoader(false)
        })
    },
    addNewGudang () {
      core.custLoader(true)
      const dtGudang = {
        nama_gudang: this.gudang.nama_gudang,
        alamat: this.gudang.alamat,
        no_telp: this.gudang.no_telp,
        pic: this.gudang.pic,
        lat: this.gudang.lat,
        lng: this.gudang.lng,
        alamat_maps: this.gudang.alamat_maps,
        id: this.gudang.id
      }
      API
        .addWare(dtGudang).then(response => {
          if (response.status === 200) {
            core.showSnackbar('success', 'Data gudang telah di tambahkan.')
            this.gudang = {
              nama_gudang: '',
              alamat: '',
              no_telp: '',
              pic: '',
              lat: '',
              lng: '',
              alamat_maps: ''
            }
            this.$refs.dTable.refresh()
          } else {
            core.showSnackbar('danger', 'Data gudang telah gagal ditambahkan.')
          }
        }).catch(() => {
          core.showSnackbar('danger', 'Terjadi kesalahan pada sistem.')
        }).finally(() => {
          core.custLoader(false)
        })
    },
    delWarehouse (data) {
      const del = confirm('Apakah anda yakin untuk menghapus data ' + data.nama_gudang + ' ini?')

      if (del) {
        core.custLoader(true)
        API
          .delWare(data.gudang_id).then(response => {
            if (response.status) {
              core.showSnackbar('success', 'Data gudang berhasil di hapus.')
              this.$refs.dTable.refresh()
            } else {
              core.showSnackbar('error', 'Data gagal di hapus.')
            }
          }).catch(() => {
            core.showSnackbar('error', 'Gagal, terjadi kesalahan pada sistem.')
          }).finally(() => {
            core.custLoader(false)
          })
      }
    },
    statusDeliv (data) {
      core.custLoader(true)
      API
        .statusWare(data.deliv_id).then(response => {
          if (response.status) {
            core.showSnackbar('success', 'Data berhasil diubah, Gudang ini tidak menerima pengiriman')
            this.$refs.dTable.refresh()
          } else {
            core.showSnackbar('error', 'Data gagal diubah.')
          }
        }).catch(() => {
          core.showSnackbar('error', 'Gagal, terjadi kesalahan pada sistem.')
        }).finally(() => {
          core.custLoader(false)
        })
    },
    showModalDeliv (dt) {
      this.delivery = {
        radius_delivery: dt.radius_delivery,
        price_first_km: dt.price_first_km.slice(0, -3),
        price_next_km: dt.price_next_km.slice(0, -3),
        estimate_day_delivery: dt.estimate_day_delivery,
        note: dt.note,
        panjang_muat: dt.panjang_muat.slice(0, -3),
        lebar_muat: dt.lebar_muat.slice(0, -3),
        tinggi_muat: dt.tinggi_muat.slice(0, -3),
        cubic_muat: dt.cubic_muat.slice(0, -3),
        berat_muat: dt.berat_muat.slice(0, -3),
        gudang_id: dt.gudang_id.slice(0, -3),
        id: dt.id
      }
    },
    hideModalDeliv () {
      this.delivery = {
        radius_delivery: '',
        price_first_km: '',
        price_next_km: '',
        estimate_day_delivery: '',
        note: '',
        panjang_muat: '',
        lebar_muat: '',
        tinggi_muat: '',
        berat_muat: '',
        cubic_muat: '',
        gudang_id: '',
        id: ''
      }
    },
    addDelivGudang (dt) {
      this.delivery.gudang_id = dt
      core.custLoader(true)
      API
        .addDelivWare(this.delivery).then(response => {
          if (response.status === 200) {
            core.showSnackbar('success', 'Data pengiriman telah di tambahkan.')
            this.delivery = {
              radius_delivery: '',
              price_first_km: '',
              price_next_km: '',
              estimate_day_delivery: '',
              note: '',
              panjang_muat: '',
              lebar_muat: '',
              tinggi_muat: '',
              cubic_muat: '',
              berat_muat: '',
              gudang_id: '',
              id: ''
            }
            this.$refs.dTable.refresh()
          } else {
            core.showSnackbar('danger', 'Data pengiriman telah gagal ditambahkan.')
          }
        }).catch(() => {
          core.showSnackbar('danger', 'Terjadi kesalahan pada sistem.')
        }).finally(() => {
          core.custLoader(false)
        })
    },
    handleMapClick (e) {
      this.marker.position = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      }
      this.gudang.lat = e.latLng.lat()
      this.gudang.lng = e.latLng.lng()
    },
    handleMarkerDrag (e) {
      this.marker.position = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      }
      this.gudang.lat = e.latLng.lat()
      this.gudang.lng = e.latLng.lng()
    },

    panToMarker () {
      this.$refs.mapRefGudang.panTo(this.marker.position)
    },

    geolocate () {
      navigator.geolocation.getCurrentPosition((position) => {
        this.marker.position = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        this.center.lat = position.coords.latitude
        this.center.lng = position.coords.longitude
        this.gudang.lat = position.coords.latitude
        this.gudang.lng = position.coords.longitude
        this.panToMarker()
      })
    },

    setPlace (place) {
      var currplace = place
      this.gudang.alamat_maps = place.vicinity
      const marker = {
        lat: currplace.geometry.location.lat(),
        lng: currplace.geometry.location.lng()
      }
      this.center = marker
      this.marker.position = {
        lat: marker.lat,
        lng: marker.lng
      }
      this.gudang.lat = marker.lat
      this.gudang.lng = marker.lng
      this.panToMarker()
    },

    getDetailGudang (id) {
      core.custLoader(true)
      API
        .getDetail(id).then(response => {
          const dt = response.data
          if (response.status === 200) {
            this.gudang = dt.data
            this.$refs['modalAdd'].show()
            setTimeout(() => {
              document.getElementById('placemap').value = dt.data.alamat_maps
            }, 1000)
          } else {
            core.showSnackbar('danger', 'Terjadi kesalahan pada sistem.')
          }
        }).catch(() => {
          core.showSnackbar('danger', 'Terjadi kesalahan pada sistem.')
        }).finally(() => {
          core.custLoader(false)
        })
    },

    getListMaterial (id) {
      core.custLoader(true)
      API
        .getListMaterial(id, 0, 100).then(response => {
          const dt = response.data
          if (response.status === 200) {
            this.getDataList = dt.data
          } else {
            core.showSnackbar('danger', 'Terjadi kesalahan pada sistem.')
          }
        }).catch(() => {
          core.showSnackbar('danger', 'Terjadi kesalahan pada sistem.')
        }).finally(() => {
          core.custLoader(false)
        })
    },

    resetFormGudang () {
      this.gudang = {
        nama_gudang: '',
        alamat: '',
        no_telp: '',
        pic: '',
        lat: '',
        lng: '',
        alamat_maps: '',
        id: ''
      }
    },

    separatorNum (val) {
      if (typeof val === 'undefined' || val === null || val === 'null') {
        return null
      }
      val = parseFloat(val)
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },

    imgError (e) {
      e.target.src = brokenImage
    },
    cekImg (dt) {
      if (dt != null) {
        const img = dt.split(',')
        return img[0]
      } else {
        return '-'
      }
    }
  }
}

</script>

<style>
  /* .iq-card-body{
  flex: unset;
} */
  .imgTBL {
    width: 60px;
    height: 60px;
    border: 1px #c3c2c252 solid;
    border-radius: 5px;
    object-fit: contain;
  }

  .inputPercentModal {
    border-bottom-right-radius: 0px !important;
    border-top-right-radius: 0px !important;
    width: 0;
    height: 39px !important;
    border-top-left-radius: 5px !important;
    border-bottom-left-radius: 5px !important;
  }

  .trtdMid>td {
    vertical-align: inherit !important;
  }

  .mlt-limitWidth>.multiselect {
    max-width: 250px !important;
  }

  .pac-container {
    z-index: 10000;
  }
  .form-control {
    border-radius: 3px !important;
  }

</style>
