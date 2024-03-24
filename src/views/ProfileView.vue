<template>
  <div v-motion-fade class="px-[200px]">
    <div class="w-full flex gap-[20px]">
      <div
        class="flex w-full max-w-[650px] overflow-hidden flex-col gap-[20px]"
      >
        <div class="flex w-full border-[2px] border-gray-700 rounded-[12px]">
          <div class="flex flex-col gap-[10px]">
            <div
              class="bg-black rounded-l-[12px] group relative overflow-hidden w-[300px] h-[300px] flex items-center justify-center"
            >
              <img
                v-if="user?.avatarUrl"
                class="w-full h-full object-cover"
                :src="avatarUrl"
                alt="user avatar"
              />
              <el-dropdown
                class="text-[16px] absolute bottom-[-30px] w-full font-[700]"
                trigger="click"
              >
                <button
                  class="w-full p-[12px] text-center text-white group-hover:bg-black/70 transition duration-300 group-hover:translate-y-[-30px]"
                >
                  Сменить аватар
                </button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item class="!p-0 text-[16px] font-[700]">
                      <label
                        class="w-full h-full cursor-pointer px-[20px] py-[10px]"
                        for="fileInput"
                        >Загрузить новый</label
                      >
                    </el-dropdown-item>
                    <el-dropdown-item
                      @click="resetAvatar"
                      class="text-red-500 text-[16px] font-[700] px-[20px] py-[10px]"
                      >Сбросить</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>

            <input
              class="hidden"
              id="fileInput"
              @change="uploadAvatar"
              type="file"
              accept=".jpg, .png"
            />
          </div>
          <div
            class="h-[300px] text-white bg-black/50 px-[20px] py-[3px] flex w-full items-center rounded-r-[12px]"
          >
            <div
              class="flex flex-col gap-[25px] w-full max-w-[300px] overflow-hidden"
            >
              <div class="flex flex-col gap-[3px]">
                <div class="flex flex-row gap-[3px] items-center">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.99935 6.0026C9.28801 6.0026 10.3327 4.95794 10.3327 3.66927C10.3327 2.38061 9.28801 1.33594 7.99935 1.33594C6.71068 1.33594 5.66602 2.38061 5.66602 3.66927C5.66602 4.95794 6.71068 6.0026 7.99935 6.0026Z"
                      stroke="currentColor"
                      stroke-opacity="0.5"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M1.33301 13.6693C1.33301 10.7236 4.01934 8.33594 7.33301 8.33594M10.333 14.0026L13.6663 10.6693L12.333 9.33594L8.99967 12.6693V14.0026H10.333Z"
                      stroke="currentColor"
                      stroke-opacity="0.5"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span class="font-[400] text-gray-400 text-[14px]">Имя</span>
                </div>
                <div
                  class="flex flex-col items-start sm:flex-row justify-between w-full sm:items-center"
                >
                  <span class="ym-hide-content text-[17px] font-[500] truncate">
                    {{ user?.fullName ?? 'Не установлено' }}
                  </span>
                  <button
                    class="text-[13px] font-[400] landing-[13px] hover:underline"
                    name="change-username"
                    @click="clickChangeUser('Имя пользователя', 'fullName')"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25px"
                      height="25px"
                      viewBox="0 -0.5 25 25"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M17.265 4.16231L19.21 5.74531C19.3978 5.9283 19.5031 6.17982 19.5015 6.44201C19.5 6.70421 19.3919 6.9545 19.202 7.13531L17.724 8.93531L12.694 15.0723C12.6069 15.1749 12.4897 15.2473 12.359 15.2793L9.75102 15.8793C9.40496 15.8936 9.10654 15.6384 9.06702 15.2943L9.18902 12.7213C9.19806 12.5899 9.25006 12.4652 9.33702 12.3663L14.15 6.50131L15.845 4.43331C16.1743 3.98505 16.7938 3.86684 17.265 4.16231Z"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M5.5 18.2413C5.08579 18.2413 4.75 18.5771 4.75 18.9913C4.75 19.4056 5.08579 19.7413 5.5 19.7413V18.2413ZM19.2 19.7413C19.6142 19.7413 19.95 19.4056 19.95 18.9913C19.95 18.5771 19.6142 18.2413 19.2 18.2413V19.7413ZM14.8455 6.22062C14.6904 5.83652 14.2534 5.65082 13.8693 5.80586C13.4852 5.9609 13.2995 6.39796 13.4545 6.78206L14.8455 6.22062ZM17.8893 9.66991C18.2933 9.57863 18.5468 9.17711 18.4556 8.77308C18.3643 8.36904 17.9628 8.1155 17.5587 8.20678L17.8893 9.66991ZM5.5 19.7413H19.2V18.2413H5.5V19.7413ZM13.4545 6.78206C13.6872 7.35843 14.165 8.18012 14.8765 8.8128C15.6011 9.45718 16.633 9.95371 17.8893 9.66991L17.5587 8.20678C16.916 8.35198 16.3609 8.12551 15.8733 7.69189C15.3725 7.24656 15.0128 6.63526 14.8455 6.22062L13.4545 6.78206Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div class="flex flex-col gap-[3px]">
                <div class="flex flex-row gap-[3px] items-center">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.6663 3.9974C14.6663 3.26406 14.0663 2.66406 13.333 2.66406H2.66634C1.93301 2.66406 1.33301 3.26406 1.33301 3.9974V11.9974C1.33301 12.7307 1.93301 13.3307 2.66634 13.3307H13.333C14.0663 13.3307 14.6663 12.7307 14.6663 11.9974V3.9974ZM13.333 3.9974L7.99967 7.33073L2.66634 3.9974H13.333ZM13.333 11.9974H2.66634V5.33073L7.99967 8.66406L13.333 5.33073V11.9974Z"
                      fill="currentColor"
                      fill-opacity="0.5"
                    />
                  </svg>
                  <span class="font-[400] text-gray-400 text-[14px]"
                    >Email</span
                  >
                </div>
                <div
                  class="flex flex-col items-start sm:flex-row justify-between w-full sm:items-center"
                >
                  <span class="ym-hide-content text-[17px] font-[500] truncate">
                    {{ user?.email }}
                  </span>
                  <button
                    class="text-[13px] font-[400] landing-[13px] hover:underline"
                    name="change-email"
                    @click="clickChangeUser('Email', 'email')"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25px"
                      height="25px"
                      viewBox="0 -0.5 25 25"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M17.265 4.16231L19.21 5.74531C19.3978 5.9283 19.5031 6.17982 19.5015 6.44201C19.5 6.70421 19.3919 6.9545 19.202 7.13531L17.724 8.93531L12.694 15.0723C12.6069 15.1749 12.4897 15.2473 12.359 15.2793L9.75102 15.8793C9.40496 15.8936 9.10654 15.6384 9.06702 15.2943L9.18902 12.7213C9.19806 12.5899 9.25006 12.4652 9.33702 12.3663L14.15 6.50131L15.845 4.43331C16.1743 3.98505 16.7938 3.86684 17.265 4.16231Z"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M5.5 18.2413C5.08579 18.2413 4.75 18.5771 4.75 18.9913C4.75 19.4056 5.08579 19.7413 5.5 19.7413V18.2413ZM19.2 19.7413C19.6142 19.7413 19.95 19.4056 19.95 18.9913C19.95 18.5771 19.6142 18.2413 19.2 18.2413V19.7413ZM14.8455 6.22062C14.6904 5.83652 14.2534 5.65082 13.8693 5.80586C13.4852 5.9609 13.2995 6.39796 13.4545 6.78206L14.8455 6.22062ZM17.8893 9.66991C18.2933 9.57863 18.5468 9.17711 18.4556 8.77308C18.3643 8.36904 17.9628 8.1155 17.5587 8.20678L17.8893 9.66991ZM5.5 19.7413H19.2V18.2413H5.5V19.7413ZM13.4545 6.78206C13.6872 7.35843 14.165 8.18012 14.8765 8.8128C15.6011 9.45718 16.633 9.95371 17.8893 9.66991L17.5587 8.20678C16.916 8.35198 16.3609 8.12551 15.8733 7.69189C15.3725 7.24656 15.0128 6.63526 14.8455 6.22062L13.4545 6.78206Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div class="flex flex-col gap-[3px]">
                <div class="flex flex-row gap-[3px] items-center">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.99967 13.3307H8.99967C9.08856 13.3307 9.16634 13.2974 9.23301 13.2307C9.29967 13.1641 9.33301 13.0863 9.33301 12.9974C9.33301 12.9085 9.29967 12.8307 9.23301 12.7641C9.16634 12.6974 9.08856 12.6641 8.99967 12.6641H6.99967C6.91079 12.6641 6.83301 12.6974 6.76634 12.7641C6.69967 12.8307 6.66634 12.9085 6.66634 12.9974C6.66634 13.0863 6.69967 13.1641 6.76634 13.2307C6.83301 13.2974 6.91079 13.3307 6.99967 13.3307ZM4.66634 15.3307C4.29967 15.3307 3.9859 15.2003 3.72501 14.9394C3.46367 14.6781 3.33301 14.3641 3.33301 13.9974V1.9974C3.33301 1.63073 3.46367 1.31673 3.72501 1.0554C3.9859 0.794507 4.29967 0.664062 4.66634 0.664062H11.333C11.6997 0.664062 12.0137 0.794507 12.275 1.0554C12.5359 1.31673 12.6663 1.63073 12.6663 1.9974V13.9974C12.6663 14.3641 12.5359 14.6781 12.275 14.9394C12.0137 15.2003 11.6997 15.3307 11.333 15.3307H4.66634ZM4.66634 10.6641H11.333V3.9974H4.66634V10.6641ZM4.66634 11.9974V13.9974H11.333V11.9974H4.66634ZM4.66634 2.66406H11.333V1.9974H4.66634V2.66406Z"
                      fill="currentColor"
                      fill-opacity="0.5"
                    />
                  </svg>
                  <span class="font-[400] text-gray-400 text-[14px]"
                    >Телефон</span
                  >
                </div>
                <div
                  class="flex flex-col items-start sm:flex-row justify-between w-full sm:items-center"
                >
                  <div class="flex flex-col sm:flex-row gap-[8px] max-w-[85%]">
                    <span
                      class="ym-hide-content text-[17px] font-[500] overflow-hidden truncate"
                    >
                      {{ user?.phone ?? 'Не установлено' }}
                    </span>
                  </div>
                  <button
                    class="text-[13px] font-[400] landing-[13px] hover:underline"
                    name="change-phone"
                    @click="clickChangeUser('Телефон', 'phone')"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25px"
                      height="25px"
                      viewBox="0 -0.5 25 25"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M17.265 4.16231L19.21 5.74531C19.3978 5.9283 19.5031 6.17982 19.5015 6.44201C19.5 6.70421 19.3919 6.9545 19.202 7.13531L17.724 8.93531L12.694 15.0723C12.6069 15.1749 12.4897 15.2473 12.359 15.2793L9.75102 15.8793C9.40496 15.8936 9.10654 15.6384 9.06702 15.2943L9.18902 12.7213C9.19806 12.5899 9.25006 12.4652 9.33702 12.3663L14.15 6.50131L15.845 4.43331C16.1743 3.98505 16.7938 3.86684 17.265 4.16231Z"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M5.5 18.2413C5.08579 18.2413 4.75 18.5771 4.75 18.9913C4.75 19.4056 5.08579 19.7413 5.5 19.7413V18.2413ZM19.2 19.7413C19.6142 19.7413 19.95 19.4056 19.95 18.9913C19.95 18.5771 19.6142 18.2413 19.2 18.2413V19.7413ZM14.8455 6.22062C14.6904 5.83652 14.2534 5.65082 13.8693 5.80586C13.4852 5.9609 13.2995 6.39796 13.4545 6.78206L14.8455 6.22062ZM17.8893 9.66991C18.2933 9.57863 18.5468 9.17711 18.4556 8.77308C18.3643 8.36904 17.9628 8.1155 17.5587 8.20678L17.8893 9.66991ZM5.5 19.7413H19.2V18.2413H5.5V19.7413ZM13.4545 6.78206C13.6872 7.35843 14.165 8.18012 14.8765 8.8128C15.6011 9.45718 16.633 9.95371 17.8893 9.66991L17.5587 8.20678C16.916 8.35198 16.3609 8.12551 15.8733 7.69189C15.3725 7.24656 15.0128 6.63526 14.8455 6.22062L13.4545 6.78206Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div class="flex flex-col gap-[3px]">
                <div class="flex flex-row gap-[3px] items-center">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.00033 11.3307C7.6467 11.3307 7.30757 11.1903 7.05752 10.9402C6.80747 10.6902 6.66699 10.351 6.66699 9.9974C6.66699 9.2574 7.26033 8.66406 8.00033 8.66406C8.35395 8.66406 8.69309 8.80454 8.94313 9.05459C9.19318 9.30464 9.33366 9.64377 9.33366 9.9974C9.33366 10.351 9.19318 10.6902 8.94313 10.9402C8.69309 11.1903 8.35395 11.3307 8.00033 11.3307ZM12.0003 13.3307V6.66406H4.00033V13.3307H12.0003ZM12.0003 5.33073C12.3539 5.33073 12.6931 5.47121 12.9431 5.72125C13.1932 5.9713 13.3337 6.31044 13.3337 6.66406V13.3307C13.3337 13.6844 13.1932 14.0235 12.9431 14.2735C12.6931 14.5236 12.3539 14.6641 12.0003 14.6641H4.00033C3.6467 14.6641 3.30756 14.5236 3.05752 14.2735C2.80747 14.0235 2.66699 13.6844 2.66699 13.3307V6.66406C2.66699 5.92406 3.26033 5.33073 4.00033 5.33073H4.66699V3.9974C4.66699 3.11334 5.01818 2.26549 5.6433 1.64037C6.26842 1.01525 7.11627 0.664063 8.00033 0.664062C8.43807 0.664062 8.87152 0.750282 9.27594 0.917797C9.68036 1.08531 10.0478 1.33084 10.3573 1.64037C10.6669 1.9499 10.9124 2.31737 11.0799 2.72178C11.2474 3.1262 11.3337 3.55966 11.3337 3.9974V5.33073H12.0003ZM8.00033 1.9974C7.46989 1.9974 6.96118 2.20811 6.58611 2.58318C6.21104 2.95826 6.00033 3.46696 6.00033 3.9974V5.33073H10.0003V3.9974C10.0003 3.46696 9.78961 2.95826 9.41454 2.58318C9.03947 2.20811 8.53076 1.9974 8.00033 1.9974Z"
                      fill="currentColor"
                      fill-opacity="0.5"
                    />
                  </svg>
                  <span class="font-[400] text-gray-400 text-[14px]">
                    Пароль
                  </span>
                </div>

                <div
                  class="flex flex-col items-start sm:flex-row justify-between w-full sm:items-center"
                >
                  <div class="flex flex-col sm:flex-row gap-[8px] max-w-[85%]">
                    <span
                      class="ym-hide-content text-[17px] font-[500] overflow-hidden truncate"
                    >
                      *************
                    </span>
                  </div>
                  <button
                    class="text-[13px] font-[400] landing-[13px] hover:underline"
                    name="change-phone"
                    @click="clickChangePassword"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25px"
                      height="25px"
                      viewBox="0 -0.5 25 25"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M17.265 4.16231L19.21 5.74531C19.3978 5.9283 19.5031 6.17982 19.5015 6.44201C19.5 6.70421 19.3919 6.9545 19.202 7.13531L17.724 8.93531L12.694 15.0723C12.6069 15.1749 12.4897 15.2473 12.359 15.2793L9.75102 15.8793C9.40496 15.8936 9.10654 15.6384 9.06702 15.2943L9.18902 12.7213C9.19806 12.5899 9.25006 12.4652 9.33702 12.3663L14.15 6.50131L15.845 4.43331C16.1743 3.98505 16.7938 3.86684 17.265 4.16231Z"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M5.5 18.2413C5.08579 18.2413 4.75 18.5771 4.75 18.9913C4.75 19.4056 5.08579 19.7413 5.5 19.7413V18.2413ZM19.2 19.7413C19.6142 19.7413 19.95 19.4056 19.95 18.9913C19.95 18.5771 19.6142 18.2413 19.2 18.2413V19.7413ZM14.8455 6.22062C14.6904 5.83652 14.2534 5.65082 13.8693 5.80586C13.4852 5.9609 13.2995 6.39796 13.4545 6.78206L14.8455 6.22062ZM17.8893 9.66991C18.2933 9.57863 18.5468 9.17711 18.4556 8.77308C18.3643 8.36904 17.9628 8.1155 17.5587 8.20678L17.8893 9.66991ZM5.5 19.7413H19.2V18.2413H5.5V19.7413ZM13.4545 6.78206C13.6872 7.35843 14.165 8.18012 14.8765 8.8128C15.6011 9.45718 16.633 9.95371 17.8893 9.66991L17.5587 8.20678C16.916 8.35198 16.3609 8.12551 15.8733 7.69189C15.3725 7.24656 15.0128 6.63526 14.8455 6.22062L13.4545 6.78206Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="bg-black/50 rounded-[12px] text-white px-[20px] py-[10px] group relative border-[2px] border-gray-700 overflow-hidden w-full flex flex-col gap-[10px]"
        >
          <p class="font-[700]">Дополнительная информация</p>
          <div class="flex flex-col gap-[3px]">
            <span class="font-[400] text-gray-400 text-[14px]"
              >Организация</span
            >
            <div
              class="flex flex-col items-start sm:flex-row justify-between w-full sm:items-center"
            >
              <div class="flex flex-col sm:flex-row gap-[8px] max-w-[85%]">
                <span
                  class="ym-hide-content text-[17px] font-[500] overflow-hidden truncate"
                >
                  {{ user?.companyName ?? 'Нет данных' }}
                </span>
              </div>
              <button
                class="text-[13px] font-[400] landing-[13px] hover:underline"
                @click="clickChangeUser('Организация', 'companyName')"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25px"
                  height="25px"
                  viewBox="0 -0.5 25 25"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17.265 4.16231L19.21 5.74531C19.3978 5.9283 19.5031 6.17982 19.5015 6.44201C19.5 6.70421 19.3919 6.9545 19.202 7.13531L17.724 8.93531L12.694 15.0723C12.6069 15.1749 12.4897 15.2473 12.359 15.2793L9.75102 15.8793C9.40496 15.8936 9.10654 15.6384 9.06702 15.2943L9.18902 12.7213C9.19806 12.5899 9.25006 12.4652 9.33702 12.3663L14.15 6.50131L15.845 4.43331C16.1743 3.98505 16.7938 3.86684 17.265 4.16231Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5.5 18.2413C5.08579 18.2413 4.75 18.5771 4.75 18.9913C4.75 19.4056 5.08579 19.7413 5.5 19.7413V18.2413ZM19.2 19.7413C19.6142 19.7413 19.95 19.4056 19.95 18.9913C19.95 18.5771 19.6142 18.2413 19.2 18.2413V19.7413ZM14.8455 6.22062C14.6904 5.83652 14.2534 5.65082 13.8693 5.80586C13.4852 5.9609 13.2995 6.39796 13.4545 6.78206L14.8455 6.22062ZM17.8893 9.66991C18.2933 9.57863 18.5468 9.17711 18.4556 8.77308C18.3643 8.36904 17.9628 8.1155 17.5587 8.20678L17.8893 9.66991ZM5.5 19.7413H19.2V18.2413H5.5V19.7413ZM13.4545 6.78206C13.6872 7.35843 14.165 8.18012 14.8765 8.8128C15.6011 9.45718 16.633 9.95371 17.8893 9.66991L17.5587 8.20678C16.916 8.35198 16.3609 8.12551 15.8733 7.69189C15.3725 7.24656 15.0128 6.63526 14.8455 6.22062L13.4545 6.78206Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div class="flex flex-col gap-[3px]">
            <span class="font-[400] text-gray-400 text-[14px]"
              >Юридический адрес</span
            >
            <div
              class="flex flex-col items-start sm:flex-row justify-between w-full sm:items-center"
            >
              <div class="flex flex-col sm:flex-row gap-[8px] max-w-[85%]">
                <span
                  class="ym-hide-content text-[17px] font-[500] overflow-hidden truncate"
                >
                  {{ user?.address ?? 'Нет данных' }}
                </span>
              </div>
              <button
                class="text-[13px] font-[400] landing-[13px] hover:underline"
                name="change-phone"
                @click="clickChangeUser('Юридический адрес', 'address')"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25px"
                  height="25px"
                  viewBox="0 -0.5 25 25"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17.265 4.16231L19.21 5.74531C19.3978 5.9283 19.5031 6.17982 19.5015 6.44201C19.5 6.70421 19.3919 6.9545 19.202 7.13531L17.724 8.93531L12.694 15.0723C12.6069 15.1749 12.4897 15.2473 12.359 15.2793L9.75102 15.8793C9.40496 15.8936 9.10654 15.6384 9.06702 15.2943L9.18902 12.7213C9.19806 12.5899 9.25006 12.4652 9.33702 12.3663L14.15 6.50131L15.845 4.43331C16.1743 3.98505 16.7938 3.86684 17.265 4.16231Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5.5 18.2413C5.08579 18.2413 4.75 18.5771 4.75 18.9913C4.75 19.4056 5.08579 19.7413 5.5 19.7413V18.2413ZM19.2 19.7413C19.6142 19.7413 19.95 19.4056 19.95 18.9913C19.95 18.5771 19.6142 18.2413 19.2 18.2413V19.7413ZM14.8455 6.22062C14.6904 5.83652 14.2534 5.65082 13.8693 5.80586C13.4852 5.9609 13.2995 6.39796 13.4545 6.78206L14.8455 6.22062ZM17.8893 9.66991C18.2933 9.57863 18.5468 9.17711 18.4556 8.77308C18.3643 8.36904 17.9628 8.1155 17.5587 8.20678L17.8893 9.66991ZM5.5 19.7413H19.2V18.2413H5.5V19.7413ZM13.4545 6.78206C13.6872 7.35843 14.165 8.18012 14.8765 8.8128C15.6011 9.45718 16.633 9.95371 17.8893 9.66991L17.5587 8.20678C16.916 8.35198 16.3609 8.12551 15.8733 7.69189C15.3725 7.24656 15.0128 6.63526 14.8455 6.22062L13.4545 6.78206Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div class="h-[1px] bg-gray-700 w-full" />

          <div class="flex flex-col gap-[3px]">
            <span class="font-[400] text-gray-400 text-[14px]">
              Дата создания аккаунта
            </span>

            <span class="text-[17px] font-[500] truncate">
              {{
                user?.createdAt && new Date(user.createdAt).toLocaleDateString()
              }}</span
            >
          </div>
          <div class="flex flex-col gap-[3px]">
            <span class="font-[400] text-gray-400 text-[14px]">
              Роль аккаунта
            </span>

            <span class="text-[17px] font-[500] truncate">
              {{ user?.role === 1 ? 'Администратор' : 'Пользователь' }}</span
            >
          </div>
        </div>
      </div>
      <div
        class="text-white px-[20px] py-[10px] bg-black/50 flex w-full border-gray-700 border-[2px] rounded-[12px]"
      >
        <p class="font-[700]">Мои заявки</p>
      </div>
    </div>
  </div>
  <el-dialog
    v-model="showUpdateUserModal"
    class="px-[20px] min-w-[260px] max-w-[400px]"
    :title="modalTitle"
    @close="closeUpdateUserModal"
  >
    <div class="flex justify-center w-full min-h-full">
      <el-form class="font-[700] w-full text-[35px]">
        <el-form-item class="mb-[10px]">
          <div class="flex flex-col gap-[10px] w-full">
            <input
              class="px-[10px] py-[5px] border-[1px] border-gray-500 rounded-[6px] focus:outline-none"
              :class="{
                '!border-red-500 ': errors.length
              }"
              v-model="userData[selectedUpdateType]"
            />
          </div>
        </el-form-item>

        <div
          class="text-[14px] text-red-500"
          v-for="error in errors"
          :key="error"
        >
          <p>{{ getErrorLabel(error) }}</p>
        </div>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeUpdateUserModal()">Отмена</el-button>
        <el-button type="primary" @click="updateMe()"> Подтвердить </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { userStore } from '../stores/user'
