<template>
  <b-container fluid>
    <b-row>
      <b-col lg="12" class="profile-right">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">Informasi Toko</h4>
          </template>
          <template v-slot:body>
            <div class="about-info m-0 p-0">
              <b-row>
                <b-col cols="3">Email: </b-col>
                <b-col cols="9">
                  <b-link v-bind:href="user.email"> {{ user.email }} </b-link>
                </b-col>
                <b-col cols="3">Phone:</b-col>
                <b-col cols="9">
                  <b-link v-bind:href="user.phone"> {{ user.contact_person }} - {{ user.phone }}</b-link>
                </b-col>
                <b-col cols="3">Location:</b-col>
                <b-col cols="9">{{ user.alamat }}, {{ user.kota }}, {{ user.provinsi }} - {{ user.kode_pos }}</b-col>
                <b-col cols="3">Posisi:</b-col>
                <b-col cols="9">Latitude: {{ user.address_lat }}, Longitude: {{ user.address_long }}</b-col>
              </b-row>
            </div>
          </template>
        </iq-card>
      </b-col>
      <b-col lg="12" class="profile-right">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">Status</h4>
          </template>
          <template v-slot:body>
            <div class="about-info m-0 p-0">
              <b-row>
                  <b-col md=12>
                      wait
                  </b-col>
              </b-row>
            </div>
          </template>
        </iq-card>
      </b-col>
      <b-col lg="12" class="profile-right">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">Gambar Toko</h4>
          </template>
          <template v-slot:body>
            <div class="about-info m-0 p-0">
              <b-row>
                  <b-col md=12>
                      wait
                  </b-col>
              </b-row>
            </div>
          </template>
        </iq-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import {
  core
} from '../../../../config/pluginInit'
import API from '@/services/vendor/profile'
import constant from '@/config/constant'
import {
  mapGetters
} from 'vuex'

