<template>
  <div class="ll-qr-page">
    <div class="ll-qr">
      <div class="ll-qr-wrapper">
        <div ref="qrcodeDiv"></div>
      </div>
      <div class="ll-qr-link">
        <h3>www.legacylink.pe</h3>
      </div>
    </div>
  </div>
</template>
<script setup>
  import * as QRCode from 'easyqrcodejs'
  import { ref, onMounted } from 'vue';

  let qrcodeDiv = ref(null);
  onMounted(() => {
    // Opciones para el código QR
    const options = {
      text: 'https://www.legacylink.pe',
      width: 575,
      height: 540,
      //logoHeight: 140,
      correctLevel: QRCode.CorrectLevel.H, // L, M, Q, H
    };

    // Crear nuevo objeto QRCode y generar el código QR en el elemento referenciado
    new QRCode(qrcodeDiv.value, options);
  });
</script>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
  .ll-qr-page{
    background-color:#fff;
    display:flex;
    align-items: center;
    justify-content: center;
    height:100vh;
    letter-spacing: 10;
    flex-direction: column;
  }
  .ll-qr{
    display: flex;
    flex-direction: column;
  }
  .ll-qr-link{
    background-color: #000;
    display: flex;
    justify-content: center;
    color: #fff;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
  }
  .ll-qr-link > h3{
    letter-spacing: 5px;
    font-family: Roboto, sans-serif;
    padding: 5px 0px;
    font-weight: 700;
    font-size: 25px;
  }
  .ll-qr-wrapper{
    border: 15px solid rgb(0, 0, 0);
    padding: 10px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    border-bottom: 0px;
  }
</style>