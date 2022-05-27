<template>
  <b-col cols="12">
    <iq-card>
      <b-row class="d-flex align-items-center mb-2" id="parentBread">
        <b-col md="9">
          <div class="d-flex align-items-center">
            <h4 class="mb-0 p-3 ml-2">{{ page.name }}</h4>
            <!-- <b-breadcrumb :items="page.breadCrumb" class="bg-transparent mb-0 mt-1" /> -->
            <ol class="breadcrumb bg-transparent mb-0 mt-1">
              <li class="breadcrumb-item" v-for="(breadcrumb, idx) in breadcrumbList" :key="idx" :class="{'active': breadcrumb.link}">
                <a v-if="breadcrumb.link" href="javascript:void(0);" @click="routeTo(idx)">{{ breadcrumb.name }}</a>
                <span v-else>{{ breadcrumb.name }}</span>
              </li>
            </ol>
          </div>
        </b-col>
        <!-- <b-col md="3" class="text-right">
          <b-button variant="none" class="text-primary" @click="addToBookmark(currentRoute)" v-if="!selectedBookmark"><i class="ri-star-line font-size-24"></i></b-button>
          <b-button variant="none" class="text-warning" @click="removeToBookmark(currentRoute)" v-else><i class="ri-star-fill font-size-24"></i></b-button>
        </b-col> -->
      </b-row>
    </iq-card>
  </b-col>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'
export default {
  name: 'BreadCrumb',
  watch: {
    '$route' () {
      this.updateList()
    }
  },
  mounted () {
    this.updateList()
    // this.currentRoute = this.navList.find(item => item.link.name === this.$route.name)
    let book = this.bookmark.find(item => item.link.name === this.$route.name)
    if (book !== undefined) {
      this.selectedBookmark = true
    }
  },
  computed: {
    ...mapGetters({
      page: 'Setting/activePage',
      navList: 'Setting/globalSearchState',
      bookmark: 'Setting/bookmarkState'
    })
  },
  data () {
    return {
      bookmarkSearch: '',
      currentRoute: {},
      selectedBookmark: false,
      breadcrumbList: []
    }
  },
  methods: {
    ...mapActions({
      addToBookmarkState: 'Setting/addBookmarkAction',
      removeToBookmarkState: 'Setting/removeBookmarkAction'
    }),
    routeTo (pRouteTo) {
      if (this.breadcrumbList[pRouteTo].link) this.$router.push(this.breadcrumbList[pRouteTo].link)
    },
    updateList () {
      this.breadcrumbList = this.$route.meta.breadcrumb
    },
    removeToBookmark (item) {
      this.removeToBookmarkState(item)
      this.selectedBookmark = false
    },
    addToBookmark (item) {
      this.addToBookmarkState(item)
      this.selectedBookmark = true
    },
    checkRoute () {
      // this.currentRoute = this.navList.find(item => item.link.name === this.$route.name)
      let book = this.bookmark.find(item => item.link.name === this.$route.name)
      if (book !== undefined) {
        this.selectedBookmark = true
      } else {
        this.selectedBookmark = false
      }
    }
  }
}

</script>
