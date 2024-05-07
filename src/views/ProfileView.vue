<template>
  <div v-motion-fade class="px-[20px] md:px-[100px]">
    <div class="w-full flex-col gap-[20px]">
      <div
        class="flex flex-col xl:flex-row w-full overflow-hidden gap-[20px] mb-[20px]"
      >
        <div
          class="flex sm:flex-row flex-col border-[2px] border-gray-700 bg-black/50 w-full sm:h-[300px] overflow-hidden rounded-[12px]"
        >
          <div
            class="flex flex-col gap-[10px] items-center sm:items-start py-[40px] sm:py-0"
          >
            <div
              class="bg-black rounded-[12px] border-[2px] border-gray-700 sm:border-0 sm:rounded-l-[12px] group relative overflow-hidden w-[300px] h-[300px] flex items-center justify-center"
            >
              <img
                v-if="user?.avatarUrl"
                class="w-full h-full object-cover"
                :src="avatarUrl"
                alt="user avatar"
              />
              <el-dropdown
                v-if="isCurrentUser"
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
            class="flex flex-col gap-[20px] w-full overflow-hidden mb-[40px] sm:mb-0 text-white px-[20px] justify-center rounded-r-[12px]"
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
              <div class="flex flex-row items-start justify-between w-full">
                <span class="ym-hide-content text-[17px] font-[500] truncate">
                  {{ user?.fullName ?? 'Не установлено' }}
                </span>
                <button
                  v-if="isCurrentUser"
                  class="text-[13px] font-[400] landing-[13px] hover:scale-[1.2] transition duration-200"
                  name="change-username"
                  @click="clickChangeUser('Имя пользователя', 'fullName')"
                >
                  <svg
                    class="opacity-[0.5]"
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
              <div class="flex gap-[3px] items-center">
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
                <span class="font-[400] text-gray-400 text-[14px]">Логин</span>
              </div>
              <div class="flex items-start justify-between w-full">
                <span class="ym-hide-content text-[17px] font-[500] truncate">
                  {{ user?.login ?? '???' }}
                </span>
                <button
                  v-if="isCurrentUser"
                  class="text-[13px] font-[400] landing-[13px] hover:scale-[1.2] transition duration-200"
                  @click="clickChangeUser('Логин', 'login')"
                >
                  <svg
                    class="opacity-[0.5]"
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
                <span class="font-[400] text-gray-400 text-[14px]">Email</span>
              </div>
              <div class="flex items-start justify-between w-full">
                <span class="ym-hide-content text-[17px] font-[500] truncate">
                  {{ user?.email ?? '???' }}
                </span>
                <button
                  v-if="isCurrentUser"
                  class="text-[13px] font-[400] landing-[13px] hover:scale-[1.2] transition duration-200"
                  name="change-email"
                  @click="clickChangeUser('Email', 'email')"
                >
                  <svg
                    class="opacity-[0.5]"
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
              <div class="flex items-start justify-between w-full">
                <div class="flex flex-col sm:flex-row gap-[8px] max-w-[85%]">
                  <span
                    class="ym-hide-content text-[17px] font-[500] overflow-hidden truncate"
                  >
                    {{ user?.phone ?? 'Не установлено' }}
                  </span>
                </div>
                <button
                  v-if="isCurrentUser"
                  class="text-[13px] font-[400] landing-[13px] hover:scale-[1.2] transition duration-200"
                  name="change-phone"
                  @click="clickChangeUser('Телефон', 'phone')"
                >
                  <svg
                    class="opacity-[0.5]"
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
        <div
          class="bg-black/50 rounded-[12px] text-white px-[20px] xl:w-[65%] w-full h-[300px] justify-center group relative border-[2px] border-gray-700 overflow-hidden flex flex-col gap-[10px]"
        >
          <div class="flex flex-col gap-[3px]">
            <span class="font-[400] text-gray-400 text-[14px]"
              >Организация</span
            >
            <div class="flex items-start justify-between w-full">
              <div class="flex flex-col sm:flex-row gap-[8px] max-w-[85%]">
                <span
                  class="ym-hide-content text-[17px] font-[500] overflow-hidden truncate"
                >
                  {{ user?.companyName ?? 'Нет данных' }}
                </span>
              </div>
              <button
                v-if="isCurrentUser"
                class="text-[13px] font-[400] landing-[13px] hover:scale-[1.2] transition duration-200"
                @click="clickChangeUser('Организация', 'companyName')"
              >
                <svg
                  class="opacity-[0.5]"
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
            <div class="flex items-start justify-between w-full">
              <div class="flex gap-[8px] max-w-[85%]">
                <span
                  class="ym-hide-content text-[17px] font-[500] overflow-hidden truncate"
                >
                  {{ user?.address ?? 'Нет данных' }}
                </span>
              </div>
              <button
                v-if="isCurrentUser"
                class="text-[13px] font-[400] landing-[13px] hover:scale-[1.2] transition duration-200"
                name="change-phone"
                @click="clickChangeUser('Юридический адрес', 'address')"
              >
                <svg
                  class="opacity-[0.5]"
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

          <div class="h-[1px] my-[5px] bg-gray-700 w-full" />

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
          <div class="flex justify-between items-end">
            <div class="flex flex-col gap-[3px]">
              <span class="font-[400] text-gray-400 text-[14px]">
                Роль аккаунта
              </span>

              <span class="text-[17px] font-[500] truncate">
                {{ user?.role === 1 ? 'Администратор' : 'Пользователь' }}</span
              >
            </div>
            <el-button
              v-if="isCurrentUser"
              @click="showPasswordModal = true"
              class="w-[150px]"
              >Сменить пароль</el-button
            >
          </div>
        </div>
      </div>
      <div
        class="text-white flex-col py-[10px] bg-black/50 mb-[20px] flex w-full border-gray-700 border-[2px] rounded-[12px]"
      >
        <div
          class="font-[700] px-[20px] pb-[10px] flex flex-col md:flex-row justify-between gap-[10px] items-center"
        >
          <p class="flex-none">
            {{ isCurrentUser ? 'Мои заявки' : 'Заявки пользователя' }}
          </p>
          <el-radio-group class="flex justify-center" v-model="statusFilter">
            <el-radio
              class="hover:scale-105 hover:transition duration-300"
              label=""
            >
              Все
            </el-radio>
            <el-radio
              class="hover:scale-105 hover:transition duration-300"
              label="PENDING"
            >
              Ожидание
            </el-radio>
            <el-radio
              class="hover:scale-105 hover:transition duration-300"
              label="ACCEPTED"
            >
              Одобрено
            </el-radio>
            <el-radio
              class="hover:scale-105 hover:transition duration-300"
              label="CANCELED"
            >
              Отклонено
            </el-radio>
          </el-radio-group>
        </div>
        <el-table
          v-if="filteredApplications.length"
          class="text-[13px] text-center w-full min-h-[300px]"
          :data="filteredApplications"
        >
          <el-table-column
            prop="id"
            width="80px"
            label="Номер"
          ></el-table-column>
          <el-table-column prop="comment" label="Информация">
            <template #default="{ row }">
              <el-button
                type="info"
                size="small"
                @click="selectedAppId = row.id"
              >
                Посмотреть
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="Стоимость">
            <template #default="{ row }">
              <el-tag type="success"> {{ row.cost }} руб. </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="Статус">
            <template #default="{ row }">
              <el-dropdown
                v-if="storeUser.user?.role === UserRole.admin"
                trigger="click"
                placement="bottom"
              >
                <el-button size="small" :type="getButtonType(row.status)">
                  {{ localize(row.status) }}
                </el-button>

                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      @click="changeStatus(row.id, 'ACCEPTED')"
                      :disabled="row.status === 'ACCEPTED'"
                      class="text-green-500"
                    >
                      Одобрена
                    </el-dropdown-item>
                    <el-dropdown-item
                      @click="changeStatus(row.id, 'PENDING')"
                      :disabled="row.status === 'PENDING'"
                    >
                      Ожидание
                    </el-dropdown-item>
                    <el-dropdown-item
                      @click="changeStatus(row.id, 'CANCELED')"
                      :disabled="row.status === 'CANCELED'"
                      class="text-red-500"
                    >
                      Отменена
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              <el-tag v-else :type="getButtonType(row.status)">
                {{ localize(row.status) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="Действия">
            <template #default="{ row }">
              <el-popconfirm
                cancel-button-text="Нет"
                confirm-button-text="Да"
                @confirm="removeMyApplication(row.id)"
                width="160"
                title="Удалить заявку?"
              >
                <template #reference>
                  <el-button type="danger" size="small">Удалить</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <div
          class="w-full h-[300px] flex justify-center items-center text-[16px] font-[700]"
          v-else
        >
          Список заявок пуст
        </div>
      </div>
    </div>
  </div>
  <el-dialog
    v-model="showUpdateUserModal"
    class="px-[20px] min-w-[320px] max-w-[400px]"
    :title="modalTitle"
    @close="closeUpdateUserModal"
  >
    <div class="flex justify-center w-full min-h-full">
      <el-form @submit.prevent="updateMe" class="font-[700] w-full text-[35px]">
        <el-form-item class="mb-[10px]">
          <div class="flex flex-col gap-[10px] w-full">
            <input
              v-if="selectedUpdateType === 'phone'"
              v-maska
              data-maska="+7(###)-###-##-##"
              class="px-[10px] py-[5px] border-[1px] border-gray-500 rounded-[6px] focus:outline-none"
              :class="{
                '!border-red-500 ': errors.length
              }"
              v-model="userData[selectedUpdateType]"
            />
            <input
              v-else
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
        <el-button @click="closeUpdateUserModal">Отмена</el-button>
        <el-button type="primary" @click="updateMe"> Подтвердить </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog
    v-model="showPasswordModal"
    class="px-[20px] min-w-[320px] max-w-[400px]"
    title="Сменить пароль"
    @close="closePasswordModal"
  >
    <div class="flex justify-center w-full min-h-full">
      <el-form class="font-[700] w-full text-[35px]">
        <el-form-item class="mb-[10px]">
          <div class="flex flex-col gap-[15px] w-full">
            <p>Старый пароль</p>
            <input
              type="password"
              v-model="passwordData.old"
              placeholder="Введите старый пароль"
              class="px-[10px] py-[5px] border-[1px] border-gray-500 rounded-[6px] focus:outline-none"
              :class="{
                '!border-red-500 ': errors.length
              }"
            />
            <p>Новый пароль</p>

            <input
              type="password"
              v-model="passwordData.new"
              placeholder="Введите новый пароль"
              class="px-[10px] py-[5px] border-[1px] border-gray-500 rounded-[6px] focus:outline-none"
              :class="{
                '!border-red-500 ': errors.length
              }"
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
        <el-button @click="closePasswordModal">Отмена</el-button>
        <el-button type="primary" @click="changePassword">
          Подтвердить
        </el-button>
      </span>
    </template>
  </el-dialog>
  <el-drawer
    v-model="showApplicationDrawer"
    @close="selectedAppId = null"
    class="text-white min-w-[350px]"
    :title="'Информация о заявке #' + selectedApp?.id"
    direction="rtl"
  >
    <div class="h-full w-full flex flex-col gap-[20px]">
      <div class="border border-[#414243] rounded-[6px]">
        <el-table :data="selectedApp?.pubs" class="rounded-[6px] bg-[#141414]">
          <el-table-column property="name" label="Издание" />
          <el-table-column property="date" label="Дата" />
        </el-table>
      </div>

      <el-card class="rounded-[12px]">
        <div class="overflow-hidden">
          <p class="pb-[10px] text-gray-400">Комментарий</p>
          <div class="break-words">
            <span>
              {{ selectedApp?.comment }}
            </span>
          </div>
        </div>
      </el-card>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { userStore } from '../stores/user'
