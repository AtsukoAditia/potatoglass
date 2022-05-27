<template>
<div>
  <b-container fluid>
    <b-row>
      <b-col sm="2">
          <iq-card>
              <template v-slot:headerTitle>
                <h4 class="card-title">Filter</h4>
              </template>
              <template v-slot:body>
              </template>
            </iq-card>
      </b-col>
      <b-col sm="10">
          <iq-card>
              <template v-slot:headerTitle>
                  <b-row>
                      <b-col md="7">
                        <div class="iq-search-bar">
                          <div class="searchbox">
                            <input type="text" class="text search-input" @change="searchAct" v-model="valSearch" placeholder="Cari material disini...">
                            <a class="search-link" href="#"><i class="ri-search-line"></i></a>
                          </div>
                        </div>
                      </b-col>
                      <b-col md="5">
                          <div class="form-inline w-100">
                                <label class="my-1 mr-2" for="inlineFormCustomSelectPref">Urutkan :</label>
                                <select class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref">
                                    <option selected>Terbaik</option>
                                    <option value="1">Harga Terendah</option>
                                    <option value="2">Harga Tertinggi</option>
                                    <option value="3">Jarak Terdekat</option>
                                </select>

                                <tab-nav :pills="true" id="pills-tab" class="profile-feed-items d-flex justify-content-end">
                                    <tab-nav-items :active="true" id="pills-feed-tab" href="#profile-feed" ariaControls="pills-home" role="tab" :ariaSelected="true" title="Grid" />
                                    <tab-nav-items :active="false" id="pills-friend-tab" href="#profile-friends" ariaControls="pills-contact" role="tab" :ariaSelected="false" title="List" />
                                </tab-nav>
                            </div>
                      </b-col>
                  </b-row>
              </template>
              <template v-slot:body>
              </template>
            </iq-card>
      </b-col>
      <b-col sm="12">
        <b-row>
          <b-col lg="2" class="profile-left">
            <iq-card>
              <template v-slot:body>
                    <h5 class="filterHead">Kategori</h5>
                    <hr class="lineFilter">
                    <h5 class="filterHead mt-5">Batas Harga</h5>
                    <hr class="lineFilter">
                    <div>
                        <b-form-group class="mb-3">
                          <b-input-group size="md" prepend="Rp" class="mb-2">
                            <b-form-input type="number" @change="getMaterialResult" v-model="filter.min_price" class="form-control disvol1"></b-form-input>
                          </b-input-group>
                          <b-input-group size="md" prepend="Rp">
                            <b-form-input type="number" @change="getMaterialResult" v-model="filter.max_price" class="form-control disvol1"></b-form-input>
                          </b-input-group>
                        </b-form-group>
                    </div>
                    <h5 class="filterHead mt-5">Belanja Gabungan</h5>
                    <hr class="lineFilter">
                    <b-form-select v-model="filJoin" :options="selJoin" @change="getMaterialResult"></b-form-select>

                    <h5 class="filterHead mt-5">Merk</h5>
                    <hr class="lineFilter">
                    <input type="text" class="form-control" style="height:50px;" placeholder="Cari ">
                      <div style="height: 150px;overflow: auto;">
                        <b-form-checkbox-group
                          id="checkBrand"
                          v-model="filBrand"
                          name="checkBrand"
                          @change="getMaterialResult"
                        >
                          <b-form-checkbox class="d-block" v-for="(item, index) in selBrand" :key="index" :value='item.id'>{{ item.nama }} <b-badge variant="light">{{ item.countmaterial }}</b-badge></b-form-checkbox>
                        </b-form-checkbox-group>
                      </div>

                    <h5 class="filterHead mt-5">Rating</h5>
                    <hr class="lineFilter">

                    <h5 class="filterHead mt-5">Lainnya</h5>
                    <hr class="lineFilter">
                        <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                        <label class="form-check-label" for="defaultCheck1">
                            Preorder
                        </label>
                        </div>
                        <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="defaultCheck2">
                        <label class="form-check-label" for="defaultCheck2">
                            Ready Stock
                        </label>
                        </div>
              </template>
            </iq-card>
          </b-col>
          <b-col lg="10" class="profile-center">
              <small>-</small>
            <tab-content id="pills-tabContent-2">
              <tab-content-item :active="true" id="profile-feed" aria-labelled-by="pills-feed-tab">
                <b-row>
                  <b-col md="2" sm="6" class="pl-2 pr-2 mb-3" v-for="(item, index) in listMaterial" :key="index" :current-page="currentPage">
                    <router-link :to="`/materials/${item.m_id}`">
                      <b-card class="forShadow" no-body style="max-width: 20rem;">
                        <b-card-header class="p-0">
                          <b-img fluid :src="assetUrl + 'material/' + item.id_vendor + '/' + cekImg(item.image)" class="imgTBL" :alt="item.alias_name" @error="imgError"></b-img>
                        </b-card-header>
                          <b-card-body class="p-2 pb-0" style="height:115px;max-height:115px;">
                            <b-card-text>
                              <div class="txtTitleP">
                                {{ cekTitle(item.alias_name) }}
                              </div>
                              <div class="txtPriceP">
                                Rp {{ separatorNum(item.harga_material) }}
                              </div>
                              <div class="txtAddressP">
                                <i class="fas fa-store"></i> Vendor Kita | Jakarta Selatan <small>(5 km)</small>
                              </div>
                              <div class="footP">
                                <span class="fa fa-star checked"></span><span>4.7</span> | <span>Terjual <b>2</b></span>
                              </div>
                            </b-card-text>
                          </b-card-body>
                      </b-card>
                    </router-link>
                  </b-col>
                </b-row>
                <b-row class="justify-content-md-center">
                  <b-col md="6">
                      <b-pagination
                      v-model="currentPage"
                      :total-rows="totalRows"
                      :per-page="perPage"
                      @change="getMaterialResult"
                    ></b-pagination>
                  </b-col>
                </b-row>
              </tab-content-item>
              <tab-content-item :active="false" id="profile-friends" aria-labelled-by="pills-friend-tab">
                <b-row>
                  <b-col lg="12" v-for="(item, index) in listMaterial" :key="index">
                    <router-link :to="`/materials/${item.m_id}`">
                      <b-card no-body class="mb-3 cardListP">
                        <b-row no-gutters>
                          <b-col md="2">
                            <b-card-img fluid :src="assetUrl + 'material/' + $route.params.id + '/' + cekImg(item.image)" class="imgTBList" :alt="item.alias_name" @error="imgError"></b-card-img>
                          </b-col>
                          <b-col md="10">
                            <b-card-body :title="item.alias_name">
                              <b-card-text>
                                <div class="txtDescP">
                                  {{ cekDesc(item.description) }}
                                </div>
                              </b-card-text>
                              <b-card-text>
                              <div class="footP">
                                <span class="fa fa-star checked"></span><span>4.7</span> | <span>Terjual <b>2</b></span>
                              </div>
                              </b-card-text>
                            </b-card-body>
                          </b-col>
                        </b-row>
                      </b-card>
                    </router-link>
                  </b-col>
                </b-row>
              </tab-content-item>
            </tab-content>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</div>
