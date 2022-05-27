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
              <b-form-group
                label="Cari nama vendor "
                label-for="filterInput"
                label-cols-sm="3"
                label-align-sm="right">
                    <b-form-input
                      v-model="filter"
                      type="search"
                      id="filterInput"
                      placeholder="Ketik disini..."
                    ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col class="md-5">
                <b-form-group
                label="Filter"
                label-for="btnFilter"
                label-cols-sm="3"
                label-align-sm="right">
                  <b-form-radio-group
                    id="btnFilter"
                    v-model="filterStatus"
                    :options="selStatus"
                    name="radios-btn-default"
                    @change="filStatus"
                    buttons
                  ></b-form-radio-group>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <router-link :to="toVendorAdd">
                    <b-button variant="primary" class="float-right"><i class="ri-bill-fill"></i>Add Vendor</b-button>
                  </router-link>
              </b-col>
            </b-row>
            <!-- <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Cari data disini..."
        single-line
        hide-details
        ></v-text-field>
      <v-data-table
        :headers="fields"
        :items="vendorList"
        :search="search"
        :options.sync="options"
        :server-items-length="totalDesserts"
        :loading="loading"
        :items-per-page="15"
        class="elevation-1"
      ></v-data-table> -->
            <!-- Main table element -->
            <b-table
              striped hover
              show-empty
              stacked="sm"
              :items="getDataList"
              :fields="fields"
              :current-page="currentPage"
              :per-page="perPage"
              ref="dTable"
              :filter="filter"
              @filtered="onFiltered"
            >
              <template v-slot:cell(no)="row">
                {{ ((currentPage - 1) * perPage) + (row.index + 1) }}
              </template>
              <template v-slot:cell(name_vendor)="row">
                <img :src="`${row.item.logo}`" width="60" class="mr-2 imgTBL" @error="imgError">
                <span class="d-block font-weight-bold">{{ row.item.name_vendor }}</span>
              </template>
              <template v-slot:cell(kota)="row">
                {{ row.item.kota }}, {{ row.item.provinsi }}
              </template>
              <template v-slot:cell(alamat)="row">
                <div class="txtAlamat">
                {{ row.item.alamat }}, {{ row.item.kota }}, {{ row.item.provinsi }} - {{ row.item.kode_pos }}
                <div>
                  <a v-if="row.item.address_lat != '0.00000000' && row.item.address_long != '0.00000000'" :href="`https://www.google.com/maps/search/%09${row.item.address_lat},${row.item.address_long}`" target="_blank">Lihat di Maps</a>
                  <a v-else :href="`https://maps.google.com/?q=${row.item.alamat}`" target="_blank">Lihat di Maps</a>
                </div>
                </div>
              </template>
              <template v-slot:cell(contact)="row">
                <div>Email: <a :href="`to:${row.item.email}`">{{ row.item.email }}</a></div>
                <div>Phone: <a :href="`tel:${row.item.phone}`">{{ row.item.phone }}</a></div>
                <div>Cp1: <a :href="`tel:${row.item.cp1}`">{{ row.item.cp1 }}</a></div>
                <div>Cp2: <a :href="`tel:${row.item.cp2}`">{{ row.item.cp2 }}</a></div>
              </template>
              <template v-slot:cell(status)="row">
                <div>
                  <button v-b-tooltip.hover title="Ubah Status Vendor?" @click="statusVendor(row.item)">
                    <b-badge v-if="row.item.status == '1'" variant="success"><i class="ri-user-follow-line"></i> Verified</b-badge>
                    <b-badge v-if="row.item.status == '0'" variant="info"><i class="ri-user-shared-line"></i> UnVerified</b-badge>
                    <b-badge v-if="row.item.status == '2'" variant="danger"><i class="ri-user-unfollow-line"></i> Banned</b-badge>
                  </button>
                </div>
              </template>
              <template v-slot:cell(actions)="row">
                <div class="d-flex">
                    <router-link :to="`vendor/${row.item.user_id}`">
                      <b-button type="button" size="sm" variant="success"  class="mr-1">
                        <div data-icon="" class="icon"></div>
                      </b-button>
                    </router-link>
                    <b-button size="sm" variant="danger" @click="deleteVendor(row.item.id)">
                      <div data-icon="" class="icon"></div>
                    </b-button>
                </div>
              </template>
            </b-table>
            <!-- Info modal -->
            <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
              <pre>{{ infoModal.content }}</pre>
            </b-modal>
          </template>
        </iq-card>
      </b-col>

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
    </b-row>

    <b-modal id="modalStatus" centered @ok="changeStatus" @hidden="resetModal" hide-header>
      <b-form-group id="inpStat1" label="Pilih Status Akun :" label-for="input-3">
        <b-form-select
          id="input-3"
          v-model="statusId"
          :options="statusUser"
          required
        ></b-form-select>
      </b-form-group>
      <b-form-group v-if="statusId == '2'" id="inpStat2" label="Alasan di Ban :" label-for="txtReason">
        <b-form-textarea
          id="txtReason"
          v-model="banReason"
          placeholder="Berikan alasan kenapa akun ini harus di ban..."
          rows="3"
          max-rows="6"
        ></b-form-textarea>
      </b-form-group>
    </b-modal>
  </b-container>
