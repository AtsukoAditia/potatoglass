<template>
  <div>
    <b-row class="mb-2">
      <b-col md="6">
        <b-form-group label-for="selCodeMaterial" label="Pilih kode material:">
          <multiselect v-model="vendor.material" :options="kmaterialSel" :custom-label="idWithName"
            placeholder="Pilih salah satu" label="nama" track-by="nama" id="selCodeMaterial"></multiselect>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row v-if="vendor.material != ''">
      <b-col md="6">
        <div class="table-responsive">
          <table class="table table-borderless table-sm">
            <tr>
              <td>Kategori di RAB</td>
              <td>: Material Penunjang</td>
            </tr>
            <tr>
              <td>Fungsi Material</td>
              <td>: Element Utama</td>
            </tr>
            <tr>
              <td>Kategori Bahan</td>
              <td>: Pasangan</td>
            </tr>
          </table>
        </div>
      </b-col>
      <b-col md="6">
        <div class="table-responsive">
          <table class="table table-borderless table-sm">
            <tr>
              <td>Pasangan di Bidang</td>
              <td>: Baja Struktur</td>
            </tr>
            <tr>
              <td>Bahan Utama</td>
              <td>: Besi / Baja</td>
            </tr>
            <tr>
              <td>Harga</td>
              <td>: Rp 100.000</td>
            </tr>
          </table>
        </div>
      </b-col>
      <hr>
      <b-col md="12">
        <b-table responsive striped hover fixed show-empty class="table-responsive" stacked="lg" :items="items" :fields="fields">
          <template v-slot:cell(dat6)="row">
            <strong>{{ row.item.dat6 }}</strong>
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
  name: 'byTransport',
  data () {
    return {
      kmaterialSel: [
        { id: 1, nama: 'baja canal c' },
        { id: 2, nama: 'baja c channel (gording)' },
        { id: 3, nama: 'ankur baja 12 -19 mm' },
        { id: 4, nama: 'atap baja ringan' }
      ],
      vendor: {
        material: ''
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
        dat6: 'Baja Wf',
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
    idWithName ({
      id,
      nama
    }) {
      return `${id} — ${nama}`
    }
  }
}

</script>
