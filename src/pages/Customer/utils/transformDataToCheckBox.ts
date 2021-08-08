import { Resultdata } from '../services/getCustomerDetail/model'
import { Resultdatum } from '../services/getCustomerPermission/model'

export function transformDataToCheckBox(data: Resultdata | Resultdatum[]) {
  let localRolse: { id: number; code: string }[] = []
  let localRoles_all: { [key: number]: '0' | '1' | '2' } = {}
  const localdata = Array.isArray(data) ? data : data.roles
  localdata.forEach((menu) => {
    if (menu.sub_menu) {
      menu.sub_menu.forEach((submenu) => {
        let subBtnLength = submenu.buttons.length
        let isYSubBtn = submenu.buttons.filter((btn) => btn.isChose === 'Y')
        localRolse = [...localRolse, ...isYSubBtn.map((b) => ({ id: b.id, code: b.button_code }))]
        localRoles_all[submenu.id] = subBtnLength === isYSubBtn.length ? '1' : isYSubBtn.length === 0 ? '0' : '2'
      })
    } else {
      let btnLength = menu.buttons?.length
      let isYBtn = menu.buttons ? menu.buttons.filter((btn) => btn.isChose === 'Y') : []
      localRolse = [...localRolse, ...isYBtn.map((b) => ({ id: b.id, code: b.button_code }))]
      localRoles_all[menu.id] = btnLength === isYBtn.length ? '1' : isYBtn.length === 0 ? '0' : '2'
    }
  })
  return { localRolse, localRoles_all }
}
