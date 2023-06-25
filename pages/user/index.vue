<script setup lang="ts">
import { CreateUser } from "entities/user.entity"
import { Role } from "entities/role.entity"
import { ElNotification } from 'element-plus'
import type { Header, Item,ServerOptions } from "vue3-easy-data-table";

definePageMeta({title:"User Management",breadcrumb:"User Management",middleware:'auth'})
const roles = ref<Role[] | null>()
const role = await useFetch<Role[]>('/api/role')
roles.value = role.data.value
const showDialog = ref<boolean>(false)
const form = reactive<CreateUser>({
  name: '',
  email: '',
  role_id: 1,
})
const headers: Header[] = [
  { text: "NAMA", value: "name" },
  { text: "EMAIL", value: "email"},
  { text: "ROLE", value: "role.name"},
];
const serverOptions = ref<ServerOptions>({
    page: 1,
    rowsPerPage: 5,
    sortBy: 'created_at',
    sortType: 'asc',
  });
  const loading = ref(false)
  const items = ref<Item[]>([])
  const totalItem = ref<number>()
  const keyTable = ref<number>(1)
  async function load() {
    try {
      loading.value = true
      const { data } = await useFetch("/api/user", {params:{
          skip: serverOptions.value.page,
          take: serverOptions.value.rowsPerPage,
          sortBy: serverOptions.value.sortBy,
          sortType: serverOptions.value.sortType
      }})
      items.value = data.value?.data as Item[]
      console.log(items.value)
      totalItem.value = data.value?.totalData
      loading.value = false

    } catch (error: any) {
      console.error(error)
      loading.value = false
    }
  }

// initial load
load();

watch(serverOptions, (value) => { load();keyTable.value++ }, { deep: true });
async function submit() {
  loading.value = true
  const { data, error } = await useFetch("/api/user", { method: "POST", body: form })
  loading.value = false
  await load()
  console.log(error.value)
  if (error.value) {
    ElNotification({
      title: 'Error',
      message: error.value?.message,
      type: 'error',
    })
    return
  }
  console.log(data.value)
  ElNotification({
    title: 'Success',
    message: "Data berhasil disimpan",
    type: 'success',
  })
  showDialog.value = false
}
</script>

<template>
  <el-card class="box-card" shadow="never">
    <template #header>
      <div class="flex justify-between">
        <span>User Management</span>
        <el-button class="button" @click="showDialog = true" text>Tambah</el-button>
      </div>
    </template>
    <DataTable :key="keyTable" v-model:server-options="serverOptions" :headers="headers" :items="items" :loading="loading" :server-items-length="totalItem" buttons-pagination></DataTable>
  </el-card>
  <el-dialog v-model="showDialog" title="Tambah User">
    <el-form label-position="top" :model="form">
      <el-form-item label="Nama">
        <el-input v-model="form.name" autocomplete="off" size="large" />
      </el-form-item>

      <el-form-item label="Email">
        <el-input v-model="form.email" autocomplete="off" size="large" />
      </el-form-item>
      <el-form-item label="Role">
        <el-select v-model="form.role_id" class="w-full" placeholder="Select" size="large">
          <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>

    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showDialog = false">Cancel</el-button>
        <el-button type="primary" @click="submit" :loading="loading">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
