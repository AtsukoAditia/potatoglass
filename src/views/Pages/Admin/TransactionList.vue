<template>
  <b-container fluid="">
    <b-row>
      <b-col md="3" sm="6">
        <iq-card>
          <template v-slot:body>
            <div class="d-flex align-items-center justify-content-between">
                <h6 class="font-weight-bold">Total Transaksi</h6>
                <span class="iq-icon"><i class="ri-information-fill"></i></span>
              </div>
              <div class="iq-customer-box d-flex align-items-center justify-content-between mt-3">
                <div class="d-flex align-items-center">
                    <div class="rounded-circle iq-card-icon iq-bg-primary mr-2"> <i class="ri-inbox-fill"></i></div>
                    <h3>Rp {{ separatorNum(infoTotal.transaksi) }}</h3>
                </div>
                <div class="iq-map text-primary font-size-32"><i class="ri-bar-chart-grouped-line"></i></div>
              </div>
          </template>
        </iq-card>
      </b-col>
      <b-col md="3" sm="6">
        <iq-card>
          <template v-slot:body>
            <div class="d-flex align-items-center justify-content-between">
              <h6 class="font-weight-bold">Total Fee 2%</h6>
              <span class="iq-icon"><i class="ri-information-fill"></i></span>
            </div>
            <div class="iq-customer-box d-flex align-items-center justify-content-between mt-3">
              <div class="d-flex align-items-center">
                <div class="rounded-circle iq-card-icon iq-bg-danger mr-2"><i class="ri-radar-line"></i></div>
                <h3>Rp {{ separatorNum(infoTotal.fee) }}</h3>
              </div>
              <div class="iq-map text-danger font-size-32"><i class="ri-bar-chart-grouped-line"></i></div>
            </div>
          </template>
        </iq-card>
      </b-col>
      <b-col md="3" sm="6">
        <iq-card>
          <template v-slot:body>
            <div class="d-flex align-items-center justify-content-between">
              <h6 class="font-weight-bold">Transaksi Berhasil</h6>
              <span class="iq-icon"><i class="ri-information-fill"></i></span>
            </div>
            <div class="iq-customer-box d-flex align-items-center justify-content-between mt-3">
              <div class="d-flex align-items-center">
                <div class="rounded-circle iq-card-icon iq-bg-warning mr-2"><i class="ri-price-tag-3-line"></i></div>
                <h3>{{ separatorNum(infoTotal.success) }}</h3>
              </div>
              <div class="iq-map text-warning font-size-32"><i class="ri-bar-chart-grouped-line"></i></div>
            </div>
          </template>
        </iq-card>
      </b-col>
      <b-col md="3" sm="6">
        <iq-card>
          <template v-slot:body>
            <div class="d-flex align-items-center justify-content-between">
              <h6 class="font-weight-bold">Transaksi Proses</h6>
              <span class="iq-icon"><i class="ri-information-fill"></i></span>
            </div>
            <div class="iq-customer-box d-flex align-items-center justify-content-between mt-3">
              <div class="d-flex align-items-center">
                <div class="rounded-circle iq-card-icon iq-bg-info mr-2"><i class="ri-refund-line"></i></div>
                <h3>{{ separatorNum(infoTotal.process) }}</h3>
              </div>
              <div class="iq-map text-info font-size-32"><i class="ri-bar-chart-grouped-line"></i></div>
            </div>
          </template>
        </iq-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="12" sm="12">
        <iq-card>
          <template v-slot:headerTitle>
          </template>
          <template v-slot:body>
            <b-row>
              <b-col md="6" class="my-1">
                <label for="searchInput">Pencarian</label>
                <b-form-input id="searchInput" v-model="filter" type="search" size="md" placeholder="Ketik disini untuk mencari..."></b-form-input>
              </b-col>
              <b-col md="6" class="my-1 float-right">
                <!-- <label for="searchInput">Filter</label>
                <div class="d-block">
                    <b-button variant="primary" @click="filterTrans(0)" class="mr-1">Semua</b-button>
                    <router-link :to="`/booking-gabungan`">
                    <b-button variant="success" class="mr-1">Trans. Gabungan</b-button>
                    </router-link>
                </div> -->
              </b-col>
            </b-row>
            <br>
            <b-table
              :items="getTransactionList"
              :fields="fields"
              :current-page="currentPage"
              :per-page="perPage"
              :filter="filter"
              ref="dTable"
              @filtered="onFiltered"
            >
              <template v-slot:cell(no)="row">
                <span :v-for="row">
                {{ ((currentPage - 1) * perPage) + (row.index + 1) }}
                </span>
              </template>
              <template v-slot:cell(vendor_name)="row">
                <!-- <router-link to=""> -->
                  {{ row.item.vendor_name }}
                <!-- </router-link> -->
              </template>
              <template v-slot:cell(total_price)="row">
                <div v-if="row.item.payment.total_amount!=0">
                  <span class="d-block">Rp {{ separatorNum(parseFloat(row.item.total_price - row.item.payment.total_amount)) }}</span>
                  <small><s>Rp {{ separatorNum(row.item.total_price) }}</s></small>
                </div>
                <div v-else>
                  Rp {{ separatorNum(row.item.total_price) }}
                </div>
              </template>
              <template v-slot:cell(fee)="row">
                  Rp {{ separatorNum(row.item.total_price / 100 * 2) }}
              </template>
              <template v-slot:cell(list)="row">
                {{ separatorNum(row.item.list.length) }}
              </template>
              <template v-slot:cell(material)="row">
                <span v-if="row.item.list.length == 1">
                  {{ row.item.list[0].material_name }}
                </span>
                <span v-else-if="row.item.list.length == 2">
                  {{ row.item.list[0].material_name }}, {{ row.item.list[1].material_name }}
                </span>
                <span v-else-if="row.item.list.length > 2">
                  {{ row.item.list[0].material_name }}, {{ row.item.list[1].material_name }}, ...
                </span>
              </template>
              <template v-slot:cell(created_at)="row">
                {{ row.item.created_at | moment }}
              </template>
              <!-- <template v-slot:cell(delivery_time)="row">
                {{ row.item.delivery_time | moment }}
              </template> -->
              <template v-slot:cell(note)="row">
                <b-button size="sm" @click="noteOrder(row.item, row.index, $event.target)" class="mr-1">
                  Lihat
                </b-button>
              </template>
              <template v-slot:cell(status_order)="row">
                <b-badge variant="warning" v-if="row.item.status_order == 1">Pesanan Masuk</b-badge>
                <b-badge variant="info" v-if="row.item.status_order == 2">DP Telah Diterima <b>{{ row.item.payment.percentace }}%</b></b-badge>
                <b-badge variant="primary" v-if="row.item.status_order == 3">Pesanan diterima Vendor</b-badge>
                <b-badge variant="warning" v-if="row.item.status_order == 4">Pesanan dalam Pengiriman</b-badge>
                <b-badge variant="info" v-if="row.item.status_order == 9">Pesanan Diterima</b-badge>
                <b-badge variant="success" v-if="row.item.status_order == 10">Pesanan Berhasil</b-badge>
                <b-badge variant="danger" v-if="row.item.status_order == 11">Pesanan Ditolak Vendor</b-badge>
                <b-badge variant="danger" v-if="row.item.status_order == 12">Pesanan Dibatalkan User</b-badge>
                <!-- <b-badge variant="secondary" v-if="row.item.status == 11">Pesanan Dibatalkan User</b-badge> -->
              </template>
              <template v-slot:cell(actions)="row">
                <router-link :to="{ name: 'booking.detail', params: {id: row.item.order_id} }">
                  <b-button size="sm" v-b-tooltip.top="'Lihat detail pesanan'" variant="info" class="mr-1">
                    <div data-icon="" class="icon"></div>
                  </b-button>
                </router-link>
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
    <!-- Info modal -->
    <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetNoteOrder">
      <div class="text-dark" v-html="infoModal.content"></div>
    </b-modal>
  </b-container>
