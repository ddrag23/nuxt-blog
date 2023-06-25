<script setup lang="ts">
import { useRoute } from "vue-router";
const route = useRoute();
const menu = useMenu();
</script>
<template>
  <section>
    <div class="flex justify-between md:justify-center items-center">
      <h1
        class="text-xl md:text-2xl font-bold text-left pl-5 md:pl-0 md:text-center mt-5 mb-5"
      >
        TW Admin
      </h1>
      <button
        class="text-black font-medium text-sm px-2.5 text-center inline-flex items-center mr-2 md:hidden"
        @click="$emit('hiddenSidebar', false)"
      >
      <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
    <el-menu
      router
      default-active="/"
      active-text-color="rgb(29 78 216)"
      class="el-menu-vertical-demo"
    >
      <template v-for="(item, key) in menu" :key="key">
        <el-menu-item
          :index="item.path"
          v-if="item.sub_menu == undefined"
          @click="$emit('hiddenSidebar', false)"
        >
          <el-icon><component :is="item.icon" /></el-icon>
          <span>{{ item.title }}</span>
        </el-menu-item>
        <el-sub-menu :index="item.path" v-else>
          <template #title>
            <el-icon><component :is="item.icon" /></el-icon>
            <span>{{ item.title }}</span>
          </template>
          <template v-for="(subMenu, i) in item.sub_menu" :key="i">
            <el-menu-item
              :index="subMenu.path"
              @click="$emit('hiddenSidebar', false)"
              >{{ subMenu.title }}</el-menu-item
            >
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </section>
</template>
<style scoped lang="postcss">
.el-menu {
  border-right: none;
}
</style>
