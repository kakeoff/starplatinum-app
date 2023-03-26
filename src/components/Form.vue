<template>
  <el-card v-if="!showCompleteMessage">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm font-[700]"
      :size="formSize"
      status-icon
    >
      <el-form-item label="Название" prop="name">
        <el-input
          placeholder="Например: ООО 'Зеленоглазое такси'"
          v-model="ruleForm.name"
        />
      </el-form-item>

      <el-form-item label="Издание" required>
        <el-col :span="11">
          <el-form-item class="max-w-[223px]" prop="count">
            <el-select
              v-model="ruleForm.pub"
              style="width: 100%"
              placeholder="Выберите издание"
            >
              <el-option
                v-for="item in pubs"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="text-center" :span="2">
          <span class="text-gray-500">-</span>
        </el-col>
        <el-col :span="11">
          <el-form-item class="max-w-[223px]" prop="date">
            <el-date-picker
              v-model="ruleForm.date"
              type="date"
              label="Выберите дату"
              placeholder="Выберите дату"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button class="w-full" type="primary" @click="addPub()">
          Добавить издание
        </el-button>
      </el-form-item>
      <el-form-item>
        <div
          v-if="!formPubs.length"
          style="background-color: rgb(32, 33, 33)"
          class="w-full rounded-[8px] border border-[#4C4D4F] p-[10px]"
        >
          <el-alert type="info" show-icon :closable="false">
            <p>Здесь будут отображаться добавленные издания</p>
          </el-alert>
        </div>
        <div
          v-if="formPubs.length"
          class="w-full bg-[#141414] rounded-[8px] border border-[#4C4D4F] p-[10px]"
        >
          <el-table :data="formPubs" style="width: 100%" max-height="250">
            <el-table-column fixed prop="date" label="Дата" />
            <el-table-column fixed prop="name" label="Название" />
            <el-table-column fixed="right" label="Операция">
              <template #default="scope">
                <el-button
                  link
                  type="primary"
                  class="mb-[3px]"
                  size="small"
                  @click.prevent="deletePub(scope.$index)"
                >
                  Удалить
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form-item>
      <el-form-item label="Комментарий" prop="desc">
        <el-input
          v-model="ruleForm.desc"
          placeholder="Введите комментарий"
          type="textarea"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()"> Создать </el-button>
        <el-button @click="resetForm(ruleFormRef)">Сбросить</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <div class="flex flex-col items-center" v-else>
    <h1 class="text-[20px]">
      Заявка успешно отправлена! Спасибо, что пользуетесь нашими услугами.
    </h1>
    <button
      @click="showCompleteMessage = false"
      class="cta-btn mt-[20px] max-w-[30%]"
    >
      Отправить повторно
    </button>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, reactive, ref } from "vue";
import { ElNotification, FormInstance, FormRules } from "element-plus";
import { cardStore } from "../stores/cards.js";
import { applicationsStore } from "../stores/applications.js";

const storeCards = cardStore();
const storeApplications = applicationsStore();

onMounted(() => {});
const formSize = ref("default");
const formPubs = ref([]) as any;
const showCompleteMessage = ref(false);
const pubs = storeCards.cards;

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  name: "",
  date: "",
  pub: "",
  desc: "",
});

const rules = reactive<FormRules>({
  name: [
    {
      required: true,
      message: "Пожалуйста, введите название организации",
      trigger: "blur",
    },
    {
      min: 3,
      max: 30,
      message: "Название должно быть в диапазоне от 3 до 30 символов",
      trigger: "blur",
    },
  ],
  pub: [
    {
      required: true,
      message: "Пожалуйста, выберите издание",
      trigger: "change",
    },
  ],
  date: [
    {
      type: "date",
      required: true,
      message: "Пожалуйста, выберите дату",
      trigger: "change",
    },
  ],
});

const submitForm = async () => {
  const data = {
    name: ruleForm.name,
    pubs: formPubs.value,
    comment: ruleForm.desc,
  };
  if (data.name && data.pubs.length) {
    storeApplications.sendApplication(data);
    ElNotification({
      title: "Заявка успешно отправлена",
      type: "success",
    });
    resetForm(ruleFormRef.value);
    showCompleteMessage.value = true;
  } else {
    ElNotification({
      title: "Ошибка",
      message: "Вы ввели не все данные",
      type: "error",
    });
  }
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  formPubs.value = [];
};

const addPub = () => {
  if (ruleForm.pub === "" || ruleForm.date === "") {
    ElNotification({
      title: "Ошибка",
      message: "Заполните поля перед добавлением",
      type: "error",
    });
    return;
  }

  const date = new Date(ruleForm.date).toLocaleDateString();
  const data = {
    name: ruleForm.pub,
    date: date,
  };
  formPubs.value.push(data);
  ruleForm.pub = "";
  ruleForm.date = "";
};

const deletePub = (index: number) => {
  formPubs.value.splice(index, 1);
};
</script>
