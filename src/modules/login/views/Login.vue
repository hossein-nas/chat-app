<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useForm } from 'ant-design-vue/es/form'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',
  setup (props) {
    const loginFormModel = reactive({
      email: '',
      password: ''
    })

    const loginFormRules = reactive({
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

    const { resetFields, validate, validateInfos } = useForm(loginFormModel, loginFormRules)

    const onSubmit = () => {
      validate()
        .then((validatedFields:any) => {
          console.log(validatedFields)
        })
        .catch((errors:any) => {
          console.log('form error: ', errors)
        })
    }

    return {
      loginFormModel,
      loginFormRules,
      resetFields,
      validateInfos,
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
            :rules="loginFormRules"
          >
            <a-form-item
              name="email"
              validate-first
              label="Email:"
              v-bind="validateInfos.email"
            >
              <a-input
                v-model:value="loginFormModel.email"
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
                v-model:value="loginFormModel.password"
              ></a-input>
            </a-form-item>

            <a-checkbox>
              Remember Me?
            </a-checkbox>

            <a-button
              class="w-full bg-primary leading-4 py-3 h-[auto] mt-2"
              @click="onSubmit"
              type="primary"
            >
              Login
            </a-button>
          </a-form>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
