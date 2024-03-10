import fs from 'fs';
import { apiFetcher } from "@ll-fetchers/llApiFetcher";
import { IProfileUIResponse } from '@ll-interfaces/IProfileUIResponse';
import { BaseSheetCSS } from './baseSheet';

class ProfileCssProcessor {

  private identifier: string;
  private resultantCss: string;
  private profileUI: IProfileUIResponse;

  constructor(identifier: string) {
    this.identifier = identifier;
    this.resultantCss = '';
    this.profileUI = {
      main_background_color: '#000',
      rounded_corners_size: '0.375rem',
      box_background_color: '#ffffff',
      box_text_color: '#222',
      box_text_size: '14px',
      box_title_text_color: '#222',
      box_title_text_size: '16px',
      main_title_color: '#fff',
      uname_text_color: '#fff',
      main_title_size: '22px',
    };
  }
  async get(): Promise<string>{

    await this.fetch();
    await this.compileCSS();
    this.sanitizeCssSheet();
    
    return this.resultantCss;
  }
  private async fetch(){
    apiFetcher.loadAuthCookie = false;
    const response = await apiFetcher.get<IProfileUIResponse>(`profile/ui/${this.identifier}`);
    
    if (response.code !== null) {
      this.profileUI = {
        ...this.profileUI,
        ...response.data
      }
      
    }
  }

  private sanitizeCssSheet() {
    this.resultantCss = this.resultantCss.replace(/^\s*[\r\n]/gm, '');
  }

  private isValueAvailable(fieldValue: string): boolean{
    return typeof fieldValue === 'string' && fieldValue!.length > 0;
  }
  private addFontLink(key: string, link: string){
    this.replaceText(key, this.isValueAvailable(link) ? `@import url('${link}');` : '');
  }
  private addBackgroundColor(key: string, color: string){
    this.replaceText(key, this.isValueAvailable(color) ? `background-color: ${color} !important;` : '');
  }
  private addFontColor(key: string, color: string){
    this.replaceText(key, this.isValueAvailable(color) ? `color: ${color} !important;` : '');
  }
  private addBorderColor(key: string, color: string){
    this.replaceText(key, this.isValueAvailable(color) ? `border-color: ${color} !important;` : '');
  }
  private addFontSize(key: string, size: string){
    this.replaceText(key, this.isValueAvailable(size) ? `font-size: ${size} !important;` : '');
  }
  private addRoundedSize(size: string){
    this.replaceText('ROUNDED_CORNERS_SIZE', this.isValueAvailable(size) ? `border-radius: ${size};` : '');
  }
  private rawReplaceRules(key: string, rules: string){
    this.replaceText(key, this.isValueAvailable(rules) ? rules : '');
  }
  private async compileCSS(){
    const baseSheet = new BaseSheetCSS();
    this.resultantCss = baseSheet.get();
    this.addFontLink('FONT_1_LINK', this.profileUI?.font_1_import!);
    this.addFontLink('FONT_2_LINK', this.profileUI.font_2_import!);
    this.rawReplaceRules('FONT_1_RULES', this.profileUI.font_1_rules!);
    this.rawReplaceRules('FONT_2_RULES', this.profileUI.font_2_rules!);
    this.addBackgroundColor('MAIN_BACKGROUND_COLOR', this.profileUI.main_background_color!);
    this.addBackgroundColor('BOX_BACKGROUND_COLOR', this.profileUI.box_background_color!);
    this.addFontColor('MAIN_TITLE_COLOR', this.profileUI.main_title_color!);
    this.addBackgroundColor('LINK_MAIN_COLOR', this.profileUI.link_main_color!);
    this.addFontColor('LINK_CUSTOM_COLOR', this.profileUI.link_main_color!);
    this.addFontColor('LINK_SECONDARY_COLOR', this.profileUI.link_secondary_color!);
    this.addBorderColor('UNAME_TEXT_COLOR', this.profileUI.uname_text_color!);
    this.addFontColor('BOX_TEXT_COLOR', this.profileUI.box_text_color!);
    this.addFontColor('BOX_TITLE_TEXT_COLOR', this.profileUI.box_title_text_color!);
    this.addFontSize('MAIN_TITLE_SIZE', this.profileUI.main_title_size!);
    this.addFontSize('UNAME_TEXT_SIZE', this.profileUI.uname_text_size!);
    this.addFontSize('BOX_TEXT_SIZE', this.profileUI.box_text_size!);
    this.addFontSize('BOX_TITLE_TEXT_SIZE', this.profileUI.box_title_text_size!);
    this.addRoundedSize(this.profileUI.rounded_corners_size!);
    this.addImageBackground();
  }
  private replaceText(searchKey: string, replaceText: string){
    const regex = new RegExp(`{{${searchKey}}}`, 'g');
    this.resultantCss = this.resultantCss.replace(regex, replaceText);
  }

  private addImageBackground() {
    const bgImageUrl = this.profileUI.main_background_image?.image;
    const bgImagePosition = this.profileUI.main_background_image?.position;
    const bgImageAttachment = this.profileUI.main_background_image?.attachment;
    const bgImageSize = this.profileUI.main_background_image?.size;
    const bgImageRepeat = this.profileUI.main_background_image?.repeat;

    this.replaceText('BG_IMAGE_URL', this.isValueAvailable(bgImageUrl!) ? `background-image: url('${bgImageUrl}');` : '');
    this.replaceText('BG_IMAGE_POSITION', this.isValueAvailable(bgImagePosition!) ? `background-position: ${bgImagePosition};` : '');
    this.replaceText('BG_IMAGE_ATTACHMENT', this.isValueAvailable(bgImageAttachment!) ? `background-attachment: ${bgImageAttachment};` : '');
    this.replaceText('BG_IMAGE_REPEAT', this.isValueAvailable(bgImageRepeat!) ? `background-repeat: ${bgImageRepeat};` : '');
    this.replaceText('BG_IMAGE_SIZE', this.isValueAvailable(bgImageSize!) ? `background-size: ${bgImageSize};` : '');
  }
}

export const cssProc = async (identifier: string): Promise<string> =>{
  const profileCssProcessor = new ProfileCssProcessor(identifier);
  return profileCssProcessor.get();
}