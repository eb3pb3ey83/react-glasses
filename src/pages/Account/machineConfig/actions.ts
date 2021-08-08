import { DeptsChange, OpenFlagChange, RolesChange } from './event'
import { assign } from 'xstate'
import Context from './context'
import { PageChange, KeywordChange, OrderChange } from './event'

export const actions = {
  changePage: assign<Context, PageChange>({
    currentPage: (_context, event) => event.page,
  }),
  changeKeyword: assign<Context, KeywordChange>({
    user_name: (_context, event) => event.user_name,
  }),
  changeOrder: assign<Context, OrderChange>({
    order: (_context, event) => event.order,
  }),
  changeRoles: assign<Context, RolesChange>({
    roles: (_context, event) => event.roles,
  }),
  changeDepts: assign<Context, DeptsChange>({
    depts: (_context, event) => event.depts,
  }),
  changeOpenFlag: assign<Context, OpenFlagChange>({
    open_flag: (_context, event) => event.open_flag,
  }),
}
