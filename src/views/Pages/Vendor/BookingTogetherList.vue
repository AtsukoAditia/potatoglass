<template>
  <b-container fluid="">
    <b-row>
      <b-col md="12" sm="12">
        <iq-card>
          <template v-slot:body>
            <b-row>
              <b-col md="6" class="my-1">
                <label for="searchInput">Pencarian</label>
                <b-form-input id="searchInput" v-model="filter" type="search" size="md" placeholder="Ketik disini untuk mencari..."></b-form-input>
              </b-col>
              <b-col md="6" class="my-1 float-right">
                <label for="searchInput">Filter</label>
                <div class="d-block">
                    <b-button variant="primary" @click="filterTrans(0)" class="mr-1">Semua</b-button>
                    <!-- <b-button variant="success" @click="filterTrans(1)" class="mr-1">Trans. Sendiri</b-button> -->
                    <router-link :to="`/booking`">
                    <b-button variant="success" class="mr-1">Trans. Sendiri</b-button>
                    </router-link>
                </div>
                <!-- <b-form-datepicker id="example-datepicker" v-model="filterDeliv" @input="onDateFilter" class="mb-2"></b-form-datepicker> -->
              </b-col>
            </b-row>
            <br>

            <!-- Main table element -->
            <b-table :items="getTransactionList" :fields="fields" :current-page="currentPage" :per-page="perPage" ref="dTable"
              @filtered="onFiltered" class="">
              <template v-slot:cell(no)="row">
                <span :v-for="row">
                  {{ ((currentPage - 1) * perPage) + (row.index + 1) }}
                </span>
              </template>
              <template v-slot:cell(material_name)="row">
                <router-link :to="`material/${row.item.m_id}`">
                  {{ row.item.material_name }}
                </router-link>
              </template>
              <template v-slot:cell(no_invoice)="row">
                <router-link :to="`booking-gabungan/${row.item.no_invoice}`">
                  {{ row.item.no_invoice }}
                </router-link>
              </template>
              <template v-slot:cell(delivery_time)="row">
                {{ row.item.delivery_time | moment }}
              </template>
              <template v-slot:cell(trx_time)="row">
                {{ row.item.trx_time | moment }}
              </template>
              <template v-slot:cell(sold_unit)="row">
                {{ separatorNum(row.item.sold_unit) }}
              </template>
              <template v-slot:cell(sub_total)="row">
                Rp {{ separatorNum((row.item.harga_diskon * row.item.jumlah_item)) }}
              </template>
              <template v-slot:cell(harga_satuan)="row">
                Rp {{ separatorNum(row.item.harga_satuan) }} /{{ row.item.satuan }}
              </template>
              <template v-slot:cell(harga_diskon)="row">
                Rp {{ separatorNum(row.item.harga_diskon) }} /{{ row.item.satuan }}
              </template>
              <template #cell(actions)="row">
                <router-link :to="{ name: 'booking.together', params: {id: row.item.invoice_id} }">
                  <b-button size="sm" v-b-tooltip.top="'Lihat detail pesanan'" variant="info" class="mr-1">
                    <div data-icon="" class="icon"></div>
                  </b-button>
                </router-link>
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
              </template>
            </b-table>

            <b-col sm="12" md="4" class="my-1">
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
import {
  core
} from '../../../config/pluginInit'
import API from '@/services/vendor/order'
import moment from 'moment'

