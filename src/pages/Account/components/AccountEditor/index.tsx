import React from 'react'
import InfoDrawer from 'src/shared/components/InfoDrawer'
import { Props } from './model'
import useAccountInfo from '../../services/accountInfo/hooks'
import { useParams } from 'react-router'
import Loading from 'src/shared/components/Loading'
import AccountForm from './components/AccountForm'
import { useTranslation } from 'react-i18next'
import { AlertUnauthContext } from 'src/pages/model'

const AccountEditor: React.FC<Props> = ({ openToast, closeDrawer, deptList, roleList }) => {
  const openUnAuthAlert = React.useContext(AlertUnauthContext)
  const params: { id: string } = useParams()
  const { accountInfo } = useAccountInfo(params.id, openUnAuthAlert)
  const { t } = useTranslation()

  if (!accountInfo) {
    return (
      <InfoDrawer.Container title={t('title.section1')} open onClose={closeDrawer}>
        <Loading />
      </InfoDrawer.Container>
    )
  }

  return <AccountForm accountInfo={accountInfo} openToast={openToast} closeDrawer={closeDrawer} deptList={deptList} roleList={roleList} />
}

export default AccountEditor
