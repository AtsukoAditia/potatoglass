<template>
  <b-container fluid>
    <b-row class="justify-content-md-center">
      <b-col md="6">
        <iq-card body-class="chat-page p-0">
          <template v-slot:body>
            <!-- <div class="chat-data-block"> -->
            <b-row>
              <div class="col-lg-12 chat-data p-0 chat-data-right"
                :style="`background: url(${require('../../../assets/images/page-img/100.jpg')}) no-repeat scroll center center;background-size: cover;`">
                <!-- <tab-content id="v-pills-tabContent">
                    <tab-content-item id="v-pills-home" aria-labelled-by="v-pills-default"> -->
                <!-- <template> -->
                <div class="chat-content scroller" id="chatContent">
                  <!-- <template v-for="(item,index) in detail.detail">
                    <div class="chat" :key="index" v-if="item.user_id == getLocalUser.user.id">
                      <div class="chat-user">
                        <a class="avatar m-0">
                          Vendor
                        </a>
                        <span class="chat-time mt-1">{{ item.time }}</span>
                      </div>
                      <div class="chat-detail">
                        <div class="chat-message">
                          <p>
                            {{ htmlDecode(item.text_message) }}</p>
                        </div>
                      </div>
                    </div>
                    <div class="chat chat-left" :key="index" v-else>
                      <div class="chat-user">
                        <a class="avatar m-0">
                          Contractor
                        </a>
                        <span class="chat-time mt-1">{{ item.time }}</span>
                      </div>
                      <div class="chat-detail">
                        <div class="chat-message">
                          <p>
                            {{ htmlDecode(item.text_message) }}</p>
                        </div>
                      </div>
                    </div>
                  </template> -->
                </div>
                <div class="chat-footer p-3 bg-white">
                  <form class="d-flex align-items-center" action="javascript:void(0);">
                    <!-- <div class="chat-attagement d-flex">
                      <a href="javascript:void(0)"><i class="fa fa-smile-o pr-3" aria-hidden="true"></i></a>
                      <a href="javascript:void(0)"><i class="fa fa-paperclip pr-3" aria-hidden="true"></i></a>
                    </div> -->
                    <input type="text" class="form-control mr-3" placeholder="Type your message" v-model="reply">
                    <button type="submit" class="btn btn-primary d-flex align-items-center p-2" @click="sendReply"><i
                        class="fa fa-paper-plane-o" aria-hidden="true"></i><span
                        class="d-none d-lg-block ml-1">Kirim</span></button>
                  </form>
                </div>
                <!-- </template> -->
                <!-- </tab-content-item>
                  </tab-content> -->
              </div>
            </b-row>
            <!-- </div> -->
          </template>
        </iq-card>
      </b-col>
      <b-col md="3">
        <iq-card body-class="" class="mb-3">
          <template v-slot:body>
            <h5>{{ detail.resolusi_type }}</h5>
            <hr class="mt-0">
            <div class="resolusiDetail1">
              <p class="mb-2">
                <small>ID Order</small>
                <span class="d-block">{{ detail.order_id }}</span>
              </p>
              <p class="mb-2">
                <small>Pembeli</small>
                <span class="d-block"> {{ detail.data_pembeli.nama_lengkap }} <small>- {{ detail.data_pembeli.nama_perusahaan }}</small></span>
              </p>
              <p class="mb-0">
                <small>Tanggal Buka Pengajuan</small>
                <span class="d-block">{{ detail.data_pembeli.created_date | moment }}</span>
              </p>
            </div>
            <b-button variant="success" size="sm">Setujui</b-button>
          </template>
        </iq-card>

        <iq-card body-class="" class="mb-3">
          <template v-slot:body>
            <h5>Produk pada order</h5>
            <hr class="mt-0">
            <div>
              <ul class="list-unstyled">
                <b-media tag="li" v-for="(item, index) in detail.order_list" :key="index">
                  <template #aside>
                    <b-img blank blank-color="#abc" width="50" alt="placeholder"></b-img>
                  </template>
                  <router-link :to="'/material/'+item.m_id">
                    <span class="mt-0 mb-1 font-weight-bold">{{ item.material.material_name }}</span>
                  </router-link>
                  <p class="mb-0"><small>{{ item.jumlah_item }} x Rp {{ separatorNum(item.price) }}</small>
                    <span class="float-right text-dark">Rp {{ separatorNum(item.sub_total) }}</span>
                  </p>
                </b-media>
              </ul>
            </div>
          </template>
        </iq-card>

        <iq-card body-class="" class="mb-3">
          <template v-slot:body>
            <h5>Total Dana : <span class="float-right text-warning font-weight-bold">Rp -</span></h5>
          </template>
        </iq-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import {
  mapGetters
} from 'vuex'
import {
  core
} from '../../../config/pluginInit'
import User from '../../../Model/User'
import moment from 'moment'
import axios from 'axios'
import constant from '@/config/constant'

