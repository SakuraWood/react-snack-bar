declare interface SnackBarProps {
  fontSize?: number;
  align?: 'top' | 'bottom' | 'center';
}

declare type Type = 'WARN' | 'SUCCESS' | 'ERROR' | 'INFO';

declare function useSnackBar(force: boolean): void;
