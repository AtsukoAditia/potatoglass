<template>
  <b-container fluid="">
    <b-row>
      <b-col md="12" sm="12">
        <iq-card>
          <template v-slot:body>
            <b-row>
              <b-col md="6">
                <div class="table-responsive">
                  <table class="table table-borderless table-sm">
                    <tr>
                      <td>Order ID</td>
                      <td>: #{{ detail.kode_proyek }}</td>
                    </tr>
                    <!-- <tr>
                      <td>Nama Contractor</td>
                      <td>: -</td>
                    </tr>
                    <tr>
                      <td>Nama Pembeli</td>
                      <td>: -</td>
                    </tr>
                    <tr>
                      <td>Alamat Perusahaan</td>
                      <td>: -</td>
                    </tr> -->
                    <tr>
                      <td>Status Transaksi</td>
                      <td>:
                        <b-badge variant="warning" v-if="detail.status == 1">Pesanan Masuk</b-badge>
                        <b-badge variant="primary" v-if="detail.status == 2">DP Telah Diterima</b-badge>
                        <b-badge variant="primary" v-if="detail.status == 3">Pesanan diterima Vendor</b-badge>
                        <b-badge variant="warning" v-if="detail.status == 4">Pesanan dalam Pengiriman</b-badge>
                        <b-badge variant="info" v-if="detail.status == 9">Pesanan Diterima</b-badge>
                        <b-badge variant="success" v-if="detail.status == 10">Pesanan Berhasil</b-badge>
                        <b-badge variant="danger" v-if="detail.status == 11">Pesanan Ditolak Vendor</b-badge>
                        <b-badge variant="danger" v-if="detail.status == 12">Pesanan Dibatalkan User</b-badge>
                      </td>
                    </tr>
                  </table>
                </div>
              </b-col>
              <b-col md="6">
                <div class="table-responsive">
                  <table class="table table-borderless table-sm">
                    <tr>
                      <td>Total Jumlah Barang</td>
                      <td>: {{ separatorNum(detail.jumlah_item) }}</td>
                    </tr>
                    <!-- <tr>
                      <td>DP Diterima</td>
                      <td>: {{ detail.dp_percent }}% / Rp {{ separatorNum(detail.dp_amount) }}
                      </td>
                    </tr> -->
                    <tr>
                      <td>Total Transaksi</td>
                      <td>:
                        <span v-if="detail.dp_amount!=0">
                          <span class="font-weight-bold">Rp
                            {{ separatorNum(parseFloat(detail.total_transaction - detail.dp_amount)) }} </span>
                          <small><s>Rp {{ separatorNum(detail.total_transaction) }}</s></small>
                        </span>
                        <span v-else>
                          Rp {{ separatorNum(detail.total_transaction) }}
                        </span>
                      </td>
                    </tr>
                  </table>
                </div>
              </b-col>
            </b-row>

            <!-- Main table element -->
            <b-table :items="getDetail" :fields="fields" :current-page="currentPage" :per-page="perPage" ref="dTable"
              @filtered="onFiltered">
              <template v-slot:cell(no)="row">
                <span :v-for="row">
                  {{ ((currentPage - 1) * perPage) + (row.index + 1) }}
                </span>
              </template>
              <template v-slot:cell(jumlah_item)="row">
                {{ separatorNum(row.item.jumlah_item) }}
              </template>
              <template v-slot:cell(delivery_time)="row">
                {{ row.item.delivery_time | moment }}
              </template>
              <template v-slot:cell(sub_total)="row">
                Rp {{ separatorNum(row.item.sub_total) }}
              </template>
              <template v-slot:cell(met_pengiriman)="row">
                Oleh Ekspedisi {{ row.item.delivery_type }}
                <b-button size="sm" variant="outline-info" @click="seeDeliv(row.item, row.index, $event.target)">Detail</b-button>
              </template>
              <template v-slot:cell(biaya_pengiriman)="row">
                Rp 15.000
                <!-- <b-form-group>
                  <b-input-group size="sm" prepend="Rp">
                    <b-input type="number" v-model="deliv[row.index].price" class="form-control roundCust" @keyup="addTotal(row.index)"></b-input>
                  </b-input-group>
                </b-form-group> -->
              </template>
              <template slot="bottom-row">
                <td colspan="4"></td>
                <td><b>Total Biaya Pengiriman</b></td>
                <td>Rp 15.000</td>
                <!-- <td>Rp {{ separatorNum(total) }}</td> -->
              </template>
            </b-table>
            <b-row>
              <b-col md="6" class="my-1">
                <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="fill" size="sm"
                  class="my-0"></b-pagination>
              </b-col>
              <b-col md="6" class="text-right">
                <!-- <div v-if="detail.status == 3"> -->
                  <b-button @click="delivToContractor" variant="success" class="mr-2 w-50">Kirim Pesanan</b-button>
                <!-- </div> -->
              </b-col>
            </b-row>
            <!-- <b-col md="12">
              <div class="text-right">
                <b-button variant="success">Proses Pengiriman</b-button>
              </div>
            </b-col> -->
          </template>
        </iq-card>
      </b-col>
    </b-row>
    <!-- Info modal -->
    <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetseeDeliv">
      <div class="text-dark" v-html="infoModal.content"></div>
    </b-modal>
  </b-container>
