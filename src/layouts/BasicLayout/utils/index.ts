import type { RouteRecord, RouteRecordRaw } from 'vue-router'

type IRouteRecordRaw = RouteRecordRaw & { childrenPaths?: string[] }

// 过滤路由属性 hideInMenu hideChildInMenu, 并且获取所有子路由的 path
export function clearMenuItem(menusData: RouteRecord[] | RouteRecordRaw[]): RouteRecordRaw[] {
  console.log('clearMenuItem')
  const filterHideMenus = menusData
    .map((item: RouteRecord | RouteRecordRaw) => {
      const finalItem = { ...item }
      if (!finalItem.name || finalItem.meta?.hideInMenu)
        return null

      if (finalItem && finalItem?.children) {
        if (
          !finalItem.meta?.hideChildInMenu
          && finalItem.children.some(
            (child: RouteRecord | RouteRecordRaw) => child && child.name && !child.meta?.hideInMenu,
          )
        ) {
          finalItem.children.forEach((item) => {
            if (!item.path.startsWith(finalItem.path))
              item.path = `${finalItem.path}/${item.path}`
          })

          return {
            ...item,
            children: clearMenuItem(finalItem.children),
          }
        }
        delete finalItem.children
      }
      return finalItem
    })
    .filter(item => item) as IRouteRecordRaw[]

  //

  return filterHideMenus
}

// 存在二级菜单时，过滤掉重复的并在一级菜单显示的 item
export const filterRoutes = (menusData: RouteRecordRaw[]): RouteRecordRaw[] => {
  const filterRoutes: string[] = []
  menusData.forEach((n) => {
    if (n.children)
      n.children.forEach(({ path }) => filterRoutes.push(path))
  })

  menusData.sort((a, b) => {
    const aIndex = (a.meta?.index || 0) as number
    const bIndex = (b.meta?.index || 0) as number
    return aIndex - bIndex
  })

  return menusData.filter(({ path }) => !filterRoutes.includes(path))
}
