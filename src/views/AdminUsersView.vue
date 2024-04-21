<template>
  <section v-motion-fade>
    <h2 class="category-heading mx-auto">Пользователи</h2>

    <div class="w-full">
      <div class="container mx-auto my-10 h-full">
        <div class="w-full flex gap-[15px] justify-end mb-[20px]">
          <el-tooltip effect="light" placement="top">
            <template #content>
              <span class="text-white">Глобальный поиск пользователей</span>
            </template>
            <el-input
              v-model="search"
              placeholder="Поиск"
              clearable
              class="w-[300px] ml-[0px]"
            />
          </el-tooltip>
        </div>
        <el-table
          class="bg-black/[.60]"
          :data="filteredUsers"
          style="width: auto"
        >
          <el-table-column label="ID">
            <template #default="{ row }">
              {{ row.id }}
            </template>
          </el-table-column>
          <el-table-column label="Пользователь">
            <template #default="{ row }">
              <div class="flex flex-row gap-[5px] items-center">
                <img
                  class="h-[40px] w-[40px] rounded-[100%]"
                  :src="getUserAvatar(row.avatarUrl)"
                  alt="avatar"
                />
                <div class="flex flex-col">
                  <span> {{ row.login }}</span>
                  <span class="text-[11px] mt-[-7px] text-gray-500">{{
                    row.email
                  }}</span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Роль">
            <template #default="{ row }">
              <el-dropdown trigger="click" placement="bottom">
                <el-button size="small" :type="getRoleButtonType(row.role)">
                  <div class="w-[100px]">
                    {{
                      roles.find((role) => role.value === row.role)?.label ||
                      row.role
                    }}
                  </div>
                </el-button>

                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      v-for="role in roles"
                      @click="updateUserRole(row.id, role.value)"
                      :disabled="row.role === role.value"
                      class="text-green-500"
                    >
                      {{ role.label }}
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
          </el-table-column>
          <el-table-column label="Создан">
            <template #default="{ row }">
              {{ new Date(row.createdAt).toLocaleString() }}
            </template>
          </el-table-column>
          <el-table-column label="Действия">
            <template #default="{ row }">
              <div class="flex flex-row items-center flex-wrap gap-[5px]">
                <router-link :to="`profile/${row.id}`">
                  <el-button type="info" size="small">
                    Перейти в профиль
                  </el-button>
                </router-link>
                <el-popconfirm
                  cancel-button-text="Нет"
                  confirm-button-text="Да"
                  @confirm="removeUser(row.id)"
                  title="Удалить?"
                >
                  <template #reference>
                    <el-button type="danger" size="small">Удалить</el-button>
                  </template>
                </el-popconfirm>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { ElTable, ElTableColumn, ElButton, ElNotification } from 'element-plus'
import { applicationsStore } from '../stores/applications'
import { pubsStore } from '../stores/publications'
import { mapStores } from 'pinia'
import { userStore } from '../stores/user'
import { usersStore } from '../stores/users'
import { defineComponent } from 'vue'
import { User, UserRole } from '../types/userTypes'

export default defineComponent({
  name: 'Applications',
  components: { ElTable, ElTableColumn, ElButton },
  computed: {
    ...mapStores(pubsStore, applicationsStore, userStore, usersStore),
    users() {
      return this.usersStore.users
    },
    user() {
      return this.userStore.user
    },
    filteredUsers() {
      let filteredUsers = this.users

      if (this.search) {
        const keyword = this.search.toLowerCase().trim()
        filteredUsers = filteredUsers.filter((user) => {
          return (
            user.login.toLowerCase().includes(keyword) ||
            user.id === Number(keyword)
          )
        })
      }
      filteredUsers.sort((a: User, b: User) => b.id - a.id)
      return filteredUsers
    }
  },
  watch: {
    user(user) {
      if (user && user?.role === 0) {
        this.$router.push('/')
      }
    }
  },
  data() {
    return {
      search: '',
      roles: [
        {
          label: 'Пользователь',
          value: 0
        },
        {
          label: 'Админ',
          value: 1
        }
      ],
      userRules: {
        role: [
          {
            required: true,
            message: 'Введите роль',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    getRoleButtonType(role: UserRole) {
      if (role === UserRole.admin) return 'success'
      if (role === UserRole.user) return 'info'
      return 'danger'
    },
    async removeUser(id: number) {
      await this.publicationsStore.deletePublication(Number(id))
    },

    getUserAvatar(url: string) {
      return `${import.meta.env.VITE_SERVER_URL}${url}`
    },

    async updateUserRole(id: number, role: UserRole) {
      try {
        await this.usersStore.updateUserRole({ id, role })
        ElNotification({
          title: 'Роль пользователя изменена',
          type: 'success'
        })
      } catch (err) {
        console.error(err)
        ElNotification({
          title: 'Ошибка',
          message: 'Не удалось изменить роль',
          type: 'error'
        })
      }
    }
  }
})
</script>
