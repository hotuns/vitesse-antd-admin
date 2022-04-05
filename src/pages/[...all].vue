<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <a-result status="404" title="404" :sub-title="t('not-found')">
    <template #extra>
      <a-button type="primary" @click="$router.push('/')">
        返回首页
      </a-button>
    </template>
  </a-result>
</template>

<route lang="yaml">
meta:
  layout: blank
</route>
