<script lang="ts" setup>
import { getBalanceRequest } from "@/utils/api-client";
import { ArrowLeftOutlined } from "@ant-design/icons-vue";
import { Card, Segmented, notification } from "ant-design-vue";
import { onMounted, ref } from "vue";
import TopUpForm from "./TopUpForm.vue";
import TransactionForm from "./TransactionForm.vue";
import { useTransaction } from './transaction';

const segmentData = ["Transaction", "Top Up"];
const segmentValue = ref(segmentData[0]);
const { setBalance } = useTransaction()

onMounted(() => {
    getBalanceRequest().then(({ data }) => {
        setBalance(data.data.balance)
    }).catch(() => {
        notification.error({
            message: 'Error occured when fetching balance! Please refresh your browser.'
        })
    })
})
</script>

<template>
<Card>
    <template #title>
        <div class="tw-flex tw-items-center">
            <div class="tw-mr-4 tw-cursor-pointer" @click="$router.push('/')">
                <ArrowLeftOutlined />
            </div>

            <div>Transactions</div>
        </div>
    </template>

    <template #default>
        <div class="tw-flex tw-mb-10">
            <Segmented v-model:value="segmentValue" :options="segmentData" size="large" />
        </div>

        <template v-if="segmentValue === 'Transaction'">
            <TransactionForm />
        </template>

        <template v-else-if="segmentValue === 'Top Up'">
            <TopUpForm />
        </template>
    </template>
</Card>
</template>
