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
              <b-col md="6" class="my-1">
                <!-- <label for="searchInput">Pencarian</label> -->
                <b-form-input id="searchInput" v-model="filter" type="search" size="md" placeholder="Ketik disini untuk mencari..."></b-form-input>
              </b-col>
              <b-col md="6" class="my-1">
                <b-button variant="primary" class="mr-1 float-right" v-b-modal.modal-add-table>+ Tambah Menu</b-button>
              </b-col>
            </b-row>
            <br>
            <!-- Main table element -->

            <v-draggable-treeview v-model="items" group="hoge">
              <!-- eslint-disable-next-line vue/no-unused-vars -->
              <template v-slot:prepend="{ item }">
                <v-icon v-if="item.icon == ''">mdi-circle-medium</v-icon>
                <v-icon v-else>mdi-circle-medium</v-icon>
              </template>
              <template v-slot:label="{ item }">
                <span v-if="item.children != null && item.children.length > 0" class="primary--text font-weight-bold">{{ item.name }}</span>
                <span v-else>
                    {{ item.name }}
                </span>
                <template
                  v-if="item.children != null && item.children.length > 0"
                >
                  - <small>Parent</small>
                </template>
              </template>
              <template v-slot:append="{ item }">
                {{ item.url }}
              </template>
            </v-draggable-treeview>
            <!-- <b-table
                :items="getDataList"
                :fields="fields"
                :current-page="currentPage"
                :per-page="perPage"
                :filter="filter"
                :filter-included-fields="filterOn"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                stacked="md"
                show-empty
                small
                ref="dTable"
                @filtered="onFiltered">
              <template v-slot:cell(no)="row">
                <span :v-for="row">
                {{ ((currentPage - 1) * perPage) + (row.index + 1) }}
                </span>
              </template>

              <template v-slot:cell(actions)="row">
                <b-button size="sm" variant="info" @click="detailGroup(row.item.id)" class="mr-1">
                  Atur Menu
                </b-button>
              </template>

              <template v-slot:cell(status)="row">
                  <b-badge v-if="row.item.status == '1'" variant="success">Aktif</b-badge>
                  <b-badge v-else variant="dark">Tidak Aktif</b-badge>
              </template>
            </b-table> -->

            <!-- <b-row>
                <b-col md="3">
                    <b-form-group label="Per page" label-for="per-page-select" label-cols-md="4" label-align-sm="right" label-size="sm" class="mb-0">
                      <b-form-select id="per-page-select" v-model="perPage" :options="pageOptions" size="sm">
                      </b-form-select>
                    </b-form-group>
                </b-col>
                <b-col md="6">
                    <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="fill" size="sm" class="my-0"></b-pagination>
                </b-col>
            </b-row> -->

          </template>
        </iq-card>
      </b-col>
    </b-row>

    <!-- Modal -->
    <b-modal id="modal-add-table" centered title="Form Tambah Tabel" @ok="addData" @hidden="resetField">
    <form>
          <b-row>
            <b-col md="12">
              <b-form-group label-for="nama_menu" label="Nama Menu">
                <b-form-input id="nama_menu" v-model="menu.menuname" type="text" placeholder="-"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="12">
              <b-form-group label-for="desk_menu" label="Deskripsi">
                <b-form-input id="desk_menu" v-model="menu.description" type="text" placeholder="-"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="12">
              <b-form-group label-for="desk_menu" label="Deskripsi">
                <b-form-input id="desk_menu" v-model="menu.description" type="text" placeholder="-"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
      </form>
  </b-modal>
  </b-container>
</template>
<script>
import { core } from '@/config/pluginInit'
import API from '@/services/admin'
// import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'
import VDraggableTreeview from 'vuetify-draggable-treeview'
import 'vuetify/dist/vuetify.css'

export default {
  name: 'MenuDetail',
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
          key: 'name',
          label: 'Nama Grup',
          sortable: true,
          sortDirection: 'desc'
        },
        {
          key: 'description',
          label: 'Deskripsi',
          sortable: true
        },
        {
          key: 'status',
          label: 'Status',
          sortable: true
        },
        {
          key: 'actions',
          label: 'Aksi'
        }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 15,
      pageOptions: [5, 10, 15, {
        value: 100,
        text: 'Show a lot'
      }],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      menu: {
        menuname: '',
        description: '',
        icon: '',
        url: ''
      },
      items: [
        {
          id: 2,
          name: 'Material Vendor',
          url: '/material',
          children: [
            {
              id: 1,
              url: '/test',
              name: 'Tambah',
              level: '1'
            }, {
              id: 2,
              url: '/test',
              name: 'Detail',
              level: '2'
            }, {
              id: 3,
              url: '/test',
              name: 'Help',
              level: '3'
            }, {
              id: 4,
              url: '/test',
              name: 'Link',
              level: '4'
            }
          ]
        }
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
  components: { VDraggableTreeview },
  beforeMount () {},
  methods: {
    getDataList (ctx) {
      core.custLoader(true)
      let currPage = (ctx.currentPage - 1) * ctx.perPage
      if (ctx.currentPage === 1) {
        currPage = 0
      }
      // let name = ctx.filter
      // if (name === null) {
      //   name = ''
      // }
      return API.menu
        .getListMenu(this.$route.params.id, currPage, ctx.perPage).then(response => {
          const dt = response.data
          if (response.status) {
            this.totalRows = dt._meta.total
            const items = dt.data
            return items || []
          } else if (response.data.errors.length > 0) {
            this.$refs.form.setErrors(response.data.errors)
          }
        }).finally(() => {
          core.custLoader(false)
        })
    },

    addData () {
      core.custLoader(true)
    },

    detailGroup (dt) {
      this.$router.push({ name: 'menu.detail', params: { id: dt.id } })
    },

    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    resetField () {
    }
  }
}

</script>
