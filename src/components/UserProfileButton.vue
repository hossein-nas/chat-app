<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UserProfileButton',
  setup (props) {
  }
})
</script>

<template>
  <div class="UserProfileButton">
    <a-dropdown
      :placement="'bottomRight'"
      trigger="click"
    >
      <div class="button flex items-center flex-row-reverse group cursor-pointer">
        <div class="user w-10 h-10 rounded-full bg-red-100 group-hover:ring-2 group-hover:ring-white/50">
          <img
            src="/imgs/user_profile.png"
            alt="user_profile"
          >
        </div>
        <span class="mr-2 font-bold text-sm group-hover:underline">Omar Levin</span>
      </div>
      <template #overlay>
        <div class="bg-white rounded-md shadow-md min-w-[12rem]">
          <a-list class="UserProfileButton__list">
            <a-list-item>
              <a-list-item-meta>
                <template #title>
                  <span class="block font-medium text-gray-700 leading-6">Add User </span>
                </template>
                <template #avatar>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  ><circle
                    cx="24"
                    cy="12"
                    r="8"
                    stroke="#333"
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  /><path
                    d="M42 44c0-9.941-8.059-18-18-18S6 34.059 6 44M19 39h10M24 34v10"
                    stroke="#333"
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  /></svg>
                </template>
              </a-list-item-meta>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta>
                <template #title>
                  <span class="block font-medium text-gray-700 leading-6">Show Profile</span>
                </template>
                <template #avatar>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  ><path
                    fill="#fff"
                    fill-opacity=".01"
                    d="M0 0h48v48H0z"
                  /><path
                    clip-rule="evenodd"
                    d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20Z"
                    stroke="#333"
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  /><path
                    d="M24 23a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"
                    stroke="#333"
                    stroke-width="4"
                    stroke-linejoin="round"
                  /><path
                    d="M10.022 38.332C10.366 33.121 14.702 29 20 29h8c5.291 0 9.623 4.11 9.977 9.311"
                    stroke="#333"
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  /></svg>
                </template>
              </a-list-item-meta>
            </a-list-item>

            <router-link :to="{name: 'logout'}">
              <a-list-item>
                <a-list-item-meta>
                  <template #title>
                    <span class="block font-medium text-red-500 leading-6">Logout</span>
                  </template>
                  <template #avatar>
                    <svg
                      width="20"
                      class="text-red-500"
                      height="20"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    ><path
                      fill="#fff"
                      fill-opacity=".01"
                      d="M0 0h48v48H0z"
                    /><path
                      d="M23.992 6H6v36h18M33 33l9-9-9-9M16 23.992h26"
                      stroke="currentColor"
                      stroke-width="4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    /></svg>
                  </template>
                </a-list-item-meta>
              </a-list-item>
            </router-link>
          </a-list>
        </div>
      </template>
    </a-dropdown>
  </div>
</template>

<style scoped lang="less">
.UserProfileButton{

  &__list{
    @apply py-1;

    :deep(.ant-list-item){
      @apply py-2 px-3 hover:bg-gray-100 cursor-pointer;

      h4.ant-list-item-meta-title{
        @apply mb-0;
      }
    }
  }
}
</style>
