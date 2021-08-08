import React from 'react'
import { useHistory, useParams } from 'react-router'
import { Props } from './model'
import InfoDrawer from 'src/shared/components/InfoDrawer'
import Alert from 'src/shared/components/Alert'
import Box from '@material-ui/core/Box'
import deleteIconSrc from 'src/assets/icon/delete.svg'
import Button from 'src/shared/components/Button'
import { getPermission } from 'src/utils/getPermission'
import { useAlertMachine } from 'src/shared/machine/alertMachine/hooks'
import { createContentReducer, createValueInitState } from '../../reducer'
import FormContent from '../FormContent'
import { isStateValidate } from '../../utils'
import useMainBannerInfo from '../../services/mainBannerInfo/hooks'
import { useEditMainBanner } from '../../services/editMainBanner/hooks'
import { formBodyProps } from '../MainBannerCreator/model'
import { deleteEditMainBanner } from '../../services/deleteMainBanner/hooks'
import { Resultdata } from '../../services/mainBannerInfo/model'
import { useTranslation } from 'react-i18next'
import useStyles from './useStyles'

const localReducer = createContentReducer()
const { hasDeletePermission, hasUpdatePermission } = getPermission('main')

const MainBannerEditor: React.FC<Props> = React.memo(({ openToast, list, langListForign, langListLocal }) => {
  if (!langListForign || !langListLocal) return null
  let { id } = useParams<{ id: string }>()
  const classes = useStyles()
  const { t } = useTranslation()
  const history = useHistory()
  const [open, setOpen] = React.useState(true)
  const closeDrawer = () => {
    setOpen(false)
    history.push('/pages/pagemanagement/homebanner')
  }
  const { response: mainDetail } = useMainBannerInfo(id)
  const { mutate } = useEditMainBanner(openToast, closeDrawer)
  const { mutate: deleteBanner } = deleteEditMainBanner(openToast, closeDrawer)
  const { openAlert, closeAlert, isAlertOpen, alertMessage } = useAlertMachine()
  const [langTab, setLangTab] = React.useState<string | number>(0)
  const [contentWithLang, dispatch] = React.useReducer(localReducer, {})
  const [errorTab, setErrorTab] = React.useState<{ [key: number]: number | null }>({ 1: null, 2: null })
  const isCountyDisabled = true
  const areaValue = mainDetail ? parseInt((mainDetail as Resultdata).country_type) : 1
  const langList = areaValue === 1 ? langListLocal : langListForign
  const allCreateState = {
    errorTab,
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

  React.useEffect(() => {
    if (mainDetail) {
      dispatch({ act: 'reInit', initData: createValueInitState(langList, (mainDetail as Resultdata).banner_content), lang: 0 })
    }
  }, [mainDetail])

  React.useEffect(() => {
    return () => setOpen(false)
  }, [])

  const doFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    let stateVali = isStateValidate(contentWithLang, dispatch)

    if (!stateVali.isPass) {
      setErrorTab((pre) => ({ ...pre, [areaValue]: stateVali.localErrorTab }))
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
    mutate({ data: sectionsData, id })
  }

  const confirmDelete = () => {
    if (!list) return
    if (list.length === 1) {
      openAlert({
        title: t('alert.section13'),
        content: t('alert.section14'),
        isDicidedMode: true,
        onConfirm: () => {
          closeAlert()
          return
        },
      })
    }
    openAlert({
      title: t('alert.section15'),
      content: t('alert.section5'),
      isDicidedMode: true,
      onConfirm: () => {
        deleteBanner({
          id,
          data: {
            ban_type: '2',
            country_type: String(areaValue),
          },
        })
        closeAlert()
      },
      confirmBtnLabel: t('alert.section18'),
    })
  }

  const drawerTitle = hasUpdatePermission ? t('title.section6') : t('title.section7')

  return (
    <InfoDrawer.Container
      editHistory={{
        updated_time: (mainDetail as Resultdata)?.updated_time,
        updated_user: (mainDetail as Resultdata)?.updated_user,
        created_time: (mainDetail as Resultdata)?.created_time,
        created_user: (mainDetail as Resultdata)?.created_user,
      }}
      width='700px'
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
          {mainDetail && allCreateState && Object.keys(contentWithLang).length > 0 && (
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

MainBannerEditor.displayName = 'MainBannerEditor'
export default MainBannerEditor
