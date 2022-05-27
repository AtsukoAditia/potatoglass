<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">Daftar Kategori Material</h4>
          </template>
          <template v-slot:headerAction>
          </template>
          <template v-slot:body>
            <b-row class="mb-2">
              <b-col md="4">
              <b-form-group>
                  <b-input-group size="sm">
                    <b-form-input
                      v-model="filter"
                      type="search"
                      id="filterInput"
                      placeholder="Cari data disini"
                    ></b-form-input>
                    <b-input-group-append>
                      <!-- <b-button :disabled="!filter" @click="filter = ''">Clear</b-button> -->
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-row>
            <!-- Main table element -->
            <b-table
              show-empty
              stacked="md"
              :items="getDataList"
              ref="dTable"
              :fields="fields"
              :current-page="currentPage"
              :per-page="perPage"
              :filter="filter"
              @filtered="onFiltered"
            >
              <template v-slot:cell(no)="row">
                <span :v-for="row">
                {{ ((currentPage - 1) * perPage) + (row.index + 1) }}
                </span>
              </template>
              <template v-slot:cell(limit_min_stok)="row">
                {{ separatorNum(row.item.limit_min_stok) }}
              </template>

              <template v-slot:cell(photo)="row">
                <a :href="assetUrl + 'material/' + row.item.photo" target="_blank">
                  <b-img :src="assetUrl + 'material/' + row.item.photo" class="imgTBL" @error="imgError"></b-img>
                </a>
              </template>

              <template v-slot:cell(detail)="row">
                <p>
                  <span v-b-tooltip.hover title="Panjang Dimensi Barang (Cm)"><b>P</b> {{ separatorNum(row.item.panjang) }}</span> x
                  <span v-b-tooltip.hover title="Luas Dimensi Barang (Cm)"><b>L</b> {{ separatorNum(row.item.lebar) }}</span> x
                  <span v-b-tooltip.hover title="Tinggi Dimensi Barang (Cm)"><b>T</b> {{ separatorNum(row.item.tinggi) }}</span>
                  <span class="d-block" v-b-tooltip.hover title="Berat Barang"><b>Berat</b> {{ separatorNum(row.item.berat) }} Kg</span>
                </p>
              </template>

              <template #cell(actions)="row">
                <b-button size="sm" class="mr-1" variant="success" v-b-tooltip.hover title="Setujui Kategori ini?" @click="accVerif(row.item.id)">
                    <div data-icon="S" class="icon"></div>
                </b-button>
                <b-button size="sm" variant="info" @click="row.toggleDetails" class="mr-1">
                  <div data-icon="" class="icon"></div>
                </b-button>
                <b-button size="sm" variant="primary" @click="updMaterial(row.item)" class="mr-1">
                  <div class="icon dripicons-document-edit"></div>
                </b-button>
                <b-button v-b-tooltip.top="'Hapus Material Ini'" size="sm" variant="danger" @click="delMaterial(row.item)" class="mr-1">
                  <div data-icon="" class="icon"></div>
                </b-button>
              </template>

              <template #row-details="row">
                <h5 class="border-bottom mb-2">Detail spesifikasi :</h5>
                <div class="row">
                  <div v-for="(dt,i) in row.item.type" :key="i" class="col-md-4 mb-1">
                    <span class="font-weight-bold">{{ capitalFirst(dt.type_name) }}</span>
                    <div>{{ dt.name_category.replace(/,/g, ", ") }}</div>
                  </div>
                </div>
              </template>
            </b-table>
            <b-col sm="12" md="6" class="my-1">
              <b-pagination
                v-model="currentPage"
                :total-rows="totalRows"
                :per-page="perPage"
                align="fill"
                size="sm"
                class="my-0"
              ></b-pagination>
          </b-col>
          </template>
        </iq-card>
      </b-col>
    </b-row>
    <b-modal id="modalEditMaterial" title="Edit data material" size="lg" ok-title="Edit data" cancel-title="Batal" @ok="updateMaterial" @hidden="resetModalEdit">
        <form>
          <b-container>
            <b-row>
              <b-col md="12">
                    <b-form-group
                      label-for="nama_material"
                      label="Nama Material"
                    >
                      <b-form-input id="nama_material" v-model="materialEdit.nama_material" type="text" placeholder="-"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md="6">
                    <b-form-group
                      label-for="id_merk"
                      label="Merk"
                    >
                      <multiselect v-model="materialEdit.id_merk" id="id_merk" label="category" placeholder="Type to search" open-direction="bottom" :searchable="true" :internal-search="false" :clear-on-select="false" :options="merkSel.map(x => x.id)" :custom-label="opt => merkSel.find(x => x.id == opt).category"></multiselect>
                    </b-form-group>
                </b-col>
                <b-col md="6">
                    <b-form-group
                      label-for="id_satuan"
                      label="Satuan"
                    >
                      <multiselect v-model="materialEdit.id_satuan" id="id_satuan" label="category" placeholder="Type to search" open-direction="bottom" :searchable="true" :internal-search="false" :clear-on-select="false" :options="satuanSel.map(x => x.id)" :custom-label="opt => satuanSel.find(x => x.id == opt).category"></multiselect>
                    </b-form-group>
                </b-col>
                <b-col md="12">
                 <b-form-group
                    label-for="files"
                    label="Photo"
                  >
                    <input
                      type="file"
                      placeholder="Pilih file foto material"
                      id="files"
                      ref="files"
                      v-on:change="handleFileUploads()"
                    >
                  </b-form-group>
                </b-col>
                <b-col md="6">
                    <b-form-group
                      label-for="limit_min_stocks"
                      label="Minimal Stok"
                    >
                      <b-form-input id="limit_min_stocks" v-model="limit_min_stocks" type="number" placeholder="-"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md="6">
                    <b-form-group
                      label-for="type_delivery"
                      label="Pengiriman"
                    >
                      <multiselect v-model="type_deliverys" id="type_delivery" label="category" placeholder="Type to search" open-direction="bottom" :multiple="true" :searchable="true" :internal-search="false" :clear-on-select="false" :options="pengirimanSel.map(x => x.id)" :custom-label="opt => pengirimanSel.find(x => x.id == opt).category"></multiselect>
                    </b-form-group>
                </b-col>
                <b-col md="6">
                    <b-form-group
                      label-for="id_cat_rab"
                      label="Kategori di RAB"
                    >
                      <multiselect v-model="id_cat_rabs" id="id_cat_rab" label="category" placeholder="Type to search" open-direction="bottom" :multiple="true" :searchable="true" :internal-search="false" :clear-on-select="false" :options="catRABSel.map(x => x.id)" :custom-label="opt => catRABSel.find(x => x.id == opt).category">
                      </multiselect>
                    </b-form-group>
                </b-col>
                <b-col md="6">
                    <b-form-group
                      label-for="id_cat_pekerjaan"
                      label="Kategori Pekerjaan"
                    >
                      <multiselect v-model="id_cat_pekerjaans" id="id_cat_pekerjaan" label="category" placeholder="Type to search" open-direction="bottom" :multiple="true" :searchable="true" :internal-search="false" :clear-on-select="false" :options="catPekerjaanSel.map(x => x.id)" :custom-label="opt => catPekerjaanSel.find(x => x.id == opt).category">
                      </multiselect>
                    </b-form-group>
                </b-col>
                <b-col md="6">
                    <b-form-group
                      label-for="id_fungsi"
                      label="Fungsi"
                    >
                      <multiselect v-model="id_fungsis" id="id_fungsi" label="category" placeholder="Type to search" open-direction="bottom" :multiple="true" :searchable="true" :internal-search="false" :clear-on-select="false" :options="fungsiSel.map(x => x.id)" :custom-label="opt => fungsiSel.find(x => x.id == opt).category">
                      </multiselect>
                    </b-form-group>
                </b-col>
                <b-col md="6">
                    <b-form-group
                      label-for="id_bahan"
                      label="Bahan"
                    >
                      <multiselect v-model="id_bahans" id="id_bahan" label="category" placeholder="Type to search" open-direction="bottom" :multiple="true" :searchable="true" :internal-search="false" :clear-on-select="false" :options="bahanSel.map(x => x.id)" :custom-label="opt => bahanSel.find(x => x.id == opt).category">
                      </multiselect>
                    </b-form-group>
                </b-col>
                <b-col md="6">
                    <b-form-group
                      label-for="pemasanganSel"
                      label="Pemasangan"
                    >
                      <multiselect v-model="id_pemasangans" id="pemasanganSel" label="category" placeholder="Type to search" open-direction="bottom" :multiple="true" :searchable="true" :internal-search="false" :clear-on-select="false" :options="pemasanganSel.map(x => x.id)" :custom-label="opt => pemasanganSel.find(x => x.id == opt).category">
                      </multiselect>
                    </b-form-group>
                </b-col>
                <b-col md="12">
                    <div class="font-weight-bold text-success text-center border-bottom mb-4">
                        Dimensi Barang
                    </div>
                </b-col>
                <b-col md="4">
                    <b-form-group
                      label-for="panjang"
                      label="Panjang (Cm)"
                    >
                      <b-form-input id="panjang" v-model="materialEdit.panjang" type="number" placeholder="-"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md="4">
                    <b-form-group
                      label-for="lebar"
                      label="Lebar (Cm)"
                    >
                      <b-form-input id="lebar" v-model="materialEdit.lebar" type="number" placeholder="-"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md="4">
                    <b-form-group
                      label-for="tinggi"
                      label="Tinggi (Cm)"
                    >
                      <b-form-input id="tinggi" v-model="materialEdit.tinggi" type="number" placeholder="-"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md="4">
                    <b-form-group
                      label-for="berat"
                      label="Berat (Kg)"
                    >
                      <b-form-input id="berat" v-model="materialEdit.berat" type="number" placeholder="-"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
          </b-container>
        </form>
    </b-modal>
  </b-container>
