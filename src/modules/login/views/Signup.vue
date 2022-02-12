<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { message } from 'ant-design-vue'
import 'ant-design-vue/es/message/style/index.less'
import { useForm } from 'ant-design-vue/es/form'
import { isSignedIn } from '@/boot/firebase'
import { useRouter } from 'vue-router'
import { useAuth } from '@/modules/login/services/useAuth'

export interface ISignupForm {
  firstname: string;
  lastname: string;
  email:string;
  password: string;
}

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Signup',

  async beforeRouteEnter (to, from, next) {
    const signedIn = await isSignedIn()
    if (signedIn.value) {
      next({ name: 'chat-index' })
      return
    }
    next()
  },
  setup (props) {
    const router = useRouter()

    const signupFormModel = reactive({
      email: '',
      firstname: '',
      lastname: '',
      password: ''
    })

    const signupFormRules = reactive({
      firstname: [
        {
          required: true,
          message: 'You should enter your firstname'
        }
      ],
      lastname: [
        {
          required: true,
          message: 'You should enter your lastname'
        }
      ],
      email: [
        {
          type: 'email',
          required: true,
          trigger: 'change',
          message: 'email is not correct.'
        }
      ],
      password: [
        {
          min: 6,
          required: true,
          trigger: 'change',
          message: 'You should  enter at least 6 character.'
        },
        {
          pattern: /[\w]+/,
          required: true,
          trigger: 'change',
          message: 'At least one alpha character should be in password.'
        }
      ]
    })

    const { resetFields, validate, validateInfos } = useForm(signupFormModel, signupFormRules)

    const onSubmit = () => {
      const { signupUser } = useAuth()
      validate()
        .then(async (validatedFields: ISignupForm) => {
          signupUser(validatedFields)
            .then(() => {
              showSuccessSignupMessage()
            })
            .catch(() => {
              showEmailExistMessage()
            })
        })
    }

    const showSuccessSignupMessage = async () => {
      message.success('Your signup process has completed.')
      setTimeout(() => {
        router.push({ name: 'chat-index' })
      }, 2000)
    }

    const showEmailExistMessage = async () => {
      message.success('Your email exists already. Please Login')
      await setTimeout(() => {
        router.push({ name: 'login' })
      }, 2000)
    }

    return {
      signupFormModel,
      signupFormRules,
      resetFields,
      validateInfos,
      isSignedIn,
      onSubmit
    }
  }
})
</script>

<template>
  <div class="container mx-auto">
    <a-row>
      <a-col
        :span="8"
        :push="8"
      >
        <div class="LoginForm rounded-xl bg-white p-8 shadow">
          <a-form
            layout="vertical"
            :rules="signupFormRules"
          >
            <div class="grid grid-cols-2 gap-4">
              <a-form-item
                name="firstname"
                label="Firstname:"
                v-bind="validateInfos.firstname"
              >
                <a-input
                  v-model:value="signupFormModel.firstname"
                  type="text"
                ></a-input>
              </a-form-item>
              <a-form-item
                name="lastname"
                label="Lastname:"
                v-bind="validateInfos.lastname"
              >
                <a-input
                  v-model:value="signupFormModel.lastname"
                  type="text"
                ></a-input>
              </a-form-item>
            </div>

            <a-form-item
              name="email"
              label="Email:"
              v-bind="validateInfos.email"
            >
              <a-input
                v-model:value="signupFormModel.email"
                type="email"
              ></a-input>
            </a-form-item>
            <a-form-item
              name="password"
              :validate-first="true"
              label="Password:"
              v-bind="validateInfos.password"
            >
              <a-input
                type="password"
                @keypress.enter="onSubmit"
                v-model:value="signupFormModel.password"
              ></a-input>
            </a-form-item>

            <a-button
              class="w-full bg-primary leading-4 py-3 h-[auto] mt-2"
              type="primary"
              @click.prevent="onSubmit"
            >
              Register
            </a-button>
            <p class="text-right text-sm leading-4 mt-2">
              In case have any account? Login
              <router-link
                :to="{ name: 'login'}"
                class="text-primary"
              >
                here
              </router-link>
              .
            </p>
          </a-form>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
