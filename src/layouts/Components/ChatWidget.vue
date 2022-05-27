/* eslint-disable camelcase */
/* eslint-disable camelcase */
<template>
  <div>
      <button @click="openWindowChat()" class="btn-sm chat-button btn-chat-cust bg-primary">
        <!-- <i class="ri-message-3-line"></i>  -->
        Pesan</button>
      <div class="window-chat" v-if="btnchat == true">
          <div class="subwindow-chat">
              <div class="left-list-user">
                  <div class="list-chat-user">
                      <div v-for="(item, x) in dtRooms" :key="x" @click="checkRoom(item.idchat)" :class="{'room-active': activeRoom === item.idchat, 'user-chat': clsUserChat}">
                          <span><i class="ri-group-line"></i> {{ item.cust }}</span>
                      </div>
                      <router-link to="app/chat">
                        <div class="user-chat" style="position: absolute;bottom: 0;">
                          <span>Lebih Lengkap <i class="ri-share-box-line"></i></span>
                        </div>
                      </router-link>
                  </div>
              </div>
              <div class="right-chat">
                <b-row>
              <div class="col-lg-12"
                :style="``">
                <div class="chat-content chat-mini-height scroller" id="chatContent" ref="chatContent">
                    <div v-for="(chat, x) in chatData" :key="x" :class="{'chat-left': chat.sender_id !== userID, 'chat': clsDataChat}">
                      <div class="chat-user">
                        <a class="avatar m-0">
                          <img v-if="chat.user === 1" src="https://placekitten.com/35/35" class="rounded">
                          <img v-else src="https://placekitten.com/35/35" class="rounded">
                        </a>
                      </div>
                      <div class="chat-detail">
                        <div class="chat-message">
                          <p>{{ chat.text }}
                            <span class="chat-time-cust">{{ chat.time }}, {{ chat.date }}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                </div>
                <div class="chat-footer p-2 bg-white">
                  <div class="mb-2 cont-tmplt-chat">
                    <div class="tmplt-chat">
                      <b-button v-for="(dt, k) in dtable" :key="k" pill class="mr-2" variant="outline-secondary" @click="sendTemplate(dt.text)">{{ dt.text }}</b-button>
                  </div>
                  </div>
                  <ValidationObserver ref="form" v-slot="{ handleSubmit }">
                  <form class="d-flex align-items-center" @submit.prevent="handleSubmit(sendChat)">
                    <!-- <div class="chat-attagement d-flex">
                      <a href="javascript:void(0)"><i class="fa fa-smile-o pr-3" aria-hidden="true"></i></a>
                      <a href="javascript:void(0)"><i class="fa fa-paperclip pr-3" aria-hidden="true"></i></a>
                    </div> -->
                    <input type="text" class="form-control mr-3" placeholder="Type your message" v-model="reply">
                    <button type="submit" class="btn btn-primary d-flex align-items-center p-2"><i
                        class="fa fa-paper-plane-o" aria-hidden="true"></i><span
                        class="d-none d-lg-block ml-1">Kirim</span></button>
                  </form>
                  </ValidationObserver>
                </div>
              </div>
            </b-row>
              </div>
          </div>
      </div>
  <div v-else>
  </div>
  </div>
</template>
<script>
import { APPNAME } from '../../config/pluginInit'
// import ChatWindow from 'vue-advanced-chat'
// import 'vue-advanced-chat/dist/vue-advanced-chat.css'
import API from '@/services/vendor/setting'
import io from 'socket.io-client'
import axios from 'axios'
import constant from '@/config/constant'
import moment from 'moment'

var jsonroom = []

