<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">
        <iq-card body-class=" profile-page p-0">
          <template v-slot:body>
            <div class="profile-header">
              <div class="cover-container">
                <b-img v-bind:src="banners" alt="profile-bg" rounded fluid class="w-100" style="height: 200px;object-fit: cover;" />
                <ul class="header-nav d-flex flex-wrap justify-end p-0 m-0">
                  <li>
                    <router-link :to="`/setting/informasi`">
                      <i class="ri-pencil-line"></i>
                    </router-link>
                    </li>
                  <!-- <li><b-link href="javascript:void(0);"><i class="ri-settings-4-line"></i></b-link></li> -->
                </ul>
              </div>
              <div class="profile-info pt-4 pr-4 pl-4">
                <b-row>
                  <b-col md="6" sm="12">
                    <div class="user-detail pl-5">
                      <div class="d-flex flex-wrap align-items-center">
                        <div class="profile-img pr-4">
                          <b-img v-bind:src="user.logo" alt="profile-img" fluid class="avatar-130 bordered" />
                        </div>
                        <div class="profile-detail d-flex align-items-center">
                          <i v-if="dataUser.verified == true" v-b-tooltip.top="'Akun ini sudah diverifikasi.'" class="text-primary fas fa-check-circle ml-1"></i>
                          <i v-else v-b-tooltip.top="'Akun ini belum di verifikasi.'" class="fas fa-times-circle ml-1"></i>
                          <h3>{{user.vendor_name}}</h3>
                          <b-link :href="`http://${user.website}`" target="_blank"> - {{user.website}}</b-link>
                        </div>
                      </div>
                    </div>
                  </b-col>
                  <b-col md="6" sm="12">
                    <b-row>
                      <b-col md="6">
                        <table class="table table-borderless">
                          <thead>
                            <tr class="tHeadnya">
                              <td>Produk Terjual</td>
                              <td>Rating Toko</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr class="tBodynya">
                              <td><span class="txtTop">1.2k</span></td>
                              <td class="align-middle">
                                <div>
                                  <span class="fa fa-star checked"></span>
                                  <span class="fa fa-star checked"></span>
                                  <span class="fa fa-star checked"></span>
                                  <span class="fa fa-star"></span>
                                  <span class="fa fa-star"></span>
                                  <small>(17 Ulasan)</small>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <!-- <div style="line-height:1;">
                          Produk Terjual
                          <span class="txtTop">1.2k</span>
                        </div> -->
                      </b-col>
                      <b-col md="6">
                        <tab-nav :pills="true" id="pills-tab" class="profile-feed-items d-flex justify-content-end">
                          <tab-nav-items :active="true" id="pills-feed-tab" href="#profile-feed" ariaControls="pills-home" role="tab" :ariaSelected="true" title="Grid" />
                          <tab-nav-items :active="false" id="pills-friend-tab" href="#profile-friends" ariaControls="pills-contact" role="tab" :ariaSelected="false" title="List" />
                        </tab-nav>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </div>
            </div>
          </template>
        </iq-card>
      </b-col>
      <b-col sm="12">
        <b-row>
          <b-col lg="2" class="profile-left">
            <iq-card>
              <template v-slot:headerTitle>
                <h4 class="card-title">Etalase</h4>
              </template>
              <template v-slot:body class="pt-0">
                <b-list-group flush v-for="(list,index) in news" :key="index">
                  <b-list-group-item class="p-1 border-bottom-0" button>{{ list.name }}</b-list-group-item>
                </b-list-group>
              </template>
            </iq-card>
          </b-col>
          <b-col lg="7" class="profile-center">
            <h4 class="card-title mb-4">Semua Produk
              <router-link :to="`/material/add`">
                <b-button variant="info" class="float-right">+ Tambah Material</b-button>
              </router-link>
            </h4>
            <tab-content id="pills-tabContent-2">
              <tab-content-item :active="true" id="profile-feed" aria-labelled-by="pills-feed-tab">
                <b-row>
                  <b-col md="3" sm="6" class="pl-2 pr-2 mb-3" v-for="(item, index) in listMaterial" :key="index">
                    <router-link :to="`/material/${item.m_id}`">
                      <b-card class="forShadow" no-body style="max-width: 20rem;">
                        <b-card-header class="p-0">
                          <b-img fluid :src="assetUrl + 'material/' + $route.params.id + '/' + cekImg(item.image)" class="imgTBL" :alt="item.alias_name" @error="imgError"></b-img>
                        </b-card-header>
                          <b-card-body class="p-2 pb-0" style="height:100px;max-height:100px;">
                            <b-card-text>
                              <div class="txtTitleP">
                                {{ cekTitle(item.alias_name) }}
                              </div>
                              <div class="txtPriceP">
                                Rp {{ separatorNum(item.harga_material) }}
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
              </tab-content-item>
              <tab-content-item :active="false" id="profile-friends" aria-labelled-by="pills-friend-tab">
                <b-row>
                  <b-col lg="12" v-for="(item, index) in listMaterial" :key="index">
                    <router-link :to="`/material/${item.m_id}`">
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
          <b-col lg="3" class="profile-right">
            <!-- <iq-card class="ulasanCard">
              <template v-slot:headerTitle>
                <h4 class="card-title">Ulasan</h4>
              </template>
              <template v-slot:body>
                <ul class="media-story m-0 p-0">
                  <li v-for="(item,index) in story" :key="index" class="d-flex align-items-center" :class="item.isActive +' '+ item.class">
                    <b-img :src="item.image" alt="story-img" class="imgSmall" rounded="circle" fluid />
                    <div class="stories-data ml-3">
                      <h5>{{ item.title }}</h5>
                      <div>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>
                      </div>
                      <p class="mb-0">{{ item.time }}</p>
                    </div>
                  </li>
                </ul>
                <a href="#" class="showUlasan float-right">Lihat Semua</a>
              </template>
            </iq-card> -->
            <iq-card>
              <template v-slot:headerTitle>
                <h4 class="card-title">About</h4>
              </template>
              <template v-slot:body>
                <div class="about-info m-0 p-0">
                  <b-row>
                    <b-col cols="3">Email: </b-col>
                    <b-col cols="9"><b-link v-bind:href="user.email"> {{ user.email }} </b-link></b-col>
                    <b-col cols="3">Kontak:</b-col>
                    <b-col cols="9"><b-link v-bind:href="user.phone"> {{ user.contact_person }} - {{ user.phone }}</b-link></b-col>
                    <b-col cols="3">Lokasi:</b-col>
                    <b-col cols="9">{{ user.alamat }}, {{ user.kota }}, {{ user.provinsi }} - {{ user.kode_pos }}</b-col>
                    <!-- <b-col cols="3">Posisi:</b-col>
                    <b-col cols="9">Latitude: {{ user.address_lat }}, Longitude: {{ user.address_long }}</b-col> -->
                  </b-row>
                </div>
              </template>
            </iq-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { core, brokenImage } from '../../config/pluginInit'
