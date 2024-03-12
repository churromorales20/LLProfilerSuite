<template>
  <div v-if="editor" class="">
    <UButton 
      icon="i-mdi-format-bold"
      size="sm"
      class="mr-1"
      :variant="editor.isActive('bold') ? 'solid' : 'outline'" 
      @click="editor.chain().focus().toggleBold().run()" 
      :disabled="!editor.can().chain().focus().toggleBold().run()"
    />
    <UButton
      icon="i-mdi-format-italic"
      size="sm"
      class="mr-1"
      :variant="editor.isActive('italic') ? 'solid' : 'outline'" 
      @click="editor.chain().focus().toggleItalic().run()" 
      :disabled="!editor.can().chain().focus().toggleItalic().run()"
    />
    <!--<UButton 
      :variant="editor.isActive('strike') ? 'solid' : 'outline'" 
      @click="editor.chain().focus().toggleStrike().run()" 
      :disabled="!editor.can().chain().focus().toggleStrike().run()"
    >
      strike
    </UButton>
    <UButton 
      :variant="editor.isActive('code') ? 'solid' : 'outline'" 
      @click="editor.chain().focus().toggleCode().run()" 
      :disabled="!editor.can().chain().focus().toggleCode().run()" 
    >
      code
    </UButton>
    <UButton 
      variant="outline" 
      @click="editor.chain().focus().unsetAllMarks().run()">
      clear marks
    </UButton>
    <UButton 
      variant="outline" 
      @click="editor.chain().focus().clearNodes().run()">
      clear nodes
    </UButton>-->
    <UButton 
      icon="i-mdi-format-paragraph"
      size="sm"
      class="mr-1"
      :variant="editor.isActive('paragraph') ? 'solid' : 'outline'" 
      @click="editor.chain().focus().setParagraph().run()" 
    />
    <UButton 
      icon="i-mdi-format-title"
      size="sm"
      class="mr-1"
      :variant="editor.isActive('heading', { level: 1 }) ? 'solid' : 'outline'" 
      @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
    >
      Heading 1
    </UButton>
    <UButton 
      icon="i-mdi-format-title"
      size="sm"
      class="mr-1"
      :variant="editor.isActive('heading', { level: 2 }) ? 'solid' : 'outline'" 
      @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
    >
      Heading 2
    </UButton>
    <UButton 
      icon="i-mdi-format-title"
      size="sm"
      class="mr-1"
      :variant="editor.isActive('heading', { level: 3 }) ? 'solid' : 'outline'" 
      @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
    >
      Heading 3
    </UButton>
    <!--<UButton 
      :variant="editor.isActive('heading', { level: 4 })  ? 'solid' : 'outline'" 
      @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
    >
      h4
    </UButton>
    <UButton 
      :variant="editor.isActive('heading', { level: 5 }) ? 'solid' : 'outline'" 
      @click="editor.chain().focus().toggleHeading({ level: 5 }).run()" 
    >
      h5
    </UButton>
    <UButton 
      :variant="editor.isActive('heading', { level: 6 }) ? 'solid' : 'outline'" 
      @click="editor.chain().focus().toggleHeading({ level: 6 }).run()" 
      :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
    >
      h6
    </UButton>-->
    <UButton 
      icon="i-mdi-format-list-bulleted-square"
      size="sm"
      class="mr-1"
      :variant="editor.isActive('bulletList') ? 'solid' : 'outline'" 
      @click="editor.chain().focus().toggleBulletList().run()" 
    />
    <UButton 
      icon="i-mdi-order-numeric-ascending"
      size="sm"
      class="mr-1"
      :variant="editor.isActive('orderedList') ? 'solid' : 'outline'" 
      @click="editor.chain().focus().toggleOrderedList().run()" 
    />
    <!--<UButton 
      :variant="editor.isActive('codeBlock') ? 'solid' : 'outline'" 
      @click="editor.chain().focus().toggleCodeBlock().run()" 
    >
      code block
    </UButton>-->
    <UButton 
      icon="i-mdi-format-quote-open"
      size="sm"
      class="mr-1"
      :variant="editor.isActive('blockquote') ? 'solid' : 'outline'" 
      @click="editor.chain().focus().toggleBlockquote().run()" 
    />
    <UButton 
      icon="i-mdi-format-line-weight"
      size="sm"
      class="mr-1"
      :variant="editor.isActive('bold') ? 'solid' : 'outline'" 
      @click="editor.chain().focus().setHorizontalRule().run()"
    />
    <UButton 
      icon="i-mdi-format-page-break"
      size="sm"
      :variant="editor.isActive('bold') ? 'solid' : 'outline'" 
      @click="editor.chain().focus().setHardBreak().run()"
    />
    <UButton 
      icon="i-mdi-undo-variant"
      size="sm"
      :variant="editor.isActive('bold') ? 'solid' : 'outline'" 
      @click="editor.chain().focus().undo().run()" 
      :disabled="!editor.can().chain().focus().undo().run()"
    />
    <UButton 
      icon="i-mdi-redo-variant"
      size="sm"
      :variant="editor.isActive('bold') ? 'solid' : 'outline'" 
      @click="editor.chain().focus().redo().run()" 
      :disabled="!editor.can().chain().focus().redo().run()"
    />
  </div>
  <editor-content class="mt-2" :editor="editor" />
</template>
<script setup>
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent } from '@tiptap/vue-3'

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

const { modelValue } = toRefs(props);

const emits = defineEmits(['update:modelValue']);

const editor = ref(null);
watch(modelValue, (value) => {
  const isSame = editor.value.getHTML() === value

  if (isSame) {
    return
  }

  editor.commands.setContent(value, false)
})
onMounted(() =>{
  editor.value = new Editor({
    extensions: [
      StarterKit,
    ],
    content: modelValue.value,
    onUpdate: () => {
      // HTML
      emits('update:modelValue', editor.value.getHTML())

      // JSON
      // this.$emit('update:modelValue', this.editor.getJSON())
    },
  })
});
</script>
<style lang="scss">
.tiptap.ProseMirror {
  border: 1px solid #cecece;
  border-radius: 6px;
  min-height: 20rem;
  max-height: 30rem;
  overflow: auto;
}
.ProseMirror-focused {
  outline-color: #cecece;
}
.tiptap {
  >*+* {
    margin-top: 0.75em;
  }
  padding: 1rem;
  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0D0D0D;
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0D0D0D, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0D0D0D, 0.1);
    margin: 2rem 0;
  }
}
</style>