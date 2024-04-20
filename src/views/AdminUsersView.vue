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
                  class="h-[24px] w-[24px] rounded-[100%]"
                  :src="getUserAvatar(row.avatarUrl)"
                  alt="avatar"
                />
                <span> {{ row.login }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Роль">
            <template #default="{ row }">
              {{
                roles.find((role) => role.value === row.role)?.label || row.role
              }}
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
                <div>
                  <el-button
                    type="info"
                    size="small"
                    @click=";(showUpdateUser = true), (selectedUser = row)"
                  >
                    Редактировать
                  </el-button>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </section>

  <el-dialog
    v-model="showUpdateUser"
    width="25%"
    title="Редактировать пользователя"
  >
    <div class="flex justify-center w-full min-h-full">
      <el-form
        ref="userForm"
        :model="userForm"
        :rules="userRules"
        class="font-[700] w-full text-[35px]"
      >
        <span class="text-[16px]">Роль</span>
        <el-form-item class="mb-[10px]" prop="description">
          <el-select
            v-model="userForm.role"
            style="width: 100%"
            placeholder="Выберите роль"
          >
            <el-option
              v-for="item in roles"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="danger" @click="showUpdateUser = false">
          Отмена
        </el-button>
        <el-button type="success" @click="updateUserRole()">
          Сохранить
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { ElTable, ElTableColumn, ElButton, ElNotification } from 'element-plus'
import { applicationsStore } from '../stores/applications'
import { pubsStore } from '../stores/publications'
import { mapStores } from 'pinia'
import { userStore } from '../stores/user'
import { usersStore } from '../stores/users'
import { defineComponent } from 'vue'
import { User } from '../types/userTypes'

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
    },
    showUpdateUser: {
      immediate: true,
      handler: function (val) {
        if (val === false) {
          this.resetFields()
        } else {
          if (!this.selectedUser) return
          this.userForm.role = this.selectedUser.role
        }
      }
    }
  },
  data() {
    return {
      selectedDate: null,
      showDescription: false,
      showUpdateUser: false,
      selectedUser: null as User | null,
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
      userForm: {
        role: 0
      },
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
    async removeUser(id: number) {
      await this.publicationsStore.deletePublication(Number(id))
    },

    getUserAvatar(url: string) {
      return `${import.meta.env.VITE_SERVER_URL}${url}`
    },

    updateUserRole() {
      if (!this.selectedUser) return
      const data = {
        id: this.selectedUser.id,
        role: Number(this.userForm.role)
      }
      this.usersStore.updateUserRole(data)
      this.showUpdateUser = false
    },
    resetFields() {
      this.userForm.role = 0
    }
  }
})
</script>
