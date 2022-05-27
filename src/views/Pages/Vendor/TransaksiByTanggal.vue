<template>
  <b-container fluid="">
    <b-row>
      <b-col md="12" sm="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">View Data</h4>
          </template>
          <template v-slot:body>
            <b-row class="mb-2">
              <b-col md="6">
                <b-form-group label-for="selCodeVendor" label="Pilih kode vendor:">
                  <multiselect v-model="vendor.code" :options="vendorOption" :custom-label="codeWithName" placeholder="Pilih kode vendor" label="name" track-by="name" id="selCodeVendor"></multiselect>
                </b-form-group>
              </b-col>
              <b-col md="6" v-if="vendor.code != ''">
                <b-form-group label-for="tanggal" label="Pilih Tanggal:">
                  <b-form-input v-model="vendor.date" type="date" id="tanggal"> </b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row v-if="vendor.date != ''">
                <b-col md="12">
                    <b-table responsive fixed class="table-responsive" show-empty stacked="lg" :items="items"
                          :fields="fields">
                          <template v-slot:custom-foot>
                            <!-- You can customize this however you want, this is just as an example -->
                            <tr>
                              <td :colspan="6" style="background:rgb(236 236 236);">
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
  name: 'TransaksiByTanggal',
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
        code: '',
        date: ''
      },
      trans: {
        vcode: ''
      },
      fields: [
        {
          key: 'dat1',
          label: 'Kode area project',
          sortable: true,
          sortDirection: 'asc'
        },
        {
          key: 'dat2',
          label: 'KODE JARAK dari vendor ke project per tgl'
        },
        {
          key: 'dat3',
          label: 'Nama Material'
        },
        {
          key: 'dat4',
          label: 'volume belanja'
        },
        {
          key: 'dat5',
          label: 'satuan'
        },
        {
          key: 'dat6',
          label: 'hargasatuan'
        },
        {
          key: 'dat7',
          label: 'total belanja perjenis'
        },
        {
          key: 'dat8',
          label: 'hemat dari harga awal'
        },
        {
          key: 'dat9',
          label: 'total sales perjenis setelah discount'
        },
        {
          key: 'dat10',
          label: 'total grup billing Berikut Transport'
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
