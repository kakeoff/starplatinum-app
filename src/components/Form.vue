<template>
  <h2 class="w-full text-center category-heading mt-[-20px] mb-[20px]">
    Создание заявки
  </h2>

  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    class="demo-ruleForm font-[700]"
    size="default"
    status-icon
  >
    <el-form-item required>
      <el-col :span="11">
        <el-form-item prop="count">
          <el-select
            filterable
            v-model="ruleForm.pub"
            style="width: 100%"
            placeholder="Выберите издание"
          >
            <el-option
              v-for="item in pubs"
              :disabled="checkIsPubAdded(item.id)"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            >
              <div class="flex gap-[5px] items-center">
                <img
                  v-if="item.imageUrl"
                  :src="item.imageUrl"
                  class="w-[20px] h-[20px] object-cover border-[2px] border-gray-700 rounded-[4px]"
                />
                <div
                  v-else
                  class="w-[20px] h-[20px] border-[2px] border-gray-700 rounded-[4px]"
                />
                <span>{{ item.name }}</span>
              </div>
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col class="text-center" :span="2">
        <span class="text-gray-500">-</span>
      </el-col>
      <el-col :span="11">
        <el-form-item prop="date">
          <el-date-picker
            v-model="ruleForm.date"
            type="date"
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
        class="w-full bg-[#141414] rounded-[8px] border overflow-y-auto max-h-[250px] border-[#4C4D4F] p-[10px]"
      >
        <p v-if="!formPubs.length" class="text-[13px] text-center opacity-50">
          Здесь будут отображаться добавленные издания
        </p>
        <div class="flex flex-wrap gap-[10px]" v-else>
          <el-tag
            closable
            size="large"
            @close="deletePub(pub.id)"
            v-for="(pub, index) in formPubs"
            :key="pub.id"
            >{{ pub.name }} |
            {{ new Date(pub.date).toLocaleDateString().replaceAll('/', '.') }} |
            {{ pub.hoursCount }} часов | {{ pub.cost }} рублей</el-tag
          >
        </div>
      </div>
    </el-form-item>
    <el-form-item prop="desc">
      <el-input
        v-model="ruleForm.desc"
        placeholder="Введите комментарий"
        type="textarea"
      />
    </el-form-item>
    <el-form-item prop="desc">
      <div class="w-full flex justify-end">
        <el-tag type="success">{{ finalCost }} руб</el-tag>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        Создать
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">Сбросить</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { ElNotification, FormInstance, FormRules } from 'element-plus'
import { pubsStore } from '../stores/publications.js'
import { applicationsStore } from '../stores/applications.js'
import { FormPublication } from '../types/publicationTypes'
import { getHoursDifference, isAuthenticated } from '../plugins/helpers'

const storePubs = pubsStore()
const storeApplications = applicationsStore()
const emit = defineEmits(['close'])

const formPubs = reactive<FormPublication[]>([])
const pubs = computed(() => storePubs.publications)
const finalCost = computed(() => {
  return formPubs.reduce((total, pub) => {
    return total + pub.cost
  }, 0)
})
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  date: '',
  pub: '',
  desc: ''
})

const rules = reactive<FormRules>({
  name: [
    {
      required: true,
      message: 'Пожалуйста, введите название организации',
      trigger: 'blur'
    },
    {
      min: 3,
      max: 30,
      message: 'Название должно быть в диапазоне от 3 до 30 символов',
      trigger: 'blur'
    }
  ],
  email: [
    {
      required: true,
      message: 'Пожалуйста, введите ваш email',
      trigger: 'blur'
    },
    {
      type: 'email',
      message: 'Введите корректный email',
      trigger: ['blur', 'change']
    }
  ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!isAuthenticated()) {
    ElNotification({
      title: 'Ошибка',
      message: 'Вы не авторизованы',
      type: 'error'
    })
    return
  }
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      const data = {
        pubs: formPubs.map((i) => {
          return {
            id: i.id,
            date: i.date
          }
        }),
        comment: ruleForm.desc,
        cost: finalCost.value
      }
      if (data.pubs.length) {
        await storeApplications.sendApplication(data)
        resetForm(ruleFormRef.value)
        emit('close')
      } else {
        ElNotification({
          title: 'Ошибка',
          message: 'Вы ввели не все данные',
          type: 'error'
        })
      }
    } else {
      ElNotification({
        title: 'Ошибка',
        message: 'Вы ввели некорректные данные',
        type: 'error'
      })
      return false
    }
  })
}
const disabledDate = (time: Date) => {
  return time.getTime() < Date.now()
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  formPubs.length = 0
}

const addPub = () => {
  if (ruleForm.pub === '' || ruleForm.date === '') {
    ElNotification({
      title: 'Ошибка',
      message: 'Заполните поля перед добавлением',
      type: 'error'
    })
    return
  }
  const storePub = storePubs.publications.find(
    (pub) => pub.name === ruleForm.pub
  )
  if (!storePub) return
  const date = new Date(ruleForm.date).toISOString()
  const hoursCount = getHoursDifference(new Date(), new Date(date))
  const costByHours = storePub.cost * hoursCount
  const data = {
    id: storePub.id,
    name: storePub.name,
    date: date,
    hoursCount: hoursCount,
    cost: costByHours
  }
  formPubs.push(data)
  ruleForm.pub = ''
  ruleForm.date = ''
}

const deletePub = (id: number) => {
  const idx = formPubs.findIndex((i) => i.id === id)
  if (idx !== -1) {
    formPubs.splice(idx, 1)
  }
}

const checkIsPubAdded = (pubId: number) => {
  return formPubs.some((i) => i.id === pubId)
}
</script>
