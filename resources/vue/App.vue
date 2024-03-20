<script setup lang="ts">
import Main from "@/components/layouts/Main.vue";
import Sign from "@/components/layouts/Sign.vue";
import { ConfigProvider, StyleProvider } from "ant-design-vue";
import { RouterView } from "vue-router";
</script>

<template>
<ConfigProvider :theme="{
    token: {
        colorPrimary: '#d31b8e',
    },
}">
    <StyleProvider hashPriority="high">
        <template v-if="$route.meta.layout === 'sign'">
            <Sign>
                <RouterView />
            </Sign>
        </template>

        <template v-else-if="$route.meta.layout === 'main'">
            <Main>
                <RouterView />
            </Main>
        </template>
    </StyleProvider>
</ConfigProvider>
</template>
