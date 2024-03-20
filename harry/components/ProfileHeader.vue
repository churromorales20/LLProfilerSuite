<template>
  <header class="relative">
    <div class="bg-cover bg-center h-48 flex items-end rounded-b-lg"
      :style="`background-image: url('/profiles/assets/${profile.code}/${profile.top_image}');`">
      <!--<img :src="`/profiles/assets/${profile.id}/${profile.avatar}`" alt="Avatar" class="w-24 h-24 rounded-full border-4 border-white -mb-12 mx-4">
      -->
      <div class="relative w-full lg:ml-6 lg:block flex justify-center">
        <div class="z-10 absolute bottom-0 transform translate-y-1/2">
          <UAvatar 
            :size="viewport.isLessThan('lg') ? '3xl' : '3xl'" 
            class="border-2 ll-border-avatar"
            :src="`/profiles/assets/${profile.code}/${profile.avatar}`" 
            :alt="fullName" 
            :ui="{
              size: {
                '3xl': 'h-36 w-36 text-3xl',
                '4xl': 'h-44 w-44 text-3xl',
              }
            }" />
        </div>
      </div>
    </div>
  </header>
  <div class="mt-24 mb-10 lg:mt-0 lg:mb-0 h-16 lg:h-20 lg:pl-48 lg:pr-6 items-center lg:flex-row flex flex-col items-center lg:justify-between">
    <div>
      <h2 class="md:text-2xl text-xl font-semibold ll-title">{{ fullName }}</h2>
      <p class="lg:mb-0 lg:text-left md:text-lg text-base text-center mb-2 ll-title" v-if="!isEmptyString(profile.nickname)">{{ profile.nickname }}</p>
    </div>
    <div>
      <UButton 
        v-if="wallActive"
        icon="i-mdi-notebook-heart" 
        size="md"
        @click="wallStore.toggleNewEntryModal(true)"
        color="sky"
        :label="$t('profile.btn_leave_condo')"
        class="mr-2 ll-btn-custom"
      />
      <UDropdown 
        :popper="{ placement: 'bottom-start' }"
        :ui="{
          item:{
            padding: 'px-1.5 py-4'
          }
        }"
        :items="[[
          {
            label: $t('profile.share_link_fb'),
            to: `https://www.facebook.com/sharer/sharer.php?u=${envStore.profilesUrl}profile/${profile.code}`,
            target: '_blank',
            icon: 'i-mdi-facebook',
          },
          {
            label: $t('profile.share_link_whatsapp'),
            to: `https://api.whatsapp.com/send?text=${whatsappMessage(row)}`,
            icon: 'i-mdi-whatsapp',
            target: '_blank',
          },
          {
            label: $t('profile.share_link_copy'),
            click: () => {
              copyLink()
            },
            icon: 'i-mdi-content-copy',
          }
        ]]"
      >
        <UButton 
          icon="i-mdi-share-variant" 
          size="md"
          color="sky"
          :label="viewport.isGreaterThan('sm') ? $t('profile.btn_share') : ''"
          class="mr-2 ll-btn-custom"
        />
      </UDropdown>
      <UButton 
        icon="i-mdi-bell" 
        size="md"
        color="sky"
        class="ll-btn-custom"
        :label="viewport.isGreaterThan('sm') ? $t('profile.btn_subscribe') : ''"
      />
    </div>
  </div>
</template>

<script setup>
const locale = useI18n()
const viewport = useViewport()
const profileStore = useProfileStore()
const envStore = environmentStore()
const wallActive = profileStore.profile.settings.condolences_wall;
const wallStore = condolencesWallStore()
const profile = computed(() => profileStore.profile);
const fullName = computed(() => profileStore.fullName);

const copyLink = () => {
  const link = `${envStore.profilesUrl}profile/${profile.value.code}`;
  var tempTextArea = document.createElement("textarea");
  tempTextArea.value = link;
  tempTextArea.style.position = "fixed";
  tempTextArea.style.top = 0;
  tempTextArea.style.left = 0;
  tempTextArea.style.opacity = 0;
  
  document.body.appendChild(tempTextArea);

  tempTextArea.select();
  
  document.execCommand("copy");

  document.body.removeChild(tempTextArea);
}

const whatsappMessage = () => {
  return locale.t('profile.share_whatsapp_message', { 
    profile_link: encodeURIComponent(`${envStore.profilesUrl}profile/${profile.value.code}`),
    profile_name: `*${fullName.value}${!isEmptyString(profile.value.nickname) ? ` (${profile.value.nickname})` : ``}*`,
  });
}

const btnSize = computed(() => {
  if (viewport.isGreaterThan('sm')) {
    return 'md';
  } 

  return 'xs'
});
</script>