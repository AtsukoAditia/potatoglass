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
                <a class="nav-link active" href="#">Penjualan</a>
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
                <router-link to="/setting/template-chat" class="nav-link iq-waves-effect pr-4">
                  Pesan
                </router-link>
              </li>
            </ul>
            <b-row>
              <b-col md="4">
                <iq-card>
                  <template v-slot:body>
                    <b-form-group class="mb-3" label-cols-sm="12" label="Minimum DP adalah 10%">
                      <b-input-group size="lg" append="%">
                        <money v-model="dpnya" v-bind="money" class="form-control tarvol1"></money>
                      </b-input-group>
                    </b-form-group>
                    <b-alert :show="true" variant=" " class="text-white bg-primary p-2">
                      <div class="iq-alert-text">Default setting DP adalah <b>10%</b></div>
                    </b-alert>
                    <b-button variant="success" class="float-right" @click="setDPGlobals">Simpan</b-button>
                  </template>
                </iq-card>
              </b-col>
            </b-row>
          </template>
        </iq-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import {
  core
} from '../../../config/pluginInit'
import { Money } from 'v-money'
import API from '@/services/vendor/material'
import { mapGetters } from 'vuex'

export default {
  name: 'SettingPenjualan',
  components: {
    Money
  },
  mounted () {
    core.index()
    this.getDPGlobals()
  },
  computed: {
    ...mapGetters({
      userData: 'authModule/getUserData'
    })
  },
  data () {
    return {
      money: {
        thousands: '.',
        precision: 0,
        masked: false
      },
      dpnya: ''
    }
  },
  methods: {
    getDPGlobals () {
      core.custLoader(true)
      const ls = this.userData
      API.material
        .getDPGlobal(ls.user.id).then(response => {
          const dt = response.data
          if (response.status === 200) {
            if (dt.data.dp != null) {
              this.dpnya = dt.data.dp
            } else {
              this.dpnya = 10
            }
          }
        }).finally(() => {
          core.custLoader(false)
        }).catch(() => {
          core.showSnackbar('error', 'Maaf, terjadi kesalahan.')
        })
    },
    setDPGlobals () {
      core.custLoader(true)
      const ls = this.userData
      const fd = new FormData()
      fd.append('vendor_id', ls.user.id)
      fd.append('dp', this.dpnya)
      API.material
        .setDPGlobal(fd).then(response => {
          if (response.status === 200) {
            core.showSnackbar('success', 'Ubah dp berhasil.')
          }
        }).finally(() => {
          core.custLoader(false)
        }).catch(() => {
          core.showSnackbar('error', 'Maaf, terjadi kesalahan.')
        })
    }
  }
}

</script>

<style lang="less">
  .tarvol1 {
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
    border: 1px solid #e9edf4;
  }

</style>
