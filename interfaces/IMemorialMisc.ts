export interface IEmploymentInfo {
  company: string;
  company_url: string;
  position: string;
  start_date?: string;
  end_date?: string;
}

export interface IEducationInfo {
  institution: string;
  degree?: string;
  field_of_study: string;
  start_date?: string;
  end_date?: string;
}

export interface IMemorialMisc {
  education?: IEducationInfo[];
  carrer?: IEmploymentInfo[];
}
export enum MiscDateFields {
  StartDate = 'start_date',
  EndDate = 'end_date'
}