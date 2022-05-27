<template>
  <div class="user-actions" :id="this.params.data.id">
    <!-- <router-link :to="{name:'user.edit', params: {id: this.params.data.id} }">
      <button type="button" :attr="this.params.data.id" data-action-type="edit" class="btn btn-default text-success">
        <i class="fa fa-pencil"></i> Edit
      </button>
    </router-link> -->
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
          removeToCart: 'masterModule/removeUser'
        }),
        removeData (data) {
          const del = confirm('Hapus akun ' + data.username + ' ?')
          let load = document.getElementById('loading')
          load.removeClass('d-none')
          load.show()
          if (del) {
            API.user
              .deleteUser(data.id).then(response => {
                if (response.status) {
                  this.removeToCart(data)
                  core.showSnackbar('success', 'User has been remove successfully.')
                } else if (response.data.errors.length > 0) {
                  this.$refs.form.setErrors(response.data.errors)
                }
              }).finally(() => { this.loading = false })
          }
        }
      }
    }
  ]
})
</script>
