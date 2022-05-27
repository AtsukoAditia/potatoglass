<template>
    <div>
        <a :href="img" target="_blank">
            <b-img :src="img" fluid :alt="this.params.data.NamaMaterial" style="width:100px;"></b-img>
        </a>
    </div>
</template>

<script>
import Vue from 'vue'
import constant from '@/config/constant'

export default Vue.extend({
  mixins: [
    {
      data () {
        return {
          img: ''
        }
      },
      mounted () {
        this.loadImg()
      },
      methods: {
        loadImg (data) {
          this.img = constant.urlAssets + this.params.data.photo
        }
      }
    }
  ]
})
</script>
