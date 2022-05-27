<template>
  <div>
    <b-row class="mb-2">
      <b-col md="6">
        <b-form-group label-for="selCodeVendor" label="Pilih kode vendor:">
          <multiselect v-model="vendor.code" :options="vendorOption" :custom-label="codeWithName"
            placeholder="Pilih kode vendor" label="name" track-by="name" id="selCodeVendor"></multiselect>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row v-if="vendor.code != ''">
      <b-col md="6">
        <div class="table-responsive">
          <table class="table table-borderless table-sm">
            <tr>
              <td>Kode Proyek</td>
              <td>: #121212</td>
            </tr>
            <tr>
              <td>Nama Perusahaan</td>
              <td>: Pt Indorama Banten</td>
            </tr>
            <tr>
              <td>Nama Pembeli</td>
              <td>: Sony - 089367825643</td>
            </tr>
            <tr>
              <td>Alamat Perusahaan</td>
              <td>: Jl proyek material tanggerang, banten</td>
            </tr>
            <tr>
              <td>Nama Penerima</td>
              <td>: Nyson Mandela - 08124242445</td>
            </tr>
          </table>
        </div>
      </b-col>
      <b-col md="6">
        <div class="table-responsive">
          <table class="table table-borderless table-sm">
            <tr>
              <td>Total Jumlah Barang</td>
              <td>: 2323 bgt, 213kg</td>
            </tr>
            <tr>
              <td>Total Transaksi</td>
              <td>: Rp 140.000</td>
            </tr>
            <tr>
              <td>Total Diskon</td>
              <td>: Rp 10.000</td>
            </tr>
            <tr>
              <td>Setara Diskon</td>
              <td>: 1%</td>
            </tr>
            <tr>
              <td>Diskon Transportasi</td>
              <td>: Gratis</td>
            </tr>
          </table>
        </div>
      </b-col>
      <hr>
      <b-col md="12">
        <b-table responsive striped hover fixed show-empty class="table-responsive" stacked="lg" :items="items" :fields="fields">
          <template v-slot:cell(dat5)="row">
            <strong>{{ row.item.dat5 }}</strong>
          </template>
          <template v-slot:custom-foot>
            <tr>
              <td :colspan="9" style="background:rgb(236 236 236);">
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
            </tr>
          </template>
        </b-table>
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  name: 'byVendor',
  data () {
    return {
      vendorOption: [{
        code: '01',
        name: 'PT. Vue.js'
      },
      {
        code: '02',
        name: 'CV. Rails'
      },
      {
        code: '03',
        name: 'TB. Sinatra'
      },
      {
        code: '04',
        name: 'RM. Laravel'
      },
      {
        code: '05',
        name: 'Yayasan Phoenix'
      }
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
          label: 'status pengambilan barang vendor'
        },
        {
          key: 'dat2',
          label: 'JM bs lewat di lokasi prj'
        },
        {
          key: 'dat3',
          label: 'kode pembayaran'
        },
        {
          key: 'dat4',
          label: 'kode order tgl kirim'
        },
        {
          key: 'dat5',
          label: 'nama perusahan project'
        },
        {
          key: 'dat6',
          label: 'Nama Material'
        },
        {
          key: 'dat7',
          label: 'volume belanja'
        },
        {
          key: 'dat8',
          label: 'satuan'
        },
        {
          key: 'dat9',
          label: 'harga satuan'
        },
        {
          key: 'dat10',
          label: 'total belanja perjenis'
        },
        {
          key: 'dat11',
          label: 'discount prestasi total sales'
        },
        {
          key: 'dat12',
          label: 'standar jasa transport per billing 5%'
        },
        {
          key: 'dat13',
          label: '% discount transport gabungan menjadi :'
        },
        {
          key: 'dat14',
          label: 'jasa transport perjenis'
        },
        {
          key: 'dat15',
          label: 'total sales perjenis setelah discount '
        }
      ],
      items: [{
        dat1: '1WV>P, 1 wilayah vendor direct to project',
        dat2: '5.2',
        dat3: 'B/K-P88 tgl: 21/Mar',
        dat4: 'P`88,tgl:26/Mar',
        dat5: 'pt.atta askin',
        dat6: 'kawat las',
        dat7: '41',
        dat8: 'kg',
        dat9: '16,500',
        dat10: '676,500',
        dat11: '0.484375',
        dat12: '33825',
        dat13: '0.05',
        dat14: '17,441',
        dat15: '348,820'
      }]
    }
  },
  methods: {
    codeWithName ({
      code,
      name
    }) {
      return `${code} — ${name}`
    }
  }
}

</script>
