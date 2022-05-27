<template>
  <div>
    <h2 class="mb-0">Daftar aplikasi sekarang juga.</h2>
    <p class="mb-0">Lengkapi formulir berikut untuk membuat akun dan masuk ke aplikasi.</p>
    <sign-up1-form formType="passport"></sign-up1-form>
  </div>
</template>
<script>

import SignUp1Form from './Forms/SignUp1Form'
import auth0 from 'auth0-js'
import constant from '@/config/constant'

export default {
  name: 'SignUp1',
  components: { SignUp1Form },
  data: () => ({}),
  methods: {
    loginOAuth0 () {
      new auth0.WebAuth(constant.auth0Config).authorize()
    }
  }
}
</script>
