<template>
  <b-container fluid>
    <b-row>
      <b-col md="12">
        <iq-card>
          <template v-slot:body>
            <ul class="nav nav-pills nav-fill mb-3">
              <li class="nav-item">
                <router-link to="/setting/informasi" class="nav-link iq-waves-effect pr-4">
                  Informasi
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/setting/penjualan" class="nav-link iq-waves-effect pr-4">
                  Penjualan
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/setting/etalase" class="nav-link iq-waves-effect pr-4">
                  Etalase
                </router-link>
              </li>
              <!-- <li class="nav-item">
                <router-link to="/setting/pengiriman" class="nav-link iq-waves-effect pr-4">
                  Pengiriman
                </router-link>
              </li> -->
              <li class="nav-item">
                <a class="nav-link active" href="#">Promo &amp; Voucher</a>
              </li>
              <li class="nav-item">
                <router-link to="/setting/template-chat" class="nav-link iq-waves-effect pr-4">
                  Pesan
                </router-link>
              </li>
            </ul>
            <b-row>
              <b-col md="5">
                <iq-card>
                <template v-slot:headerTitle>
                    <h4 class="card-title ">Buat Voucher Toko Anda</h4>
                </template>
                  <template v-slot:body>
                      <b-form @submit="sendVoucher">
                        <b-form-group
                            class="row"
                            label-cols-sm="3"
                            label="Kode Voucher :"
                            label-for="kode_voucher"
                        >
                            <b-form-input id="kode_voucher" v-model="voc.code" v-bind="money" class="form-control" required></b-form-input>
                        </b-form-group>

                        <b-form-group label="Tipe Diskon :"  label-for="discountType" v-slot="{ ariaDescribeby }">
                            <b-form-radio-group
                                id="discountType"
                                v-model="voc.discount_type"
                                :aria-describedby="ariaDescribeby"
                                name="discountType"
                                required
                            >
                                <b-form-radio value="material">Potongan Harga</b-form-radio>
                                <b-form-radio value="ongkir">Potongan Ongkir</b-form-radio>
                            </b-form-radio-group>
                        </b-form-group>
                        <b-form-row>
                            <b-col md="6">
                                <b-form-group label="Tipe Potongan Voucher :" label-for="typeValue">
                                    <b-form-select id="typeValue" v-model="voc.type_value" required class="mb-3 form-control">
                                        <b-form-select-option value="nominal">Nominal Rupiah</b-form-select-option>
                                        <b-form-select-option value="percentace">Persentase Diskon</b-form-select-option>
                                    </b-form-select>
                                </b-form-group>
                            </b-col>
                            <b-col md="6">
                                <b-form-group label="Jumlah Nominal :" label-for="typeValue">
                                    <b-input-group size="md" append="%" v-if="voc.type_value == 'percentace'">
                                        <money id="typeValue" v-model="voc.value" v-bind="money" class="form-control tarvol1"></money>
                                    </b-input-group>
                                    <b-input-group size="md" prepend="Rp" v-if="voc.type_value == 'nominal'">
                                        <money id="typeValue" v-model="voc.value" v-bind="money" class="form-control disvol1"></money>
                                    </b-input-group>
                                </b-form-group>
                            </b-col>
                        </b-form-row>
                        <b-form-row>
                            <b-col md="12">
                                <label class="col-form-label">Periode Voucher</label>
                            </b-col>
                            <b-col md="5">
                                <label class="col-form-label">Tanggal Mulai :</label>
                                <b-form-input id="startDate" required v-model="voc.start" type="date"></b-form-input>
                            </b-col>
                            <b-col md="1" class="m-auto text-center">&#8212;</b-col>
                            <b-col md="5">
                                <label class="col-form-label">Tanggal Selesai :</label>
                                <b-form-input id="endDate" required v-model="voc.end" type="date"></b-form-input>
                            </b-col>
                        </b-form-row>
                        <div class="mt-3">
                            <b-button type="submit" variant="primary">Buat Voucher</b-button>
                        </div>
                      </b-form>
                  </template>
                </iq-card>
              </b-col>
              <b-col md="7">
                <iq-card>
                <template v-slot:headerTitle>
                    <h4 class="card-title ">Daftar Voucher Aktif</h4>
                </template>
                  <template v-slot:body>
                      <b-table show-empty stacked="md" :items="getVoucherList" :fields="tblVoucher" :current-page="currentPage"
              :per-page="perPage" ref="dTable" :filter="filter" responsive>
                        <template v-slot:cell(no)="row">
                            <span :v-for="row">
                            {{ ((currentPage - 1) * perPage) + (row.index + 1) }}
                            </span>
                        </template>
                        <template v-slot:cell(date)="row">
                            <span>{{ row.item.start }}</span> - <span>{{ row.item.end }}</span>
                        </template>
                        <template v-slot:cell(active)="row">
                            <div>
                              <button v-if="row.item.active == '1'" v-b-tooltip.hover title="Berhentikan kode voucher ini?" @click="statusVoucher(row.item.id)">
                                <b-badge variant="success">Voucher Aktif</b-badge>
                              </button>
                              <button v-else v-b-tooltip.hover title="Aktifkan kode voucher ini?" @click="statusVoucher(row.item.id)">
                                <b-badge variant="dark">Tidak Aktif</b-badge>
                              </button>
                            </div>
                        </template>

                      </b-table>
                  </template>
                </iq-card>
              </b-col>
            </b-row>
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
import { Money } from 'v-money'
import API from '@/services/vendor/material'

