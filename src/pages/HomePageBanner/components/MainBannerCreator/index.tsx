import React from 'react'
import { Box } from '@material-ui/core'
import Button from 'src/shared/components/Button'
import InfoDrawer from 'src/shared/components/InfoDrawer'
import FormContent from '../FormContent'
import { formBodyProps, Props } from './model'
import { createContentReducer, createInitState } from '../../reducer'
import { stateProps } from '../FormContent/model'
import { isStateValidate } from '../../utils'
import { useAlertMachine } from 'src/shared/machine/alertMachine/hooks'
import Alert from 'src/shared/components/Alert'
import { useCreateMainBanner } from '../../services/createMainBanner/hooks'
import { useTranslation } from 'react-i18next'
import useStyles from './useStyles'

const localReducer = createContentReducer()
const forignReducer = createContentReducer()

const MainBannerCreator: React.FC<Props> = ({ openToast, roleType, langListForign, langListLocal, closeDrawer }) => {
  if (!langListForign || !langListLocal || !roleType) return null
  const classes = useStyles()
  const { t } = useTranslation()
  const { openAlert, closeAlert, isAlertOpen, alertMessage } = useAlertMachine()
  const { mutate } = useCreateMainBanner(openToast, openAlert, closeAlert, closeDrawer)
  const [open, setOpen] = React.useState(true)
  //createnews state//
  const isCountyDisabled = roleType !== '0'
  const defalutCounty = roleType === '0' ? 1 : Number(roleType)
  const [areaValue, setAreaValue] = React.useState<number | string>(defalutCounty)
  const langList = areaValue === 1 ? langListLocal : langListForign
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
  const contentWithLang: stateProps = areaValue === 1 ? contentWithLangLocal : contentWithLangForign
  const dispatch = areaValue === 1 ? dispatchLocal : dispatchForign

  //createnews state//
  const allCreateState = {
    errorTab,
    areaValue,
    setAreaValue,
    langTab,
    setLangTab,
    dispatch,
    langList,
    isCountyDisabled,
    openAlert,
    closeAlert,
  }

  const doFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    let stateVali = isStateValidate(contentWithLang, dispatch)
    if (!stateVali.isPass) {
      setErrorTab((pre) => ({ ...pre, [areaValue]: stateVali.localErrorTab }))
      openAlert({
        title: t('alert.section9'),
        content: `${t('alert.section10')}${langList[stateVali.localErrorTab].code_name_ch}${t('alert.section11')}`,
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

    if (!stateVali.isPass) return

    const langs = areaValue === 1 ? langListLocal : langListForign

    let sectionsData: formBodyProps[] = []
    for (let k in contentWithLang) {
      sectionsData = [
        ...sectionsData,
        {
          ban_link: contentWithLang[k][3].payload.value as string,
          ban_mobile_img_id: contentWithLang[k][1].payload.id as number,
          ban_target: String(contentWithLang[k][4].payload.value) as string,
          ban_title: contentWithLang[k][2].payload.value as string,
          ban_web_img_id: contentWithLang[k][0].payload.id as number,
          language: langs[k].code_no,
        },
      ]
    }
    const params = {
      ban_type: '2' as '1' | '2',
      country_type: areaValue as '1' | '2',
    }

    mutate({ data: sectionsData, params: params })
  }

  React.useEffect(() => {
    return () => setOpen(false)
  }, [])

  return (
    <InfoDrawer.Container width='700px' title={t('title.section5')} open={open} onClose={closeDrawer}>
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
          {contentWithLang && <FormContent allCreateState={allCreateState} content={contentWithLang} isCreate={true} />}
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

export default MainBannerCreator
