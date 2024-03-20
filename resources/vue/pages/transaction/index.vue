<script lang="ts" setup>
import { ArrowLeftOutlined } from "@ant-design/icons-vue";
import { Card, Segmented } from "ant-design-vue";
import { ref } from "vue";
import TopUpForm from "./TopUpForm.vue";
import TransactionForm from "./TransactionForm.vue";

const segmentData = ["Transaction", "Top Up"];
const segmentValue = ref(segmentData[0]);
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
        <Segmented
          v-model:value="segmentValue"
          :options="segmentData"
          size="large"
        />
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
