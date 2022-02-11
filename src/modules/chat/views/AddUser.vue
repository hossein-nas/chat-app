<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import TheHeader from '@/components/Header.vue'
import useAddUser from '@/modules/chat/services/useAddUser'
import { IUserProfile } from '@/modules/login/services/useProfile'
import UserCard from '@/modules/chat/components/UserCard.vue'

export type UserSearchResult = IUserProfile & { _id : string };

export default defineComponent({
  name: 'AddUser',
  components: { UserCard, TheHeader },
  setup (props, _) {
    const { findUserByEmail } = useAddUser()
    const inputModel = ref<string>('')
    const foundUser = ref<UserSearchResult[]>()

    watch(inputModel, async (val) => {
      if (val.length > 3) {
        foundUser.value = await findUserByEmail(val)
      } else {
        reset()
      }
    })

    const reset = () => {
      foundUser.value = []
    }
    return {
      inputModel,
      foundUser
    }
  }
})
</script>

<template>
  <TheHeader></TheHeader>
  <a-row>
    <a-col
      :span="6"
      :push="9"
    >
      <div class="AddUser rounded-xl bg-white shadow p-8">
        <h3 class="text-xl mb-0 font-bold text-gray-700">
          Find user
        </h3>
        <div class="separator w-full border-b-2 border-gray-100 my-4"></div>
        <div class="SearchBox">
          <a-input
            class="rounded-full h-[auto] py-3 px-4 text-md text-gray-700 leading-4 mb-4"
            v-model:value="inputModel"
            placeholder="Type email address..."
          ></a-input>
        </div>

        <div class="ResultBox">
          <div
            class="item"
            v-for="user in foundUser"
            :key="user._id"
          >
            <user-card :user="user" />
          </div>
        </div>
      </div>
    </a-col>
  </a-row>
</template>

<style scoped>
</style>