export default {
  name: 'Index',
  components: {},
  beforeMount () {
    // this.$store.registerModule('Chat', Chat)
  },
  mounted () {
    core.index()
    this.getDataReview()
  },
  beforeDestroy () {
    // this.$store.unregisterModule('Chat')
  },
  data () {
    return {
      search: '',
      user: new User({
        id: 1,
        name: 'Anna Sthesia',
        role: 'Developer',
        image: require('../../../assets/images/user/user-08.jpg'),
        isActive: true
      }),
      reply: '',
      joinBtn: false,
      channel: 'DemoRoom',
      baseMode: 'avc',
      transcode: 'interop',
      detail: {
        data_pembeli: {}
      },
      getLocalUser: this.userData()
    }
  },
  computed: {
    filteredList () {
      return this.usersList.filter(item => {
        return item.name.toLowerCase().includes(this.search.toLowerCase())
      })
    },
    ...mapGetters({
      userData: 'authModule/getUserData'
    })
  },
  filters: {
    moment: function (date) {
      return moment(date).format('D MMMM YYYY')
    }
  },
  methods: {
    getDataReview () {
      axios.get(`${constant.urlAPIPHP}/resolution/${this.$route.params.id}`, {
        headers: {}
      }).then(res => {
        const dt = res.data
        if (res.status) {
          this.detail = dt.row
          var dtMsg = ''
          for (var i in dt.row.detail) {
            const msg = dt.row.detail[i]
            var clsChat = ''
            var usrChat = 'Vendor'
            var txtclsChat = 'white'
            if (msg.user_id !== this.getLocalUser.user.id) {
              clsChat = 'chat-left'
              usrChat = 'Contractor'
              txtclsChat = 'dark'
            }
            dtMsg += `<div class="chat ${clsChat}">
                        <div class="chat-user">
                          <a class="avatar m-0">
                            ${usrChat}
                          </a>
                          <span class="chat-time mt-1">${msg.created_time} ${msg.created_date}</span>
                        </div>
                        <div class="chat-detail">
                          <div class="chat-message text-${txtclsChat}">
                            <p>${msg.text_message}</p>
                          </div>
                        </div>
                      </div>`
          }
          const containerChat = document.getElementById('chatContent')
          containerChat.innerHTML = dtMsg
        }
      }).finally(() => {
        this.loading = false
      }).catch(() => {
        core.showSnackbar('error', 'Maaf, terjadi kesalahan pada sistem.')
      })
    },
    sendReply () {
      core.custLoader(true)
      var fd = new FormData()
      fd.append('resolution_id', this.detail.id)
      fd.append('text_message', this.reply)
      fd.append('user_id', this.getLocalUser.user.id)
      axios.post(`${constant.urlAPIPHP}/save_reply_resolusi`, fd).then(response => {
        if (response.status) {
          core.showSnackbar('success', 'Pesan berhasil terkirim...')
        }
      }).catch(() => {
        core.showSnackbar('error', 'Maaf, terjadi kesalahan. Pada Sistem')
      }).finally(() => {
        this.getDataReview()
        core.custLoader(false)
      })
    },
    checkUser (item, type) {
      let user = this.usersList.find(user => user.id === item)
      let final
      if (user !== undefined) {
        switch (type) {
          case 'name':
            final = user.name
            break
          case 'image':
            final = user.image
            break
          case 'role':
            final = user.role
            break
        }
        return final
      }
      return require('../../../assets/images/user/user-05.jpg')
    },
    generate () {
      this.channel = core.random(24)
    },
    copyText () {
      core.Snackbar({
        text: 'Copied'
      })
    },
    htmlDecode (input) {
      // eslint-disable-next-line no-useless-escape
      // var regex = /<br\s*[\/]?>/gi
      // var text = input.replace(regex, '\n')
      return input
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
  .remove-toggle::after {
    content: unset;
  }

  .resolusiDetail1 p {
    line-height: 1.3;
  }

  .resolusiDetail1 p span {
    color: rgb(83, 83, 83);
  }

  .media {
    font-size: 11pt;
    margin-bottom: 8px;
  }
  .media-aside {
    margin-right: 5px !important;
  }

  .chat-message {
    font-size: 11pt;
    border-radius: 5px !important;
    padding: 8px 15px !important;
    line-height: 1.2;
  }
  .chat-time {
    font-size: 8pt !important;
  }
  .text-headernya {
    display: block;
    font-weight: bold;
    border-bottom: 1px rgb(241 241 241) solid;
  }
  .chat-content .chat-left .chat-message {
    margin: 0 0.3rem 0.5rem 1.3rem;
  }
</style>
