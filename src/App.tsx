import React from 'react';

import UiButton from './components/ui/UiButton';

function App() {
  return (
    <div className="App">
      <UiButton onClick={() => alert('henry is a god')}>Submit</UiButton>
    </div>
  );
}

export default App;
