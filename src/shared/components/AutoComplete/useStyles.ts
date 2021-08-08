import { OptionTypeBase, StylesConfig } from 'react-select'
import loadingSrc from 'src/assets/gif/loading.gif'

type IsMulti = false

const selectStyles: (isError?: boolean, isLoading?: boolean) => StylesConfig<OptionTypeBase, IsMulti> = (isError, isLoading) => ({
  control: (styles, { selectProps, isDisabled }) => {
    const wrapper = '& > div:first-of-type'

    return {
      ...styles,
      backgroundColor: isDisabled ? '#F7F8F8' : '#ffffff',
      boxShadow: 'none',
      borderRadius: '8px',
      minHeight: '38px',
      borderColor: isError ? '#F66363' : '#D9DADB',
      height: selectProps?.height || '38px',

      [wrapper]: {
        paddingLeft: '10px',
      },

      '&:hover': {
        borderColor: isError ? '#F66363' : '#2a69c7',
      },
    }
  },

  menu: (styles) => ({
    ...styles,
    zIndex: 10,
    padding: '10px 0px 0 0',
    boxShadow: '0px 4px 16px rgba(38, 100, 223, 0.15)',
    borderRadius: '8px',
    fontSize: '14px',
    color: '#202833',

    '&:after': {
      content: '""',
      width: '20px',
      height: '20px',
      background: `url("${loadingSrc}")`,
      backgroundSize: 'contain',
      display: isLoading ? 'block' : 'none',
      margin: 'auto',
      padding: '0 0 10px 0',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'top center',
      boxSizing: 'content-box',
    },
  }),

  menuList: (styles) => {
    const menuItem = '& > div > div'

    return {
      ...styles,
      padding: '0 0 10px 0',
      overflow: 'overlay',
      overflowX: 'visible',

      [menuItem]: {
        cursor: 'pointer',
        marginRight: '-5px',
      },
    }
  },

  indicatorSeparator: (styles) => ({
    ...styles,
    display: 'none',
    padding: '8px',
  }),

  singleValue: (styles) => ({
    ...styles,
    opacity: 0,
  }),

  placeholder: (styles) => ({
    ...styles,
    color: '#A6A9AD',
    fontSize: '14px',
  }),

  dropdownIndicator: (styles, { selectProps }) => ({
    ...styles,
    transform: selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
  }),

  option: (styles) => ({
    ...styles,
    cursor: 'pointer',
  }),

  input: (styles, { isDisabled }) => {
    const nativeInput = '& > div > input'

    return {
      ...styles,
      padding: 0,
      fontSize: '14px',
      visibility: 'visible',

      [nativeInput]: {
        opacity: '1 !important',
        color: isDisabled ? '#868A8F !important' : '#202833 !important',
      },
    }
  },
})
export default selectStyles
