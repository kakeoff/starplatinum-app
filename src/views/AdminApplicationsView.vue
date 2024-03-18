<template>
  <section v-motion-fade>
    <h2 class="category-heading mx-auto">Заявки</h2>
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
          class="bg-black/[.60] text-[13px]"
          :data="filteredApplications"
          style="width: 100%"
        >
          <el-table-column width="50px" prop="id" label="Id"></el-table-column>
          <el-table-column
            width="300"
            prop="name"
            label="Организация"
          ></el-table-column>
          <el-table-column
            width="300"
            prop="email"
            label="Email"
          ></el-table-column>
          <el-table-column prop="userId" label="Пользователь">
            <template #default="{ row }">
              <div class="flex flex-row gap-[5px] items-center">
                <img
                  class="h-[24px] w-[24px] rounded-[100%]"
                  :src="
                    getUserAvatar(
                      users.find((user) => user.id === row.userId)?.avatarUrl
                    )
                  "
                  alt="avatar"
                />
                <span>
                  {{
                    users.find((user) => user.id === row.userId)?.login
                  }}</span
                >
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="comment" label="Инфромация">
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
          <el-table-column prop="cost" label="Стоимость, руб"></el-table-column>
          <el-table-column label="Статус">
            <template #default="{ row }">
              <el-dropdown trigger="click" placement="bottom">
                <el-button size="small" :type="getButtonType(row.status)">
                  <div class="w-[100px]">
                    {{ localize(row.status) }}
                  </div>
                </el-button>

                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      @click="changeStatus(row.id, 'ACCEPTED')"
                      :disabled="row.status === 'ACCEPTED'"
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
                    >
                      Отменена
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
          </el-table-column>
          <el-table-column label="Действия">
            <template #default="{ row }">
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
    class="text-white"
    :title="'Информация о заявке #' + selectedApp?.id"
    direction="rtl"
  >
    <div class="mb-[20px]">Издания</div>
    <el-table class="mb-[50px]" :data="selectedApp?.pubs">
      <el-table-column property="name" label="Название" />
      <el-table-column property="date" label="Дата" />
    </el-table>
    <div class="mb-[20px]">Комментарий</div>
    <el-card class="rounded-[12px]">
      <div class="overflow-hidden break-words">
        <div class="top-0 break-words">
          {{ selectedApp?.comment }}
        </div>
      </div>
    </el-card>
  </el-drawer>
</template>

<script lang="ts">
import { ElTable, ElTableColumn, ElButton, ElNotification } from 'element-plus'
import { applicationsStore } from '../stores/applications'
import { pubsStore } from '../stores/publications'
import { mapStores } from 'pinia'
import { localizeApplicationStatus } from '../plugins/helpers'
import { Application, ApplicationStatus } from '../types/applicationTypes'
import { App, defineComponent } from 'vue'
import { changeApplicationStatus } from '../services/applications.service'
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
      return (
        this.applicationsStore.applications.find(
          (app: Application) => app.id === this.selectedAppId
        ) || null
      )
    },
    user() {
      return this.userStore.user
    },
    users() {
      return this.usersStore.users
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
            app.name.toLowerCase().includes(keyword) ||
            app.email.toLowerCase().includes(keyword) ||
            (app.comment && app.comment.toLowerCase().includes(keyword)) ||
            app.cost.toString().includes(keyword) ||
            app.pubs.some(
              (pub) =>
                pub.name.toLowerCase().includes(keyword) ||
                pub.date.toLowerCase().includes(keyword)
            )
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
      showComment: false,
      visiblePopover: false
    }
  },
  methods: {
    localize(status: ApplicationStatus) {
      return localizeApplicationStatus(status)
    },
    getUserAvatar(url: string | undefined) {
      if (!url) return
      return `${import.meta.env.VITE_SERVER_URL}${url}`
    },
    getButtonType(status: ApplicationStatus) {
      if (status === 'ACCEPTED') return 'success'
      if (status === 'CANCELED') return 'danger'
      if (status === 'PENDING') return 'info'
    },
    validateIdInput() {
      this.searchId = this.searchId.replace(/[^0-9.]/g, '')
    },
    changeStatus(id: number, status: ApplicationStatus) {
      this.applicationsStore.changeApplicationStatus(id, status)
      this.visiblePopover = false
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
