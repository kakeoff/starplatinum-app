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

    <el-form-item
      v-for="(pub, index) in pubs"
      :key="pub.name"
      label="Издание"
      required
    >
      <el-col :span="11">
        <el-form-item prop="count">
          <el-select
            v-model="selectedPubs[index]"
            style="width: 100%"
            placeholder="Выберите издание"
          >
            <el-option
              v-for="item in pubs"
              :key="item.name"
              :label="item.name"
              :value="item.name"
              @click="selectPub(item.name)"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col class="text-center" :span="2">
        <span class="text-gray-500">-</span>
      </el-col>
      <el-col :span="11">
        <el-form-item prop="date">
          <el-date-picker
            @click=""
            v-model="ruleForm.date"
            type="date"
            label="Выберите дату"
            placeholder="Выберите дату"
            style="width: 100%"
          />
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="Activity form" prop="desc">
      <el-input v-model="ruleForm.desc" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        Create
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { cardStore } from "../stores/cards.js";

const storeCards = cardStore();

onMounted(() => {
  console.log(storeCards.cards);
});

const formSize = ref("default");
const selectedPubs = [];
const pubs = storeCards.cards;

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  name: "",
  selectedOption: "",
  count: "",
  date: "",
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
  selectedOption: [
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

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const selectPub = (pub) => {
  selectedPubs.push(pub);
};

// const options = storeCards.cards.map((card) => ({
//   value: `${card.name}`,
//   label: `${card.name}`,
// }));
</script>
