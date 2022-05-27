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
                <router-link to="/setting/etalase" class="nav-link iq-waves-effect pr-4">
                    Etalase
                </router-link>
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
                  <a href="#" class="nav-link active">Pesan</a>
              </li>
            </ul>
            <iq-card>
                <template v-slot:headerTitle class="w-100">
                    <h4 class="card-title pt-2">Auto Reply</h4>
                    <span>Ketika diaktifkan, Pembeli akan menerima balasan otomatis setelah mengirimkan pesan pertama setiap harinya.</span>
                </template>
                <template v-slot:body>
                    <b-alert :show="true" variant="secondary">
                        <div class="iq-alert-text">
                            <b-form-checkbox class="d-inline float-right" id="checkVP" v-model="checkDel" switch @change="toggleDel">
                            </b-form-checkbox>
                            <h5 class="text-dark font-weight-bold">Pesan</h5>
                            <div class="text-dark" id="autoRep">
                            </div>
                        </div>
                    </b-alert>
                    <b-button variant="info" size="sm" v-b-modal="'modifyAutoReply'">Ubah Pesan</b-button>
                </template>
            </iq-card>

            <iq-card>
                <template v-slot:headerTitle class="w-100">
                    <h4 class="card-title pt-2">Atur Pesan</h4>
                    <span>Dengan template pesan, kamu dapat membuat dan menggunakan template untuk pesan yang sering kamu kirim.</span>
                </template>
                <template v-slot:body>
                    <b-button variant="info" size="sm" v-b-modal="'addChat'">+ Tambah</b-button>
                <hr>
                    <b-row>
                        <b-col md="12">
                            <div class="table-responsive">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Judul</th>
                                            <th>Pesan</th>
                                            <th>Status</th>
                                            <th>Tindakan</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(dt, k) in dtable" :key="k">
                                            <td>{{ k+1 }}</td>
                                            <td>{{ dt.title }}</td>
                                            <td><blockquote>{{ dt.text }}</blockquote></td>
                                            <td>
                                                <b-badge v-if="dt.status == '1'" variant="success">Aktif</b-badge>
                                                <b-badge v-else variant="dark">Tidak</b-badge>
                                            </td>
                                            <td>
                                                <b-button v-b-tooltip.top="'Hapus template ini'" @click="delTemplate(dt.id)" size="sm" variant="danger" class="mr-1">
                                                <div data-icon="" class="icon"></div>
                                                </b-button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </b-col>
                    </b-row>
                </template>
            </iq-card>
          </template>
        </iq-card>
      </b-col>
    </b-row>
     <b-modal id="addChat" centered hide-header @ok="addChatTemplate">
         <b-row>
            <b-col md="6">
              <b-form-group label-for="judul" label="Judul">
                <b-form-input id="judul" v-model="chat.title" type="text" placeholder="-"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group label-for="status" label="Status">
                <multiselect v-model="chat.status" id="status" track-by="id" label="name" placeholder="Pilih status" :options="selStatus" :searchable="false" :allow-empty="false">
                </multiselect>
              </b-form-group>
            </b-col>
            <b-col md="12">
              <b-form-group label-for="text" label="Isi Pesan">
                <ckeditor editorUrl="https://cdnjs.cloudflare.com/ajax/libs/ckeditor/4.17.1/ckeditor.js" v-model="chat.text" rows="5" cols="70" id="ckfill" name="ckfill" :config="editorConfig"></ckeditor>
              </b-form-group>
            </b-col>
         </b-row>
    </b-modal>
     <b-modal id="modifyAutoReply" centered hide-header @ok="addAutoRep">
         <b-row>
            <b-col md="12">
              <b-form-group label-for="text" label="Isi Pesan">
                <ckeditor editorUrl="https://cdnjs.cloudflare.com/ajax/libs/ckeditor/4.17.1/ckeditor.js" v-model="autoreply" rows="5" cols="70" id="ckfill" name="ckfill" :config="editorConfig"></ckeditor>
              </b-form-group>
            </b-col>
         </b-row>
    </b-modal>
  </b-container>
</template>
<script>
import {
  core
} from '../../../config/pluginInit'
import API from '@/services/vendor/setting'
import CKEditor from 'ckeditor4-vue'

export default {
  name: 'SettingChat',
  components: {
    ckeditor: CKEditor.component
  },
  mounted () {
    core.index()
    this.getChat()
  },
  computed: {
  },
  watch: {
  },
  data () {
    return {
      dtable: [],
      chat: {
        title: '',
        status: '',
        text: ''
      },
      checkDel: true,
      autoreply: '',
      selStatus: [
        { name: 'Aktif', id: 1 },
        { name: 'Tidak Aktif', id: 0 }
      ],
      autoreply_chat: '',
      autoreply_id: 0,
      editorConfig: {
        toolbar: [
          ['Bold', 'Italic', 'Underline', 'StrikeThrough', '-', 'Undo', 'Redo', '-', 'Cut', 'Copy', 'Paste', 'Find', 'Replace']
        ]
      }
    }
  },
  methods: {
    getChat () {
      API.chattemplate
        .get().then(response => {
          var dt = response.data
          if (response.status === 200) {
            this.dtable = dt.data.list
            this.autoreply_chat = dt.data.autoreply.text
            this.autoreply = dt.data.autoreply.text
            this.autoreply_id = dt.data.autoreply.id
            const containerChat = document.getElementById('autoRep')
            containerChat.innerHTML = `<p>${this.autoreply_chat}</p>`
          }
        })
    },
    addChatTemplate () {
      core.custLoader(true)
      const postData = {
        title: this.chat.title,
        status: this.chat.status.id,
        text: this.chat.text
      }
      API.chattemplate
        .add(postData).then(response => {
          if (response.status === 200) {
            core.showSnackbar('success', 'Berhasil menambahkan template pesan...')
          }
        }).finally(() => {
          this.getChat()
          core.custLoader(false)
        })
    },
    addAutoRep () {
      core.custLoader(true)
      var postData
      if (this.autoreply_id !== 0) {
        postData = {
          id: this.autoreply_id,
          text: this.autoreply
        }
      } else {
        postData = {
          text: this.autoreply
        }
      }
      API.chattemplate
        .autorepadd_post(postData).then(response => {
          if (response.status === 200) {
            core.showSnackbar('success', 'Berhasil mengubah template autoreply...')
          }
        }).finally(() => {
          this.getChat()
          core.custLoader(false)
        })
    },
    delTemplate (id) {
      core.custLoader(true)
      API.chattemplate
        .delete(id).then(response => {
          if (response.status === 200) {
            core.showSnackbar('success', 'Berhasil menghapus template...')
          }
        }).finally(() => {
          this.getChat()
          core.custLoader(false)
        })
    },
    toggleDel () {
      if (this.checkDel === true) {
        alert('Development...')
      }
    }
  }
}

</script>

<style lang="less">

</style>
