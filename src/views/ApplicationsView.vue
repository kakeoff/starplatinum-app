<template>
  <div class="container mx-auto my-10">
    <h1 class="text-2xl font-bold mb-5">Список заявок</h1>

    <el-table :data="applications" style="width: 100%">
      <el-table-column prop="name" label="Название"></el-table-column>
      <el-table-column prop="email" label="Email"></el-table-column>
      <el-table-column label="Издания">
        <template #default="{ row }">
          <ul>
            <li v-for="publication in row.publications">
              {{ publication.name }} - {{ publication.date }}
            </li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column prop="comment" label="Комментарий"></el-table-column>
      <el-table-column label="Действия">
        <template #default="{ row }">
          <el-button type="danger" size="small" @click="removeApplication(row)"
            >Удалить</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { ref } from "vue";
import { ElTable, ElTableColumn, ElButton } from "element-plus";

export default {
  name: "Applications",
  components: { ElTable, ElTableColumn, ElButton },
  setup() {
    const applications = ref([
      {
        name: "Заявка 1",
        email: "example1@gmail.com",
        publications: [
          { name: "Издание 1", date: "10.10.2022" },
          { name: "Издание 2", date: "12.10.2022" },
        ],
        comment: "Комментарий 1",
      },
      {
        name: "Заявка 2",
        email: "example2@gmail.com",
        publications: [{ name: "Издание 3", date: "15.11.2022" }],
        comment: "Комментарий 2",
      },
    ]);

    function removeApplication(application) {
      const index = applications.value.indexOf(application);
      applications.value.splice(index, 1);
    }

    return { applications, removeApplication };
  },
};
</script>
