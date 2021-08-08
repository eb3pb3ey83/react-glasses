import React from 'react'
import LanguageButton from 'src/shared/components/LanguageButton'
import ResetPassword from 'src/shared/components/ResetPassword'
import useStyles from './useStyles'

const Reset: React.FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <div>
        <ResetPassword open isResetPage withCloseIcon={false} />
        <div className={classes.languageButtonContainer}>
          <LanguageButton className={`${classes.languageButton} langBtn`} />
        </div>
      </div>
    </div>
  )
}

export default Reset
