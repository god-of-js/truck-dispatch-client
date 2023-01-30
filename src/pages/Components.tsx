import React, { useState } from 'react';
import UiButton from '../components/ui/UiButton';
import UiForm, { RuleType } from '../components/ui/UiForm';
import UiInput from '../components/ui/UiInput';
import { UiSelect } from '../components/ui/UiSelect';

function ComponentsView() {
  const [isFocused, setIsFocused] = useState('');
  const [formData, setFormData] = useState({
    email: '',
  });

  const formRules: Record<string, RuleType[]> = {
    email: ['required', 'email'],
  };

  function handleSubmit() {
    console.log(formData);
  }

  function handleFormChange(event: {
    target: { name: string; value: string };
  }) {
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
        {({ errors }) => (
          <>
            <UiInput
              label={'First Name'}
              value={formData.email}
              name="email"
              error={errors.email}
              onChange={handleFormChange}
            />
            <UiSelect options={[]} value=""/>
            <UiButton> Submit </UiButton>
          </>
        )}
      </UiForm>
    </div>
  );
}

export default ComponentsView;