var dt = [
  {
    'room_id': 1,
    'cust': 'Pondok Sneakhead',
    'unread': '1',
    'chat': [
      {
        'id': '1',
        'user': 0,
        'text': 'jadi pak?',
        'sended_time': '13:21',
        'sended_date': '10 September 2021'
      },
      {
        'id': '2',
        'user': 1,
        'text': 'maaf min',
        'read': 0,
        'sended_time': '13:21',
        'sended_date': '10 September 2021'
      }
    ]
  }, {
    'room_id': 88,
    'cust': 'Supriadi',
    'unread': '0',
    'chat': [
      {
        'id': '1',
        'user': 1,
        'text': 'halo apakah bisa nego?',
        'read': 1,
        'sended_time': '11:12',
        'sended_date': '09 September 2021'
      },
      {
        'id': '2',
        'user': 0,
        'text': 'Maaf pak, tidak bisa',
        'sended_time': '13:21',
        'sended_date': '10 September 2021'
      }
    ]
  }, {
    'room_id': 89,
    'cust': 'Amandela',
    'unread': '0',
    'chat': [
      {
        'id': '1',
        'user': 1,
        'text': 'min yang ini punya stok berapa?',
        'read': 1,
        'sended_time': '07:12',
        'sended_date': '06 September 2021'
      },
      {
        'id': '2',
        'user': 0,
        'text': 'banyak pak, bisa langsung di order saja',
        'sended_time': '07:21',
        'sended_date': '06 September 2021'
      },
      {
        'id': '3',
        'user': 1,
        'text': 'oke siap min, nanti saya order',
        'read': 1,
        'sended_time': '08:09',
        'sended_date': '06 September 2021'
      },
      {
        'id': '4',
        'user': 0,
        'text': 'baik, terimakasih',
        'read': 1,
        'sended_time': '08:20',
        'sended_date': '06 September 2021'
      }
    ]
  }
]
export default {
  name: 'ChatWidget',
  components: {
    // ChatWindow
  },
  mounted () {
    this.getChat()
    const dtuser = JSON.parse(localStorage.user).user
    const username = dtuser.username
    const id = dtuser.id
    var fdata = new FormData()
    fdata.append('b_user_id', id)
    this.getChatList(fdata)
    this.socket.emit('authUser', ({ username, id }))

    this.socket.on('private_message', (message) => {
      this.getChatList(fdata)
      const idChat = message.id_chat
      // console.log(idChat, this.activeRoom)
      if (idChat === this.activeRoom) {
        const msgdata = {}
        msgdata['id'] = message.id
        msgdata['sender_id'] = message.sender_id
        msgdata['receiver_id'] = message.receiver_id
        msgdata['text'] = message.text
        msgdata['time'] = message.time
        msgdata['date'] = message.date
        this.chatData.push(msgdata)
        this.$emit('chatContent', true)
        setTimeout(() => {
          this.scrollToEnd()
        }, 500)
      }
    })
  },
  data () {
    return {
      appName: APPNAME,
      // rooms: forRooms,
      // messages: forMessages,
      currentUserId: 1234,
      reply: '',
      btnchat: false,
      dtable: [],
      dtRooms: jsonroom,
      dtChats: dt,
      activeRoom: undefined,
      clsUserChat: true,
      clsDataChat: true,
      chatData: [],
      socket: io('https://teras.camp:9443'),
      isConnected: false,
      socketMessage: '',
      userID: JSON.parse(localStorage.user).user.id,
      a_socket_id: '',
      b_socket_id: ''
    }
  },
  methods: {
    getChat () {
      API.chattemplate
        .get().then(response => {
          var dt = response.data
          if (response.status === 200) {
            this.dtable = dt.data.list
          }
        })
    },
    checkRoom (id) {
      this.activeRoom = id
      this.checkChat(id)
    },
    checkChat (room) {
      const chats = this.dtRooms.find(el => el.idchat === room)
      this.a_socket_id = chats.a_socket_id
      this.b_socket_id = this.socket.id
      var fdata = new FormData()
      fdata.append('a_user_id', chats.idkontraktor)
      fdata.append('b_user_id', chats.iduser)
      this.getChatList(fdata, 'detail')
      // console.log(this.a_socket_id, this.socket.id)
      this.socket.emit('updateChatCount', ({ id_chat: chats.idchat, b_user_id: chats.iduser }))
      // this.chatData = chats
    },
    sendChat () {
      if (this.reply !== '') {
        var dtMsg = `<div class="chat">
                        <div class="chat-user">
                          <a class="avatar m-0">
                            <img src="https://placekitten.com/35/35" class="rounded">
                          </a>
                        </div>
                        <div class="chat-detail">
                          <div class="chat-message">
                            <p>${this.reply}
                              <span class="chat-time-cust">08:20, 06 September 2021</span>
                            </p>
                          </div>
                        </div>
                      </div>`
        const containerChat = document.getElementById('chatContent')
        const ee = document.createElement('div')
        ee.innerHTML = dtMsg

        while (ee.firstChild) {
          containerChat.appendChild(ee.firstChild)
        }
        const chats = this.dtRooms.find(el => el.idchat === this.activeRoom)
        var objmsg = {
          msg: this.reply,
          sid: this.socket.id,
          id: chats.a_socket_id,
          a_user_id: chats.idvendor,
          b_user_id: chats.idvendor,
          hasData: false,
          id_chat: chats.idchat
        }
        this.socket.emit('private_chat', (objmsg))
        // containerChat.appendChild = dtMsg
        this.reply = ''
        this.scrollToEnd()
      } else {
        alert('Pesan tidak boleh kosong')
      }
    },
    scrollToEnd () {
      var content = this.$refs.chatContent
      content.scrollTop = content.scrollHeight
    },
    sendTemplate (txt) {
      this.reply = txt
    },
    getChatList (dt, type = null) {
      axios.post(`${constant.urlAPIPHPLocal}/Front/getChatData`, dt).then(data => {
        if (data.data.success) {
          if (type == null) {
            const userdata = []
            for (var i in data.data.data) {
              const dt = data.data.data[i]
              userdata.push({
                id: null,
                cust: dt.name_sender,
                a_socket_id: dt.a_socket_id,
                b_socket_id: dt.b_socket_id,
                username: dt.name_sender,
                idvendor: dt.idvendor,
                avatar: dt.logo,
                idkontraktor: dt.a_user_id,
                iduser: dt.b_user_id,
                idchat: dt.idchat,
                read_count: dt.read_count
              })
              this.dtRooms = userdata
            }
          } else {
            var ddetail = data.data.data[0].detail
            const msgsdata = []
            for (var x in ddetail) {
              const dt = ddetail[x]
              const msgdata = {}
              msgdata['id'] = dt.id
              msgdata['sender_id'] = dt.sender_id
              msgdata['receiver_id'] = dt.receiver_id
              msgdata['text'] = dt.text_message
              msgdata['time'] = moment(dt.timestamp).format('h:mm a')
              msgdata['date'] = moment(dt.timestamp).format('DD MMM YYYY')

              msgsdata.push(msgdata)
            }
            this.chatData = msgsdata
            setTimeout(() => {
              this.scrollToEnd()
            }, 500)
          }
        }
      })
    },
    openWindowChat () {
      this.btnchat = !(this.btnchat)
      const id = JSON.parse(localStorage.user).user.id
      var fdata = new FormData()
      fdata.append('b_user_id', id)
      this.getChatList(fdata)
    }
  }
}
</script>

