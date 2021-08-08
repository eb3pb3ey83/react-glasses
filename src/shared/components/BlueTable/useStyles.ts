import { makeStyles } from '@material-ui/core'
import { CreateCSSProperties } from '@material-ui/core/styles/withStyles'
import theme from 'src/theme'

const textOverflowStyle: CreateCSSProperties<Record<string, unknown>> = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}

const tableCellStyle: CreateCSSProperties<Record<string, unknown>> = {
  borderBottom: 'none',
  fontSize: theme.variables.fontSizeSm,
  paddingLeft: '8px',
  paddingRight: '8px',

  '&:first-child': {
    paddingLeft: 0,
  },

  '&:last-child': {
    paddingRight: 0,
  },
}

const useStyles = makeStyles(() => ({
  table: {
    minWidth: 700,
    display: 'block',

    '& .MuiTableHead-root, & .MuiTableBody-root': {
      display: 'block',
    },
  },
  headTableRow: {
    borderRadius: '8px',
    overflow: 'hidden',
    display: 'flex',
    backgroundColor: 'rgba(194, 202, 215, 0.2)',
    padding: '0 16px',
  },
  tableHead: {
    ...tableCellStyle,
    ...textOverflowStyle,
    color: '#6C83A9',
    paddingTop: '9px',
    paddingBottom: '9px',
  },
  contentTableRow: {
    display: 'flex',
    alignItems: 'center',
    borderBottom: '2px solid rgba(194, 202, 215, 0.2)',
    padding: '0 16px',

    '&:hover': {
      background: '#F4F7FD',
    },

    '& .MuiTableCell-root': {
      ...tableCellStyle,
      borderBottom: 'none',
      paddingTop: '19px',
      paddingBottom: '19px',
      cursor: 'pointer',
    },
  },
  tableBody: ({ hasLabel, isLabelLoaded }: { hasLabel?: boolean; isLabelLoaded?: boolean }) => ({
    ...(!hasLabel && {
      ...textOverflowStyle,
      display: 'flex',
      alignItems: 'center',
    }),

    ...(hasLabel && {
      opacity: isLabelLoaded ? 1 : 0,
      maxHeight: '63px',
      transition: '.2s .2s',
    }),
  }),
  hide: {
    opacity: 0,
  },
}))

export default useStyles
