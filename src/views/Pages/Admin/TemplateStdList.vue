<template>
  <b-container fluid="">
    <b-row>
      <b-col md="12" sm="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">List Template</h4>
          </template>
          <template v-slot:body>
            <b-row class="mb-2">
              <b-col md="12">
                <b-button v-b-modal.addTemplateModal variant="success" class="float-right mr-2">Add Template</b-button>
                <b-modal id="addTemplateModal" ref="modalTemplate" size="xl" title="Tambah data template" ok-title="Tambah" @ok="onSubmit" @hidden="resetInfoModal"
                  cancel-title="Batal">
                  <b-container>
                    <b-row>
                      <b-col md="4">
                        <b-form-group label-for="standar_baku" label="Grup Standar Baku RAB">
                          <multiselect label="category" v-model="sendData.standar_baku" :options="standar_baku.map(x => x.id)" :custom-label="opt => standar_baku.find(x => x.id == opt).category" id="standar_baku">
                          </multiselect>
                        </b-form-group>
                      </b-col>
                      <b-col md="4">
                        <b-form-group label-for="grup_pekerjaan_utama" label="Nama Grup Pekerjaan Utama">
                          <multiselect label="category" v-model="sendData.grup_pekerjaan_utama" :options="grup_pekerjaan_utama.map(x => x.id)" :custom-label="opt => grup_pekerjaan_utama.find(x => x.id == opt).category" id="grup_pekerjaan_utama">
                          </multiselect>
                        </b-form-group>
                      </b-col>
                      <b-col md="4">
                        <b-form-group label-for="grup_pelaksana" label="Grup Pelaksanaan">
                          <multiselect label="category" v-model="sendData.grup_pelaksana" :options="grup_pelaksana.map(x => x.id)" :custom-label="opt => grup_pelaksana.find(x => x.id == opt).category" id="grup_pelaksana">
                          </multiselect>
                        </b-form-group>
                      </b-col>
                      <b-col md="6">
                        <b-form-group label-for="kategori_urut" label="Kategori Urut">
                          <b-form-input id="kategori_urut" v-model="sendData.kategori_urut" type="text" placeholder="-"></b-form-input>
                        </b-form-group>
                      </b-col>
                      <b-col md="6">
                        <b-form-group label-for="kategori_zoning" label="Kategori Zoning">
                          <b-form-input id="kategori_zoning" v-model="sendData.kategori_zoning" type="text" placeholder="-"></b-form-input>
                        </b-form-group>
                      </b-col>
                      <b-col md="6">
                        <b-form-group label-for="kategori_bahan" label="Kategori Bahan">
                          <b-form-input id="kategori_bahan" v-model="sendData.kategori_bahan" type="text" placeholder="-"></b-form-input>
                        </b-form-group>
                      </b-col>
                      <b-col md="6">
                        <b-form-group label-for="jenis_pekerjaan_parent" label="Jenis Pekerjaan">
                           <multiselect label="category" v-model="sendData.jenis_pekerjaan_parent" :options="jenis_pekerjaan_parent.map(x => x.id)" :custom-label="opt => jenis_pekerjaan_parent.find(x => x.id == opt).category" id="jenis_pekerjaan_parent">
                          </multiselect>
                        </b-form-group>
                      </b-col>
                    </b-row>
                    <b-row>
                        <b-col md="12">
                            <div class="table-responsive">
                                <table class="">
                                    <thead>
                                        <tr>
                                            <th class="text-center">Jenis</th>
                                            <th class="text-center">Komponen</th>
                                            <th class="text-center">Koefisien Dasar Analisis</th>
                                            <th class="text-center">Satuan</th>
                                            <th class="text-center">Harga</th>
                                            <th class="text-center">Rekomendasi Harga</th>
                                            <th class="text-center">-</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(inp,k) in sendData.items" :key="k">
                                            <td>
                                                <b-form-select size="sm" class="jenis_komponen" v-model="inp.jenis_komponen" :options="selJenKom"></b-form-select>
                                            </td>
                                            <td>
                                                <b-form-input size="sm" class="komponen_name" v-model="inp.komponen_name" type="text" placeholder="-"></b-form-input>
                                            </td>
                                            <td>
                                                <b-form-input size="sm" class="koefisien_dasar" v-model="inp.koefisien_dasar" type="text" placeholder="-"></b-form-input>
                                            </td>
                                            <td>
                                                <b-form-input size="sm" class="satuan" v-model="inp.satuan" type="text" placeholder="-"></b-form-input>
                                            </td>
                                            <td>
                                                <b-form-input size="sm" class="harga" v-model="inp.harga" type="text" placeholder="-"></b-form-input>
                                            </td>
                                            <td>
                                                <b-form-input size="sm" class="rekomendasi_harga" v-model="inp.rekomendasi_harga" type="text" placeholder="-"></b-form-input>
                                            </td>
                                            <td>
                                                <b-button v-if="k > 0" variant="danger" @click="removeMater(k)" class=""><i class="ri-delete-bin-2-fill pr-0"></i></b-button>
                                            </td>
                                            <input type="hidden" ref="load" value="true">
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <b-button variant="primary" @click="addMater">+</b-button>
                        </b-col>
                    </b-row>
                  </b-container>
                </b-modal>
              </b-col>
            </b-row>
            <!-- Main table element -->
            <b-table show-empty stacked="md" :items="getDataList" :fields="fields" :current-page="currentPage" :per-page="perPage" ref="dTable" :filter="filter" :filterIncludedFields="filterOn" :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc" :sort-direction="sortDirection" @filtered="onFiltered">
              <template v-slot:cell(no)="row">
                {{ row.index + 1 }}
              </template>

              <template #cell(actions)="row">
                <div class="d-flex">
                    <b-button size="sm" @click="viewData(row.item.id)" variant="primary" class="mr-1">
                    <div data-icon="" class="icon"></div>
                    </b-button>
                    <b-button size="sm" variant="info" @click="row.toggleDetails" class="mr-1">
                      <div data-icon="" class="icon"></div>
                    </b-button>
                    <b-button size="sm" variant="danger" @click="deleteTemplate(row.item.id)">
                      <div data-icon="" class="icon"></div>
                    </b-button>
                </div>
              </template>

              <template #row-details="row">
                    <div class="table-responsive">
                        <table class="table-striped w-100">
                            <thead>
                                <tr>
                                    <th>Nama Material</th>
                                    <th>Jenis Komponen</th>
                                    <th>Harga</th>
                                    <th>Rekomendasi Harga</th>
                                    <th>Satuan</th>
                                    <th>Koefisien Dasar</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(dt,i) in row.item.list_komponen" :key="i">
                                    <th>{{ dt.komponen_name }}</th>
                                    <th>{{ dt.jenis_komponen }}</th>
                                    <th>Rp {{ dt.harga }}</th>
                                    <th>Rp {{ dt.rekomendasi_harga }}</th>
                                    <th>{{ dt.satuan }}</th>
                                    <th>{{ dt.koefisien_dasar }}%</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
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
  </b-container>
