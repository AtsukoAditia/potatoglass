<template>
  <div class="material-actions" :id="this.params.data.id">
    <!-- <router-link> -->
      <button type="button" :attr="this.params.data.id" data-action-type="edit" class="btn btn-default text-success">
        <i class="fa fa-edit"></i> Edit
      </button>
    <!-- </router-link> -->
    <button type="button" :attr="this.params.data.id" @click="removeData(params.data)" data-action-type="remove" class="btn btn-default text-danger">
      <i class="fa fa-trash"></i> Delete
    </button>
  </div>
</template>

<script>
import Vue from 'vue'
import { core } from '../../../config/pluginInit'
import API from '@/services/admin'
import { mapActions } from 'vuex'

export default Vue.extend({
  mixins: [
    {
      data () {
        return {
        }
      },
      methods: {
        ...mapActions({
          removeToCart: 'masterModule/removeMaterial'
        }),
        removeData (data) {
          const del = confirm('Hapus material ' + data.material_name + ' ?')

          if (del) {
            API.material
              .deleteMaterial(data.id).then(response => {
                if (response.status) {
                  this.removeToCart(data)
                  core.showSnackbar('success', 'Material berhasil dihapus.')
                } else if (response.data.errors.length > 0) {
                  this.$refs.form.setErrors(response.data.errors)
                  core.showSnackbar('danger', 'Data gagal di hapus, periksa koneksi anda.')
                }
              }).catch(function (error) {
                if (error.response) {
                  // The request was made and the server responded with a status code
                  // that falls out of the range of 2xx
                } else if (error.request) {
                  // The request was made but no response was received
                  // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                  // http.ClientRequest in node.js
                } else {
                  // Something happened in setting up the request that triggered an Error
                }
              })
          }
        }
      }
    }
  ]
})
</script>
