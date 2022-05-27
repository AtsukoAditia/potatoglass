<template>
  <b-container fluid="">
    <b-row>
      <b-col md="12" sm="12">
        <iq-card>
          <template v-slot:body>
            <b-row>
              <b-col md="12">
                <router-link :to='idnya + "/resolusi"' v-if="showResolution">
                  <b-button variant="info" class="float-right" v-if="roleid == 1">Resolusi</b-button>
                </router-link>
                <!-- <router-link :to='idnya + "/resolusi"'> -->
                  <!-- <b-button variant="success" class="float-right" v-if="roleid == 1">Diskusi</b-button> -->
                <!-- </router-link> -->
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
                <div class="table-responsive">
                  <table class="table table-borderless table-sm">
                    <tr>
                      <td>Order ID</td>
                      <td>: #{{ detail.order_id }}</td>
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
                        <div v-if="showTermin" class="d-inline ml-2">
                          <b-button variant="warning" size="sm" id="show-btn" @click="showModalTermin">Lihat Termin
                          </b-button>
                        </div>
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
            <b-row class="justify-content-md-center">
              <b-col md="12">
                <b-table :items="getDetail" :fields="fields" :current-page="currentPage" :per-page="perPage" ref="dTable"
              @filtered="onFiltered">
                  <template v-slot:cell(no)="row">
                    <span :v-for="row">
                      {{ ((currentPage - 1) * perPage) + (row.index + 1) }}
                    </span>
                  </template>
                  <template v-slot:cell(delivery_time)="row">
                    <div>
                      <b-badge variant="info" v-if="row.item.type_delivery = 1">Ekspedisi</b-badge>
                      <b-badge variant="info" v-if="row.item.type_delivery = 0">Kirim Sendiri</b-badge>
                      </div>
                    <div>{{ row.item.delivery_time | moment }}</div>
                    <div v-if="row.item.cost_delivery != 0">Rp {{ separatorNum(row.item.cost_delivery) }}</div>
                    <div v-else></div>
                  </template>
                  <template v-slot:cell(fee)="row">
                    <span v-if="row.item.discount != '0'">
                      Rp {{ separatorNum(row.item.sub_total / 100 * 2) }}
                    </span>
                    <span v-else>
                      0
                    </span>
                  </template>
                  <template v-slot:cell(sub_total)="row">
                    <div class="d-block">Rp {{ separatorNum(row.item.sub_total) }}</div>
                    <b-badge variant="success" v-if="row.item.discount != 0">Discount <b>{{ row.item.discount }}%</b></b-badge>
                    <div v-else></div>
                  </template>
                  <template v-slot:cell(price)="row">
                    Rp {{ separatorNum(row.item.price) }}
                  </template>
                  <template v-slot:cell(material_name)="row">
                    <router-link :to="'/material/'+row.item.m_id">
                      {{ row.item.material_name }}
                    </router-link>
                  </template>
                  <template v-slot:cell(qty)="row">
                    {{ separatorNum(row.item.qty) }}
                  </template>
                  <template slot="bottom-row">
                    <td colspan="4"></td>
                    <td>
                      <div><b>Pembelian</b></div>
                      <div><b>Pengiriman</b></div>
                      <div><span class="font-weight-bold" v-b-tooltip.hover title="Fee admin dikenakan untuk pemotongan dana">Fee 2% <i class="fas fa-info-circle"></i></span></div>
                      <div><b>Total Pembayaran</b></div>
                    </td>
                    <td>
                      <div><b>Rp {{ separatorNum(detail.total_transaction) }}</b></div>
                      <div><b>Rp {{ separatorNum(detail.total_delivery) }}</b></div>
                      <div><b>Rp {{ separatorNum(Math.round(detail.total_transaction/100*2)) }}</b></div>
                      <div><b>Rp {{ separatorNum(detail.total_payment) }}</b></div>
                    </td>
                  </template>
                </b-table>
              </b-col>
            </b-row>

            <b-row>
              <b-col md="6" class="my-1">
                <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="fill" size="sm"
                  class="my-0"></b-pagination>
              </b-col>
              <b-col md="6" class="text-right" v-if="roleid == 1">
                <div v-if="detail.status == 2">
                  <b-button @click="postLog(11)" variant="danger" class="mr-2 w-25">Tolak</b-button>
                  <b-button @click="postLog(3)" variant="success" class="mr-2 w-25">Terima Pesanan</b-button>
                </div>
                <div v-else-if="detail.status == 1">
                  <b-button @click="postLog(11)" variant="danger" class="mr-2 w-25">Tolak</b-button>
                </div>
                <div v-else-if="detail.status == 3">
                  <b-button @click="orderToDeliv" variant="success" class="mr-2 w-50">Atur Pengiriman</b-button>
                </div>
                <div v-else-if="detail.status == 4">
                  <b-button @click="postLog(9)" variant="success" class="mr-2 w-50">Pesanan Telah Diterima</b-button>
                </div>
                <div v-else></div>
              </b-col>
            </b-row>
          </template>
        </iq-card>
      </b-col>
    </b-row>

    <b-modal centered ref="modalTermin" title="Pengajuan Termin dari Kontraktor">
      <div class="table-responsive">
        <table class="table table-borderless table-sm">
          <tr>
            <th>Order ID</th>
            <td>: #{{ terminData.order_id }}</td>
          </tr>
          <tr>
            <th>Tgl. Pengajuan</th>
            <td>: {{ terminData.created_at | moment }}</td>
          </tr>
          <tr>
            <th>Status</th>
            <td>:
                <b-badge variant="warning" v-if="terminData.status_approval == 0">Sedang Pengajuan</b-badge>
                <b-badge variant="primary" v-if="terminData.status_approval == 1">Diterima Vendor</b-badge>
                <b-badge variant="danger" v-if="terminData.status_approval == 2">Ditolak</b-badge>
            </td>
            <th>Jumlah Termin</th>
            <td>: {{ terminData.jumlah_termin }}</td>
          </tr>
        </table>
        <br>
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th>Termin</th>
              <th>Nilai</th>
              <th>%</th>
              <th>Jth. Tempo</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(dt, x) in terminData.detail" :key="x">
              <td>{{ dt.termin_ke }}</td>
              <td>Rp {{ separatorNum(dt.nilai_bayar) }}</td>
              <td>{{ dt.persentase }}%</td>
              <td>{{ dt.jatuh_tempo }}</td>
              <td>
                <b-badge variant="danger" v-if="dt.status_bayar == null">Belum Bayar</b-badge>
                <b-badge variant="success" v-if="dt.status_bayar == 1">Lunas</b-badge>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <template #modal-footer  v-if="terminData.status_approval == 1">
        <div class="w-100">
          <b-button
            variant="success"
            size="sm"
            class="float-right mr-2"
            @click="accTermin(1)"
          >
            Terima Pengajuan
          </b-button>
          <b-button
            variant="danger"
            size="sm"
            class="float-right mr-2"
            @click="accTermin(2)"
          >
            Tolak
          </b-button>
        </div>
      </template>
    </b-modal>

  </b-container>
