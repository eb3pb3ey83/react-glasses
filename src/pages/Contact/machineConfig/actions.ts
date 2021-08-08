import { assign } from 'xstate'
import Context from './context'
import { PageChange, KeywordChange, OrderChangeContact, RoleChange } from './event'

export const actions = {
  changePage: assign<Context, PageChange>({
    currentPage: (_context, event) => event.page,
  }),
  changeKeyword: assign<Context, KeywordChange>({
    company_name: (_context, event) => event.company_name,
  }),
  changeOrder: assign<Context, OrderChangeContact>({
    order: (_context, event) => event.order,
  }),
  changeRole: assign<Context, RoleChange>({
    country_type: (_context, event) => event.country_type,
  }),
}
