<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">
        <iq-card>
            <template v-slot:headerAction>
            <b-button variant="primary" @click="showModalAdd">Tambah Document</b-button>
          </template>
          <template v-slot:body>
            <b-container fluid>

                <!-- Main table element -->
                <b-table
                :items="getDataList"
                :fields="fields"
                :current-page="currentPage"
                :per-page="perPage"
                :filter="filter"
                :filter-included-fields="filterOn"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :sort-direction="sortDirection"
                stacked="md"
                show-empty
                @filtered="onFiltered"
                ref="dTable"
                >
                    <template v-slot:cell(no)="row">
                        <span :v-for="row">
                            {{ ((currentPage - 1) * perPage) + (row.index + 1) }}
                        </span>
                    </template>

                    <template #cell(actions)="row">
                        <b-button size="sm" variant="info" @click="viewData(row.item)" class="mr-1">
                            <div data-icon="" class="icon"></div>
                        </b-button>
                        <b-button size="sm" @click="editData(row.item)" variant="primary" class="mr-1">
                            <div data-icon="" class="icon"></div>
                        </b-button>
                        <b-button v-b-tooltip.top="'Hapus Dokumen Ini'" size="sm" variant="danger" @click="delDocument(row.item)" class="mr-1">
                            <div data-icon="" class="icon"></div>
                        </b-button>
                    </template>
                </b-table>

                <!-- Info modal -->
                <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
                <pre>{{ infoModal.content }}</pre>
                </b-modal>

                <b-row>
                    <b-col sm="7" md="6" class="my-1">
                        <b-pagination
                        v-model="currentPage"
                        :total-rows="totalRows"
                        :per-page="perPage"
                        align="fill"
                        size="sm"
                        class="my-0"
                        ></b-pagination>
                    </b-col>
                </b-row>
            </b-container>
          </template>
        </iq-card>
      </b-col>
    </b-row>
    <b-modal id="modalAddDocument" ref="modalAddDocument" title="Tambah data document" size="xl" ok-title="Simpan Data" cancel-title="Batal" @ok="addNewDocument" @hidden="resetInfoModal">
        <form>
          <b-container>
            <b-row>
              <b-col md="8">
                    <b-form-group
                      label-for="name_doc"
                      label="Nama Dokumen"
                    >
                      <b-form-input id="name_doc" v-model="doc.name_doc" type="text" placeholder="-"></b-form-input>
                    </b-form-group>
                </b-col>
              <b-col md="4">
                    <b-form-group
                      label-for="type"
                      label="Tipe Dokumen"
                    >
                      <multiselect v-model="doc.type" id="type" label="category" placeholder="Type to search" open-direction="bottom" :searchable="true" :internal-search="false" :clear-on-select="false" :options="typeSel.map(x => x.id)" :custom-label="opt => typeSel.find(x => x.id == opt).category"></multiselect>
                    </b-form-group>
                </b-col>
                <b-col md="12">
                    <ckeditor editorUrl="https://cdn.ckeditor.com/4.14.0/full-all/ckeditor.js" v-model="doc.content" rows="5" cols="70" id="ckfill" name="ckfill" :config="editorConfig"></ckeditor>
                </b-col>
            </b-row>
          </b-container>
        </form>
    </b-modal>
    <b-modal id="addTemplateModal" scrollable ref="modalTemplate" size="xl" :title="titleSPK" @hidden="resetInfoModal" cancel-title="Batal">
        <b-container>
        <b-row>
            <b-col md="12">
                <div v-html="contentSPK">
                    {{ contentSPK }}
                </div>
            </b-col>
        </b-row>
        </b-container>
    </b-modal>
  </b-container>
</template>
<script>
import { core } from '../../../config/pluginInit'
import API from '@/services/admin'
import CKEditor from 'ckeditor4-vue'

