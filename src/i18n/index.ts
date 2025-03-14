import { createI18n } from "vue-i18n";

const i18n = createI18n({
  locale: 'th',
  fallbackLocale: 'en',
  messages: {
    en: {
      common: {
        specify: 'Specify ',
        money: 'Money in Thai Baht'
      },
      editor: {
        layout: 'Select Layout',
        promptpaydata: 'Insert Promptpay Data',
        customize: 'Customization',
        save: 'Save as PNG (Small)',
        savebig: 'Save as PNG (Big)'
      },
      layouts: {
        shop: 'For Shop',
        basic: 'Basic',
        qrcode: 'QR-code only'
      },
      promptpaydata: {
        phone: 'Thai Phone Number',
        idcard: 'ID Card',
        ewallet: 'e-Wallet ID',
      }
    },
    th: {
      common: {
        specify: 'ระบุ',
        money: 'เงินบาท'
      },
      editor: {
        layout: 'เลือกแม่แบบ',
        promptpaydata: 'ใส่ข้อมูลพร้อมเพย์',
        customize: 'การปรับแต่ง',
        save: 'บันทึกเป็น PNG (ขนาดเล็ก)',
        savebig: 'บันทึกเป็น PNG (ขนาดใหญ่)'
      },
      layouts: {
        shop: 'สำหรับร้านค้า',
        basic: 'ทั่วไป',
        qrcode: 'QR-code เท่านั้น'
      },
      promptpaydata: {
        phone: 'เบอร์โทรศัพท์ไทย',
        idcard: 'เลขบ้ตรประชาชน',
        ewallet: 'ไอดี e-Wallet',
      }
    }
  }
});

export default i18n
