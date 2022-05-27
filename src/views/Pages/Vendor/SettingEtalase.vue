<template>
  <b-container fluid>
    <b-row>
      <b-col md="12">
        <iq-card>
          <template v-slot:body>
            <ul class="nav nav-pills nav-fill mb-3">
              <li class="nav-item">
                <router-link to="/setting/informasi" class="nav-link iq-waves-effect pr-4">
                  Informasi
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/setting/penjualan" class="nav-link iq-waves-effect pr-4">
                  Penjualan
                </router-link>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="#">Etalase</a>
              </li>
              <!-- <li class="nav-item">
                <router-link to="/setting/pengiriman" class="nav-link iq-waves-effect pr-4">
                  Pengiriman
                </router-link>
              </li> -->
              <li class="nav-item">
                <router-link to="/setting/promo-voucher" class="nav-link iq-waves-effect pr-4">
                  Promo &amp; Voucher
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/setting/template-chat" class="nav-link iq-waves-effect pr-4">
                  Pesan
                </router-link>
              </li>
            </ul>
            <iq-card>
                <template v-slot:headerTitle class="w-100">
                    <h4 class="card-title ">Atur Etalase Material</h4>
                </template>
                <template v-slot:body>
                    <b-button variant="info" size="sm" v-b-modal.modal-add-col>+ Tambah</b-button>
                <hr>
                    <draggable class="list-group" tag="ul" v-model="listCol" v-bind="dragOptions" :move="onMove"
                  @start="isDragging=true" @end="isDragging=false" @change="reorderCol">
                      <transition-group type="transition" :name="'flip-list'">
                        <li class="list-group-item" v-for="element in listCol" :key="element.order">
                          <i :class="element.fixed? 'fa fa-anchor' : 'fa fa-pen'"
                            @click=" element.fixed=! element.fixed" aria-hidden="true"></i>
                          <b class="ml-1 mr-2">{{element.col_name}}</b>
                          <b-badge variant="primary">{{element.order}}</b-badge>
                          <b-button size="sm" class="float-right" variant="info" @click="showModalMtrl(element)">+ Material</b-button>
                          <b-button size="sm" class="float-right mr-2" variant="warning" v-b-modal="`showMaterial${element.id}`">Lihat Material</b-button>

                          <b-modal size="lg" :id="`showMaterial${element.id}`" ref="showMaterial" title="Daftar Material di Etalase" @ok="sendMaterial" @hidden="resetModal" @show="listMaterial(element)">
                            <b-table show-empty stacked="md" :items="getDataList" :fields="fields">
                              <template v-slot:cell(image)="row">
                                <a :href="assetUrl + 'material/' + userrole.user.id + '/' + cekImg(row.item.image)" target="_blank">
                                  <b-img :src="assetUrl + 'material/' + userrole.user.id + '/' + cekImg(row.item.image)" class="imgTBL"
                                    :alt="row.item.name_material" @error="imgError"></b-img>
                                </a>
                              </template>
                              <template v-slot:cell(name_material)="row">
                                <router-link :to="`material/${row.item.m_id}`" class="text-dark title-material">
                                  {{ row.item.alias_name }}
                                </router-link>
                              </template>
                              <template v-slot:cell(harga_material)="row">
                                Rp {{ separatorNum(row.item.harga_material) }}
                              </template>
                              <template v-slot:cell(available_stock)="row">
                                <span v-if="row.item.available_stock != null">{{ separatorNum(row.item.available_stock) }}</span>
                                <span v-else>0</span>
                              </template>
                              <template v-slot:cell(status_material_vendor)="row">
                                <div>
                                    <b-badge v-if="row.item.status_material == '1'" variant="success"><i class="va-inherit ri-eye-fill"></i> Published</b-badge>
                                    <b-badge v-else variant="dark"><i class="va-inherit ri-eye-off-fill"></i> Draft</b-badge>
                                </div>
                              </template>
                            </b-table>
                            <b-row>
                              <b-col md="12">
                              </b-col>
                            </b-row>
                          </b-modal>
                        </li>
                      </transition-group>
                    </draggable>
                    <b-row>
                        <b-col md="6">
                        </b-col>
                    </b-row>
                </template>
            </iq-card>
          </template>
        </iq-card>
      </b-col>
    </b-row>
    <b-modal id="modal-add-col" centered title="Form Tambah Etalase" @ok="addData" @hidden="resetField">
        <form>
          <b-row v-for="(input,k) in col" :key="k">
            <b-col md="12">
              <b-form-group label-for="nama_etalase" label="Nama Etalase">
                <b-form-input id="nama_etalase" v-model="input.name" type="text" placeholder="-"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
      </form>
    </b-modal>
    <b-modal id="addMaterial" ref="addMaterial" title="Tambah Material di Etalase" @ok="sendMaterial" @hidden="resetModal">
      <b-row>
        <b-col md="12">
          <b-form-group
            id="selMaterial1"
            label="Pilih Material"
            label-for="selMaterial"
          >
          <multiselect v-model="selMaterial" id="selMaterial" label="alias_name" placeholder="Type to search"
                open-direction="bottom" :multiple="true" :searchable="true" :internal-search="false"
                :clear-on-select="false" :options="getMaterial.map(x => x.m_id)"
                :custom-label="opt => getMaterial.find(x => x.m_id == opt).alias_name">
              </multiselect>
          </b-form-group>
        </b-col>
      </b-row>
    </b-modal>
  </b-container>
