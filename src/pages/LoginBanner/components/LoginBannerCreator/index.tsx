import React from 'react'
import { Box } from '@material-ui/core'
import Button from 'src/shared/components/Button'
import InfoDrawer from 'src/shared/components/InfoDrawer'
import { Props } from './model'
import useFormConfig from './formConfig'
import BannerModifier from '../BannerModifier'
import useCreatingBanner from 'src/shared/services/createBanner/hooks'
import { useAlertMachine } from 'src/shared/machine/alertMachine/hooks'
import Alert from 'src/shared/components/Alert'
import useStyles from './useStyles'

const LoginBannerCreator: React.FC<Props> = ({ openToast, closeDrawer }) => {
  const { openAlert, closeAlert, isAlertOpen, alertMessage } = useAlertMachine()
  const { mutate } = useCreatingBanner(openToast, openAlert, closeAlert, closeDrawer)
  const classes = useStyles()
  const { handleSubmit, onSubmit, control, register, errors } = useFormConfig(mutate)

  return (
    <InfoDrawer.Container width={700} title='新增登入頁橫幅' open onClose={closeDrawer}>
      <Alert
        isDicidedMode={true}
        onConfirm={alertMessage.onConfirm}
        onClose={closeAlert}
        open={isAlertOpen}
        confirmBtnLabel={alertMessage.confirmBtnLabel}
        title={alertMessage.title}
        content={alertMessage.content}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <InfoDrawer.Content>
          <BannerModifier register={register} control={control} errors={errors} />
        </InfoDrawer.Content>
        <InfoDrawer.Footer>
          <Box display='flex' justifyContent='flex-end'>
            <Box>
              <Button onClick={closeDrawer} width={113} height={40} isWhiteButton fullWidth={false} type='button'>
                取消
              </Button>
              <Button className={classes.saveButton} width={113} height={40} fullWidth={false} type='submit'>
                儲存
              </Button>
            </Box>
          </Box>
        </InfoDrawer.Footer>
      </form>
    </InfoDrawer.Container>
  )
}

export default LoginBannerCreator
