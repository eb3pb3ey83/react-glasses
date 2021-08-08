import React from 'react'
import { Box } from '@material-ui/core'
import Button from 'src/shared/components/Button'
import InfoDrawer from 'src/shared/components/InfoDrawer'
import { useHistory, useParams } from 'react-router-dom'
import FormContent from '../FormContent'
import deleteIconSrc from 'src/assets/icon/delete.svg'
import { Props, stateProps } from './model'
import { createContentReducer, createValueInitState } from '../FormContent/reducer'
import { DateProps, TimeProps } from '../FormContent/model'
import { newsData, Newssection } from '../../services/updateNews/model'
import { getPermission } from 'src/utils/getPermission'
import useNewsInfo from '../../services/newsInfo/hooks'
import { useUpdateNews } from '../../services/updateNews/hooks'
import { formatDate, isDateValidate, isStateValidate } from '../../utils'
import { useAlertMachine } from 'src/shared/machine/alertMachine/hooks'
import { useDeleteNews } from '../../services/deleteNews/hooks'
import Alert from 'src/shared/components/Alert'
import { useTranslation } from 'react-i18next'
import { AlertUnauthContext } from 'src/pages/model'
import useStyles from './useStyles'

const localReducer = createContentReducer()

const defaultDateFormat = (date: string) => {
  return new Date(date)
}
const { hasDeletePermission, hasUpdatePermission } = getPermission('news')

