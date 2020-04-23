import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { useSnackBar } from '../.';

const App = () => {
  const snackBar = useSnackBar()
  snackBar.show('text', 'SUCCESS')
  return (
    <div>
      <div />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