<style lang="less">
.chat-button {
    width: auto;
    font-family: "Nunito Sans", sans-serif;
    font-weight: 700;
    line-height: 24px;
    text-indent: initial;
    background: linear-gradient(to right, var(--iq-primary) 0%, var(--iq-primary-light) 100%) !important;
    border: none;
    display: inline-block;
    outline: none;
    cursor: pointer;
    position: fixed;
    right: 6%;
    bottom: 0px;
    height: auto;
    padding: 6px 20px;
    box-shadow: 0 2px 6px 0 var(--N150,#B5BBC5);
    color: var(--G500,#ffffff);
    border-radius: 20px;
    font-size: 16px;
    z-index: 100;
    transition: all 0.2s ease-in-out 0s;
    transform: translateY(-40px);
    opacity: 1;
    -webkit-box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%);
    box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%);

}
.chat-button span {
    font-size: inherit;
    text-overflow: ellipsis;
    white-space: nowrap;
    opacity: 1;
    display: block;
    overflow: hidden;
    position: relative;
    top: 0px;
    transition: opacity 300ms linear 0s, top 300ms linear 0s;
}
.window-chat {
    display: block;
    max-height: calc(100vh - 233px);
    height: 450px;
    width: 560px;
    display: flex;
    position: fixed;
    right: 230px;
    bottom: 42px;
    background-color: var(--N0,#FFFFFF);
    border-radius: 12px;
    box-shadow: 0 2px 30px 0 var(--N150,#B5BBC5);
    z-index: 100;
    transition: all 0.2s ease-in-out 0s;
    transform: translateY(-40px);
    opacity: 1;
    font-family: "Nunito Sans", "Open Sans", Tahoma !important;
}
.subwindow-chat {
    display: flex;
    position: relative;
    width: 100%;
    height: 100%;
}
.window-chat .left-list-user {
    width: 30%;
    display: flex;
    flex-direction: column;
}
.window-chat .right-chat {
    width: 70%;
    border-left: 1px solid var(--N75,#E5E7E9);
}
.list-chat-user {
    overflow-y: auto;
    z-index: 1;
    -webkit-box-flex: 1;
    flex-grow: 1;
    padding: 0px 4px;
    border-bottom-left-radius: 12px;
    overscroll-behavior-y: contain;
    padding: 15px 5px;
}
.user-chat {
    cursor: pointer;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    border-radius: 12px;
    padding: 0px 8px;
    height: 40px;
    font-size: 12px;
}
.chat-mini-height {
    height: 337px !important;
    background: #f5fafc !important;
}
.vac-card-window {
  height: auto !important;
}
.btn-chat-cust {
    padding: 5px 20px;
    border-radius: 5px;
    vertical-align: middle;
    position: fixed;
    right: 140px;
    bottom: -5px;
}
.cont-tmplt-chat {
  overflow: auto;
  padding-bottom: 3px;
}
.tmplt-chat {
    display: flex;
    width: max-content;
}
.room-active {
  background: #edf3ff;
  font-weight: bold;
}
.chat-message {
    padding: 0.2rem 0.5rem !important;
    margin: 0 0.33rem 1.3rem 0.3rem !important;
    border-radius: 5px !important;
}
.chat-time-cust {
  font-size: 9px;
  display: block;
}
.chat-content {
  padding: 1.4rem 0.6rem !important;
}
.cont-tmplt-chat::-webkit-scrollbar-track
{
  box-shadow: inset 0 0 6px rgba(201, 201, 201, 0.3);
  -webkit-box-shadow: inset 0 0 6px rgba(201, 201, 201, 0.3);
  border-radius: 5px;
  background-color: #F5F5F5;
}

.cont-tmplt-chat::-webkit-scrollbar
{
  width: 5px;
  background-color: #F5F5F5;
}

.cont-tmplt-chat::-webkit-scrollbar-thumb
{
  border-radius: 5px;
  box-shadow: inset 0 0 6px rgba(189, 189, 189, 0.3);
  -webkit-box-shadow: inset 0 0 6px rgba(189, 189, 189, 0.3);
  background-color: rgb(131, 131, 131);
}
</style>
