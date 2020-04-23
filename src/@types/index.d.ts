declare interface SnackBarProps {
  fontSize?: number
  align?: 'top' | 'bottom' | 'center'
}

declare const Color = {
  WARN: '#f09925',
  SUCCESS: '#51ba4e',
  ERROR: '#d32f2f',
  INFO: '#fff',
}

declare const FontColor = {
  WARN: '#fff',
  SUCCESS: '#fff',
  ERROR: '#fff',
  INFO: '#404657',
}

declare type Type = 'WARN' | 'SUCCESS' | 'ERROR' | 'INFO'

declare function useSnackBar(force: boolean): void
