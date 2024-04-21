<template>
  <section v-motion-fade>
    <h2 class="category-heading mx-auto">Издания</h2>

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
            <font-awesome-icon
              icon="fa-solid fa-plus"
              class="mr-[8px]"
            ></font-awesome-icon>
            Добавить издание
          </el-button>
        </div>
        <el-table
          class="bg-black/[.60]"
          :data="filteredPublications"
          style="width: 100%"
        >
          <el-table-column prop="name" label="Название"></el-table-column>
          <el-table-column label="Описание">
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
            prop="cost"
            label="Стоимость, руб"
          >
          </el-table-column>
          <el-table-column label="Ссылка">
            <template #default="{ row }">
              <a :href="row.link" target="_blank"
                ><el-button type="success" size="small"
                  >Перейти на сайт</el-button
                ></a
              >
            </template>
          </el-table-column>
          <el-table-column label="Действия">
            <template #default="{ row }">
              <div class="flex flex-row flex-wrap gap-[5px]">
                <el-popconfirm
                  cancel-button-text="Нет"
                  confirm-button-text="Да"
                  @confirm="removePub(row.id)"
                  title="Удалить издание?"
                >
                  <template #reference>
                    <el-button type="danger" size="small">Удалить</el-button>
                  </template>
                </el-popconfirm>
                <div>
                  <el-button
                    type="info"
                    size="small"
                    @click=";(showUpdatePub = true), (selectedPub = row)"
                  >
                    Редактировать
                  </el-button>
                </div>
              </div>
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

<script lang="ts">
import { ElTable, ElTableColumn, ElButton, ElNotification } from 'element-plus'
import { applicationsStore } from '../stores/applications'
import { pubsStore } from '../stores/publications'
import { mapStores } from 'pinia'
import { userStore } from '../stores/user'
import { defineComponent } from 'vue'
import { Publication } from '../types/publicationTypes'

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
    sortByCost(a: Publication, b: Publication) {
      return a.cost - b.cost
    },
    validateCost() {
      this.pubForm.cost = this.pubForm.cost.replace(/[^0-9.]/g, '')
    },
    async removePub(id: number) {
      await this.publicationsStore.deletePublication(Number(id))
    },
    addPub() {
      const data = {
        name: this.pubForm.name,
        description: this.pubForm.description,
        cost: Number(this.pubForm.cost),
        link: this.pubForm.link
      }
      if (!data.name || !data.cost || !data.description) {
        ElNotification({
          title: 'Ошибка',
          message: 'Вы ввели не все данные',
          type: 'error'
        })
        return
      }
      this.publicationsStore.createPublication(data)
      this.showAddPub = false
    },

    updatePub() {
      if (!this.selectedPub) return
      const data = {
        id: this.selectedPub.id,
        name: this.pubForm.name,
        description: this.pubForm.description,
        cost: Number(this.pubForm.cost),
        link: this.pubForm.link
      }
      if (!data.name || !data.cost || !data.description) {
        ElNotification({
          title: 'Ошибка',
          message: 'Вы ввели не все данные',
          type: 'error'
        })
        return
      }
      this.publicationsStore.updatePublication(data)
      this.showUpdatePub = false
    },
    resetFields() {
      this.pubForm.name = ''
      this.pubForm.description = ''
      this.pubForm.link = ''
      this.pubForm.cost = ''
    }
  }
})
</script>
