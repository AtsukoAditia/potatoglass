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
              <b-col md="6">
                <b-form-group label-for="selMaterial" label="Kategori Material">
                  <multiselect v-model="sendDt.idMaterial" id="selMaterial" label="nama_material" track-by="id"
                    placeholder="Pilih material untuk melihat data" open-direction="bottom"
                    :options="kmaterialSel" :searchable="true" @select="actSelSearch">
                    <span slot="noOptions">Maaf, pilihan tidak tersedia</span>
                    <span slot="noResult">Ups! Nama yang anda cari tidak tersedia atau belum terdaftar</span>
                  </multiselect>
                </b-form-group>
              </b-col>
              <b-col md="3">
                <b-form-group label="Provinsi Daerah" label-for="selProv">
                  <ValidationProvider name="Provinsi" rules="required" v-slot="{ errors }">
                    <multiselect id="selProv" v-model="sendDt.idProv" :options="getProv" track-by="nama" label="nama"
                      :class="(errors.length > 0 ? ' is-invalid' : '')" @select="getKota"></multiselect>
                    <div class="invalid-feedback">
                      <span>{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>
                </b-form-group>
              </b-col>
              <b-col md="3">
                <b-form-group label="Kota Daerah" label-for="selKot">
                      <ValidationProvider name="Kota" rules="required" v-slot="{ errors }">
                          <multiselect id="selKot" v-model="sendDt.idKot" :options="getKab" track-by="nama" label="nama" :class="(errors.length > 0 ? ' is-invalid' : '')" @select="getData"></multiselect>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
              </b-col>
            </b-row>
            <br>
            <b-table v-if="seltab == true" :items="getList" :fields="fields" :current-page="currentPage" :per-page="perPage" ref="dTable">
              <template v-slot:cell(no)="row">
                <span :v-for="row">
                  {{ ((currentPage - 1) * perPage) + (row.index + 1) }}
                </span>
              </template>
              <template v-slot:cell(harga_material)="row">
                Rp {{ separatorNum(row.item.harga_material) }}
              </template>
              <template v-slot:cell(actions)="row">
                <!-- <router-link :to="{ name: 'booking.detail', params: {id: row.item.order_id} }">
                  <b-button size="sm" v-b-tooltip.top="'Lihat detail pesanan'" variant="info" class="mr-1">
                    <div data-icon="" class="icon"></div>
                  </b-button>
                </router-link> -->
                 <router-link :to="`material/${row.item.m_id}`">
                 <b-button size="sm" v-b-tooltip.top="'Lihat material'" variant="info" class="mr-1">
                    <!-- <div data-icon="" class="icon"></div> -->View
                  </b-button>
                </router-link>
                <!-- <b-button size="sm" v-b-tooltip.top="'Hapus Data'" variant="danger" class="mr-1"
                  @click="delWarehouse(row.item)">
                  <div data-icon="" class="icon"></div>
                </b-button> -->
              </template>
            </b-table>
            <b-col v-if="seltab == true" sm="12" md="6" class="my-1">
              <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="fill" size="sm"
                class="my-0"></b-pagination>
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
import API from '@/services/vendor/material'
import APIdaerah from '@/services/admin'
import moment from 'moment'
import debounce from 'lodash.debounce'
export default {
  name: 'PriceComparison',
  props: {},
  mounted () {
    core.index()
    this.getMasterMaterial()
  },
  data () {
    return {
      fields: [{
        key: 'no',
        label: 'No.',
        sortable: true,
        sortDirection: 'asc'
      },
      {
        key: 'alias_name',
        label: 'Material'
      },
      {
        key: 'harga_material',
        label: 'Harga'
      },
      //   {
      //     key: 'pic',
      //     label: 'Stok'
      //   },
      {
        key: 'name_vendor',
        label: 'Nama Vendor'
      },
      // { key: 'status_order', label: 'Status' },
      {
        key: 'actions',
        label: 'Aksi'
      }
      ],
      totalRows: '',
      currentPage: 1,
      perPage: 15,
      pageOptions: [5, 10, 15],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      kmaterialSel: [],
      sendDt: {
        idMaterial: '',
        idProv: '',
        idKot: ''
      },
      getProv: [],
      getKab: [],
      seltab: false
    }
  },
  filters: {
    moment: function (date) {
      return moment(date).format('D MMMM YYYY')
    }
  },
  computed: {},
  methods: {
    limitText (count) {
      return `and ${count} other material`
    },
    asyncFind: debounce(
      function (name) {
        if (name) {
          API.material
            .getMasterMatPHP().then(response => {
              this.kmaterialSel = response.data.data
              // this.isDisable = true
            })
        }
      }, 1000),
    getMasterMaterial () {
      API.material
        .getMasterMatPHP().then(response => {
          this.kmaterialSel = response.data.data
          // this.isDisable = true
        })
    },
    actSelSearch (data) {
      APIdaerah.address
        .getAddress('prov', 'no').then(response => {
          var dt = response.data
          if (response.status === 200) {
            this.getProv = dt.data
          }
        })
    },
    getKota (dt) {
      APIdaerah.address
        .getAddress('kab', dt.id_prov).then(response => {
          var dt = response.data
          if (response.status === 200) {
            this.getKab = dt.data
          }
        })
    },
    getData () {
      this.seltab = true
      this.$refs.dTable.refresh()
    },
    getList (ctx) {
      core.custLoader(true)
      let currPage = (ctx.currentPage - 1) * ctx.perPage
      if (ctx.currentPage === 1) {
        currPage = 0
      }
      let name = ctx.filter
      if (name === null) {
        name = ''
      }
      return API.material
        .getMaterialDaerah(currPage, ctx.perPage, this.sendDt.idMaterial.id, this.sendDt.idProv.id_prov, this.sendDt.idKot.id_kab).then(response => {
          if (response.status) {
            this.totalRows = response.data._meta.total
            const items = response.data.data
            return items || []
          } else if (response.data.errors.length > 0) {
            this.$refs.dTable.setErrors(response.data.errors)
          }
        }).catch(() => {}).finally(() => {
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
  /* .iq-card-body{
  flex: unset;
} */
  .imgTBL {
    width: 80px;
  }

</style>
