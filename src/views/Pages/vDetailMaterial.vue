<template>
  <b-container fluid>
    <b-row class="justify-content-center">
      <b-col md="10">
        <iq-card>
          <template v-slot:body>
            <div class="row justify-content-center">
              <div class="col-md-4 iq-item-product-left ">
                <!-- <div class="d-flex align-items-center justify-content-center mb-4">
                  <a :href="assetUrl + 'material/' + materialData.vendor.id + '/' + cekImg(materialData.material.image)"
                    target="_blank">
                    <img
                      :src="assetUrl + 'material/' + materialData.vendor.id + '/' + cekImg(materialData.material.image)"
                      @error="imgError" class="w-100 rounded grid-view-img px-4 w-200" />
                  </a>
                </div> -->
                <VueSlickCarousel
                  ref="c1"
                  :asNavFor="$refs.c2"
                  :focusOnSelect="true"
                  v-bind="slickSetting">
                  <div v-for="(list, x) in imageSlick" :key="x">
                    <a :href="assetUrl + 'material/' + materialData.vendor.id + '/' + list"
                    target="_blank">
                      <img
                        :src="assetUrl + 'material/' + materialData.vendor.id + '/' + list"
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
                      :src="assetUrl + 'material/' + materialData.vendor.id + '/' + list"
                      @error="imgError" class="w-100 rounded grid-view-img px-4 w-200" />
                  </div>
                </VueSlickCarousel>
              </div>
              <div class="col-md-8 align-items-center iq-item-product-right">
                <b-row>
                  <b-col md="6">
                    <div class="product-additional-details">
                      <h4 class="productpage_title font-weight-bold">{{ materialData.material.name }}</h4>
                      <p class="txt-status text-muted">Merek: <b>{{ materialData.merk}}</b></p>
                      <!-- <div class="product-descriptio">
                        <p>{{ materialData.material.description }}</p>
                      </div> -->
                      <div class="product-price">
                        <div class="regular-price">
                          <b> Rp {{ separatorNum(materialData.harga.per_unit) }} /{{ materialData.satuan }}</b>
                          <!-- <span class="offer-price ml-2">Rp
                              {{ materialData.price + 4000}}
                          </span> -->
                        </div>
                      </div>
                      <div class="shipping">
                        <p class="mb-0 txt-status text-muted" v-if="materialData.free_shipping">Biaya Pengiriman: <span> Gratis</span></p>
                        <p class="mb-0 txt-status text-muted" v-else>Biaya pengiriman: <span>-</span></p>
                      </div>
                      <div class="stock">
                        <p class="mb-0 txt-status text-muted">Stok: <span
                            class="text-dark">{{ separatorNum(materialData.stock.available) }}</span></p>
                      </div>
                      <div class="stock">
                        <p class="mb-0 txt-status text-muted">Etalase: <span
                            class="text-dark">{{ materialData.material.etalase_potition }}</span></p>
                      </div>
                    </div>
                    <hr>
                    <div>
                      <b-media tag="li">
                        <template #aside>
                          <b-img blank blank-color="#abc" width="50" alt="placeholder" rounded=""></b-img>
                        </template>

                        <router-link :to='`/store/${materialData.vendor.id}`'>
                          <h5 class="mt-0 mb-1"><i v-b-tooltip.top="'Toko ini sudah diverifikasi'"
                              class="fas fa-check-circle ml-1 text-primary"></i> {{ materialData.vendor.name }}</h5>
                        </router-link>
                        <div>
                          <span class="fa fa-star checked"></span>
                          <span class="fa fa-star checked"></span>
                          <span class="fa fa-star checked"></span>
                          <span class="fa fa-star text-muted"></span>
                          <span class="fa fa-star text-muted"></span>
                          <small class="text-muted"> (17 Ulasan)</small>
                        </div>
                        <small class="text-muted">Jakarta Selatan (5 km)</small>
                      </b-media>
                    </div>
                    <hr>
                    <div class="mb-0 txt-status text-muted">
                      <span>Keterangan :</span>
                      <div>{{ materialData.material.description }}</div>
                    </div>
                    <hr>
                    <div>
                      <span>Produk material?</span>
                      <b-button v-b-modal.modalReport variant="link" class="mb-3 mr-1 float-right"><i class="ri-bill-fill"></i>Laporkan</b-button>
                    </div>
                  </b-col>
                  <b-col md="6">
                    <iq-card>
                      <template v-slot:body>
                        <div class="txt-status"><span class="dot-rec dot-rec-orange"></span>Status Peminat : <span>521</span> Unit</div>
                        <div class="txt-status"><span class="dot-rec dot-rec-red"></span>Status Keranjang : <span>467</span> Unit</div>
                        <div class="txt-status"><span class="dot-rec dot-rec-blue"></span>Status DP Lunas : <span>124</span> Unit</div>

                        <div>Ayo ajak teman beli <span class="font-weight-bold text-danger">77</span> <span class="font-weight-bold text-danger">unit</span> lagi, untuk tercapai harga:</div>
                        <div>Rp <span>850.000</span></div>
                        <div>Berlaku s/d <span>31 Oktober 2021</span></div>

                        <b-button block squared variant="outline-info" v-b-toggle.showTableHarga class="m-1">Lihat Table Harga <i class="fas fa-chevron-down"></i></b-button>
                        <b-collapse id="showTableHarga">
                          <b-card no-body>
                            <b-table small responsive :items="priceTbl" :fields="fPriceTbl" :tbody-tr-class="rowClass" @row-clicked="clickRowPrice" class="p-1">
                              <template v-slot:cell(price)="row">
                                <span>Rp {{ separatorNum(row.item.price) }}</span>
                              </template>
                              <template v-slot:cell(first)="row">
                                <span>{{ row.item.first }} ~ {{ row.item.end }}</span>
                              </template>
                            </b-table>
                          </b-card>
                        </b-collapse>

                        <div class="table-responsive">
                          <table class="table table-sm table-borderless">
                            <tbody>
                              <tr>
                                <th>dari Harga</th>
                                <td>Rp. 1.000.000</td>
                              </tr>
                              <tr>
                                <th>Status diskon</th>
                                <td>15%</td>
                              </tr>
                              <tr>
                                <th>-</th>
                                <td>-</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div class="text-danger font-weight-bold">DP <span>10%</span> - Rp <span>500.000</span></div>
                        <div>Status stok: <span>5460</span></div>
                        <div>
                          <b-dropdown variant="info" dropright show-clear>
                            <template #button-content>
                              Berlaku s/d 31 Oktober 2021
                            </template>
                            <b-dropdown-item href="#">31 November 2021</b-dropdown-item>
                            <b-dropdown-item href="#">31 Desember 2021</b-dropdown-item>
                          </b-dropdown>
                        </div>
                      </template>
                    </iq-card>
                  </b-col>
                </b-row>
              </div>

              <div class="col-sm-12 product-description-details">
                <div class="description-tabs mt-5">
                  <ul class="nav nav-tabs justify-content-center" id="myTab-2" role="tablist">
                    <!-- <li class="nav-item">
                      <a class="nav-link active" id="kategori-tab-justify" data-toggle="tab" href="#kategori" role="tab"
                        aria-controls="home" aria-selected="true">Kategori Bahan</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" id="hardis-tab-justify" data-toggle="tab" href="#hardis" role="tab"
                        aria-controls="profile" aria-selected="false">Harga &amp; Discount</a>
                    </li> -->
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
                    <!-- <div class="tab-pane fade show active" id="kategori" role="tabpanel"
                      aria-labelledby="kategori-tab-justify">
                      <b-row align-v="center">
                        <b-form-group class="col-md-6" label="Kategori di RAB" label-for="katrab">
                          <div class="form-group">
                            <b-form-input v-model="materialData.kategori_rab" id="katrab" type="text" readonly>
                            </b-form-input>
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
                        </b-form-group>
                        <b-form-group class="col-md-6" label="Satuan" label-for="satuan">
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
                        </b-form-group>
                        <b-form-group class="col-md-12" label="Keterangan" label-for="keterangan">
                          <div class="form-group">
                            <b-form-textarea readonly id="keterangan" v-model="materialData.material.description"
                              placeholder="Desc" rows="3" max-rows="8" no-resize>
                            </b-form-textarea>
                          </div>
                        </b-form-group>
                      </b-row>
                    </div> -->
                    <!-- <div class="tab-pane fade" id="hardis" role="tabpanel" aria-labelledby="hardis-tab-justify">
                      <b-row>
                        <b-col md="12 mb-5">
                          <b-form-group class="row mb-3" label-cols-sm=3 label="Harga Saat ini"
                            label-for="hargasekarang">
                            <b-form-input readonly id="hargasekarang" v-model="materialData.harga.per_unit"
                              type="number" placeholder="-"></b-form-input>
                          </b-form-group>
                        </b-col>
                        <b-col md="6">
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
                        </b-col>
                      </b-row>
                    </div> -->
                    <div class="tab-pane fade show active" id="datatransport" role="tabpanel"
                      aria-labelledby="datatransport-tab-justify">
                      <b-row>
                        <b-col md="12" class="mb-3">
                          <b-form-group class="row" label-cols-sm="3" label="Start Pengiriman Dari ..."
                            label-for="startkirim">
                            <b-form-input readonly id="startkirim" v-model="materialData.startkirim" type="text"
                              placeholder="CM"></b-form-input>
                          </b-form-group>
                        </b-col>
                        <b-col md="12" class="mb-3">
                          <b-form-group class="row" label-cols-sm="3" label="Bisa kirim gabungan?" label-for="gabungan">
                            <b-form-input readonly id="gabungan" v-model="materialData.material.gabungan" type="text"
                              placeholder="CM"></b-form-input>
                          </b-form-group>
                        </b-col>
                        <b-col md="6">
                          <div class="font-weight-bold text-success text-center border-bottom mb-4">
                            Dimensi Barang
                          </div>
                          <b-form-group class="row mb-3" label-cols-sm="3" label="Dimensi P:" label-for="bdimensip">
                            <b-form-input readonly id="bdimensip" v-model="materialData.material.bdimensip"
                              type="number" placeholder="CM"></b-form-input>
                          </b-form-group>
                          <b-form-group class="row mb-3" label-cols-sm="3" label="Dimensi L:" label-for="bdimensil">
                            <b-form-input readonly id="bdimensil" v-model="materialData.material.bdimensil"
                              type="number" placeholder="CM"></b-form-input>
                          </b-form-group>
                          <b-form-group class="row mb-3" label-cols-sm="3" label="Dimensi T:" label-for="bdimensit">
                            <b-form-input readonly id="bdimensit" v-model="materialData.material.bdimensit"
                              type="number" placeholder="CM"></b-form-input>
                          </b-form-group>
                          <div>M3</div>
                          <b-form-group class="row mb-3" label-cols-sm="3" label="Berat Jenis Kg/M3:"
                            label-for="bberatjenis">
                            <b-form-input readonly id="bberatjenis" v-model="materialData.material.bberatjenis"
                              type="number" placeholder="Kg"></b-form-input>
                          </b-form-group>
                          <b-form-group class="row mb-3" label-cols-sm="3" label="Status Kirim Vendor"
                            label-for="bstatkirim">
                            <b-form-input readonly id="bstatkirim" v-model="materialData.material.bstatkirim"
                              type="text" placeholder="-"></b-form-input>
                          </b-form-group>
                        </b-col>
                        <!-- <b-col md="6">
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
                        </b-col> -->
                      </b-row>
                    </div>
                    <div class="tab-pane fade" id="stock" role="tabpanel" aria-labelledby="stock-tab-justify">
                      <b-row align-v="center">
                        <b-col md="12">
                          <b-form-group class="row mb-3" label-cols-sm="3" label="Stock saat ini" label-for="stock">
                            <b-form-input readonly id="stock" v-model="materialData.stock.available" type="number"
                              placeholder="-">
                            </b-form-input>
                          </b-form-group>
                          <b-row align-v="center" class="mt-3">
                            <b-col md="12">
                              <div class="table-responsive">
                                <table class="table table-stripped">
                                  <thead>
                                    <th>No.</th>
                                    <th>Tanggal</th>
                                    <th>Rencana Stok</th>
                                    <th>Total Akhir</th>
                                  </thead>
                                  <tbody>
                                    <tr v-for="(item, x) in stockFuture" :key="x">
                                      <td>{{ item }}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </b-col>
                          </b-row>
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
    <b-modal id="modalReport" hide-header="true">
      <div>Laporkan, masih dalam pengembangan</div>
    </b-modal>
  </b-container>
