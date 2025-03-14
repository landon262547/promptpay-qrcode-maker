import type QRCode from 'easyqrcodejs';
import { defineStore } from 'pinia'

export const xcanvas_state = defineStore('xcanvasS', {
  state: () => {
    return {
      handle: null as CanvasRenderingContext2D | null,
      bigsize_handle: null as CanvasRenderingContext2D | null,
      // canvas
      width: 900,
      height: 1044,
      // canvas elements
      header_height: 164,
      ThaiQRPayLogo_posX: 256,
      ThaiQRPayLogo_posY: 1,
      ThaiQRPayLogo_width: 389,
      ThaiQRPayLogo_height: 160,
      PromptPayLogo_posX: 254,
      PromptPayLogo_posY: 208,
      PromptPayLogo_width: 384,
      PromptPayLogo_height: 130,
      QRCodeImage_posX: 207,
      QRCodeImage_posY: 438,
      QRCodeImage_width: 485,
      QRCodeImage_height: 485,
      ThaiQRPayMiniLogo_posX: 390,
      ThaiQRPayMiniLogo_posY: 626,
      ThaiQRPayMiniLogo_width: 150,
      ThaiQRPayMiniLogo_height: 109,
    }
  },
});

export const qrcode_state = defineStore('qrcodeS', {
  state: () => {
    return {
      handle: null as HTMLCanvasElement | null,
      qrcode: null as QRCode | null,
      data: null as string | null
    }
  },
});
