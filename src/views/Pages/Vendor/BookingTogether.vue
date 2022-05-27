<template>
  <b-container fluid="">
    <b-row>
      <b-col md="12" sm="12">
        <iq-card>
          <template v-slot:body>
            <b-row>
              <b-button variant="info" id="btnPrint" @click="printAct">Print</b-button>
              <b-col md="6">
                <div class="table-responsive">
                  <table class="table table-borderless table-sm">
                    <tr>
                      <td>Invoice ID</td>
                      <td>: <b>#{{ detail.invoice_id }}</b></td>
                    </tr>
                    <tr>
                      <td>Nama Material</td>
                      <td>: <a href="#">{{ detail.nama_material }}</a></td>
                    </tr>
                    <!-- <tr>
                      <td>Nama Vendor</td>
                      <td>: {{ detail.vendor_name }}</td>
                    </tr>
                    <tr>
                      <td>Alamat Vendor</td>
                      <td>: {{ detail.vendor_address }}</td>
                    </tr> -->
                  </table>
                </div>
              </b-col>
              <b-col md="6">
                <div class="table-responsive">
                  <table class="table table-borderless table-sm">
                    <tr>
                      <td>Periode VP</td>
                      <td>: {{ detail.vp.start | momentNoY }} - {{ detail.vp.end | momentNoY }}</td>
                    </tr>
                    <tr>
                      <td>Total Qty Barang</td>
                      <td>: {{ separatorNum(detail.jumlah_item) }}</td>
                    </tr>
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
                    <!-- <tr>
                      <td>Total Diskon</td>
                      <td>:
                        <span>
                          {{ separatorNum(detail.total_dicount) }}%
                        </span>
                      </td>
                    </tr> -->
                  </table>
                </div>
              </b-col>
            </b-row>

            <!-- Main table element -->
            <b-table :items="getDetailOrder" :fields="fields" :current-page="currentPage" :per-page="perPage" ref="dTable"
              @filtered="onFiltered" class="">
              <template v-slot:cell(no)="row">
                <span :v-for="row">
                  {{ ((currentPage - 1) * perPage) + (row.index + 1) }}
                </span>
              </template>
              <template v-slot:cell(delivery_time)="row">
                {{ row.item.delivery_time | moment }}
              </template>
              <template v-slot:cell(order_id)="row">
                <router-link :to="`/booking/${row.item.order_id}`">
                  {{ row.item.order_id }}
                </router-link>
              </template>
              <template v-slot:cell(trx_time)="row">
                {{ row.item.trx_time | moment }}
              </template>
              <template v-slot:cell(fee)="row">
                Rp {{ separatorNum(row.item.total / 100 * 2) }}
              </template>
              <template v-slot:head(fee)>
                <span v-b-tooltip.hover title="Fee admin dikenakan untuk pemotongan dana">Fee 2% <i class="fas fa-info-circle"></i></span>
              </template>
              <template v-slot:cell(total_price)="row">
                Rp {{ separatorNum(row.item.total_price) }}
              </template>
              <template v-slot:cell(price)="row">
                Rp {{ separatorNum(row.item.price) }}
              </template>
              <template v-slot:cell(total)="row">
                Rp {{ separatorNum(row.item.total) }}
              </template>
              <template v-slot:cell(qty)="row">
                {{ separatorNum(row.item.qty) }}
              </template>
              <template v-slot:cell(delivery_price)="row">
                Rp {{ separatorNum(row.item.delivery_price) }}
              </template>
              <template slot="bottom-row">
                <td colspan="2"></td>
                <td class="font-weight-bold">Total Transaksi</td>
                <td class="font-weight-bold">{{ separatorNum(detail.jumlah_item) }}</td>
                <td></td>
                <td class="font-weight-bold">Rp {{ separatorNum(detail.total_transaction) }}</td>
                <td class="font-weight-bold">Rp {{ separatorNum(detail.total_dicount) }}</td>
                <td colspan="2"></td>
              </template>
              <template v-slot:cell(note)="row">
                <b-button size="sm" @click="noteOrder(row.item, row.index, $event.target)" class="mr-1">
                  Lihat
                </b-button>
              </template>
              <!-- <template #row-details="row">
                <b-card>
                  <ul>
                    <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
                  </ul>
                </b-card>
              </template> -->

              <!-- <template v-slot:cell(name)="row"> -->
              <!-- <router-link :to="{ name: 'material.detailmaterial', params: {id: row.item.id_} }">{{ row.item.name }}</router-link> -->
              <!-- </template> -->
            </b-table>
            <!-- <b-row>
              <b-col md="6" class="my-1">
                <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="fill" size="sm"
                  class="my-0"></b-pagination>
              </b-col>
              <b-col md="6" class="text-right">
                <div v-if="detail.status == 1 || detail.status == 2">
                  <b-button @click="rejectOrder" variant="danger" class="mr-2 w-25">Tolak</b-button>
                  <b-button @click="accOrder" variant="success" class="mr-2 w-25">Terima Pesanan</b-button>
                </div>
                <div v-if="detail.status == 3">
                  <b-button @click="orderToDeliv" variant="success" class="mr-2 w-50">Atur Pengiriman</b-button>
                </div>
              </b-col>
            </b-row> -->
            <b-row>
                <b-col md="4">
                    <b-form-group
                        id="txtNotes"
                        label="Catatan :"
                        label-for="txtNotes"
                    >
                        <b-form-textarea
                        id="txtNotes"
                        v-model="notes"
                        placeholder="-"
                        rows="3"
                        max-rows="6"
                        ></b-form-textarea>
                    </b-form-group>
                </b-col>
                <b-col md="4">
                </b-col>
              <b-col md="4">
                <!-- <div class="table-responsive">
                  <table class="table table-borderless table-sm">
                    <tr class="border-bottom">
                      <td>Subtotal</td>
                      <td>Rp {{ separatorNum(detail.total_transaction) }}</td>
                    </tr>
                    <tr class="border-bottom">
                      <td>Diskon <b>{{ detail.total_dicount }}%</b></td>
                      <td>Rp {{ separatorNum(countDiscount(detail.total_transaction, detail.total_dicount)) }}</td>
                    </tr>
                    <tr class="border-bottom">
                      <td>Pajak <b>10%</b></td>
                      <td>Rp {{ separatorNum(countDiscount(countDiscount(detail.total_transaction, detail.total_dicount), 10)) }}</td>
                    </tr>
                    <tr class="font-weight-bold">
                      <td>Total Pembayaran</td>
                      <td>Rp {{ separatorNum(Number(detail.total_transaction) - Number(countDiscount(detail.total_transaction, detail.total_dicount)) + Number(countDiscount(countDiscount(detail.total_transaction, detail.total_dicount), 10))) }}</td>
                    </tr>
                  </table>
                </div> -->
              </b-col>
            </b-row>
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
import {
  core
} from '../../../config/pluginInit'
import API from '@/services/vendor/order'
import moment from 'moment'
import { mapGetters } from 'vuex'

