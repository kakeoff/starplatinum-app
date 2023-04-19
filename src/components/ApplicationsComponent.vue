<template>
  <div class="container mx-auto my-10">
    <div class="w-full flex justify-end mb-[20px]">
      <el-date-picker
        v-model="selectedDate"
        type="date"
        placeholder="Выберите дату"
      />
    </div>
    <el-table :data="filteredApplications" style="width: 100%">
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
      <el-table-column prop="comment" label="Комментарий"></el-table-column>
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
</template>

<script>
import { ElTable, ElTableColumn, ElButton } from "element-plus";
import { applicationsStore } from "../stores/applications";
import { mapStores } from "pinia";

export default {
  name: "Applications",
  components: { ElTable, ElTableColumn, ElButton },
  computed: {
    ...mapStores(applicationsStore),
    applications() {
      return this.applicationsStore.applications;
    },
    filteredApplications() {
      if (this.selectedDate) {
        const date = new Date(this.selectedDate);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        const formattedDate = `${day}.${month}.${year}`;
        console.log(formattedDate);
        return this.applications.filter((application) =>
          application.pubs.some((pub) => pub.date === formattedDate)
        );
      } else {
        return this.applications;
      }
    },
  },

  async mounted() {
    await this.applicationsStore.getAllApplications();
    console.log(this.applications);
  },
  data() {
    return {
      selectedDate: null,
    };
  },
  methods: {
    async removeApplication(applicationId) {
      await this.applicationsStore.deleteApplication(Number(applicationId));
    },
  },
};
</script>
