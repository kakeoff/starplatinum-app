<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
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
      <el-table
        v-if="formPubs.length"
        :data="formPubs"
        style="width: 100%"
        max-height="250"
      >
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
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { ElNotification, FormInstance, FormRules } from "element-plus";
import { cardStore } from "../stores/cards.js";

const storeCards = cardStore();

onMounted(() => {
  console.log(storeCards.cards);
});

const formSize = ref("default");
const formPubs = reactive([]) as any;
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
    pubs: formPubs,
    comment: ruleForm.desc,
  };
  if (data.name && data.pubs.length) {
    ElNotification({
      title: "Заявка успешно отправлена",
      type: "success",
    });
    resetForm(ruleFormRef.value);
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
  formPubs.splice(0, formPubs.length);
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
  formPubs.push(data);
  ruleForm.pub = "";
  ruleForm.date = "";
};

const deletePub = (index) => {
  formPubs.splice(index, 1);
};
</script>
