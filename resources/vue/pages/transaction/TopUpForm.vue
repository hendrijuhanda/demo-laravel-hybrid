<script lang="ts" setup>
import { createTransactionRequest } from "@/utils/api-client";
import priceFormat from "@/utils/price-format";
import { UploadOutlined } from "@ant-design/icons-vue";
import {
Button,
Form,
FormItem,
InputNumber,
Modal,
Textarea,
Upload,
UploadFile,
UploadProps,
notification,
} from "ant-design-vue";
import { useForm } from "ant-design-vue/es/form";
import { h, reactive, ref } from "vue";
import { useTransaction } from "./transaction";

interface FormState {
    amount: string;
    description: string;
    upload: UploadFile<any>[];
}

const formState = reactive<FormState>({
    amount: "",
    description: "",
    upload: [],
});

const { resetFields } = useForm(formState)
const { balance, setBalance, inputNumberFormatter, inputNumberParser, inputNumberKeydown } = useTransaction();
const isSubmitting = ref<boolean>(false);
const fileList = ref<UploadProps['fileList']>([]);

const handleBeforeUpload: UploadProps['beforeUpload'] = (file) => {
    fileList.value = [...(fileList.value || []), file];

    return false;
}

const onFinish = async (values: any) => {
    isSubmitting.value = true;

    const formData = new FormData();

    formData.append('type', 'topup');
    formData.append('amount', values.amount);
    formData.append('description', values.description);

    (fileList.value || []).forEach((file: any) => {
        formData.append('upload', file as any);
    });

    const res = await createTransactionRequest(formData).catch(e => {
        notification.error({
            message: 'Something went wrong',
            description: e?.response?.data?.message || e.message
        })
    });

    if (res) {
        const { data } = res;

        Modal.success({
            title: 'Top Up Successfull',
            content: h('div', {}, [
                h('p', {}, [
                    'Top Up ',
                    h('strong', {}, [values.description]),
                    ' with value ',
                    h('strong', {}, [`Rp. ${priceFormat(values.amount)}`]),
                    ' has been successfull.',
                ]),
                h('br'),
                h('p', {}, [
                    'Your transaction ID ',
                    h('strong', {}, [data.data.transaction_id]),
                    '.'
                ])
            ]),
        });

        setBalance(data.data.balance);
        resetFields();
    }

    isSubmitting.value = false
};
</script>

<template>
<Form :model="formState" name="basic" :label-col="{ span: 3 }" :wrapper-col="{ span: 8 }" autocomplete="off"
    @finish="onFinish">
    <FormItem label="Balance">
        <div class="tw-font-semibold">Rp. {{ priceFormat(balance) }}</div>
    </FormItem>

    <FormItem label="Amount" name="amount" :rules="[{ required: true, message: 'Please input amount!' }]">
        <InputNumber v-model:value="formState.amount" placeholder="Input amount" prefix="Rp."
            :formatter="inputNumberFormatter" :parser="inputNumberParser" style="width: 200px; max-width: 100%"
            @keydown="inputNumberKeydown" />
    </FormItem>

    <FormItem label="Description" name="description"
        :rules="[{ required: true, message: 'Please input description!' }]">
        <Textarea v-model:value="formState.description" placeholder="Input description, eg: Tranfer Bank BCL" />
    </FormItem>

    <FormItem label="Receipt" name="upload" extra="Upload transfer receipt" :rules="[
    { required: true, message: 'Please upload proof of transaction!' }]">
        <Upload v-model:fileList="formState.upload" name="upload" list-type="picture" :max-count="1"
            :before-upload="handleBeforeUpload">
            <Button>
                <template #icon>
                    <UploadOutlined />
                </template>

                Click to upload
            </Button>
        </Upload>
    </FormItem>

    <FormItem :wrapper-col="{ offset: 3 }">
        <Button type="primary" html-type="submit" :loading="isSubmitting">Submit</Button>
    </FormItem>
</Form>
</template>
