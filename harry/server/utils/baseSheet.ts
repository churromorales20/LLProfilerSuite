export class BaseSheetCSS {
  private baseCss = `

{{FONT_1_LINK}}
{{FONT_2_LINK}}
.ll-main-custom{
  {{FONT_1_RULES}}
  {{MAIN_BACKGROUND_COLOR}}
  {{BG_IMAGE_URL}}
  {{BG_IMAGE_POSITION}}
  {{BG_IMAGE_ATTACHMENT}}
  {{BG_IMAGE_REPEAT}}
  {{BG_IMAGE_SIZE}}
}
.ll-title {
  {{MAIN_TITLE_COLOR}}
  {{FONT_2_RULES}}
}
.ll-border-heading {
  {{UNAME_TEXT_COLOR}}
}
.ll-border-avatar {
  {{AVATAR_BORDER_COLOR}}
}
.ll-rounded {
  {{ROUNDED_CORNERS_SIZE}}
}
.ll-btn-custom {
  {{LINK_MAIN_COLOR}}
  {{LINK_SECONDARY_COLOR}}
}
.ll-link-custom {
  {{LINK_CUSTOM_COLOR}}
}
.ll-box{
  {{BOX_BACKGROUND_COLOR}}
  {{BOX_TEXT_COLOR}}
  {{BOX_TEXT_SIZE}}
}
.ll-box-title-main{
  {{BOX_TITLE_TEXT_COLOR}}
  {{FONT_2_RULES}}
}
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base  {
  .ll-box-title-size{
    {{BOX_TITLE_TEXT_SIZE}}
  }
}`

  get(): string{
    return this.baseCss;
  }
}