<template>
  <b-container fluid="">
    <b-row>
      <b-col md="12" sm="12">
        <iq-card>
          <template v-slot:body>
            <b-row>
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
            >
              <template v-slot:cell(image)="row">
                <a :href="row.value" target="_blank">
                  <b-img :src="row.value" class="imgTBL" rounded></b-img>
                </a>
              </template>

              <template v-slot:cell(detail)="row">
                <p>
                  <span class="d-block"><b>Kat. di RAB:</b> {{ row.item.detail['cat'] }}</span>
                  <span class="d-block"><b>Pas. di Bidang:</b> {{ row.item.detail['pas'] }}</span>
                  <span class="d-block"><b>Bah. Utama:</b> {{ row.item.detail['bah'] }}</span>
                  <span class="d-block"><b>Fung. Material:</b> {{ row.item.detail['fung'] }}</span>
                </p>
              </template>

              <template v-slot:cell(harga)="row">
                Rp {{ row.item.harga }}/{{ row.item.satuan }}
              </template>

              <template v-slot:cell(name)="row">
                <router-link :to="{ name: 'material.detailmaterial', params: {id: row.item.id_} }">{{ row.item.name }}</router-link>
              </template>

              <template v-slot:cell(status)="row">
                <div>
                  <span>Tampil : </span>
                  <b-badge v-if="row.item.status['tampil'] == true" variant="success">Ya</b-badge>
                  <b-badge v-else variant="dark">Tidak</b-badge>
                </div>
                <div>
                  <span>Gabungan : </span>
                  <b-badge v-if="row.item.status['gabungan'] == true" variant="success">Ya</b-badge>
                  <b-badge v-else variant="dark">Tidak</b-badge>
                </div>
              </template>

              <template v-slot:cell(actions)="row">
                <router-link :to="`wishlist/${ row.item['id'] }`">
                  <b-button v-b-tooltip.top="'Lihat Detail'" size="sm" variant="info" class="mr-1">
                    <div data-icon="" class="icon"></div>
                  </b-button>
                </router-link>
                <b-modal id="modalPenawaran" centered title="Form Penawaran Khusus" ok-title="Kirim" cancel-title="Batal" size="xl">
                  <b-container>
                    <b-row class="mb-3">
                      <b-col md='4'>
                        <div class="d-block text-dark">Penawaran Invoice Nomor :
                        </div>
                      </b-col>
                      <b-col md='8' class="mb-2">
                        <b-form-input v-model="penawaranModal.invoiceNo" type="text" placeholder="-" size="sm"></b-form-input>
                      </b-col>
                      <b-col md='4'>
                        <div class="d-block text-dark">Kepada :
                        </div>
                      </b-col>
                      <b-col md='8' class="mb-2">
                        <b-form-input v-model="penawaranModal.invoiceTo" type="text" placeholder="-" size="sm"></b-form-input>
                      </b-col>
                      <b-col md='4'>
                        <div class="d-block text-dark">ID Proyek :
                        </div>
                      </b-col>
                      <b-col md='8' class="mb-2">
                        <b-form-input v-model="penawaranModal.proyekID" type="text" placeholder="-" size="sm"></b-form-input>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12">
                        <div class="table-responsive">
                          <table class="table">
                            <thead class="bg-light">
                              <tr class="font-weight-bold">
                                <td>Material</td>
                                <td>Harga</td>
                                <td>Diskon</td>
                                <td>Harga Akhir/Unit</td>
                                <td>Stock Ready</td>
                                <td style="width: 105px;">-</td>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="(input,k) in inputPenawaran" :key="k" class="trtdMid">
                                <td>
                                  <div class="mlt-limitWidth">
                                    <multiselect v-model="input.material" :options="materialSel" :close-on-select="true" :clear-on-select="false" :preserve-search="true" placeholder="Pilih material..." label="name" track-by="name" :hide-selected="true" :preselect-first="true">
                                  </multiselect>
                                  </div>
                                </td>
                                <td>Rp 50.000</td>
                                <td>
                                  <b-input-group>
                                    <template v-slot:append>
                                      <b-input-group-text><strong>%</strong></b-input-group-text>
                                    </template>
                                    <b-form-input v-model="input.diskon" class="inputPercentModal bg-white"></b-form-input>
                                  </b-input-group>
                                </td>
                                <td>Rp 42.500</td>
                                <td>1.212</td>
                                <td>
                                  <b-button v-if="inputPenawaran.length > 1" variant="danger" @click="removeOffer(k)">Hapus</b-button>
                                </td>
                              </tr>
                              <tr>
                                <td colspan="5"></td>
                                <td>
                                  <b-button variant="success" @click="addOffer" class="float-right">Tambah</b-button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </b-col>
                    </b-row>
                    <b-row class="mb-3">
                      <b-col md='4'>
                        <div class="d-block text-dark">Biaya Pengiriman :
                        </div>
                      </b-col>
                      <b-col md='8' class="mb-2">
                        <b-form-input v-model="penawaranModal.biaya_pengiriman" type="text" placeholder="-" size="sm"></b-form-input>
                      </b-col>
                      <b-col md='4'>
                        <div class="d-block text-dark">Syarat Harga :
                        </div>
                      </b-col>
                      <b-col md='8' class="mb-2">
                        <b-form-input v-model="penawaranModal.syarat_harga" type="text" placeholder="-" size="sm"></b-form-input>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <div class="table-responsive">
                          <table class="table table-borderless">
                            <thead>
                              <tr>
                                <td>Pembayaran Termin</td>
                                <td>Offer</td>
                                <!-- <td>Status</td>
                                <td>Penawaran</td> -->
                                <td>-</td>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>DP</td>
                                <td>
                                  <b-input-group>
                                    <template v-slot:append>
                                      <b-input-group-text><strong>%</strong></b-input-group-text>
                                    </template>
                                    <b-form-input v-model="termin.dp" class="inputPercentModal bg-white"></b-form-input>
                                  </b-input-group>
                                </td>
                                <td></td>
                                <!-- <td></td>
                                <td></td> -->
                              </tr>
                              <tr v-for="(input,k) in termin" :key="k" class="trtdMid">
                                <td>
                                  Termin {{ k + 1 }}
                                </td>
                                <td>
                                  <b-input-group>
                                    <template v-slot:append>
                                      <b-input-group-text><strong>%</strong></b-input-group-text>
                                    </template>
                                    <b-form-input v-model="input.diskon" class="inputPercentModal bg-white"></b-form-input>
                                  </b-input-group>
                                </td>
                                <td>
                                  <b-button v-if="termin.length > 1" variant="danger" @click="removeTermin(k)">Hapus</b-button>
                                </td>
                              </tr>
                              <tr>
                                <td colspan="2"></td>
                                <td>
                                  <b-button variant="success" @click="addTermin" class="float-right">Tambah Termin</b-button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </b-col>
                    </b-row>
                    <!-- <b-row>
                      <b-col md="12">
                        <div>Biaya Pengiriman :</div>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12">
                        <div>Syarat Harga :</div>
                      </b-col>
                      <b-col md="3" class="mb-2">
                        <div>Pembayaran Termin :</div>
                      </b-col>
                      <b-col md="3" class="mb-2">
                        <div>Offer</div>
                      </b-col>
                      <b-col md="3" class="mb-2">
                        <div>Status</div>
                      </b-col>
                      <b-col md="3" class="mb-2">
                        <div>Penawaran</div>
                      </b-col>
                    </b-row> -->
                  </b-container>
                </b-modal>
              </template>
            </b-table>
            <b-col sm="12" md="6" class="my-1">
              <b-pagination
                v-model="currentPage"
                :total-rows="totalRows"
                :per-page="perPage"
                align="fill"
                size="sm"
                class="my-0"
              ></b-pagination>
          </b-col>
          </template>
        </iq-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { core } from '../../../config/pluginInit'
