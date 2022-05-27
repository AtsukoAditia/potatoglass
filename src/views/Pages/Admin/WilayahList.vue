<template>
  <b-container fluid="">
    <b-row>
      <b-col md="12" sm="12">
        <iq-card>
          <template v-slot:body>
            <b-card no-body>
              <b-tabs pills card vertical>
                <b-tab title="Provinsi" active>
                  <b-row>
                      <b-col md="6">
                          <b-form-group class="">
                                <b-input-group size="sm">
                                <b-form-input v-model="filter" type="search" id="filterInput"
                                    placeholder="Ketik untuk mencari Provinsi"
                                    style="border-top-right-radius: 0;border-bottom-right-radius: 0;"></b-form-input>
                                <b-input-group-append>
                                    <b-button :disabled="!filter" size="sm" @click="filter = ''">Hapus</b-button>
                                </b-input-group-append>
                                </b-input-group>
                            </b-form-group>
                      </b-col>
                      <b-col md="6" class="text-right">
                        <b-button variant="primary" v-b-modal.addProvModal>+ Tambah Data</b-button>
                      </b-col>
                  </b-row>
                  <b-table :fields="fdProv" :items="dtProv" :current-page="currentPage" :per-page="perPage" ref="dTable"
                    :filter="filter" @filtered="onFiltered" striped>
                    <template v-slot:cell(no)="row">
                      <span :v-for="row">
                        {{ ((currentPage - 1) * perPage) + (row.index + 1) }}
                      </span>
                    </template>
                    <template v-slot:cell(actions)="row">
                      <!-- <b-button class="mr-2" variant="info" size="sm">Ubah</b-button> -->
                      <b-button variant="danger" size="sm" @click="delProv(row.item.id_prov)">Hapus</b-button>
                    </template>
                  </b-table>
                  <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="fill" size="sm"
                    class="my-0"></b-pagination>
                </b-tab>
                <b-tab title="Kabupaten">
                  <b-row>
                      <b-col md="6">
                        <b-form-group class="">
                            <b-input-group size="sm">
                            <b-form-input v-model="filterKab" type="search" id="filterInput"
                                placeholder="Ketik untuk mencari Kabupaten"
                                style="border-top-right-radius: 0;border-bottom-right-radius: 0;"></b-form-input>
                            <b-input-group-append>
                                <b-button :disabled="!filterKab" size="sm" @click="filterKab = ''">Hapus</b-button>
                            </b-input-group-append>
                            </b-input-group>
                        </b-form-group>
                      </b-col>
                      <b-col md="6" class="text-right">
                        <b-button variant="primary" v-b-modal.addKabModal>+ Tambah Data</b-button>
                      </b-col>
                  </b-row>
                  <b-table :fields="fdKab" :items="dtKab" :current-page="currentPageKab" :per-page="perPageKab" ref="dTableKab"
                    :filter="filterKab" @filtered="onFilteredKab" striped>
                    <template v-slot:cell(no)="row">
                      <span :v-for="row">
                        {{ ((currentPageKab - 1) * perPageKab) + (row.index + 1) }}
                      </span>
                    </template>
                    <template v-slot:cell(actions)="row">
                      <!-- <b-button class="mr-2" variant="info" size="sm">Ubah</b-button> -->
                      <b-button variant="danger" size="sm" @click="delKab(row.item.id_kab)">Hapus</b-button>
                    </template>
                  </b-table>
                  <b-pagination v-model="currentPageKab" :total-rows="totalRowsKab" :per-page="perPageKab" align="fill" size="sm"
                    class="my-0"></b-pagination>
                </b-tab>
                <b-tab title="Kecamatan">
                  <b-row>
                      <b-col md="6">
                        <b-form-group class="">
                            <b-input-group size="sm">
                            <b-form-input v-model="filterKec" type="search" id="filterInput"
                                placeholder="Ketik untuk mencari Kecamatan"
                                style="border-top-right-radius: 0;border-bottom-right-radius: 0;"></b-form-input>
                            <b-input-group-append>
                                <b-button :disabled="!filterKec" size="sm" @click="filterKec = ''">Hapus</b-button>
                            </b-input-group-append>
                            </b-input-group>
                        </b-form-group>
                      </b-col>
                  </b-row>
                  <b-table :fields="fdKec" :items="dtKec" :current-page="currentPageKec" :per-page="perPageKec" ref="dTableKec"
                    :filter="filterKec" @filtered="onFilteredKec" striped>
                    <template v-slot:cell(no)="row">
                      <span :v-for="row">
                        {{ ((currentPageKec - 1) * perPageKec) + (row.index + 1) }}
                      </span>
                    </template>
                    <template v-slot:cell(actions)="row">
                      <!-- <b-button class="mr-2" variant="info" size="sm">Ubah</b-button> -->
                      <b-button variant="danger" size="sm">Hapus</b-button>
                    </template>
                  </b-table>
                  <b-pagination v-model="currentPageKec" :total-rows="totalRowsKec" :per-page="perPageKec" align="fill" size="sm"
                    class="my-0"></b-pagination>
                </b-tab>
                <b-tab title="Kelurahan">
                  <b-form-group class="">
                    <b-input-group size="sm">
                      <b-form-input v-model="filterKel" type="search" id="filterInput"
                        placeholder="Ketik untuk mencari Kelurahan"
                        style="border-top-right-radius: 0;border-bottom-right-radius: 0;"></b-form-input>
                      <b-input-group-append>
                        <b-button :disabled="!filterKel" size="sm" @click="filterKel = ''">Hapus</b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </b-form-group>
                  <b-table :fields="fdKel" :items="dtKel" :current-page="currentPageKel" :per-page="perPageKel" ref="dTableKel"
                    :filter="filterKel" @filtered="onFilteredKel" striped>
                    <template v-slot:cell(no)="row">
                      <span :v-for="row">
                        {{ ((currentPageKel - 1) * perPageKel) + (row.index + 1) }}
                      </span>
                    </template>
                    <template v-slot:cell(actions)="row">
                      <!-- <b-button class="mr-2" variant="info" size="sm">Ubah</b-button> -->
                      <b-button variant="danger" size="sm">Hapus</b-button>
                    </template>
                  </b-table>
                  <b-pagination v-model="currentPageKel" :total-rows="totalRowsKel" :per-page="perPageKel" align="fill" size="sm"
                    class="my-0"></b-pagination>
                </b-tab>
              </b-tabs>
            </b-card>
          </template>
        </iq-card>
      </b-col>
    </b-row>

    <b-modal id="addProvModal" title="Tambah Data Provinsi" @ok="saveProv" ok-title="Simpan">
        <b-form-group
        id="input-group-1"
        label="ID Provinsi"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="prov.id_prov"
          type="number"
          placeholder="Masukan ID"
          required
        ></b-form-input>
      </b-form-group>
        <b-form-group
        id="input-group-2"
        label="Nama Provinsi"
        label-for="input-2"
      >
        <b-form-input
          id="input-2"
          v-model="prov.nama"
          type="text"
          placeholder="Masukan Nama"
          required
        ></b-form-input>
      </b-form-group>
    </b-modal>

    <b-modal id="addKabModal" title="Tambah Data Kabupaten" @ok="saveKab" ok-title="Simpan">
        <b-form-group
        id="input-group-3"
        label="ID Provinsi"
        label-for="input-3"
      >
        <b-form-input
          id="input-3"
          v-model="kab.id_prov"
          type="number"
          placeholder="Masukan ID"
          required
        ></b-form-input>
      </b-form-group>
        <b-form-group
        id="input-group-4"
        label="ID Kabupaten"
        label-for="input-4"
      >
        <b-form-input
          id="input-4"
          v-model="kab.id_kab"
          type="number"
          placeholder="Masukan ID"
          required
        ></b-form-input>
      </b-form-group>
        <b-form-group
        id="input-group-5"
        label="Nama Kabupaten"
        label-for="input-5"
      >
        <b-form-input
          id="input-5"
          v-model="kab.nama"
          type="text"
          placeholder="Masukan Nama"
          required
        ></b-form-input>
      </b-form-group>
    </b-modal>
  </b-container>
