<template>
  <NConfigProvider :theme="true ? darkTheme : lightTheme">
    <div style="display: flex; height: 100vh; justify-content: center; align-items: center;">
      <NResult
          status="404"
          title="404 资源不存在"
          description="就算有也不给你看">
        <template #footer>
          <NButtonGroup>
            <NButton @click="() => this.$router.go(-1)">悻悻返回</NButton>
            <NButton @click="() => this.$router.push('/')">回家</NButton>
            <NButton @click="() => buttonText = '就不给你看'">
              <NText v-text="buttonText"/>
            </NButton>
          </NButtonGroup>
        </template>
      </NResult>
    </div>
  </NConfigProvider>
</template>
<script setup>
import {ref} from 'vue'
import {darkTheme, lightTheme} from 'naive-ui'

const buttonText = ref('就要看')
</script>