</template>
<script>
import {
  core,
  brokenImage
} from '../../config/pluginInit'
import API from '@/services/noauth'
import constant from '@/config/constant'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

const pricetable = [
  {
    first: 100,
    end: 200,
    price: 900000
  }, {
    first: 201,
    end: 300,
    price: 850000,
    status: 1
  }, {
    first: 301,
    end: 400,
    price: 800000
  }, {
    first: 401,
    end: 500,
    price: 750000,
    status: 2
  }, {
    first: 501,
    end: 600,
    price: 700000,
    status: 3
  }
]

export default {
  name: 'vDetailMaterial',
  props: {},
  components: {
    VueSlickCarousel
  },
  mounted () {
    core.index()
    this.getDetailMaterial()
  },
  computed: {},
  data () {
    return {
      materialData: {
        harga: {},
        material: {},
        stock: {},
        vendor: {}
      },
      imageSlick: [],
      priceTbl: pricetable,
      fPriceTbl: [
        { key: 'first', label: 'Volume Jual' },
        { key: 'price', label: 'Harga' }
      ],
      assetUrl: constant.urlAssets,
      userrole: '',
      stockFuture: null,
      stockTbl: [{
        key: 'no',
        label: 'No.',
        sortable: true,
        sortDirection: 'asc'
      }, {
        key: 'pada',
        label: 'Tanggal'
      }, {
        key: 'stok',
        label: 'Rencana Stok'
      }, {
        key: 'total',
        label: 'Total Akhir'
      }],
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
          const dt = response.data.data
          if (response.status === 200) {
            core.showSnackbar('success', 'Load detail berhasil.')
            this.materialData = dt
            this.stockFuture = dt.stock.future
            this.materialData.gabungan = 'Tidak'
            if (dt.material.gabungan) {
              this.materialData.gabungan = 'Gabungan'
            }
            this.imageCarousel(dt.material.image)
          }
        })
    },
    clickRowPrice (row) {
      // console.log(row)
    },
    rowClass (item, type) {
      if (!item || type !== 'row') return 'pointercursor'
      if (item.status === 1) return 'text-white font-weight-bold dot-rec-orange pointercursor'
      if (item.status === 2) return 'text-white font-weight-bold dot-rec-red pointercursor'
      if (item.status === 3) return 'text-white font-weight-bold dot-rec-blue pointercursor'
      if (item.status === undefined) return 'pointercursor'
    },

    cekImg (dt) {
      if (dt != null) {
        const img = dt.split(',')
        return img[0]
      } else {
        return '-'
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
    imageCarousel (e) {
      var arr = []
      if (e.indexOf(',') > -1) {
        const valArr = e.split(',')
        arr = valArr
      } else {
        arr.push(e)
      }
      this.imageSlick = arr
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
  .dot-rec {
    height: 12px;
    width: 12px;
    display: inline-block;
    margin-right: 5px;
  }
  .txt-status {
    font-size: 16px;
    color: #4e4e4e;
  }
  .dot-rec-orange {
    background: orange;
  }
  .dot-rec-red {
    background: #ff0000;
  }
  .dot-rec-blue {
    background: #0000ff;
  }
  .pointercursor {
    cursor: pointer;
  }
  .pointercursor:active, .pointercursor:hover {
    background: darkgray;
  }
  .slick-current {
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-radius: 3px;
  }
  .slick-slide {
    cursor: pointer;
  }
  .slick-slide > div > div > img {
    padding-right: 5px !important;
    padding-left: 5px !important;
    border-radius: 0px !important;
    object-fit: cover;
  }
  .slick-slide > div > div > a > img {
    object-fit: cover;
  }
  .regular-price {
      font-size: 23px;
  }
</style>
