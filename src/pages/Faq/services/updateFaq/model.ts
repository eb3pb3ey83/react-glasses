export interface UpdateFaqModel {
  id: string

  faq_sections: Faqsection[]
}

interface Faqsection {
  id: number
  language: string
  section_content: string
  section_type: string
}
