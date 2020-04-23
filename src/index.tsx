import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from 'react'
import ReactDOM from 'react-dom'
require('./assets/css/index.css')

const Img = {
  WARN: require('./assets/img/warn.png'),
  SUCCESS: require('./assets/img/smile.png'),
  ERROR: require('./assets/img/error.png'),
  INFO: require('./assets/img/info.png'),
}

let timer: any
let animTimer: any

export interface SnackBarProps {
  fontSize?: number
  align?: 'top' | 'bottom' | 'center'
}

const Color = {
  WARN: '#f09925',
  SUCCESS: '#51ba4e',
  ERROR: '#d32f2f',
  INFO: '#fff',
}

const FontColor = {
  WARN: '#fff',
  SUCCESS: '#fff',
  ERROR: '#fff',
  INFO: '#404657',
}

export type Type = 'WARN' | 'SUCCESS' | 'ERROR' | 'INFO'

const SnackBarContainer: React.FC<SnackBarProps> = (
  props: SnackBarProps,
  ref,
) => {
  const { fontSize = 14, align = 'bottom' } = props

  const [show, setShow] = useState(false)

  const [hide, setHide] = useState(true)

  const [backgroundColor, setBackgroundColor] = useState(Color.ERROR)

  const [color, setColor] = useState(FontColor.ERROR)

  const [img, setImg] = useState(Img.ERROR)

  const [text, setText] = useState('')

  const alignStyle =
    align === 'bottom'
      ? { bottom: -40 }
      : align === 'top'
        ? { top: -40 }
        : { top: '50%', transform: 'translateY(-50%)' }

  const time = align === 'center' ? '300ms' : '500ms'

  const transformStyle = {
    animation: `${align}snackbaranimation ${time} ease forwards`,
  }

  const transformStyleNoShow = {
    animation: `${align}snackbaranimationnoshow ${time} ease forwards`,
  }

  useImperativeHandle(ref, () => ({
    show: (text: string, type: Type = 'ERROR') => {
      setText(text)
      setBackgroundColor(Color[type])
      setColor(FontColor[type])
      setImg(Img[type])
      showSnackBar()
    },
  }))

  const showSnackBar = () => {
    setHide(false)
    setShow(true)
    clearTimeout(timer)
    timer = setTimeout(() => {
      setShow(false)
      clearTimeout(animTimer)
      animTimer = setTimeout(() => {
        setHide(true)
      }, 500)
    }, 2000)
  }

  return hide ? null : (
    <div
      style={{
        ...alignStyle,
        ...(show ? transformStyle : transformStyleNoShow),
        zIndex: 9999,
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '92%',
        left: '4%',
        position: 'fixed',
        height: 40,
        backgroundColor,
        borderRadius: 4,
        boxSizing: 'border-box',
        boxShadow:
          '-6px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
      }}
    >
      <div style={{ fontSize, color }}>{text}</div>
      <img
        src={img}
        alt="img"
        style={{ width: 20, height: 20, marginLeft: 16 }}
      ></img>
    </div>
  )
}

const SnackBar: any = forwardRef(SnackBarContainer as any)

export default SnackBar

export const useSnackBar = (props: SnackBarProps = { fontSize: 14, align: 'bottom' }, force = false) => {
  const { fontSize, align }: any = props
  const ref: any = useRef(null)
  useEffect(() => {
    const style = getComputedStyle(document.body)
    console.warn(style.boxSizing)
    if (!force && style.boxSizing && style.boxSizing !== 'border-box') {
      console.warn('react-snack-bar: box-sizing is not border-box, it may produce some problems')
    }
    const div = document.createElement('div')
    document.body.appendChild(div)
    ReactDOM.render(<SnackBar ref={ref} align={align} fontSize={fontSize} ></SnackBar>, div)
    return () => { }
  }, [])
  return {
    show: (text: string, type: Type = "ERROR") => ref.current && ref.current.show(text, type),
  }
}
