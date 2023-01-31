import UiLocationsInput from 'components/ui/UiLocationsInput';
import React, { useState } from 'react';
import styled from 'styled-components';
import UiButton from '../components/ui/UiButton';
import UiForm, { RuleType } from '../components/ui/UiForm';
import UiInput from '../components/ui/UiInput';
import UiSelect from '../components/ui/UiSelect';

function ComponentsView() {
  const [isFocused, setIsFocused] = useState<string | null>('');

  const [formData, setFormData] = useState({
    email: '',
    selectValue: 'Wahala',
    location: '',
  });

  const formRules: Record<keyof typeof formData, RuleType[]> = {
    email: ['required', 'email'],
    selectValue: ['required'],
    location: ['required'],
  };

  const selectOptions = [
    {
      value: 'Lorem',
      label: 'lorem',
    },
    {
      value: 'Ipsum',
      label: 'ipsum',
    },
    {
      value: 'Wahala',
      label: 'wahala',
    },
    {
      value: 'Dolor',
      label: 'dolor',
    },
  ];

  function handleSubmit() {
    console.log(formData);
  }

  function handleFormChange(event: { name: string; value: string | null }) {
    setFormData({
      ...formData,
      [event.name]: event.value,
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
        onChange={(e) => setIsFocused(e.value)}
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
            <br />
            <W90>
              <UiSelect
                label="Label"
                options={selectOptions}
                name="selectValue"
                value={formData.selectValue}
                onChange={handleFormChange}
              />
            </W90>
            <br />
            <UiLocationsInput
              onChange={handleFormChange}
              label="Location"
              value={formData.location}
              name="location"
            />
            <UiButton> Submit </UiButton>
          </>
        )}
      </UiForm>
    </div>
  );
}

export default ComponentsView;

const W90 = styled.div`
  width: 90%;
`;