const NewsEditor: React.FC<Props> = React.memo(({ openToast, langListForign, langListLocal }) => {
  if (!langListForign || !langListLocal) return null
  let { id } = useParams<{ id: string }>()
  const params: { open_flag: '0' | '1'; id: string } = React.useMemo(() => {
    return { id: id, open_flag: '1' }
  }, [])
  const openUnAuthAlert = React.useContext(AlertUnauthContext)

  const { newsInfo } = useNewsInfo(params, openUnAuthAlert)
  const classes = useStyles()
  const history = useHistory()
  const [open, setOpen] = React.useState(true)
  const { mutate: deleteNews } = useDeleteNews(openUnAuthAlert, openToast, closeDrawer)
  const { openAlert, closeAlert, isAlertOpen, alertMessage } = useAlertMachine()
  const { mutate } = useUpdateNews(openUnAuthAlert, openToast, closeDrawer)
  //createnews state//
  const isCountyDisabled = true
  const areaValue = newsInfo ? parseInt(newsInfo.country_type) : 1
  const langList = areaValue === 1 ? langListLocal : langListForign
  const timeRadio = newsInfo && newsInfo.news_dateend ? 2 : 1
  const startDate = newsInfo && newsInfo.news_datestart.split(' ')[0]
  const startTime = newsInfo && newsInfo.news_datestart.split(' ')[1]
  const endDate = newsInfo && newsInfo.news_dateend?.split(' ')[0]
  const endTime = newsInfo && newsInfo.news_dateend ? newsInfo.news_dateend.split(' ')[1] : ''
  const dateStart = startDate && defaultDateFormat(startDate)
  const dateEnd = endDate ? defaultDateFormat(endDate) : undefined
  const [timeValue, setTimeValue] = React.useState<number | string>(timeRadio)
  const [selectedDayLocal, setSelectedDayLocal] = React.useState<DateProps>({
    from: dateStart ? dateStart : undefined,
    to: dateEnd,
    error: { from: false, to: false },
  })
  const [pickTimeLocal, setPickTimeLocal] = React.useState<TimeProps>({
    from: startTime ? startTime : '',
    to: endTime,
    error: { from: false, to: false },
  })
  const [isDirty, setIsdirty] = React.useState(false)
  const [langTab, setLangTab] = React.useState<string | number>(0)
  const [contentWithLangLocal, dispatchLocal] = React.useReducer(localReducer, {})
  const [errorTab, setErrorTab] = React.useState<{ [key: number]: number | null }>({ 1: null, 2: null })
  const [contentEmpty, setContentEmpty] = React.useState<{ [key: number]: { [key: number]: boolean } }>({ 1: {}, 2: {} })
  const selectedDay = selectedDayLocal
  const pickTime = pickTimeLocal
  const setSelectedDay = setSelectedDayLocal
  const setPickTime = setPickTimeLocal
  const contentWithLang: stateProps = contentWithLangLocal
  const dispatch = dispatchLocal
  const allCreateState = {
    errorTab,
    contentEmpty,
    setContentEmpty,
    areaValue,
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
    hasDeletePermission,
    hasUpdatePermission,
    openAlert,
    closeAlert,
    setIsdirty,
  }
  const { t } = useTranslation()

  //createnews state//
  React.useEffect(() => {
    if (newsInfo) {
      dispatch({ act: 'reInit', initData: createValueInitState(langList, newsInfo.news_sections), lang: 0 })
      setTimeValue(timeRadio)
      setPickTimeLocal({ from: startTime ? startTime : '', to: endTime, error: { from: false, to: false } })
      setSelectedDayLocal({ from: dateStart ? dateStart : undefined, to: dateEnd, error: { from: false, to: false } })
    }
  }, [newsInfo])

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
        onConfirm: () => {
          if (stateVali.localErrorTab !== null) {
            setLangTab(stateVali.localErrorTab as number)
          }
          closeAlert()
        },
        confirmBtnLabel: t('alert.section12'),
      })
    }

    if (!dateVali || !stateVali.isPass) return

    const formDateEnd = selectedDay.to && pickTime.to ? formatDate(selectedDay.to, pickTime.to as string) : undefined
    const formDateStart = selectedDay.from && pickTime.from && formatDate(selectedDay.from, pickTime.from as string)
    const langs = areaValue === 1 ? langListLocal : langListForign
    let sectionsData: Newssection[] = []
    for (let k in contentWithLang) {
      let newSectionsData = contentWithLang[k].map((content, idx) => {
        if (Number(content.type) === 2) {
          return {
            id: content.id,
            language: langs[k].code_no,
            section_content: 'empty',
            section_image: content.payload.id as number,
            section_sort: idx,
            section_type: Number(content.type),
          }
        } else {
          return {
            id: content.id,
            language: langs[k].code_no,
            section_content: (content.payload.value as string) || (content.payload.url as string),
            section_sort: idx,
            section_type: Number(content.type),
          }
        }
      })
      sectionsData = [...sectionsData, ...newSectionsData]
    }

    let formData: newsData = {
      country_type: areaValue as number,
      news_datestart: formDateStart as string,
      news_sections: sectionsData,
      news_dateend: null,
    }
    if (timeValue === 2 && formDateEnd) {
      formData = { ...formData, news_dateend: formDateEnd }
    }
    setIsdirty(false)
    mutate({ newsData: formData, id })
  }

  React.useEffect(() => {
    return () => {
      setIsdirty(false)
      setOpen(false)
    }
  }, [])

  const confirmDelete = () => {
    openAlert({
      title: t('alert.section17'),
      content: t('alert.section5'),
      isDicidedMode: true,
      onConfirm: () => {
        deleteNews({ ids: [parseInt(id)] })
        closeAlert()
      },
      confirmBtnLabel: t('alert.section18'),
    })
  }

  const drawerTitle = hasDeletePermission && hasUpdatePermission ? t('title.section10') : t('title.section11')

  return (
    <InfoDrawer.Container
      editHistory={{
        updated_time: newsInfo?.updated_time,
        updated_user: newsInfo?.updated_user,
        created_time: newsInfo?.created_time,
        created_user: newsInfo?.created_user,
      }}
      width='100%'
      title={drawerTitle}
      open={open}
      onClose={closeDrawer}
    >
      <form onSubmit={doFormSubmit}>
        <InfoDrawer.Content disabled={!hasUpdatePermission}>
          <Alert
            isDicidedMode={true}
            onConfirm={alertMessage.onConfirm}
            onClose={closeAlert}
            open={isAlertOpen}
            confirmBtnLabel={alertMessage.confirmBtnLabel}
            title={alertMessage.title}
            content={alertMessage.content}
          />
          {newsInfo && allCreateState && Object.keys(contentWithLang).length > 0 && (
            <FormContent content={contentWithLang} allCreateState={allCreateState} />
          )}
        </InfoDrawer.Content>
        {hasUpdatePermission && (
          <InfoDrawer.Footer>
            <Box display='flex' justifyContent='space-between'>
              {hasDeletePermission && (
                <Button
                  width={115}
                  height={40}
                  className={classes.deleteButton}
                  isDeleteButton
                  startIcon={<img src={deleteIconSrc} alt='' />}
                  fullWidth={false}
                  onClick={confirmDelete}
                  type='button'
                >
                  {t('alert.section18')}
                </Button>
              )}
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
        )}
      </form>
    </InfoDrawer.Container>
  )
})

export default NewsEditor
