import React, { useState } from 'react';

import UiButton from '../components/ui/UiButton';
import UiInput from '../components/ui/UiInput';

function ComponentsView() {
  const [isFocused, setIsFocused] = useState('');

  return (
    <div className="App">
      <UiButton onClick={() => alert('henry is a god')}>Submit</UiButton>
      {isFocused}
      <UiInput
        label={'First Name'}
        value={isFocused}
        onChange={(e) => setIsFocused(e.target.value)}
      />
    </div>
  );
}

export default ComponentsView;
