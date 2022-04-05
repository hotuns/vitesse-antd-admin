<route lang="yaml">
meta:
  layout: blank
</route>

<template>
  <div />
</template>

<script lang="ts" setup>
import { onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

onBeforeMount(() => {
  const { params, query } = route
  const { path } = params
  router.replace({ path: `/${path}`, query })
})

</script>
