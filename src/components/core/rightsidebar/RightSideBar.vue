<template>
  <!-- Right Sidebar Panel Start-->
  <div :class="`right-sidebar-mini `+miniClass">
    <div class="right-sidebar-toggle" @click="toggleMini" :class="toggleClass">
      <slot name="icon" v-if="hasIconSlot" />
      <template v-else>
        <slot name="openIcon" class="side-left-icon" v-if="hasOpenIconSlot" />
        <i class="ri-arrow-left-line side-left-icon" v-else></i>
        <slot name="closeIcon" class="side-right-icon" v-if="hasCloseIconSlot" />
        <i class="ri-arrow-right-line side-right-icon" v-else></i>
      </template>
    </div>
    <div class="right-sidebar-panel p-0">
      <slot />
    </div>
    <v-speed-dial v-if="userrole.user.role == 1"
      v-model="fab"
      :top="top"
      :bottom="bottom"
      :right="right"
      :left="left"
      :direction="direction"
      :open-on-hover="hover"
      :transition="transition"
    >
      <template v-slot:activator>
        <v-btn
          v-model="fab"
          color="secondary"
          class="bg-primary"
          dark
          fab
          small
          @click="helpClick"
        >
          Bantuan
        </v-btn>
      </template>
    </v-speed-dial>
    <b-modal ref="helpModal" hide-footer hide-header centered size="xl">
      <!-- <template #modal-title>
      Bantuan penggunaan aplikasi
    </template> -->
    <b-embed
    type="iframe"
    aspect="16by9"
    :src="urlArticle"
    allowfullscreen
  ></b-embed>
    <!-- <v-text-field
        v-model="searchQuery"
        append-icon="mdi-magnify"
        label="Cari bantuan disini..."
        title="Butuh Bantuan?"
        single-line
        hide-details
        class="mt-0 pt-0 mb-3"
        ></v-text-field>
    <v-expansion-panels
      v-model="panels"
      focusable
    >
      <v-expansion-panel
        v-for="(item,i) in resultQuery"
        :key="i"
      >
        <v-expansion-panel-header>{{ item.judul }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <b-embed
            type="iframe"
            aspect="16by9"
            :src="`https://www.youtube.com/embed/videoseries?list=${item.id_playlist }`"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></b-embed>

          <samp>
            {{ item.deskripsi }}
          </samp>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels> -->

      <!-- <a target="_blank" href="https://proyekita.tawk.to">
      <button class="btn btn-primary mt-3 btn-block">Bantuan Lebih Lengkap disini...</button>
      </a> -->
    </b-modal>
  </div>
  <!-- Right Sidebar Panel End-->
</template>
<script>
import API from '@/services/help'
import { mapGetters } from 'vuex'
export default {
  name: 'RightSideBar',
  data () {
    return {
      rightSideBarMini: false,
      miniClass: '',
      direction: 'top',
      fab: false,
      fling: false,
      hover: false,
      tabs: null,
      top: false,
      right: true,
      bottom: true,
      left: false,
      transition: 'slide-y-reverse-transition',
      panel: [],
      panels: [],
      items: '',
      searchQuery: null,
      urlArticle: 'https://proyekita.tawk.help/',
      userrole: this.userData()
    }
  },
  props: {
    toggleClass: { type: String, default: '' }
  },
  computed: {
    hasIconSlot () {
      return !!this.$slots.icon
    },
    hasOpenIconSlot () {
      return !!this.$slots.openIcon
    },
    hasCloseIconSlot () {
      return !!this.$slots.closeIcon
    },
    resultQuery () {
      if (this.searchQuery) {
        return this.panel.filter((item) => {
          return this.searchQuery.toLowerCase().split(' ').every(v => item.judul.toLowerCase().includes(v))
        })
      } else {
        return this.panel
      }
    }
  },
  mounted () {
    this.getHelp()
  },
  methods: {
    ...mapGetters({
      userData: 'authModule/getUserData'
    }),
    toggleMini () {
      this.rightSideBarMini = !this.rightSideBarMini
      this.checkRightSideBar()
    },
    checkRightSideBar () {
      if (this.rightSideBarMini) {
        this.miniClass = 'right-sidebar'
      } else {
        this.miniClass = ''
      }
    },
    getHelp () {
      var currentUrl = window.location.href
      API.listHelpPHP()
        .then(response => {
          const dt = response.data
          if (response.status) {
            // this.items = dt._meta.total
            // this.panel = dt.data
            const arrdt = dt.data
            const filterdt = arrdt.filter(el => el.url_uri === currentUrl)
            if (filterdt.length > 0) {
              this.urlArticle = filterdt[0].url_article
            } else {
              this.urlArticle = 'https://proyekita.tawk.help/'
            }
          } else {
            this.urlArticle = 'https://proyekita.tawk.help/'
          }
        }).catch(() => {

        }).finally(() => {

        })
    },
    helpClick () {
      this.getHelp()
      setTimeout(() => {
        this.$refs['helpModal'].show()
      }, 1000)
    },
    hideModal () {
      this.$refs['helpModal'].hide()
    }
  }
}
</script>

<style scoped>
  #create .v-speed-dial {
    position: absolute;
  }

  #create .v-btn--floating {
    position: relative;
  }
  .v-btn--icon, .v-btn--fab {
    border-radius: 5px !important;
  }
  .v-speed-dial--right {
    right: 140px;
  }
  .v-speed-dial--bottom {
    bottom: 70px !important;
  }
  .v-btn--fab.v-size--small {
    width: 88px;
    height: 34px;
    font-family: "Nunito Sans", sans-serif;
    font-weight: 700;
    line-height: 24px;
    font-size: 15px;
    letter-spacing: 0px;
    text-transform: none;
  }
</style>
