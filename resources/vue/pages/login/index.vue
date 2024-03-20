<script lang="ts" setup>
import LayoutContainer from "@/components/layouts/LayoutContainer.vue";
import Logo from "@/components/layouts/Logo.vue";
import { Card, Divider, Segmented } from "ant-design-vue";
import { reactive, ref } from "vue";
import Login from "./Login.vue";
import Register from "./Register.vue";

const segmentData = reactive(["Login", "Register"]);
const segmentValue = ref(segmentData[0]);
</script>

<template>
  <LayoutContainer>
    <div
      class="tw-min-h-screen tw-w-full tw-flex tw-items-center tw-justify-center tw-px-16"
    >
      <div class="tw-flex-grow tw-px-24">
        <div class="tw-flex tw-justify-center tw-mb-16"><Logo /></div>

        <Card>
          <div class="tw-flex tw-justify-center tw-mb-6">
            <Segmented
              v-model:value="segmentValue"
              :options="segmentData"
              size="large"
            />
          </div>

          <div class="tw-flex tw-justify-center tw-items-start tw-grow tw-py-8">
            <div class="tw-flex-grow tw-px-16">
              <Login
                class="tw-transition-opacity"
                :class="{
                  'tw-opacity-25 tw-pointer-events-none':
                    segmentValue !== 'Login',
                }"
              />
            </div>

            <div class="tw-mx-8 tw-self-stretch">
              <Divider type="vertical" style="height: 100%" />
            </div>

            <div class="tw-flex-grow tw-px-16">
              <Register
                class="tw-transition-opacity"
                :class="{
                  'tw-opacity-25 tw-pointer-events-none':
                    segmentValue !== 'Register',
                }"
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  </LayoutContainer>
</template>
