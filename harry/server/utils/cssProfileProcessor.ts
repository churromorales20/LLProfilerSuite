import fs from 'fs';
import { apiFetcher } from "@ll-fetchers/llApiFetcher";
import { IProfileUIResponse } from '@ll-interfaces/IProfileUIResponse';

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
    console.log('response');
    console.log('response');
    console.log(response);
    
    if (response.code !== null) {
      this.profileUI = {
        ...this.profileUI,
        ...response.data
      }
      
    }
    /*this.profileUI = {
      main_background_color: '#0E0E18',
      rounded_corners_size: '0.375rem',
      box_background_color: '#ffffff',
      box_text_color: '#222',
      box_text_size: '14px',
      box_title_text_color: '#222',
      box_title_text_size: '16px',
      main_title_color: '#fff',
      main_title_size: '22px',
      main_background_image: {
        image: 'https://scontent.flim17-1.fna.fbcdn.net/v/t1.18169-9/26731416_161436844477553_4974222360232799273_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=9a8829&_nc_ohc=hRcak1mrABAAX-jVm3m&_nc_ht=scontent.flim17-1.fna&oh=00_AfBW73qCvS8TQX2zGLg3T4dufxvQB_MCj7f-E0p1gqU5Lw&oe=65E1D2EB',
        position: 'center',
        attachment: 'fixed',
        repeat: 'no-repeat',
        size: 'contain',
      }
    }*/
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
    this.replaceText(key, this.isValueAvailable(color) ? `background-color: ${color};` : '');
  }
  private addFontColor(key: string, color: string){
    this.replaceText(key, this.isValueAvailable(color) ? `color: ${color};` : '');
  }
  private addFontSize(key: string, size: string){
    this.replaceText(key, this.isValueAvailable(size) ? `font-size: ${size};` : '');
  }
  private addRoundedSize(size: string){
    this.replaceText('ROUNDED_CORNERS_SIZE', this.isValueAvailable(size) ? `border-radius: ${size};` : '');
  }
  private rawReplaceRules(key: string, rules: string){
    this.replaceText(key, this.isValueAvailable(rules) ? rules : '');
  }
  private async compileCSS(){
    this.resultantCss = await fs.promises.readFile('server/assets/basesheet.css', 'utf-8');
    this.addFontLink('FONT_1_LINK', this.profileUI?.font_1_import!);
    this.addFontLink('FONT_2_LINK', this.profileUI.font_2_import!);
    this.rawReplaceRules('FONT_1_RULES', this.profileUI.font_1_rules!);
    this.rawReplaceRules('FONT_2_RULES', this.profileUI.font_2_rules!);
    this.addBackgroundColor('MAIN_BACKGROUND_COLOR', this.profileUI.main_background_color!);
    this.addBackgroundColor('BOX_BACKGROUND_COLOR', this.profileUI.box_background_color!);
    this.addFontColor('MAIN_TITLE_COLOR', this.profileUI.main_title_color!);
    this.addFontColor('UNAME_TEXT_COLOR', this.profileUI.uname_text_color!);
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