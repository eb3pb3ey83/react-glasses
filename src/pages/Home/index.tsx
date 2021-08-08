import React from 'react'
import { ReactComponent as TimerIcon } from 'src/assets/icon/timerBig-icon.svg'
import { ReactComponent as CheckListIcon } from 'src/assets/icon/checkList-icon.svg'
import { ReactComponent as TruckIcon } from 'src/assets/icon/truck-icon.svg'
import { ReactComponent as ArrowRight } from 'src/assets/icon/arrow-right-icon.svg'
import { ReactComponent as CheckListErrIcon } from 'src/assets/icon/checkListError-icon.svg'
import { useTranslation } from 'react-i18next'
import useStyles from './useStyles'

const Home: React.FC = () => {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <div className={classes.home}>
      <div className={classes.title}>{t('home.title')}</div>
      <ul className={classes.orderStatus}>
        <li className={classes.statusState}>
          <div className={classes.iconWithBg}>
            <TimerIcon />
          </div>
          <div className={classes.labelWithValue}>
            <div>
              {t('home.unprocessedOrder')} <ArrowRight />
            </div>
            <div>18</div>
          </div>
        </li>
        <li className={classes.statusState}>
          <div className={classes.iconWithBg}>
            <CheckListIcon />
          </div>
          <div className={classes.labelWithValue}>
            <div>
              {t('home.orderFormation')} <ArrowRight />
            </div>
            <div>18</div>
          </div>
        </li>
        <li className={classes.statusState}>
          <div className={classes.iconWithBg}>
            <TruckIcon />
          </div>
          <div className={classes.labelWithValue}>
            <div>
              {t('home.ordersShipped')} <ArrowRight />
            </div>
            <div>18</div>
          </div>
        </li>
        <li className={classes.statusState}>
          <div className={classes.iconWithBg}>
            <CheckListErrIcon />
          </div>
          <div className={classes.labelWithValue}>
            <div>
              {t('home.orderCancelled')} <ArrowRight />
            </div>
            <div>18</div>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default Home
