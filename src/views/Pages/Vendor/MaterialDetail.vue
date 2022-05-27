<template>
  <b-container fluid>
    <b-row class="justify-content-center">
      <b-col md="8">
        <iq-card>
          <template v-slot:body>
            <div class="row">
              <div class="col-md-4 iq-item-product-left ">
                <!-- <div class="d-flex align-items-center justify-content-center mb-4">
                  <a :href="assetUrl + 'material/' + userData.user.role + '/' + materialData.image" target="_blank">
                    <img :src="assetUrl + 'material/' + userData.user.role + '/' + materialData.image" @error="imgError" class="w-100 grid-view-img px-4 w-200" />
                  </a>
                </div> -->
                <VueSlickCarousel
                  ref="c1"
                  :asNavFor="$refs.c2"
                  :focusOnSelect="true"
                  v-bind="slickSetting">
                  <div v-for="(list, x) in imageSlick" :key="x">
                    <a :href="assetUrl + 'material/' + userData.user.id + '/' + list"
                    target="_blank">
                      <img
                        :src="assetUrl + 'material/' + userData.user.id + '/' + list"
                        @error="imgError" class="w-100 rounded grid-view-img px-4 w-200" />
                    </a>
                  </div>
                </VueSlickCarousel>
                <div class="mb-2"></div>
                <VueSlickCarousel
                  ref="c2"
                  :asNavFor="$refs.c1"
                  :slidesToShow="4"
                  :focusOnSelect="true">
                  <div v-for="(list, x) in imageSlick" :key="x">
                    <img
                      :src="assetUrl + 'material/' + userData.user.id + '/' + list"
                      @error="imgError" class="w-100 rounded grid-view-img px-4 w-200" />
                  </div>
                </VueSlickCarousel>
              </div>
              <div class="col-md-5 iq-item-product-right">
                <div class="product-additional-details">
                  <h4 class="productpage_title font-weight-bold">{{ materialData.alias_name }}</h4>
                  <p>Merek: <b>{{ materialData.merk}}</b></p>
                  <div class="product-descriptio">
                    <p id="descProd"></p>
                  </div>
                  <div class="product-price">
                    <div class="regular-price">
                      <b> Rp {{ separatorNum(materialData.price_material) }}</b>
                      <!-- <span class="offer-price ml-2">Rp
                          {{ materialData.price + 4000}}
                      </span> -->
                    </div>
                  </div>
                  <div class="shipping">
                    <p class="mb-0" v-if="materialData.free_shipping">Shipping Fee: <span> Free</span></p>
                    <p class="mb-0" v-else>Biaya pengiriman: <span>-</span></p>
                  </div>
                  <div class="stock">
                    <p class="mb-0">Min. Stok: <span class="text-dark">{{ separatorNum(materialData.limit_min_stok) }}</span></p>
                  </div>
                  <div class="satuan">
                    <p class="mb-0">Satuan: <span class="text-dark">{{ materialData.satuan }}</span></p>
                  </div>
                  <div class="date">
                    <p>Tanggal Entry: <span>-</span></p>
                  </div>
                </div>
                <router-link to="/marketplace">
                  <b-button class="btn btn-info mb-3">Cek Material Serupa</b-button>
                </router-link>
              </div>
              <!-- <div class="col-md-3">
                <router-link to="/profile">
                  <iq-card>
                    <template v-slot:body>
                      <h5 class="card-title mb-2"><i class="fas fa-store"></i> Penjual</h5>
                      <b-media tag="li">
                        <template #aside>
                          <b-img blank blank-color="#abc" width="50" alt="placeholder"></b-img>
                        </template>
                          <h5 class="mt-0 mb-1">ini vendor</h5>
                        <div>
                          <span class="fa fa-star checked"></span>
                          <span class="fa fa-star checked"></span>
                          <span class="fa fa-star checked"></span>
                          <span class="fa fa-star text-muted"></span>
                          <span class="fa fa-star text-muted"></span>
                          <small class="text-muted"> (17 Ulasan)</small>
                        </div>
                      </b-media>
                      <small class="text-muted">Jakarta Selatan (5 km) | Online 17 Jam lalu</small>
                    </template>
                  </iq-card>
                </router-link>
              </div> -->
              <div class="col-sm-12 product-description-details">
                <div class="description-tabs mt-5">
                  <ul class="nav nav-tabs justify-content-center" id="myTab-2" role="tablist">
                    <li class="nav-item">
                      <a class="nav-link active" id="kategori-tab-justify" data-toggle="tab" href="#kategori" role="tab"
                        aria-controls="home" aria-selected="true">Kategori Bahan</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" id="hardis-tab-justify" data-toggle="tab" href="#hardis" role="tab"
                        aria-controls="profile" aria-selected="false">Harga &amp; Discount</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" id="datatransport-tab-justify" data-toggle="tab" href="#datatransport"
                        role="tab" aria-controls="datatransport" aria-selected="false">Data untuk Transportasi</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" id="stock-tab-justify" data-toggle="tab" href="#stock" role="tab"
                        aria-controls="stock" aria-selected="false">Stock</a>
                    </li>
                  </ul>
                  <div class="tab-content" id="myTabContent-3">
                    <div class="tab-pane fade show active" id="kategori" role="tabpanel"
                      aria-labelledby="kategori-tab-justify">
                      <b-row align-v="center">
                        <!-- <b-form-group class="col-md-6" label="Kategori di RAB" label-for="katrab">
                          <div class="form-group">
                            <b-form-input v-model="materialData.kategori_rab" id="katrab" type="text" readonly></b-form-input>
                          </div>
                        </b-form-group>
                        <b-form-group class="col-md-6" label="Kategori Bahan" label-for="katbahan1">
                          <div class="form-group">
                            <b-form-input v-model="materialData.bahan" id="katbahan1" type="text" readonly>
                            </b-form-input>
                          </div>
                        </b-form-group>
                        <b-form-group class="col-md-6" label="Kategori Bahan" label-for="katbahan2">
                          <div class="form-group">
                            <b-form-input v-model="materialData.bahan2" id="katbahan2" type="text" readonly>
                            </b-form-input>
                          </div>
                        </b-form-group>
                        <b-form-group class="col-md-6" label="Terbuat Dari Bahan" label-for="daribahan">
                          <div class="form-group">
                            <b-form-input v-model="materialData.daribahan" id="daribahan" type="text" readonly>
                            </b-form-input>
                          </div>
                        </b-form-group>
                        <b-form-group class="col-md-6" label="Pasangan Di" label-for="pasangan">
                          <div class="form-group">
                            <b-form-input v-model="materialData.pemasangan" id="pasangan" type="text" readonly>
                            </b-form-input>
                          </div>
                        </b-form-group> -->
                        <!-- <b-form-group class="col-md-6" label="Satuan" label-for="satuan">
                          <div class="form-group">
                            <b-form-input v-model="materialData.satuan" id="satuan" type="text" readonly>
                            </b-form-input>
                          </div>
                        </b-form-group>
                        <b-form-group class="col-md-6" label="Merek / Spesifikasi" label-for="merek">
                          <div class="form-group">
                            <b-form-input v-model="materialData.merk" id="merek" type="text" readonly>
                            </b-form-input>
                          </div>
                        </b-form-group>
                        <b-form-group class="col-md-6" label="Kombinasi Kategori" label-for="komkat">
                          <div class="form-group">
                            <b-form-input v-model="materialData.kategori_pekerjaan" id="merek" type="text" readonly>
                            </b-form-input>
                          </div>
                        </b-form-group> -->
                        <b-form-group class="col-md-12" label="Keterangan" label-for="keterangan">
                          <div class="form-group">
                            <b-form-textarea readonly id="keterangan" placeholder="Desc" rows="3"
                              max-rows="8" no-resize>
                            </b-form-textarea>
                          </div>
                        </b-form-group>
                      </b-row>
                    </div>
                    <div class="tab-pane fade" id="hardis" role="tabpanel" aria-labelledby="hardis-tab-justify">
                      <b-row>
                        <b-col md="12 mb-5">
                          <b-form-group class="row mb-3" label-cols-sm=3 label="Harga Sebelumnya"
                            label-for="hargasebelum">
                            <b-form-input readonly id="hargasebelum" v-model="materialData.hargasebelum" type="number"
                              placeholder="-"></b-form-input>
                            <span class="text-dark font-weight-bold">Harga Rata-rata</span>
                          </b-form-group>
                          <b-form-group class="row mb-3" label-cols-sm=3 label="Harga Saat ini"
                            label-for="hargasekarang">
                            <b-form-input readonly id="hargasekarang" v-model="materialData.price_material" type="number"
                              placeholder="-"></b-form-input>
                          </b-form-group>
                        </b-col>
                        <!-- <b-col md="6">
                          <b-form-group class="row mb-3" label-cols-sm=6 label="Target volume penjualan 1:"
                            label-for="disvol1">
                            <b-form-input readonly id="disvol1" v-model="materialData.disvol1" type="number"
                              placeholder="-"></b-form-input>
                          </b-form-group>
                          <b-form-group class="row mb-3" label-cols-sm=6 label="Target volume penjualan 2:"
                            label-for="disvol2">
                            <b-form-input readonly id="disvol2" v-model="materialData.disvol2" type="number"
                              placeholder="-"></b-form-input>
                          </b-form-group>
                          <b-form-group class="row mb-3" label-cols-sm=6 label="Target volume penjualan 3:"
                            label-for="disvol3">
                            <b-form-input readonly id="disvol3" v-model="materialData.disvol3" type="number"
                              placeholder="-"></b-form-input>
                          </b-form-group>
                          <b-form-group class="row mb-3" label-cols-sm=6 label="Target volume penjualan 4:"
                            label-for="disvol4">
                            <b-form-input readonly id="disvol4" v-model="materialData.disvol4" type="number"
                              placeholder="-"></b-form-input>
                          </b-form-group>
                          <b-form-group class="row mb-3" label-cols-sm=6 label="Target volume penjualan 5:"
                            label-for="disvol5">
                            <b-form-input readonly id="disvol5" v-model="materialData.disvol5" type="number"
                              placeholder="-"></b-form-input>
                          </b-form-group>
                          <b-form-group class="row mb-3" label-cols-sm=6 label="Target volume penjualan 6:"
                            label-for="disvol6">
                            <b-form-input readonly id="disvol6" v-model="materialData.disvol6" type="number"
                              placeholder="-"></b-form-input>
                          </b-form-group>
                        </b-col>
                        <b-col md="6">
                          <b-form-group class="row mb-3" label-cols-sm="6" label="% Discount target volume 1"
                            label-for="tarvol1">
                            <b-form-input readonly id="tarvol1" v-model="materialData.tarvol1" type="number"
                              placeholder="-"></b-form-input>
                          </b-form-group>
                          <b-form-group class="row mb-3" label-cols-sm="6" label="% Discount target volume 2"
                            label-for="tarvol2">
                            <b-form-input readonly id="tarvol2" v-model="materialData.tarvol2" type="number"
                              placeholder="-"></b-form-input>
                          </b-form-group>
                          <b-form-group class="row mb-3" label-cols-sm="6" label="% Discount target volume 3"
                            label-for="tarvol3">
                            <b-form-input readonly id="tarvol3" v-model="materialData.tarvol3" type="number"
                              placeholder="-"></b-form-input>
                          </b-form-group>
                          <b-form-group class="row mb-3" label-cols-sm="6" label="% Discount target volume 4"
                            label-for="tarvol4">
                            <b-form-input readonly id="tarvol4" v-model="materialData.tarvol4" type="number"
                              placeholder="-"></b-form-input>
                          </b-form-group>
                          <b-form-group class="row mb-3" label-cols-sm="6" label="% Discount target volume 5"
                            label-for="tarvol5">
                            <b-form-input readonly id="tarvol5" v-model="materialData.tarvol5" type="number"
                              placeholder="-"></b-form-input>
                          </b-form-group>
                          <b-form-group class="row mb-3" label-cols-sm="6" label="% Discount target volume 6"
                            label-for="tarvol6">
                            <b-form-input readonly id="tarvol6" v-model="materialData.tarvol6" type="number"
                              placeholder="-"></b-form-input>
                          </b-form-group>
                        </b-col> -->
                      </b-row>
                    </div>
                    <div class="tab-pane fade" id="datatransport" role="tabpanel"
                      aria-labelledby="datatransport-tab-justify">
                      <b-row>
                        <!-- <b-col md="12" class="mb-3">
                          <b-form-group class="row" label-cols-sm="3" label="Start Pengiriman Dari ..." label-for="startkirim">
                                  <b-form-input readonly id="startkirim" v-model="materialData.startkirim" type="text"
                              placeholder="CM"></b-form-input>
                            </b-form-group>
                        </b-col> -->
                        <b-col md="12" class="mb-3">
                          <b-form-group class="row" label-cols-sm="3" label="Bisa kirim gabungan?" label-for="gabungan">
                                  <b-form-input readonly id="gabungan" v-model="materialData.gabungan" type="text"
                              placeholder="CM"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col md="6">
                          <div class="font-weight-bold text-success text-center border-bottom mb-4">
                            Dimensi Barang
                          </div>
                          <b-form-group class="row mb-3" label-cols-sm="3" label="Dimensi P:" label-for="bdimensip">
                            <b-form-input readonly id="bdimensip" v-model="materialData.bdimensip" type="number"
                              placeholder="CM"></b-form-input>
                          </b-form-group>
                          <b-form-group class="row mb-3" label-cols-sm="3" label="Dimensi L:" label-for="bdimensil">
                            <b-form-input readonly id="bdimensil" v-model="materialData.bdimensil" type="number"
                              placeholder="CM"></b-form-input>
                          </b-form-group>
                          <b-form-group class="row mb-3" label-cols-sm="3" label="Dimensi T:" label-for="bdimensit">
                            <b-form-input readonly id="bdimensit" v-model="materialData.bdimensit" type="number"
                              placeholder="CM"></b-form-input>
                          </b-form-group>
                          <div>M3</div>
                          <b-form-group class="row mb-3" label-cols-sm="3" label="Berat Jenis Kg/M3:"
                            label-for="bberatjenis">
                            <b-form-input readonly id="bberatjenis" v-model="materialData.bberatjenis" type="number"
                              placeholder="Kg"></b-form-input>
                          </b-form-group>
                          <b-form-group class="row mb-3" label-cols-sm="3" label="Status Kirim Vendor"
                            label-for="bstatkirim">
                            <b-form-input readonly id="bstatkirim" v-model="materialData.bstatkirim" type="text"
                              placeholder="-"></b-form-input>
                          </b-form-group>
                        </b-col>
                        <b-col md="6">
                          <div class="font-weight-bold text-info text-center border-bottom mb-4">
                            Dimensi Packaging
                          </div>
                          <b-form-group class="row mb-3" label-cols-sm="3" label="Dimensi P:" label-for="pdimensip">
                            <b-form-input readonly id="pdimensip" v-model="materialData.pdimensip" type="number"
                              placeholder="CM"></b-form-input>
                          </b-form-group>
                          <b-form-group class="row mb-3" label-cols-sm="3" label="Dimensi L:" label-for="pdimensil">
                            <b-form-input readonly id="pdimensil" v-model="materialData.pdimensil" type="number"
                              placeholder="CM"></b-form-input>
                          </b-form-group>
                          <b-form-group class="row mb-3" label-cols-sm="3" label="Dimensi T:" label-for="pdimensit">
                            <b-form-input readonly id="pdimensit" v-model="materialData.pdimensit" type="number"
                              placeholder="CM"></b-form-input>
                          </b-form-group>
                          <div>M3</div>
                          <b-form-group class="row mb-3" label-cols-sm="3" label="Berat Jenis Kg/M3:"
                            label-for="pberatjenis">
                            <b-form-input readonly id="pberatjenis" v-model="materialData.pberatjenis" type="number"
                              placeholder="Kg"></b-form-input>
                          </b-form-group>
                          <b-form-group class="row mb-3" label-cols-sm="3" label="Status Kirim" label-for="pstatkirim">
                            <b-form-input readonly id="pstatkirim" v-model="materialData.pstatkirim" type="text"
                              placeholder="-"></b-form-input>
                          </b-form-group>
                        </b-col>
                      </b-row>
                    </div>
                    <div class="tab-pane fade" id="stock" role="tabpanel" aria-labelledby="stock-tab-justify">
                      <b-row align-v="center">
                        <b-col md="12">
                          <b-form-group class="row mb-3" label-cols-sm="3" label="Stock saat ini" label-for="stock">
                            <b-form-input readonly id="stock" v-model="materialData.available_stok" type="number" placeholder="-">
                            </b-form-input>
                          </b-form-group>
                          <!-- <b-row align-v="center" class="mt-3">
                            <b-col md="12">
                                <div class="table-responsive">
                                  <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <td><b>Tanggal</b></td>
                                            <td>Rencana Stok</td>
                                            <td>sub Total</td>
                                            <td>Proyeksi Permintaan</td>
                                            <td>Sudah DP</td>
                                            <td>DP Akumulatif</td>
                                            <td><b>Total Stok Akhir</b></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><b>21/10/2020</b></td>
                                            <td>45</td>
                                            <td>79</td>
                                            <td>15</td>
                                            <td>4</td>
                                            <td>4</td>
                                            <td><b>75</b></td>
                                        </tr>
                                    </tbody>
                                  </table>
                                </div>
                            </b-col>
                          </b-row> -->
                        </b-col>
                      </b-row>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </iq-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { core, brokenImage } from '../../../config/pluginInit'
