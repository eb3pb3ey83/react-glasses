export interface CreateFaqModel {
  country_type: string | number
  faq_sections: section[]
}

interface section {
  language: string

  section_content: string

  section_type: 0 | 1
}
