<script setup lang="ts">
const router = useRouter()

router.replace({ path: '/app/home' })
</script>

<template>
  <div>
    index
  </div>
</template>

<route lang="yaml">
meta:
  layout: blank
</route>