import { usersStore } from '../stores/users'
import { pubsStore } from '@/stores/publications'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { vMaska } from 'maska'
import { applicationsStore } from '@/stores/applications'
import { localizeApplicationStatus } from '@/plugins/helpers'
import { Application, ApplicationStatus } from '@/types/applicationTypes'
import { UserRole } from '@/types/userTypes'

type StatusFilter = '' | 'ACCEPTED' | 'PENDING' | 'CANCELLED'

type UpdateType =
  | 'fullName'
  | 'login'
  | 'email'
  | 'phone'
  | 'companyName'
  | 'address'

type UserDataType = {
  fullName: string
  login: string
  email: string
  phone: string
  companyName: string
  address: string
}

const router = useRouter()

const storeUser = userStore()
const storeUsers = usersStore()
const storeApplications = applicationsStore()
const storePublications = pubsStore()

const errors = ref([] as string[])

const showPasswordModal = ref(false as Boolean)
const selectedAppId = ref(null as number | null)
const statusFilter = ref('' as StatusFilter)
const passwordData = reactive({
  old: '',
  new: ''
} as { old: string; new: string })

const user = computed(() => {
  return isCurrentUser.value
    ? storeUser.user
    : storeUsers.users.find(
        (user) => user.id === Number(router.currentRoute.value.params.id)
      )
})
const isCurrentUser = computed(() => {
  if (!router.currentRoute.value.params.id) return true
  return Number(router.currentRoute.value.params.id) === storeUser.user?.id
})
const showApplicationDrawer = computed(() => {
  return !!selectedAppId.value
})
const userApplications = computed(() => {
  return storeApplications.userApplications
})
const selectedApp = computed(() => {
  const application = userApplications.value.find(
    (app: Application) => app.id === selectedAppId.value
  )
  if (!application) return null
  const pubs = application.pubs.map((pub) => {
    return {
      id: pub.id,
      date: new Date(pub.date).toLocaleDateString().replaceAll('/', '.'),
      name: storePublications.publications.find((_pub) => _pub.id === pub.id)
        ?.name
    }
  })
  return { ...application, pubs }
})

