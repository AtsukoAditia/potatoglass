<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">Daftar Material</h4>
          </template>
          <template v-slot:headerAction>
          </template>
          <template v-slot:body>
            <!-- Main table element -->
            <b-table
              show-empty
              stacked="md"
              :items="getDataList"
              ref="dTable"
              :fields="fields"
              :current-page="currentPage"
              :per-page="perPage"
            >
              <template v-slot:cell(no)="row">
                <span :v-for="row">
                {{ ((currentPage - 1) * perPage) + (row.index + 1) }}
                </span>
              </template>

              <template v-slot:cell(photo_toko)="row">
                <a :href="assetUrl + 'vendor/' + row.item.photo_toko" target="_blank">
                  <b-img :src="assetUrl + 'vendor/' + row.item.photo_toko" class="imgTBL" @error="imgError"></b-img>
                </a>
              </template>

              <template v-slot:cell(harga)="row">
                <span>Rp {{ separatorNum(row.item.harga) }}</span>
              </template>

              <template v-slot:cell(kota)="row">
                <span>{{ row.item.kota }}, {{ row.item.provinsi }}</span>
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
import { core, brokenImage, urlAssets } from '../../../../config/pluginInit'
import API from '@/services/admin'

export default {
  name: 'MaterialVendor',
  mounted () {
    core.index()
  },
  data () {
    return {
      fields: [
        { key: 'no', label: 'No.', sortable: true, sortDirection: 'asc' },
        { key: 'photo_toko', label: 'Foto Toko' },
        { key: 'vendor_name', label: 'Vendor' },
        { key: 'harga', label: 'Harga Material' },
        { key: 'kota', label: 'Kota' }
      ],
      assetUrl: urlAssets,
      totalRows: '',
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: []
    }
  },
  computed: {
  },
  components: {
  },
  beforeMount () {
  },
  methods: {

    getDataList (ctx) {
      let currPage = (ctx.currentPage - 1) * ctx.perPage
      if (ctx.currentPage === 1) {
        currPage = 0
      }
      let name = ctx.filter
      if (name === null) {
        name = ''
      }
      return API.report
        .materialVendor(this.$route.params.id, currPage, ctx.perPage).then(response => {
          const dt = response.data
          if (response.status === 200) {
            this.totalRows = dt._metadata.total
            // this.totalRows = 1000
            const items = dt.result
            return items || []
          } else if (response.data.errors.length > 0) {
            this.$refs.form.setErrors(response.data.errors)
          }
        }).finally(() => {
          this.loading = false
        })
    },

    handleFileUpload () {
      this.file = this.$refs.file.files[0]
    },

    imgError (e) {
      e.target.src = brokenImage
    },
    capitalFirst (string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
    joinArr (arr) {
      return arr.join(',')
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
    width: 70px;
    height: 70px;
    object-fit: cover;
    border-radius: 50%;
}
</style>
