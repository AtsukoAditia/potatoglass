<template>
  <b-container fluid="">
    <b-row id="divCount">
      <!-- <b-col md="2">
        <iq-card>
          <template v-slot:body>
            <div>
              <ul class="list-unstyled">
                <b-media tag="li" class="mb-3">
                  <template #aside>
                    <b-img blank blank-color="#abc" width="50" rounded alt="placeholder"></b-img>
                  </template>
                  <h5 class="mt-0 mb-1">ini vendor</h5>
                  <div>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
                  </div>
                </b-media>
                <li class="mb-3">
                  <div style="padding: 3px 10px;border: solid 2px #eaf3f7;border-radius: 10px;">
                    <span class="font-weight-bold">Vendor Regular</span>
                    <span class="text-success float-right">Upgrade</span>
                  </div>
                </li>
                <li>
                  <div>
                    <b-badge variant="success">TOKO BUKA</b-badge>
                    <span class="float-right"><i class="fas fa-clock"></i> 24 Jam</span>
                  </div>
                </li>
              </ul>
              <hr>
              <ul class="list-unstyled">
                <li class="mb-2">
                  <div>
                    <span>Dompet</span>
                    <span class="float-right">Rp -</span>
                  </div>
                </li>
                <li>
                  <div>
                    <span>Saldo Iklan</span>
                    <span class="float-right">Rp -</span>
                  </div>
                </li>
              </ul>
            </div>
          </template>
        </iq-card>
      </b-col> -->
      <!-- <b-col md="12">
        <b-row> -->
          <!-- <b-col md="3" sm="6" class="">
            <iq-card class="">
              <template v-slot:body>
                <div class="d-flex align-items-center justify-content-between">
                    <h6>Total Material</h6>
                    <span class="iq-icon"><i class="ri-information-fill"></i></span>
                  </div>
                  <div class="iq-customer-box d-flex align-items-center justify-content-between mt-3">
                    <div class="d-flex align-items-center">
                        <h2>{{ dataCount.all_order }}</h2>
                    </div>
                    <div class="iq-map text-primary font-size-32"><i class="ri-bar-chart-grouped-line"></i></div>
                  </div>
              </template>
            </iq-card>
          </b-col> -->
          <b-col md="3" sm="6" class="">
            <iq-card class="">
              <template v-slot:body>
                <div class="d-flex align-items-center justify-content-between">
                  <h6>Pesanan Baru</h6>
                  <span class="iq-icon"><i class="ri-information-fill"></i></span>
                </div>
                <div class="iq-customer-box d-flex align-items-center justify-content-between mt-3">
                  <div class="d-flex align-items-center">
                    <h2>{{ totalNewOrder }}</h2>
                  </div>
                  <div class="iq-map text-success font-size-32"><i class="ri-bar-chart-grouped-line"></i></div>
                </div>
              </template>
            </iq-card>
          </b-col>
          <b-col md="3" sm="6" class="">
            <iq-card class="">
              <template v-slot:body>
                <div class="d-flex align-items-center justify-content-between">
                  <h6>Pesanan Dikirim</h6>
                  <span class="iq-icon"><i class="ri-information-fill"></i></span>
                </div>
                <div class="iq-customer-box d-flex align-items-center justify-content-between mt-3">
                  <div class="d-flex align-items-center">
                    <h2>{{ totalOrderDelivered }}</h2>
                  </div>
                  <div class="iq-map text-primary font-size-32"><i class="ri-bar-chart-grouped-line"></i></div>
                </div>
              </template>
            </iq-card>
          </b-col>
          <b-col md="3" sm="6" class="">
            <iq-card class="">
              <template v-slot:body>
                <div class="d-flex align-items-center justify-content-between">
                  <h6>Pesanan Menunggu Pembayaran</h6>
                  <span class="iq-icon"><i class="ri-information-fill"></i></span>
                </div>
                <div class="iq-customer-box d-flex align-items-center justify-content-between mt-3">
                  <div class="d-flex align-items-center">
                    <h2>{{ totalOrderFailed }}</h2>
                  </div>
                  <div class="iq-map text-danger font-size-32"><i class="ri-bar-chart-grouped-line"></i></div>
                </div>
              </template>
            </iq-card>
          </b-col>
          <b-col md="3" sm="6" class="">
            <iq-card class="">
              <template v-slot:body>
                <div class="d-flex align-items-center justify-content-between">
                  <h6>Diskusi Baru</h6>
                  <span class="iq-icon"><i class="ri-information-fill"></i></span>
                </div>
                <div class="iq-customer-box d-flex align-items-center justify-content-between mt-3">
                  <div class="d-flex align-items-center">
                    <h2>{{ totalDiscuss }}</h2>
                  </div>
                  <div class="iq-map text-info font-size-32"><i class="ri-bar-chart-grouped-line"></i></div>
                </div>
              </template>
            </iq-card>
          </b-col>
          <b-col md="3" sm="6" class="">
            <iq-card class="">
              <template v-slot:body>
                <div class="d-flex align-items-center justify-content-between">
                  <h6>Pendapatan Bersih Baru</h6>
                  <span class="iq-icon"><i class="ri-information-fill"></i></span>
                </div>
                <div class="iq-customer-box d-flex align-items-center justify-content-between mt-3">
                  <div class="d-flex align-items-center">
                    <h2>-</h2>
                  </div>
                  <div class="iq-map text-warning font-size-32"><i class="ri-bar-chart-grouped-line"></i></div>
                </div>
              </template>
            </iq-card>
          </b-col>
    </b-row>
    <b-row id="divChart">
      <b-col md="12">
        <iq-card class-name="overflow-hidden">
          <template v-slot:body>
            <tab-nav :tabs="true" id="myTab-three">
              <tab-nav-items :active="true" id="pendapatan-tab-three" ariaControls="pendapatan" href="#pendapatan-three" role="tab" :ariaSelected="true" title="Pendapatan" />
              <!-- <tab-nav-items :active="false" id="stok-tab-three" ariaControls="stok" href="#stok-three" role="tab" :ariaSelected="false" title="Stok" />
              <tab-nav-items :active="false" id="pengiriman-tab-three" ariaControls="pengiriman" href="#pengiriman-three" role="tab" :ariaSelected="false" title="Pengiriman" /> -->
            </tab-nav>
            <tab-content id="myTabContent-4">
              <tab-content-item :active="true" id="pendapatan-three" aria-labelled-by="pendapatan-tab-three">
                <div class="mb-2">
                  <h5>Jumlah Pendapatan</h5>
                  <div>Cek Pendapatan toko untuk atur strategi penjualan</div>
                </div>
                <ApexChart ref="chartDown" id="home-chart-02" element="home-chart-02" :chartOption="chart1" style="min-height: 350px;"/>
              </tab-content-item>
              <!-- <tab-content-item :active="false" id="stok-three" aria-labelled-by="stok-tab-three">
                <div class="mb-2">
                  <h5>Jumlah Stok</h5>
                  <div>Cek stok toko untuk atur strategi penjualan</div>
                </div>
              </tab-content-item>
              <tab-content-item :active="false" id="pengiriman-three" aria-labelled-by="pengiriman-tab-three">
                <div class="mb-2">
                  <h5>Jumlah Pengiriman</h5>
                  <div>Cek pengiriman toko</div>
                </div>
              </tab-content-item> -->
            </tab-content>
          </template>
        </iq-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { core } from '../../config/pluginInit'