</template>
<script>
import {
  core
} from '../../../config/pluginInit'
import API from '@/services/vendor/order'
import moment from 'moment'
import axios from 'axios'
import { mapGetters } from 'vuex'
import constant from '@/config/constant'
export default {
  name: 'BookingDetail',
  props: {},
  mounted () {
    core.index()
    // Set the initial number of items
    // this.totalRows = this.items.length
    this.getTermin()
  },
  data () {
    return {
      fields: [{
        key: 'no',
        label: 'No.',
        sortable: true
      },
      {
        key: 'material_name',
        label: 'Material'
      },
      // {
      //   key: 'bahan',
      //   label: 'Kategori Bahan'
      // },
      {
        key: 'delivery_time',
        label: 'Pengiriman',
        sortable: true,
        sortDirection: 'asc'
      },
      // {
      //   key: 'merk',
      //   label: 'Merk'
      // },
      {
        key: 'qty',
        label: 'Jumlah'
      },
      {
        key: 'price',
        label: 'Harga'
      },
      {
        key: 'sub_total',
        label: 'Sub Total'
      }
      ],
      detail: {
        kode_proyek: '',
        order_id: '',
        customer_name: '',
        buyer_name: '',
        buyer_phone: '',
        customer_address: '',
        jumlah_item: '',
        total_transaction: '',
        status: '',
        dp_percent: '',
        dp_amount: '',
        total_delivery: '',
        total_payment: ''
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
      showTermin: false,
      showResolution: false,
      terminData: [],
      roleid: this.dataUser().user.role,
      idnya: this.$route.params.id
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
    }
  },
  methods: {
    ...mapGetters({
      dataUser: 'authModule/getUserData'
    }),
    getDetail (ctx) {
      // let currPage = (ctx.currentPage - 1) * ctx.perPage
      // if (ctx.currentPage === 1) {
      //   currPage = 0
      // }
      // let name = ctx.filter
      // if (name === null) {
      //   name = ''
      // }
      var i
      var totalItem = 0
      var totalDeliv = 0
      return API.order
        .getDetailPHP(this.$route.params.id).then(response => {
          const dt = response.data
          if (response.status) {
            // detail atas
            this.detail.order_id = dt.result.order.order_id
            this.detail.status = dt.result.order.status

            for (i = 0; i < dt.result.items.length; i++) {
              totalItem += parseInt(dt.result.items[i].qty)
              totalDeliv += parseInt(dt.result.items[i].cost_delivery)
            }
            this.detail.jumlah_item = totalItem
            this.detail.total_transaction = dt.result.order.total_price
            this.detail.total_delivery = totalDeliv
            this.detail.total_payment = dt.result.order.total_price + totalDeliv + Math.round((dt.result.order.total_price / 100) * 2)

            this.totalRows = 20
            const items = dt.result.items
            return items || []
          } else if (response.data.errors.length > 0) {
            this.$refs.dTable.setErrors(response.data.errors)
          }
        }).finally(() => {
          this.loading = false
        })
    },
    // getDetail (ctx) {
    //   let currPage = (ctx.currentPage - 1) * ctx.perPage
    //   if (ctx.currentPage === 1) {
    //     currPage = 0
    //   }
    //   let name = ctx.filter
    //   if (name === null) {
    //     name = ''
    //   }
    //   var i
    //   var totalItem = 0
    //   var totalPrice = 0
    //   return API.order
    //     .getDetail(currPage, ctx.perPage, this.$route.params.id).then(response => {
    //       if (response.status) {
    //         // this.detail.kode_proyek = this.response.data.result[0]
    //         this.detail.customer_name = response.data.result[0].customer_name
    //         // this.detail.buyer_name = this.response.data.result[0]
    //         // this.detail.buyer_phone = this.response.data.result[0]
    //         // this.detail.customer_address = this.response.data.result[0]
    //         for (i = 0; i < response.data.result[0].list.length; i++) {
    //           totalItem += parseInt(response.data.result[0].list[i].jumlah_item)
    //           totalPrice += parseInt(response.data.result[0].list[i].sub_total)
    //         }
    //         this.detail.jumlah_item = totalItem
    //         this.detail.total_transaction = totalPrice
    //         this.detail.status = response.data.result[0].status_order
    //         this.detail.dp_percent = response.data.result[0].payment.percentace
    //         this.detail.dp_amount = response.data.result[0].payment.total_amount

    //         this.totalRows = response.data._metadata.total
    //         const items = response.data.result[0].list
    //         return items || []
    //       } else if (response.data.errors.length > 0) {
    //         this.$refs.dTable.setErrors(response.data.errors)
    //       }
    //     }).finally(() => {
    //       this.loading = false
    //     })
    // },
    getTermin () {
      axios.get(`${constant.urlAPIPHP}/get_termin/${this.$route.params.id}`, {
        headers: {}
      }).then(res => {
        const dt = res.data
        if (res.status) {
          if (dt.success) {
            this.showTermin = true
            this.terminData = dt.row[0]

            if (dt.row.status_resolusi > 0) {
              this.showResolution = true
            } else {
              this.showResolution = false
            }
          } else {
            this.showTermin = false
            this.showResolution = false
          }
        }
      }).finally(() => {
        this.loading = false
      }).catch(() => {
        core.showSnackbar('error', 'Maaf, terjadi kesalahan pada sistem.')
      })
    },
    delivSuccess () {
      API.order.delivered(this.$route.params.id)
        .then(response => {
          if (response.status) {
            core.showSnackbar('success', 'Order berhasil diterima.')
            this.$router.push({
              name: 'booking.all'
            })
          }
        }).finally(() => {
          this.loading = false
        })
    },
    onFiltered (filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    rejectOrder () {
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
    },
    showModalTermin () {
      this.$refs['modalTermin'].show()
    },
    accTermin (stat) {
      var conf
      var fd = new FormData()
      fd.append('id', this.$route.params.id)
      fd.append('stats', stat)
      // var sendData = {
      //   id: parseInt(this.$route.params.id),
      //   stats: stat
      // }
      if (stat === 1) {
        conf = confirm('Terima pengajuan termin ini?')
      } else {
        conf = confirm('Tolak pengajuan termin ini?')
      }

      if (conf) {
        axios.post(`${constant.urlAPIPHP}/status_termin`, fd, {
          headers: {}
        }).then(res => {
          // const dt = res.data
          if (res.status) {
            // console.log(dt)
            core.showSnackbar('success', 'Berhasil update termin.')
          }
        }).finally(() => {
          this.loading = false
        }).catch(() => {
          core.showSnackbar('error', 'Maaf, terjadi kesalahan pada sistem.')
        })
      }
    },
    postLog (id) {
      let cfm = confirm('Proses pesanan dengan status yang di pilih?')
      const getUser = this.dataUser()
      var today = new Date()
      var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
      var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
      var dateTime = date + ' ' + time
      var activity
      var icon
      if (id === 11) {
        activity = 'Pesanan anda di tolak oleh Vendor'
        icon = 'ri-close-line'
      } else if (id === 3) {
        activity = 'Paket Anda Sedang Diproses'
        icon = 'ri-check-line'
      } else if (id === 9) {
        activity = 'Pesanan sudah diterima'
        icon = 'ri-check-line'
      }

      let dtLog = new FormData()
      dtLog.append('id_user', getUser.user.id)
      dtLog.append('order_id', this.$route.params.id)
      dtLog.append('log_activity', activity)
      dtLog.append('icon_status', icon)
      dtLog.append('created_date', dateTime)
      if (cfm) {
        axios.post(`${constant.urlAPIPHP}/save_log`, dtLog, {
          headers: {}
        }).then(res => {
          if (res.status) {
            core.showSnackbar('error', 'Update log berhasil...')
            if (id === 11) {
              this.rejectOrder()
            } else if (id === 3) {
              this.accOrder()
            } else if (id === 9) {
              this.delivSuccess()
            }
          }
        }).finally(() => {
          this.loading = false
        }).catch(() => {
          core.showSnackbar('error', 'Maaf, terjadi kesalahan pada sistem.')
        })
      }
    },
    accOrder () {
      API.order.accept(this.$route.params.id)
        .then(response => {
          if (response.status) {
            core.showSnackbar('success', 'Silahkan melakukan setting pengiriman.')
            this.$refs.dTable.refresh()
            this.$router.push({
              name: 'booking.delivery',
              id: this.$route.params.id
            })
          }
        }).finally(() => {
          this.loading = false
        })
    },
    orderToDeliv () {
      this.$router.push({
        name: 'booking.delivery',
        id: this.$route.params.id
      })
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

  .table td, .table th {
    vertical-align: middle;
  }

</style>
