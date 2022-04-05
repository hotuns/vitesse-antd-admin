import path from 'path'
import type { ConfigEnv, UserConfig } from 'vite'
import { loadEnv } from 'vite'
import Vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Markdown from 'vite-plugin-md'
import VueI18n from '@intlify/vite-plugin-vue-i18n'
import Inspect from 'vite-plugin-inspect'
import Prism from 'markdown-it-prism'
import LinkAttributes from 'markdown-it-link-attributes'
import Unocss from 'unocss/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { viteMockServe } from 'vite-plugin-mock'
import themePreprocessorPlugin from '@zougt/vite-plugin-theme-preprocessor'
import OptimizationPersist from 'vite-plugin-optimize-persist'
import PkgConfig from 'vite-plugin-package-config'

import { AntDesignVueResolver, VueUseComponentsResolver } from 'unplugin-vue-components/resolvers'

const markdownWrapperClasses = 'prose prose-sm m-auto text-left'

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build'
  console.log(command, mode)

  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return {
    resolve: {
      alias: {
        '~/': `${path.resolve(__dirname, 'src')}/`,
      },
    },

    plugins: [

      // 将包信息文件作为 vite 的配置文件之一，为 vite-plugin-optimize-persist 所用
      PkgConfig(),

      // 依赖预构建分析，提高大型项目性能
      OptimizationPersist(),

      Vue({
        include: [/\.vue$/, /\.md$/],
        reactivityTransform: true,
      }),

      vueJsx(),

      // https://github.com/hannoeru/vite-plugin-pages
      Pages({
        extensions: ['vue', 'tsx', 'md'],
        exclude: ['**/components/*.vue', '**/components/**/*.vue', '**/components/*.tsx', '**/components/**/*.tsx'],
      }),

      // https://icones.netlify.app/
      Icons({
        autoInstall: true,
      }),

      // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
      Layouts(
        {
          exclude: ['**/components/*.vue', '**/components/**/*.vue', '**/components/*.tsx', '**/components/**/*.tsx'],
        },
      ),

      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          'vue-i18n',
          'vue/macros',
          '@vueuse/head',
          '@vueuse/core',
        ],
        dts: 'src/auto-imports.d.ts',
      }),

      // https://github.com/antfu/unplugin-vue-components
      Components({
        // allow auto load markdown components under `./src/components/`
        extensions: ['vue', 'md'],
        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: 'src/components.d.ts',
        resolvers: [
          IconsResolver(),
          VueUseComponentsResolver(),
          AntDesignVueResolver(),
        ],
      }),

      // https://github.com/antfu/unocss
      // see unocss.config.ts for config
      Unocss(),

      // https://github.com/antfu/vite-plugin-md
      Markdown({
        wrapperClasses: markdownWrapperClasses,
        headEnabled: true,
        markdownItSetup(md) {
          // https://prismjs.com/
          md.use(Prism)
          md.use(LinkAttributes, {
            matcher: (link: string) => /^https?:\/\//.test(link),
            attrs: {
              target: '_blank',
              rel: 'noopener',
            },
          })
        },
      }),

      // https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
      VueI18n({
        runtimeOnly: true,
        compositionOnly: true,
        include: [path.resolve(__dirname, 'locales/**')],
      }),

      // https://github.com/antfu/vite-plugin-inspect
      // Visit http://localhost:3333/__inspect/ to see the inspector
      Inspect(),

      viteMockServe({
        ignore: /^\_/,
        mockPath: 'mock',
        logger: true,
        localEnabled: !isBuild,
        prodEnabled: isBuild, // 为了演示，线上开启 mock，实际开发请关闭，会影响打包体积
        // 开发环境无需关心
        // injectCode 只受prodEnabled影响
        // https://github.com/anncwb/vite-plugin-mock/issues/9
        // 下面这段代码会被注入 main.ts
        injectCode: `
           import { setupProdMockServer } from '../mock/_createProdMockServer';
     
           setupProdMockServer();
           `,
      }),

      themePreprocessorPlugin({
        less: {
          // 各个主题文件的位置
          multipleScopeVars: [
            {
              scopeName: 'light',
              path: path.resolve('src/styles/light.less'),
            },
            {
              scopeName: 'dark',
              path: path.resolve('src/styles/dark.less'),
            },
          ],
          defaultScopeName: 'light', // 默认取 multipleScopeVars[0].scopeName
          extract: false, // 在生产模式是否抽取独立的主题css文件
        },
      }),
    ],

    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },

    // https://github.com/vitest-dev/vitest
    test: {
      include: ['test/**/*.test.ts'],
      environment: 'jsdom',
      deps: {
        inline: ['@vue', '@vueuse', 'vue-demi'],
      },
    },
  }
}
