<template>
  <ul class="slider-main">
		<li class="slider-item" data-num="1">
			<div class="slider-main_img"></div>
		</li>
		<li class="slider-item" data-num="2">
			<div class="slider-main_img"></div>
		</li>
		<li class="slider-item" data-num="3">
			<div class="slider-main_img"></div>
		</li>
		<li class="slider-item" data-num="4">
			<div class="slider-main_img"></div>
		</li>
		<li class="slider-item" data-num="5">
			<div class="slider-main_img"></div>
		</li>
	</ul>
	<div class="header_container container">
		<ul class="slider_line_container">
		</ul>
    <div class="overlay"></div>
		<div class="header_title">
      <div class="flex justify-center items-center h-screen text-white">
        <div class="px-4 content-site">
          <div class="flex items-center mb-10">
            <div class="p-2" style="width:fit-content"><img src="/logo.png" alt="LegacyLink Logo"
                class="w-40 md:w-80"></div> <!-- Agregar la imagen del logo aquí -->
            <h1 class="text-4xl md:text-6xl font-bold ml-4 text-center">Memoriales digitales</h1>
          </div>
          <div class="general_title">
            <p class="text-lg md:text-xl mb-4">Preservando recuerdos y honrando vidas.</p>
            <p class="text-base md:text-lg mb-4">Crea memoriales digitales personalizados para tus seres queridos. Con
              LegacyLink, puedes compartir historias, fotos y videos en un espacio digital dedicado a honrar sus legados.</p>
            <p class="text-base md:text-lg mb-4">Cada memorial digital viene con un QR único grabado en una placa de acero
              inoxidable. Escanea el QR para acceder al memorial en cualquier momento y en cualquier lugar.</p>
            <p>
              <UButton 
              icon="i-mdi-account-star-outline"
              size="lg" 
              label="Regístrate ahora para comenzar."
            /></p>
          </div>
        </div>
      </div>
		</div>
	</div>
</template>
<script setup>
if (process.server) {

  useHead({ script: [{ src: `https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js`, defer: true }] });
}
onMounted(() => {
  $(function(){
    $('.general_title').children().addClass('title_animation');
    
    var sliderLength = $('.slider-main').children().length;
    
    //Generate line for slider
    for(var i = 0; i<sliderLength; i++){
      $('.slider_line_container').append('<li class="slider_line"></li>')
    }
    
    //The first line got the class 'line_current
    $('.slider_line').first().addClass('line_current');
    
    //Generate 'current' for slider
    if( $('.slider-main').find('#current').index() == -1){
      $('.slider-item').first().attr('id','current');
    }
    
    //Slider function
    function slideMain(){
      
      var index = $('.slider-main').find('#current').index();
      
        $('.slider-item').attr('id','');
        $('.slider_line').removeClass('line_current');
      
          if( index == sliderLength-1){
            $('.slider-item').first().attr('id','current');
            $('.slider_line').first().addClass('line_current');
          } else {
            $('.slider-item').eq(index+1).attr('id','current');
            $('.slider_line').eq(index+1).addClass('line_current');
          }
    
    }
    
    setInterval(slideMain,6000);
    
  })
});
</script>
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }
  .slider-main {
    height: 100vh;
    width: 100vw;
    position: relative;
  }
  .slider-main .slider-item {
    position: absolute;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    visibility: hidden;
    list-style-type: none;
    opacity: 0;
    transform: scale(1);
    transition: opacity 2s ease-in-out, visibility 2.2s ease-in-out, transform 6.5s linear;
  }
  .slider-main .slider-item .slider-main_img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .slider-item[data-num="1"] .slider-main_img {
    background: url("./web_bg.webp") no-repeat center center/cover;
  }

  .slider-item[data-num="2"] .slider-main_img {
    background: url("./web_bg2.webp") no-repeat center center/cover;
  }

  .slider-item[data-num="3"] .slider-main_img {
    background: url("./web_bg3.webp") no-repeat center center/cover;
  }

  .slider-item[data-num="4"] .slider-main_img {
    background: url("./web_bg4.webp") no-repeat center center/cover;
  }

  .slider-item[data-num="5"] .slider-main_img {
    background: url("./web_bg5.webp") no-repeat center center/cover;
  }

  #current {
    opacity: 1;
    visibility: visible;
    transform: scale(1.15);
    transition: opacity 1s ease-in-out, visibility 1.2s ease-in-out, transform 6.5s linear;
  }

  .slider_line_container {
    display: none;
    position: absolute;
    top: 50%;
    z-index: 10;
  }

  .slider_line {
    list-style-type: none;
    margin-bottom: 10px;
    height: 1px;
    width: 20px;
    background: #fff;
    cursor: pointer;
    transition: all 0.7s ease-in-out;
  }

  .line_current {
    width: 36px;
    background: #ec463f;
    transition: all 0.7s ease-in-out;
  }

  .header_title {
    position: absolute;
    left: 0;
    top: 0;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .general_title {
    z-index: 20;
    overflow: hidden;
  }

  .general_span_1, .general_span_2, .general_span_3 {
    font: 4.5rem/5.7rem serif;
    letter-spacing: 0.15em;
    font-family: "Raleway", sans-serif;
    color: #fff;
    text-transform: uppercase;
    z-index: 10;
    transition: all 0.7s ease-in-out;
    transform: translateX(-130%);
  }

  .title_animation {
    -webkit-animation: title_animation 2s ease-in-out forwards;
            animation: title_animation 2s ease-in-out forwards;
  }

  @-webkit-keyframes title_animation {
    0% {
      transform: translateX(-130%);
    }
    100% {
      transform: translateX(0%);
    }
  }

  @keyframes title_animation {
    0% {
      transform: translateX(-130%);
    }
    100% {
      transform: translateX(0%);
    }
  }
  .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.65); /* Transparencia negra al 50% */
      z-index: 0; /* Asegura que la capa esté detrás del contenido */
  }
  .content-site{
    max-width: 50rem;
  }
</style>
  
