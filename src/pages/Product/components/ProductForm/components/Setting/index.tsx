import { Box, Checkbox, FormControlLabel } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import BlueTable from 'src/shared/components/BlueTable'
import LabelTitle from 'src/shared/components/BlueTable/LabelTitle'
import Button from 'src/shared/components/Button'
import Head from 'src/shared/components/BlueTable/Head'
import useStyles from './useStyles'
import { useLanguage } from 'src/core/components/LanguageProvider/hooks'
import { HeadCells } from 'src/shared/components/BlueTable/Head/model'
import SettingForm from '../SettingForm'

const Setting: React.FC = () => {
  const { t } = useTranslation()
  const { language } = useLanguage()
  const classes = useStyles()
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)

  const headCells: HeadCells[] = React.useMemo(() => {
    return [
      {
        id: 'company_name',
        sort: 'company_name',
        disabledSort: true,
        label: t('product.tableTitle'),
        width: 'calc(100% * (300 / 914))',
      },
    ]
  }, [language])

  const list = [{ id: 1, value: 'a' }]

  return (
    <>
      <Box display='flex' justifyContent='space-between' marginTop='50px'>
        <Box display='flex' alignItems='center'>
          <LabelTitle className={classes.title} label={t('product.glassesSetting')} />
          <FormControlLabel label={t('product.settingCheckboxTitle')} control={<Checkbox />} />
        </Box>

        <Button width={115} height={40} onClick={() => setIsDialogOpen(true)} fullWidth={false} isWhiteButton type='button'>
          {t('product.addSettingButton')}
        </Button>
      </Box>

      <BlueTable.Table className={classes.table}>
        <Head headCells={headCells} />
        {list.map((item) => (
          <BlueTable.ContentRow key={item.id} onClick={() => null}>
            <BlueTable.BodyCell scope='row' width='calc(100% * (300 / 914))'>
              {item.value}
            </BlueTable.BodyCell>
          </BlueTable.ContentRow>
        ))}
      </BlueTable.Table>
      {isDialogOpen && <SettingForm closeDialog={() => setIsDialogOpen(false)} />}
    </>
  )
}

export default Setting