</template>
<script>
import {
  core
} from '../../../config/pluginInit'
import API from '@/services/vendor/order'
import moment from 'moment'
export default {
  components: {},
  name: 'BookingDelivery',
  props: {},
  mounted () {
    core.index()
    // Set the initial number of items
    // this.totalRows = this.items.length
  },
  data () {
    return {
      fields: [{
        key: 'no',
        label: 'No.',
        sortable: true
      }, {
        key: 'material_name',
        label: 'Nama Material'
      }, {
        key: 'delivery_time',
        label: 'Waktu Pengiriman',
        sortable: true,
        sortDirection: 'asc'
      }, {
        key: 'jumlah_item',
        label: 'Qty'
      }, {
        key: 'met_pengiriman',
        label: 'Metode Pengiriman'
      }, {
        key: 'biaya_pengiriman',
        label: 'Biaya'
      }],
      detail: {
        kode_proyek: '',
        customer_name: '',
        buyer_name: '',
        buyer_phone: '',
        customer_address: '',
        jumlah_item: '',
        total_transaction: '',
        status: '',
        dp_percent: '',
        dp_amount: ''
      },
      totalRows: '',
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      filterDeliv: '',
      deliv: [{
        price: 0
      }],
      infoModal: {
        id: 'info-modal',
        title: '',
        content: ''
      },
      ids: '',
      listDeliv: []
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
          return {
            text: f.label,
            value: f.key
          }
        })
    },
    total () {
      return this.deliv.reduce((acc, curr) => {
        return acc + Number(curr.price)
      }, 0)
    }
  },
  methods: {
    getDetail (ctx) {
      let currPage = (ctx.currentPage - 1) * ctx.perPage
      if (ctx.currentPage === 1) {
        currPage = 0
      }
      let name = ctx.filter
      if (name === null) {
        name = ''
      }
      var i
      var totalItem = 0
      var totalPrice = 0
      return API.order
        .getDetail(currPage, ctx.perPage, this.$route.params.id).then(response => {
          if (response.status) {
            // this.detail.kode_proyek = this.response.data.result[0]
            this.detail.customer_name = response.data.result[0].customer_name
            // this.detail.buyer_name = this.response.data.result[0]
            // this.detail.buyer_phone = this.response.data.result[0]
            // this.detail.customer_address = this.response.data.result[0]
            for (i = 0; i < response.data.result[0].list.length; i++) {
              totalItem += parseInt(response.data.result[0].list[i].jumlah_item)
              totalPrice += parseInt(response.data.result[0].list[i].sub_total)
            }
            this.detail.jumlah_item = totalItem
            this.detail.total_transaction = totalPrice
            this.detail.status = response.data.result[0].status_order
            this.detail.dp_percent = response.data.result[0].payment.percentace
            this.detail.dp_amount = response.data.result[0].payment.total_amount
            this.ids = response.data.result[0].list[0].unique_order_item
            this.totalRows = response.data._metadata.total
            const items = response.data.result[0].list
            this.listDeliv = items
            return items || []
          } else if (response.data.errors.length > 0) {
            this.$refs.dTable.setErrors(response.data.errors)
          }
        }).finally(() => {
          this.loading = false
        })
    },
    addTotal (index) {
      this.deliv.push({
        price: 0
      })
    },
    seeDeliv (item, index, button) {
      this.infoModal.title = 'Detail Tipe Pengiriman'
      this.infoModal.content = '<p>Kendaraan / Alat : <span class="font-weight-bold"> Truk Ukuran xxxx </span></p><p>Unit : <span class="font-weight-bold"> 2 Truk Bak </span></p><p>Volume Total : <span class="font-weight-bold"> 30x10x5 M </span></p>'
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetseeDeliv () {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
    onFiltered (filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    rejectOrder () {
      let cfm = confirm('Tolak order dengan ini?')
      if (cfm) {
        API.order.reject(this.$route.params.id)
          .then(response => {
            if (response.status) {
              core.showSnackbar('success', 'Order telah ditolak.')
              this.$router.push({
                name: 'booking.all'
              })
            }
          }).finally(() => {
            this.loading = false
          })
      }
    },
    accOrder () {
      let cfm = confirm('Terima order ini?')
      if (cfm) {
        API.order.accept(this.$route.params.id)
          .then(response => {
            if (response.status) {
              core.showSnackbar('success', 'Silahkan melakukan setting pengiriman.')
              this.$refs.dTable.refresh()
            }
          }).finally(() => {
            this.loading = false
          })
      }
    },
    delivToContractor () {
      var idunik = []
      for (var i in this.listDeliv) {
        const dt = this.listDeliv[i]
        idunik.push(dt.unique_order_item)
      }
      const conf = confirm('Kirim pesanan ini?')

      if (conf) {
        API.order.delivery({ unique: idunik })
          .then(response => {
            if (response.status) {
              core.showSnackbar('success', 'Pesanan sedang dikirim.')
              this.listDeliv = []
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

  .trtdMid>td {
    vertical-align: inherit !important;
  }

  .mlt-limitWidth>.multiselect {
    max-width: 250px !important;
  }

  .roundCust {
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
    border: 1px solid #d7dbda;
  }

</style>
