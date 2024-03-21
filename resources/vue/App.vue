<script setup lang="ts">
import Main from "@/components/layouts/Main.vue";
import Sign from "@/components/layouts/Sign.vue";
import { ConfigProvider, StyleProvider, notification } from "ant-design-vue";
import { onMounted } from "vue";
import { RouterView } from "vue-router";

onMounted(async () => {
    notification.config({
        placement: 'bottomRight',
    });
})
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
