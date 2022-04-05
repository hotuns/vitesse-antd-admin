<route lang="yaml">
meta:
  layout: default
  title: 网站管理
  icon: carbon:settings-adjust
  auth: [home]
  index: 2
</route>

<template>
  <div class="node-conatiner">
    <h2 class="nc_title font18">
      网站管理
    </h2>
    <Table :url="fetchApi.page_one_list" :columns="columns" :hidden-filter="true" />
  </div>
</template>
<script setup lang="ts">
import { columns } from './components/constant'
import fetchApi from '~/api/common'
</script>
<style lang="less" scoped>
  .node-conatiner {
    .nc_title {
      margin-top: 6px;
      margin-bottom: 30px;
    }
  }
</style>
