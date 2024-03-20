<script lang="ts" setup>
import { LogoutOutlined, UserOutlined } from "@ant-design/icons-vue";
import { Avatar, Dropdown, Menu, MenuItem } from "ant-design-vue";
import LayoutContainer from "./LayoutContainer.vue";
import Logo from "./Logo.vue";
</script>

<template>
  <LayoutContainer>
    <div class="tw-min-h-screen tw-flex tw-flex-col">
      <header
        class="tw-flex-shrink-0 tw-flex tw-items-center tw-justify-between tw-py-6 tw-mb-6"
      >
        <div><Logo class="tw-h-6" /></div>

        <Dropdown :trigger="['click']">
          <div class="tw-flex tw-items-center tw-cursor-pointer">
            <div class="tw-mr-4">Hi, Jhon</div>

            <Avatar>
              <template #icon>
                <UserOutlined />
              </template>
            </Avatar>
          </div>
          <template #overlay>
            <Menu>
              <MenuItem>
                <div class="tw-flex tw-items-center tw-justify-between">
                  <div>Logout</div>
                  <div><LogoutOutlined /></div>
                </div>
              </MenuItem>
            </Menu>
          </template>
        </Dropdown>
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
