<template>
  <b-container fluid="">
    <b-row>
      <b-col md="12" sm="12">
        <iq-card>
          <template v-slot:body>
            <!-- Main table element -->
            <b-table show-empty stacked="md" :items="items" :fields="fields" :current-page="currentPage"
              :per-page="perPage" :filter="filter" :filterIncludedFields="filterOn" :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc" :sort-direction="sortDirection">
              <template v-slot:cell(discount)="row">
                {{ row.item.discount }} <b-button size="sm" variant="link" @click="setDiscount(row.item)">ubah
                </b-button>
              </template>
            </b-table>
            <b-row>
              <b-col md="6" class="my-1">
                <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="fill" size="sm"
                  class="my-0"></b-pagination>
              </b-col>
              <b-col md="6" class="text-right">
                <b-button variant="warning" class="mr-2 w-25">Chat Pembeli</b-button>
                <b-button @click="accOrder" variant="success" class="mr-2 w-25">Pengiriman</b-button>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="12"></b-col>
            </b-row>
          </template>
        </iq-card>
      </b-col>
    </b-row>
    <b-row v-if="discCard == true">
      <b-col md="6">
        <iq-card>
          <template v-slot:body>
            <h5>Set Discount</h5>
            <hr>
            <form>
              <b-row>
                <b-col md="4">
                  <b-form-group label-for="discount_" label="Diskon Baru">
                    <b-form-input id="discount_" size="sm" type="text" placeholder="-"></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col md="4" style="background:#f3f3f3;">
                  <b-form-group label-for="hargaawal_" label="Harga Awal">
                    <b-form-input id="hargaawal_" size="sm" disabled type="text" placeholder="-"></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col md="4" style="background:#f3f3f3;">
                  <b-form-group label-for="hargaakhir_" label="Harga Akhir">
                    <b-form-input id="hargaakhir_" size="sm" disabled type="text" placeholder="-"></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="12" class="text-right mt-2">
                    <b-button @click="discCard = !discCard" variant="danger" class="mr-2">Batal</b-button>
                    <b-button @click="newDisc()" variant="success" class="mr-2">Submit</b-button>
                </b-col>
              </b-row>
            </form>
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
// import API from '@/services/vendor/order'
import iqCard from '../../../components/core/cards/iq-card.vue'
export default {
  components: {
    iqCard
  },
  name: 'BookingPriceSetting',
  props: {},
  mounted () {
    core.index()
    // Set the initial number of items
    this.totalRows = this.items.length
  },
  data () {
    return {
      items: [{
        no: '1',
        id: '111',
        code: '#822',
        name: 'bambu  8-10 cm ukr.400-550 cm',
        cat: 'Tahap Finishing-Atap-rangka-Ijuk/Bambu/Welat',
        vol: '13',
        vp: '100',
        discount: '5%',
        h_awal: 'Rp 134.000',
        h_disc: 'Rp 100.000'
      }],
      fields: [{
        key: 'no',
        label: 'No.',
        sortable: true,
        sortDirection: 'asc'
      },
      {
        key: 'name',
        label: 'Nama Material'
      },
      {
        key: 'vol',
        label: 'Qty'
      },
      {
        key: 'vp',
        label: 'VP'
      },
      {
        key: 'discount',
        label: 'Diskon'
      },
      {
        key: 'h_awal',
        label: 'Harga Awal'
      },
      {
        key: 'h_disc',
        label: 'Harga Diskon'
      }
      ],
      new: {
        discount: '',
        priceawal: '',
        priceakhir: ''
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
      discCard: false
    }
  },

  computed: {
    sortOptions () {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return {
            text: f.label,
            value: f.key
          }
        })
    }
  },
  methods: {
    accOrder () {
      let cfm = confirm('Setujui semua harga berikut?')
      if (cfm) {
        // API.order.accept(this.$route.params.id)
        //   .then(response => {
        //     if (response.status) {
        core.showSnackbar('success', 'Order telah diterima.')
        //   }
        // }).finally(() => {
        //   this.loading = false
        // })
      }
    },
    setDiscount (data) {
    //   console.log(data)
      this.discCard = true
    },
    newDisc () {
      core.showSnackbar('success', 'Diskon baru telah di sesuaikan.')
      this.discCard = false
      this.new = ''
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

  .trtdMid>td {
    vertical-align: inherit !important;
  }

  .mlt-limitWidth>.multiselect {
    max-width: 250px !important;
  }

</style>
