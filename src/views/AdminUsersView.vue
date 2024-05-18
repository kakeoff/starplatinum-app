<template>
  <section v-motion-fade>
    <div class="w-full">
      <div class="container mx-auto my-10 h-full">
        <div class="w-full flex justify-between items-center mb-[20px]">
          <div>
            <el-checkbox v-model="showAdmins" label="Админы" size="large" />
            <el-checkbox
              v-model="showOnlyWithApplications"
              label="Только с заявками"
              size="large"
            />
          </div>
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
          class="bg-black/[.60] w-full h-[calc(100vh-250px)]"
          :data="filteredUsers"
        >
          <el-table-column
            label="ID"
            width="80px"
            sortable
            :sort-method="sortById"
          >
            <template #default="{ row }">
              {{ row.id }}
            </template>
          </el-table-column>
          <el-table-column min-width="300px" label="Пользователь">
            <template #default="{ row }">
              <div class="flex flex-row gap-[5px] items-center">
                <img
                  class="h-[40px] w-[40px] rounded-[100%]"
                  :src="row.avatarUrl"
                  alt="avatar"
                />
                <div class="flex flex-col">
                  <span> {{ row.login }}</span>
                  <span class="text-[12px] text-gray-400">{{ row.email }}</span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column min-width="150px" label="Роль">
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
          <el-table-column
            min-width="300px"
            label="Активность"
            sortable
            :sort-method="sortByLastVisitDate"
          >
            <template #default="{ row }">
              {{
                new Date(
                  row.lastVisitDate ? row.lastVisitDate : row.createdAt
                ).toLocaleString()
              }}
            </template>
          </el-table-column>
          <el-table-column
            width="80px"
            label="Заявки"
            sortable
            :sort-method="sortByApplicationsCount"
          >
            <template #default="{ row }">
              <el-tag
                class="font-[700]"
                :type="applicationsCountByUserId[row.id] ? 'danger' : 'info'"
              >
                {{ applicationsCountByUserId[row.id] || 0 }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column min-width="300px" label="Действия">
            <template #default="{ row }">
              <div class="flex flex-row items-center flex-wrap gap-[5px]">
                <router-link :to="`profile/${row.id}`">
                  <el-button type="info" size="small"> Профиль </el-button>
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
    applicationsCountByUserId() {
      return this.applicationsStore.applicationsCountByUserId
    },
    filteredUsers() {
      let filteredUsers = this.users

      if (this.search) {
        const keyword = this.search.toLowerCase().trim()
        filteredUsers = filteredUsers.filter((user) => {
          return (
            user.login.toLowerCase().includes(keyword) ||
            user.id === Number(keyword) ||
            user.email.toLowerCase().includes(keyword)
          )
        })
      }
      return filteredUsers
        .sort((a, b) => a.id - b.id)
        .filter((user) => {
          if (user.role === UserRole.admin && !this.showAdmins) {
            return false
          }
          if (
            !!this.applicationsCountByUserId[user.id] === false &&
            this.showOnlyWithApplications
          ) {
            return false
          }
          return true
        })
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
      showAdmins: false,
      showOnlyWithApplications: false,
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
    sortByApplicationsCount(a: User, b: User) {
      const aCount = this.applicationsCountByUserId[a.id] || 0
      const bCount = this.applicationsCountByUserId[b.id] || 0

      return aCount - bCount
    },

    sortById(a: User, b: User) {
      return a.id - b.id
    },

    sortByLastVisitDate(a: User, b: User) {
      const aDate = new Date(
        a.lastVisitDate ? a.lastVisitDate : a.createdAt
      ).getTime()
      const bDate = new Date(
        b.lastVisitDate ? b.lastVisitDate : b.createdAt
      ).getTime()
      return aDate - bDate
    },
    getRoleButtonType(role: UserRole) {
      if (role === UserRole.admin) return 'success'
      if (role === UserRole.user) return 'info'
      return 'danger'
    },
    async removeUser(id: number) {
      await this.publicationsStore.deletePublication(Number(id))
    },

    async updateUserRole(id: number, role: UserRole) {
      try {
        await this.usersStore.updateUserRole({ id, role })
        await this.applicationsStore.getAllApplications() //for changing responsibleId locally
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
