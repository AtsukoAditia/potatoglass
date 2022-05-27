<template>
  <b-container fluid="">
    <b-row>
      <b-col md="12" sm="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">PV Transaksi per-Material</h4>
          </template>
          <template v-slot:body>
            <b-row class="mb-2">
              <b-col md="6">
                <b-form-group label-for="selCodeVendor" label="Pilih kode vendor:">
                  <multiselect v-model="vendor.code" :options="vendorOption" :custom-label="codeWithName" placeholder="Pilih kode vendor" label="name" track-by="name" id="selCodeVendor"></multiselect>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row v-if="vendor.code != ''">
                <b-col md="12">
                    <b-table responsive fixed class="table-responsive" show-empty stacked="lg" :items="items"
                          :fields="fields">
                          <template v-slot:custom-foot>
                            <!-- You can customize this however you want, this is just as an example -->
                            <tr style="background:rgb(236 236 236);">
                              <td :colspan="13">
                                <b>Grand Total</b>
                              </td>
                              <td>
                                -
                              </td>
                              <td>
                                -
                              </td>
                              <td>
                                -
                              </td>
                              <td>
                                -
                              </td>
                              <td>
                                -
                              </td>
                              <td>
                                -
                              </td>
                              <td>
                                -
                              </td>
                            </tr>
                          </template>
                        </b-table>
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
export default {
  name: 'TransaksiJenisMaterial',
  props: {},
  mounted () {
    core.index()
  },
  data () {
    return {
      vendorOption: [
        { code: '01', name: 'PT. Vue.js' },
        { code: '02', name: 'CV. Rails' },
        { code: '03', name: 'TB. Sinatra' },
        { code: '04', name: 'RM. Laravel' },
        { code: '05', name: 'Yayasan Phoenix' }
      ],
      vendor: {
        code: ''
      },
      trans: {
        vcode: ''
      },
      fields: [
        {
          key: 'dat1',
          label: 'Kategori Bahan',
          sortable: true
        },
        {
          key: 'dat2',
          label: 'no kode material',
          sortable: true
        },
        {
          key: 'dat3',
          label: 'Nama Material',
          sortable: true
        },
        {
          key: 'dat4',
          label: 'harga satuan',
          sortable: true
        },
        {
          key: 'dat5',
          label: 'kode prj',
          sortable: true
        },
        {
          key: 'dat6',
          label: 'nama perusahan project',
          sortable: true
        },
        {
          key: 'dat7',
          label: 'kode area prj',
          sortable: true
        },
        {
          key: 'dat8',
          label: 'discount prestasi total sales',
          sortable: true
        },
        {
          key: 'dat9',
          label: '% discount transport gabungan menjadi',
          sortable: true
        },
        {
          key: 'dat10',
          label: 'tgl order prj',
          sortable: true
        },
        {
          key: 'dat11',
          label: 'tgl terakhir ambil dr vendor',
          sortable: true
        },
        {
          key: 'dat12',
          label: 'Discount Wishlist',
          sortable: true
        },
        {
          key: 'dat13',
          label: 'harga satuan wishlist',
          sortable: true
        },
        {
          key: 'dat14',
          label: 'anggaran sales wishlist',
          sortable: true
        },
        {
          key: 'dat15',
          label: 'volume belanja',
          sortable: true
        },
        {
          key: 'dat16',
          label: 'Total vol RAB sd hari ini',
          sortable: true
        },
        {
          key: 'dat17',
          label: 'volume wish list',
          sortable: true
        },
        {
          key: 'dat18',
          label: 'total belanja perjenis',
          sortable: true
        },
        {
          key: 'dat19',
          label: 'hemat dari harga awal',
          sortable: true
        },
        {
          key: 'dat20',
          label: 'total sales perjenis setelah discount',
          sortable: true
        }
      ],
      items: [{
        dat1: 'Tahap Struktur-Struktur-Perekat-Semen/Pasir/Beton/Besi/Spesi',
        dat2: '144',
        dat3: 'gouting anti susut (non shrinkage)',
        dat4: '99,550',
        dat5: '5',
        dat6: '348,820',
        dat7: '1',
        dat8: '53',
        dat9: '3.62474',
        dat10: '11',
        dat11: '41',
        dat12: '676,500',
        dat13: '863,334,564',
        dat14: '348,820',
        dat15: '8,721',
        dat16: '348,820',
        dat17: '1',
        dat18: '53',
        dat19: '3.62474',
        dat20: '11'
      }]
    }
  },
  computed: {},
  methods: {
    codeWithName ({ code, name }) {
      return `${code} — ${name}`
    }
  }
}

</script>

<style>
  .headWidth {
    min-width: 200px;
  }

</style>
