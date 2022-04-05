/**
 * @name useBreadcrumbTitle
 * @description 修改面包屑Title
 * @param isAddOn 是否为添加 on注册
 */

import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import mitt from '~/utils/mitt'

const emitter = mitt()

// eslint-disable-next-line symbol-description
const key = Symbol()

export const useBreadcrumbTitle = (isAddOn = true) => {
  const route = useRoute()
  const title = ref(route.meta.title)

  watch(
    () => route.meta.title,
    (val) => {
      title.value = val
    },
  )

  const changeTitle = (val: string) => (title.value = val)

  onMounted(() => isAddOn && emitter.on(key, changeTitle))

  onUnmounted(() => isAddOn && emitter.off(key, changeTitle))

  const setBreadcrumbTitle = (title: string) => emitter.emit(key, title)

  return {
    title,
    setBreadcrumbTitle,
  }
}
