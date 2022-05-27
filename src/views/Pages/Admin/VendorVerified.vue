<template>
  <b-container fluid="">
    <b-row>
      <b-col md="12" sm="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">List Data Lokasi Vendor</h4>
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
              <b-col class="md-8">
                <router-link :to="toVendorAdd">
                    <b-button variant="primary" class="float-right"><i class="ri-bill-fill"></i>Add Vendor</b-button>
                  </router-link>
              </b-col>
            </b-row>
            <!-- Main table element -->
            <b-table
              show-empty
              stacked="md"
              :items="vendorList"
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
              <template v-slot:cell(vendor_name)="row">
                <!-- <img :src="`${row.item.logo}`" width="60" class="mr-2" @error="imgError"> -->
                <div style="font-size:12px;">{{ row.item.name_vendor }}</div>
              </template>
              <template v-slot:cell(alamat)="row">
                {{ row.item.alamat }}, {{ row.item.kota }}, {{ row.item.provinsi }} - {{ row.item.kode_pos }}
              </template>
              <template v-slot:cell(email)="row">
                <a :href="`to:${row.item.email}`">{{ row.item.email }}</a>
              </template>
              <template v-slot:cell(contact_person)="row">
                <a :href="`tel:${row.item.phone}`">{{ row.item.phone }}</a>
              </template>
              <template v-slot:cell(status)>
                <b-badge variant="light">Perlu Verifikasi</b-badge>
              </template>
              <template v-slot:cell(actions)="row">
                <div class="d-flex">
                    <!-- <router-link :to="`vendor/${row.item.user_id}`"> -->
                      <b-button type="button" size="sm" variant="info" class="mr-1" @click="info(row.item, row.index, $event.target)">
                        <div data-icon="" class="icon"></div>
                      </b-button>
                    <!-- </router-link> -->
                    <b-button size="sm" variant="success" class="mr-1" @click="accVerif(row.item)">
                      <div data-icon="S" class="icon"></div>
                    </b-button>
                    <b-button size="sm" variant="danger" @click="statusVendor(row.item)">
                      <div data-icon="9" class="icon"></div>
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

            <!-- Info modal -->
            <b-modal :id="infoModal.id" :title="infoModal.title" ok-title="Verifikasi Data" @ok="accVerif(infoModal.content.user_id)" @hide="resetInfoModal">
              <b-row>
                <b-col md="6">
                    <span>Foto KTP Milik Vendor</span>
                    <a :href="assetUrl + 'vendor/' + infoModal.content.user_id + '/identitas/' + infoModal.content.identitas" target="_blank">
                        <b-img :src="assetUrl + 'vendor/' + infoModal.content.user_id + '/identitas/' + infoModal.content.identitas" fluid alt="Foto KTP Vendor"></b-img>
                    </a>
                </b-col>
                <b-col md="6">
                    <span>Foto Toko Vendor</span>
                    <a :href="assetUrl + 'vendor/' + infoModal.content.user_id + '/photo_toko/' + infoModal.content.photo_toko" target="_blank">
                        <b-img :src="assetUrl + 'vendor/' + infoModal.content.user_id + '/photo_toko/' + infoModal.content.photo_toko" fluid alt="Foto Toko Vendor"></b-img>
                    </a>
                </b-col>
              </b-row>
            </b-modal>
          </template>
        </iq-card>
      </b-col>
    </b-row>

    <b-modal id="modalStatus" centered @ok="decVerif" @hidden="resetModal" hide-header>
      <b-form-group id="inpStat2" label="Alasan ditolak :" label-for="txtReason">
        <b-form-textarea
          id="txtReason"
          v-model="alasan"
          placeholder="Berikan alasan kenapa akun ini harus ditolak..."
          rows="3"
          max-rows="6"
        ></b-form-textarea>
      </b-form-group>
    </b-modal>

  </b-container>
</template>
<script>
import { core, brokenImage, urlAssets } from '../../../config/pluginInit'
import API from '@/services/admin'
export default {
  name: 'VendorVerified',
  props: {
    toVendorAdd: { type: Object, default: () => ({ name: 'vendor.addvendor' }) }
  },
  mounted () {
    core.index()
    // Set the initial number of items
    // this.totalRows = this.vendorList.length
    // this.getVendorList()
  },
  data () {
    return {
      fields: [
        { key: 'no', label: 'No.', sortable: true, sortDirection: 'asc' },
        { key: 'vendor_name', label: 'Nama Vendor' },
        { key: 'alamat', label: 'Alamat' },
        { key: 'email', label: 'Email' },
        { key: 'contact_person', label: 'Kontak Person' },
        { key: 'status', label: 'Status' },
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
      assetUrl: urlAssets,
      infoModal: {
        id: 'info-modal',
        title: '',
        content: ''
      },
      alasan: '',
      verifData: []
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
    info (item, index, button) {
      this.infoModal.title = `Data vendor: ${item.name_vendor}`
      this.infoModal.content = item
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal () {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
    resetModal () {
      this.alasan = ''
    },
    statusVendor (dt) {
      this.verifData = dt
      this.$bvModal.show('modalStatus')
    },
    decVerif () {
      var datas = this.verifData
      const alert = confirm('Tolak permohonan verifikasi data ini?')
      datas['alasan'] = this.alasan
      if (alert) {
        API.vendor
          .getVerifAcc(datas.user_id, 0, datas).then(response => {
            const dt = response.data
            if (response.status === 200) {
              if (dt.message === 'SUCCESS') {
                core.showSnackbar('success', 'Verifikasi data vendor berhasil ditolak.')
                this.$refs.dTable.refresh()
              }
            } else if (response.data.errors.length > 0) {
              this.$refs.form.setErrors(response.data.errors)
              alert('Gagal')
            }
          }).finally(() => { this.loading = false })
      }
    },
    accVerif (dt) {
      const alert = confirm('Verifikasi akun vendor ini?')
      if (alert) {
        API.vendor
          .getVerifAcc(dt.user_id, 1, dt).then(response => {
            const dt = response.data
            if (response.status === 200) {
              if (dt.message === 'SUCCESS') {
                core.showSnackbar('success', 'Verifikasi data vendor berhasil diterima.')
                this.$refs.dTable.refresh()
              }
            } else if (response.data.errors.length > 0) {
              this.$refs.form.setErrors(response.data.errors)
              alert('Gagal')
            }
          }).finally(() => { this.loading = false })
      }
    },
    vendorList (ctx, callback) {
      let currPage = (ctx.currentPage - 1) * ctx.perPage
      if (ctx.currentPage === 1) {
        currPage = 0
      }
      let name = ctx.filter
      if (name === null) {
        name = ''
      }
      API.vendor
        .getVendorVerif(currPage, ctx.perPage, name).then(response => {
          var dt = response.data
          if (response.status === 200) {
            // this.vendorList(response.data.result)
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
