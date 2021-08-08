import { CSSObject } from '@emotion/serialize'
import { GroupTypeBase, OptionProps, OptionTypeBase, StylesConfig } from 'react-select'
import loadingSrc from 'src/assets/gif/loading.gif'

//select styles
export const customStyles = (isLoading?: boolean): StylesConfig<OptionTypeBase, boolean> => ({
  control: () => ({
    outline: 'none',
    background: '#FFFFFF',
    border: '1px solid #D9DADB',
    borderRadius: '8px',
    padding: '9px 16px',
    display: 'flex',
    alignItems: 'center',
    maxHeight: '40px',
  }),
  indicatorsContainer: () => ({
    display: 'none',
  }),
  menu: () => ({
    margin: '16px 0',
    width: '290px',
    height: '200px',
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
  menuList: () => ({
    width: '100%',
    height: '100%',
    overflow: 'auto',
  }),
  placeholder: (provided: CSSObject) => ({
    ...provided,
    color: '#A6A9AD',
    fontSize: '14px',
    lineHeight: '22px',
    fontWeight: 400,
  }),
  input: (provided: CSSObject) => ({
    ...provided,
    color: '#202833',
    fontSize: '14px',
    lingHeight: '22px',
  }),
  singleValue: (provided: CSSObject) => ({
    ...provided,
    color: '#202833',
    fontSize: '14px',
    lingHeight: '22px',
  }),
  option: (provided: CSSObject, state: OptionProps<OptionTypeBase, boolean, GroupTypeBase<OptionTypeBase>>) => ({
    ...provided,
    maxHeight: '40px',
    fontSize: '16px',
    lineHeight: '24px',
    fontWeight: 400,
    background: '#fff',
    color: state.isSelected ? '#2664DF' : '#202833',
    '&:hover': {
      background: '#F4F7FD',
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: '4px',
  }),
})
