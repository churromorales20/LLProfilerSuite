<template>
  <transition 
    enter-to-class="animate__animated animate__slideInLeft" 
    @after-enter="setListener"
    leave-to-class="animate__animated animate__slideOutLeft" 
  >
    <aside 
      v-if="viewport.isGreaterThan('md') || menuStore.isOpened"
      class="flex flex-col justify-between bg-llblue-600 text-white w-64 overflow-y-auto absolute inset-y-0 left-0 z-10 transform lg:block lg:relative lg:static lg:translate-x-0 transition-transform duration-300 ease-in-out"
      id="_ll_menu_left_"
    >
      <div class="py-4 px-2">
        <UVerticalNavigation :links="links" :ui="{
          //wrapper: 'border-s border-gray-200 dark:border-gray-800 space-y-2',
          //base: 'group block border-s -ms-px leading-6 before:hidden',
          padding: 'p-0 ps-4',
          font: 'font-bold',
          icon: {
            inactive: 'text-white group-hover:text-llblue-600 dark:group-hover:text-gray-200',
          },
          inactive: 'py-5 border-transparent hover:before:bg-llyellow-600 hover:border-llyellow-800 text-white font-bold hover:text-llblue-600'
        }" />
      </div>
      <img style="height:110px;" src="/logoh.png" class="mx-auto mb-4 w-auto"/>
    </aside>
  </transition>
</template>
<script setup>
const viewport = useViewport()
const menuStore = adminMenuStore();
const setListener = () => {
  menuStore.setListener();
}
const route = useRoute()
const locale = useI18n()
const links = [
  {
    label: locale.t('general.menu_my_memorials'),
    icon: 'i-heroicons-home',
    to: '/getting-started/installation'
  }, 
  {
    label: locale.t('general.menu_condolences'),
    icon: 'i-heroicons-chart-bar',
    to: `${route.path.startsWith('/dev') ? '/dev' : ''}/components/vertical-navigation`
  }, 
  {
    label: locale.t('general.menu_purchases'),
    icon: 'i-heroicons-command-line',
    to: '/components/command-palette'
  },
  {
    label: locale.t('general.menu_my_profile'),
    icon: 'i-heroicons-command-line',
    to: '/components/command-palette'
  },
  {
    label: locale.t('general.menu_help_center'),
    icon: 'i-heroicons-command-line',
    to: '/components/command-palette'
  },
]
</script>