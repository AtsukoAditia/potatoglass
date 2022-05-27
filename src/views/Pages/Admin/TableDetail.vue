<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">
        <iq-card>
          <template v-slot:headerTitle>
          </template>
          <template v-slot:headerAction>
          </template>
          <template v-slot:body>
            <b-row>
              <b-col md="6">
                <div>
                    <h4 class="d-inline">Atur Kolom</h4>
                    <b-button variant="info" size="sm" class="float-right" v-b-modal.modal-add-col>+ Tambah</b-button>
                </div>
                <hr>
                <draggable class="list-group" tag="ul" v-model="listCol" v-bind="dragOptions" :move="onMove"
                  @start="isDragging=true" @end="isDragging=false" @change="reorderCol">
                  <transition-group type="transition" :name="'flip-list'">
                    <li class="list-group-item" v-for="element in listCol" :key="element.order">
                      <i :class="element.fixed? 'fa fa-anchor' : 'fa fa-pen'"
                        @click=" element.fixed=! element.fixed" aria-hidden="true"></i>
                      <b class="ml-1 mr-2">{{element.col_name}}</b>
                      <b-badge variant="primary">{{element.order}}</b-badge>
                    </li>
                  </transition-group>
                </draggable>
              </b-col>
              <b-col md="6">
                <div>
                    <h4 class="d-inline">Atur Row</h4>
                    <b-button variant="info" size="sm" class="float-right" v-b-modal.modal-add-row>+ Tambah</b-button>
                </div>
                <hr>
                <draggable class="list-group" tag="ul" v-model="listRow" v-bind="dragOptions" :move="onMove"
                @start="isDragging=true" @end="isDragging=false" @change="reorderRow">
                <transition-group type="transition" :name="'flip-list'">
                <li class="list-group-item" v-for="element in listRow" :key="element.order">
                    <i :class="element.fixed? 'fa fa-anchor' : 'fa fa-pen'"
                    @click=" element.fixed=! element.fixed" aria-hidden="true"></i>
                    <b class="ml-1 mr-2">{{element.row_name}}</b>
                    <b-badge variant="primary">{{element.order}}</b-badge>
                </li>
                </transition-group>
            </draggable>
              </b-col>
            </b-row>
          </template>
        </iq-card>
      </b-col>
    </b-row>
    <!-- Modal -->
    <b-modal id="modal-add-col" centered title="Form Tambah Kolom" @ok="addData('col')" @hidden="resetField('col')">
        <form>
          <b-row>
            <b-col md="12">
              <b-form-group label-for="nama_kolom" label="Nama Kolom">
                <b-form-input id="nama_kolom" v-model="col.colname" type="text" placeholder="-"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="12">
              <b-form-group label-for="desk_kolom" label="Deskripsi">
                <b-form-input id="desk_kolom" v-model="col.description" type="text" placeholder="-"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="12">
              <b-form-group label-for="fixed_kolom" label="Fixed">
                <b-form-select v-model="col.fixed" :options="fixed" id="fixed_kolom"></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
      </form>
    </b-modal>
    <b-modal id="modal-add-row" centered title="Form Tambah Row" @ok="addData('row')" @hidden="resetField('row')">
        <form>
          <b-row>
            <b-col md="12">
              <b-form-group label-for="nama_row" label="Nama Row">
                <b-form-input id="nama_row" v-model="row.rowname" type="text" placeholder="-"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="12">
              <b-form-group label-for="desk_row" label="Deskripsi">
                <b-form-input id="desk_row" v-model="row.description" type="text" placeholder="-"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="12">
              <b-form-group label-for="fixed_row" label="Fixed">
                <b-form-select v-model="row.fixed" :options="fixed" id="fixed_row"></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
      </form>
    </b-modal>
  </b-container>
</template>
<script>
import draggable from 'vuedraggable'
import {
  core
} from '@/config/pluginInit'
import API from '@/services/admin'
// import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'

export default {
  name: 'TableDetail',
  mounted () {
    core.index()
    // Set the initial number of items
    this.getCol()
    this.getRow()
  },
  data () {
    return {
      listCol: [],
      listRow: [],
      editable: true,
      isDragging: false,
      delayedDragging: false,
      fixed: [
        { value: 1, text: 'Ya' },
        { value: 0, text: 'Tidak' }
      ],
      col: {
        table: this.$route.params.id,
        colname: '',
        order: null,
        desc: '',
        fixed: null
      },
      row: {
        table: this.$route.params.id,
        rowname: '',
        order: null,
        desc: '',
        fixed: null
      }
    }
  },
  filters: {
    moment: function (date) {
      return moment(date).format('D/MMM/YYYY, hh:mm:ss A')
    }
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
  components: {
    draggable
  },
  beforeMount () {},
  methods: {
    getCol () {
      core.custLoader(true)
      API.table
        .getColumn(this.$route.params.id).then(response => {
          const dt = response.data
          if (response.status) {
            const dataCol = dt.data
            const resFix = dataCol.map((name, index) => {
              return { col_name: name.col_name, fixed: Boolean(Number(name.fixed)), order: Number(name.order), id: name.id }
            })
            this.listCol = resFix
          }
        }).finally(() => {
          core.custLoader(false)
        })
    },
    getRow () {
      core.custLoader(true)
      API.table
        .getRow(this.$route.params.id).then(response => {
          const dt = response.data
          if (response.status) {
            const dataRow = dt.data
            const resFix = dataRow.map((name, index) => {
              return { row_name: name.row_name, fixed: Boolean(Number(name.fixed)), order: Number(name.order), id: name.id }
            })
            this.listRow = resFix
          }
        }).finally(() => {
          core.custLoader(false)
        })
    },
    addData (type) {
      this.col.order = this.listCol.length + 1
      this.row.order = this.listRow.length + 1
      core.custLoader(true)
      if (type === 'col') {
        API.table
          .addColumn(this.col).then(response => {
            this.getCol()
          }).finally(() => {
            core.custLoader(false)
          })
      } else {
        API.table
          .addRow(this.row).then(response => {
            this.getRow()
          }).finally(() => {
            core.custLoader(false)
          })
      }
    },
    resetField (type) {
      if (type === 'col') {
        this.col = {
          table: this.$route.params.id,
          colname: '',
          order: '',
          desc: '',
          fixed: null
        }
      } else {
        this.row = {
          table: this.$route.params.id,
          colname: '',
          order: '',
          desc: '',
          fixed: null
        }
      }
    },
    reorderCol (newIndex, oldIndex) {
      core.custLoader(true)
      this.listCol.splice(newIndex, 0, this.listCol.splice(oldIndex, 1)[0])
      this.listCol.forEach(function (item, index) {
        item.order = index + 1
      })

      API.table
        .changeOrderCol(this.listCol).then(response => {
        }).finally(() => {
          core.custLoader(false)
        })
    },
    reorderRow (newIndex, oldIndex) {
      core.custLoader(true)
      this.listRow.splice(newIndex, 0, this.listRow.splice(oldIndex, 1)[0])
      this.listRow.forEach(function (item, index) {
        item.order = index + 1
      })

      API.table
        .changeOrderRow(this.listRow).then(response => {
        }).finally(() => {
          core.custLoader(false)
        })
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
    }
  }
}

</script>

<style lang="less" scoped>
  .flip-list-move {
    transition: transform 0.5s;
  }

  .no-move {
    transition: transform 0s;
  }

  .ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }

  .list-group {
    min-height: 20px;
  }

  .list-group-item {
    cursor: move;
  }

  .list-group-item i {
    cursor: pointer;
  }

</style>
