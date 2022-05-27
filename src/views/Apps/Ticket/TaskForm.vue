<template>
  <b-modal id="add_task" centered title="Kirim Tiket kepada Admin" size="lg">
    <b-form>
      <b-form-group
        class="form-group"
        label="Judul Tiket"
        label-for="task_tile"
      >
        <b-form-input name="task_title" v-model="task.task_title" id="task_tile" placeholder=""></b-form-input>
      </b-form-group>

      <b-form-group
        class="form-group"
        label="Isi Tiket"
        label-for="task_desc">
          <!-- <b-form-textarea
            v-model="task.ticket_description"
            id="task_desc"
            rows="5"
            max-rows="10"
            style="line-height:1.6;"
          ></b-form-textarea> -->
          <wysiwyg v-model="task.ticket_description" />
      </b-form-group>

      <!-- <b-form-group
        class="form-group"
        label="Prioritas"
        label-for="ticket_priority"
      >
        <v-select v-model="task.ticket_priority" name="user_id" id="ticket_priority" :options="ticket_priority" />
      </b-form-group> -->

      <b-form-group
        class="form-group"
        label="Tipe"
        label-for="type"
      >
        <b-form-radio inline v-model="task.ticket_type" name="type" :value="item.id" v-for="(item,index) in ticket_type" :key="index">{{ item.label }}</b-form-radio>
      </b-form-group>
    </b-form>
    <template v-slot:modal-footer>
      <b-button variant="none" class="iq-bg-primary"  @click="$bvModal.hide('add_task')">Batal</b-button>
      <b-button variant="primary" @click="saveTask(task)">Kirim Tiket</b-button>
    </template>
  </b-modal>
</template>
<script>
import API from '@/services/ticketing'
import { core } from '../../../config/pluginInit'
export default {
  name: 'TaskForm',
  props: ['newId', 'category', 'project'],
  data () {
    return {
      // ticket_priority: [],
      ticket_type: [],
      ticket_description: '',
      task_title: '',
      task: this.default()
    }
  },
  mounted () {
    this.category.map(item => {
      if (!item.isHidden) {
        this.ticket_priority.push({
          label: item.name,
          id: item.id
        })
      }
    })
    this.project.map(item => {
      this.ticket_type.push({
        label: item.project_name,
        id: item.val
      })
    })
  },
  computed: {
  },
  methods: {
    default () {
      return {
        id: this.newId,
        task_title: '',
        project_id: 1,
        category_id: 0,
        user_id: 0,
        status: 2,
        task_status: false
      }
    },
    saveTask (item) {
      const dataSend = {
        ticket_title: item.task_title,
        ticket_description: item.ticket_description,
        ticket_type: item.ticket_type
        // ticket_priority: item.ticket_priority.id
      }
      API.newTicket(dataSend)
        .then(result => {
          if (result.status) {
            core.showSnackbar('success', 'Membuat tiket berhasil...')
            this.$bvModal.hide('add_task')
            this.task = this.default()

            API.listTicket()
              .then(result => {
                if (result.status) {
                  this.$store.dispatch('Ticket/addTaskAction', result.data.result)
                  location.reload()
                }
              }).catch()
          }
        }).catch()
    },
    nameKeydown (e) {
      if (/^\W$/.test(e.key)) {
        e.preventDefault()
      }
    }
  }
}
</script>