const filteredApplications = computed(() => {
  if (statusFilter.value.length) {
    return userApplications.value.filter(
      (app) => app.status === statusFilter.value
    )
  }
  return userApplications.value
})
const selectedUpdateType = ref('' as UpdateType)
const userData: { [key in UpdateType]: string } = reactive({} as UserDataType)
const modalTitle = ref('')
const showUpdateUserModal = ref(false)

const localize = (status: ApplicationStatus) => {
  return localizeApplicationStatus(status)
}

const getButtonType = (status: ApplicationStatus) => {
  if (status === 'ACCEPTED') return 'success'
  if (status === 'CANCELED') return 'danger'
  if (status === 'PENDING') return 'info'
}

const closeUpdateUserModal = () => {
  modalTitle.value = ''
  showUpdateUserModal.value = false
  initUserData()
  errors.value = []
}

const closePasswordModal = () => {
  passwordData.new = ''
  passwordData.old = ''
  showPasswordModal.value = false
  errors.value = []
}

const getErrorLabel = (error: string) => {
  const errors: Record<string, string> = {
    'email must be an email': 'Некорректный email',
    'new must be longer than or equal to 6 characters':
      'Длина пароля не менее 6 символов',
    'Incorrect old password': 'Старый пароль введен неверно',
    'Passwords are the same': 'Пароли совпадают'
  }
  return errors[error] || 'Ошибка обновления данных'
}

