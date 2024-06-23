<template>
  <section v-motion-fade>
    <div class="w-full">
      <div class="container mx-auto my-10 h-full">
        <div class="w-full flex gap-[15px] justify-end mb-[20px]">
          <el-tooltip effect="light" placement="top">
            <template #content>
              <span class="text-white">Глобальный поиск изданий</span>
            </template>
            <el-input
              v-model="search"
              placeholder="Поиск"
              clearable
              class="w-[300px] ml-[0px]"
            />
          </el-tooltip>
          <el-button type="success" size="large" @click="showAddPub = true">
            Добавить издание
          </el-button>
        </div>
        <el-table class="bg-black/[.60] w-full" :data="filteredPublications">
          <el-table-column sortable prop="id" label="ID" width="80px" />
          <el-table-column min-width="300px" prop="name" label="Название">
            <template #default="{ row }">
              <div class="flex gap-[15px] items-center">
                <img
                  v-if="row.imageUrl"
                  class="w-[70px] h-[70px] flex-none border-[2px] border-gray-700 rounded-[3px] object-cover"
                  :src="row.imageUrl"
                  alt="publication image"
                />
                <div
                  v-else
                  class="w-[70px] text-[10px] text-center flex justify-center items-center h-[70px] flex-none border-[2px] border-gray-700 rounded-[3px]"
                >
                  Пусто
                </div>
                <span>{{ row.name }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column min-width="150px" label="Описание">
            <template #default="{ row }">
              <el-button
                type="info"
                size="small"
                @click=";(selectedPub = row), (showDescription = true)"
                >Посмотреть</el-button
              >
            </template>
          </el-table-column>
          <el-table-column
            sortable
            :sort-method="sortByCost"
            min-width="200px"
            prop="cost"
            label="Стоимость, руб"
          >
          </el-table-column>
          <el-table-column min-width="170px" label="Ссылка">
            <template #default="{ row }">
              <a :href="row.link" target="_blank"
                ><el-button size="small" type="success"
                  >Перейти на сайт</el-button
                ></a
              >
            </template>
          </el-table-column>
          <el-table-column min-width="300px" label="Действия">
            <template #default="{ row }">
              <el-button
                size="small"
                type="info"
                @click=";(showUpdatePub = true), (selectedPub = row)"
              >
                Редактировать
              </el-button>
              <el-popconfirm
                cancel-button-text="Нет"
                confirm-button-text="Да"
                @confirm="removePub(row.id)"
                title="Удалить издание?"
              >
                <template #reference>
                  <el-button size="small" type="danger">
                    <svg
                      class="text-[#f56c6c]"
                      fill="currentColor"
                      width="15px"
                      height="15px"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 408.483 408.483"
                    >
                      <path
                        d="M87.748,388.784c0.461,11.01,9.521,19.699,20.539,19.699h191.911c11.018,0,20.078-8.689,20.539-19.699l13.705-289.316 H74.043L87.748,388.784z M247.655,171.329c0-4.61,3.738-8.349,8.35-8.349h13.355c4.609,0,8.35,3.738,8.35,8.349v165.293 c0,4.611-3.738,8.349-8.35,8.349h-13.355c-4.61,0-8.35-3.736-8.35-8.349V171.329z M189.216,171.329 c0-4.61,3.738-8.349,8.349-8.349h13.355c4.609,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.737,8.349-8.349,8.349h-13.355 c-4.61,0-8.349-3.736-8.349-8.349V171.329L189.216,171.329z M130.775,171.329c0-4.61,3.738-8.349,8.349-8.349h13.356 c4.61,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.738,8.349-8.349,8.349h-13.356c-4.61,0-8.349-3.736-8.349-8.349V171.329z"
                      ></path>
                      <path
                        d="M343.567,21.043h-88.535V4.305c0-2.377-1.927-4.305-4.305-4.305h-92.971c-2.377,0-4.304,1.928-4.304,4.305v16.737H64.916 c-7.125,0-12.9,5.776-12.9,12.901V74.47h304.451V33.944C356.467,26.819,350.692,21.043,343.567,21.043z"
                      ></path>
                    </svg>
                  </el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </section>
  <el-dialog
    v-model="showDescription"
    class="w-[30%] min-w-[400px]"
    :title="'Описание издания ' + selectedPub?.name"
  >
    <div class="overflow-hidden break-words">
      <div class="top-0 break-words">
        {{ selectedPub?.description }}
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click=";(showDescription = false), (selectedPub = null)">
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
          <el-tooltip effect="light" placement="top">
            <template #content>
              <span class="text-white">Только числовые значения</span>
            </template>
            <el-input
              @input="validateCost"
              size="large"
              v-model="pubForm.cost"
              placeholder="Введите стоимость"
            ></el-input>
          </el-tooltip>
        </el-form-item>
        <span class="text-[16px]">Ссылка</span>
        <el-form-item class="mb-[10px]" prop="link">
          <el-input
            size="large"
            v-model="pubForm.link"
            placeholder="Введите cсылку"
          ></el-input>
        </el-form-item>
        <span class="text-[16px]">Изображение</span>
        <el-form-item class="mb-[10px]" prop="img">
          <label
            class="border-[1px] cursor-pointer rounded-[4px] border-green-300 hover:border-green-500 px-[10px] py-[5px] transition duration-200"
            for="imageInput"
            >Выберите файл</label
          >
          <button
            v-if="preview"
            class="border-[1px] ml-[10px] cursor-pointer rounded-[4px] border-red-300 hover:border-red-500 px-[10px] py-[5px] transition duration-200"
            @click=";(preview = null), (localFile = null)"
          >
            Cбросить
          </button>
          <input
            class="hidden"
            id="imageInput"
            @change="addFileLocally"
            type="file"
            accept=".jpg, .png"
          />
        </el-form-item>
        <img
          class="rounded-[8px] object-cover w-[300px] h-[300px]"
          v-if="preview"
          :src="preview"
          alt="img preview"
        />
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
    <div class="flex flex-col relative group justify-center w-full min-h-full">
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
        <span class="text-[16px]">Изображение</span>
        <el-form-item class="mb-[10px]" prop="img">
          <label
            class="border-[1px] cursor-pointer rounded-[4px] border-green-300 hover:border-green-500 px-[10px] py-[5px] transition duration-200"
            for="imageInput"
            >Выберите файл</label
          >
          <button
            v-if="preview"
            class="border-[1px] ml-[10px] cursor-pointer rounded-[4px] border-red-300 hover:border-red-500 px-[10px] py-[5px] transition duration-200"
            @click=";(preview = null), (localFile = null)"
          >
            Cбросить
          </button>
          <input
            class="hidden"
            id="imageInput"
            @change="addFileLocally"
            type="file"
            accept=".jpg, .png"
          />
        </el-form-item>
        <img
          class="rounded-[8px] border-[1px] border-gray-700 object-cover w-[300px] h-[300px]"
          v-if="preview"
          :src="preview"
          alt="img preview"
        />
        <img
          v-else
          class="rounded-[8px] border-[1px] border-gray-700 object-cover w-[300px] h-[300px]"
          :src="selectedPub?.imageUrl"
          alt="img preview"
        />
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

<script lang="ts">
import { ElTable, ElTableColumn, ElButton, ElNotification } from 'element-plus'
import { applicationsStore } from '../stores/applications'
import { pubsStore } from '../stores/publications'
import { mapStores } from 'pinia'
import { userStore } from '../stores/user'
import { defineComponent } from 'vue'
import { Publication } from '../types/publicationTypes'
import { uploadFile } from '@/services/file.service'

export default defineComponent({
  name: 'Applications',
  components: { ElTable, ElTableColumn, ElButton },
  computed: {
    ...mapStores(pubsStore, applicationsStore, userStore),
    publications() {
      return this.publicationsStore.publications
    },
    user() {
      return this.userStore.user
    },
    filteredPublications() {
      let filteredPubs = this.publications

      if (this.search) {
        const keyword = this.search.toLowerCase().trim()
        filteredPubs = filteredPubs.filter((pub) => {
          return (
            pub.name.toLowerCase().includes(keyword) ||
            pub.description.toLowerCase().includes(keyword) ||
            pub.cost.toString().includes(keyword) ||
            pub.link.toString().includes(keyword)
          )
        })
      }
      filteredPubs.sort((a, b) => b.id - a.id)
      return filteredPubs
    }
  },
  watch: {
    user(user) {
      if (user && user?.role === 0) {
        this.$router.push('/')
      }
    },
    showAddPub: {
      immediate: true,
      handler: function () {
        this.resetFields()
      }
    },
    showUpdatePub: {
      immediate: true,
      handler: function (val) {
        if (val === false) {
          this.resetFields()
        } else {
          if (!this.selectedPub) return
          this.pubForm.cost = String(this.selectedPub.cost)
          this.pubForm.name = this.selectedPub.name
          this.pubForm.description = this.selectedPub.description
          this.pubForm.link = this.selectedPub.link
        }
      }
    }
  },
  data() {
    return {
      selectedDate: null,
      showDescription: false,
      showUpdatePub: false,
      selectedPub: null as Publication | null,
      search: '',
      showAddPub: false,
      localFile: null as File | null,
      preview: null as string | null,
      pubForm: {
        name: '',
        description: '',
        cost: '',
        link: ''
      },
      pubRules: {
        name: [
          {
            required: true,
            message: 'Введите название',
            trigger: 'blur'
          }
        ],
        description: [
          { required: true, message: 'Введите описание', trigger: 'blur' }
        ],
        cost: [
          {
            required: true,
            message: 'Введите стоимость размещения',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    addFileLocally(event: Event) {
      const target = event.target as HTMLInputElement
      if (target && target.files) {
        const file = target.files[0]
        this.localFile = file
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target && typeof e.target.result === 'string') {
            this.preview = e.target.result
          }
        }
        reader.readAsDataURL(file)
      }
    },
    sortByCost(a: Publication, b: Publication) {
      return a.cost - b.cost
    },
    validateCost() {
      this.pubForm.cost = this.pubForm.cost.replace(/[^0-9.]/g, '')
    },
    async removePub(id: number) {
      await this.publicationsStore.deletePublication(Number(id))
    },
    async addPub() {
      const data = {
        name: this.pubForm.name,
        description: this.pubForm.description,
        cost: Number(this.pubForm.cost),
        link: this.pubForm.link,
        imageUrl: undefined as string | undefined
      }
      if (!data.name || !data.cost || !data.description) {
        ElNotification({
          title: 'Ошибка',
          message: 'Вы ввели не все данные',
          type: 'error'
        })
        return
      }
      if (!this.localFile) {
        ElNotification({
          title: 'Ошибка',
          message: 'Выберите изображение',
          type: 'error'
        })
        return
      }
      if (this.localFile) {
        const formData = new FormData()
        formData.append('files', this.localFile)
        const fileName = await uploadFile(formData)
        data.imageUrl = `/uploads/${fileName}`
        this.localFile = null
      }
      try {
        await this.publicationsStore.createPublication(data)
      } catch (error) {
        ElNotification({
          title: 'Ошибка при добавлении издания',
          type: 'error'
        })
        console.error(error)
      }

      this.showAddPub = false
    },

    async updatePub() {
      if (!this.selectedPub) return
      const data = {
        id: this.selectedPub.id,
        name: this.pubForm.name,
        description: this.pubForm.description,
        cost: Number(this.pubForm.cost),
        link: this.pubForm.link,
        imageUrl: undefined as string | undefined
      }
      if (!data.name || !data.cost || !data.description) {
        ElNotification({
          title: 'Ошибка',
          message: 'Вы ввели не все данные',
          type: 'error'
        })
        return
      }
      if (this.localFile) {
        const formData = new FormData()
        formData.append('files', this.localFile)
        const fileName = await uploadFile(formData)
        data.imageUrl = `/uploads/${fileName}`
        this.localFile = null
      }
      try {
        await this.publicationsStore.updatePublication(data)

        ElNotification({
          title: 'Издание успешно изменено',
          type: 'success'
        })
      } catch (error) {
        ElNotification({
          title: 'Ошибка при изменении издания',
          type: 'error'
        })
        console.error(error)
      }
      this.showUpdatePub = false
    },
    resetFields() {
      this.pubForm.name = ''
      this.pubForm.description = ''
      this.pubForm.link = ''
      this.pubForm.cost = ''
      this.preview = null
      this.localFile = null
    }
  }
})
</script>
