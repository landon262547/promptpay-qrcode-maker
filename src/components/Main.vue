<script setup lang="ts">
// FYI: Main.vue is used to be CanvasViewer.vue

// Thinking about moving NaviBar.vue inside this file, but I think this is not a good idea,
// since it make this long-ass Main.vue even bigger and longer.
import NaviBar from './NaviBar.vue';

import generatePayload from "promptpay-qr";
import QRCode from 'easyqrcodejs';
import { onMounted, onUpdated, ref } from 'vue';

// Considering remove pinia but I can't make it working after removing pinia and stores thingy.
// So I won't touch this again, just like "If it still working, better not touch it" lmao.
import { xcanvas_state, qrcode_state } from '@/stores/counter';
const xcanvasS = xcanvas_state();
const qrcodeS = qrcode_state();

// Icons
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { faPaintBrush } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-solid-svg-icons';

// For images inside canvas.
var thaiqrpay_logo = new Image();
var promptpay_logo = new Image();
var qrcode_image = new Image();
var thaiqrpay_mini_logo = new Image();
var qrcodeImageData = '';

// Default settings.
const layout = ref('basic');
const idNumber = ref(912345678);
const reqAmount = ref();

// xcanvas functions.
// This used to be a separated ts file, but yeah like pinia thingy if it get separated from this CanvasViewer.vue.
// I can't make this working, so I combined into this one file.
// Can I call myself a duct tape developer now? (I hate self-claiming)
// Bonus (unrelated but yeah) : https://www.youtube.com/watch?v=JUlKoaR4di0
//        This make me calm.
//        This is not required to listen while exploring this code, but I always listen to this song
//        while coding this piece of ...., I don't really care If this can represent my feeling to someone.
const xcanvas = ({
  init: function init() {
    // viewer
    const tm = document.getElementById("xcanvas") as HTMLCanvasElement;
    xcanvasS.handle = tm.getContext("2d") as CanvasRenderingContext2D;
    qrcodeS.handle = document.getElementById("qrcode") as HTMLCanvasElement;
    // bigsize
    const tm2 = document.getElementById("xcanvas-bigsize") as HTMLCanvasElement;
    xcanvasS.bigsize_handle = tm2.getContext("2d") as CanvasRenderingContext2D;

    // idk if this function should return something, sanity check needed.
    return true;
  },
  render: function render() {

    // Introduction to this render function and its method:
    // I took my own generated promptpay qrcode created by SCB App for the reference,
    // measuring position and size of logo, header and qrcode itself closest to the original,
    // then division by 2 for the canvas viewer, but when download it will use the default fullsize of its canvas
    // by using hidden canvas instead of canvas viewer that visible to the user.
    // Some of references are also come from below.
    // ref: https://apiportal.kasikornbank.com/product/public/LandingPage/QR%20Payment/Introduction/Guidance%20for%20name%20and%20logo%20of%20the%20Thai%20QR%20Payment
    //      https://github.com/dtinth/promptpay-qr/blob/master/index.js
    //      https://www.blognone.com/node/95133

    // Clear main canvas then draw white background.
    if (xcanvasS.handle) {
      xcanvasS.handle.clearRect(0, 0, 9999, 9999);
      xcanvasS.handle.fillStyle = "#ffffff";
      xcanvasS.handle.fillRect(0, 0, 9999, 9999);
    }
    if (xcanvasS.bigsize_handle) {
      xcanvasS.bigsize_handle.clearRect(0, 0, 9999, 9999);
      xcanvasS.bigsize_handle.fillStyle = "#ffffff";
      xcanvasS.bigsize_handle.fillRect(0, 0, 9999, 9999);
    }

    // Check reqAmount, if not then don't pass amount into promptpay-qr.
    if (reqAmount) {
      qrcodeS.data = generatePayload('' + idNumber.value, { amount: reqAmount.value });
    } else {
      qrcodeS.data = generatePayload('' + idNumber.value, {});
    }

    // QR-code renderer settings.
    // ref: https://github.com/ushelp/EasyQRCodeJS?tab=readme-ov-file#options
    // ref set colorLight to transparent: https://github.com/ushelp/EasyQRCodeJS/issues/12#issuecomment-614457345
    // also colorLight to transparent is not in the readme, how I suppose to know that?
    // Correction Level must be 15% so M as Medium, according to promptpay specs.
    // ref: https://apiportal.kasikornbank.com/product/public/LandingPage/QR%20Payment/Introduction/Guidance%20for%20name%20and%20logo%20of%20the%20Thai%20QR%20Payment
    var qrcode_config = {
      text: qrcodeS.data,
      width: 485,
      height: 485,
      colorDark: "#000000",
      colorLight: "transparent",
      correctLevel: QRCode.CorrectLevel.M,
      drawer: 'canvas' // considering change to SVG...
    }

    // Clear qrcode div created by EasyQRCodeJS every time.
    if (document.getElementById("qrcode")) {
      document.getElementById("qrcode")!.innerHTML = '';
    }

    // Generate QRCode into qrcode div.
    qrcodeS.qrcode = new QRCode(document.getElementById("qrcode"), qrcode_config);

    // Grab canvas data from qrcode div and translate into DataURL for putting into main canvas.
    var qrcodeCanvas;
    var qrcodeDiv = document.getElementById("qrcode");
    if (qrcodeDiv) {
      qrcodeCanvas = document.getElementsByTagName("canvas")[0];
    }
    if (qrcodeCanvas) {
      qrcodeImageData = qrcodeCanvas.toDataURL("image/png");
    }

    // Layout switch, whenever user need to use for shop, basic or just qrcode.
    switch (layout.value) {
      case "shop":
        if (xcanvasS.handle) {
          // Shop layout settings.
          xcanvasS.width = 900;
          xcanvasS.height = 1250;
          xcanvasS.header_height = 164;
          xcanvasS.ThaiQRPayLogo_posX = 256;
          xcanvasS.ThaiQRPayLogo_posY = 1;
          xcanvasS.ThaiQRPayLogo_width = 389;
          xcanvasS.ThaiQRPayLogo_height = 160;
          xcanvasS.PromptPayLogo_posX = 254;
          xcanvasS.PromptPayLogo_posY = 208;
          xcanvasS.PromptPayLogo_width = 384;
          xcanvasS.PromptPayLogo_height = 130;
          xcanvasS.QRCodeImage_posX = 207;
          xcanvasS.QRCodeImage_posY = 438;
          xcanvasS.QRCodeImage_width = 485;
          xcanvasS.QRCodeImage_height = 485;
          xcanvasS.ThaiQRPayMiniLogo_posX = 390;
          xcanvasS.ThaiQRPayMiniLogo_posY = 626;
          xcanvasS.ThaiQRPayMiniLogo_width = 150;
          xcanvasS.ThaiQRPayMiniLogo_height = 109;

          // Note here about Image function.
          // <handle>.src should be tail not head, or image won't load.

          // Header logo.
          xcanvasS.handle.fillStyle = "#00427A";
          xcanvasS.handle.fillRect(0, 0, xcanvasS.width / 2, xcanvasS.header_height / 2);
          if (xcanvasS.bigsize_handle) {
            xcanvasS.bigsize_handle.fillStyle = "#00427A";
            xcanvasS.bigsize_handle.fillRect(0, 0, xcanvasS.width, xcanvasS.header_height);
          }
          thaiqrpay_logo.onload = function () {
            if (xcanvasS.handle) {
              xcanvasS.handle.drawImage(thaiqrpay_logo, xcanvasS.ThaiQRPayLogo_posX / 2, xcanvasS.ThaiQRPayLogo_posY / 2, xcanvasS.ThaiQRPayLogo_width / 2, xcanvasS.ThaiQRPayLogo_height / 2);
              if (xcanvasS.bigsize_handle) {
                xcanvasS.bigsize_handle.drawImage(thaiqrpay_logo, xcanvasS.ThaiQRPayLogo_posX, xcanvasS.ThaiQRPayLogo_posY, xcanvasS.ThaiQRPayLogo_width, xcanvasS.ThaiQRPayLogo_height);
              }
            }
          }
          thaiqrpay_logo.src = '/Thai_QR_Payment_Logo-01.png';

          // Promptpay Logo.
          promptpay_logo.onload = function () {
            if (xcanvasS.handle) {
              xcanvasS.handle.drawImage(promptpay_logo, xcanvasS.PromptPayLogo_posX / 2, xcanvasS.PromptPayLogo_posY / 2, xcanvasS.PromptPayLogo_width / 2, xcanvasS.PromptPayLogo_height / 2);
              if (xcanvasS.bigsize_handle) {
                xcanvasS.bigsize_handle.drawImage(promptpay_logo, xcanvasS.PromptPayLogo_posX, xcanvasS.PromptPayLogo_posY, xcanvasS.PromptPayLogo_width, xcanvasS.PromptPayLogo_height);
              }
            }
          }
          promptpay_logo.src = '/PromptPay2.png';

          // QR-code and Mini ThaiQRpay Logo.
          // Mini ThaiQRpay logo should load inside qrcode_image.onload.
          // Why? because every time I regenerate canvas, the qrcode loaded into canvas TOO LATE,
          // so this is my only solution, I did figure out it myself.
          // I also used to think of using async function thingy but its too complicated. (Massive skill issue)
          qrcode_image.onload = function () {
            if (xcanvasS.handle) {
              xcanvasS.handle.drawImage(qrcode_image, xcanvasS.QRCodeImage_posX / 2, xcanvasS.QRCodeImage_posY / 2, xcanvasS.QRCodeImage_width / 2, xcanvasS.QRCodeImage_height / 2);
              if (xcanvasS.bigsize_handle) {
                xcanvasS.bigsize_handle.drawImage(qrcode_image, xcanvasS.QRCodeImage_posX, xcanvasS.QRCodeImage_posY, xcanvasS.QRCodeImage_width, xcanvasS.QRCodeImage_height);
              }
              thaiqrpay_mini_logo.onload = function () {
                if (xcanvasS.handle) {
                  xcanvasS.handle.drawImage(thaiqrpay_mini_logo, xcanvasS.ThaiQRPayMiniLogo_posX / 2, xcanvasS.ThaiQRPayMiniLogo_posY / 2, xcanvasS.ThaiQRPayMiniLogo_width / 2, xcanvasS.ThaiQRPayMiniLogo_height / 2);
                  if (xcanvasS.bigsize_handle) {
                    xcanvasS.bigsize_handle.drawImage(thaiqrpay_mini_logo, xcanvasS.ThaiQRPayMiniLogo_posX, xcanvasS.ThaiQRPayMiniLogo_posY, xcanvasS.ThaiQRPayMiniLogo_width, xcanvasS.ThaiQRPayMiniLogo_height);
                  }
                }
              }
              thaiqrpay_mini_logo.src = '/Thai_QR_Payment_Logo-03.png';
            }
          }
          qrcode_image.src = qrcodeImageData;
        }
        break;

      case "basic":
        if (xcanvasS.handle) {
          // Basic layout settings.
          xcanvasS.width = 900;
          xcanvasS.height = 1044;
          xcanvasS.header_height = 164;
          xcanvasS.ThaiQRPayLogo_posX = 256;
          xcanvasS.ThaiQRPayLogo_posY = 1;
          xcanvasS.ThaiQRPayLogo_width = 389;
          xcanvasS.ThaiQRPayLogo_height = 160;
          xcanvasS.PromptPayLogo_posX = 254;
          xcanvasS.PromptPayLogo_posY = 208;
          xcanvasS.PromptPayLogo_width = 384;
          xcanvasS.PromptPayLogo_height = 130;
          xcanvasS.QRCodeImage_posX = 207;
          xcanvasS.QRCodeImage_posY = 438;
          xcanvasS.QRCodeImage_width = 485;
          xcanvasS.QRCodeImage_height = 485;
          xcanvasS.ThaiQRPayMiniLogo_posX = 390;
          xcanvasS.ThaiQRPayMiniLogo_posY = 626;
          xcanvasS.ThaiQRPayMiniLogo_width = 150;
          xcanvasS.ThaiQRPayMiniLogo_height = 109;

          // Header logo.
          xcanvasS.handle.fillStyle = "#00427A";
          xcanvasS.handle.fillRect(0, 0, xcanvasS.width / 2, xcanvasS.header_height / 2);
          if (xcanvasS.bigsize_handle) {
            xcanvasS.bigsize_handle.fillStyle = "#00427A";
            xcanvasS.bigsize_handle.fillRect(0, 0, xcanvasS.width, xcanvasS.header_height);
          }
          thaiqrpay_logo.onload = function () {
            if (xcanvasS.handle) {
              xcanvasS.handle.drawImage(thaiqrpay_logo, xcanvasS.ThaiQRPayLogo_posX / 2, xcanvasS.ThaiQRPayLogo_posY / 2, xcanvasS.ThaiQRPayLogo_width / 2, xcanvasS.ThaiQRPayLogo_height / 2);
              if (xcanvasS.bigsize_handle) {
                xcanvasS.bigsize_handle.drawImage(thaiqrpay_logo, xcanvasS.ThaiQRPayLogo_posX, xcanvasS.ThaiQRPayLogo_posY, xcanvasS.ThaiQRPayLogo_width, xcanvasS.ThaiQRPayLogo_height);
              }
            }
          }
          thaiqrpay_logo.src = '/Thai_QR_Payment_Logo-01.png';

          // Promptpay Logo.
          promptpay_logo.onload = function () {
            if (xcanvasS.handle) {
              xcanvasS.handle.drawImage(promptpay_logo, xcanvasS.PromptPayLogo_posX / 2, xcanvasS.PromptPayLogo_posY / 2, xcanvasS.PromptPayLogo_width / 2, xcanvasS.PromptPayLogo_height / 2);
              if (xcanvasS.bigsize_handle) {
                xcanvasS.bigsize_handle.drawImage(promptpay_logo, xcanvasS.PromptPayLogo_posX, xcanvasS.PromptPayLogo_posY, xcanvasS.PromptPayLogo_width, xcanvasS.PromptPayLogo_height);
              }
            }
          }
          promptpay_logo.src = '/PromptPay2.png';

          // QR-code and Mini ThaiQRpay Logo.
          // Same thing. (See "shop" case)
          qrcode_image.onload = function () {
            if (xcanvasS.handle) {
              xcanvasS.handle.drawImage(qrcode_image, xcanvasS.QRCodeImage_posX / 2, xcanvasS.QRCodeImage_posY / 2, xcanvasS.QRCodeImage_width / 2, xcanvasS.QRCodeImage_height / 2);
              if (xcanvasS.bigsize_handle) {
                xcanvasS.bigsize_handle.drawImage(qrcode_image, xcanvasS.QRCodeImage_posX, xcanvasS.QRCodeImage_posY, xcanvasS.QRCodeImage_width, xcanvasS.QRCodeImage_height);
              }
              thaiqrpay_mini_logo.onload = function () {
                if (xcanvasS.handle) {
                  xcanvasS.handle.drawImage(thaiqrpay_mini_logo, xcanvasS.ThaiQRPayMiniLogo_posX / 2, xcanvasS.ThaiQRPayMiniLogo_posY / 2, xcanvasS.ThaiQRPayMiniLogo_width / 2, xcanvasS.ThaiQRPayMiniLogo_height / 2);
                  if (xcanvasS.bigsize_handle) {
                    xcanvasS.bigsize_handle.drawImage(thaiqrpay_mini_logo, xcanvasS.ThaiQRPayMiniLogo_posX, xcanvasS.ThaiQRPayMiniLogo_posY, xcanvasS.ThaiQRPayMiniLogo_width, xcanvasS.ThaiQRPayMiniLogo_height);
                  }
                }
              }
              thaiqrpay_mini_logo.src = '/Thai_QR_Payment_Logo-03.png';
            }
          }
          qrcode_image.src = qrcodeImageData;
        }
        break;

      case "qrcode":
        if (xcanvasS.handle) {
          // QRcode layout settings
          xcanvasS.width = 485;
          xcanvasS.height = 485;
          xcanvasS.ThaiQRPayMiniLogo_posX = 183;
          xcanvasS.ThaiQRPayMiniLogo_posY = 188;

          // QR-code and Mini ThaiQRpay Logo
          // Same thing. (See "shop" case)
          qrcode_image.onload = function () {
            if (xcanvasS.handle) {
              xcanvasS.handle.drawImage(qrcode_image, 0, 0, xcanvasS.QRCodeImage_width / 2, xcanvasS.QRCodeImage_height / 2);
              if (xcanvasS.bigsize_handle) {
                xcanvasS.bigsize_handle.drawImage(qrcode_image, 0, 0, xcanvasS.QRCodeImage_width, xcanvasS.QRCodeImage_height);
              }
              thaiqrpay_mini_logo.onload = function () {
                if (xcanvasS.handle) {
                  xcanvasS.handle.drawImage(thaiqrpay_mini_logo, xcanvasS.ThaiQRPayMiniLogo_posX / 2, xcanvasS.ThaiQRPayMiniLogo_posY / 2, xcanvasS.ThaiQRPayMiniLogo_width / 2, xcanvasS.ThaiQRPayMiniLogo_height / 2);
                  if (xcanvasS.bigsize_handle) {
                    xcanvasS.bigsize_handle.drawImage(thaiqrpay_mini_logo, xcanvasS.ThaiQRPayMiniLogo_posX, xcanvasS.ThaiQRPayMiniLogo_posY, xcanvasS.ThaiQRPayMiniLogo_width, xcanvasS.ThaiQRPayMiniLogo_height);
                  }
                }
              }
              thaiqrpay_mini_logo.src = '/Thai_QR_Payment_Logo-03.png';
            }
          }
          qrcode_image.src = qrcodeImageData;
        }
        break;
      default:
        // Idk what to do about it, this should be an alert.
        console.log("at least arg1 is required.");
        return false;
    }
    return true;
  },
  savePNG: function savePNG(big = 0) {
    // ref: https://stackoverflow.com/a/68719454
    var link = document.createElement('a');

    // If big is passed, use xcanvas-bigsize for download.
    if (big) {
      link.download = 'promptpay_qrcode_big.png';
      var canvas = document.getElementById("xcanvas-bigsize") as HTMLCanvasElement;
      link.href = canvas.toDataURL('image/png');
    } else {
      link.download = 'promptpay_qrcode_small.png';
      var canvas = document.getElementById("xcanvas") as HTMLCanvasElement;
      link.href = canvas.toDataURL('image/png');
    }
    link.click();
  },
});