export default {
  name: 'DocumentList',
  mounted () {
    core.index()

    this.getDynamicData('typeSel', 'spk')
  },
  data () {
    return {
      fields: [
        { key: 'no', label: 'No.', sortable: true, sortDirection: 'asc' },
        { key: 'type_id', label: 'Tipe' },
        { key: 'name', label: 'Nama' },
        { key: 'actions', label: 'Actions' }
      ],
      editorConfig: {

      },
      doc: {
        name_doc: '',
        type: '',
        content: ''
      },
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15, { value: 100, text: 'Show a lot' }],
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
      typeSel: [],
      contentSPK: '',
      titleSPK: '',
      btnType: '',
      dtId: ''
    }
  },
  computed: {
    sortOptions () {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key }
        })
    }
  },
  components: {
    ckeditor: CKEditor.component
  },
  beforeMount () {
  },
  methods: {
    info (item, index, button) {
      this.infoModal.title = `Row index: ${index}`
      this.infoModal.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal () {
      this.doc.name_doc = ''
      this.doc.type = ''
      this.doc.content = ''
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    getDataList (ctx) {
      let currPage = (ctx.currentPage - 1) * ctx.perPage
      if (ctx.currentPage === 1) {
        currPage = 0
      }
      let name = ctx.filter
      if (name === null) {
        name = ''
      }
      return API.document
        .getDocument(currPage, ctx.perPage).then(response => {
          const dt = response.data
          if (response.status === 200) {
            // this.totalRows = dt._meta.total
            const items = dt.data
            return items || []
          } else if (response.data.errors.length > 0) {
            this.$refs.form.setErrors(response.data.errors)
          }
        }).finally(() => {
          this.loading = false
        })
    },
    showModalAdd () {
      this.btnType = 1
      this.$refs['modalAddDocument'].show()
    },
    addNewDocument () {
      // const dataPost = new FormData()
      // Object.keys(this.doc).forEach(key => {
      //   dataPost.append(key, JSON.stringify(this.doc[key]))
      // })
      if (this.btnType === 1) {
        API.document
          .addDocument(this.doc).then(response => {
            if (response.status === 200) {
              core.showSnackbar('success', 'Data dokumen telah di tambahkan.')
              this.$refs.dTable.refresh()
            } else {
              core.showSnackbar('danger', 'Data dokumen telah gagal ditambahkan.')
            }
          }).finally(() => {
            this.loading = false
            this.doc.name_doc = ''
            this.doc.type = ''
            this.doc.content = ''
            this.$refs['modalAddDocument'].hide()
          })
      } else {
        API.document
          .editDocument(this.dtId, this.doc).then(response => {
            if (response.status === 200) {
              core.showSnackbar('success', 'Data dokumen telah di tambahkan.')
              this.$refs.dTable.refresh()
            } else {
              core.showSnackbar('danger', 'Data dokumen telah gagal ditambahkan.')
            }
          }).finally(() => {
            this.loading = false
            this.doc.name_doc = ''
            this.doc.type = ''
            this.doc.content = ''
            this.$refs['modalAddDocument'].hide()
          })
      }
    },
    delDocument (data) {
      const del = confirm('Apakah anda yakin untuk menghapus data ' + data.name + ' ini?')

      if (del) {
        core.custLoader(true)
        API.document
          .delDocument(data.id, { id: data.id }).then(response => {
            if (response.status === 200) {
              core.showSnackbar('success', 'Data dokumen ini berhasil di hapus.')
              this.$refs.dTable.refresh()
            }
          }).finally(() => { core.custLoader(false) })
      }
    },
    viewData (dt) {
      this.contentSPK = dt.content
      this.titleSPK = dt.name
      this.$refs['modalTemplate'].show()
    },
    editData (dt) {
      this.btnType = 0
      this.doc.name_doc = dt.name
      this.doc.type = dt.type_id
      this.doc.content = dt.content
      this.dtId = dt.id
      this.$refs['modalAddDocument'].show()
    },
    getDynamicData (fieldName, colName) {
      API.cat.getCategorybyType(colName).then(response => {
        if (response.status === 200) {
          this[fieldName] = response.data.result
        }
      }).finally(() => { this.loading = false })
    }
  }
}
</script>

<style>
</style>
