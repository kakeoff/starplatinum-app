<template>
  <div class="flex flex-col">
    <div class="contact-text mb-8">
      <div id="phone" type="tel" class="cta-btn w-fit">
        <a href="tel:+79911126263">
          <font-awesome-icon
            class="h-[16px] w-[16px]"
            icon="fa-solid fa-phone"
          ></font-awesome-icon>
          Телефон: +79911126263
        </a>
      </div>
    </div>

    <div class="contact-text">
      <div class="cta-btn w-fit">
        <a href="mailto:saprocontact@gmail.com" title="Email me!">
          <font-awesome-icon icon="fa-brands fa-google"></font-awesome-icon>
          Gmail
        </a>
      </div>
    </div>

    <div class="contact-text mt-8">
      <div class="cta-btn w-fit">
        <a
          href="https://goo.gl/maps/KV5vUc11qTc1zGN76"
          target="_blank"
          title="Email me!"
        >
          <font-awesome-icon icon="fa-solid fa-map" /> Адрес: г. Ярославль, ул.
          Тутаевское ш., 31А
        </a>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  methods: {},
});
</script>
