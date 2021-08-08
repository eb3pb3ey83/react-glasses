export interface ReqProps {
  customer_id: number
  job_title: string | null
  level_view: string
  open_flag: string
  order_chk: string
  role_type: string
  roles?: Role[]
  user_id: number
  user_name: string
}

interface Role {
  button_id: number
  isChose: string
}
