/* eslint-disable no-nested-ternary */
import React, { useState, forwardRef, useImperativeHandle, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'

require('./assets/css/index.css')

const Img = {
  WARN: require('./assets/img/warn.png'),
  SUCCESS: require('./assets/img/smile.png'),
  ERROR: require('./assets/img/error.png'),
  INFO: require('./assets/img/info.png')
}

let timer: any

export interface SnackBarProps {
  fontSize?: number
  align?: 'top' | 'bottom' | 'center'
  rtl?: boolean
}

const Color = {
  WARN: '#f09925',
  SUCCESS: '#51ba4e',
  ERROR: '#d32f2f',
  INFO: '#fff'
}

const FontColor = {
  WARN: '#fff',
  SUCCESS: '#fff',
  ERROR: '#fff',
  INFO: '#404657'
}

export type Type = 'WARN' | 'SUCCESS' | 'ERROR' | 'INFO'

const SnackBarContainer: React.FC<SnackBarProps> = (props: SnackBarProps, ref) => {
  const { fontSize = 14, align = 'bottom', rtl = false } = props

  const [show, setShow] = useState(false)

  const [backgroundColor, setBackgroundColor] = useState(Color.ERROR)

  const [color, setColor] = useState(FontColor.ERROR)

  const [img, setImg] = useState(Img.ERROR)

  const [text, setText] = useState('')

  const alignStyle = align === 'bottom' ? { bottom: -50 } : align === 'top' ? { top: -50 } : { top: '50%', transform: 'translateY(-50%)' }

  const time = align === 'center' ? '300ms' : '500ms'

  const transformStyle = { animation: `${align}snackbaranimation ${time} ease forwards` }

  const transformStyleNoShow = { animation: `${align}snackbaranimationnoshow ${time} ease forwards` }

  useImperativeHandle(ref, () => ({
    show: (text: string, type: Type = 'ERROR') => {
      setText(text)
      setBackgroundColor(Color[type])
      setColor(FontColor[type])
      setImg(Img[type])
      showSnackBar()
    }
  }))

  const showSnackBar = () => {
    console.log('show snack bar')
    setShow(true)
    clearTimeout(timer)
    timer = setTimeout(() => {
      setShow(false)
    }, 2000)
  }

  return (
    <div
      style={{
        ...alignStyle,
        ...(show ? transformStyle : transformStyleNoShow),
        zIndex: 9999,
        padding: 10,
        display: 'flex',
        flexDirection: rtl ? 'row-reverse' : 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '92%',
        maxWidth: 400,
        position: 'absolute',
        height: 40,
        backgroundColor,
        borderRadius: 4,
        boxSizing: 'border-box',
        boxShadow: '-6px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)'
      }}
    >
      <img src={img} alt="img" style={{ width: 20, height: 20 }} />
      <div style={{ fontSize, color, marginLeft: 10, marginRight: 10 }}>{text}</div>
    </div>
  )
}

const SnackBar: any = forwardRef(SnackBarContainer as any)

export default SnackBar

export const useSnackBar = (props: SnackBarProps = { fontSize: 14, align: 'bottom', rtl: false }, force = false) => {
  const { fontSize, align, rtl }: any = props
  const ref: any = useRef(null)
  useEffect(() => {
    const style = getComputedStyle(document.body)
    console.warn(style.boxSizing)
    if (!force && style.boxSizing && style.boxSizing !== 'border-box') {
      console.warn('react-snack-bar: box-sizing is not border-box, it may produce some problems')
    }
    const div = document.createElement('div')
    div.style.width = '100%'
    div.style.height = '100%'
    div.style.position = 'absolute'
    div.style.zIndex = '10000'
    div.style.top = '0'
    div.style.pointerEvents = 'none'
    div.style.display = 'flex'
    div.style.justifyContent = 'center'
    document.body.appendChild(div)
    ReactDOM.render(<SnackBar ref={ref} align={align} fontSize={fontSize} rtl={rtl} />, div)
    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return { show: (text: string, type: Type = 'ERROR') => ref.current && ref.current.show(text, type) }
}
