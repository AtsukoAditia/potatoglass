<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">
        <iq-card>
          <template v-slot:headerTitle>
          </template>
          <template v-slot:headerAction>
          </template>
          <template v-slot:body>

          </template>
        </iq-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { core } from '@/config/pluginInit'
// import API from '@/services/admin'
// import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'UserManage',
  mounted () {
    core.index()
  },
  data () {
    return {
    }
  },
  computed: {
  },
  components: {
  },
  beforeMount () {
  },
  methods: {
  }
}
</script>