import API from '@/services/vendor/material'
import constant from '@/config/constant'
import { mapGetters } from 'vuex'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  name: 'MaterialDetail',
  props: {
    toMaterialEdit: {
      type: Object,
      default: () => ({
        name: 'material.addmaterial'
      })
    }
  },
  components: {
    VueSlickCarousel
  },
  mounted () {
    core.index()
    this.getDetailMaterial()
  },
  computed: {
    ...mapGetters({
      userData: 'authModule/getUserData'
    })
  },
  data () {
    return {
      materialData: {
        merk: '',
        satuan: '',
        kategori_rab: '',
        kategori_pekerjaan: '',
        fungsi: '',
        bahan: '',
        bahan2: '',
        daribahan: '',
        pemasangan: '',
        name_material: '',
        photo: '',
        limit_min_stok: '',
        build_quality: '',
        delivery_type: '',
        vendor_name: '',
        vendor_contact: '',
        vendor_phone: '',
        vendor_email: '',
        vendor_website: '',
        vendor_npwp: '',
        vendor_address: '',
        vendor_province: '',
        vendor_city: '',
        vendor_latitude: '',
        vendor_longitude: '',
        vendor_postal_code: '',
        vendor_logo: '',
        vendor_banner: '',
        price_material: '',
        hargasebelum: '',
        status_material_vendor: '',
        available_stok: '',
        distance: '',
        description: '-',
        bdimensip: '',
        bdimensil: '',
        bdimensit: '',
        bberatjenis: '',
        bstatkirim: '',
        pdimensip: '',
        pdimensil: '',
        pdimensit: '',
        pberatjenis: '',
        pstatkirim: '',
        startkirim: '',
        gabungan: ''
      },
      material: {
        tglentry: '',
        idvendor: '',
        nperusahaan: '',
        idmaterial: '',
        ket: '',
        hargasebelum: '',
        hargasekarang: '',
        disvol1: '',
        disvol2: '',
        disvol3: '',
        disvol4: '',
        disvol5: '',
        disvol6: '',
        tarvol1: '',
        tarvol2: '',
        tarvol3: '',
        tarvol4: '',
        tarvol5: '',
        tarvol6: '',
        bdimensip: '',
        bdimensil: '',
        bdimensit: '',
        bberatjenis: '',
        bstatkirim: '',
        pdimensip: '',
        pdimensil: '',
        pdimensit: '',
        pberatjenis: '',
        pstatkirim: '',
        stock: '',
        laterstock: '',
        datestock: '',
        startkirim: '',
        gabungan: ''
      },
      assetUrl: constant.urlAssetsPHP,
      imageSlick: [],
      slickSetting: {
        dots: false,
        arrows: false,
        dotsClass: 'slick-dots custom-dot-class'
      }
    }
  },
  methods: {
    getDetailMaterial () {
      API.material
        .getDetail(this.$route.params.id).then(response => {
          if (response.status === 200) {
            core.showSnackbar('success', 'Load detail berhasil.')
            this.materialData = response.data.result[0]
            this.materialData.pstatkirim = response.data.result[0].pstatkirim.nama
            this.materialData.bstatkirim = response.data.result[0].bstatkirim.nama
            this.materialData.startkirim = response.data.result[0].startkirim.nama
            var regex = /(<([^>]+)>)/ig
            var body = response.data.result[0].description
            var resultss = body.replace(regex, '')
            var desc = document.getElementById('descProd')
            var ket = document.getElementById('keterangan')
            desc.innerHTML = `<p>${response.data.result[0].description}</p>`
            ket.value = resultss
            this.imageCarousel(response.data.result[0].image)
            this.materialData.gabungan = 'Tidak'
            if (response.data.result[0].join) {
              this.materialData.gabungan = 'Gabungan'
            }
          }
        })
    },

    separatorNum (val) {
      if (typeof val === 'undefined' || val === null || val === 'null') {
        return null
      }
      val = parseFloat(val)
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },

    imageCarousel (e) {
      var arr = []
      if (e.indexOf(',') > -1) {
        const valArr = e.split(',')
        arr = valArr
      } else {
        arr.push(e)
      }
      this.imageSlick = arr
    },

    imgError (e) {
      e.target.src = brokenImage
    }
  }
}

</script>

<style>
  .form-group {
    margin-bottom: 0.5rem;
  }
  textarea {
    line-height: 25px !important;
  }
  .checked {
    color: orange;
  }
</style>
