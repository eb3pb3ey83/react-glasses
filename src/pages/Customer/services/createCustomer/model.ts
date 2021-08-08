export interface RequestProps {
  company_model: string
  customer_id: number
  email: string
  job_title: string | null
  level_view: string
  order_chk: string
  role_type: string
  roles: Role[]
  user_name: string
}

interface Role {
  button_id: number
  isChose: string
}
