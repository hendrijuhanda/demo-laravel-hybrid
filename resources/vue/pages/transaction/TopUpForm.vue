<script lang="ts" setup>
import { UploadOutlined } from "@ant-design/icons-vue";
import {
    Button,
    Form,
    FormItem,
    InputNumber,
    Textarea,
    Upload,
    UploadFile,
} from "ant-design-vue";
import { reactive } from "vue";

interface FormState {
  amount: string;
  description: string;
  receipt: UploadFile<any>[];
}

const formState = reactive<FormState>({
  amount: "",
  description: "",
  receipt: [],
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
        placeholder="Input description, eg: Tranfer Bank BCL"
      />
    </FormItem>

    <FormItem
      name="upload"
      label="Receipt"
      extra="Upload transfer receipt"
      :rules="[
        { required: true, message: 'Please upload proof of transaction!' },
      ]"
    >
      <Upload
        v-model:fileList="formState.receipt"
        name="receipt"
        list-type="picture"
      >
        <Button>
          <template #icon>
            <UploadOutlined />
          </template>

          Click to upload
        </Button>
      </Upload>
    </FormItem>

    <FormItem :wrapper-col="{ offset: 3 }">
      <Button type="primary" html-type="submit">Submit</Button>
    </FormItem>
  </Form>
</template>
