import { assign } from 'xstate'
import Context from './context'
import { PageChange, RoleChange } from './event'

export const actions = {
  changePage: assign<Context, PageChange>({
    currentPage: (_context, event) => event.page,
  }),
  changeRole: assign<Context, RoleChange>({
    role_type: (_context, event) => event.role_type,
  }),
}
