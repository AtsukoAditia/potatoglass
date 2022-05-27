<template>
  <b-container fluid="">
    <b-row>
      <b-col md="12" sm="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">List Type</h4>
          </template>
          <template v-slot:body>
            <b-row class="mb-2">
              <b-col md="12">
                <b-button v-b-modal.addTypeModal variant="success" class="float-right mr-2">Add Type</b-button>
                <b-modal id="addTypeModal" centered title="Tambah data file" ok-title="Tambah" @ok="onSubmit" cancel-title="Batal">
                  <b-container>
                    <b-row>
                      <b-col md="12">
                          <b-form-group
                            label-for="typename"
                            label="Nama Tipe"
                          >
                            <b-form-input id="typename" v-model="type.name_type" type="text" placeholder="-"></b-form-input>
                          </b-form-group>
                      </b-col>
                      <b-col md="12">
                          <b-form-group
                            label-for="typestatus"
                            label="Status"
                          >
                            <b-form-select plain v-model="type.status" :options="status" id="typestatus">
                                </b-form-select>
                          </b-form-group>
                          <!-- <div>Download template type <a href="#" target="_blank">disini</a></div> -->
                      </b-col>
                    </b-row>
                  </b-container>
                </b-modal>
              </b-col>
            </b-row>
            <!-- Main table element -->
            <b-table
              show-empty
              stacked="md"
              :items="getTypeList"
              :fields="fields"
              :current-page="currentPage"
              :per-page="perPage"
              :filter="filter"
              :filterIncludedFields="filterOn"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              :sort-direction="sortDirection"
              @filtered="onFiltered"
              ref="dTable"
            >
              <template v-slot:cell(no)="row">
                {{ row.index + 1 }}
              </template>

              <template v-slot:cell(actions)="row">
                <b-button size="sm" v-b-modal="'editType'" @click="sendInfo(row.item.id)" variant="primary" class="mr-1">
                    <div data-icon="" class="icon"></div>
                </b-button>
                <b-button size="sm" variant="danger" class="mr-1" @click="deleteType(row.item.id)">
                  <div data-icon="" class="icon"></div>
                </b-button>
              </template>
            </b-table>
            <b-modal id="editType" centered title="Ubah data type" ok-title="Ubah" @ok="onEdit" cancel-title="Batal">
                <b-container>
                  <b-row>
                    <b-col md="12">
                        <b-form-group
                          label-for="typename"
                          label="Nama Tipe"
                        >
                          <b-form-input id="typename" v-model="type.name_type" type="text" placeholder="-"></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col md="12">
                        <b-form-group
                          label-for="typestatus"
                          label="Status"
                        >
                          <b-form-select plain v-model="type.status" :options="status" id="typestatus">
                              </b-form-select>
                        </b-form-group>
                        <div>Download template type <a href="#" target="_blank">disini</a></div>
                    </b-col>
                  </b-row>
                </b-container>
              </b-modal>
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
  </b-container>
</template>
<script>
import { core } from '../../../config/pluginInit'
import API from '@/services/admin'
export default {
  name: 'TypeList',
  props: {
  },
  mounted () {
    core.index()
    // Set the initial number of items
    this.totalRows = this.listType.index + 1
  },
  data () {
    return {
      listType: [],
      type: {
        name_type: '',
        status: ''
      },
      fields: [
        { key: 'no', label: 'No.', sortable: true, sortDirection: 'asc' },
        { key: 'name_type', label: 'Nama' },
        {
          key: 'status',
          label: 'Status',
          formatter: (value, key, item) => {
            return value ? 'Aktif' : 'Tidak Aktif'
          },
          sortable: true,
          sortByFormatted: true,
          filterByFormatted: true
        },
        { key: 'actions', label: 'Tindakan' }
      ],
      status: [
        { value: 1, text: 'Aktif' },
        { value: 0, text: 'Tidak Aktif' }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 50,
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
      idSave: ''
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
  methods: {
    onSubmit () {
      this.addType()
    },
    onEdit () {
      this.editType()
    },
    sendInfo (id) {
      API.type
        .getDetailType(id).then(response => {
          if (response.status) {
            this.type = {
              name_type: response.data.result.name_type,
              status: response.data.result.status
            }
            this.idSave = id
          }
        }).finally(() => { this.loading = false })
    },
    info (item, index, button) {
      this.infoModal.title = `Row index: ${index}`
      this.infoModal.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal () {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    getTypeList (ctx) {
      let currPage = (ctx.currentPage - 1) * ctx.perPage
      if (ctx.currentPage === 1) {
        currPage = 0
      }
      return API.type
        .getAllType(currPage, ctx.perPage).then(response => {
          const dt = response.data
          if (response.status === 200) {
            this.totalRows = dt._metadata.total
            const items = dt.result
            return items || []
          } else if (response.data.errors.length > 0) {
            this.$refs.form.setErrors(response.data.errors)
          }
          this.listType = response.data.result
        }).finally(() => { this.loading = false })
    },
    addType () {
      API.type
        .addType(this.type).then(response => {
          if (response.status) {
            core.showSnackbar('success', 'Tipe telah berhasil ditambah.')
            this.getTypeList()
          }
        }).finally(() => { this.loading = false })
    },
    editType () {
      API.type
        .editType(this.idSave, this.type).then(response => {
          if (response.status) {
            core.showSnackbar('success', 'Tipe telah berhasil diubah.')
            this.getTypeList()
          }
        }).finally(() => { this.loading = false })
    },
    deleteType (id) {
      const ask = confirm('Apakah anda ingin menghapus data ini?')
      if (ask) {
        API.type
          .deleteType(id).then(response => {
            if (response.status) {
              core.showSnackbar('success', 'Tipe telah berhasil dihapus.')
              this.getTypeList()
            } else if (response.data.errors.length > 0) {
              this.$refs.form.setErrors(response.data.errors)
              core.showSnackbar('danger', 'Tipe telah gagal dihapus.')
            }
          }).finally(() => { this.loading = false })
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
  width: 100px;
}
</style>
