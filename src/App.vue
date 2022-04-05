<template>
  <ConfigProvider :locale="antdLocale">
    <router-view v-slot="{ Component, route }">
      <transition name="slide">
        <component :is="Component" :key="route" />
      </transition>
    </router-view>
  </ConfigProvider>
</template>

<script lang="ts" setup>
import { ConfigProvider } from 'ant-design-vue'
import moment from 'moment'
import enUS from 'ant-design-vue/es/locale/en_US'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { useTitle } from '~/composables/useTitle'
import useDarks from '~/composables/useDarks'
import 'moment/dist/locale/zh-cn'

const { locale } = useI18n()
const { isDark } = useDarks()

onMounted(() => {
  console.log(isDark)

  // if (isDark) {
  //   toggleTheme({
  //     scopeName: 'theme-dark',
  //   })
  // }
  // else {
  //   toggleTheme({
  //     scopeName: 'theme-light',
  //   })
  // }

  // date-picker 国际化失效问题
  // 引入dist下的文件：import 'moment/dist/locale/zh-cn'
  // 确保 moment版本一致
  moment.locale('zh_CN')

  useTitle()
})

watch(locale, (val) => {
  console.log('ConfigProvider', val)
  switch (val) {
    case 'zh-CN':
      moment.locale(zhCN.locale)
      break
    case 'en':
      moment.locale(enUS.locale)
      break
    default:
      moment.locale('zh-cn')
      break
  }
})

const antdLocale = computed((): any => {
  switch (locale.value) {
    case 'zh-CN':
      return zhCN
    case 'en':
      return enUS
    default:
      return zhCN
  }
})
console.log('my config env: ', import.meta.env)
</script>
