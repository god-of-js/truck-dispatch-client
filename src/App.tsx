import React, { useState } from 'react';

import UiButton from './components/ui/UiButton';
import UiInput from './components/ui/UiInput';
import UiTable from './components/ui/UiTable';

function App() {
  const [isFocused, setIsFocused] = useState('');
  const headers = [
    {
      title: 'Lorem',
      query: 'lorem',
      isSlot: true
    },
    {
      title: 'Ipsum',
      query: 'ipsum',
    },
    {
      title: 'Dolor',
      query: 'dolor',
    },
  ];
  const tableData = [
    {
      lorem: 'Lorem',
      ipsum: 'ipsum',
      dolor: 'amet',
      wahala: 'wahala'
    },
    {
      lorem: 'Lorem',
      ipsum: 'ipsum',
      dolor: 'amet',
      wahala: 'wahala'
    },
    {
      lorem: 'Lorem',
      ipsum: 'ipsum',
      dolor: 'amet',
      wahala: 'wahala'
    },
    {
      lorem: 'Lorem',
      ipsum: 'ipsum',
      dolor: 'amet',
      wahala: 'wahala'
    },
    {
      lorem: 'Lorem',
      ipsum: 'ipsum',
      dolor: 'amet',
      wahala: 'wahala'
    },
  ];
  return (
    <div className="App">
      <UiButton onClick={() => alert('henry is a god')}>Submit</UiButton>
      {isFocused}
      <UiInput
        label={'First Name'}
        value={isFocused}
        onChange={(e) => setIsFocused(e.target.value)}
      />
      <UiTable data={tableData} options={[]} headers={headers} />
    </div>
  );
}

export default App;
