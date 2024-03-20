<script lang="ts" setup>
import { ArrowLeftOutlined } from "@ant-design/icons-vue";
import { Card } from "ant-design-vue";
import { ref } from "vue";
import Table from './Table.vue'
</script>

<template>
<Card>
    <template #title>
        <div class="tw-flex tw-items-center">
            <div class="tw-mr-4 tw-cursor-pointer" @click="$router.push('/')">
                <ArrowLeftOutlined />
            </div>

            <div>Histories</div>
        </div>
    </template>

    <template #default>
        <Table />
    </template>
</Card>
</template>
