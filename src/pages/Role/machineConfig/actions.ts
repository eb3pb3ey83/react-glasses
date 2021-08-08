import { assign } from 'xstate'
import Context from './context'
import { PageChange, KeywordChange, OrderChange, RoleChange } from './event'

export const actions = {
  changePage: assign<Context, PageChange>({
    currentPage: (_context, event) => event.page,
  }),
  changeKeyword: assign<Context, KeywordChange>({
    keyword: (_context, event) => event.keyword,
  }),
  changeOrder: assign<Context, OrderChange>({
    order_by: (_context, event) => event.order_by,
  }),
  changeRole: assign<Context, RoleChange>({
    role_type: (_context, event) => event.role_type,
  }),
}