const clickChangeUser = (title: string, type: UpdateType) => {
  modalTitle.value = title
  showUpdateUserModal.value = true
  selectedUpdateType.value = type
}

const avatarUrl = computed(() => {
  return user.value?.avatarUrl
})

watch(user, async (value) => {
  if (!value) {
    await router.push('/')
    return
  }
  initUserData()
})

onMounted(() => {
  initUserData()
})

const initUserData = () => {
  if (!user.value?.id) return
  const fields: (keyof UserDataType)[] = [
    'fullName',
    'login',
    'address',
    'companyName',
    'email',
    'phone'
  ]
  fields.forEach((field) => {
    userData[field] = user?.value?.[field] || ''
  })
  storeApplications.getUserApplications(user.value?.id)
}
const updateMe = async () => {
  try {
    await storeUser.updateMe(userData)
    closeUpdateUserModal()
    ElNotification({
      title: `Данные успешно изменены`,
      type: 'success',
      duration: 1000
    })
  } catch (err: any) {
    errors.value = [err.response.data.message].flat()
  }
}

const changePassword = async () => {
  errors.value = []
  try {
    await storeUser.changePassword(passwordData)
    closePasswordModal()
    ElNotification({
      title: `Пароль успешно изменен`,
      type: 'success',
      duration: 1000
    })
  } catch (err: any) {
    errors.value = [err.response.data.message].flat()
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

const changeStatus = (id: number, status: ApplicationStatus) => {
  storeApplications.changeApplicationStatus(id, status)
}

const removeMyApplication = (applicationId: number) => {
  storeApplications.deleteMyApplication(applicationId)
}

const resetAvatar = () => {
  storeUser.resetAvatar()
}
</script>
