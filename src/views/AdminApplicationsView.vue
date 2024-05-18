<template>
  <section v-motion-fade>
    <div class="w-full">
      <div class="mx-auto px-[30px] w-full my-10">
        <div class="w-full flex justify-between mb-[20px]">
          <el-radio-group v-model="statusFilter">
            <el-radio
              class="hover:scale-105 hover:transition duration-300"
              label=""
            >
              Все заявки
            </el-radio>
            <el-radio
              class="hover:scale-105 hover:transition duration-300"
              label="PENDING"
            >
              В ожидании
            </el-radio>
            <el-radio
              class="hover:scale-105 hover:transition duration-300"
              label="ACCEPTED"
            >
              Одобренные
            </el-radio>
            <el-radio
              class="hover:scale-105 hover:transition duration-300"
              label="CANCELED"
            >
              Отклоненные
            </el-radio>
          </el-radio-group>

          <div class="flex flex-row flex-wrap gap-[15px]">
            <el-tooltip effect="light" placement="top">
              <template #content>
                <span class="text-white">Поиск заявок по ID</span>
              </template>
              <el-input
                v-model="searchId"
                placeholder="Введите Id заявки"
                @input="validateIdInput"
                clearable
                class="w-[220px]"
              />
            </el-tooltip>
            <el-tooltip effect="light" placement="top">
              <template #content>
                <span class="text-white">Фильтрация заявок по дате</span>
              </template>
              <div>
                <el-date-picker
                  v-model="selectedDate"
                  type="date"
                  class="w-[220px]"
                  placeholder="Выберите дату"
                />
              </div>
            </el-tooltip>
            <el-tooltip effect="light" placement="top">
              <template #content>
                <span class="text-white">Глобальный поиск заявок</span>
              </template>
              <el-input
                v-model="search"
                placeholder="Поиск"
                clearable
                class="w-[220px]"
              />
            </el-tooltip>
          </div>
        </div>
        <el-table
          class="bg-black/[.60] text-[13px] h-[calc(100vh-250px)]"
          :data="filteredApplications"
          style="width: 100%"
        >
          <el-table-column
            width="80px"
            prop="id"
            label="ID"
            sortable
            :sort-method="sortById"
          ></el-table-column>
          <el-table-column
            sortable
            min-width="150px"
            :sort-method="sortByDate"
            prop="createdAt"
            label="Дата создания"
          >
            <template #default="{ row }">
              {{ new Date(row.createdAt).toLocaleString() }}
            </template>
          </el-table-column>
          <el-table-column min-width="300px" prop="userId" label="Пользователь">
            <template #default="{ row }">
              <div class="flex flex-row gap-[5px] items-center">
                <img
                  class="h-[24px] w-[24px] rounded-[100%]"
                  :src="users.find((user) => user.id === row.userId)?.avatarUrl"
                  alt="avatar"
                />
                <span>
                  {{
                    users.find((user) => user.id === row.userId)?.email
                  }}</span
                >
              </div>
            </template>
          </el-table-column>
          <el-table-column min-width="150px" prop="comment" label="Информация">
            <template #default="{ row }">
              <el-button
                type="info"
                size="small"
                @click=";(selectedAppId = row.id), (showComment = true)"
              >
                Посмотреть
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            min-width="150px"
            prop="cost"
            label="Стоимость, руб"
            sortable
            :sort-method="sortByCost"
          ></el-table-column>
          <el-table-column label="Статус" min-width="150px">
            <template #default="{ row }">
              <el-dropdown trigger="click" placement="bottom">
                <el-button size="small" :type="getButtonType(row.status)">
                  {{ localize(row.status) }}
                </el-button>

                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      @click="changeStatus(row.id, 'ACCEPTED')"
                      :disabled="row.status === 'ACCEPTED'"
                      class="text-green-500"
                    >
                      Одобрена
                    </el-dropdown-item>
                    <el-dropdown-item
                      @click="changeStatus(row.id, 'PENDING')"
                      :disabled="row.status === 'PENDING'"
                    >
                      Ожидание
                    </el-dropdown-item>
                    <el-dropdown-item
                      @click="changeStatus(row.id, 'CANCELED')"
                      :disabled="row.status === 'CANCELED'"
                      class="text-red-500"
                    >
                      Отменена
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
          </el-table-column>
          <el-table-column
            class="flex justify-end"
            min-width="150px"
            label="Действия"
          >
            <template #default="{ row }">
              <el-button
                @click="deleteResponsible(row.id)"
                class="group"
                v-if="row.responsibleId"
                size="small"
                type="primary"
              >
                <div
                  class="overflow-hidden justify-center items-center w-[100px] truncate flex"
                >
                  <svg
                    class="group-hover:hidden mr-[3px] flex-none"
                    viewBox="0 0 24 24"
                    width="16px"
                    height="16px"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 21C4 17.4735 6.60771 14.5561 10 14.0709M19.8726 15.2038C19.8044 15.2079 19.7357 15.21 19.6667 15.21C18.6422 15.21 17.7077 14.7524 17 14C16.2923 14.7524 15.3578 15.2099 14.3333 15.2099C14.2643 15.2099 14.1956 15.2078 14.1274 15.2037C14.0442 15.5853 14 15.9855 14 16.3979C14 18.6121 15.2748 20.4725 17 21C18.7252 20.4725 20 18.6121 20 16.3979C20 15.9855 19.9558 15.5853 19.8726 15.2038ZM15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                  <svg
                    class="hidden group-hover:block mr-[3px] flex-none"
                    viewBox="0 0 1024 1024"
                    width="16px"
                    height="16px"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                  >
                    <path
                      fill="currentColor"
                      d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"
                    ></path>
                  </svg>
                  <p class="truncate">
                    {{ usersById[row.responsibleId]?.login }}
                  </p>
                </div>
              </el-button>

              <el-button
                @click="setResponsible(row.id)"
                size="small"
                class="w-[124px]"
                type="success"
                v-else
              >
                В работу
              </el-button>

              <el-popconfirm
                cancel-button-text="Нет"
                confirm-button-text="Да"
                @confirm="removeApplication(row.id)"
                width="160"
                title="Удалить заявку?"
              >
                <template #reference>
                  <el-button type="danger" size="small">Удалить</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </section>
  <el-drawer
    v-model="showComment"
    @close="showComment = false"
    class="text-white min-w-[350px]"
    :title="'Информация о заявке #' + selectedApp?.id"
    direction="rtl"
  >
    <div class="h-full w-full flex flex-col gap-[20px]">
      <router-link :to="`profile/${selectedApp?.userId}`">
        <el-button class="w-full h-[50px] rounded-[6px]"
          >Перейти в профиль пользователя</el-button
        >
      </router-link>
      <div class="border border-[#414243] rounded-[6px]">
        <el-table :data="selectedApp?.pubs" class="rounded-[6px] bg-[#141414]">
          <el-table-column property="name" label="Издание" />
          <el-table-column property="date" label="Дата" />
        </el-table>
      </div>

      <el-card class="rounded-[12px]">
        <div class="overflow-hidden">
          <p class="pb-[10px] text-gray-400">Комментарий</p>
          <div class="break-words">
            <span>
              {{ selectedApp?.comment }}
            </span>
          </div>
        </div>
      </el-card>
    </div>
  </el-drawer>
