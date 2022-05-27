<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">Daftar Pengguna</h4>
          </template>
          <template v-slot:headerAction>
            <b-button variant="primary" v-b-modal.modalRegister>Add User</b-button>
          </template>
          <template v-slot:body>
            <b-row>
              <b-col md="4" align-self="end" class="my-1">
                <b-form-group class="mb-0">
                  <b-input-group size="sm">
                    <b-form-input id="filter-input" v-model="filter" type="search" placeholder="Cari disini...">
                    </b-form-input>
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-row>

            <b-table :items="getDataList" :fields="fields" :current-page="currentPage" :per-page="perPage"
              :filter="filter" :filter-included-fields="filterOn" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
              :sort-direction="sortDirection" stacked="md" show-empty @filtered="onFiltered" ref="dTable">
              <template v-slot:cell(no)="row">
                <span :v-for="row">
                  {{ ((currentPage - 1) * perPage) + (row.index + 1) }}
                </span>
              </template>

              <template #cell(actions)="row">
                <button type="button" @click="removeData(row.item)" class="btn btn-default text-danger">
                  <i class="fa fa-trash"></i> Delete
                </button>
              </template>

              <template #cell(role)="row">
                <span v-if="row.item.role == 1">Vendor</span>
                <span v-if="row.item.role == 2">Kontraktor</span>
                <span v-if="row.item.role == 10">Admin</span>
                <span v-if="row.item.role == 14">Client</span>
              </template>

              <template #cell(status)="row">
                <b-badge variant="danger" v-if="row.item.role === 0">Unactive</b-badge>
                <b-badge variant="success" v-if="row.item.role === 1">Active</b-badge>
              </template>
            </b-table>

            <b-row>
              <b-col md="4">
                <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="fill" size="sm"
                  class="my-0"></b-pagination>
              </b-col>
            </b-row>
          </template>
        </iq-card>
      </b-col>
    </b-row>
    <b-modal id="modalRegister" title="Tambah data pengguna baru" ok-title="Tambah data" cancel-title="Batal"
      @ok="generatePassword">
      <b-container>
        <b-row>
          <b-col md="12">
            <b-form-group label-for="username" label="Username">
              <b-form-input id="username" v-model="user.username" type="text" placeholder="-"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="12">
            <b-form-group label-for="password" label="Password">
              <b-form-input id="password" v-model="user.password" type="password" placeholder="-"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="12">
            <b-form-group label-for="email" label="Email">
              <b-form-input id="email" v-model="user.email" type="email" placeholder="-"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="12">
            <b-form-group label-for="role_id" label="Role">
              <b-form-select plain v-model="user.role_id" :options="roleSel" size="md">
                <template v-slot:first>
                  <b-form-select-option :value="null">Pilih Salah Satu</b-form-select-option>
                </template>
              </b-form-select>
            </b-form-group>
          </b-col>
          <b-col md="12">
            <b-form-group label-for="status" label="Status">
              <b-form-select plain v-model="user.status" :options="statusSel" size="md">
                <template v-slot:first>
                  <b-form-select-option :value="null">Pilih Salah Satu</b-form-select-option>
                </template>
              </b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
      </b-container>
    </b-modal>
  </b-container>
</template>
<script>
import {
  core
} from '@/config/pluginInit'
import API from '@/services/admin'
import bcrypt from 'bcryptjs'
import debounce from 'lodash.debounce'
import {
  mapGetters,
  mapActions
} from 'vuex'

const METHODS = {
  BCRYPT: 'bcrypt'
}

export default {
  name: 'UserList',
  mounted () {
    core.index()
  },
  data () {
    return {
      rowData: [],
      user: {
        username: '',
        email: '',
        password: '',
        role_id: 3,
        status: ''
      },
      genPassword: '',
      saltLength: 8,
      selectedMethod: METHODS.BCRYPT,
      methods: [METHODS.BCRYPT],
      fields: [{
        key: 'no',
        label: 'No.',
        sortable: true,
        sortDirection: 'desc'
      },
      {
        key: 'username',
        label: 'Username'
      },
      {
        key: 'email',
        label: 'Email'
      },
      {
        key: 'role',
        label: 'Role'
      },
      {
        key: 'status',
        label: 'Status'
      },
      {
        key: 'actions',
        label: 'Actions'
      }
      ],
      totalRows: '',
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],

      statusSel: [{
        value: 1,
        text: 'Aktif'
      },
      {
        value: 0,
        text: 'Tidak Aktif'
      }
      ],
      roleSel: [{
        value: 10,
        text: 'Admin'
      },
      {
        value: 12,
        text: 'Sub Admin'
      },
      {
        value: 1,
        text: 'Vendor'
      },
      {
        value: 2,
        text: 'Kontraktor'
      },
      {
        value: 14,
        text: 'Client'
      }
      ]
    }
  },
  computed: {},
  components: {},
  beforeMount () {},
  methods: {
    ...mapActions({
      storeUserList: 'masterModule/addUserList'
    }),
    ...mapGetters({
      userList: 'masterModule/userListState'
    }),

    getDataList (ctx) {
      let currPage = (ctx.currentPage - 1) * ctx.perPage
      if (ctx.currentPage === 1) {
        currPage = 0
      }
      let name = ctx.filter
      if (name === null) {
        name = ''
      }
      return API.user
        .getAllUser(currPage, ctx.perPage).then(response => {
          const dt = response.data
          if (response.status === 200) {
            // this.totalRows = dt._metadata.total
            this.totalRows = 1000
            const items = dt.result
            return items || []
          } else if (response.data.errors.length > 0) {
            this.$refs.form.setErrors(response.data.errors)
          }
        }).finally(() => {
          this.loading = false
        })
    },

    onFiltered (filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },

    removeData (data) {
      const del = confirm('Hapus akun ' + data.username + ' ?')
      if (del) {
        API.user
          .deleteUser(data.id).then(response => {
            if (response.status) {
              core.showSnackbar('success', 'Pengguna telah dihapus...')
              this.$refs.dTable.refresh()
            } else if (response.data.errors.length > 0) {
              this.$refs.form.setErrors(response.data.errors)
            }
          }).finally(() => { this.loading = false })
      }
    },

    generatePassword () {
      const self = this
      if (self.user.password !== '') {
        if (this.selectedMethod === METHODS.BCRYPT) {
          this.debouncedBcrypt()
        }
      } else {
        self.result = ''
      }
    },
    setBcryptHash () {
      const self = this
      self.calculating = true
      bcrypt.genSalt(self.saltLength, (err, salt) => {
        if (!err) {
          bcrypt.hash(self.user.password, salt, (err, hash) => {
            if (!err) {
              self.genPassword = `${hash}`
              self.calculating = false
              this.addNewUser()
            }
          })
        }
      })
    },
    addNewUser () {
      // this.user.password = this.genPassword
      API.user
        .addUser(this.user).then(response => {
          if (response.status) {
            core.showSnackbar('success', 'Pengguna berhasil di tambahkan...')
            this.$refs.dTable.refresh()
            this.user.username = ''
            this.user.email = ''
            this.user.password = ''
            this.user.status = ''
          }
        }).finally(() => {
          this.loading = false
        })
    }
  },
  created () {
    this.debouncedBcrypt = debounce(this.setBcryptHash, this.debounceTimer)
  }
}

</script>
