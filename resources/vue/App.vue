<script setup lang="ts">
import Main from "@/components/layouts/Main.vue";
import { ConfigProvider, StyleProvider } from "ant-design-vue";
import { RouterView } from "vue-router";
</script>

<template>
  <ConfigProvider
    :theme="{
      token: {
        colorPrimary: '#d31b8e',
      },
    }"
  >
    <StyleProvider hashPriority="high">
      <template v-if="$route.meta.layout === 'login'">
        <RouterView />
      </template>

      <template v-else-if="$route.meta.layout === 'main'">
        <Main>
          <RouterView />
        </Main>
      </template>
    </StyleProvider>
  </ConfigProvider>
</template>
