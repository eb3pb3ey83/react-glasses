import { useForm } from 'react-hook-form'
import { isEmpty } from 'lodash'
// import 'react-perfect-scrollbar/dist/css/styles.css'
import { currentStateType, Items, sendEventType } from '../model'

const useFormConfig = (send: sendEventType, state: currentStateType, propsOnSubmit: (list: number[]) => void) => {
  const defaultIds: Items[] | [] = []

  const { control, handleSubmit, getValues, setValue, watch } = useForm({
    defaultValues: { itemList: defaultIds },
  })

  const selectedList = watch('itemList')

  const removeItem = (itemList: Items[], currentItem: Items) => itemList?.filter((item) => item.id !== currentItem.id)

  const onLabelClick = (currentItem: Items) => {
    const { itemList } = getValues()
    const newItemList = removeItem(itemList, currentItem)

    setValue('itemList', newItemList)
  }

  const handleCheck = (currentItem: Items) => {
    const itemList = getValues().itemList as Items[]
    const isSelected = Boolean(itemList.find((value: Items) => value.id === currentItem.id))

    const newIds = isSelected ? removeItem(itemList, currentItem) : [...(itemList ?? []), currentItem]

    return newIds
  }

  const hasSelectItem = !isEmpty(selectedList)

  const onInputClick = () => {
    send({ type: 'INPUT_CLICK' })
    setValue('itemList', state.context.submittedList)
  }

  const onSubmit = (data: { itemList: Items[] }) => {
    const submittedList = data.itemList.map((value) => value.id)
    propsOnSubmit(submittedList)

    send({ type: 'SET_SUBMITTED_LIST', submittedList: data.itemList })
  }

  return {
    control,
    handleSubmit,
    onLabelClick,
    handleCheck,
    hasSelectItem,
    selectedList,
    setValue,
    onInputClick,
    onSubmit,
  }
}

export default useFormConfig
