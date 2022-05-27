<template>
  <b-container fluid="">
    <b-row>
      <b-col md="12" sm="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4>Cek Perbandingan Harga Material</h4>
          </template>
          <template v-slot:body>
            <b-row>
              <b-col md="4">
                <b-form-group label-for="selStatus" label="Status">
                  <multiselect v-model="tbl.status" id="selStatus" label="name" track-by="id" @select="refreshTable"
                    placeholder="Ketik disini untuk mencari status..." open-direction="bottom" :options="statusSel"
                    :searchable="true" :internal-search="false" :options-limit="10" :limit="3" :limit-text="limitText"
                    :max-height="600">
                    <span slot="noOptions">Maaf, pilihan tidak tersedia</span>
                    <span slot="noResult">Ups! Status yang anda cari tidak tersedia atau belum terdaftar</span>
                  </multiselect>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group label-for="selMarket" label="Market">
                  <multiselect v-model="tbl.market" id="selMarket" label="name" track-by="id" @select="refreshTable"
                    placeholder="Ketik disini untuk mencari status..." open-direction="bottom" :options="marketSel"
                    :searchable="true" :internal-search="false" :options-limit="10" :limit="3" :limit-text="limitText"
                    :max-height="600">
                    <span slot="noOptions">Maaf, pilihan tidak tersedia</span>
                    <span slot="noResult">Ups! Market yang anda cari tidak tersedia atau belum terdaftar</span>
                  </multiselect>
                </b-form-group>
              </b-col>
            </b-row>
            <div v-if="tbl.market !== '' && tbl.status !== ''">
            <b-row>
              <b-col md="2">
                <b-form-group label-for="selFilter" label="Filter">
                  <multiselect v-model="tbl.filter" id="selFilter" label="name" track-by="id" @select="refreshTable"
                    placeholder="Ketik disini untuk mencari status..." open-direction="bottom" :options="fitlerSel"
                    :searchable="true" :internal-search="false" :options-limit="10" :limit="3" :limit-text="limitText"
                    :max-height="600">
                    <span slot="noOptions">Maaf, pilihan tidak tersedia</span>
                    <span slot="noResult">Ups! Market yang anda cari tidak tersedia atau belum terdaftar</span>
                  </multiselect>
                </b-form-group>
              </b-col>
              <b-col md="10">
                <b-button variant="info" size="sm" class="float-right" @click="showChart = !showChart">View Mode</b-button>
              </b-col>
            </b-row>
            <b-row v-if="!showChart">
              <b-col :md="!showSelf ? '12' : '8'">
                <b-card header-bg-variant="primary" border-variant="secondary" header="Pasar"
                  header-border-variant="secondary" align="left">
                  <template #header>
                    Pasar
                    <b-button class="float-right" variant="success" size="sm" @click="showSelf = !showSelf">Bandingkan
                    </b-button>
                  </template>
                  <b-table responsive :items="getList" :fields="fields" :current-page="currentPage" :per-page="perPage"
                    ref="dTable" hover>
                    <template v-slot:cell(no)="row">
                      <span :v-for="row">
                        {{ ((currentPage - 1) * perPage) + (row.index + 1) }}
                      </span>
                    </template>
                    <template v-slot:cell(alias_name)="row">
                      {{ row.item.alias_name }}

                      <b-button @click="showModalPrice(row.item)" size="sm" v-b-tooltip.top="'Ubah harga material Ini'"
                        variant="warning" class="mr-1">
                        <div data-icon="" class="icon"></div>
                      </b-button>
                      <b-modal :ref="`modalEditPrice${row.item.m_id}`" centered
                        :title="`Ubah harga ${row.item.nama_material}`" ok-title="Ubah harga" size="lg"
                        cancel-title="Batal" @ok="updatePrice(row.item)" @show="setValPrice(row.item)"
                        @hidden="resetModalPrice">
                        <b-row>
                          <b-col md="6">
                            <b-form-group label="Harga Material Sebelumnya :" label-for="priceBefore">
                              <b-input-group size="md" prepend="Rp">
                                <b-form-input v-model="price.hargasebelum" :disabled="true" id="priceBefore"
                                  type="text">
                                </b-form-input>
                              </b-input-group>
                            </b-form-group>
                          </b-col>
                          <b-col md="6">
                            <b-form-group label="Harga Material Sekarang :" label-for="priceAfter">
                              <b-input-group size="md" prepend="Rp">
                                <b-form-input v-model="price.hargasekarang" id="priceAfter" type="text"></b-form-input>
                              </b-input-group>
                            </b-form-group>
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col md="4">
                            <b-form-group class="mb-0">
                              <b-form-checkbox class="d-inline" id="checkVP" v-model="checkDisc" switch
                                @change="toggleVP">
                              </b-form-checkbox>
                              <label for="checkVP">Diskon Grup Penjualan</label>
                            </b-form-group>
                          </b-col>
                          <b-col md="4" v-if="checkDisc == true">
                            <b-form-group label="Lama waktu diskon & Pengiriman :" label-for="dateVP">
                              <date-range-picker id="dateVP" ref="picker" v-model="dateRangeVP"
                                style="height: 35px;line-height: 25px;">
                              </date-range-picker>
                            </b-form-group>
                          </b-col>
                        </b-row>

                        <div v-if="checkDisc == true">
                          <b-row v-for="(input,k) in priceVP" :key="k">
                            <b-col md="4">
                              <b-form-group class="mb-3" label-cols-sm="12"
                                :label="`Target volume penjualan ${ k + 1 }:`">
                                <b-input-group size="md" prepend="Qty">
                                  <money v-model="input.min_order" v-bind="money" class="form-control disvol1"></money>
                                </b-input-group>
                              </b-form-group>
                            </b-col>
                            <b-col md="3">
                              <b-form-group class="mb-3" label-cols-sm="12"
                                :label="`Discount target volume ${ k + 1 }`">
                                <b-input-group size="lg" append="%">
                                  <money v-model="input.discount" v-bind="money" class="form-control tarvol1"></money>
                                </b-input-group>
                              </b-form-group>
                            </b-col>
                            <b-col md="3">
                              <b-form-group class="mb-3" label-cols-sm="12" :label="`Stok Maksimal ${ k + 1 }`">
                                <b-input-group size="lg" append="Qty">
                                  <money v-model="input.max_qty" v-bind="money" class="form-control tarvol1"></money>
                                </b-input-group>
                              </b-form-group>
                            </b-col>
                            <b-col md="1">
                              <b-form-group class="mb-3" label-cols-sm="12" label="-">
                                <b-button v-if="priceVP.length > 2" variant="danger" @click="removePrice(k)">hapus
                                </b-button>
                              </b-form-group>
                            </b-col>
                          </b-row>
                          <b-button variant="success" @click="addPrice" class="float-right">... Tambah lagi</b-button>
                        </div>
                      </b-modal>
                    </template>
                    <template v-slot:cell(harga_sendiri)="row">
                      Rp {{ separatorNum(row.item.harga_sendiri) }}
                    </template>
                    <template v-slot:cell(bulan_1)="row">
                      {{ separatorNum(row.item.range_harga[0].best_price) }}
                      <small v-if="row.item.range_harga[0].rate == '-'" class="d-block">- 0</small>
                      <small v-if="row.item.range_harga[0].rate == 'up'" class="d-block text-danger"><i class="fas fa-caret-up"></i> {{ separatorNum(row.item.range_harga[0].selisih) }}</small>
                      <small v-if="row.item.range_harga[0].rate == 'down'" class="d-block text-success"><i class="fas fa-caret-down"></i>  {{ separatorNum(row.item.range_harga[0].selisih) }}</small>
                    </template>
                    <template v-slot:cell(bulan_2)="row">
                      {{ separatorNum(row.item.range_harga[1].best_price) }}
                      <small v-if="row.item.range_harga[1].rate == '-'" class="d-block">- 0</small>
                      <small v-if="row.item.range_harga[1].rate == 'up'" class="d-block text-danger"><i class="fas fa-caret-up"></i> {{ separatorNum(row.item.range_harga[1].selisih) }}</small>
                      <small v-if="row.item.range_harga[1].rate == 'down'" class="d-block text-success"><i class="fas fa-caret-down"></i>  {{ separatorNum(row.item.range_harga[1].selisih) }}</small>
                    </template>
                    <template v-slot:cell(bulan_3)="row">
                      {{ separatorNum(row.item.range_harga[2].best_price) }}
                      <small v-if="row.item.range_harga[2].rate == '-'" class="d-block">- 0</small>
                      <small v-if="row.item.range_harga[2].rate == 'up'" class="d-block text-danger"><i class="fas fa-caret-up"></i> {{ separatorNum(row.item.range_harga[2].selisih) }}</small>
                      <small v-if="row.item.range_harga[2].rate == 'down'" class="d-block text-success"><i class="fas fa-caret-down"></i>  {{ separatorNum(row.item.range_harga[2].selisih) }}</small>
                    </template>
                    <template v-slot:cell(bulan_4)="row">
                      {{ separatorNum(row.item.range_harga[3].best_price) }}
                      <small v-if="row.item.range_harga[3].rate == '-'" class="d-block">- 0</small>
                      <small v-if="row.item.range_harga[3].rate == 'up'" class="d-block text-danger"><i class="fas fa-caret-up"></i> {{ separatorNum(row.item.range_harga[3].selisih) }}</small>
                      <small v-if="row.item.range_harga[3].rate == 'down'" class="d-block text-success"><i class="fas fa-caret-down"></i>  {{ separatorNum(row.item.range_harga[3].selisih) }}</small>
                    </template>
                    <template v-slot:cell(bulan_5)="row">
                      {{ separatorNum(row.item.range_harga[4].best_price) }}
                      <small v-if="row.item.range_harga[4].rate == '-'" class="d-block">- 0</small>
                      <small v-if="row.item.range_harga[4].rate == 'up'" class="d-block text-danger"><i class="fas fa-caret-up"></i> {{ separatorNum(row.item.range_harga[4].selisih) }}</small>
                      <small v-if="row.item.range_harga[4].rate == 'down'" class="d-block text-success"><i class="fas fa-caret-down"></i>  {{ separatorNum(row.item.range_harga[4].selisih) }}</small>
                    </template>
                    <template v-slot:cell(bulan_6)="row">
                      {{ separatorNum(row.item.range_harga[5].best_price) }}
                      <small v-if="row.item.range_harga[5].rate == '-'" class="d-block">- 0</small>
                      <small v-if="row.item.range_harga[5].rate == 'up'" class="d-block text-danger"><i class="fas fa-caret-up"></i> {{ separatorNum(row.item.range_harga[5].selisih) }}</small>
                      <small v-if="row.item.range_harga[5].rate == 'down'" class="d-block text-success"><i class="fas fa-caret-down"></i>  {{ separatorNum(row.item.range_harga[5].selisih) }}</small>
                    </template>
                    <template v-slot:cell(bulan_7)="row">
                      {{ separatorNum(row.item.range_harga[6].best_price) }}
                      <small v-if="row.item.range_harga[6].rate == '-'" class="d-block">- 0</small>
                      <small v-if="row.item.range_harga[6].rate == 'up'" class="d-block text-danger"><i class="fas fa-caret-up"></i> {{ separatorNum(row.item.range_harga[6].selisih) }}</small>
                      <small v-if="row.item.range_harga[6].rate == 'down'" class="d-block text-success"><i class="fas fa-caret-down"></i>  {{ separatorNum(row.item.range_harga[6].selisih) }}</small>
                    </template>
                    <template v-slot:cell(bulan_8)="row">
                      {{ separatorNum(row.item.range_harga[7].best_price) }}
                      <small v-if="row.item.range_harga[7].rate == '-'" class="d-block">- 0</small>
                      <small v-if="row.item.range_harga[7].rate == 'up'" class="d-block text-danger"><i class="fas fa-caret-up"></i> {{ separatorNum(row.item.range_harga[7].selisih) }}</small>
                      <small v-if="row.item.range_harga[7].rate == 'down'" class="d-block text-success"><i class="fas fa-caret-down"></i>  {{ separatorNum(row.item.range_harga[7].selisih) }}</small>
                    </template>
                    <template v-slot:cell(bulan_9)="row">
                      {{ separatorNum(row.item.range_harga[8].best_price) }}
                      <small v-if="row.item.range_harga[8].rate == '-'" class="d-block">- 0</small>
                      <small v-if="row.item.range_harga[8].rate == 'up'" class="d-block text-danger"><i class="fas fa-caret-up"></i> {{ separatorNum(row.item.range_harga[8].selisih) }}</small>
                      <small v-if="row.item.range_harga[8].rate == 'down'" class="d-block text-success"><i class="fas fa-caret-down"></i>  {{ separatorNum(row.item.range_harga[8].selisih) }}</small>
                    </template>
                    <template v-slot:cell(bulan_10)="row">
                      {{ separatorNum(row.item.range_harga[9].best_price) }}
                      <small v-if="row.item.range_harga[9].rate == '-'" class="d-block">- 0</small>
                      <small v-if="row.item.range_harga[9].rate == 'up'" class="d-block text-danger"><i class="fas fa-caret-up"></i> {{ separatorNum(row.item.range_harga[9].selisih) }}</small>
                      <small v-if="row.item.range_harga[9].rate == 'down'" class="d-block text-success"><i class="fas fa-caret-down"></i>  {{ separatorNum(row.item.range_harga[9].selisih) }}</small>
                    </template>
                    <template v-slot:cell(bulan_11)="row">
                      {{ separatorNum(row.item.range_harga[10].best_price) }}
                      <small v-if="row.item.range_harga[10].rate == '-'" class="d-block">- 0</small>
                      <small v-if="row.item.range_harga[10].rate == 'up'" class="d-block text-danger"><i class="fas fa-caret-up"></i> {{ separatorNum(row.item.range_harga[10].selisih) }}</small>
                      <small v-if="row.item.range_harga[10].rate == 'down'" class="d-block text-success"><i class="fas fa-caret-down"></i>  {{ separatorNum(row.item.range_harga[10].selisih) }}</small>
                    </template>
                    <template v-slot:cell(bulan_12)="row">
                      {{ separatorNum(row.item.range_harga[11].best_price) }}
                      <small v-if="row.item.range_harga[11].rate == '-'" class="d-block">- 0</small>
                      <small v-if="row.item.range_harga[11].rate == 'up'" class="d-block text-danger"><i class="fas fa-caret-up"></i> {{ separatorNum(row.item.range_harga[11].selisih) }}</small>
                      <small v-if="row.item.range_harga[11].rate == 'down'" class="d-block text-success"><i class="fas fa-caret-down"></i>  {{ separatorNum(row.item.range_harga[11].selisih) }}</small>
                    </template>
                    <template v-slot:cell(actions)="row">
                      <router-link :to="`material/${row.item.m_id}`">
                        <b-button size="sm" v-b-tooltip.top="'Lihat material'" variant="info" class="mr-1">
                          <!-- <div data-icon="" class="icon"></div> -->View
                        </b-button>
                      </router-link>
                    </template>
                  </b-table>
                </b-card>
                <b-col sm="12" md="6" class="my-1">
                  <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="fill" size="sm"
                    class="my-0"></b-pagination>
                </b-col>
              </b-col>
              <b-col md='4' v-if="showSelf">
                <b-card header-bg-variant="primary" border-variant="secondary" header="Sendiri"
                  header-border-variant="secondary" align="center">
                  <!-- <b-table responsive :items="getList" :fields="fieldss" :current-page="currentPage" :per-page="perPage"
                    ref="dTable" hover>
                    <template v-slot:cell(no)="row">
                      <span :v-for="row">
                        {{ ((currentPage - 1) * perPage) + (row.index + 1) }}
                      </span>
                    </template>
                    <template v-slot:cell(harga_material)="row">
                      Rp {{ separatorNum(row.item.harga_material) }}
                    </template>
                    <template v-slot:cell(bulan_1)="row">
                      {{  separatorNum(Math.floor(Math.random()*90000) + 10000) }}
                    </template>
                    <template v-slot:cell(bulan_2)="row">
                      {{  separatorNum(Math.floor(Math.random()*9000) + 1000) }}
                    </template>
                    <template v-slot:cell(bulan_3)="row">
                      {{  separatorNum(Math.floor(Math.random()*90000) + 10000) }}
                    </template>
                    <template v-slot:cell(bulan_4)="row">
                      {{  separatorNum(Math.floor(Math.random()*9000) + 1000) }}
                    </template>
                    <template v-slot:cell(bulan_5)="row">
                      {{  separatorNum(Math.floor(Math.random()*90000) + 10000) }}
                    </template>
                    <template v-slot:cell(bulan_6)="row">
                      {{  separatorNum(Math.floor(Math.random()*900) + 100) }}
                    </template>
                    <template v-slot:cell(bulan_7)="row">
                      {{  separatorNum(Math.floor(Math.random()*90000) + 10000) }}
                    </template>
                    <template v-slot:cell(bulan_8)="row">
                      {{  separatorNum(Math.floor(Math.random()*9000) + 1000) }}
                    </template>
                    <template v-slot:cell(bulan_9)="row">
                      {{  separatorNum(Math.floor(Math.random()*900) + 100) }}
                    </template>
                    <template v-slot:cell(bulan_10)="row">
                      {{  separatorNum(Math.floor(Math.random()*90) + 10) }}
                    </template>
                    <template v-slot:cell(bulan_11)="row">
                      {{  separatorNum(Math.floor(Math.random()*9000) + 1000) }}
                    </template>
                    <template v-slot:cell(bulan_12)="row">
                      {{  separatorNum(Math.floor(Math.random()*900) + 100) }}
                    </template>
                    <template v-slot:cell(actions)="row">
                      <router-link :to="`material/${row.item.m_id}`">
                        <b-button size="sm" v-b-tooltip.top="'Lihat material'" variant="info" class="mr-1">
                        </b-button>
                      </router-link>
                    </template>
                  </b-table> -->
                  <b-col sm="12" md="6" class="my-1">
                    <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="fill"
                      size="sm" class="my-0"></b-pagination>
                  </b-col>
                </b-card>
              </b-col>
            </b-row>
            <b-row v-if="showChart">
              <b-col md="12">
                <iq-card>
                  <template v-slot:headerTitle>
                    <h4>{{ titleChart }}</h4>
                  </template>
                  <template v-slot:body>
                    <ApexChart :element="typeChart" :chartOption="bodyData"/>
                  </template>
                </iq-card>
              </b-col>
            </b-row>
            </div>
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
import API from '@/services/vendor/material'
import ApexChart from '../../../components/core/charts/ApexChart'
import moment from 'moment'
import { mapGetters } from 'vuex'

