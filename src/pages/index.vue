
<route lang="yaml">
meta:
  layout: blank
</route>

<template>
  <div />
</template>

<script setup lang="ts">
const router = useRouter()

router.replace({ path: '/app/home' })
</script>