</template>

<script lang="ts">
import { ElTable, ElTableColumn, ElButton } from 'element-plus'
import { applicationsStore } from '../stores/applications'
import { pubsStore } from '../stores/publications'
import { mapStores } from 'pinia'
import { localizeApplicationStatus } from '../plugins/helpers'
import { Application, ApplicationStatus } from '../types/applicationTypes'
import { defineComponent } from 'vue'
import { userStore } from '../stores/user'
import { usersStore } from '../stores/users'

export default defineComponent({
  name: 'Applications',
  components: { ElTable, ElTableColumn, ElButton },
  computed: {
    ...mapStores(applicationsStore, pubsStore, userStore, usersStore),
    applications() {
      return this.applicationsStore.applications
    },
    selectedApp() {
      const application = this.applications.find(
        (app: Application) => app.id === this.selectedAppId
      )
      if (!application) return null
      const pubs = application.pubs.map((pub) => {
        return {
          id: pub.id,
          date: new Date(pub.date).toLocaleDateString().replaceAll('/', '.'),
          name: this.publicationsStore.publications.find(
            (_pub) => _pub.id === pub.id
          )?.name
        }
      })
      return { ...application, pubs }
    },
    user() {
      return this.userStore.user
    },
    users() {
      return this.usersStore.users
    },
    usersById() {
      return this.usersStore.usersById
    },
    filteredApplications() {
      let filteredApps = this.applications

      if (this.selectedDate) {
        const date = new Date(this.selectedDate)
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear()
        const formattedDate = `${day}.${month}.${year}`
        filteredApps = filteredApps.filter((app) =>
          app.pubs.some((pub) => pub.date === formattedDate)
        )
      }

      if (this.searchId) {
        const keyword = this.searchId.toLowerCase().trim()
        filteredApps = filteredApps.filter((app) =>
          String(app.id).includes(keyword)
        )
      }

      if (this.search) {
        const keyword = this.search.toLowerCase().trim()
        filteredApps = filteredApps.filter((app) => {
          return (
            this.users
              .find((user) => user.id === app.userId)
              ?.login.toLowerCase()
              .includes(keyword) ||
            (app.comment && app.comment.toLowerCase().includes(keyword)) ||
            app.cost.toString().includes(keyword) ||
            app.pubs.some((pub) => pub.date.toLowerCase().includes(keyword))
          )
        })
      }

      if (this.statusFilter) {
        filteredApps = filteredApps.filter(
          (app) => app.status === this.statusFilter
        )
      }
      filteredApps.sort((a, b) => b.id - a.id)
      return filteredApps
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
      selectedDate: null,
      search: '',
      searchId: '',
      statusFilter: '',
      selectedAppId: null,
      showComment: false
    }
  },
  methods: {
    sortById(a: Application, b: Application) {
      return a.id - b.id
    },
    sortByCost(a: Application, b: Application) {
      return a.cost - b.cost
    },
    localize(status: ApplicationStatus) {
      return localizeApplicationStatus(status)
    },
    getButtonType(status: ApplicationStatus) {
      if (status === 'ACCEPTED') return 'success'
      if (status === 'CANCELED') return 'danger'
      if (status === 'PENDING') return 'info'
    },
    sortByDate(a: Application, b: Application) {
      const aDate = new Date(a.createdAt).getTime()
      const bDate = new Date(b.createdAt).getTime()
      return aDate - bDate
    },
    validateIdInput() {
      this.searchId = this.searchId.replace(/[^0-9.]/g, '')
    },
    changeStatus(id: number, status: ApplicationStatus) {
      this.applicationsStore.changeApplicationStatus(id, status)
    },
    setResponsible(id: number) {
      if (this.user)
        this.applicationsStore.setApplicationResponsible(id, this.user.id)
    },
    deleteResponsible(id: number) {
      this.applicationsStore.setApplicationResponsible(id, null)
    },
    async removeApplication(applicationId: number) {
      await this.applicationsStore.deleteApplication(applicationId)
    }
  }
})
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
</style>
