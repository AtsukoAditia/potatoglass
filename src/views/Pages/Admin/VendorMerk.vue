<template>
  <b-container fluid="">
    <b-row>
      <b-col md="12" sm="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">List Request Merk</h4>
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
              :items="MerkList"
              :fields="fields"
              :current-page="currentPage"
              :per-page="perPage"
              ref="dTable"
              :filter="filter"
              @filtered="onFiltered"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
            >
              <template v-slot:cell(no)="row">
                {{ ((currentPage - 1) * perPage) + (row.index + 1) }}
              </template>
              <template v-slot:cell(assets)="row">
                <a :href="assetUrl + 'category/' + cekImg(row.item.assets)" target="_blank">
                  <b-img :src="assetUrl + 'category/' + cekImg(row.item.assets)" class="imgTBL"
                    :alt="row.item.name_category" @error="imgError"></b-img>
                </a>
              </template>
              <template v-slot:cell(created_at)="row">
                  <span> {{ row.item.created_at | moment }} </span>
              </template>
              <template v-slot:cell(actions)="row">
                <div class="d-flex">
                    <b-button size="sm" variant="success" v-b-tooltip.hover title="Setujui Merk ini?" @click="accVerif(row.item.id)">
                      <div data-icon="S" class="icon"></div>
                    </b-button>
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
  </b-container>
</template>
<script>
import { core, brokenImage } from '../../../config/pluginInit'
import API from '@/services/admin'
import moment from 'moment'
import constant from '@/config/constant'
import { mapGetters } from 'vuex'
export default {
  name: 'VendorMerk',
  mounted () {
    core.index()
    // Set the initial number of items
    // this.totalRows = this.MerkList.length
    // this.getMerkList()
  },
  data () {
    return {
      fields: [
        { key: 'no', label: 'No.', sortable: true, sortDirection: 'asc' },
        { key: 'assets', label: 'Foto' },
        { key: 'name_category', label: 'Nama Merk' },
        { key: 'username', label: 'Vendor' },
        { key: 'created_at', label: 'Tgl. Pengajuan' },
        { key: 'actions', label: 'Actions' }
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
      infoModal: {
        id: 'info-modal',
        title: '',
        content: ''
      },
      assetUrl: constant.urlAssetsPHP,
      userrole: this.userData()
    }
  },
  filters: {
    moment: function (date) {
      return moment(date).format('D MMMM YYYY')
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
    ...mapGetters({
      userData: 'authModule/getUserData'
    }),
    deleteVendor (id) {
      const alert = confirm('Apakah data ini mau dihapus?')
      if (alert) {
        API.vendor
          .deleteVendor(id).then(response => {
            if (response.status) {
              core.showSnackbar('success', 'Hapus data vendor berhasil.')
              this.$refs.dTable.refresh()
            } else if (response.data.errors.length > 0) {
              this.$refs.form.setErrors(response.data.errors)
              alert('Gagal')
            }
          }).finally(() => { this.loading = false })
      }
    },
    accVerif (id) {
      const alert = confirm('Verifikasi merk ini?')
      if (alert) {
        core.custLoader(true)
        API.cat
          .verifyMerk(id).then(response => {
            const dt = response.data
            if (response.status === 200) {
              if (dt.message === 'SUCCESS') {
                core.showSnackbar('success', 'Verifikasi data merk berhasil.')
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
    MerkList (ctx, callback) {
      let currPage = (ctx.currentPage - 1) * ctx.perPage
      if (ctx.currentPage === 1) {
        currPage = 0
      }
      API.cat
        .getMerkVerified(currPage, ctx.perPage, 'merk').then(response => {
          var dt = response.data
          if (response.status === 200) {
            this.totalRows = dt._meta.total
            const items = dt.data
            callback(items)
          } else if (response.data.errors.length > 0) {
            this.$refs.form.setErrors(response.data.errors)
          }
        }).finally(() => { this.loading = false })
    },

    imgError (e) {
      e.target.src = brokenImage
    },
    cekImg (dt) {
      if (dt != null) {
        const img = dt.split(',')
        return img[0]
      } else {
        return '-'
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
  width: 100px;
}
</style>
