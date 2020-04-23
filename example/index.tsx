import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css'

import { useSnackBar } from '../.';

const App = () => {
  const snackBar = useSnackBar(undefined, true)
  setTimeout(() => {
    snackBar.show('text', 'SUCCESS')
  }, 3000);
  return (
    <div>
      <div />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
