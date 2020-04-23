# react-snack-bar

## installation

```javascript

npm install @sakurawood/react-snack-bar

or

yarn add @sakurawood/react-snack-bar

```

## base usage

```javascript

// example

import {useSnackBar} from '@sakurawood/react-snack-bar'


const App = () => {
  const snackBar = useSnackBar()
  snackBar.show('hello world', 'SUCCESS')
  return (
    <div>
      <div />
    </div>
  );
};


```

## api

### methods

```
show : (text:string, type:'SUCCESS'|'WARN'|'INFO'|'ERROR'='ERROR')=> ...

```