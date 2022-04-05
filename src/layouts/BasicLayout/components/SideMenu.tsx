import { Layout, Menu } from 'ant-design-vue'
import type { PropType } from 'vue'
import { Icon } from '@iconify/vue'
import type { MenuDataItem } from '../utils/typings'

import { router } from '~/router'
import './index.less'

export default defineComponent({
  name: 'BaseMenu',
  props: {
    theme: {
      type: String,
      default: 'light',
    },
    menuWidth: {
      type: Number,
      default: 208,
    },
    menuData: {
      type: Array as PropType<MenuDataItem[]>,
      default: () => [],
    },
  },
  setup(props) {
    const state = reactive<any>({
      collapsed: false, // default value
      openKeys: [],
      selectedKeys: [],
    })

    watchEffect(() => {
      if (router.currentRoute) {
        const matched = router.currentRoute.value.matched.concat()
        state.selectedKeys = matched.filter(r => r.name !== 'index').map(r => r.path)
        state.openKeys = matched
          .filter(r => r.path !== router.currentRoute.value.path)
          .map(r => r.path)
      }
    })

    const onSelect = (e: { key: string; item: { props: { routeid: number } } } | any) => {
      router.push(e.key)
    }

    // 构建树结构
    const makeTreeDom = (data: MenuDataItem[]): JSX.Element[] => {
      return data.map((item: MenuDataItem) => {
        if (item.children) {
          return (
            <Menu.SubMenu
              key={item.path}
              title={

                <div className="inline-flex justify-center items-center space-x-1">
                  <span className="ant-menu-item-icon"><Icon icon={item.meta?.icon} ></Icon></span>
                  <span>{item.meta?.title}</span>
                </div>

              }
            >
              {makeTreeDom(item.children)}
            </Menu.SubMenu>
          )
        }
        return (
          <Menu.Item key={item.path}>
            <div className="inline-flex justify-center items-center">
              <span className="ant-menu-item-icon"> <Icon icon={item.meta?.icon} ></Icon></span>
              <span className="ant-menu-title-content">
                {item.meta?.title}
              </span>
            </div>

          </Menu.Item>
        )
      })
    }

    return function side_menu() {
      return (
        <Layout.Sider
          width={208}
          collapsedWidth={54}
          class="my-sideMenu-sider"
          trigger={null}
          breakpoint="lg"
          onBreakpoint={val => (state.collapsed = val)}
          collapsible
          collapsed={state.collapsed}
        >
          <Menu

            theme="light"
            mode="inline"
            selectedKeys={state.selectedKeys}
            {...(state.collapsed ? {} : { openKeys: state.openKeys, inlineCollapsed: state.collapsed })}
            onOpenChange={(keys: any[]) => (state.openKeys = keys)}
            onSelect={onSelect}
            class="h-full"
          >
            {makeTreeDom(props.menuData)}
          </Menu>

          <div className="collapsed dis absolute right-1 top-1/2 border rounded-1/2 p-2" onClick={() => state.collapsed = !state.collapsed}>
            {
              h(Icon, {
                icon: state.collapsed ? 'carbon:arrow-right' : 'carbon:arrow-left',
              })
            }
          </div>
        </Layout.Sider>
      )
    }
  },
})
