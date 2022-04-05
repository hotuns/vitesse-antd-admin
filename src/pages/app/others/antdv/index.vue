<route lang="yaml">
meta:
  layout: default
  title: 组件
  icon: home
  auth: [home]
</route>

<template>
  <h2>antdv</h2>
  <a-card title="日期组件">
    <a-alert message="国际化" type="info" />
    <a-divider />
    <a-space direction="vertical">
      <a-date-picker /><a-range-picker />
    </a-space>
  </a-card>
</template>
