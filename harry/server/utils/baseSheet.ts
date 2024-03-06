export class BaseSheetCSS {
  private baseCss = `{{FONT_1_LINK}}
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
  {{MAIN_TITLE_SIZE}}
  {{FONT_2_RULES}}
}
.ll-uname-text {
  {{UNAME_TEXT_COLOR}}
  {{UNAME_TEXT_SIZE}}
}
.ll-rounded {
  {{ROUNDED_CORNERS_SIZE}}
}
.ll-box{
  {{BOX_BACKGROUND_COLOR}}
}
.ll-box-text{ 
  {{BOX_TEXT_COLOR}}
  {{BOX_TEXT_SIZE}}
}
.ll-box-title{
  {{BOX_TITLE_TEXT_COLOR}}
  {{BOX_TITLE_TEXT_SIZE}}
  {{FONT_2_RULES}}
}`

  get(): string{
    return this.baseCss;
  }
}