</template>
<script>
import { core, brokenImage } from '../../../config/pluginInit'
import API from '@/services/admin'
export default {
  name: 'VendorList',
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
        { key: 'no', label: 'No.' },
        { key: 'name_vendor', label: 'Nama Vendor' },
        { key: 'alamat', label: 'Alamat', tdClass: 'alamatTh' },
        { key: 'contact', label: 'Kontak' },
        { key: 'status', label: 'Status' },
        { key: 'actions', label: 'Actions', sortable: false }
      ],
      totalRows: '',
      currentPage: 1,
      perPage: 10,
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
      search: '',
      totalDesserts: 0,
      vendorList: [],
      loading: true,
      options: {},
      selStatus: [
        { text: 'All', value: '99' },
        { text: 'Verified', value: '1' },
        { text: 'UnVerified', value: '0' },
        { text: 'Banned', value: '2' }
      ],
      statusUser: [
        { text: 'Verifikasi', value: '1' },
        { text: 'Batal Verifikasi', value: '0' },
        { text: 'Banned', value: '2' }
      ],
      filterStatus: '',
      statusId: '',
      banReason: '',
      vendorId: '',
      vendorEmail: ''
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
      this.infoModal.title = `Row index: ${index}`
      this.infoModal.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal () {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
    filStatus (e) {
      this.$refs.dTable.refresh()
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
      if (this.filterStatus === '99') {
        this.filterStatus = ''
      }
      return API.vendor
        .getAllVendor(currPage, ctx.perPage, name, '', '', this.filterStatus).then(response => {
          const dt = response.data
          if (response.status === 200) {
            this.totalRows = 0
            if (dt.data != null) {
              this.totalRows = dt._meta.total
            }
            const items = dt.data
            return items || []
          } else if (response.data.errors.length > 0) {
            this.$refs.form.setErrors(response.data.errors)
          }
        }).finally(() => {
          this.loading = false
        })
    },
    statusVendor (dt) {
      this.statusId = dt.status
      this.vendorId = dt.user_id
      this.vendorEmail = dt.email
      this.$bvModal.show('modalStatus')
    },
    changeStatus () {
      const alert = confirm('Ubah status akun vendor ini?')
      if (alert) {
        core.custLoader(true)
        var banReasons = {
          ban_reason: this.banReason,
          email: this.vendorEmail
        }
        API.vendor
          .getVerifAcc(this.vendorId, this.statusId, banReasons).then(response => {
            const dt = response.data
            if (response.status === 200) {
              if (dt.message === 'SUCCESS') {
                core.showSnackbar('success', 'Status vendor berhasil diubah.')
                this.$bvModal.hide('modalStatus')
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
    resetModal () {
      this.banReason = ''
      this.vendorId = ''
    },
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
    // vendorList (ctx) {
    //   let currPage = (ctx.currentPage - 1) * ctx.perPage
    //   if (ctx.currentPage === 1) {
    //     currPage = 0
    //   }
    //   let name = ctx.filter
    //   if (name === null) {
    //     name = ''
    //   }
    //   let sortby = ctx.sortBy
    //   if (sortby === null || sortby === 'no') {
    //     sortby = ''
    //   }
    //   let sortdesc = ''
    //   if (ctx.sortDesc === true) {
    //     sortdesc = 'DESC'
    //   } else {
    //     sortdesc = 'ASC'
    //   }
    //   console.log(ctx)
    //   return API.vendor
    //     .getAllVendor(currPage, ctx.perPage, name, sortby, sortdesc).then(response => {
    //       const dt = response.data
    //       if (response.status === 200) {
    //         this.totalRows = response.data._meta.total
    //         const items = dt.data
    //         return items || []
    //       } else if (response.data.errors.length > 0) {
    //         this.$refs.form.setErrors(response.data.errors)
    //       }
    //     }).finally(() => {
    //       this.loading = false
    //     })
    // },

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
    width: 60px;
    height: 60px;
    border: 1px #c3c2c252 solid;
    border-radius: 5px;
    object-fit: contain;
  }
  .txtAlamat {
    border: 1px #e7e7e7 solid;
    border-radius: 5px;
    padding: 5px 10px;
  }
  .alamatTh {
    max-width: 300px;
  }
</style>
