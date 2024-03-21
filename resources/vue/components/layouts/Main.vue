<script lang="ts" setup>
import { useAuth } from "@/stores/auth";
import { logoutRequest } from '@/utils/api-client';
import { LogoutOutlined, UserOutlined } from "@ant-design/icons-vue";
import { Avatar, Dropdown, Menu, MenuItem, notification } from "ant-design-vue";
import { useRouter } from "vue-router";
import LayoutContainer from "./LayoutContainer.vue";
import Logo from "./Logo.vue";

const { user, setToken, setUser, setIsAuthenticated } = useAuth()
const router = useRouter();

const handleLogout = () => {
    logoutRequest().then(() => {
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);

        router.replace('/login')
    }).catch(e => {
        if (e?.response) {
            notification.error({
                message: 'Something went wrong', description: e?.message
            })
        }
    })
}
</script>

<template>
<LayoutContainer>
    <div class="tw-min-h-screen tw-flex tw-flex-col">
        <header class="tw-flex-shrink-0 tw-flex tw-items-center tw-justify-between tw-py-6 tw-mb-6">
            <div>
                <Logo class="tw-h-6" />
            </div>

            <div class="tw-flex tw-items-center ">
                <div class="tw-mr-4">Hi, {{ user.name }}</div>

                <Dropdown :trigger="['click']" placement="bottomRight">
                    <Avatar class="tw-cursor-pointer">
                        <template #icon>
                            <UserOutlined />
                        </template>
                    </Avatar>

                    <template #overlay>
                        <Menu style="width: 150px;">
                            <MenuItem @click="handleLogout">
                            <div class="tw-flex tw-items-center tw-justify-between">
                                <div>Logout</div>
                                <div>
                                    <LogoutOutlined />
                                </div>
                            </div>
                            </MenuItem>
                        </Menu>
                    </template>
                </Dropdown>
            </div>

        </header>

        <main class="tw-flex-grow">
            <slot />
        </main>

        <footer class="tw-flex-shrink-0 tw-text-xs tw-py-4">
            YUKK Fullstack Test &copy; Hendri Juhanda
        </footer>
    </div>
</LayoutContainer>
</template>
