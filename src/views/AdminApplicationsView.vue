<template>
  <section class="about applications-section">
    <h2 class="category-heading mx-auto">Заявки</h2>

    <div class="w-full" v-motion-pop>
      <div class="mx-auto px-[30px] my-10">
        <div class="w-full flex justify-end gap-[10px] mb-[20px]">
          <el-input
            v-model="searchId"
            placeholder="Введите Id заявки"
            clearable
            class="w-[300px]"
          />
          <el-date-picker
            v-model="selectedDate"
            type="date"
            placeholder="Выберите дату"
          />
          <el-input
            v-model="search"
            placeholder="Поиск"
            clearable
            class="w-[300px]"
          />
        </div>
        <el-table
          class="bg-black/[.60] rounded-b-[16px]"
          :data="filteredApplications"
          style="width: 100%"
        >
          <el-table-column width="50px" prop="id" label="Id"></el-table-column>
          <el-table-column prop="name" label="Название"></el-table-column>
          <el-table-column prop="email" label="Email"></el-table-column>
          <el-table-column label="Издания">
            <template #default="{ row }">
              <ul>
                <li v-for="pub in row.pubs">{{ pub.name }}</li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column label="Дата размещения">
            <template #default="{ row }">
              <ul>
                <li v-for="pub in row.pubs">{{ pub.date }}</li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column prop="comment" label="Комментарий">
            <template #default="{ row }">
              <el-button
                type="info"
                size="small"
                @click="(selectedApp = row), (showComment = true)"
              >
                Посмотреть
              </el-button>
            </template>
          </el-table-column>
          <el-table-column prop="cost" label="Стоимость, руб"></el-table-column>
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
  <el-dialog
    v-model="showComment"
    width="30%"
    :title="'Комментарий к заявке ' + selectedApp.name"
  >
    <div class="overflow-hidden break-words">
      <div class="top-0 break-words">
        {{ selectedApp.comment }}
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="(showComment = false), (selectedApp = {})">
          Закрыть
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ElTable, ElTableColumn, ElButton, ElNotification } from "element-plus";
import { applicationsStore } from "../stores/applications";
import { pubsStore } from "../stores/publications";
import { mapStores } from "pinia";

export default {
  name: "Applications",
  components: { ElTable, ElTableColumn, ElButton },
  computed: {
    ...mapStores(applicationsStore, pubsStore),
    applications() {
      return this.applicationsStore.applications;
    },
    filteredApplications() {
      let filteredApps = this.applications;

      if (this.selectedDate) {
        const date = new Date(this.selectedDate);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        const formattedDate = `${day}.${month}.${year}`;
        filteredApps = filteredApps.filter((app) =>
          app.pubs.some((pub) => pub.date === formattedDate)
        );
      }

      if (this.searchId) {
        const keyword = this.searchId.toLowerCase().trim();
        filteredApps = filteredApps.filter((app) =>
          String(app.id).includes(keyword)
        );
      }

      if (this.search) {
        const keyword = this.search.toLowerCase().trim();
        filteredApps = filteredApps.filter((app) => {
          return (
            app.name.toLowerCase().includes(keyword) ||
            app.email.toLowerCase().includes(keyword) ||
            app.comment.toLowerCase().includes(keyword) ||
            app.cost.toString().includes(keyword) ||
            app.pubs.some(
              (pub) =>
                pub.name.toLowerCase().includes(keyword) ||
                pub.date.toLowerCase().includes(keyword)
            )
          );
        });
      }

      return filteredApps;
    },
  },
  data() {
    return {
      selectedDate: null,
      search: "",
      searchId: "",
      selectedApp: {},
      showComment: false,
    };
  },
  methods: {
    async removeApplication(applicationId) {
      await this.applicationsStore.deleteApplication(Number(applicationId));
      ElNotification({
        title: "Заявка удалена",
        type: "success",
      });
    },
  },
};
</script>

<style></style>
