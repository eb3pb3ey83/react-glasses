import React from 'react'
import { useHistory } from 'react-router'
import { ReactComponent as NetworkErrIcon } from 'src/assets/icon/networkErr-icon.svg'
import Button from 'src/shared/components/Button'
import useStyles from './useStyles'

const ErrorPage: React.FC = () => {
  const classes = useStyles()
  let history = useHistory()
  const goHome = () => {
    history.push('/')
  }
  return (
    <div className={classes.errorPage}>
      <div className={classes.errorContent}>
        <NetworkErrIcon />
        <div className='firstText'>抱歉，您的頁面不存在</div>
        <Button onClick={goHome} style={{ width: '290px' }} type='button'>
          回首頁
        </Button>
        <div className='secondText'>請嘗試刷新頁面或回首頁</div>
      </div>
    </div>
  )
}

export default ErrorPage
