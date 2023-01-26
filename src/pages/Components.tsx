import React, { useState } from 'react';
import UiButton from '../components/ui/UiButton';
import UiForm from '../components/ui/UiForm';
import UiInput from '../components/ui/UiInput';

function ComponentsView() {
  const [isFocused, setIsFocused] = useState('');
  const [formData, setFormData] = useState({
    email: '',
  });
  const formRules = {
    email: ['required', 'email']
  };

  function handleSubmit() {}

  function handleFormChange(event: { target: { name: string; value: string } }) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <div className="App">
      <UiButton onClick={() => alert('henry is a god')}>Submit</UiButton>
      {isFocused}
      <UiInput
        label={'First Name'}
        name="test"
        value={isFocused}
        onChange={(e) => setIsFocused(e.target.value)}
      />
      <UiForm rules={formRules} formData={formData} onSubmit={handleSubmit}>
        {({}) => (
          <>
            <UiInput
              label={'First Name'}
              value={formData.email}
              onChange={handleFormChange}
            />
          </>
        )}
      </UiForm>
    </div>
  );
}

export default ComponentsView;