</template>
<script>
import {
  core
} from '../../../config/pluginInit'
import axios from 'axios'
import API from '@/services/admin'
import constant from '@/config/constant'
export default {
  name: 'TemplateStdList',
  props: {},
  mounted () {
    core.index()
    // Set the initial number of items
    this.totalRows = this.listTemplate.index + 1
    // this.getTemplateList()

    this.getDynamicData('standar_baku', 'standard-type')
    this.getDynamicData('grup_pekerjaan_utama', 'grup-pekerjaan-utama')
    this.getDynamicData('grup_pelaksana', 'grup-pelaksana')
    this.getDynamicData('jenis_pekerjaan_parent', 'jenis-pekerjaan-rap')
  },
  data () {
    return {
      loading: false,
      listTemplate: [],
      type: {
        name_type: '',
        status: ''
      },
      fields: [{
        key: 'no',
        label: 'No.',
        sortable: true,
        sortDirection: 'asc'
      },
      {
        key: 'standar_baku_teks',
        label: 'Standar Baku'
      },
      {
        key: 'grup_pekerjaan_utama_teks',
        label: 'Grup Pekerjaan Utama'
      },
      {
        key: 'grup_pelaksana_teks',
        label: 'Grup Pelaksanaan'
      },
      {
        key: 'kategori_urut',
        label: 'Kategori Urut'
      },
      {
        key: 'kategori_zoning',
        label: 'Kategori Zoning'
      },
      {
        key: 'kategori_bahan',
        label: 'Kategori Bahan'
      },
      {
        key: 'jenis_pekerjaan_parent',
        label: 'Jenis Pekerjaan'
      },
      {
        key: 'actions',
        label: 'Tindakan'
      }
      ],
      status: [{
        value: 1,
        text: 'Aktif'
      },
      {
        value: 0,
        text: 'Tidak Aktif'
      }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 20,
      pageOptions: [5, 10, 15],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      infoModal: {
        id: 'info-modal',
        title: '',
        content: ''
      },
      idSave: '',
      sendData: {
        id: '',
        standar_baku: '',
        grup_pekerjaan_utama: '',
        grup_pelaksana: '',
        kategori_urut: '',
        kategori_zoning: '',
        kategori_bahan: '',
        jenis_pekerjaan_parent: '',
        items: [{
          jenis_komponen: '',
          komponen_name: '',
          koefisien_dasar: 0,
          satuan: 0,
          harga: 0,
          rekomendasi_harga: 0
        }]
      },
      standar_baku: [],
      grup_pekerjaan_utama: [],
      grup_pelaksana: [],
      jenis_pekerjaan_parent: [],
      selJenKom: [
        { value: 1, text: 'Material' },
        { value: 2, text: 'Matr. Penunjang' },
        { value: 3, text: 'Jasa' }
      ],
      idTemplate: ''
    }
  },
  computed: {
    sortOptions () {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return {
            text: f.label,
            value: f.key
          }
        })
    }
  },
  methods: {
    onSubmit () {
      if (this.idTemplate !== '') {
        this.sendData.id = this.idTemplate
      }
      delete this.sendData.grup_pekerjaan_utama_teks
      delete this.sendData.grup_pelaksana_teks
      delete this.sendData.jenis_pekerjaan_parent_teks
      delete this.sendData.standar_baku_teks
      axios.post(`${constant.urlAPIPHP}/save_template`, JSON.stringify(this.sendData), {
        headers: {
        }
      }).then(res => {
        this.loading = true
        core.showSnackbar('success', 'Template telah berhasil ditambah.')
        this.getTemplateList()
      }).finally(() => {
        this.loading = false
      }).catch(() => {
        core.showSnackbar('error', 'Maaf, terjadi kesalahan pada sistem.')
      })
    },
    onEdit () {
      this.editTemplate()
    },
    info (item, index, button) {
      this.infoModal.title = `Row index: ${index}`
      this.infoModal.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal () {
      this.sendData = {
        standar_baku: '',
        grup_pekerjaan_utama: '',
        grup_pelaksana: '',
        kategori_urut: '',
        kategori_zoning: '',
        kategori_bahan: '',
        jenis_pekerjaan_parent: '',
        items: [{
          jenis_komponen: '',
          komponen_name: '',
          koefisien_dasar: 0,
          satuan: 0,
          harga: 0,
          rekomendasi_harga: 0
        }]
      }
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    // getTemplateList () {
    //   API.material
    //     .getTemplateList().then(response => {
    //       this.listTemplate = response.data.result
    //     }).finally(() => {
    //       this.loading = false
    //     })
    //   this.loading = true
    //   axios
    //     .get(`${constant.urlAPIPHP}/get_all_template`)
    //     .then(response => (this.listTemplate = response.data.result))
    //     .finally(() => {
    //       this.loading = false
    //     }).catch(err => {
    //       console.log(err.response)
    //     })
    // },
    getDataList (ctx) {
      let currPage = (ctx.currentPage - 1) * ctx.perPage
      if (ctx.currentPage === 1) {
        currPage = 0
      }
      let name = ctx.filter
      if (name === null) {
        name = ''
      }
      return axios
        .get(`${constant.urlAPIPHP}/get_all_template?skip=${currPage}&limit=${ctx.perPage}`).then(response => {
          if (response.status) {
            this.totalRows = response.data.recordsTotal
            const items = response.data.result
            return items || []
          } else if (response.data.errors.length > 0) {
            this.$refs.form.setErrors(response.data.errors)
          }
        }).finally(() => {
          this.loading = false
        })
    },
    getDynamicData (fieldName, colName) {
      API.cat.getCategorybyType(colName).then(response => {
        if (response.status === 200) {
          this[fieldName] = response.data.result
        }
      }).finally(() => { this.loading = false })
    },
    addTemplate () {
      API.material
        .getTemplateList().then(response => {
          if (response.status) {
            core.showSnackbar('success', 'Tipe telah berhasil ditambah.')
            this.getTemplateList()
          }
        }).finally(() => {
          this.loading = false
        })
    },
    viewData (id) {
      this.idTemplate = id
      var fd = new FormData()
      fd.append('pekerjaan[]', id)
      axios.post(`${constant.urlAPIPHP}/get_all_template`, fd).then(response => {
        if (response.status) {
          this.sendData = response.data.result[0]
          this.sendData.items = response.data.result[0].list_komponen
          this.$refs['modalTemplate'].show()
        }
      }).finally(() => {
        this.loading = false
      })
    },
    deleteTemplate (id) {
      var fd = new FormData()
      fd.append('id', id)
      const ask = confirm('Aksi ini akan menghapus semua data turunannya. Tetap hapus?')
      if (ask) {
        axios.post(`${constant.urlAPIPHP}/delete_template`, fd).then(response => {
          if (response.status) {
            core.showSnackbar('success', 'Template telah berhasil dihapus.')
            this.getTemplateList()
          }
        }).finally(() => {
          this.loading = false
        })
      }
    },
    addMater () {
      this.sendData['items'].push({
        jenis_komponen: '',
        komponen_name: '',
        koefisien_dasar: 0,
        satuan: '',
        harga: 0,
        rekomendasi_harga: 0
      })
    },
    removeMater (index) {
      this.sendData.items.splice(index, 1)
    }
  }
}

</script>

<style>
  /* .iq-card-body{
  flex: unset;
} */
  .imgTBL {
    width: 100px;
  }

</style>
