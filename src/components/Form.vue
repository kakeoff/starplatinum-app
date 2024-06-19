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
            placeholder="Выберите срок размещения"
            :disabledDate="disabledDate"
            style="width: 100%"
          />
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item>
      <div class="flex w-full gap-[5px]">
        <el-button class="w-full" type="primary" @click="addPub">
          Добавить издание
        </el-button>
        <el-button
          v-if="cartPubs.length"
          @click="addPubsFromCart"
          type="success"
          >Добавить из корзины</el-button
        >
      </div>
    </el-form-item>
    <el-form-item>
      <div
        class="w-full bg-[#141414] relative rounded-[8px] border overflow-y-auto max-h-[250px] border-[#4C4D4F] p-[10px]"
      >
        <el-tooltip trigger="click" theme="light">
          <template #content>
            <p class="w-[250px] break-words">
              Время обработки заявки - 24 часа. Расчет количества часов и
              стоимость происходит с момента одобрения заявки
            </p>
          </template>
          <button
            @click.prevent
            class="absolute cursor-pointer z-[10] focus:scale-[1.3] transition duration-200 rounded-[100%] h-[20px] w-[20px] flex justify-center items-center right-[5px] top-[5px] bg-gray-700"
          >
            ?
          </button>
        </el-tooltip>
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
            {{ new Date(pub.date).toLocaleDateString().replaceAll('/', '.') }}
            | {{ pub.hoursCount }} часов | {{ pub.cost }} рублей</el-tag
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
import { userStore } from '@/stores/user'

const storePubs = pubsStore()
const storeUser = userStore()
const storeApplications = applicationsStore()
const emit = defineEmits(['close'])

const formPubs = reactive<FormPublication[]>([])
const cartPubs = computed(() => storeUser.userCartPublications)
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
            date: new Date(i.date).toISOString()
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
  const date = new Date()
  date.setDate(date.getDate() + 1)
  return time.getTime() < date.getTime()
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
  const date = new Date(ruleForm.date)
  date.setHours(23)
  date.setMinutes(59)
  date.setSeconds(59)
  date.setMilliseconds(59)
  const afterTomorrow = new Date()
  afterTomorrow.setDate(afterTomorrow.getDate() + 2)
  afterTomorrow.setHours(0)
  afterTomorrow.setMinutes(0)
  afterTomorrow.setSeconds(0)
  afterTomorrow.setMilliseconds(0)
  const hoursCount = getHoursDifference(afterTomorrow, date)
  const costByHours = storePub.cost * hoursCount
  const data = {
    id: storePub.id,
    name: storePub.name,
    date: date.toISOString(),
    hoursCount: hoursCount,
    cost: costByHours
  }
  formPubs.push(data)
  ruleForm.pub = ''
  ruleForm.date = ''
}

const addPubsFromCart = async () => {
  const data = cartPubs.value.flatMap((item) => {
    if (!item.itemDate) return []
    const storePub = storePubs.publications.find(
      (pub) => pub.id === item.itemId
    )
    if (!storePub) return []
    const date = new Date(item.itemDate)
    date.setHours(23)
    date.setMinutes(59)
    date.setSeconds(59)
    date.setMilliseconds(59)
    const createdAt = new Date(item.createdAt)
    createdAt.setDate(createdAt.getDate() + 2)
    createdAt.setHours(0)
    createdAt.setMinutes(0)
    createdAt.setSeconds(0)
    createdAt.setMilliseconds(0)
    const hoursCount = date ? getHoursDifference(createdAt, date) : 0
    const costByHours = storePub.cost * hoursCount
    return {
      id: item.itemId,
      name: storePub.name,
      date: date.toISOString(),
      hoursCount: hoursCount,
      cost: costByHours
    }
  })
  formPubs.push(...data)
  await storeUser.clearMyCart()
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
