<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import ui from 'beercss';
// Icons
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';

// Functions
function btnGithub() {
  window.open('https://github.com/landon262547', '_blank');
}
function btnToggleDarkMode() {
  if (ui("mode") == "dark") {
    ui("mode", "light");
    return;
  }
  ui("mode", "dark");
  return;
}
</script>

<template>
  <!-- Desktop -->
  <nav class="l">
    <h5 class="max">Promptpay QR-code Maker</h5>
    <!-- Settings -->
    <div class="tertiary-container left-round right-round">
      <button class="circle transparent" @click="btnToggleDarkMode">
        <FontAwesomeIcon :icon="faLightbulb"></FontAwesomeIcon>
      </button>
      <button class="circle transparent">
        <FontAwesomeIcon :icon="faLanguage"></FontAwesomeIcon>
        <menu class="no-wrap">
          <li v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" @click="$i18n.locale = locale"><img
              class="small small-adjust" :src="`/${locale}.svg`" />
          </li>
        </menu>
      </button>
    </div>
    <!-- About -->
    <div class="secondary-container left-round right-round">
      <button class="circle transparent">
        <FontAwesomeIcon :icon="faDollarSign"></FontAwesomeIcon>
      </button>
      <button class="circle transparent" @click="btnGithub">
        <FontAwesomeIcon :icon="faGithub"></FontAwesomeIcon>
      </button>
      <button class="circle transparent">
        <FontAwesomeIcon :icon="faQuestion"></FontAwesomeIcon>
      </button>
    </div>
  </nav>

  <!-- Mobile -->
  <nav class="no-margin m s">
    <h5 class="max">Promptpay QR-code Maker</h5>
    <button class="circle transparent">
      <FontAwesomeIcon :icon="faGear"></FontAwesomeIcon>
    </button>
    <button class="circle transparent">
      <FontAwesomeIcon :icon="faQuestion"></FontAwesomeIcon>
    </button>
  </nav>
</template>

<style scoped>
.small-adjust {
  width: 70px;
}
</style>