// import AmChart from '../../components/core/charts/AmChart'
import ApexChart from '../../components/core/charts/ApexChart'
// import API from '@/services/vendor/material'
import Profil from '@/services/vendor/profile'
// import apiOrder from '@/services/vendor/order'
import introJS from 'intro.js'

export default {
  name: 'DashboardVendor',
  components: { ApexChart },
  mounted () {
    core.index()
    this.getDataDashboard()
    const runIntro = localStorage.getItem('intro_v_dash')
    if (runIntro !== '1') {
      introJS().setOptions({
        steps: [{
          title: 'Selamat datang di Proyekita.id',
          intro: 'Izinkan kami untuk memandu anda mulai dari sini...'
        },
        {
          element: document.querySelector('#divCount'),
          intro: 'Bagian ini untuk memberikan informasi jumlah dari beberapa transaksi anda.'
        },
        {
          element: document.querySelector('#divChart'),
          intro: 'Dan bagian ini untuk memberikan informasi transaksi dalam bentuk chart.'
        },
        {
          title: 'Selesaii!!',
          intro: 'Silahkan jelajahi menu kami...'
        }]
      }).onbeforeexit(function () {
        localStorage.setItem('intro_v_dash', '1')
      }).start()
    }
  },
  data () {
    return {
      items: [
        { client: 'Ira Membrit', date: '18/10/2019', invoice: '20156', amount: '1500', status: { name: 'paid', color: 'success' }, action: 'Copy' },
        { client: 'Pete Sariya', date: '26/10/2019', invoice: '7859', amount: '2000', status: { name: 'paid', color: 'success' }, action: 'Send email' },
        { client: 'Cliff Hanger', date: '18/11/2019', invoice: '6396', amount: '2500', status: { name: 'past due', color: 'danger' }, action: 'Before Date' },
        { client: 'Terry Aki', date: '14/12/2019', invoice: '7854', amount: '5000', status: { name: 'paid', color: 'success' }, action: 'Copy' },
        { client: 'Anna Mull', date: '24/12/2019', invoice: '568569', amount: '10000', status: { name: 'paid', color: 'success' }, action: 'Send email' }
      ],
      monthlyInvocie: [
        { title: 'Camelun ios', color: 'success', amount: '12,434.00', paid_month: '17', total_month: '23' },
        { title: 'React', color: 'warning', amount: '12,434.00', paid_month: '17', total_month: '23' },
        { title: 'Camelun ios', color: 'success', amount: '12,434.00', paid_month: '17', total_month: '23' },
        { title: 'Camelun ios', color: 'danger', amount: '12,434.00', paid_month: '17', total_month: '23' }
      ],
      paymentHistory: [
        { title: 'Deposit from ATL', amount: '- 1,470', icon: 'ri-refresh-line', color: 'secondary', date: '5 march, 18:33', currency: 'USD' },
        { title: 'Deposit PayPal', amount: '+ 2,220', icon: 'ri-paypal-line', color: 'primary', date: '5 march, 18:33', currency: 'USD' },
        { title: 'Deposit from ATL', amount: '+ 250', icon: 'ri-check-line', color: 'primary', date: '5 march, 18:33', currency: 'USD' },
        { title: 'Cancelled', amount: '0', icon: 'ri-close-line', color: 'info', date: '5 march, 18:33', currency: 'USD' },
        { title: 'Refund', amount: '- 500', icon: 'ri-arrow-go-back-fill', color: 'info', date: '5 march, 18:33', currency: 'USD' },
        { title: 'Deposit from ATL', amount: '- 1,470', icon: 'ri-refresh-line', color: 'secondary', date: '5 march, 18:33', currency: 'USD' }
      ],
      chart1: {
        series: [{
          name: 'Pendapatan',
          data: []
        }],
        chart: {
          type: 'bar',
          height: 350
        },
        colors: ['#827af3', '#6ce6f4'],
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: ['2021-09', '2021-10', '2021-11']
        },
        yaxis: {
          labels: {
            show: true,
            align: 'right',
            minWidth: 0,
            maxWidth: 160,
            style: {
              colors: [],
              fontSize: '12px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 400,
              cssClass: 'apexcharts-yaxis-label'
            },
            offsetX: 0,
            offsetY: 0,
            rotate: 0,
            formatter: (value) => { return this.separatorNum(value) }
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return 'Rp ' + val
            }
          }
        }
      },
      chart2: {
        series: [{
          name: 'Desktops',
          data: [5, 10, 8, 15]
        }],
        chart: {
          height: 150,
          type: 'line',
          zoom: {
            enabled: false
          }
        },
        colors: ['#827af3'],
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr']
        }
      },
      darkChart2: {
        series: [{
          name: 'Desktops',
          data: [5, 10, 8, 15]
        }],
        chart: {
          height: 150,
          type: 'line',
          foreColor: '#8c91b6',
          zoom: {
            enabled: false
          }
        },
        colors: ['#827af3'],
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr']
        }
      },
      chart3: {
        series: [44, 55, 13, 33],
        chart: {
          width: 380,
          height: 180,
          type: 'donut'
        },
        dataLabels: {
          enabled: false
        },
        colors: ['#827af3', '#6ce6f4', '#a09e9e', '#fbc647'],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              show: false
            }
          }
        }],
        legend: {
          position: 'right',
          offsetY: 0,
          height: 150
        }
      },
      darkChart3: {
        series: [44, 55, 13, 33],
        chart: {
          width: 380,
          height: 180,
          foreColor: '#8c91b6',
          type: 'donut'
        },
        dataLabels: {
          enabled: false
        },
        colors: ['#827af3', '#6ce6f4', '#a09e9e', '#fbc647'],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              show: false
            }
          }
        }],
        legend: {
          position: 'right',
          offsetY: 0,
          height: 150
        }
      },
      totalOrder: '',
      totalMaterial: '',
      totalNewOrder: '',
      totalOrderDelivered: '',
      totalOrderFailed: '',
      totalDiscuss: ''
    }
  },
  methods: {
    getDataDashboard () {
      core.custLoader(true)
      Profil.profile
        .getDashboard().then(response => {
          const dt = response.data
          this.totalNewOrder = response.data.new_order
          this.totalOrderDelivered = response.data.delivery_order
          this.totalOrderFailed = response.data.failed_order
          this.totalDiscuss = response.data.new_discution
          var dtMonth = []
          var dtPendapatan = []
          for (var i in dt.data.pendapatan) {
            const pd = dt.data.pendapatan[i]
            dtMonth.push(pd['month'])
            dtPendapatan.push(pd['total'])
          }
          this.chart1.series[0].data = dtPendapatan
          this.chart1 = {
            xaxis: {
              categories: dtMonth
            }
          }
        })
        .catch(() => {
          core.showSnackbar('error', 'Maaf, terjadi kesalahan pada sistem.')
        }).finally(() => {
          core.custLoader(false)
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
.iq-card-body{
  flex: unset;
}
</style>
