<script lang="ts" setup>
import { Button, Input, InputPassword } from "ant-design-vue";
</script>

<template>
  <div>
    <h2 class="tw-font-semibold tw-text-lg tw-mb-8">Login</h2>

    <form>
      <div class="tw-mb-4">
        <Input placeholder="Email" />
      </div>

      <div class="tw-mb-4">
        <InputPassword placeholder="Password" />
      </div>

      <div>
        <Button type="primary">Login</Button>
      </div>
    </form>
  </div>
</template>
