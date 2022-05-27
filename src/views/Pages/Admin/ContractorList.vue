<template>
  <b-container fluid="">
    <b-row>
      <b-col md="12" sm="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">List Data Contractor</h4>
          </template>
          <template v-slot:body>
            <b-row class="mb-2">
              <b-col md="4">
              <b-form-group>
                  <b-input-group size="sm">
                    <b-form-input
                      v-model="filter"
                      type="search"
                      id="filterInput"
                      placeholder="Cari data disini"
                    ></b-form-input>
                    <b-input-group-append>
                      <!-- <b-button :disabled="!filter" @click="filter = ''">Clear</b-button> -->
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col class="md-8">
                <router-link :to="toContractorAdd">
                    <b-button variant="primary" class="float-right"><i class="ri-bill-fill"></i>Add Contractor</b-button>
                  </router-link>
              </b-col>
            </b-row>
            <!-- Main table element -->
            <b-table
              show-empty
              stacked="md"
              :items="getcontractorList"
              :fields="fields"
              :current-page="currentPage"
              :per-page="perPage"
            >
              <template v-slot:cell(no)="row">
                <span :v-for="row">
                {{ ((currentPage - 1) * perPage) + (row.index + 1) }}
                </span>
              </template>
              <template v-slot:cell(kota)="row">
                {{ row.item.kota }}, {{ row.item.provinsi }}
              </template>
              <template v-slot:cell(alamat)="row">
                {{ row.item.alamat }}, {{ row.item.kota }}, {{ row.item.provinsi }} - {{ row.item.kode_pos }}
              </template>
              <template v-slot:cell(email)="row">
                <a :href="`to:${row.item.email}`">{{ row.item.email }}</a>
              </template>
              <template v-slot:cell(contact_person)="row">
                <a :href="`tel:${row.item.phone}`">{{ row.item.phone }}</a> - {{ row.item.contact_person }}
              </template>
              <template v-slot:cell(website)="row">
                <a :href="`http://${row.item.website}`" target="_blank">{{ row.item.website }}</a>
              </template>
              <template v-slot:cell(actions)="row">
                <div class="d-flex">
                    <router-link :to="`contractor/${row.item.id}`">
                      <b-button type="button" size="sm" variant="success"  class="mr-1">
                        <div data-icon="" class="icon"></div>
                      </b-button>
                    </router-link>
                    <b-button size="sm" variant="danger" @click="deleteContractor(row.item.id)">
                      <div data-icon="" class="icon"></div>
                    </b-button>
                </div>
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

            <!-- Info modal -->
            <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
              <pre>{{ infoModal.content }}</pre>
            </b-modal>
          </template>
        </iq-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { core } from '../../../config/pluginInit'
import API from '@/services/admin'
export default {
  name: 'ContractorList',
  props: {
    toContractorAdd: { type: Object, default: () => ({ name: 'contractor.addcontractor' }) }
  },
  mounted () {
    core.index()
    // Set the initial number of items
    // this.totalRows = this.contractorList.length
    // this.getContractorList()
  },
  data () {
    return {
      fields: [
        { key: 'no', label: 'No.', sortable: true, sortDirection: 'asc' },
        { key: 'nama_perusahaan', label: 'Nama Contractor' },
        { key: 'nama_lengkap', label: 'Nama Contact Person' },
        { key: 'email', label: 'Email' },
        { key: 'no_wa', label: 'No. Whatsapp' },
        { key: 'no_wa_dua', label: 'No. Whatsapp (2)' },
        { key: 'alamat_lengkap', label: 'Alamat' },
        { key: 'kode_pos', label: 'Kode Pos' },
        { key: 'website', label: 'Website' },
        { key: 'actions', label: 'Actions' }
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
    },
    deleteContractor (id) {
      const alert = confirm('Apakah data ini mau dihapus?')
      if (alert) {
        API.contractor
          .deleteContractor(id).then(response => {
            if (response.status) {
              this.getcontractorList('kosong')
              core.showSnackbar('success', 'Success delete data')
            } else if (response.data.errors.length > 0) {
              this.$refs.form.setErrors(response.data.errors)
              core.showSnackbar('error', 'Maaf, ' + response.data.errors)
            }
          }).finally(() => { this.loading = false })
      }
    },
    getDataContractorList () {
      API.contractor
        .getAllContractor(0, 5).then(response => {
          if (response.status) {
            this.contractorList = response.data.result
            this.totalRows = response.data._metadata.total
            const items = this.contractorList
            return items || []
          } else if (response.data.errors.length > 0) {
            this.$refs.form.setErrors(response.data.errors)
          }
        }).finally(() => { this.loading = false })
    },
    // eslint-disable-next-line vue/no-dupe-keys
    getcontractorList (ctx) {
      let currPage = 0
      let perPage = this.perPage
      if (ctx === 'kosong') {
        currPage = 0
        perPage = 5
      } else {
        perPage = ctx.perPage
        currPage = (ctx.currentPage - 1) * perPage
      }
      if (ctx.currentPage === 1) {
        currPage = 0
      }
      return API.contractor
        .getAllContractor(currPage, perPage).then(response => {
          if (response.status) {
            this.contractorList = response.data.result
            this.totalRows = response.data._metadata.total
            const items = this.contractorList
            return items || []
          } else if (response.data.errors.length > 0) {
            this.$refs.form.setErrors(response.data.errors)
          }
        }).finally(() => {
          this.loading = false
        })
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
