<script lang="ts" setup>
import { ArrowRightOutlined } from "@ant-design/icons-vue";
import { Button } from "ant-design-vue";
</script>

<template>
  <div class="tw-flex tw-items-center tw-justify-start">
    <div class="tw-mr-4">
      <Button type="primary" size="large" @click="$router.push('/transaction')">
        <div
          class="tw-w-48 tw-max-w-full tw-flex tw-items-center tw-justify-between"
        >
          <div>Make Transaction</div>
          <div><ArrowRightOutlined /></div>
        </div>
      </Button>
    </div>

    <div>
      <Button type="primary" size="large" @click="$router.push('/history')">
        <div
          class="tw-w-48 tw-max-w-full tw-flex tw-items-center tw-justify-between"
        >
          <div>View History</div>
          <div><ArrowRightOutlined /></div>
        </div>
      </Button>
    </div>
  </div>
</template>
