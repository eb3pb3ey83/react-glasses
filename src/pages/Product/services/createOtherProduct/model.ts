export interface RequestProps {
  brand_code: string
  country_type: string
  infos: Info[]
  market_type: string
  package_amt: string | number
  package_unit: string
  product_no: string
  status: string
  sub_type_id?: number
  type_no?: string
}

interface Info {
  images: number[]
  language: number | string
  market_contact: string
  product_contact: string
  product_info: string
  product_name: string
}
