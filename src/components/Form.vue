<template>
  <h2
    v-if="!showCompleteMessage"
    class="w-full text-center category-heading mt-[-20px] mb-[20px]"
  >
    Создание заявки
  </h2>

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
              :disabledDate="disabledDate"
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
      <el-form-item label="Email" prop="email">
        <el-input
          v-model="ruleForm.email"
          placeholder="Введите ваш Email"
          type="input"
        />
      </el-form-item>
      <el-form-item label="Комментарий" prop="desc">
        <el-input
          v-model="ruleForm.desc"
          placeholder="Введите комментарий"
          type="textarea"
        />
      </el-form-item>
      <el-form-item label="Итоговая цена" prop="desc">
        <div class="w-full flex justify-end">{{ finalCost }} руб</div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          Создать
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">Сбросить</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-col v-else>
    <el-result
      icon="success"
      title="Заявка успешно отправлена"
      sub-title="Мы свяжемся с вами для дальнейшего сотрудничества"
    >
      <template #extra>
        <button @click="showCompleteMessage = false" class="cta-btn">
          Отправить повторно
        </button>
      </template>
    </el-result>
  </el-col>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { ElNotification, FormInstance, FormRules } from "element-plus";
import { pubsStore } from "../stores/publications.js";
import { applicationsStore } from "../stores/applications.js";
import { Publication } from "../types/publicationTypes";

const storePubs = pubsStore();
const storeApplications = applicationsStore();

onMounted(async () => {
  await storePubs.getAllPublications();
  pubs.value = storePubs.publications;
});
const formSize = ref("default");
const formPubs = ref([]) as any;
const showCompleteMessage = ref(false);
const pubs = ref([] as Publication[]);
const finalCost = ref(0);

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  name: "",
  date: "",
  pub: "",
  email: "",
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
  email: [
    {
      required: true,
      message: "Пожалуйста, введите ваш email",
      trigger: "blur",
    },
    {
      type: "email",
      message: "Введите корректный email",
      trigger: ["blur", "change"],
    },
  ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      const data = {
        name: ruleForm.name,
        pubs: formPubs.value,
        email: ruleForm.email,
        comment: ruleForm.desc,
        cost: finalCost.value,
      };
      if (data.name && data.pubs.length && data.email.length) {
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
    } else {
      ElNotification({
        title: "Ошибка",
        message: "Вы ввели некорректные данные",
        type: "error",
      });
      return false;
    }
  });
};
const disabledDate = (time: Date) => {
  return time.getTime() < Date.now();
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  formPubs.value = [];
  finalCost.value = 0;
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
  const foundPub = pubs.value.find((pub) => pub.name === data.name);
  if (foundPub) {
    finalCost.value += foundPub?.cost;
  }
  ruleForm.pub = "";
  ruleForm.date = "";
};

const deletePub = (index: number) => {
  formPubs.value.splice(index, 1);
  finalCost.value = 0;
  formPubs.value.forEach((pub) => {
    const foundPub = pubs.value.find((publ) => publ.name === pub.name);
    if (foundPub) {
      finalCost.value += foundPub.cost;
    }
  });
};
</script>