</template>
<script>
import { core } from '../../../config/pluginInit'
import API from '@/services/admin'
import moment from 'moment'
export default {
  name: 'TransactionList',
  props: {
    toMaterialAdd: { type: Object, default: () => ({ name: 'material.addmaterial' }) }
  },
  mounted () {
    core.index()
  },
  data () {
    return {
      fields: [
        { key: 'no', label: 'No.', sortable: true, sortDirection: 'asc' },
        { key: 'vendor_name', label: 'Penjual' },
        { key: 'customer_name', label: 'Pembeli' },
        { key: 'created_at', label: 'Pesanan Dibuat' },
        { key: 'total_price', label: 'Total Transaksi' },
        { key: 'fee', label: 'Fee 2%' },
        { key: 'status_order', label: 'Status' },
        { key: 'actions', label: 'Aksi' }
      ],
      totalRows: '',
      currentPage: 1,
      perPage: 20,
      pageOptions: [5, 10, 15],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      filterDeliv: '',
      infoModal: {
        id: 'info-modal',
        title: '',
        content: ''
      },
      infoTotal: {
        transaksi: '',
        fee: '',
        success: '',
        process: ''
      }
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
    getTransactionList (ctx) {
      core.custLoader(true)
      let currPage = (ctx.currentPage - 1) * ctx.perPage
      if (ctx.currentPage === 1) {
        currPage = 0
      }

      let name = ctx.filter
      if (name === null) {
        name = ''
      }
      let dateFil = ctx.dateFilter
      if (dateFil === null || dateFil === '' || dateFil === undefined) {
        dateFil = ''
      }

      var totalTrans = 0
      var totalSucc = 0
      var totalPros = 0
      return API.transaction
        .getTransaction(currPage, ctx.perPage, name, dateFil).then(response => {
          const dt = response.data
          if (response.status) {
            this.totalRows = response.data._metadata.total

            for (var i = 0; i < dt.result.length; i++) {
              totalTrans += parseInt(dt.result[i].total_price)
              const stat = dt.result[i].status_order
              if (stat === 1 || stat === 2 || stat === 3 || stat === 4) {
                totalPros += 1
              } else if (stat === 9 || stat === 10) {
                totalSucc += 1
              }
            }
            this.infoTotal.transaksi = totalTrans
            this.infoTotal.success = totalSucc
            this.infoTotal.process = totalPros
            this.infoTotal.fee = totalTrans / 100 * 2

            const items = response.data.result
            return items || []
          } else if (response.data.errors.length > 0) {
            this.$refs.dTable.setErrors(response.data.errors)
          }
        }).finally(() => {
          core.custLoader(false)
        })
    },
    onDateFilter () {
      const dataCtx = {
        apiUrl: '',
        currentPage: 1,
        filter: null,
        perPage: 10,
        sortBy: '',
        sortDesc: false,
        dateFilter: this.filterDeliv
      }
      this.getTransactionList(dataCtx)
    },
    onFiltered (filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    noteOrder (item, index, button) {
      this.infoModal.title = 'Detail Catatan Pesanan'
      this.infoModal.content = '<p>Catatan Pesanan: <span class="font-weight-bold">' + item.note_order + '</span></p>'
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetNoteOrder () {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },

    accOrder (data) {
      let cfm = confirm('Terima order dari ' + data.customer_name + '?')
      if (cfm) {
        API.order.accept(data.unique_order_item)
          .then(response => {
            if (response.status) {
              core.showSnackbar('success', 'Order telah diterima.')
              this.$refs.dTable.refresh()
            }
          }).finally(() => {
            this.loading = false
          })
      }
    },
    rejectOrder (data) {
      let cfm = confirm('Tolak order dengan ID ' + data.customer_name + '?')
      if (cfm) {
        API.order.reject(data.unique_order_item)
          .then(response => {
            if (response.status) {
              core.showSnackbar('success', 'Order telah ditolak.')
              this.$refs.dTable.refresh()
            }
          }).finally(() => {
            this.loading = false
          })
      }
    },

    separatorNum (val) {
      if (typeof val === 'undefined' || val === null || val === 'null') {
        return null
      }
      val = parseFloat(val)
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
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
.trtdMid > td {
  vertical-align: inherit !important;
}
.mlt-limitWidth > .multiselect {
  max-width: 250px !important;
}
</style>