// var data = {
//   'result': [{
//     'invoice_id': '1421133162796290048',
//     'status_order': 2,
//     'list': [{
//       'alias_name': 'Asbes PVC Semen Kualitas Terbaik Tebal 4 CM',
//       'type_category': '12-31-44-4',
//       'harga_material': '30000',
//       'm_id': '122121'
//     },
//     {
//       'alias_name': 'Pipa Kabel 3/9',
//       'type_category': '12-31-44-2',
//       'harga_material': '15000',
//       'm_id': '122122'
//     },
//     {
//       'alias_name': 'Kayu Pemisah Meranti',
//       'type_category': '12-31-44-4',
//       'harga_material': '30000',
//       'm_id': '122123'
//     },
//     {
//       'alias_name': 'tripleks 6mm',
//       'type_category': '12-31-44-2',
//       'harga_material': '15000',
//       'm_id': '122124'
//     },
//     {
//       'alias_name': 'Pasang Batu Bata 1/2',
//       'type_category': '12-31-44-4',
//       'harga_material': '30000',
//       'm_id': '122125'
//     },
//     {
//       'alias_name': 'Asbes Putih original',
//       'type_category': '12-31-44-2',
//       'harga_material': '15000',
//       'm_id': '122126'
//     }
//     ]
//   }]
// }