export default {
  name: 'SettingPromoVoc',
  components: {
    Money
  },
  mounted () {
    core.index()
  },
  computed: {},
  data () {
    return {
      money: {
        thousands: '.',
        precision: 0,
        masked: false
      },
      voc: {
        code: '',
        discount_type: '',
        type_value: 'nominal',
        value: 0,
        start: '',
        end: ''
      },
      tblVoucher: [
        { key: 'no', label: 'No.' },
        { key: 'code', label: 'Kode Voucher' },
        { key: 'type', label: 'Tipe Voucher' },
        { key: 'type_discount', label: 'Tipe Diskon' },
        { key: 'value', label: 'Nominal' },
        { key: 'date', label: 'Mulai-Berakhir' },
        { key: 'active', label: 'Status' }
      ],
      totalRows: '',
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: []
    }
  },
  methods: {
    getVoucherList (ctx) {
      core.custLoader(true)

      let currPage = (ctx.currentPage - 1) * ctx.perPage
      if (ctx.currentPage === 1) {
        currPage = 0
      }
      let name = ctx.filter
      if (name === null || name === undefined) {
        name = ''
      }
      return API.material
        .getVoucher(currPage, ctx.perPage, name).then(response => {
          const dt = response.data
          if (response.status === 200) {
            this.totalRows = dt._meta.total
            const items = dt.data
            return items || []
          } else if (response.data.errors.length > 0) {
            this.$refs.form.setErrors(response.data.errors)
          }
        }).catch(() => {
          core.showSnackbar('error', 'Maaf, terjadi kesalahan pada sistem.')
        }).finally(() => {
          core.custLoader(false)
        })
    },
    sendVoucher (e) {
      e.preventDefault()
      core.custLoader(true)

      API.material
        .setVoucher(this.voc).then(response => {
          if (response.status === 200) {
            core.showSnackbar('success', 'Voucher berhasil di buat.')
            this.$refs.dTable.refresh()
          }
        }).catch(() => {
          core.showSnackbar('error', 'Maaf, terjadi kesalahan pada sistem.')
        }).finally(() => {
          core.custLoader(false)
        })
    },
    statusVoucher (id) {
      core.custLoader(true)

      API.material
        .statusVoucher(id).then(response => {
          // const dt = response.data
          if (response.status === 200) {
            core.showSnackbar('success', 'Status berhasil di ubah')
            this.$refs.dTable.refresh()
          }
        }).catch(() => {
          core.showSnackbar('error', 'Maaf, terjadi kesalahan pada sistem.')
        }).finally(() => {
          core.custLoader(false)
        })
    }
  }
}

</script>

<style lang="less">
  .tarvol1 {
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
    border: 1px solid #e9edf4;
  }
  .disvol1 {
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
    border: 1px solid #e9edf4;
  }
  .form-control {
      line-height: 30px !important;
  }

</style>
