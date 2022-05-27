<template>
  <b-container fluid="">
    <b-row>
      <b-col md="12" sm="12">
        <iq-card>
          <template v-slot:body>
              <b-row>
                <b-col md="4" sm="12">
                    <b-form-group class="col-md-12 mb-0" label-class="mb-0" label-size="sm" label="Kode Proyek" label-for="kdproyek">
                        <ValidationProvider name="Kode Proyek">
                          <b-form-input size="sm" v-model="booking.kdproyek" type="text" placeholder="-" disabled></b-form-input>
                        </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-12 mb-0" label-class="mb-0" label-size="sm" label="nama perusahan project" label-for="nperuproject">
                        <ValidationProvider name="nama perusahan project">
                          <b-form-input size="sm" v-model="booking.nperuproject" type="text" placeholder="-" disabled></b-form-input>
                        </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-12 mb-0" label-class="mb-0" label-size="sm" label=" nama pembeli /contact person " label-for="npembeli">
                        <ValidationProvider name=" nama pembeli /contact person ">
                          <b-form-input size="sm" v-model="booking.npembeli" type="text" placeholder="-" disabled></b-form-input>
                        </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-12 mb-0" label-class="mb-0" label-size="sm" label=" Alamat Kantor Project " label-for="alkantor">
                        <ValidationProvider name=" Alamat Kantor Project ">
                          <b-form-input size="sm" v-model="booking.alkantor" type="text" placeholder="-" disabled></b-form-input>
                        </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-12 mb-0" label-class="mb-0" label-size="sm" label=" telpon pembeli " label-for="telpembeli">
                        <ValidationProvider name=" telpon pembeli ">
                          <b-form-input size="sm" v-model="booking.telpembeli" type="text" placeholder="-" disabled></b-form-input>
                        </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-12 mb-0" label-class="mb-0" label-size="sm" label=" website pemilik project " label-for="web">
                        <ValidationProvider name=" website pemilik project ">
                          <b-form-input size="sm" v-model="booking.web" type="text" placeholder="-" disabled></b-form-input>
                        </ValidationProvider>
                    </b-form-group>
                </b-col>
                <b-col md="4" sm="12">
                    <b-form-group class="col-md-12 mb-0" label-class="mb-0" label-size="sm" label=" Nama penerima dilokasi " label-for="npenerima">
                        <ValidationProvider name=" Nama penerima dilokasi ">
                          <b-form-input size="sm" v-model="booking.npenerima" type="text" placeholder="-" disabled></b-form-input>
                        </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-12 mb-0" label-class="mb-0" label-size="sm" label=" contact/ telpon lokasi project " label-for="tellok">
                        <ValidationProvider name=" contact/ telpon lokasi project ">
                          <b-form-input size="sm" v-model="booking.tellok" type="text" placeholder="-" disabled></b-form-input>
                        </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-12 mb-0" label-class="mb-0" label-size="sm" label=" Alamat pengiriman Project " label-for="alpengiriman">
                        <ValidationProvider name=" Alamat pengiriman Project ">
                          <b-form-input size="sm" v-model="booking.alpengiriman" type="text" placeholder="-" disabled></b-form-input>
                        </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-12 mb-0" label-class="mb-0" label-size="sm" label=" lokasi project " label-for="lokproject">
                        <ValidationProvider name=" lokasi project ">
                          <b-form-input size="sm" v-model="booking.lokproject" type="text" placeholder="-" disabled></b-form-input>
                        </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-12 mb-0" label-class="mb-0" label-size="sm" label=" kode pos " label-for="kdpos">
                        <ValidationProvider name=" kode pos ">
                          <b-form-input size="sm" v-model="booking.kdpos" type="text" placeholder="-" disabled></b-form-input>
                        </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-12 mb-0" label-class="mb-0" label-size="sm" label=" GPS project " label-for="gps">
                        <ValidationProvider name=" GPS project ">
                          <b-form-input size="sm" v-model="booking.gps" type="text" placeholder="-" disabled></b-form-input>
                        </ValidationProvider>
                    </b-form-group>
                </b-col>
                <b-col md="4" sm="12">
                    <!-- <b-form-group class="col-md-12 mb-0" label-class="mb-0" label-size="sm" label="-" label-for="-">
                        <ValidationProvider name="-">
                          <b-form-input size="sm" type="text" placeholder="-" disabled></b-form-input>
                        </ValidationProvider>
                    </b-form-group> -->
                    <b-form-group class="col-md-12 mb-0" label-class="mb-0" label-size="sm" label=" total transaksi " label-for="totrans">
                        <ValidationProvider name=" total transaksi ">
                          <b-form-input size="sm" v-model="booking.totrans" type="text" placeholder="-" disabled></b-form-input>
                        </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-12 mb-0" label-class="mb-0" label-size="sm" label=" Total Discount " label-for="todisc">
                        <ValidationProvider name=" Total Discount ">
                          <b-form-input size="sm" v-model="booking.todisc" type="text" placeholder="-" disabled></b-form-input>
                        </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-12 mb-0" label-class="mb-0" label-size="sm" label=" setara discount " label-for="setdisc">
                        <ValidationProvider name=" setara discount ">
                          <b-form-input size="sm" v-model="booking.setdisc" type="text" placeholder="-" disabled></b-form-input>
                        </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-12 mb-0" label-class="mb-0" label-size="sm" label=" Sum of 175:  % discount transport gabungan menjadi : " label-for="kdproyek">
                        <ValidationProvider name=" Sum of 175:  % discount transport gabungan menjadi : ">
                          <b-form-input size="sm" v-model="booking.sumof" type="text" placeholder="-" disabled></b-form-input>
                        </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-12 mb-0" label-class="mb-0" label-size="sm" label="Metode Pembayaran" label-for="pembayaran">
                        <ValidationProvider name="Metode Pembayaran">
                          <b-form-input size="sm" v-model="booking.pembayaran" type="text" placeholder="-" disabled></b-form-input>
                        </ValidationProvider>
                    </b-form-group>
                </b-col>
              </b-row>
            <hr>
            <hr>
              <b-row>
                <b-col md="6">
                    <b-form-group class="col-md-12 mb-0" label-class="mb-0" label-size="sm" label="Status Pembayaran" label-for="statpembayaran">
                        <ValidationProvider name="Status Pembayaran">
                          <b-form-input size="sm" v-model="booking.statpembayaran" type="text" placeholder="-" disabled></b-form-input>
                        </ValidationProvider>
                    </b-form-group>
                </b-col>
                <b-col md="6">
                    <b-form-group class="col-md-12 mb-0" label-class="mb-0" label-size="sm" label="Kode Project" label-for="kdprj">
                        <ValidationProvider name="Kode Project">
                          <b-form-input size="sm" v-model="booking.kdprj" type="text" placeholder="-" disabled></b-form-input>
                        </ValidationProvider>
                    </b-form-group>
                </b-col>
              </b-row>

            <!-- Main table element -->
            <b-table
              show-empty
              stacked="md"
              :items="items"
              :fields="fields"
              :current-page="currentPage"
              :per-page="perPage"
              :filter="filter"
              :filterIncludedFields="filterOn"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              :sort-direction="sortDirection"
              @filtered="onFiltered"
              class="mt-4"
              custom-foot
            >
              <template v-slot:cell(image)="row">
                <img :src="row.value" class="imgTBL">
              </template>

              <template v-slot:cell(actions)="row">
                <b-button size="sm" variant="primary" @click="row" class="mr-1">
                    <div data-icon="" class="icon"></div>
                </b-button>
                <b-button size="sm" variant="danger" @click="row">
                  <div data-icon="" class="icon"></div>
                </b-button>
              </template>

              <template v-slot:row-details="row">
                <b-card>
                  <ul>
                    <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
                  </ul>
                </b-card>
              </template>

              <template v-slot:foot(harsatuan)="">
                Grand Total
              </template>
            </b-table>
            <!-- <b-col sm="12" md="6" class="my-1">
              <b-pagination
                v-model="currentPage"
                :total-rows="totalRows"
                :per-page="perPage"
                align="fill"
                size="sm"
                class="my-0"
              ></b-pagination>
          </b-col> -->
          </template>
        </iq-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { core } from '../../config/pluginInit'