</template>
<script>
import {
  core,
  brokenImage
} from '../../../config/pluginInit'
import API from '@/services/vendor/material'
import draggable from 'vuedraggable'
import constant from '@/config/constant'
import {
  mapGetters
} from 'vuex'

export default {
  name: 'SettingEtalase',
  components: {
    draggable
  },
  mounted () {
    core.index()
    this.getCol()
    this.getMaterialVendor()
  },
  computed: {
    dragOptions () {
      return {
        animation: 0,
        group: 'description',
        disabled: !this.editable,
        ghostClass: 'ghost'
      }
    },
    listString () {
      return JSON.stringify(this.listCol, null, 2)
    }
  },
  watch: {
    isDragging (newValue) {
      if (newValue) {
        this.delayedDragging = true
        return
      }
      this.$nextTick(() => {
        this.delayedDragging = false
      })
    }
  },
  data () {
    return {
      user: {
        profile_image: require('../../../assets/images/user/user-11.png')
      },
      listCol: [],
      col: [{
        id: null,
        name: '',
        sort: null
      }],
      colurutan: [],
      Addcol: [],
      selMaterial: [],
      idetalase: '',
      getMaterial: [],
      checked: false,
      editable: true,
      isDragging: false,
      delayedDragging: false,
      userrole: this.userData(),
      assetUrl: constant.urlAssetsPHP,
      getDataList: [],
      fields: [
        {
          key: 'image',
          label: 'Foto'
        },
        {
          key: 'name_material',
          label: 'Nama Material'
        },
        {
          key: 'harga_material',
          label: 'Harga Toko',
          sortable: true
        },
        {
          key: 'available_stock',
          label: 'Stok'
        },
        {
          key: 'status_material_vendor',
          label: 'Status'
        }
      ]
    }
  },
  methods: {
    ...mapGetters({
      userData: 'authModule/getUserData'
    }),
    getCol () {
      core.custLoader(true)
      API.material
        .getEtalase().then(response => {
          const dt = response.data
          if (response.status) {
            const dataCol = dt.data
            const resFix = dataCol.map((name, index) => {
              return { col_name: name.name, order: Number(name.urutan), id: name.id }
            })
            this.listCol = resFix
            if (dataCol.length > 0) {
              for (var i in dataCol) {
                const dl = dataCol[i]
                var arr = {
                  id: dl.id,
                  name: dl.name,
                  sort: dl.urutan
                }
                this.col.push(arr)
              }
            } else {
              this.col = [{
                id: '',
                name: '',
                sort: ''
              }]
            }
          }
        }).finally(() => {
          core.custLoader(false)
        })
    },
    listMaterial (e) {
      core.custLoader(true)
      API.material
        .getList(0, 100, '', '', e.id).then(response => {
          const dt = response.data
          if (response.status === 200) {
            this.getDataList = dt.data
          }
        }).finally(() => {
          core.custLoader(false)
        })
    },
    getMaterialVendor () {
      core.custLoader(true)
      API.material.getList(0, 100, '', '', '')
        .then(response => {
          const dt = response.data
          if (response.status) {
            this.getMaterial = dt.data
          }
        }).catch(() => {
          core.showSnackbar('error', 'Maaf, terjadi kesalahan.')
        }).finally(() => {
          core.custLoader(false)
        })
    },
    addData () {
      core.custLoader(true)
      if (this.col.length > 1) {
        this.col[0].sort = this.col.length
      } else {
        this.col[0].sort = 1
      }
      this.Addcol = this.col

      API.material
        .addEtalase(this.col).then(response => {
          window.location.reload()
        }).finally(() => {
          core.custLoader(false)
        })
    },
    resetField (type) {
      this.col = [{
        name: '',
        sort: ''
      }]
    },
    reorderCol (newIndex, oldIndex) {
      core.custLoader(true)
      var arrnya = []
      this.listCol.splice(newIndex, 0, this.listCol.splice(oldIndex, 1)[0])
      this.listCol.forEach(function (item, index) {
        item.urutan = index + 1
        var arr = {
          id: item.id,
          name: item.col_name,
          sort: item.urutan
        }
        arrnya.push(arr)
      })

      API.material
        .addEtalase(arrnya).then(response => {
        }).finally(() => {
          this.getCol()
          core.custLoader(false)
        })
    },
    showModalMtrl (dt) {
      this.idetalase = dt.id
      this.$refs['addMaterial'].show()
    },
    sendMaterial () {
      core.custLoader(true)
      API.material
        .addMtrlEtalase(this.idetalase, { mid: this.selMaterial }).then(response => {
          if (response.status === 200) {
            core.showSnackbar('success', 'Berhasil menambah material')
            this.resetModal()
          }
        }).finally(() => {
          this.$refs['addMaterial'].hide()
          core.custLoader(false)
        })
    },
    resetModal () {
      this.idetalase = ''
      this.selMaterial = []
    },
    onMove ({
      relatedContext,
      draggedContext
    }) {
      const relatedElement = relatedContext.element
      const draggedElement = draggedContext.element
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      )
    },
    separatorNum (val) {
      if (typeof val === 'undefined' || val === null || val === 'null') {
        return null
      }
      val = parseFloat(val)
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    imgError (e) {
      e.target.src = brokenImage
    },
    cekImg (dt) {
      if (dt != null) {
        const img = dt.split(',')
        return img[0]
      } else {
        return '-'
      }
    }
  }
}

</script>

<style lang="less">
  .imgTBL {
    width: 60px;
    height: 60px;
    border: 1px #c3c2c252 solid;
    border-radius: 5px;
    object-fit: contain;
  }
</style>