</template>
<script>
import { core, brokenImage } from '../../config/pluginInit'
import axios from 'axios'
import constant from '@/config/constant'
import { mapGetters } from 'vuex'
// import {
//   Money
// } from 'v-money'

export default {
  name: 'MarketPlace',
  prop: {
  },
  mounted () {
    core.index()
    this.getMaterialResult()
    this.getBrand()
  },
  computed: {
    ...mapGetters({
      dataUser: 'Setting/dataUserState'
    })
  },
  data () {
    return {
      banners: require('../../assets/images/page-img/profile-bg.jpg'),
      logos: require('../../assets/images/user/user-11.png'),
      user: {
        name: 'Nik Jone',
        role: ' - Web designer',
        about: 'Lorem ipsum dolor sit amet, contur adipiscing elit.',
        location: 'USA',
        careated_date: '07 Jan 2020',
        vendor_name: '',
        website: '',
        alamat: '',
        address_lat: '',
        address_long: '',
        banner: '',
        contact_person: '',
        email: '',
        kode_pos: '',
        kota: '',
        logo: '',
        npwp_vendor: '',
        phone: '',
        provinsi: ''
      },
      listMaterial: [],
      assetUrl: constant.urlAssets,
      // money: {
      //   thousands: '.',
      //   precision: 0,
      //   masked: false
      // },
      filter: {
        min_price: '',
        max_price: ''
      },
      totalRows: '',
      currentPage: 1,
      perPage: 18,
      valSearch: '',
      filBrand: [],
      selBrand: [],
      filJoin: [],
      selJoin: [
        { value: null, text: 'Tampilkan semua...' },
        { value: 1, text: 'Bisa Belanja Gabungan' },
        { value: 0, text: 'Tidak Bisa' }
      ]
    }
  },
  components: {
    // Money
  },
  watch: {
    '$route.query.q': function (q) {
      this.getMaterialResult()
    }
  },
  methods: {
    searchAct () {
      this.$router.push({ path: 'marketplace', query: { q: this.valSearch, source: 'out' } })
      this.getMaterialResult()
    },
    getMaterialResult () {
      core.custLoader(true)
      const lat = 0
      const lng = 0
      var filter = ''
      filter = `&latitude=${lat}&longitude=${lng}`
      if (this.$route.query.q !== undefined && this.$route.query.q !== '') {
        this.currentPage = 0
        filter += `&filter_nama=${this.$route.query.q}`
      }
      if (this.filBrand.length > 0) {
        this.currentPage = 0
        filter += `&filter_merk=${this.filBrand.join(',')}`
      }
      if (this.filJoin.length > 0) {
        this.currentPage = 0
        filter += `&filter_gabungan=${this.filJoin}`
      }
      if (this.filter.min_price !== '') {
        this.currentPage = 0
        filter += `&filter_harga_min=${this.filter.min_price}`
      }
      if (this.filter.max_price !== '') {
        this.currentPage = 0
        filter += `&filter_harga_max=${this.filter.max_price}`
      }

      axios.get(`${constant.urlAPIPHP}/Marketplace/list_marketplace?skip=${this.currentPage}&limit=${this.perPage}${filter}`, {
        headers: {}
      }).then(res => {
        const dt = res.data
        if (res.status) {
          this.totalRows = dt._meta.total_filtered
          this.listMaterial = dt.row
        }
      }).finally(() => {
        core.custLoader(false)
      }).catch(() => {
        core.showSnackbar('error', 'Maaf, terjadi kesalahan pada sistem.')
      })
    },

    getBrand () {
      core.custLoader(true)
      axios.get(`${constant.urlAPIPHP}/Marketplace/get_merk`, {
        headers: {}
      }).then(res => {
        const dt = res.data
        if (res.status) {
          this.selBrand = dt.data
        }
      }).finally(() => {
        core.custLoader(false)
      }).catch(() => {
        core.showSnackbar('error', 'Maaf, terjadi kesalahan pada sistem.')
      })
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
    },
    cekTitle (text) {
      var txt = text
      var res = ''
      if (txt.length >= 45) {
        res = txt.substring(0, 45) + '...'
      } else {
        res = txt
      }
      return res
    },
    cekDesc (text) {
      var txt = text
      var res = ''
      if (txt.length >= 220) {
        res = txt.substring(0, 220) + '...'
      } else {
        res = txt
      }

      var doc = new DOMParser().parseFromString(res, 'text/html')
      return doc.documentElement.textContent
    },
    separatorNum (val) {
      if (typeof val === 'undefined' || val === null || val === 'null') {
        return null
      }
      val = parseFloat(val)
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    htmlDecode (input) {
      var doc = new DOMParser().parseFromString(input, 'text/html')
      return doc.documentElement.textContent
    }
  }
}
</script>

<style>
  .txtTop {
    display: block;
    font-size: 20pt;
    font-weight: bold;
    color: #717171;
  }
  .txtTitleP {
    line-height: 1.2;
    color: #717171;
  }
  .txtPriceP {
    color: #717171;
    font-weight: bold;
    font-size: 12pt;
    margin: 5px 0;
  }
  .txtAddressP {
    color: #717171;
    font-size: 8pt;
    margin-top: -5px;
  }
  .txtDescP {
    color: #717171;
  }
  .footP {
    color: #858585;
    font-size: 8pt;
    position: absolute;
    bottom: 5px;
  }
  .imgTBL {
    width: 100%;
    height: 120px;
    object-fit: cover;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .imgTBList {
    width: 100%;
    height: 120px;
    object-fit: cover;
  }
  .showUlasan {
    font-size: 9pt;
  }
  .forShadow {
    box-shadow: 0px 0px 12px 0px rgb(120 146 141 / 6%);
    -webkit-box-shadow: 0px 0px 12px 0px rgb(120 146 141 / 6%);
  }
  .checked {
    color: orange;
  }
  .imgSmall {
    width: 70px;
    object-fit: cover;
  }
  .iq-card-body {
    /* padding-top: 0 !important; */
  }
  .cardListP {
    /* height: 120px;
    max-height: 120px; */
  }
  .tHeadnya td {
    padding: 0;
  }
  .tBodynya td {
    padding: 0;
  }
  .forBreadcrumb {
      display: none !important;
  }
  #parentBread {
      display: none !important;
  }
  .iq-header-title {
      width: 100%;
  }
  .filterHead {
  }
  .lineFilter {
      margin-top: 0px;
  }
  .disvol1 {
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
    border: 1px solid #e9edf4;
  }
  .navbar-light .navbar-nav .nav-link {
    color: #fff;
    font-weight: 500;
  }
</style>>