// Prerender the default setting.
onMounted(() => {
  xcanvas.init();
  xcanvas.render();
});

// DOM updating.
onUpdated(() => {
  if (idNumber.value) {

    // Shortest and easiest number to string translation.
    var idnum = '' + idNumber.value;

    // Below this will trigger when length of idnum is meet with condition.
    // 9 = Thai Phone Number (Removed zero)
    // 13 = Thai ID Card.
    // 15 = e-Wallet thingy.
    if (idnum.length == 9 || idnum.length == 13 || idnum.length == 15) {
      xcanvas.render();
    }
  }
});
</script>

<template>
  <!-- QRcode Div for EasyQRCodeJS (always hidden) -->
  <div id="qrcode"></div>
  <!-- xcanvas bigsize for downloading (always hidden) -->
  <canvas id="xcanvas-bigsize" :width="xcanvasS.width" :height="xcanvasS.height"></canvas>
  <!-- NaviBar -->
  <header>
    <NaviBar />
  </header>

  <!-- Desktop -->
  <main class="responsive l max">
    <div class="grid">
      <div class="center-screen s6">
        <main class="l padding absolute center middle">
          <canvas id="xcanvas" :width="xcanvasS.width / 2" :height="xcanvasS.height / 2"></canvas>
        </main>
      </div>
      <div class="s6">
        <main class="l">
          <article class="fit-height">
            <!-- Layout Selector -->
            <fieldset>
              <legend>{{ $t('editor.layout') }}</legend>
              <nav>
                <label class="radio">
                  <input type="radio" id="one" value="shop" v-model="layout" />
                  <span>{{ $t('layouts.shop') }}</span>
                </label>
                <label class="radio">
                  <input type="radio" id="two" value="basic" v-model="layout" />
                  <span>{{ $t('layouts.basic') }}</span>
                </label>
                <label class="radio">
                  <input type="radio" id="three" value="qrcode" v-model="layout" />
                  <span>{{ $t('layouts.qrcode') }}</span>
                </label>
              </nav>
            </fieldset>
            <!-- Promptpay Data Insertion -->
            <fieldset>
              <legend>{{ $t('editor.promptpaydata') }}</legend>
              <div class="field border label">
                <input type="number" value="921972152" v-model.number="idNumber">
                <label>{{ $t('common.specify') }}{{ $t('promptpaydata.phone') }} / {{ $t('promptpaydata.idcard') }} / {{
                  $t('promptpaydata.ewallet') }}</label>
              </div>
              <div class="field border label">
                <input type="number" value="" v-model.number="reqAmount">
                <label>{{ $t('common.specify') }}{{ $t('common.money') }}</label>
              </div>
            </fieldset>
            <!-- Customization -->
            <fieldset>
              <legend>{{ $t('editor.customize') }}</legend>
            </fieldset>
            <nav class="left-align">
              <button @click="xcanvas.savePNG()">{{ $t('editor.save') }}</button>
              <button @click="xcanvas.savePNG(1)">{{ $t('editor.savebig') }}</button>
            </nav>
          </article>
        </main>
      </div>
    </div>
  </main>

  <!-- Mobile -->
  <main class="responsive max m s">
    <main class="m s padding absolute center middle middle-adjust">
      <canvas id="xcanvas" :width="xcanvasS.width / 2" :height="xcanvasS.height / 2"></canvas>
    </main>
    <main class="m s">
      <nav class="no-space bottom">
        <button class="transparent">
          <FontAwesomeIcon :icon="faLayerGroup" />
          <span>Presets</span>
        </button>
        <div class="max"></div>
        <button class="transparent">
          <FontAwesomeIcon :icon="faPaintBrush" />
          <span>Customize</span>
        </button>
        <div class="max"></div>
        <button class="transparent">
          <FontAwesomeIcon :icon="faSave" />
          <span>Save</span>
        </button>
      </nav>
    </main>
  </main>
</template>

<style scoped>
/* qrcode div and xcanvas-bigsize must be hidden */
#qrcode {
  display: none;
}

#xcanvas-bigsize {
  display: none;
}

.middle-adjust {
  top: 40vh;
}

.center-screen {
  height: 80vh;
}

.fit-height {
  height: 89vh;
}
</style>
