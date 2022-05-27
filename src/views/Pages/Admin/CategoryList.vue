<template>
  <b-container fluid="">
    <b-row>
      <b-col md="12" sm="12">
        <iq-card>
          <template v-slot:headerTitle>
            <b-button v-b-modal.addCategoryModal variant="success" class="float-right mr-2">Tambah Kategori</b-button>
            <b-modal id="addCategoryModal" centered title="Tambah data file" ok-title="Tambah" @show="onAddShow" @ok="onSubmit" cancel-title="Batal">
              <b-container>
                <b-row>
                  <b-col md="12">
                      <b-form-group
                        label-for="categoryname"
                        label="Nama Category"
                      >
                        <b-form-input id="categoryname" v-model="category.name_category" type="text" placeholder="-"></b-form-input>
                      </b-form-group>
                  </b-col>
                  <b-col md="12">
                      <b-form-group
                        label-for="categorytype"
                        label="Type"
                      >
                            <multiselect id="categorytype" v-model="category.master_type_id" :options="listType" :custom-label="idWithName" placeholder="Pilih type category" label="name_type" track-by="name_type"></multiselect>
                      </b-form-group>
                  </b-col>
                  <b-col md="12">
                      <b-form-group
                        label-for="categorystatus"
                        label="Status"
                      >
                        <b-form-select plain v-model="category.status" :options="status" id="categorystatus">
                            </b-form-select>
                      </b-form-group>
                      <!-- <div>Download template category <a href="#" target="_blank">disini</a></div> -->
                  </b-col>
                </b-row>
              </b-container>
            </b-modal>
          </template>
          <template v-slot:body>
            <b-row>
              <div class="col-3">
                <h5>Daftar Tipe Menu</h5>
                <hr>
                <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                  <a v-for="(tab,k) in tabName" :key="k" class="nav-link" :id="`v-pills-type-tab${ tab.id }`" data-toggle="pill" :href="`#v-pills-type${ tab.id }`" role="tab" :aria-controls="`v-pills-type${ tab.id }`" aria-selected="true" @click="findCategory(tab.name_type)">{{ tab.name_type.toUpperCase() }}</a>
                </div>
              </div>
              <div class="col-9">
                <h5>Daftar Kategori</h5>
                <hr>
                <div class="tab-content" id="v-pills-tabContent">
                  <div v-for="(tab,k) in tabName" :key="k" class="tab-pane fade" :id="`v-pills-type${ tab.id }`" role="tabpanel" :aria-labelledby="`v-pills-type${ tab.id }`">
                    <div class="table-responsive">
                    <b-table striped hover responsive :items="tblCategory" :fields="fieldsCategory" ref="dTable">
                      <template v-slot:cell(no)="row">
                        {{ row.index + 1 }}
                      </template>
                      <template v-slot:cell(category)="row">
                        {{ row.item.id }} - {{ row.item.category }}
                      </template>
                      <template v-slot:cell(actions)="row">
                        <b-button size="sm" v-b-modal="`editCategory`" @click="sendInfo(row.item.id)" variant="primary" class="mr-1">
                            <div data-icon="" class="icon"></div>
                        </b-button>
                        <b-button size="sm" variant="danger" class="mr-1" @click="deleteCategory(row.item.id)">
                          <div data-icon="" class="icon"></div>
                        </b-button>
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
                  </div>
                  </div>
                    <b-modal :id="`editCategory`" centered title="Ubah data category" ok-title="Ubah" @ok="onEdit" @show="onAddShow" cancel-title="Batal">
                    <b-container>
                      <b-row>
                        <b-col md="12">
                            <b-form-group
                              label-for="categoryname"
                              label="Nama Tipe"
                            >
                              <b-form-input id="categoryname" v-model="category.name_category" type="text" placeholder="-"></b-form-input>
                            </b-form-group>
                        </b-col>
                          <b-col md="12">
                              <b-form-group
                                label-for="categorytype"
                                label="Type"
                              >
                                    <multiselect id="categorytype" v-model="category.master_type_id" :options="listType.map(x => x.id)" :custom-label="opt => listType.find(x => x.id == opt).name_type" placeholder="Pilih type category" label="name_type" track-by="id"></multiselect>
                              </b-form-group>
                          </b-col>
                        <b-col md="12">
                            <b-form-group
                              label-for="categorystatus"
                              label="Status"
                            >
                              <b-form-select plain v-model="category.status" :options="status" id="categorystatus">
                                  </b-form-select>
                            </b-form-group>
                            <!-- <div>Download template category <a href="#" target="_blank">disini</a></div> -->
                        </b-col>
                      </b-row>
                    </b-container>
                  </b-modal>
                </div>
              </div>
            </b-row>
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
  name: 'CategoryList',
  props: {
  },
  mounted () {
    core.index()
    // Set the initial number of items
    this.totalRows = this.listCategory.index + 1
    // this.getCategoryList()
    this.getTypeListD()
  },
  data () {
    return {
      listCategory: [],
      listType: [],
      tblCategory: [],
      category: {
        name_category: '',
        master_type_id: '',
        status: ''
      },
      fields: [
        { key: 'no', label: 'No.', sortable: true, sortDirection: 'asc' },
        { key: 'name_category', label: 'ID - Nama' },
        { key: 'master_type_id', label: 'ID - Type' },
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
      fieldsCategory: [
        { key: 'no', label: 'No.', sortable: true, sortDirection: 'asc' },
        { key: 'category', label: 'ID - Nama Kategori' },
        // {
        //   key: 'Status',
        //   label: 'Status',
        //   formatter: (value, key, item) => {
        //     return value ? 'Aktif' : 'Tidak Aktif'
        //   },
        //   sortable: true,
        //   sortByFormatted: true,
        //   filterByFormatted: true
        // },
        { key: 'actions', label: 'Tindakan' }
      ],
      status: [
        { value: 1, text: 'Aktif' },
        { value: 0, text: 'Tidak Aktif' }
      ],
      tabName: [],
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
      this.addCategory()
    },
    onEdit () {
      this.editCategory()
    },
    onAddShow () {
      API.type
        .getAllType(0, 100).then(response => {
          this.listType = response.data.result
        }).finally(() => { this.loading = false })
    },
    findCategory (name) {
      window.scrollTo(0, 0)
      API.cat
        .getCategorybyType(name).then(response => {
          if (response.status === 200) {
            this.tblCategory = response.data.result
          }
        }).finally(() => { this.loading = false })
    },
    sendInfo (id) {
      API.type
        .getAllType().then(response => {
          API.cat
            .getDetailCategory(id).then(response => {
              if (response.status) {
                this.category = {
                  name_category: response.data.result.name_category,
                  status: response.data.result.status,
                  master_type_id: response.data.result.id
                }
                this.idSave = id
              }
            }).finally(() => { this.loading = false })
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
    getCategoryList () {
      API.cat
        .getAllCategory().then(response => {
          this.listCategory = response.data.result
          const data = response.data.result
          const reduced = data.filter((x, xi) => !data.slice(0, xi).some(y => y.id === x.master_type_id))
          this.getTypeList(reduced)
        }).finally(() => { this.loading = false })
    },
    getTypeListD () {
      API.type
        .getAllType(0, 100).then(response => {
          const menuType = response.data.result
          for (var i = 0; i < menuType.length; i++) {
            // if (data[i].master_type_id === menuType[i].id) {
            this.tabName = menuType
            // }
          }
        }).finally(() => { this.loading = false })
    },
    getTypeList (data) {
      API.type
        .getAllType().then(response => {
          var menuType = response.data.result

          for (var i = 0; i < menuType.length; i++) {
            if (data[i].master_type_id === menuType[i].id) {
              this.tabName = menuType
            }
          }
        }).finally(() => { this.loading = false })
    },
    // eslint-disable-next-line camelcase
    idWithName ({ id, name_type }) {
      // eslint-disable-next-line camelcase
      return `${id} — ${name_type}`
    },
    addCategory () {
      this.category.master_type_id = this.category.master_type_id.id
      API.cat
        .addCategory(this.category).then(response => {
          if (response.status) {
            core.showSnackbar('success', 'Category telah berhasil ditambah.')
            // this.getCategoryList()
            this.$refs.dTable.refresh()
            this.category = {}
          }
        }).finally(() => { this.loading = false })
    },
    editCategory () {
      API.cat
        .editCategory(this.idSave, this.category).then(response => {
          if (response.status) {
            core.showSnackbar('success', 'Category telah berhasil diubah.')
            // this.getCategoryList()
          }
        }).finally(() => { this.loading = false })
    },
    deleteCategory (id) {
      const ask = confirm('Apakah anda ingin menghapus data ini?')
      if (ask) {
        API.cat
          .deleteCategory(id).then(response => {
            if (response.status) {
              core.showSnackbar('success', 'Category telah berhasil dihapus.')
              // this.getCategoryList()
            } else if (response.data.errors.length > 0) {
              this.$refs.form.setErrors(response.data.errors)
              alert('gagal')
            }
          }).finally(() => { this.loading = false })
      }
    }
  }
}

</script>

<style>
.col-3 > .nav-pills {
  border: #f0ffea solid 1px;
}
.col-3 > .nav-pills > .nav-link {
  border: #f0ffea solid 1px;
  border-radius: 0;
}
[dir=ltr][mode=light] .nav-pills .nav-link.active, [dir=ltr][mode=light] .nav-pills .show > .nav-link {
  background: #f0ffea;
}
</style>
