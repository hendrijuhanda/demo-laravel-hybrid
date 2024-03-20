<script lang="ts" setup>
import { Card } from "ant-design-vue";
import LayoutContainer from "./LayoutContainer.vue";
import Logo from "./Logo.vue";

</script>

<template>
<LayoutContainer>
    <div class="tw-min-h-screen tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-px-16">
        <div class="tw-max-w-full tw-w-[300px] tw-mt-24">
            <div class="tw-flex tw-justify-center tw-mb-16">
                <Logo />
            </div>

            <Card>
                <slot />
            </Card>
        </div>

        <footer class="tw-flex-shrink-0 tw-text-xs tw-py-4 tw-mt-auto">
            YUKK Fullstack Test &copy; Hendri Juhanda
        </footer>
    </div>
</LayoutContainer>
</template>