export default {
  name: 'WishlistDetail',
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
        { no: '1', id: '111', code: '#822', name: 'bambu  8-10 cm ukr.400-550 cm', cat: 'Tahap Finishing-Atap-rangka-Ijuk/Bambu/Welat', vol: '13', satuan: 'btg', h_satuan: 'Rp 7000', total: 'Rp 134.000' }
      ],
      fields: [
        { key: 'no', label: 'No.', sortable: true, sortDirection: 'asc' },
        { key: 'code', label: 'Kode Material' },
        { key: 'name', label: 'Nama Material' },
        { key: 'cat', label: 'Kategori Bahan' },
        { key: 'vol', label: 'Volume Belanja' },
        { key: 'satuan', label: 'Satuan' },
        { key: 'h_satuan', label: 'Harga Satuan' },
        { key: 'total', label: 'Total Belanja' }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      penawaranModal: {
        invoiceNo: '',
        invoiceTo: '',
        proyekID: '',
        syarat_harga: '',
        biaya_pengiriman: ''
      },
      inputPenawaran: [
        {
          material: '',
          id: '',
          harga: '',
          diskon: '',
          harga_akhir: '',
          stock: '',
          penawaran: ''
        }
      ],
      termin: [
        {
          dp: '',
          diskon: ''
        }
      ],
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
    addOffer () {
      this.inputPenawaran.push({
        material: '',
        id: '',
        harga: '',
        diskon: '',
        harga_akhir: '',
        stock: '',
        penawaran: ''
      })
    },
    removeOffer (index) {
      this.inputPenawaran.splice(index, 1)
    },

    addTermin () {
      this.termin.push({
        diskon: ''
      })
    },
    removeTermin (index) {
      this.termin.splice(index, 1)
    },

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
  width: 80px;
}
.inputPercentModal {
    border-bottom-right-radius: 0px !important;
    border-top-right-radius: 0px !important;
    width: 0;
    height: 39px !important;
    border-top-left-radius: 5px !important;
    border-bottom-left-radius: 5px !important;
}
.trtdMid > td {
  vertical-align: inherit !important;
}
.mlt-limitWidth > .multiselect {
  max-width: 250px !important;
}
</style>
