import React from 'react'
import { ControllerRenderProps } from 'react-hook-form'
import { DeptsResponseModel, SubDept } from 'src/pages/Account/services/depts/model'
import { FormToolsContext } from '../../context'
import { DeptModel } from './model'

export const useDeptList = (deptList: DeptsResponseModel[]) => {
  const context = React.useContext(FormToolsContext)
  const [mainDept, setMainDept] = React.useState<null | DeptsResponseModel>(null)
  const [sub_dept, setSubDept] = React.useState<null | SubDept>(null)

  const getDept = (list: DeptModel[], selectedId?: number | null) => {
    const result = list.find((item) => item.id === selectedId)

    return result ? result : null
  }

  React.useEffect(() => {
    const selectedMainId = context?.watchedMainDeptId
    const selectedSubId = context?.watchedSubDeptId

    if (selectedMainId && selectedSubId) {
      const selectedMainDept = getDept(deptList, selectedMainId) as DeptsResponseModel
      const selectSubDept = getDept(selectedMainDept.sub_dept, selectedSubId) as SubDept

      setMainDept(selectedMainDept)
      setSubDept(selectSubDept)
    }

    if (selectedMainId && !selectedSubId) {
      setMainDept(getDept(deptList, selectedMainId) as DeptsResponseModel)
    }
  }, [context?.watchedMainDeptId, context?.watchedSubDeptId])

  const onMainDeptsChange = (selectedId: number, formProps: ControllerRenderProps<Record<string, unknown>>) => {
    const selectedDept = getDept(deptList, selectedId) as DeptsResponseModel

    setSubDept(null)
    selectedDept ? setMainDept(selectedDept) : setMainDept(null)
    formProps.onChange(selectedId)
  }

  const onSubDeptsChange = (selectedId: number, formProps: ControllerRenderProps<Record<string, unknown>>) => {
    if (!mainDept?.sub_dept) {
      return
    }

    const selectedDept = getDept(mainDept?.sub_dept, selectedId) as SubDept

    selectedDept ? setSubDept(selectedDept) : setSubDept(null)
    formProps.onChange(selectedId)
  }

  return { onMainDeptsChange, onSubDeptsChange, mainDept, sub_dept }
}