import { useRouter } from 'vue-router'

type UpdateType = 'fullName' | 'email' | 'phone' | 'companyName' | 'address'

type UserDataType = {
  fullName: string
  email: string
  phone: string
  companyName: string
  address: string
}

const router = useRouter()

const storeUser = userStore()

const errors = ref([] as string[])

const user = computed(() => {
  return storeUser.user
})
const selectedUpdateType = ref('' as UpdateType)
const userData: { [key in UpdateType]: string } = reactive({} as UserDataType)
const modalTitle = ref('')
const showUpdateUserModal = ref(false)

const closeUpdateUserModal = () => {
  modalTitle.value = ''
  showUpdateUserModal.value = false
  initUserData()
  errors.value = []
}

const getErrorLabel = (error: string) => {
  const errors: Record<string, string> = {
    'email must be an email': 'Некорректный email'
  }
  return errors[error] || 'Ошибка обновления данных'
}

const clickChangeUser = (title: string, type: UpdateType) => {
  modalTitle.value = title
  showUpdateUserModal.value = true
  selectedUpdateType.value = type
}

const avatarUrl = computed(() => {
  return `${import.meta.env.VITE_SERVER_URL}${user.value?.avatarUrl}`
})

watch(user, async (value) => {
  if (!value) {
    await router.push('/')
    return
  }
  initUserData()
})

const initUserData = () => {
  userData.fullName = user.value ? user.value.fullName || '' : ''
  userData.address = user.value ? user.value.address || '' : ''
  userData.companyName = user.value ? user.value.companyName || '' : ''
  userData.email = user.value ? user.value.email || '' : ''
  userData.phone = user.value ? user.value.phone || '' : ''
}

const updateMe = async () => {
  try {
    await storeUser.updateMe(userData)
    closeUpdateUserModal()
  } catch (err: any) {
    errors.value = err.response.data.message
  }
}

const uploadAvatar = async (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target && target.files) {
    const file = target.files[0]
    const formData = new FormData()
    formData.append('files', file)
    await storeUser.uploadAvatar(formData)
  }
}

const resetAvatar = () => {
  storeUser.resetAvatar()
}
</script>
