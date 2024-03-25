<template>
  <div>

    <UModal v-model="isOpen">
      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">¡Bienvenido a LegacyLink!</h2>
        </template>

        <p class="text-base mb-4">Gracias por unirte a nosotros en esta emocionante fase de pruebas de nuestra plataforma. Agradecemos enormemente tu presencia y participación en este proceso.</p>
        <p class="text-base mb-4">En LegacyLink, estamos para ayudarte a honrar a tus seres queridos y preservar sus recuerdos de forma única y especial.</p>
        <p class="text-base mb-4">El próximo paso es crear un memorial: al hacerlo, recibirás un enlace único que te permitirá compartirlo con otros..</p>
        <p class="text-base mb-4">Tendrás la opción de <span class="font-semibold">editar el memorial</span> en cualquier momento, personalizando la información y los detalles a tu gusto.</p>
        <UIcon name="i-mdi-heart" class=" text-4xl text-red-500" />

        <template #footer>
          <div class="flex justify-center">
            <UButton 
              label="Agregar memorial" 
              icon="i-mdi-heart-plus" 
              size="md" 
              @click="start"
            />
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>
<script setup lang="ts">
const isOpen = ref(true);
const shopping = shoppingStore();
const start = () => {
  isOpen.value = false;
  setTimeout(() => {
    shopping.setModalStatus(true)
  }, 200);
}
</script>