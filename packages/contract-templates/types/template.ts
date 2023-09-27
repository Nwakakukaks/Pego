export interface Template {
  templateId?: string;
  name?: string;
  description?: string;
  tags?: string[];
  code?: string;
  inputs?: TemplateInput[];
  dependencies?: TemplateDependencies[];
  createdBy?: string;
  createdDateUTC?: number;
}

export interface TemplateInput {
  key?: string;
  label?: string;
  description?: string;
  dataType?: string;
  defaultValue?: string;
  required?: boolean;
}

export interface TemplateDependencies {
  path?: string;
  fileContent?: string;
}
