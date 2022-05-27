<template>
  <b-container fluid="">
    <b-row>
      <b-col md="12" sm="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">PV Transaksi per-Vendor</h4>
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
                              <td>
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
  name: 'TransaksiPerVendor',
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
        // { key: 'no', label: 'No.', sortable: true, sortDirection: 'asc' },
        {
          key: 'dat1',
          label: 'Kode project',
          sortable: true,
          sortDirection: 'asc'
        },
        {
          key: 'dat2',
          label: 'total belanja perjenis'
        },
        {
          key: 'dat3',
          label: 'hemat dari harga awal'
        },
        {
          key: 'dat4',
          label: 'total sales perjenis setelah discount'
        },
        {
          key: 'dat5',
          label: 'jasa transport perjenis'
        },
        {
          key: 'dat6',
          label: 'total sales perjenis setelah discount yang ada expedisinya'
        },
        {
          key: 'dat7',
          label: 'total grup billing Berikut Transport'
        },
        {
          key: 'dat8',
          label: 'total jarak analisa awal'
        },
        {
          key: 'dat9',
          label: 'm3 perjenis material by expedisi'
        },
        {
          key: 'dat10',
          label: 'total rit per jenis'
        }
      ],
      items: [{
        dat1: '41',
        dat2: '676,500',
        dat3: '863,334,564',
        dat4: '348,820',
        dat5: '8,721',
        dat6: '348,820',
        dat7: '1',
        dat8: '53',
        dat9: '3.62474',
        dat10: '11'
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
