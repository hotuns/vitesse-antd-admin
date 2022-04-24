<template>
  <div class="sys-setting flex items-center justify-end space-x-4">
    <div class="cursor-pointer" i="carbon-sun dark:carbon-moon" @click="toggleDark()" />

    <a-dropdown size="small">
      <i-carbon-language />

      <template #overlay>
        <a-menu @click="localeHandleSelect">
          <a-menu-item v-for="i in localOpts" :key="i.key">
            <span>{{ i.label }}</span>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>

    <a-dropdown placement="bottomCenter">
      <template #overlay>
        <a-menu :selected-keys="selectedKeys" class="menu-box">
          <a-menu-item v-for="item in navs" :key="item.path" @click="handleRoute(item?.path)">
            <template #icon>
              <Icon align="1px" size="20px" :type="item.icon" />
            </template>
            <span>{{ item.name }}</span>
          </a-menu-item>
        </a-menu>
      </template>

      <a-avatar size="small">
        <template #icon>
          <UserOutlined />
        </template>
      </a-avatar>
    </a-dropdown>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { navs as myNavs } from './constant'
import { useUserStore } from '~/store/modules/user'
import useDarks from '~/composables/useDarks'

const { toggleDark } = useDarks()
const { locale } = useI18n()
const localOpts = [
  {
    label: '中文',
    key: 'zh-CN',
  },
  {
    label: 'English',
    key: 'en',
  },
]
const localeHandleSelect = ({ key }: { key: string }) => {
  console.log(key)
  locale.value = key
}

const store = useUserStore()
const router = useRouter()

const navs = ref(myNavs)
const selectedKeys = ref<string[]>([])

watchEffect(() => {
  if (router.currentRoute) {
    const matched = router.currentRoute.value.matched.concat()
    selectedKeys.value = matched.filter(r => r.name !== 'index').map(r => r.path)
  }
})

const handleRoute = (path?: string) => {
  if (path) return router.push(path)
  // 退出登录
  store.logout()
}
</script>

<style lang="less" scoped>
</style>