</template>
<script>
import {
  core
} from '../../../config/pluginInit'
import API from '@/services/admin'

export default {
  name: 'WilayahList',
  components: {},
  props: {},
  mounted () {
    core.index()
  },
  data () {
    return {
      totalRows: '',
      currentPage: 1,
      currentPageKab: 1,
      currentPageKec: 1,
      currentPageKel: 1,
      perPage: 10,
      totalRowsKab: '',
      perPageKab: 10,
      totalRowsKec: '',
      perPageKec: 10,
      totalRowsKel: '',
      perPageKel: 10,
      pageOptions: [5, 10, 15],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterKab: null,
      filterKec: null,
      filterKel: null,
      prov: {
        id_prov: '',
        nama: ''
      },
      kab: {
        id_prov: '',
        id_kab: '',
        nama: '',
        id_jenis: 1
      },
      kec: {
        id_kec: '',
        id_kab: '',
        nama: '',
        id_jenis: 2
      },
      kel: {
        id_kec: '',
        id_kel: '',
        nama: '',
        id_jenis: 3,
        kodepos: ''
      },
      fdProv: [{
        key: 'no',
        label: 'No'
      },
      {
        key: 'id_prov',
        label: 'ID'
      },
      {
        key: 'nama',
        label: 'Provinsi'
      },
      {
        key: 'actions',
        label: 'Action'
      }],
      fdKab: [{
        key: 'no',
        label: 'No'
      },
      {
        key: 'id_prov',
        label: 'Provinsi ID'
      },
      {
        key: 'id_kab',
        label: 'ID'
      },
      {
        key: 'nama',
        label: 'Kabupaten'
      },
      {
        key: 'actions',
        label: 'Action'
      }],
      fdKec: [{
        key: 'no',
        label: 'No'
      },
      {
        key: 'id_kab',
        label: 'Kabupaten ID'
      },
      {
        key: 'id_kec',
        label: 'ID'
      },
      {
        key: 'nama',
        label: 'Provinsi'
      },
      {
        key: 'actions',
        label: 'Action'
      }],
      fdKel: [{
        key: 'no',
        label: 'No'
      },
      {
        key: 'id_kec',
        label: 'Kecamatan ID'
      },
      {
        key: 'id_kel',
        label: 'ID'
      },
      {
        key: 'nama',
        label: 'Provinsi'
      },
      {
        key: 'kodepos',
        label: 'Kode Pos'
      },
      {
        key: 'actions',
        label: 'Action'
      }]
    }
  },
  computed: {},
  methods: {
    dtProv (ctx) {
      let currPage = (ctx.currentPage - 1) * ctx.perPage
      if (ctx.currentPage === 1) {
        currPage = 0
      }
      let name = ctx.filter
      if (name === null) {
        name = ''
      }
      return API.wilayah
        .getProv(currPage, ctx.perPage, name).then(response => {
          const dt = response.data
          if (response.status === 200) {
            this.totalRows = dt._meta.total
            const items = dt.data
            return items || []
          } else if (response.data.errors.length > 0) {
            this.$refs.form.setErrors(response.data.errors)
          }
        }).finally(() => {
          this.loading = false
        })
    },
    dtKab (ctx) {
      let currPage = (ctx.currentPage - 1) * ctx.perPage
      if (ctx.currentPage === 1) {
        currPage = 0
      }
      let name = ctx.filter
      if (name === null) {
        name = ''
      }
      return API.wilayah
        .getKab(currPage, ctx.perPage, name).then(response => {
          const dt = response.data
          if (response.status === 200) {
            this.totalRowsKab = dt._meta.total
            const items = dt.data
            return items || []
          } else if (response.data.errors.length > 0) {
            this.$refs.form.setErrors(response.data.errors)
          }
        }).finally(() => {
          this.loading = false
        })
    },
    dtKec (ctx) {
      let currPage = (ctx.currentPage - 1) * ctx.perPage
      if (ctx.currentPage === 1) {
        currPage = 0
      }
      let name = ctx.filter
      if (name === null) {
        name = ''
      }
      return API.wilayah
        .getKec(currPage, ctx.perPage, name).then(response => {
          const dt = response.data
          if (response.status === 200) {
            this.totalRowsKec = dt._meta.total
            const items = dt.data
            return items || []
          } else if (response.data.errors.length > 0) {
            this.$refs.form.setErrors(response.data.errors)
          }
        }).finally(() => {
          this.loading = false
        })
    },
    dtKel (ctx) {
      let currPage = (ctx.currentPage - 1) * ctx.perPage
      if (ctx.currentPage === 1) {
        currPage = 0
      }
      let name = ctx.filter
      if (name === null) {
        name = ''
      }
      return API.wilayah
        .getKel(currPage, ctx.perPage, name).then(response => {
          const dt = response.data
          if (response.status === 200) {
            this.totalRowsKel = dt._meta.total
            const items = dt.data
            return items || []
          } else if (response.data.errors.length > 0) {
            this.$refs.form.setErrors(response.data.errors)
          }
        }).finally(() => {
          this.loading = false
        })
    },
    onFiltered (filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    onFilteredKab (filteredItems) {
      this.currentPageKab = 1
      this.totalRowsKab = filteredItems.length
    },
    onFilteredKec (filteredItems) {
      this.currentPageKec = 1
      this.totalRowsKec = filteredItems.length
    },
    onFilteredKel (filteredItems) {
      this.currentPageKel = 1
      this.totalRowsKel = filteredItems.length
    },

    saveProv () {
      core.custLoader(true)
      API.wilayah
        .addProv(this.prov).then(response => {
          if (response.status === 200) {
            core.showSnackbar('success', 'Tambah provinsi berhasil')
            this.$refs.dTable.refresh()
          }
        }).finally(() => {
          core.custLoader(false)
        }).catch(() => {
          core.showSnackbar('error', 'Maaf, terjadi kesalahan pada sistem.')
        })
    },
    delProv (id) {
      const conf = confirm('Hapus data?')
      if (conf) {
        core.custLoader(true)
        API.wilayah
          .delProv(id).then(response => {
            if (response.status === 200) {
              core.showSnackbar('success', 'Hapus provinsi berhasil')
              this.$refs.dTable.refresh()
            }
          }).finally(() => {
            core.custLoader(false)
          }).catch(() => {
            core.showSnackbar('error', 'Maaf, terjadi kesalahan pada sistem.')
          })
      }
    },

    saveKab () {
      core.custLoader(true)
      API.wilayah
        .addKab(this.kab).then(response => {
          if (response.status === 200) {
            core.showSnackbar('success', 'Tambah kabupaten berhasil')
            this.$refs.dTable.refresh()
          }
        }).finally(() => {
          core.custLoader(false)
        }).catch(() => {
          core.showSnackbar('error', 'Maaf, terjadi kesalahan pada sistem.')
        })
    },
    delKab (id) {
      const conf = confirm('Hapus data?')
      if (conf) {
        core.custLoader(true)
        API.wilayah
          .delKab(id).then(response => {
            if (response.status === 200) {
              core.showSnackbar('success', 'Hapus kabupaten berhasil')
              this.$refs.dTable.refresh()
            }
          }).finally(() => {
            core.custLoader(false)
          }).catch(() => {
            core.showSnackbar('error', 'Maaf, terjadi kesalahan pada sistem.')
          })
      }
    },

    saveKec () {
      core.custLoader(true)
      API.wilayah
        .addKec(this.kec).then(response => {
          if (response.status === 200) {
            core.showSnackbar('success', 'Tambah kecamatan berhasil')
            this.$refs.dTable.refresh()
          }
        }).finally(() => {
          core.custLoader(false)
        }).catch(() => {
          core.showSnackbar('error', 'Maaf, terjadi kesalahan pada sistem.')
        })
    },
    delKec (id) {
      const conf = confirm('Hapus data?')
      if (conf) {
        core.custLoader(true)
        API.wilayah
          .delKec(id).then(response => {
            if (response.status === 200) {
              core.showSnackbar('success', 'Hapus kecamatan berhasil')
              this.$refs.dTable.refresh()
            }
          }).finally(() => {
            core.custLoader(false)
          }).catch(() => {
            core.showSnackbar('error', 'Maaf, terjadi kesalahan pada sistem.')
          })
      }
    },

    saveKel () {
      core.custLoader(true)
      API.wilayah
        .addKel(this.kel).then(response => {
          if (response.status === 200) {
            core.showSnackbar('success', 'Tambah kelurahan berhasil')
            this.$refs.dTable.refresh()
          }
        }).finally(() => {
          core.custLoader(false)
        }).catch(() => {
          core.showSnackbar('error', 'Maaf, terjadi kesalahan pada sistem.')
        })
    },
    delKel (id) {
      const conf = confirm('Hapus data?')
      if (conf) {
        core.custLoader(true)
        API.wilayah
          .delKel(id).then(response => {
            if (response.status === 200) {
              core.showSnackbar('success', 'Hapus kelurahan berhasil')
              this.$refs.dTableKab.refresh()
            }
          }).finally(() => {
            core.custLoader(false)
          }).catch(() => {
            core.showSnackbar('error', 'Maaf, terjadi kesalahan pada sistem.')
          })
      }
    }
  }
}

</script>

<style>

</style>
