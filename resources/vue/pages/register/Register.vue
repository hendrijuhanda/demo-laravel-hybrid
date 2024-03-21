<script lang="ts" setup>
import { useAuth } from "@/stores/auth";
import { registerRequest } from '@/utils/api-client';
import { Button, Form, FormItem, Input, InputPassword, notification } from "ant-design-vue";
import { RuleObject } from "ant-design-vue/es/form";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const { isAuthenticated, user } = useAuth();

interface FormState {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

const formState = reactive<FormState>({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
});

const isSubmitting = ref<boolean>(false);
const router = useRouter();

const validatePasswordConfirmation = async (_rule: RuleObject, value: string) => {
    if (value !== formState.password) {
        return Promise.reject("Password confirmation is not match!");
    } else {
        return Promise.resolve();
    }
};

const onFinish = async (values: any) => {
    isSubmitting.value = true;

    const res = await registerRequest({
        name: values.name,
        email: values.email,
        password: values.password,
        password_confirmation: values.password_confirmation
    }).catch(e => {
        notification.error({
            message: e?.response?.status === 422 ? 'Bad Request' : 'Something went wrong',
            description: e?.response?.status === 422 ? e?.response?.data?.message :
                e?.message,
        });
    });

    if (res) {
        const { status } = res;

        if (status === 200) {
            notification.success({
                message: 'Congratulation',
                description: 'Your account has been successfully registered. Please login using your credential.',
            });


            router.push('/login')
        }
    }

    isSubmitting.value = false;
};
</script>

<template>
<div>
    <div v-if="isAuthenticated">
        <div class="tw-text-center tw-mb-8">You are currently logged in as <span class="tw-text-primary-500">{{
        user.name }}</span>. Please logout first to
            register as a new user.</div>

        <div class="tw-flex tw-justify-center">
            <Button type="primary" @click="$router.push('/')">Back to Home</Button>
        </div>
    </div>

    <div v-else>
        <h2 class="tw-font-semibold tw-text-lg tw-mb-8 tw-text-center">Register</h2>

        <Form :model="formState" @finish="onFinish">
            <FormItem name="name" :rules="[{ required: true, message: 'Please input fullname!' }]">
                <Input v-model:value="formState.name" placeholder="Fullname" />
            </FormItem>

            <FormItem name="email"
                :rules="[{ required: true, message: 'Please input email!' }, { type: 'email', message: 'Invalid email format!' }]">
                <Input v-model:value="formState.email" placeholder="Email" />
            </FormItem>

            <FormItem name="password"
                :rules="[{ required: true, message: 'Please input password!' }, { min: 6, message: '6 Minimun characters!' }]">
                <InputPassword v-model:value="formState.password" placeholder="Password" />
            </FormItem>

            <FormItem name="password_confirmation"
                :rules="[{ required: true, message: 'Please input password confirmation!' }, { validator: validatePasswordConfirmation }]">
                <InputPassword v-model:value="formState.password_confirmation" placeholder="Confirm Password" />
            </FormItem>

            <div>
                <Button type="primary" html-type="submit" :loading="isSubmitting">Register</Button>
            </div>
        </form>

        <div class="tw-mt-8">
            Have an account? <RouterLink to="/login">Login</RouterLink>
        </div>
    </div>
</div>
</template>