// var data = {
//   'result': [{
//     'invoice_id': '1421133162796290048',
//     'nama_material': 'Asbes Putih Glow Up',
//     'total_price': 800000000,
//     'note_order': '',
//     'vendor_name': 'PT Astutis Jaya Abadang',
//     'vendor_phone': '+214-2334-466',
//     'status_order': 2,
//     'vendor_address': 'Jl. Tangerang Raya No.14 Blok A',
//     'metode_pembayaran': 'Per Pengiriman',
//     'total_dicount': '30',
//     'vp': {
//       'start': '2021-09-01T00:00:00Z',
//       'end': '2021-09-30T00:00:00Z'
//     },
//     'list': [{
//       'unique_order_item': '1421133162829844480',
//       'material_name': 'PT Indah Jaya',
//       'm_id': '',
//       'merk': '',
//       'satuan': 'Meter',
//       'bahan': '',
//       'photo': '',
//       'vendor_name': 'Pt. Astutis Vendor',
//       'jumlah_item': 500,
//       'harga_satuan': 20000,
//       'harga_diskon': 14500,
//       'sub_total': 800000000,
//       'delivery_time': '2021-09-08T00:00:00Z',
//       'note_delivery': 'gabisa move marker, ini warung sayur Mak nya Adit',
//       'status': 2,
//       'trx_time': '2021-07-30T15:38:44Z',
//       'delivery_price': 60000
//     },
//     {
//       'unique_order_item': '1421133162829844480',
//       'material_name': 'PT Badang Negara',
//       'm_id': '',
//       'merk': '',
//       'satuan': 'Meter',
//       'bahan': '',
//       'photo': '',
//       'vendor_name': 'Pt. Astutis Vendor',
//       'jumlah_item': 620,
//       'harga_satuan': 20000,
//       'harga_diskon': 16200,
//       'sub_total': 654000000,
//       'delivery_time': '2021-09-09T00:00:00Z',
//       'note_delivery': 'gabisa move marker, ini warung sayur Mak nya Adit',
//       'status': 2,
//       'trx_time': '2021-07-30T15:38:44Z',
//       'delivery_price': 125000
//     },
//     {
//       'unique_order_item': '1421133162829844480',
//       'material_name': 'PT Alicia Patrika',
//       'm_id': '',
//       'merk': '',
//       'satuan': 'Meter',
//       'bahan': '',
//       'photo': '',
//       'vendor_name': 'Pt. Astutis Vendor',
//       'jumlah_item': 730,
//       'harga_satuan': 20000,
//       'harga_diskon': 17700,
//       'sub_total': 125000000,
//       'delivery_time': '2021-09-10T00:00:00Z',
//       'note_delivery': 'gabisa move marker, ini warung sayur Mak nya Adit',
//       'status': 2,
//       'trx_time': '2021-07-30T15:38:44Z',
//       'delivery_price': 60000
//     },
//     {
//       'unique_order_item': '1421133162829844480',
//       'material_name': 'PT PT lah ya kali',
//       'm_id': '',
//       'merk': '',
//       'satuan': 'Meter',
//       'bahan': '',
//       'photo': '',
//       'vendor_name': 'Pt. Astutis Vendor',
//       'jumlah_item': 150,
//       'harga_satuan': 20000,
//       'harga_diskon': 12520,
//       'sub_total': 325000000,
//       'delivery_time': '2021-09-11T00:00:00Z',
//       'note_delivery': 'gabisa move marker, ini warung sayur Mak nya Adit',
//       'status': 2,
//       'trx_time': '2021-07-30T15:38:44Z',
//       'delivery_price': 32000
//     }
//     ],
//     'payment': {
//       'percentace': '50.00',
//       'total_amount': 400000000
//     },
//     'created_at': '2021-07-30T15:38:44Z'
//   }],
//   '_metadata': {
//     'total': 1,
//     'count': 1,
//     'skip': 0,
//     'limit': 10
//   }
// }

