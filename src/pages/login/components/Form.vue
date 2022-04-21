<template>
  <div class="form_box">
    <a-form :model="formModel" :rules="rules" @finish="handleFinish">
      <p class="text">
        请输入账号
      </p>
      <a-form-item name="username">
        <a-input
          v-model:value="formModel.username"
          class="reset-input"
          placeholder="管理员：admin，普通：test"
        >
          <template #prefix>
            <!-- <user-outlined class="icon" type="user" /> -->
            <Icon size="24px" type="shoujihaodenglu" class="icon" />
          </template>
        </a-input>
      </a-form-item>
      <p class="text">
        请输入密码
      </p>
      <a-form-item name="password">
        <a-input
          v-model:value="formModel.password"
          class="reset-input"
          type="password"
          placeholder="密码为 123456"
        >
          <template #prefix>
            <!-- <lock-outlined class="icon" /> -->
            <Icon size="24px" type="shurumimadenglu" class="icon" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-row>
          <a-col :span="12">
            <a-checkbox v-model:checked="checked" class="reset_checkbox">
              自动登录
            </a-checkbox>
          </a-col>
          <a-col :span="12" class="text-right">
            <!-- <span class="gray_text">忘记密码?</span> -->
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit" class="btn" :loading="loading">
          立即登录
        </a-button>
      </a-form-item>
    </a-form>
    <p class="copyright">
      @copyright HDS
    </p>
  </div>
</template>
<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { ReqParams } from '~/api/user/model'
import { useMessage } from '~/composables/useMessage'
import { useUserStore } from '~/store/modules/user'

const userStore = useUserStore()
const router = useRouter()
const { createMessage } = useMessage()

const loading = ref(false)

const state: any = reactive({
  otherQuery: {},
  redirect: undefined,
})

/* listen router change  */
const route = useRoute()
const getOtherQuery = (query: any) => {
  return Object.keys(query).reduce((acc: any, cur) => {
    if (cur !== 'redirect')
      acc[cur] = query[cur]

    return acc
  }, {})
}

watch(
  route,
  (route) => {
    const query = route.query
    if (query) {
      state.redirect = query.redirect
      state.otherQuery = getOtherQuery(query)
    }
  },
  { immediate: true },
)

const rules = {
  username: [{ required: true, trigger: 'blur', message: '请输入账号' }],
  password: [{ required: true, trigger: 'blur', message: '请输入密码' }],
}

const checked = ref(true)
const formModel = reactive({
  username: '',
  password: '',
})

const handleFinish = async(values: ReqParams) => {
  loading.value = true
  const res = await userStore.login(values)
  loading.value = false
  if (res) {
    createMessage.success('登录成功')
    router.replace({ path: state.redirect || '/', query: state.otherQuery })
    // router.replace('/')
  }
}
</script>
<style lang="less">
  .form_box {
    margin-top: 30px;
    .btn {
      width: 100%;
      height: 54px;
      background: linear-gradient(90deg, #00c3fd 0%, #3662f4 100%);
      border-radius: 6px;
      color: #ffffff;
      font-size: 20px;
      &:hover {
        opacity: 0.85;
        border: none;
      }
    }
    .icon {
      color: #666666;
    }
    .text {
      font-size: 14px;
      line-height: 20px;
      color: #999999;
      letter-spacing: 1.1px;
      margin-bottom: 10px;
    }
    .gray_text {
      font-size: 12px;
      color: #666666;
    }
    .reset_checkbox {
      .ant-checkbox-inner {
        border-radius: 50%;
      }
      & > span:last-child {
        font-size: 12px;
        color: #666666;
      }
    }
    .reset-input {
      height: 50px;
      line-height: 50px;
      border: 1px solid #707070;
      border-radius: 6px;
    }
    .copyright {
      margin-top: 20px;
      font-size: 12px;
      color: #999999;
      opacity: 0.85;
    }
  }
</style>
