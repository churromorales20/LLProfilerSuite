<template>
  <div class="mb-2">
    <label for="email" class="block text-sm font-medium text-gray-700">
      {{ $t('login.first_name') }}
    </label>
    <div class="mt-1">
      <UInput 
        :color="firstNameErrored ? 'rose' : 'sky'" 
        v-model="newEntryForm.first_name" 
        icon="i-mdi-account" size="md"
        :placeholder="$t('login.first_name_placeholder')" 
      />
      <p v-if="firstNameErrored" class="font-medium text-sm text-red-500 mt-1">{{ firstNameErrored }}</p>
    </div>
  </div>
  <div class="mb-2">
    <label for="email" class="block text-sm font-medium text-gray-700">
      {{ $t('login.last_name') }}
    </label>
    <div class="mt-1">
      <UInput 
        :color="lastNameErrored ? 'rose' : 'sky'" 
        v-model="newEntryForm.last_name" 
        icon="i-mdi-account" size="md"
        :placeholder="$t('login.last_name_placeholder')" 
      />
      <p v-if="lastNameErrored" class="font-medium text-sm text-red-500 mt-1">LAST{{ lastNameErrored }}</p>
    </div>
  </div>
  <div class="mb-2">
    <label for="email" class="block text-sm font-medium text-gray-700">
      {{ $t('login.email') }}
    </label>
    <div class="mt-1">
      <UInput 
        :color="emailErrored ? 'rose' : 'sky'" 
        v-model="newEntryForm.email" 
        icon="i-mdi-email" size="md" type="email"
        :placeholder="$t('login.enter_email_address')" 
      />
      <p v-if="emailErrored" class="font-medium text-sm text-red-500">{{ emailErrored }}</p>
    </div>
  </div>
  <div class="mb-2">
    <label for="email" class="block text-sm font-medium text-gray-700">
      Entry text
    </label>
    <div class="mt-1">
      <UTextarea 
        v-model="newEntryForm.entry_text" 
        size="xl" 
        id="biography" 
        :color="entryErrored ? 'rose' : 'sky'"
        :placeholder="$t('memorials.enter_biography')"
      />
      <p v-if="entryErrored" class="font-medium text-sm text-red-500 mt-1">{{ entryErrored }}</p>
    </div>
  </div>
  <UAlert v-if="newEntriesRequireApproval" icon="i-mdi-information-variant-box" color="sky" class="mt-2"
    variant="outline" title="Attention!"
    description="New entries requires admin approval, complete you info and we'll notify you once your entries gets approved." />
</template>
<script setup>
const profileStore = useProfileStore()
const wallStore = condolencesWallStore()
const newEntryForm = computed(() => wallStore.new_entry_form);
const firstNameErrored = computed(() => wallStore.new_entry_form_erros.first_name);
const lastNameErrored = computed(() => wallStore.new_entry_form_erros.last_name);
const emailErrored = computed(() => wallStore.new_entry_form_erros.email);
const entryErrored = computed(() => wallStore.new_entry_form_erros.entry_text);
const newEntriesRequireApproval = profileStore.profile.settings.condolences_wall_default_status === 'APPROVED';
</script>