<script setup lang="ts">
import { ref } from "vue";

const t = ref(false);
function toggleSidebar(param: boolean) {
  t.value = param;
  console.log(param);
}
</script>

<template>
    <section class="flex w-full min-h-screen">
      <Sidebar
        class="z-40 fixed md:static md:w-1/5 p-5 bg-white h-screen md:block overflow-auto border border-e-{F6F6F6}"
        :class="t ? 'w-full' : 'hidden'"
        @hiddenSidebar="toggleSidebar"
      />
      <main class="p-5 md:p-10 w-full">
        <Header class="mb-10" @toggleSidebar="toggleSidebar" />
        <slot />
      </main>
    </section>
</template>
