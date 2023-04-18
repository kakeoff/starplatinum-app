<template>
  <div class="container mx-auto my-10">
    <el-table :data="applications" style="width: 100%">
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
          <el-button
            type="danger"
            size="small"
            @click="removeApplication(row.id)"
            >Удалить</el-button
          >
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
  },
  async mounted() {
    await this.applicationsStore.getAllApplications();
    console.log(this.applications);
  },
  methods: {
    async removeApplication(applicationId) {
      await this.applicationsStore.deleteApplication(Number(applicationId));
    },
  },
};
</script>
