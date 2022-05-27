<template>
    <b-container fluid="">
      <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit()">
    <b-row>
      <b-col md="12" sm="12">
          <iq-card>
            <template v-slot:headerTitle>
              <h4 class="card-title">Informasi Material</h4>
            </template>
            <template v-slot:body>
              <b-row>
                <b-col md="12">
                  <b-form-group label="* Nama Produk :" label-for="alias_name">
                    <ValidationProvider name="Nama Material" rules="required" v-slot="{ errors }">
                    <b-form-input id="alias_name" v-model="material.alias_name" type="text" placeholder="--"></b-form-input>
                      <div class="invalid-feedback">
                        <span>{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>
                  </b-form-group>
                  <b-form-group label="* Keterangan Material :" label-for="description">
                    <ValidationProvider name="Keter" rules="required" v-slot="{ errors }">
                    <ckeditor editorUrl="https://cdnjs.cloudflare.com/ajax/libs/ckeditor/4.17.1/ckeditor.js" v-model="material.description" rows="5" cols="70" id="ckfill" name="ckfill" :config="editorConfig" :class="(errors.length > 0 ? ' is-invalid' : '')"></ckeditor>
                      <div class="invalid-feedback">
                        <span>{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>
                  </b-form-group>
                </b-col>
                <b-col md="4">
                  <b-form-group class="row" label-cols-sm="12" label="* Merk" label-for="merkmtrl">
                    <multiselect v-model="id_merks" id="merkmtrl" :custom-label="opt => merkmtrlSel.find(x => x.id == opt).name_category" placeholder="Pilih salah satu" :options="merkmtrlSel.map(x => x.id)" @select="merkSelAct">
                    </multiselect>
                  </b-form-group>
                </b-col>
                <b-col md="4">
                  <b-form-group class="row" label-cols-sm="12" label="* Kualitas Barang" label-for="gridclass">
                    <multiselect v-model="id_grids" id="gridclass" :custom-label="opt => gridclassSel.find(x => x.id == opt).nama" placeholder="Pilih salah satu" :options="gridclassSel.map(x => x.id)" @select="gridSelAct">
                    </multiselect>
                  </b-form-group>
                </b-col>
                <b-col md="4">
                  <b-form-group label="SKU :" label-for="sku">
                    <b-form-input id="sku" v-model="material.sku" type="text" placeholder="--"></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col md="12">
                  <b-form-group v-if="showUplImg == true" label="* Foto Material" label-for="imageMaterial">
                      <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"
                      @vdropzone-file-added="fileAdded" @vdropzone-sending-multiple="sendingFiles" :useCustomSlot="true">
                      <div class="dropzone-custom-content">
                        <h5 class="dropzone-custom-title">Letakan atau Klik untuk pilih foto untuk Produk</h5>
                        <div class="subtitle">Peringatan : file foto maksimal adalah 2MB</div>
                    </div>
                      </vue-dropzone>
                  </b-form-group>
                </b-col>
              </b-row>
            </template>
          </iq-card>

          <iq-card>
                <template v-slot:headerTitle>
                  <b-badge class="float-right mt-2" v-b-modal.modalHarga style="cursor:pointer;" variant="info">Cek Harga Pasar</b-badge>
                  <h4 class="card-title font-weight-bold">Pengaturan Harga</h4>
                  <span class="text-muted">Berikan harga terbaik agar cepat laku</span>
                </template>
                <template v-slot:body>
                  <b-row>
                    <b-col md="12">
                      <b-form-group label="* Harga Saat ini" label-for="hargasekarang">
                      <ValidationProvider name="Harga Material" rules="required" v-slot="{ errors }">
                        <b-input-group size="md" prepend="Rp">
                          <money v-model="material.hargasekarang" id="hargasekarang" v-bind="money" :class="'form-control' + (errors.length > 0 ? ' is-invalid' : '')"></money>
                        </b-input-group>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                      </b-form-group>
                        <b-modal id="modalHarga" centered title="Harga Pasar Kategori Material" @show="getModalRating()">
                      <b-row>
                        <b-col md="6" class="text-center text-dark">
                          <div>Terendah</div>
                          <div class="font-weight-bold">Rp {{separatorNum(rating.min)}}</div>
                        </b-col>
                        <b-col md="6" class="text-center text-dark">
                          <div>Tertinggi</div>
                          <div class="font-weight-bold">Rp {{separatorNum(rating.max)}}</div>
                        </b-col>
                        <b-col md="12" class="text-center text-dark">
                          <div>Harga Rata-Rata</div>
                          <div class="font-weight-bold">Rp {{separatorNum(rating.avg)}}</div>
                        </b-col>
                      </b-row>
                      <hr>
                      <b-tabs content-class="mt-3" fill>
                        <b-tab title="Terendah" active>
                          <b-table :fields="ratingHead" :items="ratingMin">
                            <template v-slot:cell(no)="row">
                              <span :v-for="row">
                                {{ ((currentPage - 1) * perPage) + (row.index + 1) }}
                              </span>
                            </template>
                            <template v-slot:cell(material_name)="row">
                              <router-link :to="`material/${row.item.m_id}`">
                                {{ row.item.material_name }}
                              </router-link>
                            </template>
                            <template v-slot:cell(vendor_name)="row">
                              <router-link :to="`profile/${row.item.id}`">
                                {{ row.item.vendor_name }}
                              </router-link>
                            </template>
                            <template v-slot:cell(harga)="row">
                                Rp {{ separatorNum(row.item.harga) }}
                            </template>
                          </b-table>
                        </b-tab>
                        <b-tab title="Rata-Rata">
                          <b-table :fields="ratingHead" :items="ratingAvg">
                            <template v-slot:cell(no)="row">
                              <span :v-for="row">
                                {{ ((currentPage - 1) * perPage) + (row.index + 1) }}
                              </span>
                            </template>
                            <template v-slot:cell(material_name)="row">
                              <router-link :to="`material/${row.item.m_id}`">
                                {{ row.item.material_name }}
                              </router-link>
                            </template>
                            <template v-slot:cell(vendor_name)="row">
                              <router-link :to="`profile/${row.item.id}`">
                                {{ row.item.vendor_name }}
                              </router-link>
                            </template>
                            <template v-slot:cell(harga)="row">
                                Rp {{ separatorNum(row.item.harga) }}
                            </template>
                          </b-table>
                        </b-tab>
                        <b-tab title="Tertinggi">
                          <b-table :fields="ratingHead" :items="ratingMax">
                            <template v-slot:cell(no)="row">
                              <span :v-for="row">
                                {{ ((currentPage - 1) * perPage) + (row.index + 1) }}
                              </span>
                            </template>
                            <template v-slot:cell(material_name)="row">
                              <router-link :to="`material/${row.item.m_id}`">
                                {{ row.item.material_name }}
                              </router-link>
                            </template>
                            <template v-slot:cell(vendor_name)="row">
                              <router-link :to="`profile/${row.item.id}`">
                                {{ row.item.vendor_name }}
                              </router-link>
                            </template>
                            <template v-slot:cell(harga)="row">
                                Rp {{ separatorNum(row.item.harga) }}
                            </template>
                          </b-table>
                        </b-tab>
                      </b-tabs>
                    </b-modal>
                    </b-col>
                    <!-- <b-col md="6">
                        <b-form-group label="Stock Barang" label-for="stock">
                            <money v-model="material.stock" id="stock" v-bind="money" class="form-control"></money>
                        </b-form-group>
                    </b-col> -->
                    <br class="mb-3">
                    <b-col md="12">
                        <h5 class="mb-3">
                          <b-form-checkbox class="d-inline" v-model="checkDisc"></b-form-checkbox> Atur Diskon Untuk Grup Penjualan
                          <div v-if="checkDisc == true" class="d-inline ml-3">
                          </div>
                          </h5>
                        <div v-if="checkDisc == true">
                          <b-row v-for="(input,k) in price" :key="k">
                            <b-col md="5">
                              <b-form-group class="mb-3" label-cols-sm="4" :label="`Target volume penjualan ${ k + 1 }:`">
                                <b-input-group size="md" prepend="Qty">
                                  <money v-model="input.min_order" v-bind="money" class="form-control disvol1"></money>
                                </b-input-group>
                              </b-form-group>
                            </b-col>
                            <b-col md="5">
                              <b-form-group class="mb-3" label-cols-sm="4" :label="`Discount target volume ${ k + 1 }`">
                                <b-input-group size="lg" append="%">
                                  <money v-model="input.discount" v-bind="money" class="form-control disvol1"></money>
                                </b-input-group>
                              </b-form-group>
                            </b-col>
                            <b-col md="1">
                              <span>
                                <b-button v-if="price.length > 2" variant="danger" @click="removePrice(k)">hapus
                                </b-button>
                              </span>
                            </b-col>
                          </b-row>
                          <b-button variant="success" @click="addPrice" class="float-right">... Tambah lagi</b-button>
                        </div>
                    </b-col>
                  </b-row>
                </template>
              </iq-card>

          <iq-card>
            <template v-slot:headerTitle>
              <h4 class="card-title">Berat & Pengiriman</h4>
            </template>
            <template v-slot:body>
              <b-row>
                <b-col md="4" class="mb-3">
                  <b-form-group class="row" label-cols-sm="12" label="Mulai Pengiriman Dari..." label-for="startkirim">
                      <ValidationProvider name="Gudang" rules="required" v-slot="{ errors }">
                          <multiselect v-model="material.startkirim" deselect-label="Tidak bisa menghapus" id="startkirim" track-by="nama_gudang" label="nama_gudang" placeholder="Pilih Gudang barang..." :allow-empty="false" :options="startKirimSel.map(x => parseInt(x.id))" :custom-label="opt => startKirimSel.find(x => x.id == opt).nama_gudang" :class="(errors.length > 0 ? ' is-invalid' : '')">
                          </multiselect>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                          <b-button variant="info" size="sm" class="float-right btn-boma mt-2" @click="toGudang">+ Tambah Gudang Baru</b-button>
                    </b-form-group>
                </b-col>
                <b-col md="4" class="mb-3">
                  <b-form-group class="row" label-cols-sm="12" label="Bisa kirim gabungan?" label-for="gabungan">
                    <ValidationProvider name="Kirim Gabungan" rules="required" v-slot="{ errors }">
                    <multiselect v-model="material.gabunganm" deselect-label="Tidak bisa menghapus" id="gabungan" track-by="nama" label="nama" placeholder="Pilih salah satu" :options="gabunganSel" :allow-empty="false" :class="(errors.length > 0 ? ' is-invalid' : '')">
                    </multiselect>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                </b-col>
                <b-col md="4" class="mb-3">
                  <b-form-group class="row" label-cols-sm="12" label="Barang mudah pecah?" label-for="fragile">
                    <ValidationProvider name="Fragile" rules="required" v-slot="{ errors }">
                    <multiselect v-model="material.fragile" deselect-label="Tidak bisa menghapus" id="fragile" track-by="nama" label="nama" placeholder="Pilih salah satu" :options="fragileSel" :allow-empty="false" :class="(errors.length > 0 ? ' is-invalid' : '')">
                    </multiselect>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                </b-col>
                <b-col md="6">
                  <div class="card">
                    <div class="card-body" style="border: 1px #e8e8e8 solid;border-radius: 3px;">
                      <div class="font-weight-bold text-success mb-3">
                          * Dimensi Barang
                      </div>
                      <b-form-group class="row mb-3" label-cols-sm="3" label="Dimensi P:" label-for="bdimensip">
                    <ValidationProvider name="Panjang" rules="required" v-slot="{ errors }">
                          <b-input-group size="md" append="CM">
                            <b-form-input id="bdimensip" v-model.number="material.bdimensip" type="number" placeholder="--" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                          </b-input-group>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                      </b-form-group>
                      <b-form-group class="row mb-3" label-cols-sm="3" label="Dimensi L:" label-for="bdimensil">
                    <ValidationProvider name="Lebar" rules="required" v-slot="{ errors }">
                          <b-input-group size="md" append="CM">
                            <b-form-input id="bdimensil" v-model.number="material.bdimensil" type="number" placeholder="--" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                          </b-input-group>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                      </b-form-group>
                      <b-form-group class="row mb-3" label-cols-sm="3" label="Dimensi T:" label-for="bdimensit">
                    <ValidationProvider name="Tinggi" rules="required" v-slot="{ errors }">
                          <b-input-group size="md" append="CM">
                            <b-form-input id="bdimensit" v-model.number="material.bdimensit" type="number" placeholder="--" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                          </b-input-group>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                      </b-form-group>
                      <div>M3</div>
                      <b-form-group class="row mb-3" label-cols-sm="3" label="Berat Jenis Kg/M3:" label-for="bberatjenis">
                    <ValidationProvider name="Berat" rules="required" v-slot="{ errors }">
                          <b-input-group size="md" append="KG">
                            <b-form-input id="bberatjenis" v-model.number="material.bberatjenis" type="number" placeholder="--" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                          </b-input-group>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                      </b-form-group>
                    </div>
                  </div>
                </b-col>
                <b-col md="6">
                  <div class="card">
                    <div class="card-body" style="border: 1px #e8e8e8 solid;border-radius: 3px;">
                      <div class="font-weight-bold text-success mb-3">
                           Dimensi Packaging (Sudah dalam pengemasan)

                        <b-form-checkbox
                          id="checkbox-1"
                          v-model="checkDimensi"
                          @change="sameWithGood($event)"
                          name="checkbox-1"
                        > Dimensi 5% Dari Dimensi Barang
                        </b-form-checkbox>
                      </div>
                      <b-form-group class="row mb-3" label-cols-sm="3" label="Dimensi P:" label-for="pdimensip">
                          <b-input-group size="md" append="CM">
                            <b-form-input id="pdimensip" :disabled="checkDimensi == true" v-model.number="material.pdimensip" type="number" placeholder="CM"></b-form-input>
                          </b-input-group>
                      </b-form-group>
                      <b-form-group class="row mb-3" label-cols-sm="3" label="Dimensi L:" label-for="pdimensil">
                          <b-input-group size="md" append="CM">
                            <b-form-input id="pdimensil" :disabled="checkDimensi == true" v-model.number="material.pdimensil" type="number" placeholder="CM"></b-form-input>
                          </b-input-group>
                      </b-form-group>
                      <b-form-group class="row mb-3" label-cols-sm="3" label="Dimensi T:" label-for="pdimensit">
                          <b-input-group size="md" append="CM">
                            <b-form-input id="pdimensit" :disabled="checkDimensi == true" v-model.number="material.pdimensit" type="number" placeholder="CM"></b-form-input>
                          </b-input-group>
                      </b-form-group>
                      <div>M3</div>
                      <b-form-group class="row mb-3" label-cols-sm="3" label="Berat Jenis Kg/M3:" label-for="pberatjenis">
                          <b-input-group size="md" append="KG">
                            <b-form-input id="pberatjenis" :disabled="checkDimensi == true" v-model.number="material.pberatjenis" type="number" placeholder="Kg"></b-form-input>
                          </b-input-group>
                      </b-form-group>
                    <!-- <b-form-group class="row mb-3" label-cols-sm="3" label="Status Kirim" label-for="pstatkirim">
                        <b-form-input id="pstatkirim" v-model.number="material.pstatkirim" type="text" placeholder="-"></b-form-input>
                    </b-form-group> -->
                      </div>
                    </div>
                </b-col>
              </b-row>
            </template>
          </iq-card>

          <b-row>
            <b-col lg="12">
              <div class="iq-edit-list">
                  <b-button variant="primary" @click="updateMaterialAct" type="submit" class="mb-3 float-right mr-1 btn-lg w-25"><i class="ri-bill-fill"></i>Ubah Data</b-button>
                  <b-button variant="danger" class="mb-3 float-right mr-1 btn-lg w-25"><i class="ri-close-line"></i>Batalkan</b-button>
              </div>
            </b-col>
          </b-row>
      </b-col>
    </b-row>
      </form>
  </ValidationObserver>
  </b-container>
</template>
<script>
import { core, urlAssets } from '../../../config/pluginInit'
import API from '@/services/vendor/material'
import debounce from 'lodash.debounce'
import { mapGetters } from 'vuex'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import { Money } from 'v-money'
import CKEditor from 'ckeditor4-vue'
import VueDropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import APIgudang from '@/services/vendor/warehouse'

export default {
  name: 'editMaterialVendor',
  mounted () {
    core.index()

    this.getWarehouse()
    this.getMerk('merk')
    this.getMaterialDetail()
  },
  data () {
    return {
      material: {
        katrab: '',
        katbahan: '',
        pasbidang: '',
        bahanutama: '',
        alias_name: '',
        sku: '',
        fungsimaterial: '',
        kmaterial: '',
        id_material: '',
        description: '',
        bdimensip: '',
        bdimensil: '',
        bdimensit: '',
        bberatjenis: '',
        // bstatkirim: '',
        pdimensip: '',
        pdimensil: '',
        pdimensit: '',
        pberatjenis: '',
        gridclass: '',
        startkirim: '',
        gabungan: '',
        gabunganm: '',
        fragile: '',
        harga_material: '',
        merkmtrl: ''
      },
      showUplImg: true,
      dateRange: {
        startDate: null,
        endDate: null
      },
      opens: '',
      minDate: '',
      maxDate: '',
      singleDatePicker: '',
      timePicker: '',
      timePicker24Hour: '',
      showWeekNumbers: '',
      showDropdowns: '',
      autoApply: '',
      linkedCalendars: '',
      imgMaterial: [],
      isDisable: true,
      price: [
        {
          min_order: '',
          discount: ''
        },
        {
          min_order: '',
          discount: ''
        },
        {
          min_order: '',
          discount: ''
        }
      ],
      // stockLater: [
      //   {
      //     laterstock: '',
      //     datestock: '',
      //     totalstock: ''
      //   },
      //   {
      //     laterstock: '',
      //     datestock: '',
      //     totalstock: ''
      //   }
      // ],
      selInpOption: '',
      selInp: [
        { id: 2, nama: ' Input Manual' },
        { id: 1, nama: ' Cari Kategori' }
      ],
      statKirimVendorSel: [
        { id: 1, nama: 'Oleh Ekspedisi' },
        { id: 2, nama: 'Vendor kirim ke proyek' },
        { id: 3, nama: 'Vendor kirim ke pool' }
      ],
      fragileSel: [
        { id: 1, nama: 'Ya, Mudah Pecah' },
        { id: 2, nama: 'Tidak, Sangat Kuat' }
      ],
      startKirimSel: [],
      gabunganSel: [
        { id: 1, nama: 'Bisa Kirim Gabungan' },
        { id: 0, nama: 'Tidak, Kirim Sendiri' }
      ],
      gridclassSel: [
        { id: 1, nama: 'Mewah Sekali' },
        { id: 2, nama: 'Mewah' },
        { id: 3, nama: 'Semi Mewah' },
        { id: 4, nama: 'Standard Lux' },
        { id: 5, nama: 'Standard' },
        { id: 6, nama: 'Semi Standard' },
        { id: 7, nama: 'Standard Bawah' }
      ],
      kmaterialSel: [],
      katRabSel: [],
      funcMaterialSel: [],
      katBahanSel: [],
      pasBidangSel: [],
      bahanUtamaSel: [],
      namaMaterialSel: [
        { id: 1, nama: 'Besi Beton' },
        { id: 2, nama: 'Cat Dusemi Mewah' }
      ],
      rpPercent: [
        { value: 1, text: '%' },
        { value: 2, text: 'Rp' }
      ],
      checkDisc: false,
      checkStock: false,
      money: {
        thousands: '.',
        precision: 0,
        masked: false
      },
      merkmtrlSel: [],
      id_cat_rabs: '',
      id_fungsis: '',
      id_bahans: '',
      id_pemasangans: '',
      id_merks: '',
      id_grids: '',
      assetUrl: urlAssets,
      photos: '',
      rating: {
        max: '',
        min: '',
        avg: '',
        position: ''
      },
      ratingHead: [
        {
          key: 'no',
          label: 'No.',
          sortable: true,
          sortDirection: 'asc'
        }, {
          key: 'material_name',
          label: 'Material'
        }, {
          key: 'harga',
          label: 'Harga'
        }, {
          key: 'vendor_name',
          label: 'Toko'
        }
      ],
      ratingMin: [],
      ratingAvg: [],
      ratingMax: [],
      totalRows: '',
      currentPage: 1,
      perPage: 15,
      pageOptions: [5, 10, 15],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      stockComing: [{
        qty: '',
        date: ''
      }],
      dsbAddMaterial: '',
      editorConfig: {
        toolbar: [
          ['Bold', 'Italic', 'Underline', 'StrikeThrough', '-', 'Undo', 'Redo', '-', 'Cut', 'Copy', 'Paste', 'Find', 'Replace']
        ]
      },
      checkDimensi: false,
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 150,
        maxFilesize: 3,
        acceptedFiles: '.jpeg,.jpg,.png',
        headers: { 'My-Awesome-Header': 'header value' },
        addRemoveLinks: true,
        paramName: function (n) {
          return 'file[]'
        },
        uploadMultiple: true
      }
    }
  },
  computed: {
    ...mapGetters({
      getUserState: 'Setting/dataUserState'
    })
  },
  components: {
    ckeditor: CKEditor.component,
    VueDropzone,
    // DateRangePicker,
    Money },
  methods: {
    updateMaterialAct () {
      let formData = new FormData()
      formData.append('id_material', this.material.id_material)
      formData.append('alias_name', this.material.alias_name)
      formData.append('sku', this.material.sku)
      formData.append('description', this.material.description)
      formData.append('bdimensip', this.material.bdimensip)
      formData.append('bdimensil', this.material.bdimensil)
      formData.append('bdimensit', this.material.bdimensit)
      formData.append('bberatjenis', this.material.bberatjenis)
      formData.append('gridclass', this.material.gridclass)
      formData.append('fragile', this.material.fragile.id)
      formData.append('merk', this.material.merkmtrl)
      for (let i = 0; i < this.imgMaterial.length; i++) {
        const imgD = this.imgMaterial[i]
        for (let a = 0; a < imgD.length; a++) {
          formData.append('image[]', imgD[a])
        }
      }
      formData.append('price', this.material.harga_material)

      API.material
        .editPHP(this.material.m_id, formData).then(response => {
          if (response.status === 200) {
            core.showSnackbar('success', 'Ubah material berhasil...')
            this.$router.replace('/material')
          }
        })
    },

    addStockMaterial (id) {
      const dataStock = {
        m_id: id,
        jumlah_material: parseInt(this.material.stock)
      }
      API.material
        .addStock(dataStock).then(response => {
          if (response.status === 200) {
            if (this.checkStock === true) {
              this.addStockFuture(id)
            }

            core.showSnackbar('success', 'set stok berhasil.')
            if (this.checkDisc === false) {
              this.$router.replace('/material')
            }
          }
        })
    },

    fileAdded (file) {
      // console.log(file)
      // this.imgMaterial = []
      // var selectedFiles = file
      // this.imgMaterial.push(selectedFiles)
    },
    sendingFiles (files, xhr, formData) {
      // console.log(files)
      this.imgMaterial.push(files)
      // console.log(this.imgMaterial)
    },

    addStockFuture (id) {
      API.material
        .addStockFuture(id, this.stockComing).then(response => {
          if (response.status === 200) {
          }
        })
    },

    getMaterialDetail () {
      API.material
        .getList(0, 1, '', this.$route.params.id, '').then(response => {
          const dt = response.data
          this.id_merks = dt.data[0].merk
          this.id_grids = dt.data[0].gridclass
          this.material = dt.data[0]
        })
    },

    getModalRating () {
      API.material
        .getRatingMaterial(this.material.kmaterial.id).then(response => {
          const dt = response.data
          if (response.status === 200) {
            this.rating = dt.data
          }
        })
      API.material
        .getRatingMax(this.material.kmaterial.id).then(response => {
          const dt = response.data
          if (response.status === 200) {
            this.ratingMax = dt.data
          }
        })
      API.material
        .getRatingAvg(this.material.kmaterial.id).then(response => {
          const dt = response.data
          if (response.status === 200) {
            this.ratingAvg = dt.data
          }
        })
      API.material
        .getRatingMin(this.material.kmaterial.id).then(response => {
          const dt = response.data
          if (response.status === 200) {
            this.ratingMin = dt.data
          }
        })
    },

    getWarehouse () {
      return APIgudang
        .getList(0, 100).then(response => {
          if (response.status) {
            this.startKirimSel = response.data.data
          } else if (response.data.errors.length > 0) {
            this.$refs.dTable.setErrors(response.data.errors)
          }
        }).catch(() => {}).finally(() => {
          this.loading = false
        })
    },
    getMerk (merk) {
      return API.material
        .getMerkMaster(0, 1000, merk).then(response => {
          const dt = response.data
          if (response.status) {
            this.merkmtrlSel = dt.data
          } else if (response.data.errors.length > 0) {
            this.$refs.dTable.setErrors(response.data.errors)
          }
        }).catch(() => {}).finally(() => {
          this.loading = false
        })
    },

    addHargaMaterial (id) {
      const dataPrice = {
        m_id: id,
        vp: this.price
      }

      API.material
        .addPriceVP(dataPrice).then(response => {
          if (response.status === 200) {
            core.showSnackbar('success', 'set harga berhasil...')
            this.$router.replace('/material')
          }
        }).catch(() => {
          core.showSnackbar('error', 'set harga gagal...')
        })
    },

    toGudang () {
      this.$router.push({
        name: 'warehouse.warehouse'
      })
    },

    uploadImage (id) {
      core.custLoader(true)
      let formData = new FormData()
      formData.append('m_id', id)
      for (let i = 0; i < this.imgMaterial.length; i++) {
        formData.append('image', this.imgMaterial[i])
      }
      API.material
        .uploadImage(formData).then(response => {
          if (response.result === 'Success') {
            core.showSnackbar('success', 'Upload gambar material berhasil...')
          }
        }).catch(() => {
          core.showSnackbar('error', 'Upload gambar material gagal...')
        })
    },

    limitText (count) {
      return `and ${count} other countries`
    },
    asyncFind: debounce(
      function (name) {
        if (name) {
          API.material
            .getMasterPHP(name).then(response => {
              this.kmaterialSel = response.data.data
              // this.isDisable = true
            })
        }
      }, 1000),

    addPrice () {
      this.price.push({
        min_order: '',
        discount: ''
      })
    },

    merkSelAct (e) {
      this.material.merkmtrl = e
    },
    gridSelAct (e) {
      this.material.gridclass = e
    },

    removePrice (index) {
      this.price.splice(index, 1)
    },

    addStock () {
      this.stockComing.push({
        qty: '',
        date: ''
      })
    },

    removeStock (index) {
      this.stockComing.splice(index, 1)
    },

    updateValues () {
    },
    checkOpen () {
    },

    previewImage: function (event) {
      this.imgMaterial = []
      var selectedFiles = event.target.files
      if (selectedFiles.length > 4) {
        document.getElementById('inputImgMaterial').value = null
        alert('Maksimal gambar material adalah 4')
      } else {
        for (let i = 0; i < selectedFiles.length; i++) {
          this.imgMaterial.push(selectedFiles[i])

          let reader = new FileReader()
          reader.onload = (e) => {
            this.$refs.image[i].src = reader.result
          }

          reader.readAsDataURL(this.imgMaterial[i])
        }
      }
    },

    formatBytes (bytes, decimals = 2) {
      if (bytes === 0) return '0 Bytes'

      const k = 1024
      const dm = decimals < 0 ? 0 : decimals
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

      const i = Math.floor(Math.log(bytes) / Math.log(k))

      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
    },

    getDateStartEnd (date) {
      var today = new Date(date)
      const dd = String(today.getDate()).padStart(2, '0')
      const mm = String(today.getMonth() + 1).padStart(2, '0')
      const yyyy = today.getFullYear()

      today = dd + '/' + mm + '/' + yyyy
      return today
    },
    nameKeydown (e) {
      if (/^\W$/.test(e.key)) {
        e.preventDefault()
      }
    },
    separatorNum (val) {
      if (typeof val === 'undefined' || val === null || val === 'null') {
        return null
      }
      val = parseFloat(val)
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    toggleCheckbox () {
      // console.log(this.checkbox)
      if (!this.checkbox) {
        this.showUplImg = true
      } else {
        this.showUplImg = false
      }
      this.checkbox = !this.checkbox
    },

    sameWithGood (a) {
      if (a) {
        this.material.pdimensip = this.material.bdimensip + this.material.bdimensip * 5 / 100
        this.material.pdimensil = this.material.bdimensil + this.material.bdimensil * 5 / 100
        this.material.pdimensit = this.material.bdimensit + this.material.bdimensit * 5 / 100
        this.material.pberatjenis = this.material.bberatjenis
      } else {
        this.material.pdimensip = ''
        this.material.pdimensil = ''
        this.material.pdimensit = ''
        this.material.pberatjenis = ''
      }
    }
  }
}

</script>

<style>
/* .iq-card-body{
  flex: unset;
} */
.bg-form-custom {
    /* background: #f5f5f5; */
    padding: 10px 20px;
    border-radius: 15px;
    border: 1px #d7dbda solid;
}
.custom-control-label::before {
    width: 1.5rem;
    height: 1.5rem;
}
.custom-control-label::after {
    top: 0.20rem;
    left: -1.52rem;
    width: 1.5rem;
    height: 1.5rem;
}
.custom-control-input {
    width: 1.5rem;
    height: 1.80rem;
}
.custom-control-inline {
  margin-right: 3rem;
}
.custom-radio {
  float: right;
}
.reportrange-text {
  padding: 0px 10px !important;
}
.custom-file-label {
  overflow: hidden;
}
.previewMaterial {
  object-fit: cover;
  height: 50px;
}
#hargasebelum, #hargasekarang, .disvol1 {
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
  border: 1px solid #e9edf4;
}
.tarvol1 {
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
  border: 1px solid #e9edf4;
}
#description {
  line-height: 25px !important;
  resize: vertical !important;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 21px;
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
      height: 14px;
    width: 14px;
    left: 4px;
    bottom: 3px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #126ede;
}

input:focus + .slider {
  box-shadow: 0 0 1px #101010;
}

input:checked + .slider:before {
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
    font-size: 10pt;
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
.form-control {
  border-radius: 3px !important;
}
.iq-header-title {
  width: 100%;
}
</style>
