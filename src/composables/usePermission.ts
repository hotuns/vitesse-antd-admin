/**
 * @name usePermission
 * @description 处理权限
 */

import intersection from 'lodash-es/intersection'
import { isArray } from '../utils/is'
import { useUserStoreWithOut } from '~/store/modules/user'

export function usePermission() {
  const userStore = useUserStoreWithOut()
  function hasPermission(value?: string | string[], def = true): boolean {
    // Visible by default
    if (!value)
      return def

    if (!isArray(value))
      return userStore.roles?.includes(value)

    if (isArray(value))
      return intersection(value, userStore.roles).length > 0

    return true
  }

  return { hasPermission }
}
