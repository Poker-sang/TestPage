<template>
  <NConfigProvider :theme="isDark ? darkTheme : lightTheme">
    <div :ref="containerRef" style="height: 100vh; position: fixed; width: 100vw"/>
    <NLayout style="position: relative; min-height: 100vh;">
      <NLayoutHeader bordered>
        <!--由于bordered，直接写5rem会稍微偏上一点。NSpace只有一层div，写100%刚好没问题-->
        <NSpace
            style="height: 100%; padding-left: 1rem; padding-right: 2rem"
            align="center"
            justify="space-between">
          <NSpace justify="start" align="center">
            <RouterLink to="/">
              <NSpace align="center" justify="space-between">
                <NDropdown :disabled="!isMobile" :options="menus">
                  <NButton
                      @click="() => collapsed =  isMobile ? collapsed : !collapsed"
                      style="width: 2.2rem">
                    <template #icon>
                      <NIcon :component="Menu2"/>
                    </template>
                  </NButton>
                </NDropdown>
                <NIcon size="2rem" :component="Dna"/>
                <NText>
                  扑克博客
                </NText>
              </NSpace>
            </RouterLink>
          </NSpace>
          <NInput placeholder="搜索">
            <template #suffix>
              <NIcon :component="Search"/>
            </template>
          </NInput>
          <NSpace justify="end" align="center">
            <NButton style="width: 2.2rem">
              <template #icon>
                <NIcon :component="BrandGithub"/>
              </template>
            </NButton>
            <NButton
                @click="() => isDark = !isDark"
                style="width: 2.2rem">
              <template #icon>
                <NIcon v-if="isDark" :component="Moon"/>
                <NIcon v-else :component="Sun"/>
              </template>
            </NButton>
          </NSpace>
        </NSpace>
      </NLayoutHeader>
      <NLayout :has-sider="!isMobile">
        <NLayoutSider
            v-show="!isMobile"
            bordered
            collapse-mode="width"
            collapsed-width="4rem"
            width="15rem"
            :collapsed="collapsed"
            @collapse="collapsed = true"
            @expand="collapsed = false">
          <!--不知道为啥，但不写v-if="!isMobile"在切换模式时会出bug-->
          <NAffix
              v-if="!isMobile"
              :listen-to="containerRef"
              :trigger-top="24">
            <NMenu
                v-model:value="route"
                :options="menus"
                :default-expanded-keys="[]"
                :collapsed="collapsed"
                :collapsed-width="64"
                :collapsed-icon-size="22"
                :style="{width: (collapsed ? 4 : 15) + 'rem'}"/>
          </NAffix>
        </NLayoutSider>
        <NCard v-bind:style="{padding: '24px'}">
          <Content/>
        </NCard>
      </NLayout>
    </NLayout>
    <!--辣鸡vuepress2也不晓得怎么关插件，本来打算重写一下back-to-top，算了懒得搞了-->
  </NConfigProvider>
</template>

<script lang="ts" setup>
import {ref, watch} from 'vue'
import {darkTheme, lightTheme} from 'naive-ui'
import {Sun, Moon, Search, Dna, Menu2, BrandGithub} from '@vicons/tabler'
import {getMenus, useIsMobile} from "../composables"
import {RouterLink, useRouter} from 'vue-router'

const isDark = ref(true)
const containerRef = ref<HTMLElement | undefined>(undefined)
const isMobile = useIsMobile()
const menus = ref([])
const route = ref('')
const collapsed = ref(false)
getMenus().then(t => menus.value = t)

const router = useRouter()
watch(() => router.currentRoute.value.path, (newValue, oldValue) => {
  route.value = decodeURI(router.currentRoute.value.path)
}, {immediate: true})

</script>

<style scoped>
/* 本来不想写死高度5rem的，奈何辣鸡html/css不能计算header高度并自动延伸，恶心坏我了*/
.n-layout-header {
  background: rgba(128, 128, 128, 0.2);
  height: 5rem;
}

.n-layout-content {
}

.n-layout-sider {
  background: rgba(128, 128, 128, 0.3);
  min-height: calc(100vh - 5rem)
}

</style>