export default {
  name: 'CompetitorList',
  props: {},
  mounted () {
    core.index()
  },
  components: {
    ApexChart
  },
  data () {
    return {
      titleChart: 'Line Chart',
      typeChart: 'line',
      bodyData: {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          }
        },
        series: [],
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        title: {
          text: 'Product Trends by Month',
          align: 'left'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        },
        xaxis: {
          categories: ['Bulan 1', 'Bulan 2', 'Bulan 3', 'Bulan 4', 'Bulan 5', 'Bulan 6', 'Bulan 7', 'Bulan 8', 'Bulan 9', 'Bulan 10', 'Bulan 11', 'Bulan 12']
        }
      },
      fields: [{
        key: 'no',
        label: 'No.',
        sortable: true,
        sortDirection: 'asc'
      },
      {
        key: 'nama_material',
        label: 'Material'
      },
      // {
      //   key: 'type_category',
      //   label: 'Tipe Kategori'
      // },
      {
        key: 'harga_sendiri',
        label: 'Harga Normal'
      },
      {
        key: 'bulan_1',
        label: 'Bulan 1'
      },
      {
        key: 'bulan_2',
        label: 'Bulan 2'
      },
      {
        key: 'bulan_3',
        label: 'Bulan 3'
      },
      {
        key: 'bulan_4',
        label: 'Bulan 4'
      },
      {
        key: 'bulan_5',
        label: 'Bulan 5'
      },
      {
        key: 'bulan_6',
        label: 'Bulan 6'
      },
      {
        key: 'bulan_7',
        label: 'Bulan 7'
      },
      {
        key: 'bulan_8',
        label: 'Bulan 8'
      },
      {
        key: 'bulan_9',
        label: 'Bulan 9'
      },
      {
        key: 'bulan_10',
        label: 'Bulan 10'
      },
      {
        key: 'bulan_11',
        label: 'Bulan 11'
      },
      {
        key: 'bulan_12',
        label: 'Bulan 12'
      }
        //   {
        //     key: 'actions',
        //     label: 'Aksi'
        //   }
      ],
      fieldss: [{
        key: 'harga_material',
        label: 'Harga Milikmu'
      },
      {
        key: 'bulan_1',
        label: 'Bulan 1'
      },
      {
        key: 'bulan_2',
        label: 'Bulan 2'
      },
      {
        key: 'bulan_3',
        label: 'Bulan 3'
      },
      {
        key: 'bulan_4',
        label: 'Bulan 4'
      },
      {
        key: 'bulan_5',
        label: 'Bulan 5'
      },
      {
        key: 'bulan_6',
        label: 'Bulan 6'
      },
      {
        key: 'bulan_7',
        label: 'Bulan 7'
      },
      {
        key: 'bulan_8',
        label: 'Bulan 8'
      },
      {
        key: 'bulan_9',
        label: 'Bulan 9'
      },
      {
        key: 'bulan_10',
        label: 'Bulan 10'
      },
      {
        key: 'bulan_11',
        label: 'Bulan 11'
      },
      {
        key: 'bulan_12',
        label: 'Bulan 12'
      }
        //   {
        //     key: 'actions',
        //     label: 'Aksi'
        //   }
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
      showSelf: false,
      showChart: false,
      statusSel: [{
        name: 'Wishlist',
        id: 1
      },
      {
        name: 'Keranjang',
        id: 2
      },
      {
        name: 'Deal',
        id: 3
      }
      ],
      marketSel: [{
        name: 'Barang Sendiri',
        id: 1
      },
      {
        name: 'Permintaan 1 Zona Kota',
        id: 2
      },
      {
        name: 'Permintaan 1 Zona Provinsi',
        id: 3
      },
      {
        name: 'Permintaan Se Indonesia',
        id: 4
      }
      ],
      fitlerSel: [{
        name: 'Harga Terendah',
        id: 1
      },
      {
        name: 'Harga Tertinggi',
        id: 2
      },
      {
        name: 'Harga Rata-Rata',
        id: 3
      }
      ],
      seltab: false,
      tbl: {
        status: '',
        market: '',
        filter: ''
      },
      priceVP: [{
        min_order: '',
        discount: '',
        max_qty: ''
      }],
      money: {
        thousands: '.',
        precision: 0,
        masked: false
      },
      checkDisc: false,
      mid_d: '',
      dateRangeVP: {
        startDate: null,
        endDate: null
      },
      dateRangeDeliv: {
        startDate: null,
        endDate: null
      },
      price: {
        hargasebelum: '',
        hargasekarang: ''
      }
    }
  },
  filters: {
    moment: function (date) {
      return moment(date).format('D MMMM YYYY')
    }
  },
  computed: {
    ...mapGetters({
      userData: 'authModule/getUserData'
    })
  },
  methods: {
    limitText (count) {
      return `and ${count} other status`
    },
    getList (ctx) {
      core.custLoader(true)
      const vid = this.userData.user.id
      var prov = ''
      if (this.tbl.market.id >= 3) {
        prov = this.userData.user.address.id_prov
      }
      return API.material
        .getCompetitor(vid, this.tbl.market.id, 3276, prov).then(response => {
          const dt = response.data
          var forChart = []
          if (response.status) {
            this.totalRows = 20
            const items = dt.data
            for (var i in dt.data) {
              const dta = dt.data[i]
              forChart.push({ name: dta.nama_material, data: [] })
              for (var x in dta.range_harga) {
                const dtb = dta.range_harga[x]
                forChart[i].data.push(dtb.best_price)
              }
            }
            this.bodyData.series = forChart
            return items || []
          }
        }).catch(() => {
          core.showSnackbar('error', 'Terjadi kesalahan...')
        }).finally(() => { core.custLoader(false) })
    },
    separatorNum (val) {
      if (typeof val === 'undefined' || val === null || val === 'null') {
        return null
      }
      val = parseFloat(val)
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    refreshTable () {
      this.$refs.dTable.refresh()
    },
    showModalPrice (mdt) {
      // core.custLoader(true)
      // API.material
      //   .getDiscount(mdt.m_id).then(response => {
      //     const dt = response.data
      //     if (response.status) {
      //       this.priceVP = dt.data
      //       if (dt.data.length > 0 && mdt.join === '1') {
      //         this.checkDisc = true
      //       }
      //       this.mid_d = dt.data[0].m_id
      //       this.$refs.dTable.refresh()
      //     }
      //   }).finally(() => {
      //     core.custLoader(false)

      this.$refs['modalEditPrice' + mdt.m_id].show()
      //   })
    },
    showModalChart (mdt) {
      this.$refs['modalViewChart' + mdt.m_id].show()
    },
    resetModalPrice () {
      this.priceVP = {
        min_order: '',
        discount: '',
        max_qty: ''
      }
      this.checkDisc = false
      this.price.hargasekarang = ''
    },
    toggleVP () {
      core.custLoader(true)
      // API.material
      //   .toggleVP(this.mid_d).then(response => {
      //     if (response.status) {
      //       core.showSnackbar('success', 'Ubah status diskon berhasil.')
      //       this.$refs.dTable.refresh()
      //     }
      //   }).finally(() => {
      //     core.custLoader(false)
      //   })
    },
    setValPrice (data) {
      this.price.hargasebelum = this.separatorNum(data.harga_material)
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

  #priceBefore,
  #priceAfter,
  .disvol1 {
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
    border: 1px solid #e9edf4;
  }

  .tarvol1 {
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
    border: 1px solid #e9edf4;
  }

  .calendars-container {
    -webkit-box-flex: 0;
    flex: 0 0 66.666667%;
    max-width: 66.666667%;
  }

  .reportrange-text {
    height: 35px !important;
    line-height: 25px !important;
  }

</style>
