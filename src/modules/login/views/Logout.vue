<script lang="ts">
import { defineComponent } from 'vue'
import { getAuth } from 'firebase/auth'
import { isSignedIn } from '@/boot/firebase'

export default defineComponent({
  name: 'Logout',

  async beforeRouteEnter (to, from, next) {
    const signedIn = await isSignedIn()
    if (signedIn.value) {
      const auth = getAuth()

      await auth.signOut()

      return next({ name: 'login' })
    }
    return next(false)
  },

  setup (props, _) {

  }
})
</script>
