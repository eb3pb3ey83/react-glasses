import React from 'react'
import { Box } from '@material-ui/core'
import Button from 'src/shared/components/Button'
import InfoDrawer from 'src/shared/components/InfoDrawer'
import { useHistory } from 'react-router-dom'
import FormContent from '../FormContent'
import { Props } from './model'
import { createContentReducer, createInitState } from '../FormContent/reducer'
import { DateProps, stateProps, TimeProps } from '../FormContent/model'
import { useCreateNews } from '../../services/createNews/hooks'
import { newsData, Newssection } from '../../services/createNews/model'
import { formatDate, isDateValidate, isStateValidate } from '../../utils'
import { useAlertMachine } from 'src/shared/machine/alertMachine/hooks'
import Alert from 'src/shared/components/Alert'
import format from 'date-fns/format'
import { useTranslation } from 'react-i18next'
import useStyles from './useStyles'
import { AlertUnauthContext } from 'src/pages/model'

const localReducer = createContentReducer()
const forignReducer = createContentReducer()

const NewsCreator: React.FC<Props> = ({ openToast, roleType, langListForign, langListLocal }) => {
  const classes = useStyles()
  const history = useHistory()
  const openUnAuthAlert = React.useContext(AlertUnauthContext)
  const [open, setOpen] = React.useState(true)
  const [isDirty, setIsdirty] = React.useState(false)
  const { openAlert, closeAlert, isAlertOpen, alertMessage } = useAlertMachine()
  const { mutate } = useCreateNews(openUnAuthAlert, openToast, closeDrawer)
  //createnews state//
  const isCountyDisabled = roleType !== '0'
  const defalutCounty = roleType === '0' ? 1 : Number(roleType)
  const [areaValue, setAreaValue] = React.useState<number | string>(defalutCounty)
  const langList = areaValue === 1 ? langListLocal : langListForign
  const [timeValue, setTimeValue] = React.useState<number | string>(1)
  const [selectedDayLocal, setSelectedDayLocal] = React.useState<DateProps>({ from: undefined, to: undefined, error: { from: false, to: false } })
  const [pickTimeLocal, setPickTimeLocal] = React.useState<TimeProps>({
    from: format(new Date(), 'HH:mm'),
    to: '',
    error: { from: false, to: false },
  })
  const [selectedDayForign, setSelectedDayForign] = React.useState<DateProps>({ from: undefined, to: undefined, error: { from: false, to: false } })
  const [pickTimeForign, setPickTimeForign] = React.useState<TimeProps>({
    from: format(new Date(), 'HH:mm'),
    to: '',
    error: { from: false, to: false },
  })
  const [langTab, setLangTab] = React.useState<string | number>(0)
  const localInitState = React.useMemo(() => {
    return createInitState(langListLocal)
  }, [langListLocal])
  const forignInitState = React.useMemo(() => {
    return createInitState(langListForign)
  }, [langListForign])
  const [contentWithLangLocal, dispatchLocal] = React.useReducer(localReducer, localInitState)
  const [contentWithLangForign, dispatchForign] = React.useReducer(forignReducer, forignInitState)
  const [errorTab, setErrorTab] = React.useState<{ [key: number]: number | null }>({ 1: null, 2: null })
  const [contentEmpty, setContentEmpty] = React.useState<{ [key: number]: { [key: number]: boolean } }>({ 1: {}, 2: {} })
  const selectedDay = areaValue === 1 ? selectedDayLocal : selectedDayForign
  const pickTime = areaValue === 1 ? pickTimeLocal : pickTimeForign
  const setSelectedDay = areaValue === 1 ? setSelectedDayLocal : setSelectedDayForign
  const setPickTime = areaValue === 1 ? setPickTimeLocal : setPickTimeForign
  const contentWithLang: stateProps = areaValue === 1 ? contentWithLangLocal : contentWithLangForign
  const dispatch = areaValue === 1 ? dispatchLocal : dispatchForign
  const { t } = useTranslation()

  //createnews state//

  const allCreateState = {
    errorTab,
    contentEmpty,
    setContentEmpty,
    areaValue,
    setAreaValue,
    timeValue,
    setTimeValue,
    selectedDay,
    pickTime,
    setSelectedDay,
    setPickTime,
    langTab,
    setLangTab,
    dispatch,
    langList,
    isCountyDisabled,
    openAlert,
    closeAlert,
    setIsdirty,
  }

  function closeDrawer(type?: string) {
    if (type !== 'submit') {
      if (isDirty) return confirmExit()
    }
    setIsdirty(false)
    setOpen(false)
    history.push('/pages/newsmanagement')
  }

  function confirmExit() {
    openAlert({
      title: t('alert.section21'),
      content: t('alert.section22'),
      isDicidedMode: true,
      onConfirm: () => {
        setIsdirty(false)
        setOpen(false)
        history.push('/pages/newsmanagement')
      },
    })
  }

  const doFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    let dateVali = isDateValidate({ date: selectedDay, setDate: setSelectedDay, time: pickTime, setTime: setPickTime, isRange: timeValue !== 1 })
    let stateVali = isStateValidate(contentWithLang, dispatch)
    if (!stateVali.isPass) {
      setErrorTab((pre) => ({ ...pre, [areaValue]: stateVali.localErrorTab }))
      setContentEmpty((pre) => ({ ...pre, [areaValue]: stateVali.localContentEmpty }))
      openAlert({
        title: t('alert.section9'),
        content: `${t('alert.section10')}${langList[stateVali.localErrorTab as number].code_name_ch}${t('alert.section11')}`,
        isDicidedMode: true,
        confirmBtnLabel: t('alert.section12'),
        onConfirm: () => {
          if (stateVali.localErrorTab !== null) {
            setLangTab(stateVali.localErrorTab as number)
          }
          closeAlert()
        },
      })
    }

    if (!dateVali || !stateVali.isPass) return

    const dateEnd = selectedDay.to && pickTime.to ? formatDate(selectedDay.to, pickTime.to as string) : undefined
    const dateStart = selectedDay.from && pickTime.from && formatDate(selectedDay.from, pickTime.from as string)
    const langs = areaValue === 1 ? langListLocal : langListForign

    let sectionsData: Newssection[] = []
    for (let k in contentWithLang) {
      let newSectionsData = contentWithLang[k].map((content, idx) => {
        if (content.type === 2) {
          return {
            language: langs[k].code_no,
            section_content: 'empty',
            section_image: content.payload.id as number,
            section_sort: idx,
            section_type: content.type,
          }
        } else {
          return {
            language: langs[k].code_no,
            section_content: (content.payload.value as string) || (content.payload.url as string),
            section_sort: idx,
            section_type: content.type,
          }
        }
      })
      sectionsData = [...sectionsData, ...newSectionsData]
    }

    let formData: newsData = {
      country_type: areaValue as number,
      news_datestart: dateStart as string,
      news_sections: sectionsData,
      news_dateend: null,
    }
    if (timeValue === 2 && dateEnd) {
      formData = { ...formData, news_dateend: dateEnd }
    }
    setIsdirty(false)
    mutate(formData)
  }

  React.useEffect(() => {
    return () => {
      setIsdirty(false)
      setOpen(false)
    }
  }, [])

  return (
    <InfoDrawer.Container width='100%' title={t('title.section9')} open={open} onClose={closeDrawer}>
      <form onSubmit={doFormSubmit}>
        <InfoDrawer.Content>
          <Alert
            isDicidedMode={true}
            onConfirm={alertMessage.onConfirm}
            onClose={closeAlert}
            open={isAlertOpen}
            confirmBtnLabel={alertMessage.confirmBtnLabel}
            title={alertMessage.title}
            content={alertMessage.content}
          />
          <FormContent allCreateState={allCreateState} content={contentWithLang} isCreate={true} />
        </InfoDrawer.Content>
        <InfoDrawer.Footer>
          <Box display='flex' justifyContent='flex-end'>
            <Box>
              <Button onClick={closeDrawer} width={113} height={40} isWhiteButton fullWidth={false} type='button'>
                {t('button.cancel')}
              </Button>
              <Button className={classes.saveButton} width={113} height={40} fullWidth={false} type='submit'>
                {t('button.save')}
              </Button>
            </Box>
          </Box>
        </InfoDrawer.Footer>
      </form>
    </InfoDrawer.Container>
  )
}

export default NewsCreator