export default {
  name: 'Booking',
  props: {
    toMaterialAdd: { type: Object, default: () => ({ name: 'material.addmaterial' }) }
  },
  mounted () {
    core.index()
    // Set the initial number of items
    this.totalRows = this.items.length
  },
  data () {
    return {
      items: [
        { kdmaterial: '60', material: 'mesin potong keramik', katbahan: 'Umum-Dinding/Lantai-alat Kerja mesin/sewa-besi', volblanja: '18', satuan: 'unit', harsatuan: '720,500', totalblanja: ' 12,969,000 ' }
      ],
      fields: [
        // { key: 'no', label: 'No.', sortable: true, sortDirection: 'asc' },
        { key: 'kdmaterial', label: 'Kode Material' },
        { key: 'material', label: 'Nama Material' },
        { key: 'katbahan', label: 'Kategori Bahan' },
        { key: 'volblanja', label: 'Volume Belanja' },
        { key: 'satuan', label: 'Satuan' },
        { key: 'harsatuan', label: 'Harga Satuan' },
        { key: 'totalblanja', label: 'Total Belanja Perjenis' }
      ],
      booking: {
        kdproyek: '',
        nperuproject: '',
        npembeli: '',
        alkantor: '',
        telpembeli: '',
        web: '',
        npenerima: '',
        tellok: '',
        alpengiriman: '',
        lokproject: '',
        kdpos: '',
        gps: '',
        totrans: '',
        todisc: '',
        setdisc: '',
        sumof: '',
        pembayaran: ''
      },
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      infoModal: {
        id: 'info-modal',
        title: '',
        content: ''
      }
    }
  },
  computed: {
    sortOptions () {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key }
        })
    }
  },
  methods: {
    info (item, index, button) {
      this.infoModal.title = `Row index: ${index}`
      this.infoModal.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal () {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  }
}

</script>

<style>
/* .iq-card-body{
  flex: unset;
} */
.imgTBL {
  width: 100px;
}
</style>
