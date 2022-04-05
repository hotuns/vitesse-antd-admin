<template>
  <div class="header bg-white  dark:bg-black">
    <router-link :to="{ path: '/' }" style="height:100%;display: inline-block;">
      <div class="flex h-full items-center">
        <img :src="logo" class="logo" style="height: 100%;">
        <span class="text-xl">
          {{ APP_TITLE }}
        </span>
        <!-- <span class="subTitle">基础版</span> -->
      </div>
    </router-link>

    <RightContent />
  </div>
</template>
<script setup lang="ts">

import RightContent from './RightContent.vue'
import logo from '~/assets/images/logo.png'

const APP_TITLE = import.meta.env.VITE_APP_TITLE
</script>
<style lang="less" scoped>
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    height: 80px;
    padding: 10px 16px;
    box-shadow: 0 1px 4px #00152914;
    z-index: 1;
  }

</style>
