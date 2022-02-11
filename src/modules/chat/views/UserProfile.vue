<script lang="ts">
import { defineComponent, onBeforeMount, reactive, ref } from 'vue'
import TheHeader from '@/components/Header.vue'
import message from 'ant-design-vue/es/message'
import 'ant-design-vue/es/message/style/index.less'
import { useForm } from 'ant-design-vue/es/form'
import useProfile, { IUserProfile } from '@/modules/login/services/useProfile'
import useSendMessage from '@/modules/chat/services/useSendMessage'

export default defineComponent({
  name: 'UserProfile',
  components: { TheHeader },
  setup (props, _) {
    const { updateProfile, getUserProfile } = useProfile()

    const loading = ref<boolean>(false)
    const initilized = ref<boolean>(false)

    const profileFormModel = reactive({
      firstname: '',
      lastname: '',
      age: '',
      bio: '',
      email: '',
      photoUrl: ''
    })

    const profileRulesRef = reactive({
      firstname: [
        {
          required: true,
          min: 3,
          message: 'You should fill firstname input.',
          trigger: 'change'
        }
      ],
      lastname: [
        {
          required: true,
          min: 3,
          message: 'You should fill lastname input.',
          trigger: 'change'
        }
      ],
      email: [],
      bio: [],
      age: []
    })

    const { validate, validateInfos } = useForm(profileFormModel, profileRulesRef)

    const initProfileFormModel = async () => {
      const profileData = await getUserProfile()
      Object.keys(profileData).forEach((key: any) => {
        // @ts-ignore
        profileFormModel[key] = profileData[key]
      })

      initilized.value = true
    }

    const onSubmit = () => {
      loading.value = true
      validate()
        .then(async (validatedFields: IUserProfile) => {
          await updateProfile(validatedFields)
          message.success('Your profile has updated.')

          loading.value = false
        })
    }

    onBeforeMount(() => {
      initProfileFormModel()
    })

    return {
      validateInfos,
      profileRulesRef,
      profileFormModel,
      loading,
      initilized,
      onSubmit
    }
  }
})
</script>

<template>
  <div class="UserProfile">
    <TheHeader />
    <a-row>
      <a-col
        :span="8"
        :push="8"
      >
        <div
          class="UserProfile__box p-8 bg-white shadow rounded-xl"
          v-if="initilized"
        >
          <h3 class="text-xl mb-0 font-bold text-gray-700">
            Update user profile
          </h3>
          <div class="separator w-full border-b-2 border-gray-100 my-4"></div>
          <a-form
            :layout="'vertical'"
            :rules="profileRulesRef"
          >
            <a-form-item
              label="Firstname:"
              name="firstname"
              v-bind="validateInfos.firstname"
            >
              <a-input v-model:value="profileFormModel.firstname"></a-input>
            </a-form-item>
            <a-form-item
              label="Lastname:"
              name="lastname"
              v-bind="validateInfos.lastname"
            >
              <a-input v-model:value="profileFormModel.lastname"></a-input>
            </a-form-item>
            <a-form-item
              label="Email:"
              name="email"
            >
              <a-input
                :value="profileFormModel.email"
                disabled
              ></a-input>
            </a-form-item>
            <a-form-item
              label="Age:"
              name="age"
              v-bind="validateInfos.age"
            >
              <a-input
                type="number"
                v-model:value="profileFormModel.age"
              ></a-input>
            </a-form-item>
            <a-form-item
              label="Bio:"
              name="bio"
              v-bind="validateInfos.bio"
            >
              <a-textarea v-model:value="profileFormModel.bio"></a-textarea>
            </a-form-item>

            <div class="flex flex-row-reverse">
              <a-button
                type="primary"
                @click.prevent="onSubmit"
                :loading="loading"
                size="large"
                class="bg-primary"
              >
                Update
              </a-button>
            </div>
          </a-form>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped>
</style>
