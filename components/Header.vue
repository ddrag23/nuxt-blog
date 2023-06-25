<script setup lang="ts">
import { Bell, UserFilled } from "@element-plus/icons-vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const {signOut} = useAuth()
const buttons = [
  {
    text: "Profil",
    icon: "fa-solid fa-user",
    onClick: () => router.push("/"),
  },
  {
    text: "Logout",
    icon: "fa-solid fa-arrow-right-from-bracket",
    onClick: async () => {
      await signOut()
    },
  },
];
</script>
<template>
  <div class="flex justify-between items-center">
    <div class="flex items-center">
      <button
        type="button"
        id="navbar-button"
        class="text-black font-medium text-sm px-2.5 text-center inline-flex items-center mr-2 md:hidden"
        @click="$emit('toggleSidebar', true)"
      >
        <i class="text-2xl fa-solid fa-bars"></i>
      </button>
      <div v-if="route.path == '/'">
        <p class="text-2xl font-bold">Hello Everyone</p>
        <small class="text-slate-400">Lets check data today</small>
      </div>
      <div v-else>
        <p class="md:text-2xl text-xl font-bold">{{ route.meta.title }}</p>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
          <el-breadcrumb-item
            ><a href="/">{{ route.meta.breadcrumb }}</a></el-breadcrumb-item
          >
        </el-breadcrumb>
      </div>
    </div>

    <div class="flex">
      <el-button :icon="Bell" size="large" />
      <el-popover placement="bottom" :width="200" trigger="click">
        <template #reference>
          <el-button :icon="UserFilled" size="large"></el-button>
        </template>
        <div class="flex flex-col g-2">
          <div
            class="p-2 border-b border-t flex items-center gap-2 cursor-pointer"
            v-for="button in buttons"
            :key="button.text"
            @click="button.onClick"
          >
            <!-- <font-awesome-icon :icon="button.icon" /> -->
            {{ button.text }}
          </div>
        </div>
      </el-popover>
      <slot name="toolbar" />
    </div>
  </div>
</template>
