<template>
  <section v-motion-fade>
    <div class="w-full">
      <div class="container mx-auto my-10 h-full">
        <div class="w-full flex justify-between items-center mb-[20px]">
          <div>
            <el-checkbox
              v-model="showAdmins"
              label="Аккаунты сотрудников"
              size="large"
            />
            <el-checkbox
              v-model="showOnlyWithApplications"
              label="Аккаунты только с заявками"
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
        <el-table class="bg-black/[.60] w-full" :data="filteredUsers">
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
                  class="h-[40px] w-[40px] rounded-[100%] object-cover"
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
              <div class="flex flex-row items-center flex-wrap gap-[10px]">
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
                    <el-button type="danger" size="small">
                      <svg
                        class="text-[#f56c6c]"
                        fill="currentColor"
                        width="15px"
                        height="15px"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 408.483 408.483"
                      >
                        <path
                          d="M87.748,388.784c0.461,11.01,9.521,19.699,20.539,19.699h191.911c11.018,0,20.078-8.689,20.539-19.699l13.705-289.316 H74.043L87.748,388.784z M247.655,171.329c0-4.61,3.738-8.349,8.35-8.349h13.355c4.609,0,8.35,3.738,8.35,8.349v165.293 c0,4.611-3.738,8.349-8.35,8.349h-13.355c-4.61,0-8.35-3.736-8.35-8.349V171.329z M189.216,171.329 c0-4.61,3.738-8.349,8.349-8.349h13.355c4.609,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.737,8.349-8.349,8.349h-13.355 c-4.61,0-8.349-3.736-8.349-8.349V171.329L189.216,171.329z M130.775,171.329c0-4.61,3.738-8.349,8.349-8.349h13.356 c4.61,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.738,8.349-8.349,8.349h-13.356c-4.61,0-8.349-3.736-8.349-8.349V171.329z"
                        ></path>
                        <path
                          d="M343.567,21.043h-88.535V4.305c0-2.377-1.927-4.305-4.305-4.305h-92.971c-2.377,0-4.304,1.928-4.304,4.305v16.737H64.916 c-7.125,0-12.9,5.776-12.9,12.901V74.47h304.451V33.944C356.467,26.819,350.692,21.043,343.567,21.043z"
                        ></path>
                      </svg>
                    </el-button>
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
