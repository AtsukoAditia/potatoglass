<template>
  <b-container fluid="">
    <b-row>
      <b-col md="3" sm="6">
        <iq-card>
          <template v-slot:body>
            <div class="d-flex align-items-center justify-content-between">
                <h6>Total Vendor</h6>
                <span class="iq-icon"><i class="ri-information-fill"></i></span>
              </div>
              <div class="iq-customer-box d-flex align-items-center justify-content-between mt-3">
                <div class="d-flex align-items-center">
                    <div class="rounded-circle iq-card-icon iq-bg-primary mr-2"> <i class="ri-inbox-fill"></i></div>
                    <h2>-</h2>
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
              <h6>Total Kontraktor</h6>
              <span class="iq-icon"><i class="ri-information-fill"></i></span>
            </div>
            <div class="iq-customer-box d-flex align-items-center justify-content-between mt-3">
              <div class="d-flex align-items-center">
                <div class="rounded-circle iq-card-icon iq-bg-danger mr-2"><i class="ri-radar-line"></i></div>
                <h2>-</h2>
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
              <h6>Total Material</h6>
              <span class="iq-icon"><i class="ri-information-fill"></i></span>
            </div>
            <div class="iq-customer-box d-flex align-items-center justify-content-between mt-3">
              <div class="d-flex align-items-center">
                <div class="rounded-circle iq-card-icon iq-bg-warning mr-2"><i class="ri-price-tag-3-line"></i></div>
                <h2>-</h2>
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
              <h6>Keterlambatan pembayaran</h6>
              <span class="iq-icon"><i class="ri-information-fill"></i></span>
            </div>
            <div class="iq-customer-box d-flex align-items-center justify-content-between mt-3">
              <div class="d-flex align-items-center">
                <div class="rounded-circle iq-card-icon iq-bg-info mr-2"><i class="ri-refund-line"></i></div>
                <h2>-</h2>
              </div>
              <div class="iq-map text-info font-size-32"><i class="ri-bar-chart-grouped-line"></i></div>
            </div>
          </template>
        </iq-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="10">
         <iq-card>
           <template v-slot:body>
        <div class="mb-2">
          <h5>Jumlah Order Vendor</h5>
          <div>Cek berapa banyak vendor berjualan</div>
        </div>
        <ApexChart ref="chartDown" id="home-chart-02" element="home-chart-02" :chartOption="chart1" style="min-height: 350px;"/>
           </template>
         </iq-card>
      </b-col>
      <!-- <b-col md="8">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">{{ $t('dashboard1.openInvoice') }}</h4>
          </template>
          <template v-slot:headerAction>
            <b-dropdown  id="dropdownMenuButton5" right variant="none" data-toggle="dropdown">
              <template v-slot:button-content>
                <span class="text-primary"><i class="ri-more-fill"></i></span>
              </template>
              <b-dropdown-item><i class="ri-eye-fill mr-2"></i>{{ $t('dropdown.view') }}</b-dropdown-item>
              <b-dropdown-item><i class="ri-delete-bin-6-fill mr-2"></i>{{ $t('dropdown.delete') }}</b-dropdown-item>
              <b-dropdown-item><i class="ri-pencil-fill mr-2"></i>{{ $t('dropdown.edit') }}</b-dropdown-item>
              <b-dropdown-item><i class="ri-printer-fill mr-2"></i>{{ $t('dropdown.print') }}</b-dropdown-item>
              <b-dropdown-item><i class="ri-file-download-fill mr-2"></i>{{ $t('dropdown.download') }}</b-dropdown-item>
            </b-dropdown>
          </template>
          <template v-slot:body>
            <b-table responsive :items="items"  class="mb-0 table-borderless">
              <template v-slot:cell(status)="data">
                <b-badge pill :variant="data.value.color">{{ data.value.name }}</b-badge>
              </template>
              <template v-slot:cell(amount)="data1">
                ${{ data1.value }}
              </template>
            </b-table>
          </template>
        </iq-card>
      </b-col>
      <b-col md="4">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">{{ $t('dashboard1.monthlyInvoice') }}</h4>
          </template>
          <template v-slot:headerAction>
            <b-dropdown  id="dropdownMenuButton1" right variant="none" data-toggle="dropdown">
              <template v-slot:button-content>
                <span class="text-primary"><i class="ri-more-fill"></i></span>
              </template>
              <b-dropdown-item><i class="ri-eye-fill mr-2"></i>{{ $t('dropdown.view') }}</b-dropdown-item>
              <b-dropdown-item><i class="ri-delete-bin-6-fill mr-2"></i>{{ $t('dropdown.delete') }}</b-dropdown-item>
              <b-dropdown-item><i class="ri-pencil-fill mr-2"></i>{{ $t('dropdown.edit') }}</b-dropdown-item>
              <b-dropdown-item><i class="ri-printer-fill mr-2"></i>{{ $t('dropdown.print') }}</b-dropdown-item>
              <b-dropdown-item><i class="ri-file-download-fill mr-2"></i>{{ $t('dropdown.download') }}</b-dropdown-item>
            </b-dropdown>
          </template>
          <template v-slot:body>
            <ul class="suggestions-lists m-0 p-0">
              <li v-for="(invoice,index) in monthlyInvocie" :key="index" class="d-flex mb-4 align-items-center">
                <div :class="'profile-icon iq-bg-' + invoice.color" ><span><i class="ri-check-fill"></i></span></div>
                <div class="media-support-info ml-3">
                  <h6>{{ invoice.title }}</h6>
                  <p class="mb-0"><span :class="'text-' + invoice.color">{{ invoice.paid_month }} paid</span> month out of {{ invoice.total_month }}</p>
                </div>
                <div class="media-support-amount ml-3">
                  <h6><span :class="'text-' + invoice.color">$</span><b> {{ invoice.amount }}</b></h6>
                  <p class="mb-0">per month</p>
                </div>
              </li>
            </ul>
          </template>
        </iq-card>
      </b-col> -->
    </b-row>
  </b-container>
</template>
<script>
import { core } from '../../config/pluginInit'
// import AmChart from '../../components/core/charts/AmChart'
import ApexChart from '../../components/core/charts/ApexChart'
import API from '@/services/admin'
export default {
  name: 'Dashboard1',
  components: { ApexChart },
  mounted () {
    core.index()
    this.getDataDashboard()
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
          name: 'Total Order',
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
          categories: ['2021-10', '2021-11']
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
              return val
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
      }
    }
  },
  methods: {
    getDataDashboard () {
      core.custLoader(true)
      API.dashboard
        .getChart().then(response => {
          const dt = response.data
          this.dataCount = dt.data
          var dtMonth = []
          var dtPendapatan = []
          for (var i in dt.data) {
            const pd = dt.data[i]
            dtMonth.push(pd['periode'])
            dtPendapatan.push(pd['total_order'])
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
