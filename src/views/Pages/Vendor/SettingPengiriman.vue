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
                <a class="nav-link active" href="#">Pengiriman</a>
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
              <b-col md="12">
                <iq-card>
                  <template v-slot:headerTitle>
                    <h4 class="card-title">Asal Pengiriman</h4>
                  </template>
                  <template v-slot:body>
                      <b-row>
                        <b-col md="3">
                          <b-form-group
                            id="input-group-1"
                            label="Alamat Lengkap"
                            label-for="input-1"
                            description="Pengubahan alamat pengirim akan mempengaruhi biaya kirim"
                          >
                            <b-form-input
                              id="input-1"
                              type="text"
                              placeholder="-"
                              required
                            ></b-form-input>
                          </b-form-group>
                        </b-col>
                        <b-col md="2">
                          <b-form-group
                            id="input-group-2"
                            label="Kode Pos"
                            label-for="input-2"
                          >
                            <b-form-input
                              id="input-2"
                              type="text"
                              placeholder="-"
                              required
                            ></b-form-input>
                          </b-form-group>
                        </b-col>
                      </b-row>
                  </template>
                </iq-card>
              </b-col>
              <b-col md="12">
                <iq-card>
                  <template v-slot:headerTitle>
                    <h4 class="card-title">Promo Gratis Ongkir <b-form-checkbox class="d-inline ml-2" id="checkPromo" v-model="checkOngkir" switch></b-form-checkbox></h4>
                  </template>
                  <template v-slot:body v-if="checkOngkir == false">
                      <b-row>
                        <b-col md="2">
                         <b-form-group
                            id="input-group-1"
                            label="Jarak Maksimal Promo"
                            label-for="inputMaks"
                          >
                            <b-input-group size="md" append="km">
                              <money v-bind="money" class="form-control tarvol1" id="inputMaks"></money>
                            </b-input-group>
                          </b-form-group>
                        </b-col>
                        <b-col md="3">
                          <b-form-group
                            id="input-group-2"
                            label="Atur Harga Jika Jarak Lebih Dari Maksimal"
                          >
                          <span>per-KM</span><b-form-checkbox class="d-inline ml-2" id="checkSel" v-model="checkType" switch></b-form-checkbox><span>per-KG</span>
                            <b-input-group v-if="checkType == true" size="md" append="/km" prepend="Rp">
                              <money v-bind="money" class="form-control tarvol2" id="inputPriceKM"></money>
                            </b-input-group>
                            <b-input-group v-else size="md" append="/kg" prepend="Rp">
                              <money v-bind="money" class="form-control tarvol2" id="inputPriceKG"></money>
                            </b-input-group>
                          </b-form-group>
                        </b-col>
                      </b-row>
                  </template>
                </iq-card>
              </b-col>
            </b-row>
          </template>
        </iq-card>
        <b-button variant="success" class="float-right">Simpan</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import {
  core
} from '../../../config/pluginInit'
// import API from '@/services/vendor/material'
import { Money } from 'v-money'

export default {
  name: 'SettingPengiriman',
  components: {
    Money
  },
  mounted () {
    core.index()
  },
  computed: {},
  data () {
    return {
      dpnya: '',
      checkOngkir: false,
      checkType: false,
      money: {
        thousands: '.',
        precision: 0,
        masked: false
      }
    }
  },
  methods: {
  }
}

</script>

<style lang="less">
  .tarvol1 {
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
    border: 1px solid #e9edf4;
  }
  .tarvol2 {
    border-radius: 0 !important;
    border: 1px solid #e9edf4;
  }

</style>