export default {
  name: 'BookingTogether',
  props: {},
  mounted () {
    core.index()
    // Set the initial number of items
    // this.totalRows = this.items.length
    this.getDataLocal()
  },
  data () {
    return {
      fields: [{
        key: 'no',
        label: 'No.',
        sortable: true
      },
      {
        key: 'order_id',
        label: 'ID Order'
      },
      {
        key: 'nama_lengkap',
        label: 'Nama Kontraktor'
      },
      // {
      //   key: 'trx_time',
      //   label: 'Tgl. Transaksi',
      //   sortable: true,
      //   sortDirection: 'asc'
      // },
      {
        key: 'qty',
        label: 'Qty'
      },
      {
        key: 'price',
        label: 'Harga Satuan'
      },
      {
        key: 'total_price',
        label: 'Sub Total'
      },
      {
        key: 'total',
        label: 'Harga stl. Diskon'
      },
      {
        key: 'fee',
        label: 'Fee Admin'
      },
      {
        key: 'delivery_time',
        label: 'Tgl. Kirim',
        sortable: true,
        sortDirection: 'asc'
      },
      {
        key: 'note',
        label: 'Catatan'
      }
      ],
      detail: {
        kode_proyek: '',
        nama_material: '',
        vendor_name: '',
        vendor_phone: '',
        vendor_address: '',
        jumlah_item: '',
        total_transaction: '',
        status: '',
        dp_percent: '',
        dp_amount: '',
        invoice_id: '',
        metode_pembayaran: '',
        total_dicount: '',
        notes: '',
        vp: '',
        harga_kirim: ''
      },
      notes: '',
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
      infoModal: {
        id: 'info-modal',
        title: '',
        content: ''
      }
    }
  },
  filters: {
    moment: function (date) {
      return moment(date).format('D MMM YYYY')
    },
    momentNoY: function (date) {
      return moment(date).format('D MMM')
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
      //   let currPage = (ctx.currentPage - 1) * ctx.perPage
      //   if (ctx.currentPage === 1) {
      //     currPage = 0
      //   }
      //   let name = ctx.filter
      //   if (name === null) {
      //     name = ''
      //   }
      // var i
      // var totalItem = 0
      // var totalPrice = 0
      // var totalDeliv = 0
      // //   return API.order
      // //     .getDetail(currPage, ctx.perPage, this.$route.params.id).then(response => {
      // //       if (response.status) {
      // // this.detail.kode_proyek = this.response.data.result[0]
      // this.detail.nama_material = data.result[0].nama_material
      // this.detail.invoice_id = data.result[0].invoice_id
      // this.detail.vendor_name = data.result[0].vendor_name
      // this.detail.vendor_phone = data.result[0].vendor_phone
      // this.detail.metode_pembayaran = data.result[0].metode_pembayaran
      // this.detail.vendor_address = data.result[0].vendor_address
      // this.detail.total_dicount = data.result[0].total_dicount
      // for (i = 0; i < data.result[0].list.length; i++) {
      //   totalItem += parseInt(data.result[0].list[i].jumlah_item)
      //   totalPrice += parseInt(data.result[0].list[i].sub_total)
      //   totalDeliv += parseInt(data.result[0].list[i].delivery_price)
      // }
      // this.detail.jumlah_item = totalItem
      // this.detail.total_transaction = totalPrice
      // this.detail.harga_kirim = totalDeliv
      // this.detail.status = data.result[0].status_order
      // this.detail.dp_percent = data.result[0].payment.percentace
      // this.detail.dp_amount = data.result[0].payment.total_amount
      // this.detail.vp = data.result[0].vp

      // this.totalRows = data._metadata.total
      // const items = data.result[0].list
      // return items || []
      //   } else if (response.data.errors.length > 0) {
      //     this.$refs.dTable.setErrors(response.data.errors)
      //   }
      // }).finally(() => {
      //   this.loading = false
      // })
    },
    getDetailOrder (ctx) {
      core.custLoader(true)
      var totalItem = 0
      var totalPrice = 0
      var totalFix = 0
      return API.order
        .getDetailJoin(this.$route.params.id).then(response => {
          if (response.status) {
            this.totalRows = 20
            const items = response.data.result

            for (var i = 0; i < items.length; i++) {
              totalItem += parseInt(items[i].qty)
              totalPrice += parseInt(items[i].total_price)
              totalFix += parseInt(items[i].total)
            }
            this.detail.jumlah_item = totalItem
            this.detail.total_transaction = totalPrice
            this.detail.total_dicount = totalFix
            this.detail.invoice_id = this.$route.params.id

            return items || []
          } else if (response.data.errors.length > 0) {
            this.$refs.dTable.setErrors(response.data.errors)
          }
        }).finally(() => {
          core.custLoader(false)
        })
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
              this.$router.push({
                name: 'booking.delivery',
                id: this.$route.params.id
              })
            }
          }).finally(() => {
            this.loading = false
          })
      }
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
    },
    countDiscount (val, disc) {
      const a = Number(val)
      const b = Number(disc) / 100
      const total = a * b
      return total
    },
    getDataLocal () {
      const dt = this.dataUser()
      this.detail.vendor_name = dt.user.username
      // this.detail.vendor_address = '-'
    },
    printAct () {
      const btn = document.getElementById('btnPrint')
      const brdcmb = document.getElementById('parentBread')
      const btnSetting = document.querySelector('.right-sidebar-toggle')
      const btnHelp = document.querySelector('.v-speed-dial')
      btn.style.display = 'none'
      brdcmb.style.setProperty('display', 'none', 'important')
      btnSetting.style.setProperty('display', 'none', 'important')
      btnHelp.style.setProperty('display', 'none', 'important')
      setTimeout(() => {
        window.print()
      }, 500)
      setTimeout(() => {
        btn.style.display = 'block'
        brdcmb.style.setProperty('display', 'flex', 'important')
        btnSetting.style.setProperty('display', 'block', 'important')
        btnHelp.style.setProperty('display', 'block', 'important')
      }, 1000)
    },
    noteOrder (item, index, button) {
      this.infoModal.title = 'Detail Catatan Pesanan'
      this.infoModal.content = '<p>Catatan Pesanan: <span class="font-weight-bold">' + item.note_order + '</span></p>'
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetNoteOrder () {
      this.infoModal.title = ''
      this.infoModal.content = ''
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

  #btnPrint {
    position: absolute;
    right: 30px;
    z-index: 1;
  }
  #txtNotes {
    border: none !important;
    overflow: hidden !important;
  }

</style>
