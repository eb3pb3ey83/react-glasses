import React from 'react'
import { Box } from '@material-ui/core'
import deleteIconSrc from 'src/assets/icon/delete.svg'
import Button from 'src/shared/components/Button'
import InfoDrawer from 'src/shared/components/InfoDrawer'
import { Props } from './model'
import Alert from 'src/shared/components/Alert'
import { useAlertMachine } from 'src/shared/machine/alertMachine/hooks'
import { getPermission } from 'src/utils/getPermission'
import useBannerInfo from 'src/shared/services/getBannerInfo/hooks'
import useUpdatingBanner from 'src/shared/services/updateBanner/hooks'
import useFormConfig from './formConfig'
import { useParams } from 'react-router-dom'
import BannerModifier from '../BannerModifier'
import useDeletingBanner from 'src/shared/services/deleteBanner/hooks'
import { BannerInfo } from 'src/shared/services/getBannerInfo/model'
import { useTranslation } from 'react-i18next'
import useStyles from './useStyles'

const { hasDeletePermission, hasUpdatePermission } = getPermission('login')

const LoginBannerEditor: React.FC<Props> = ({ openToast, list, closeDrawer }) => {
  const params: { id: string } = useParams()
  const { closeAlert, openAlert, isAlertOpen, alertMessage } = useAlertMachine()
  const { bannerInfo, isBannerInfoFetched } = useBannerInfo(params.id)
  const { mutate } = useUpdatingBanner(openToast, closeDrawer)
  const classes = useStyles()
  const { handleSubmit, onSubmit, control, register, errors } = useFormConfig(mutate, params.id, isBannerInfoFetched, bannerInfo as BannerInfo)
  const { mutate: deleteBanner } = useDeletingBanner(openToast, closeDrawer)
  const { t } = useTranslation()

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
      title: t('alert.section16'),
      content: t('alert.section5'),
      isDicidedMode: true,
      onConfirm: () => {
        closeAlert()
        deleteBanner({ id: params.id, ban_type: '1' })
      },
    })
  }

  return (
    <InfoDrawer.Container
      editHistory={{
        updated_time: (bannerInfo as BannerInfo)?.updated_time,
        updated_user: (bannerInfo as BannerInfo)?.updated_user,
        created_time: (bannerInfo as BannerInfo)?.created_time,
        created_user: (bannerInfo as BannerInfo)?.created_user,
      }}
      width={700}
      title={t('title.section8')}
      open
      onClose={closeDrawer}
    >
      <Alert
        onClose={closeAlert}
        open={isAlertOpen}
        onConfirm={alertMessage.onConfirm}
        isDicidedMode={alertMessage.isDicidedMode as boolean}
        title={alertMessage.title}
        content={alertMessage.content}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <InfoDrawer.Content disabled={!hasUpdatePermission}>
          <BannerModifier
            hasUpdatePermission={hasUpdatePermission}
            imageUrl={(bannerInfo as BannerInfo)?.banner_content.ban_web_img}
            register={register}
            control={control}
            errors={errors}
          />
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
}

export default LoginBannerEditor