import API from '@/services/vendor/profile'
import APImaterial from '@/services/vendor/material'
import constant from '@/config/constant'
import { mapGetters } from 'vuex'
export default {
  name: 'Profile',
  mounted () {
    core.index()
    this.getDetailProfile()
    this.getEtalases()
  },
  computed: {
    ...mapGetters({
      dataUser: 'authModule/getUserData'
    })
  },
  data () {
    return {
      banners: require('../../assets/images/page-img/profile-bg.jpg'),
      logos: require('../../assets/images/logo-b.png'),
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
      assetUrl: constant.urlAssetsPHP,
      story: [
        { title: 'Batako Merah Surper 10stak', time: '1 hour ago', image: `${constant.urlAPIPHP}/media/material/88/262856537091866625@acian.jpeg`, class: 'mb-2', isActive: '' },
        { title: 'tripleks 6mm', time: '4 hour ago', image: `${constant.urlAPIPHP}/media/material/88/262856537091866625@acian.jpeg`, class: 'mb-2', isActive: '' },
        { title: 'Asbes PVC Semen Kualitas Terbaik', time: '9 hour ago', image: `${constant.urlAPIPHP}/media/material/88/262856537091866625@acian.jpeg`, class: '', isActive: '' }
      ],
      news: [
      ]
    }
  },
  methods: {
    getDetailProfile () {
      let idUser = ''
      if (this.$route.params.id === '' || this.$route.params.id === undefined || this.$route.params.id === null) {
        idUser = this.dataUser.user.id
      } else {
        idUser = this.$route.params.id
      }

      API.profile
        .profileDetail(idUser).then(response => {
          const dt = response.data
          if (response.status === 200) {
            this.user = dt.result
            if (dt.result.logo === '') {
              this.user.logo = this.logos
            } else {
              this.user.logo = `${constant.urlAssetsPHP}vendor/` + dt.result.user_id + `/logo/` + dt.result.logo
            }
          }
        })
      API
        .getMaterialProfile(0, 10, idUser).then(response => {
          const dt = response.data
          if (response.status === 200) {
            this.listMaterial = dt.data
            // console.log(this.listMaterial)
          }
        })
    },
    getEtalases () {
      APImaterial.material
        .getEtalase().then(response => {
          const dt = response.data
          if (response.status === 200) {
            this.news = dt.data
          }
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

<style scoped>
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
    padding-top: 0 !important;
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
</style>>
