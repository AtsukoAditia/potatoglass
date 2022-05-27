<template>
  <b-container fluid="">
    <b-row>
      <b-col md="12" sm="12">
        <iq-card>
          <template v-slot:headerTitle>
          </template>
          <template v-slot:headerAction>
            <b-button variant="primary" class="float-right" v-b-modal.modalAddHelp><i class="ri-bill-fill"></i>Tambah
              Help</b-button>
          </template>
          <template v-slot:body>
            <!-- <b-row>
              <b-col md="6" class="my-1">
                <label for="searchInput">Pencarian</label>
                <b-form-input id="searchInput" v-model="filter" type="search" size="md"
                  placeholder="Ketik disini untuk mencari..."></b-form-input>
              </b-col>
            </b-row> -->
            <!-- <br> -->
            <b-table :items="getList" :fields="fields" :current-page="currentPage" :per-page="perPage" ref="dTable">
              <template v-slot:cell(no)="row">
                <span :v-for="row">
                  {{ ((currentPage - 1) * perPage) + (row.index + 1) }}
                </span>
              </template>
              <template v-slot:cell(status)="row">
                <b-badge v-if="row.item.status == 1" variant="primary">Tampil</b-badge>
                <b-badge v-else variant="danger">Tidak Tampil</b-badge>
              </template>
              <template v-slot:cell(created_at)="row">
                {{ row.item.created_at | moment }}
              </template>
              <template v-slot:cell(actions)="row">
                <!-- <router-link :to="{ name: 'booking.detail', params: {id: row.item.order_id} }">
                  <b-button size="sm" v-b-tooltip.top="'Lihat detail pesanan'" variant="info" class="mr-1">
                    <div data-icon="" class="icon"></div>
                  </b-button>
                </router-link> -->
                <b-button size="sm" v-b-tooltip.top="'Hapus Data'" variant="danger" class="mr-1"
                  @click="delHelp(row.item)">
                  <div data-icon="" class="icon"></div>
                </b-button>
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
    <b-modal id="modalAddHelp" title="Tambah data help" size="lg" ok-title="Tambah data" cancel-title="Batal"
      @ok="addNewHelp">
      <form>
        <b-container>
          <b-row>
            <b-col md="6">
              <b-form-group label-for="judul" label="Nama Info">
                <b-form-input id="judul" v-model="help.judul" type="text" placeholder="-"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group label-for="status" label="Status Info">
                <multiselect v-model="help.status" id="status" track-by="id" label="name" placeholder="Pilih status" :options="selStatus" :searchable="false" :allow-empty="false">
                </multiselect>
              </b-form-group>
            </b-col>
            <!-- <b-col md="6">
              <b-form-group label-for="idplaylist" label="ID Playlist">
                <b-form-input id="idplaylist" v-model="help.idplaylist" type="text" placeholder="PL8n2A6TBqEvw4PbC16fSc6WOfA76HuXAd"></b-form-input>
                <small class="text-danger text-muted">https://www.youtube.com/watch?v=cgN4tt9-dfY&list={ text ini }</small>
              </b-form-group>
            </b-col> -->
            <b-col md="12">
              <b-form-group label-for="url_uri" label="Url Apps">
                <b-form-input id="url_uri" v-model="help.url_uri" type="text" placeholder="-"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="12">
              <b-form-group label-for="url_article" label="Url Article">
                <b-form-input id="url_article" v-model="help.url_article" type="text" placeholder="-"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="12">
              <b-form-group label-for="deskripsi" label="Deskripsi Info">
              <b-textarea id="deskripsi" v-model="help.deskripsi" rows="5"></b-textarea>
              </b-form-group>
            </b-col>
          </b-row>
        </b-container>
      </form>
    </b-modal>
  </b-container>
</template>
<script>
import {
  core
} from '../../../config/pluginInit'
import API from '@/services/help'
import moment from 'moment'
export default {
  name: 'Help',
  props: {},
  mounted () {
    core.index()
  },
  data () {
    return {
      fields: [{
        key: 'no',
        label: 'No.',
        sortable: true,
        sortDirection: 'asc'
      },
      {
        key: 'judul',
        label: 'Judul'
      },
      {
        key: 'deskripsi',
        label: 'Deskripsi'
      },
      // {
      //   key: 'id_playlist',
      //   label: 'ID Playlist'
      // },
      {
        key: 'url_uri',
        label: 'Link App'
      },
      {
        key: 'url_article',
        label: 'Link Article'
      },
      {
        key: 'status',
        label: 'Status'
      },
      // { key: 'status_order', label: 'Status' },
      {
        key: 'actions',
        label: 'Aksi'
      }
      ],
      totalRows: '',
      currentPage: 1,
      perPage: 15,
      pageOptions: [5, 10, 15],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      help: {
        judul: '',
        idplaylist: '-',
        url_uri: '',
        url_article: '',
        status: '',
        deskripsi: ''
      },
      selStatus: [
        { name: 'Aktif', id: 1 },
        { name: 'Tidak Aktif', id: 0 }
      ]
    }
  },
  filters: {
    moment: function (date) {
      return moment(date).format('D MMMM YYYY')
    }
  },
  computed: {},
  methods: {
    getList (ctx) {
      let currPage = (ctx.currentPage - 1) * ctx.perPage
      if (ctx.currentPage === 1) {
        currPage = 0
      }
      let name = ctx.filter
      if (name === null) {
        name = ''
      }
      return API
        .listHelpPHP(currPage, ctx.perPage).then(response => {
          if (response.status) {
            this.totalRows = response.data._meta.total
            const items = response.data.data
            return items || []
          } else if (response.data.errors.length > 0) {
            this.$refs.dTable.setErrors(response.data.errors)
          }
        }).catch(() => {}).finally(() => {
          this.loading = false
        })
    },
    addNewHelp () {
      API
        .addHelp(this.help).then(response => {
          if (response.status === 200) {
            core.showSnackbar('success', 'Data material telah di tambahkan.')
            this.$refs.dTable.refresh()
          } else {
            core.showSnackbar('danger', 'Data vendor telah gagal ditambahkan.')
          }
        }).catch(() => {
          core.showSnackbar('danger', 'Terjadi kesalahan pada sistem.')
        }).finally(() => {
          this.loading = false
        })
    },
    delHelp (data) {
      const del = confirm('Apakah anda yakin untuk menghapus data ' + data.judul + ' ini?')

      if (del) {
        API
          .statHelp(data.id).then(response => {
            if (response.status) {
              core.showSnackbar('success', 'Data help berhasil di hapus.')
              this.$refs.dTable.refresh()
            } else {
              core.showSnackbar('error', 'Data gagal di hapus.')
            }
          }).catch(() => {
            core.showSnackbar('error', 'Gagal, terjadi kesalahan pada sistem.')
          })
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
    width: 80px;
  }

  .inputPercentModal {
    border-bottom-right-radius: 0px !important;
    border-top-right-radius: 0px !important;
    width: 0;
    height: 39px !important;
    border-top-left-radius: 5px !important;
    border-bottom-left-radius: 5px !important;
  }

  .trtdMid>td {
    vertical-align: inherit !important;
  }

  .mlt-limitWidth>.multiselect {
    max-width: 250px !important;
  }

</style>
