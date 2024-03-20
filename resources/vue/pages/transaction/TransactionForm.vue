<script lang="ts" setup>
import { Button, Form, FormItem, InputNumber, Textarea } from "ant-design-vue";
import { reactive } from "vue";

interface FormState {
  amount: string;
  description: string;
}

const formState = reactive<FormState>({
  amount: "",
  description: "",
});

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
</script>

<template>
  <Form
    :model="formState"
    name="basic"
    :label-col="{ span: 3 }"
    :wrapper-col="{ span: 8 }"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <FormItem
      label="Amount"
      name="amount"
      :rules="[{ required: true, message: 'Please input amount!' }]"
    >
      <InputNumber
        v-model:value="formState.amount"
        placeholder="Input amount"
        style="width: 200px; max-width: 100%"
      />
    </FormItem>

    <FormItem
      label="Description"
      name="description"
      :rules="[{ required: true, message: 'Please input description!' }]"
    >
      <Textarea
        v-model:value="formState.description"
        placeholder="Input description, eg: Pembelian helikopter"
      />
    </FormItem>

    <FormItem :wrapper-col="{ offset: 3 }">
      <Button type="primary" html-type="submit">Submit</Button>
    </FormItem>
  </Form>
</template>
