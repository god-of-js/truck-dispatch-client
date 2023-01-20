import React, { useState } from 'react';

import { UiButton } from './components/ui/UiButton';
import { UiInput } from './components/ui/UiInput';
import { UiTable } from './components/ui/UiTable';

function App() {
  const [isFocused, setIsFocused] = useState('');
  const headers = [
    {
      title: 'Lorem',
      query: 'lorem',
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
      wahala: 'wahala',
    },
    {
      lorem: 'Lorem',
      ipsum: 'ipsum',
      dolor: 'amet',
      wahala: 'wahala',
    },
    {
      lorem: 'Lorem',
      ipsum: 'ipsum',
      dolor: 'amet',
      wahala: 'wahala',
    },
    {
      lorem: 'Lorem',
      ipsum: 'ipsum',
      dolor: 'amet',
      wahala: 'wahala',
    },
    {
      lorem: 'Lorem',
      ipsum: 'ipsum',
      dolor: 'amet',
      wahala: 'wahala',
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
      <UiTable
        data={tableData.map((item) => ({
          lorem: (<a href={`https://${item.lorem}`}>{item.lorem}/////</a>),
          ipsum: item.ipsum,
          dolor: item.dolor,
          wahala: item.wahala
        }))}
        options={[]}
        headers={headers}
      />
    </div>
  );
}

export default App;
