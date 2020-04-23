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

### props

```
const props = {
  fontSize: 14 ,   // font size of text , default is 14
  align: 'bottom'  // position of snack bar in the screen , optional value: ['top','bottom','center'], default is 'bottom'
}

useSnackBar(props)

```

### methods

```
show : (text:string, type:'SUCCESS'|'WARN'|'INFO'|'ERROR'='ERROR')=> ...

```

