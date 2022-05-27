<template>
  <b-container fluid="">
    <b-row>
      <b-col md="6" offset-md="3">
        <b-card overlay img-src="https://webgradients.com/public/webgradients_png/019%20Malibu%20Beach.png"
          img-alt="Wallet Vendor" img-height="310px">
          <b-row>
            <b-col md="12">
              <div>
                <b-button variant="warning" class="float-right" size="sm" @click="getSaldo">Cek ulang</b-button>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="12">
              <div class="text-center">
                <h3 class="text-white font-weight-bold">Saldo Penjualan</h3>
                <h1 class="text-white font-weight-bold">Rp {{ separatorNum(currentSaldo) }}</h1>
                <b-row>
                  <b-col md="6" class="text-white">
                    <div>Diterima :</div>
                    <div class="font-weight-bold">Rp {{ separatorNum(receiveSaldo) }}</div>
                  </b-col>
                  <b-col md="6" class="text-white">
                    <div>Total :</div>
                    <div class="font-weight-bold">Rp {{ separatorNum(totalSaldo) }}</div>
                  </b-col>
                </b-row>
                <div v-if="currentSaldo != 0">
                    <hr>
                    <b-button variant="success" size="sm" @click="settlementSaldo">Tarik Saldo</b-button>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    <b-col md="6" offset-md="3">
        <b-card>
            <b-list-group>
                <template v-for="(item, k) in listSaldo">
                    <b-list-group-item button :key="k">
                        <div>
                            Periode : {{ item.periode }}
                            <div class="float-right">
                                <b-button variant="info" size="sm">Tarik</b-button>
                            </div>
                            <table class="w-50">
                                <tr>
                                    <td>Diterima</td>
                                    <td>Total</td>
                                    <td>Sisa</td>
                                </tr>
                                <tr>
                                    <td class="font-weight-bold text-success">+ Rp {{ separatorNum(item.diterima) }}</td>
                                    <td class="font-weight-bold">Rp {{ separatorNum(item.total) }}</td>
                                    <td class="font-weight-bold">Rp {{ separatorNum(item.sisa) }}</td>
                                </tr>
                            </table>
                        </div>
                    </b-list-group-item>
                </template>
            </b-list-group>
        </b-card>
    </b-col>
    </b-row>
  </b-container>
</template>
<script>
import {
  core
} from '../../../config/pluginInit'
import API from '@/services/vendor/profile'
import moment from 'moment'
export default {
  name: 'WalletVendor',
  props: {},
  mounted () {
    core.index()
    this.getSaldo()
  },
  data () {
    return {
      currentSaldo: '',
      periodeSaldo: '',
      receiveSaldo: '',
      totalSaldo: '',
      listSaldo: []
    }
  },
  filters: {
    moment: function (date) {
      return moment(date).format('D MMMM YYYY')
    }
  },
  computed: {},
  methods: {
    getSaldo () {
      var walletSaldo = 0
      var receiveSaldo = 0
      var totalsSaldo = 0
      core.custLoader(true)
      API.getRekapSaldo()
        .then(response => {
          const dt = response.data
          if (response.status === 200) {
            for (var i in dt.data) {
              walletSaldo += parseInt(dt.data[i].sisa)
              receiveSaldo += parseInt(dt.data[i].diterima)
              totalsSaldo += parseInt(dt.data[i].total)
            }
            this.currentSaldo = walletSaldo
            this.receiveSaldo = receiveSaldo
            this.totalSaldo = totalsSaldo
            this.listSaldo = dt.data
          } else {
            core.showSnackbar('error', 'Maaf, terjadi kesalahan pada sistem.')
          }
        }).finally(() => {
          core.custLoader(false)
        }).catch(() => {
          core.showSnackbar('error', 'Maaf, terjadi kesalahan pada sistem.')
        })
    },
    settlementSaldo () {
      const conf = confirm('Apakah anda yakin ingin menarik saldo?')

      if (conf) {
        core.custLoader(true)
        API.receiveSaldo()
          .then(response => {
            const dt = response.data
            if (response.status === 200) {
              if (dt.data) {
                this.getSaldo()
              } else {
                core.showSnackbar('error', 'Maaf, Penarikan gagal, siahkan coba lagi.')
              }
            } else {
              core.showSnackbar('error', 'Maaf, terjadi kesalahan pada sistem.')
            }
          }).finally(() => {
            core.custLoader(false)
          }).catch(() => {
            core.showSnackbar('error', 'Maaf, terjadi kesalahan pada sistem.')
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

</style>
