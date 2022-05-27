<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">
        <iq-card>
          <template v-slot:headerTitle>
          </template>
          <template v-slot:headerAction>
          </template>
          <template v-slot:body>
            <b-row>
              <b-col md="4" class="my-1">
                <label for="searchInput">Pencarian</label>
                <b-form-input id="searchInput" v-model="filter" type="search" size="md" placeholder="Ketik disini untuk mencari..."></b-form-input>
              </b-col>
              <b-col md="2" class="my-1 float-right">
                  <label for="searchInput">Filter</label>
                    <b-form-group class="mb-0">
                      <b-form-select id="per-page-select" v-model="perPage" :options="pageOptions" size="sm">
                      </b-form-select>
                    </b-form-group>
              </b-col>
              <b-col md="4" class="my-1 float-right">
                <label for="searchInput">Role</label>
                <b-form-group>
                  <b-form-radio-group
                    id="btnFilter"
                    v-model="filterRole"
                    :options="selRole"
                    name="radios-btn-default"
                    @change="filRole"
                    buttons
                  ></b-form-radio-group>
                </b-form-group>
              </b-col>
            </b-row>
            <br>
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
                stacked="md"
                ref="dTable"
                show-empty
                small
                @filtered="onFiltered">
              <template v-slot:cell(no)="row">
                <span :v-for="row">
                {{ ((currentPage - 1) * perPage) + (row.index + 1) }}
                </span>
              </template>

              <template v-slot:cell(role)="row">
                <span v-if="row.item.user_role == 1">Vendor</span>
                <span v-if="row.item.user_role == 2">Contractor</span>
                <span v-if="row.item.user_role == 0">Non-Contractor</span>
                <span v-if="row.item.user_role == 10">Admin</span>
                <span v-if="row.item.user_role == 99">Superadmin</span>
              </template>

              <template v-slot:cell(created_at)="row">
                {{ row.item.created_at | moment }}
              </template>

              <template v-slot:cell(actions)="row">
                <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">
                  Detil
                </b-button>
              </template>
            </b-table>

            <!-- Info modal -->
            <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
              <pre>{{ infoModal.content }}</pre>
            </b-modal>
          </template>
        </iq-card>
      </b-col>
    </b-row>
    <b-row class="my-2">
      <b-col sm="12" md="6">
        <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="fill" size="sm" class="my-0"></b-pagination>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { core } from '@/config/pluginInit'
import API from '@/services/admin'
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'

export default {
  name: 'UserLog',
  mounted () {
    core.index()
    // Set the initial number of items
    // this.totalRows = this.items.length
  },
  data () {
    return {
      fields: [
        {
          key: 'no',
          label: 'No.',
          sortable: true,
          sortDirection: 'desc'
        },
        {
          key: 'username',
          label: 'Username',
          sortable: true,
          sortDirection: 'desc'
        },
        {
          key: 'role',
          label: 'Peran',
          sortable: true
        },
        {
          key: 'activity',
          label: 'Aktivitas',
          sortable: true
        },
        {
          key: 'created_at',
          label: 'Waktu',
          sortable: true
        },
        {
          key: 'activity_type',
          label: 'Tipe',
          sortable: true
        },
        {
          key: 'actions',
          label: 'Aksi'
        }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 20,
      pageOptions: [20, 30, 40, {
        value: 100,
        text: 'Show a lot'
      }],
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
      filterRole: '',
      selRole: [
        { text: 'All', value: '99' },
        { text: 'Admin', value: '10' },
        { text: 'Vendor', value: '1' },
        { text: 'Contractor', value: '2' }
      ]
    }
  },
  filters: {
    moment: function (date) {
      return moment(date).format('D/MMM/YYYY, hh:mm:ss A')
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
  components: {},
  beforeMount () {},
  methods: {
    ...mapActions({
      storeLogList: 'masterModule/addLogList'
    }),
    ...mapGetters({
      logList: 'masterModule/logListState',
      getUserState: 'Setting/dataUserState'
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
      if (this.filterRole === '99') {
        this.filterRole = ''
      }
      let id = ''
      let date = ''
      return API.user
        .logUserPHP(id, date, currPage, ctx.perPage, this.filterRole).then(response => {
          const dt = response.data
          if (response.status) {
            this.storeLogList(dt.data)
            this.json_data = dt.data
            this.totalRows = dt._meta.total
            const items = this.logList()
            return items || []
          } else if (dt.errors.length > 0) {
            this.$refs.form.setErrors(dt.errors)
          }
        }).finally(() => {
          this.loading = false
        })
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
    filRole (e) {
      this.$refs.dTable.refresh()
    }
  }
}

</script>
