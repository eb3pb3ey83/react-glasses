import React from 'react'
import { useHistory, useParams } from 'react-router'
import { postSectionsProps, Props } from './model'
import useGetOtherDetail from '../../services/getOtherDetail/hooks'
import InfoDrawer from 'src/shared/components/InfoDrawer'
import Alert from 'src/shared/components/Alert'
import Box from '@material-ui/core/Box'
import Button from 'src/shared/components/Button'
import { getPermission } from 'src/utils/getPermission'
import { useAlertMachine } from 'src/shared/machine/alertMachine/hooks'
import { createContentReducer, createValueInitState } from '../../reducer'
import FormContent from '../FormContent'
import { isStateValidate_notNews } from '../../utils'
import { useUpdateOtherDetail } from '../../services/updateOtherDetail/hooks'
import { Resultdata } from '../../services/getOtherDetail/model'
import { useTranslation } from 'react-i18next'
import { useLanguage } from 'src/core/components/LanguageProvider/hooks'
import useStyles from './useStyles'

const localReducer = createContentReducer()
const { hasDeletePermission, hasUpdatePermission } = getPermission('other')

const OthersEditor: React.FC<Props> = React.memo(({ openToast, langListForign, langListLocal }) => {
  if (!langListForign || !langListLocal) return null
  let { id } = useParams<{ id: string }>()
  const classes = useStyles()
  const history = useHistory()
  const [open, setOpen] = React.useState(true)
  const closeDrawer = () => {
    setOpen(false)
    history.push('/pages/pagemanagement/otherpage')
  }
  const detailParams = {
    other_id: parseInt(id),
    open_flag: '1',
  }
  const { response } = useGetOtherDetail(detailParams)
  const { mutate } = useUpdateOtherDetail(openToast, closeDrawer)
  const { openAlert, closeAlert, isAlertOpen, alertMessage } = useAlertMachine()
  const [langTab, setLangTab] = React.useState<string | number>(0)
  const [contentWithLang, dispatch] = React.useReducer(localReducer, {})
  const [errorTab, setErrorTab] = React.useState<{ [key: number]: number | null }>({ 1: null, 2: null })
  const [contentEmpty, setContentEmpty] = React.useState<{ [key: number]: { [key: number]: boolean } }>({ 1: {}, 2: {} })
  const otherDetail = response?.data.result_data as Resultdata
  const isCountyDisabled = true
  const areaValue = otherDetail ? parseInt(otherDetail.country_type) : 1
  const langList = areaValue === 1 ? langListLocal : langListForign
  const allCreateState = {
    errorTab,
    contentEmpty,
    setContentEmpty,
    areaValue,
    langTab,
    setLangTab,
    dispatch,
    langList,
    isCountyDisabled,
    hasDeletePermission,
    hasUpdatePermission,
    openAlert,
    closeAlert,
  }
  const { language } = useLanguage()
  const { t } = useTranslation()

  // other_type 1:訂單說明 2:付款說明 3:軟體安裝說明 4:服務公告 5:隱私權政策
  const titleTrans = React.useMemo(() => {
    return {
      '1': t('otherpage.type1') as string,
      '2': t('otherpage.type2') as string,
      '3': t('otherpage.type3') as string,
      '4': t('otherpage.type4') as string,
      '5': t('otherpage.type5') as string,
    }
  }, [language])

  React.useEffect(() => {
    if (otherDetail) {
      dispatch({ act: 'reInit', initData: createValueInitState(langList, otherDetail.sections), lang: 0 })
    }
  }, [otherDetail])

  React.useEffect(() => {
    return () => setOpen(false)
  }, [])

  const doFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    let stateVali = isStateValidate_notNews(contentWithLang, dispatch)

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

    if (!stateVali.isPass) return

    const langs = areaValue === 1 ? langListLocal : langListForign
    let sectionsData: postSectionsProps[] = []
    for (let k in contentWithLang) {
      let newSectionsData = contentWithLang[k].map((content, idx) => {
        if (Number(content.type) === 2) {
          return {
            id: content.id,
            language: langs[k].code_no,
            section_content: 'empty',
            section_image_id: content.payload.id as number,
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
    mutate({ data: sectionsData, id, title: `${titleTrans[otherDetail?.other_type as '1' | '2' | '3' | '4' | '5']}` })
  }

  const drawerTitle = hasUpdatePermission
    ? `${t('title.section12')}${titleTrans[otherDetail?.other_type as '1' | '2' | '3' | '4' | '5']}`
    : `${t('title.section13')}${titleTrans[otherDetail?.other_type as '1' | '2' | '3' | '4' | '5']}`

  return (
    <InfoDrawer.Container
      editHistory={{
        updated_time: otherDetail?.updated_time,
        updated_user: otherDetail?.updated_user,
        created_time: otherDetail?.created_time,
        created_user: otherDetail?.created_user,
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
          {otherDetail && allCreateState && Object.keys(contentWithLang).length > 0 && (
            <FormContent content={contentWithLang} allCreateState={allCreateState} />
          )}
        </InfoDrawer.Content>
        {hasUpdatePermission && (
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
        )}
      </form>
    </InfoDrawer.Container>
  )
})

OthersEditor.displayName = 'OthersEditor'
export default OthersEditor