var data = {
  'result': [{
    'invoice_id': 1421133162796290048,
    'material_name': 'Kayu Pemisah Meranti',
    'm_id': 262628610018377729,
    'harga_satuan': 7000,
    'harga_diskon': 5000,
    'note_order': '',
    'vendor_name': 'PT Astutis Jaya Abadang',
    'vendor_phone': '+214-2334-466',
    'status_order': 2,
    'tujuan_pengiriman': 'Jl. Tangerang Raya No.14 Blok A',
    'metode_pembayaran': 'DP - Cicilan',
    'trx_time': '2021-07-30T15:38:44Z',
    'created_at': '2021-07-30T15:38:44Z',
    'delivery_time': '2021-07-30T15:38:44Z',
    'jumlah_item': 2300,
    'satuan': 'Pcs',
    'payment': {
      'percentace': '50.00',
      'total_amount': 400000000
    }
  }, {
    'invoice_id': 1421133162796290048,
    'material_name': 'Asbes PVC Semen Kualitas Terbaik Tebal 4 CM',
    'm_id': 262798947519561729,
    'harga_satuan': 7000,
    'harga_diskon': 5000,
    'note_order': '',
    'vendor_name': 'PT Astutis Jaya Abadang',
    'vendor_phone': '+214-2334-466',
    'status_order': 2,
    'tujuan_pengiriman': 'Jl. Tangerang Raya No.14 Blok A',
    'metode_pembayaran': 'DP - Cicilan',
    'trx_time': '2021-07-30T15:38:44Z',
    'created_at': '2021-07-30T15:38:44Z',
    'delivery_time': '2021-07-30T15:38:44Z',
    'jumlah_item': 2300,
    'satuan': 'Pcs',
    'payment': {
      'percentace': '50.00',
      'total_amount': 400000000
    }
  }, {
    'invoice_id': 1421133162796290048,
    'material_name': 'Pipa Kabel 3/9',
    'm_id': 262631998135205889,
    'harga_satuan': 7000,
    'harga_diskon': 5000,
    'note_order': '',
    'vendor_name': 'PT Astutis Jaya Abadang',
    'vendor_phone': '+214-2334-466',
    'status_order': 2,
    'tujuan_pengiriman': 'Jl. Tangerang Raya No.14 Blok A',
    'metode_pembayaran': 'DP - Cicilan',
    'trx_time': '2021-07-30T15:38:44Z',
    'created_at': '2021-07-30T15:38:44Z',
    'delivery_time': '2021-07-30T15:38:44Z',
    'jumlah_item': 2300,
    'satuan': 'Pcs',
    'payment': {
      'percentace': '50.00',
      'total_amount': 400000000
    }
  }],
  '_metadata': {
    'total': 1,
    'count': 1,
    'skip': 0,
    'limit': 10
  }
}

export default {
  name: 'BookingTogetherList',
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
      },
      {
        key: 'no_invoice',
        label: 'ID Invoice'
      },
      {
        key: 'material_name',
        label: 'Nama Material'
      },
      // {
      //   key: 'trx_time',
      //   label: 'Tgl. Transaksi',
      //   sortable: true,
      //   sortDirection: 'asc'
      // },
      {
        key: 'sold_unit',
        label: 'Jumlah Terjual'
      }
      // // {
      // //   key: 'harga_satuan',
      // //   label: 'Harga Normal'
      // // },
      // // {
      // //   key: 'harga_diskon',
      // //   label: 'Harga stl. Diskon'
      // // },
      // // {
      // //   key: 'sub_total',
      // //   label: 'Total Pesanan'
      // // },
      // // {
      // //   key: 'delivery_time',
      // //   label: 'Tgl. Pengiriman',
      // //   sortable: true,
      // //   sortDirection: 'asc'
      // // },
      // // {
      // //   key: 'tujuan_pengiriman',
      // //   label: 'Tujuan Pengiriman',
      // //   sortable: true,
      // //   sortDirection: 'asc'
      // // },
      // // {
      // //   key: 'status_order',
      // //   label: 'Status',
      // //   sortable: true,
      // //   sortDirection: 'asc'
      // // },
      // // {
      // //   key: 'metode_pembayaran',
      // //   label: 'Metode Pembayaran',
      // //   sortable: true,
      // //   sortDirection: 'asc'
      // // },
      // {
      //   key: 'actions',
      //   label: 'Lihat'
      // }
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
        notes: ''
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
      filterDeliv: ''
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
    getDetail (ctx) {
      this.totalRows = data._metadata.total
      const items = data.result
      return items || []
    },
    getTransactionList (ctx) {
      core.custLoader(true)
      let currPage = (ctx.currentPage - 1) * ctx.perPage
      if (ctx.currentPage === 1) {
        currPage = 0
      }
      return API.order
        .getListJoin(currPage, ctx.perPage).then(response => {
          if (response.status) {
            this.totalRows = response.data._metadata.total
            const items = response.data.result
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
