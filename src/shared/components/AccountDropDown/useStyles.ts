import { makeStyles } from '@material-ui/core'
import { createStyles } from '@material-ui/core/styles'

const getAvatarBackground = (word: string | undefined) => {
  const words = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ']
  const backgrounds = ['#037EF3', '#00C16E', '#0CB9C1', '#F48924', '#9E44D6', '#52565E']
  const wordBackgroundIndex = words.findIndex((value) => value === word) % 6
  const notfound = wordBackgroundIndex === -1

  return notfound ? backgrounds[3] : backgrounds[wordBackgroundIndex]
}

const useStyles = makeStyles(() =>
  createStyles({
    accountDropDown: {
      display: 'flex',
      marginRight: '20px',
    },
    paper: {},
    root: {
      display: 'flex',
      marginRight: '20px',
    },
    button: {
      height: '24px',
      display: 'flex',
      padding: 0,
      '&:hover': {
        backgroundColor: '#fff',
      },
    },
    account: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },
    avatar: ({ word }: { word: string | undefined }) => ({
      lineHeight: '24px',
      borderRadius: '50%',
      marginRight: '8px',
      width: '24px',
      height: '24px',
      backgroundColor: getAvatarBackground(word),
      color: '#fff',
      fontWeight: 400,
    }),
    name: {
      fontFamily: 'Noto Sans TC',
      fontStyle: 'normal',
      fontWeight: 400,
      marginRight: '8px',
      fontSize: '14px',
      lineHeight: '22px',
      textAlign: 'center',
      color: '#202833',
    },
    arrowDown: {
      width: '12px',
      height: '12px',
      '& > g > path': {
        fill: '#BED1F6',
      },
    },
  }),
)

export default useStyles
