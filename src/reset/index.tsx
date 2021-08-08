import React from 'react'
import LogoSrc from 'src/assets/img/logo.png'
import LanguageButton from 'src/shared/components/LanguageButton'
import ResetPassword from 'src/shared/components/ResetPassword'
import useStyles from './useStyles'

const Reset: React.FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <div>
        <img className={classes.logo} src={LogoSrc} alt='' />
        <ResetPassword open isResetPage withCloseIcon={false} />
        <div className={classes.languageButtonContainer}>
          <LanguageButton className={`${classes.languageButton} langBtn`} />
        </div>
      </div>
    </div>
  )
}

export default Reset
