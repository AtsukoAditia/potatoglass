<template>
  <b-container fluid="">
    <b-row>
      <b-col md="12" sm="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">Daftar Peran Pengguna</h4>
          </template>
          <template v-slot:body>
            <b-row class="mb-2">
              <b-col md="12">
                <b-button v-b-modal.addRoleModal variant="success" class="float-right mr-2">Add Role</b-button>
                <b-modal id="addRoleModal" centered title="Tambah data file" ok-title="Tambah" @ok="onSubmit" cancel-title="Batal">
                  <b-container>
                    <b-row>
                      <b-col md="12">
                          <b-form-group
                            label-for="rolename"
                            label="Nama Role"
                          >
                            <b-form-input id="rolename" v-model="role.role_name" type="text" placeholder="-"></b-form-input>
                          </b-form-group>
                      </b-col>
                      <b-col md="12">
                          <b-form-group
                            label-for="rolestatus"
                            label="Status"
                          >
                            <b-form-select plain v-model="role.status" :options="status" id="rolestatus">
                                </b-form-select>
                          </b-form-group>
                          <!-- <div>Download template role <a href="#" target="_blank">disini</a></div> -->
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
              :items="listRole"
              :fields="fields"
              :current-page="currentPage"
              :per-page="perPage"
              :filter="filter"
              :filterIncludedFields="filterOn"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              :sort-direction="sortDirection"
              @filtered="onFiltered"
            >
              <template v-slot:cell(no)="row">
                {{ row.index + 1 }}
              </template>
              <template v-slot:cell(role_name)="row">
                {{ row.item.id }} - {{ row.item.role_name }}
              </template>

              <template v-slot:cell(actions)="row">
                <b-button size="sm" v-b-modal="'editRole'" @click="sendInfo(row.item.id)" variant="primary" class="mr-1">
                    <div data-icon="" class="icon"></div>
                </b-button>
                <b-button size="sm" variant="danger" class="mr-1" @click="deleteRole(row.item.id)">
                  <div data-icon="" class="icon"></div>
                </b-button>
              </template>
            </b-table>
            <b-modal id="editRole" centered title="Ubah data role" ok-title="Ubah" @ok="onEdit" cancel-title="Batal">
                <b-container>
                  <b-row>
                    <b-col md="12">
                        <b-form-group
                          label-for="rolename"
                          label="Nama Tipe"
                        >
                          <b-form-input id="rolename" v-model="role.role_name" type="text" placeholder="-"></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col md="12">
                        <b-form-group
                          label-for="rolestatus"
                          label="Status"
                        >
                          <b-form-select plain v-model="role.status" :options="status" id="rolestatus">
                              </b-form-select>
                        </b-form-group>
                        <div>Download template role <a href="#" target="_blank">disini</a></div>
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
  name: 'RoleList',
  props: {
  },
  mounted () {
    core.index()
    // Set the initial number of items
    this.totalRows = this.listRole.index + 1
    this.getRoleList()
  },
  data () {
    return {
      listRole: [],
      role: {
        role_name: '',
        status: ''
      },
      fields: [
        { key: 'no', label: 'No.', sortable: true, sortDirection: 'asc' },
        { key: 'role_name', label: 'ID - Nama' },
        // {
        //   key: 'status',
        //   label: 'Status',
        //   formatter: (value, key, item) => {
        //     return value ? 'Aktif' : 'Tidak'
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
      this.addRole()
    },
    onEdit () {
      this.editRole()
    },
    sendInfo (id) {
      API.role
        .getDetailRole(id).then(response => {
          if (response.status) {
            this.role = {
              role_name: response.data.result.role_name,
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
    getRoleList () {
      API.role
        .getAllRole().then(response => {
          this.listRole = response.data.result
        }).finally(() => { this.loading = false })
    },
    addRole () {
      API.role
        .addRole(this.role).then(response => {
          if (response.status) {
            this.getRoleList()
          }
        }).finally(() => { this.loading = false })
    },
    editRole () {
      API.role
        .editRole(this.idSave, this.role).then(response => {
          if (response.status) {
            this.getRoleList()
          }
        }).finally(() => { this.loading = false })
    },
    deleteRole (id) {
      const ask = confirm('Apakah anda ingin menghapus data ini?')
      if (ask) {
        API.role
          .deleteRole(id).then(response => {
            if (response.status) {
              this.getRoleList()
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
/* .iq-card-body{
  flex: unset;
} */
.imgTBL {
  width: 100px;
}
</style>
