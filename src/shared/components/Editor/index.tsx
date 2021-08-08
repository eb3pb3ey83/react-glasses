/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import CKEditor from 'ckeditor4-react'
import FocusTab from './components/FocusTab'
import { Props } from './model'
import { FormHelperText } from '@material-ui/core'
import useStyles from './style'

const config = {
  toolbar: [
    [
      'Format',
      '-',
      'Bold',
      'Italic',
      'Link',
      'NumberedList',
      'BulletedList',
      '-',
      'Outdent',
      'Indent',
      '-',
      'Image',
      'Blockquote',
      'Table',
      'Undo',
      'Redo',
    ],
  ],
}

const Editor: React.FC<Props> = ({ isShowTab = true, isDeleteHover = true, onRemove, onDataSet, style, id = 0, data, ...restProps }) => {
  const classes = useStyles()
  const [focusState, setFocusState] = React.useState(false)

  const onEditorChange = (evt: any) => {
    const newValue = evt.editor.getData() as string
    if (data !== newValue.trim()) {
      onDataSet && onDataSet({ data: newValue, id })
    }
  }
  const onFocusChange = () => {
    setFocusState(true)
  }
  const onBlurChanges = () => {
    setFocusState(false)
  }

  return (
    <div style={{ ...style }}>
      <div style={{ border: restProps.error ? '1px solid red' : '0px', borderRadius: '8px' }}>
        {isShowTab && !restProps.readonly && focusState ? <FocusTab onDelete={onRemove as () => void} /> : ''}
        <CKEditor
          data={data}
          config={config}
          readOnly={restProps.readonly}
          onChange={onEditorChange}
          onFocus={() => (isDeleteHover ? onFocusChange() : '')}
          onBlur={() => (isDeleteHover ? onBlurChanges() : '')}
        />
      </div>
      {restProps.error && <FormHelperText className={classes.errorMessage}>{restProps.errorMessage}</FormHelperText>}
    </div>
  )
}

export default Editor
