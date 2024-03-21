<script lang="ts" setup>
import { useAuth } from '@/stores/auth';
import { loginRequest } from '@/utils/api-client';
import { Button, Form, FormItem, Input, InputPassword, notification } from "ant-design-vue";
import { reactive, ref } from "vue";
import { useRouter } from 'vue-router';

interface FormState {
    email: string;
    password: string;
}

const formState = reactive<FormState>({
    email: "",
    password: "",
});

const isSubmitting = ref<boolean>(false);

const { setIsAuthenticated, setToken, setUser } = useAuth();

const router = useRouter();

const onFinish = async (values: any) => {
    isSubmitting.value = true;

    const res = await loginRequest({
        email: values.email,
        password: values.password
    }).catch(e => {
        notification.error({
            message: e?.response?.status === 401 ? 'Unauthorized' : 'Something went wrong',
            description: e?.response?.status === 401 ? 'Your submitted credential did\'t match any data.' :
                e?.message,
        });
    });

    if (res) {
        const { data } = res;

        setIsAuthenticated(true)
        setToken(data.data.token)
        setUser({
            email: data.data.email,
            name: data.data.name
        })

        router.push('/')
    }

    isSubmitting.value = false;
};
</script>

<template>
<div>
    <h2 class="tw-font-semibold tw-text-lg tw-mb-8 tw-text-center">Login</h2>

    <Form :model="formState" @finish="onFinish">
        <FormItem name="email" :rules="[{ required: true, message: 'Please input email!' }]">
            <Input v-model:value="formState.email" placeholder="Email" />
        </FormItem>

        <FormItem name="password" :rules="[{ required: true, message: 'Please input password!' }]">
            <InputPassword v-model:value="formState.password" placeholder="Password" />
        </FormItem>

        <div>
            <Button type="primary" html-type="submit" :loading="isSubmitting">Login</Button>
        </div>
    </form>

    <div class="tw-mt-8">
        Dont have an account? <RouterLink to="/register">Register</RouterLink>
    </div>
</div>
</template>
