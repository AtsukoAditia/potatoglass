<template>
  <b-container fluid="">
    <b-row>
      <b-col md="4">
        <iq-card>
          <template v-slot:headerTitle>
            <h5 class="card-title">Informasi Tiket <b>#00{{ $route.params.id }}</b></h5>
          </template>
          <template v-slot:body>
            <b-row>
              <b-col md="12">
                <div class="table-responsive">
                  <table class="table table-borderless table-sm">
                    <tr>
                      <td>Judul Tiket</td>
                      <td>: {{ listDetailTicket.ticket_title }}</td>
                    </tr>
                    <tr>
                      <td>Status</td>
                      <td>:
                        <b-badge v-if="listDetailTicket.ticket_status === '2'" variant="danger">Ticket Rejected</b-badge>
                        <b-badge v-else-if="listDetailTicket.ticket_status === '1'" variant="info">Ticket Open</b-badge>
                        <b-badge v-if="listDetailTicket.ticket_status === '3'" variant="success">Ticket Approved</b-badge>
                        <b-badge v-if="listDetailTicket.ticket_status === '4'" variant="secondary">Ticket Closed</b-badge>
                      </td>
                    </tr>
                    <tr>
                      <td>Tipe Tiket</td>
                      <td>: <b>{{ listDetailTicket.ticket_type }}</b></td>
                    </tr>
                    <!-- <tr>
                      <td>Prioritas</td>
                      <td>:
                        <b-badge v-if="listDetailTicket.priority === 'High'" variant="danger">High</b-badge>
                        <b-badge v-else-if="listDetailTicket.priority === 'Medium'" variant="warning">Medium</b-badge>
                        <b-badge v-if="listDetailTicket.priority === 'Low'" variant="secondary">Low</b-badge>
                      </td>
                    </tr> -->
                  </table>
                </div>
              </b-col>
            </b-row>
            <b-row>
                <b-col md="12" class="mb-2" v-if="userData.user.role == 10">
                  <b-button v-if="listDetailTicket.ticket_status === '1'" @click="approveAct(3)" variant="success" class="float-right">Menyetujui Tiket</b-button>
                  <b-button v-if="listDetailTicket.ticket_status === '1'" @click="approveAct(2)" class="float-right mr-2" variant="danger">Tolak Tiket</b-button>
                  <b-button v-if="listDetailTicket.ticket_status !== '4'" @click="approveAct(4)" variant="warning" class="float-right mr-2">Tutup Tiket</b-button>
                  <b-button v-else variant="secondary" class="float-right mr-2">Tiket Telah di Tutup</b-button>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="12">
                  <div>
                    <span class="text-dark">Deskripsi</span>
                    <b-alert class="text-dark" show variant="secondary">
                      {{ listDetailTicket.ticket_desc }}
                    </b-alert>
                  </div>
                </b-col>
            </b-row>
          </template>
        </iq-card>
      </b-col>

      <b-col md="8" class="profile-center">
        <b-row>
          <b-col md="12" v-if="listDetailTicket.ticket_status !== '4' && listDetailTicket.ticket_status !== '2'">
            <b-button v-b-toggle.collapse-1 variant="primary" size="lg" class="w-100">Balas Tiket</b-button>
            <b-collapse id="collapse-1" class="mt-2">
              <b-card>
                  <b-form>
                    <b-form-group
                      class="form-group"
                      label="Isi Balasan"
                      label-for="task_desc">
                        <wysiwyg v-model="reply.reply_text" />
                    </b-form-group>
                  </b-form>
                  <b-button variant="primary" class="float-right" @click="replyAct">Balas Tiket</b-button>
              </b-card>
            </b-collapse>
          </b-col>
        </b-row>
        <hr>
        <tab-content id="pills-tabContent-2">
          <tab-content-item :active="true" id="profile-feed" aria-labelled-by="pills-feed-tab">
            <template v-for="(item,index) in replyDetailTicket">
                <iq-card  body-class="p-0" :key="index" v-bind:style="item.role == 10 ? 'background:#fafff7;':''">
                  <template v-slot:body>
                    <div class="user-post-data p-1" v-bind:style="item.role == 10 ? 'background:#fafff7;border-top-right-radius: 15px;border-top-left-radius: 10px;':''">
                      <div class="d-flex flex-wrap">
                        <div class="media-support-user-img mr-3">
                          <!-- <b-img rounded="circle" fluid src="#" alt="" /> -->
                          <!-- <i class="ri-home-4-line mr-1 float-left"></i> -->
                        </div>
                        <div class="media-support-info mt-2">
                          <h5 class="mb-0">
                            <b-link href="#" class="">{{ item.username }}</b-link>
                          </h5>
                          <p class="mb-0 text-primary">{{ item.role_name }}</p>
                        </div>
                        <div class="iq-card-header-toolbar d-flex align-items-center mr-3">
                          <b-link href="#" class="text-secondary">{{ item.created_at | moment }}</b-link>
                        </div>
                      </div>
                    </div>
                    <hr class="mt-0 mb-2">
                    <p class="pr-4 pl-4 pb-3 mb-0 text-dark">
                        {{ item.reply_text }}
                    </p>
                  </template>
                </iq-card>
            </template>
          </tab-content-item>
        </tab-content>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { core } from '../../../config/pluginInit'
import API from '@/services/ticketing'
import { mapGetters } from 'vuex'
import moment from 'moment'
export default {
  name: 'TicketDetail',
  props: {},
  mounted () {
    core.index()
    this.detailTicket()
    this.replyDetail()
  },
  data () {
    return {
      reply: {
        reply_text: '',
        ticket_id: parseInt(this.$route.params.id)
      },
      listDetailTicket: [],
      replyDetailTicket: []
    }
  },
  filters: {
    moment: function (date) {
      return moment(date).format('hh:mm:ss A, D MMM YYYY')
    }
  },
  computed: {
    ...mapGetters({
      userData: 'authModule/getUserData'
    })
  },
  methods: {
    replyAct () {
      API.replyTicket(this.reply)
        .then(result => {
          if (result.status) {
            core.showSnackbar('success', 'Membalas tiket berhasil...')
            this.reply.reply_text = ''
            this.replyDetail()
          }
        }).catch()
    },
    detailTicket () {
      API.detailTicketPHP(parseInt(this.$route.params.id))
        .then(result => {
          if (result.status) {
            this.listDetailTicket = result.data.data[0]
          }
        }).catch()
    },
    replyDetail () {
      API.detailReplyPHP(parseInt(this.$route.params.id))
        .then(result => {
          if (result.status) {
            this.replyDetailTicket = result.data.data
          }
        }).catch()
    },
    approveAct (status) {
      const data = {
        ticket_status: status
      }
      API.approveTicket(parseInt(this.$route.params.id), data)
        .then(result => {
          if (result.status) {
            this.detailTicket()
            //   this.$router.push({ name: 'ticket.ticket' })
          }
        }).catch()
    }
  }
}

</script>

<style>
</style>
