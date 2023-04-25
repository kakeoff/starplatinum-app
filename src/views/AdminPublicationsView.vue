<template>
  <section class="about applications-section">
    <h2 class="category-heading mx-auto">Издания</h2>

    <div class="w-full" v-motion-pop>
      <div class="container mx-auto my-10 h-full">
        <div class="w-full flex justify-end mb-[20px]">
          <el-button type="success" size="large" @click="showAddPub = true">
            <font-awesome-icon
              icon="fa-solid fa-plus"
              class="mr-[8px]"
            ></font-awesome-icon>
            Добавить издание
          </el-button>
        </div>
        <el-table
          class="bg-black/[.60] rounded-b-[16px]"
          :data="publications"
          style="width: 100%"
        >
          <el-table-column prop="name" label="Название"></el-table-column>
          <el-table-column label="Описание">
            <template #default="{ row }">
              <el-button
                type="info"
                size="small"
                @click="(selectedPub = row), (showDescription = true)"
                >Посмотреть</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="cost" label="Стоимость, руб">
          </el-table-column>
          <el-table-column prop="link" label="Ссылка"> </el-table-column>
          <el-table-column label="Действия">
            <template #default="{ row }">
              <el-popconfirm
                cancel-button-text="Нет"
                confirm-button-text="Да"
                @confirm="removePub(row.id)"
                width="180"
                title="Удалить издание?"
              >
                <template #reference>
                  <el-button type="danger" size="small">Удалить</el-button>
                </template>
              </el-popconfirm>
              <el-button
                type="info"
                size="small"
                @click="(showUpdatePub = true), (selectedPub = row)"
              >
                Редактировать
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </section>
  <el-dialog
    v-model="showDescription"
    width="30%"
    :title="'Описание издания ' + selectedPub.name"
  >
    <div class="overflow-hidden break-words">
      <div class="top-0 break-words">
        {{ selectedPub.description }}
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="(showDescription = false), (selectedPub = {})">
          Закрыть
        </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="showAddPub" width="50%" title="Добавить издание">
    <div class="flex justify-center w-full min-h-full">
      <el-form
        ref="pubForm"
        :model="pubForm"
        :rules="pubRules"
        class="font-[700] w-full text-[35px]"
      >
        <span class="text-[16px]">Название</span>
        <el-form-item class="mb-[10px]" prop="name">
          <el-input
            size="large"
            v-model="pubForm.name"
            placeholder="Введите название"
          ></el-input>
        </el-form-item>
        <span class="text-[16px]">Описание</span>
        <el-form-item class="mb-[10px]" prop="description">
          <el-input
            size="large"
            v-model="pubForm.description"
            type="textarea"
            placeholder="Введите описание"
          ></el-input>
        </el-form-item>
        <span class="text-[16px]">Стоимость размещения</span>
        <el-form-item class="mb-[10px]" prop="cost">
          <el-input
            @input="validateCost"
            size="large"
            v-model="pubForm.cost"
            placeholder="Введите стоимость"
          ></el-input>
        </el-form-item>
        <span class="text-[16px]">Ссылка</span>
        <el-form-item class="mb-[10px]" prop="link">
          <el-input
            size="large"
            v-model="pubForm.link"
            placeholder="Введите cсылку"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="danger" @click="showAddPub = false">
          Отмена
        </el-button>
        <el-button type="success" @click="addPub"> Добавить </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="showUpdatePub" width="50%" title="Редактировать издание">
    <div class="flex justify-center w-full min-h-full">
      <el-form
        ref="pubForm"
        :model="pubForm"
        :rules="pubRules"
        class="font-[700] w-full text-[35px]"
      >
        <span class="text-[16px]">Название</span>
        <el-form-item class="mb-[10px]" prop="name">
          <el-input
            size="large"
            v-model="pubForm.name"
            placeholder="Введите название"
          ></el-input>
        </el-form-item>
        <span class="text-[16px]">Описание</span>
        <el-form-item class="mb-[10px]" prop="description">
          <el-input
            size="large"
            v-model="pubForm.description"
            type="textarea"
            placeholder="Введите описание"
          ></el-input>
        </el-form-item>
        <span class="text-[16px]">Стоимость размещения</span>
        <el-form-item class="mb-[10px]" prop="cost">
          <el-input
            @input="validateCost"
            size="large"
            v-model="pubForm.cost"
            placeholder="Введите стоимость"
          ></el-input>
        </el-form-item>
        <span class="text-[16px]">Ссылка</span>
        <el-form-item class="mb-[10px]" prop="link">
          <el-input
            size="large"
            v-model="pubForm.link"
            placeholder="Введите cсылку"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="danger" @click="showUpdatePub = false">
          Отмена
        </el-button>
        <el-button type="success" @click="updatePub()"> Сохранить </el-button>
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
    ...mapStores(pubsStore, applicationsStore),
    publications() {
      return this.publicationsStore.publications;
    },
  },
  watch: {
    showAddPub: {
      immediate: true,
      handler: function () {
        this.resetFields();
      },
    },
    showUpdatePub: {
      immediate: true,
      handler: function (val) {
        if (val === false) {
          this.resetFields();
        } else {
          this.pubForm.cost = this.selectedPub.cost;
          this.pubForm.name = this.selectedPub.name;
          this.pubForm.description = this.selectedPub.description;
          this.pubForm.link = this.selectedPub.link;
        }
      },
    },
  },
  data() {
    return {
      selectedDate: null,
      showDescription: false,
      showUpdatePub: false,
      selectedPub: {},
      showAddPub: false,
      pubForm: {
        name: "",
        description: "",
        cost: "",
        link: "",
      },
      pubRules: {
        name: [
          {
            required: true,
            message: "Введите название",
            trigger: "blur",
          },
        ],
        description: [
          { required: true, message: "Введите описание", trigger: "blur" },
        ],
        cost: [
          {
            required: true,
            message: "Введите стоимость размещения",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    validateCost() {
      this.pubForm.cost = this.pubForm.cost.replace(/[^0-9.]/g, "");
    },
    async removePub(id) {
      await this.publicationsStore.deletePublication(Number(id));
      ElNotification({
        title: "Издание удалено",
        type: "success",
      });
    },
    addPub() {
      const data = {
        name: this.pubForm.name,
        description: this.pubForm.description,
        cost: Number(this.pubForm.cost),
        link: this.pubForm.link,
      };
      if (!data.name || !data.cost || !data.description) {
        ElNotification({
          title: "Ошибка",
          message: "Вы ввели не все данные",
          type: "error",
        });
        return;
      }
      this.publicationsStore.createPublication(data);
      ElNotification({
        title: "Издание успешно добавлено",
        type: "success",
      });
      this.showAddPub = false;
    },

    updatePub() {
      const data = {
        id: this.selectedPub.id,
        name: this.pubForm.name,
        description: this.pubForm.description,
        cost: Number(this.pubForm.cost),
        link: this.pubForm.link,
      };
      if (!data.name || !data.cost || !data.description) {
        ElNotification({
          title: "Ошибка",
          message: "Вы ввели не все данные",
          type: "error",
        });
        return;
      }
      this.publicationsStore.updatePublication(data);
      ElNotification({
        title: "Издание успешно изменено",
        type: "success",
      });
      this.showUpdatePub = false;
    },
    resetFields() {
      this.pubForm.name = "";
      this.pubForm.description = "";
      this.pubForm.link = "";
      this.pubForm.cost = "";
    },
  },
};
</script>
