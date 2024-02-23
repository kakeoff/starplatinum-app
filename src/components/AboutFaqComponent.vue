<template>
  <!-- FAQ -->
  <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
    <!-- Grid -->
    <div class="grid md:grid-cols-5 gap-10">
      <div class="md:col-span-2">
        <div class="">
          <h2
            class="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white"
          >
            Часто<br />задаваемые вопросы
          </h2>
          <p class="mt-1 hidden md:block text-gray-600 dark:text-gray-400">
            Отвечаем на часто задаваемые вопросы.
          </p>
        </div>
        <!-- Card -->
        <a
          class="group flex flex-col my-[10px] bg-white hover:scale-105 hover:transition duration-300 border shadow-sm rounded-xl hover:shadow-md transition dark:bg-transparent dark:border-gray-800"
          href="https://github.com/kakeoff/starplatinum-app"
        >
          <div class="p-2">
            <div class="flex">
              <svg
                class="mt-1 shrink-0 w-5 h-5 text-gray-800 dark:text-gray-200"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"
                />
              </svg>

              <div class="grow ml-5">
                <h3
                  class="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200"
                >
                  Напишите в наше сообщество
                </h3>
                <p class="text-sm text-gray-500">
                  Получите помощь от разработчиков
                </p>
              </div>
            </div>
          </div>
        </a>
        <!-- End Card -->

        <!-- Card -->
        <a
          class="group flex flex-col my-[10px] hover:scale-105 hover:transition duration-300 bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-transparent dark:border-gray-800"
          href="https://goo.gl/maps/KV5vUc11qTc1zGN76"
        >
          <div class="p-2">
            <div class="flex">
              <svg
                class="mt-1 shrink-0 w-5 h-5 text-gray-800 dark:text-gray-200"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  d="M5.5 2A3.5 3.5 0 0 0 2 5.5v5A3.5 3.5 0 0 0 5.5 14h5a3.5 3.5 0 0 0 3.5-3.5V8a.5.5 0 0 1 1 0v2.5a4.5 4.5 0 0 1-4.5 4.5h-5A4.5 4.5 0 0 1 1 10.5v-5A4.5 4.5 0 0 1 5.5 1H8a.5.5 0 0 1 0 1H5.5z"
                />
                <path d="M16 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              </svg>

              <div class="grow ml-5">
                <h3
                  class="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200"
                >
                  Найдите нас на картах
                </h3>
                <p class="text-sm text-gray-500">
                  Мы работаем без выходных с 9:00 до 22:00
                </p>
              </div>
            </div>
          </div>
        </a>
        <!-- End Card -->

        <!-- Card -->
        <a
          class="group flex flex-col my-[10px] hover:scale-105 hover:transition duration-300 bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-transparent dark:border-gray-800"
          href="mailto:starplatinumapp@mail.ru"
        >
          <div class="p-2">
            <div class="flex">
              <svg
                class="mt-1 shrink-0 w-5 h-5 text-gray-800 dark:text-gray-200"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8.47 1.318a1 1 0 0 0-.94 0l-6 3.2A1 1 0 0 0 1 5.4v.817l5.75 3.45L8 8.917l1.25.75L15 6.217V5.4a1 1 0 0 0-.53-.882l-6-3.2ZM15 7.383l-4.778 2.867L15 13.117V7.383Zm-.035 6.88L8 10.082l-6.965 4.18A1 1 0 0 0 2 15h12a1 1 0 0 0 .965-.738ZM1 13.116l4.778-2.867L1 7.383v5.734ZM7.059.435a2 2 0 0 1 1.882 0l6 3.2A2 2 0 0 1 16 5.4V14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5.4a2 2 0 0 1 1.059-1.765l6-3.2Z"
                />
              </svg>

              <div class="grow ml-5">
                <h3
                  class="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200"
                >
                  Напишите нам на почту
                </h3>
                <p class="text-sm text-gray-500">
                  Наш E-mail
                  <span class="text-blue-600 font-medium dark:text-blue-500"
                    >starplatinumapp@mail.ru</span
                  >
                </p>
              </div>
            </div>
          </div>
        </a>
        <!-- End Card -->
      </div>
      <!-- End Col -->

      <div class="md:col-span-3">
        <!-- Accordion -->
        <div
          class="hs-accordion-group divide-y divide-gray-200 dark:divide-gray-700"
        >
          <div
            class="hs-accordion pb-3 active"
            id="hs-basic-with-title-and-arrow-stretched-heading-one"
          >
            <button
              class="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400"
              aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one"
            >
              Могу я отменить заявку в любое время?
              <svg
                class="hs-accordion-active:hidden block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
              <svg
                class="hs-accordion-active:block hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </button>
            <div
              id="hs-basic-with-title-and-arrow-stretched-collapse-one"
              class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
              aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-one"
            >
              <p class="text-gray-600 dark:text-gray-400">
                Да, конечно. Сообщите нам, что Вы хотите отменить заявку и наши
                сотрудники помогут Вам с этим.
              </p>
            </div>
          </div>

          <div
            class="hs-accordion pt-6 pb-3"
            id="hs-basic-with-title-and-arrow-stretched-heading-two"
          >
            <button
              class="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400"
              aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-two"
            >
              Какие технологие Вы используете?
              <svg
                class="hs-accordion-active:hidden block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
              <svg
                class="hs-accordion-active:block hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </button>
            <div
              id="hs-basic-with-title-and-arrow-stretched-collapse-two"
              class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
              aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-two"
            >
              <p class="text-gray-600 dark:text-gray-400">
                Команда наших специалистов использует все современные технологии
                в этой сфере. Вот примеры некоторых из них: социальные сети,
                онлайн реклама, отношения с общественностью, исследование рынка,
                PR-события.
              </p>
            </div>
          </div>

          <div
            class="hs-accordion pt-6 pb-3"
            id="hs-basic-with-title-and-arrow-stretched-heading-three"
          >
            <button
              class="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400"
              aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-three"
            >
              Какая стоимость у ваших услуг?
              <svg
                class="hs-accordion-active:hidden block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
              <svg
                class="hs-accordion-active:block hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </button>
            <div
              id="hs-basic-with-title-and-arrow-stretched-collapse-three"
              class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
              aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-three"
            >
              <p class="text-gray-600 dark:text-gray-400">
                Стоимость размещения заявки зависит от выбранных изданий. Всю
                доступную информацию об изданиях и расценках Вы можете
                посмотреть в разделе 'Главная' внизу страницы.
              </p>
            </div>
          </div>

          <div
            class="hs-accordion pt-6 pb-3"
            id="hs-basic-with-title-and-arrow-stretched-heading-four"
          >
            <button
              class="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400"
              aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-four"
            >
              Как оставить заявку?
              <svg
                class="hs-accordion-active:hidden block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
              <svg
                class="hs-accordion-active:block hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </button>
            <div
              id="hs-basic-with-title-and-arrow-stretched-collapse-four"
              class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
              aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-four"
            >
              <p class="text-gray-600 dark:text-gray-400">
                Форму для заполнения и отправки заявки Вы можете найти на
                страницах 'Главная' или 'О нас' по нажатию на кнопку 'Отправить
                заявку'.
              </p>
            </div>
          </div>

          <div
            class="hs-accordion pt-6 pb-3"
            id="hs-basic-with-title-and-arrow-stretched-heading-five"
          >
            <button
              class="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400"
              aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-five"
            >
              Каким образом я получу обратную связь?
              <svg
                class="hs-accordion-active:hidden block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
              <svg
                class="hs-accordion-active:block hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </button>
            <div
              id="hs-basic-with-title-and-arrow-stretched-collapse-five"
              class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
              aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-five"
            >
              <p class="text-gray-600 dark:text-gray-400">
                При создании заявки Вам необходимо указать Email, по которому мы
                в дальнейшем с Вами свяжемся.
              </p>
            </div>
          </div>
        </div>
        <!-- End Accordion -->
      </div>
      <!-- End Col -->
    </div>
    <!-- End Grid -->
  </div>
  <!-- End FAQ -->
</template>