</template>
<script>
import { core, brokenImage, urlAssets } from '../../../config/pluginInit'
import API from '@/services/admin'
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'
import constant from '@/config/constant'

export default {
  name: 'MaterialList',
  mounted () {
    core.index()

    this.getDynamicData('catRABSel', 'rab')
    this.getDynamicData('catPekerjaanSel', 'pekerjaan')
    this.getDynamicData('fungsiSel', 'fungsi')
    this.getDynamicData('bahanSel', 'bahan')
    this.getDynamicData('pemasanganSel', 'pemasangan')
    this.getDynamicData('merkSel', 'merk')
    this.getDynamicData('satuanSel', 'satuan')
    this.getDynamicData('pengirimanSel', 'pengiriman')
  },
  data () {
    return {
      fields: [
        { key: 'no', label: 'No.', sortable: true, sortDirection: 'asc' },
        { key: 'photo', label: 'Gambar' },
        { key: 'nama_material', label: 'Nama Material' },
        { key: 'detail', label: 'Dimensi/Berat' },
        // { key: 'merk', label: 'Merk' },
        { key: 'limit_min_stok', label: 'Stok' },
        // { key: 'satuan', label: 'Satuan' }
        // { key: 'status_material_vendor', label: 'Status' },
        { key: 'actions', label: 'Aksi' }
      ],
      assetUrl: urlAssets,
      totalRows: '',
      currentPage: 1,
      perPage: 15,
      pageOptions: [5, 10, 15],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      rowData: [],
      material: {
        id_merk: '',
        id_satuan: '',
        nama_material: '',
        panjang: '',
        lebar: '',
        tinggi: '',
        berat: ''
      },
      materialEdit: {
        id_merk: '',
        id_satuan: '',
        nama_material: '',
        panjang: '',
        lebar: '',
        tinggi: '',
        berat: ''
      },
      id_material_updt: '',
      type_delivery: '',
      type_deliverys: '',
      id_cat_rab: '',
      id_cat_rabs: '',
      id_cat_pekerjaan: '',
      id_cat_pekerjaans: '',
      id_fungsi: '',
      id_fungsis: '',
      id_bahan: '',
      id_bahans: '',
      id_pemasangan: '',
      id_pemasangans: '',
      file: '',
      files: '',
      limit_min_stock: '',
      limit_min_stocks: '',
      statusSel: [
        { value: 1, text: 'Aktif' },
        { value: 0, text: 'Tidak Aktif' }
      ],
      catRABSel: [],
      catPekerjaanSel: [],
      fungsiSel: [],
      bahanSel: [],
      pemasanganSel: [],
      pengirimanSel: [],
      satuanSel: [],
      merkSel: [],
      excelMaterial: null
    }
  },
  computed: {
  },
  components: {
  },
  beforeMount () {
  },
  methods: {
    ...mapActions({
      storeMaterialList: 'masterModule/addMaterialList'
    }),
    ...mapGetters({
      materialList: 'masterModule/materialListState'
    }),

    getDataList (ctx) {
      let currPage = (ctx.currentPage - 1) * ctx.perPage
      if (ctx.currentPage === 1) {
        currPage = 0
      }
      let name = ctx.filter
      var filterName = ''
      if (name === null) {
        filterName = ''
      } else {
        filterName = '&material_name=' + name
      }

      const promise = axios.get(`${constant.urlAPIPHP}/get_material?limit=${ctx.perPage}&skip=${currPage}&status=0${filterName}`)

      return promise.then(response => {
        if (response.status === 200) {
          this.storeMaterialList(response.data.data)
          this.totalRows = response.data._meta.total
          const items = this.materialList()
          return items || []
        }
      })
    },

    idWithCategory ({ id, category }) {
      // eslint-disable-next-line camelcase
      return `${id} — ${category}`
    },

    getDynamicData (fieldName, colName) {
      API.cat.getCategorybyType(colName).then(response => {
        if (response.status === 200) {
          this[fieldName] = response.data.result
        }
      }).finally(() => { this.loading = false })
    },

    accVerif (id) {
      const alert = confirm('Verifikasi kategori ini?')
      if (alert) {
        core.custLoader(true)
        API.material
          .verifyCategory(id).then(response => {
            const dt = response.data
            if (response.status === 200) {
              if (dt.message === 'SUCCESS') {
                core.showSnackbar('success', 'Verifikasi data kategori berhasil.')
                this.$refs.dTable.refresh()
              }
            } else if (response.data.errors.length > 0) {
              this.$refs.form.setErrors(response.data.errors)
              alert('Gagal')
            }
          }).finally(() => {
            core.custLoader(false)
          })
      }
    },

    updateMaterial () {
      const dataPost = new FormData()
      Object.keys(this.materialEdit).forEach(key => {
        dataPost.append(key, this.materialEdit[key])
      })
      dataPost.append('type_delivery', this.type_deliverys)
      dataPost.append('id_cat_rab', this.id_cat_rabs)
      dataPost.append('id_cat_pekerjaan', this.id_cat_pekerjaans)
      dataPost.append('id_fungsi', this.id_fungsis)
      dataPost.append('id_bahan', this.id_bahans)
      dataPost.append('id_pemasangan', this.id_pemasangans)
      dataPost.append('limit_min_stock', parseInt(this.limit_min_stocks))
      dataPost.append('photo', this.files)
      API.material
        .editMaterialPHP(this.id_material_updt, dataPost).then(response => {
          if (response.status === 200) {
            core.showSnackbar('success', 'Data material telah di ubah.')
            this.resetModalEdit()
            this.$refs.dTable.refresh()
          } else {
            core.showSnackbar('danger', 'Data vendor telah gagal di ubah.')
          }
        }).finally(() => { this.loading = false })
    },

    delMaterial (data) {
      const del = confirm('Apakah anda yakin untuk menghapus data ' + data.nama_material + ' ini?')

      if (del) {
        core.custLoader(true)
        API.material
          .deleteMaterialPHP(data.id).then(response => {
            if (response.status === 200) {
              core.showSnackbar('success', 'Data material berhasil di hapus.')
              this.$refs.dTable.refresh()
            }
          }).finally(() => { core.custLoader(false) })
      }
    },
    updMaterial (data) {
      this.$bvModal.show('modalEditMaterial')
      this.id_material_updt = data.id
      this.materialEdit.nama_material = data.nama_material
      this.limit_min_stocks = data.limit_min_stok
      for (let i = 0; i < data.type.length; i++) {
        const dt = data.type[i]
        if (dt.type_id === '1') {
          const id = dt.category_id.split(',')
          this.id_bahans = id.map(Number)
        }
        if (dt.type_id === '2') {
          const id = dt.category_id
          this.materialEdit.id_merk = id
        }
        if (dt.type_id === '3') {
          const id = dt.category_id
          this.materialEdit.id_satuan = id
        }
        if (dt.type_id === '4') {
          const id = dt.category_id.split(',')
          this.id_cat_rabs = id.map(Number)
        }
        if (dt.type_id === '5') {
          const id = dt.category_id.split(',')
          this.id_cat_pekerjaans = id.map(Number)
        }
        if (dt.type_id === '6') {
          const id = dt.category_id.split(',')
          this.id_fungsis = id.map(Number)
        }
        if (dt.type_id === '7') {
          const id = dt.category_id.split(',')
          this.id_pemasangans = id.map(Number)
        }
      }
    },

    resetModalEdit () {
      this.id_material_updt = ''
      this.materialEdit.id_merk = ''
      this.materialEdit.id_satuan = ''
      this.materialEdit.nama_material = ''
      this.limit_min_stocks = ''
      this.id_bahans = ''
      this.id_cat_rabs = ''
      this.id_cat_pekerjaans = ''
      this.id_fungsis = ''
      this.id_pemasangans = ''
      this.limit_min_stocks = ''
    },

    handleFileUpload () {
      this.file = this.$refs.file.files[0]
    },

    handleFileUploads () {
      this.files = this.$refs.files.files[0]
    },

    imgError (e) {
      e.target.src = brokenImage
    },
    capitalFirst (string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
    joinArr (arr) {
      return arr.join(',')
    },
    separatorNum (val) {
      if (typeof val === 'undefined' || val === null || val === 'null') {
        return null
      }
      val = parseFloat(val)
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    nameKeydown (e) {
      if (/^\W$/.test(e.key)) {
        e.preventDefault()
      }
    },
    onFiltered (filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  }
}
</script>

<style>
/* .iq-card-body{
  flex: unset;
} */
.imgTBL {
    width: 70px;
    height: 70px;
    object-fit: cover;
    border-radius: 50%;
}
</style>
