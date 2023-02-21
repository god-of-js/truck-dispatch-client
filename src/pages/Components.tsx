import React, { useState } from 'react';
import UiLocationsInput from 'components/ui/UiLocationsInput';
import styled from 'styled-components';
import UiButton from '../components/ui/UiButton';
import UiForm from '../components/ui/UiForm';
import UiInput from '../components/ui/UiInput';
import UiSelect from '../components/ui/UiSelect';
import UidropdownMenu from 'components/ui/UiDropdownMenu';

function ComponentsView() {
  const [isFocused, setIsFocused] = useState<string | null>('');

  const [formData, setFormData] = useState({
    email: '',
    selectValue: 'Wahala',
    location: '',
  });

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

  function dropdownfunc1  () {
    console.log("this is function 1")
  }
  function dropdownfunc2  () {
    console.log("this is function 2")
  }
  const dropDownData = [
    {
      type:"link", 
      href: "https://www.google.com/",
      value: "value1",
      display: "Link-option"
    },
    {
      type:"route", 
      path: "/auth",
      value: "value1",
      display: "route-option"
    },
    {
      type: "function", 
      function: dropdownfunc1 ,
      value: "value2",
      display: "Function-option1"
    },
    {
      type: "function", 
      function: dropdownfunc2,
      value: "value3",
      display: "Function-option2"
    },
    {
      type:"subItem", 
      display: "socials",
      subItems: [
        {
          type:"link", 
          href: "https://www.google.com/",
          value: "value1",
          display: "Facebook"
        },
        {
          type:"link", 
          href: "https://www.google.com/",
          value: "value1",
          display: "Twitter"
        },
        {
          type:"link", 
          href: "https://www.google.com/",
          value: "value1",
          display: "Github"
        },
      ]
    },
  ]
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
      <UiForm formData={formData} onSubmit={handleSubmit}>
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
              name="location"
            />
            <UiButton> Submit </UiButton>
          </>
        )}
      </UiForm>
      <UidropdownMenu data={dropDownData} />
    </div>
  );
}

export default ComponentsView;

const W90 = styled.div`
  width: 90%;
`;