export default {
  name: 'AccountInfo',
  mounted () {
    core.index()
    this.getDetailProfile()
  },
  computed: {
    ...mapGetters({
      dataUser: 'Setting/dataUserState'
    })
  },
  data () {
    return {
      banners: require('../../../../assets/images/page-img/profile-bg.jpg'),
      logos: require('../../../../assets/images/user/user-11.png'),
      user: {
        vendor_name: '',
        website: '',
        about: 'Lorem ipsum dolor sit amet, contur adipiscing elit.',
        alamat: '',
        careated_date: '07 Jan 2020',
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
      assetUrl: constant.urlAssets,
      galary: [{
        image: require('../../../../assets/images/page-img/g1.jpg'),
        href: 'javascript:void(0);'
      },
      {
        image: require('../../../../assets/images/page-img/g2.jpg'),
        href: 'javascript:void(0);'
      },
      {
        image: require('../../../../assets/images/page-img/g3.jpg'),
        href: 'javascript:void(0);'
      },
      {
        image: require('../../../../assets/images/page-img/g4.jpg'),
        href: 'javascript:void(0);'
      },
      {
        image: require('../../../../assets/images/page-img/g5.jpg'),
        href: 'javascript:void(0);'
      },
      {
        image: require('../../../../assets/images/page-img/g6.jpg'),
        href: 'javascript:void(0);'
      },
      {
        image: require('../../../../assets/images/page-img/g7.jpg'),
        href: 'javascript:void(0);'
      },
      {
        image: require('../../../../assets/images/page-img/g8.jpg'),
        href: 'javascript:void(0);'
      },
      {
        image: require('../../../../assets/images/page-img/g9.jpg'),
        href: 'javascript:void(0);'
      }
      ],
      timelineItems: [{
        color: 'primary',
        title: 'Client Login',
        right: '24 November 2019',
        description: 'Bonbon macaroon jelly beans gummi bears jelly lollipop apple',
        child: {
          type: 'img',
          items: []
        }
      },
      {
        color: 'success',
        title: 'Scheduled Maintenance',
        right: '23 November 2019',
        description: 'Bonbon macaroon jelly beans gummi bears jelly lollipop apple',
        child: {
          type: 'img',
          items: []
        }
      },
      {
        color: 'danger',
        title: 'Dev Meetup',
        right: '20 November 2019',
        description: 'Bonbon macaroon jelly <b-link href="">beans gummi</b-link> bears jelly lollipop apple',
        child: {
          type: 'img',
          items: [
            require('../../../../assets/images/user/user-05.jpg'),
            require('../../../../assets/images/user/user-06.jpg'),
            require('../../../../assets/images/user/user-07.jpg'),
            require('../../../../assets/images/user/user-08.jpg'),
            require('../../../../assets/images/user/user-09.jpg'),
            require('../../../../assets/images/user/user10.jpg')
          ]
        }
      },
      {
        color: 'primary',
        title: 'Client Call',
        right: '19 November 2019',
        description: 'Bonbon macaroon jelly beans gummi bears jelly lollipop apple',
        child: {
          type: 'img',
          items: []
        }
      },
      {
        color: 'warning',
        title: 'Mega Event',
        right: '15 November 2019',
        description: 'Bonbon macaroon jelly beans gummi bears jelly lollipop apple',
        child: {
          type: 'img',
          items: []
        }
      }
      ],
      friends: [{
        name: 'Paul Molive',
        role: 'Web Designer',
        image: require('../../../../assets/images/user/user-01.jpg')
      },
      {
        name: 'Paul Molive',
        role: 'trainee',
        image: require('../../../../assets/images/user/user-01.jpg')
      },
      {
        name: 'Anna Mull',
        role: 'Web Developer',
        image: require('../../../../assets/images/user/user-02.jpg')
      },
      {
        name: 'Paige Turner',
        role: 'trainee',
        image: require('../../../../assets/images/user/user-03.jpg')
      },
      {
        name: 'Barb Ackue',
        role: 'Web Designer',
        image: require('../../../../assets/images/user/user-04.jpg')
      },
      {
        name: 'Greta Life',
        role: 'Tester',
        image: require('../../../../assets/images/user/user-05.jpg')
      },
      {
        name: 'Ira Membrit',
        role: 'Android Developer',
        image: require('../../../../assets/images/user/user-06.jpg')
      },
      {
        name: 'Pete Sariya',
        role: 'Web Designer',
        image: require('../../../../assets/images/user/user-07.jpg')
      }
      ],
      userBio: [{
        title: 'Joined',
        description: 'November 15, 2012'
      },
      {
        title: 'Lives',
        description: 'United States of America'
      },
      {
        title: 'Email',
        description: '<a href="mailto:nikjone@gmail.com"> nikjone@gmail.com</a>'
      },
      {
        title: 'Url',
        description: '<a href="https://getbootstrap.com/docs/4.0/getting-started/introduction/" target="_blank"> www.bootstrap.com </a>'
      },
      {
        title: 'Contact',
        description: '<a href="tel:001 4544 565 456">(001) 4544 565 456</a>'
      }
      ],
      story: [{
        title: 'Web Design',
        time: '1 hour ago',
        image: require('../../../../assets/images/page-img/s1.jpg'),
        class: 'mb-4',
        isActive: 'active'
      },
      {
        title: 'App Design',
        time: '4 hour ago',
        image: require('../../../../assets/images/page-img/s2.jpg'),
        class: 'mb-4',
        isActive: ''
      },
      {
        title: 'Abstract Design',
        time: '9 hour ago',
        image: require('../../../../assets/images/page-img/s3.jpg'),
        class: '',
        isActive: ''
      }
      ],
      suggestions: [{
        name: 'Paul Molive',
        mutual_friend: '4 mutual friends',
        image: require('../../../../assets/images/user/user-01.jpg')
      },
      {
        name: 'Paul Molive',
        mutual_friend: '4 mutual friends',
        image: require('../../../../assets/images/user/user-01.jpg')
      },
      {
        name: 'Anna Mull',
        mutual_friend: '6 mutual friends',
        image: require('../../../../assets/images/user/user-02.jpg')
      },
      {
        name: 'Paige Turner',
        mutual_friend: '8 mutual friends',
        image: require('../../../../assets/images/user/user-03.jpg')
      },
      {
        name: 'Barb Ackue',
        mutual_friend: '1 mutual friends',
        image: require('../../../../assets/images/user/user-04.jpg')
      },
      {
        name: 'Greta Life',
        mutual_friend: '3 mutual friends',
        image: require('../../../../assets/images/user/user-05.jpg')
      },
      {
        name: 'Ira Membrit',
        mutual_friend: '12 mutual friends',
        image: require('../../../../assets/images/user/user-06.jpg')
      },
      {
        name: 'Pete Sariya',
        mutual_friend: '2 mutual friends',
        image: require('../../../../assets/images/user/user-07.jpg')
      }
      ],
      news: [{
        description: 'there is a meetup in your city on friday at 19:00.<a href="#">see details</a>'
      },
      {
        description: '20% off coupon on selected items at pharmaprix'
      }
      ],
      twitterFeed: [{
        image: require('../../../../assets/images/page-img/42.jpg'),
        name: 'UI/Ux Designer',
        description: 'Creativity Design'
      },
      {
        image: require('../../../../assets/images/page-img/43.jpg'),
        name: 'Marketing',
        description: 'Accounting'
      },
      {
        image: require('../../../../assets/images/page-img/44.jpg'),
        name: 'Web Developer',
        description: 'uniq Concept'
      },
      {
        image: require('../../../../assets/images/page-img/45.jpg'),
        name: 'Latest News',
        description: 'Line information'
      }
      ],
      recentPages: [{
        image: require('../../../../assets/images/page-img/46.jpg'),
        name: 'Food town'
      },
      {
        image: require('../../../../assets/images/page-img/47.jpg'),
        name: 'Touro Univercity'
      },
      {
        image: require('../../../../assets/images/page-img/48.jpg'),
        name: 'Moviehouse & Eatery'
      },
      {
        image: require('../../../../assets/images/page-img/49.jpg'),
        name: 'Coffee + Crisp'
      }
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
          if (response.status === 200) {
            this.user = response.data.result
          }
        })
    }
  }
}

</script>
