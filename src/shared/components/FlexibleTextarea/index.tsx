import React, { ChangeEvent } from 'react'
import { Props } from './model'
import useStyles from './useStyles'

const FlexibleTextarea: React.FC<Props> = ({ onChange: propOnChange, disabled, isError, ...restProps }) => {
  const textareaRef = React.useRef<null | HTMLTextAreaElement>(null)
  const [currentHeight, setCurrentHeight] = React.useState(0)
  const classes = useStyles({ disabled, isError })

  const calcTextareaHeight = React.useCallback(() => {
    const textArea = textareaRef.current

    if (!textArea) return

    textArea.style.height = `${currentHeight}px`
    textArea.style.height = `${textArea.scrollHeight}px`
  }, [currentHeight])

  const onChange = (event: ChangeEvent) => {
    calcTextareaHeight()

    if (typeof propOnChange === 'function') {
      propOnChange(event)
    }
  }

  React.useEffect(() => {
    const textArea = textareaRef.current

    if (!textArea) return

    const textAreaHeight = textArea.clientHeight
    const isContentOverflow = textAreaHeight < textArea.scrollHeight

    if (isContentOverflow) {
      calcTextareaHeight()
    }

    setCurrentHeight(textAreaHeight)
  }, [calcTextareaHeight])

  return <textarea data-is-invalid={disabled} className={classes.flexibleTextarea} ref={textareaRef} onChange={onChange} {...restProps} />
}

export default FlexibleTextarea
