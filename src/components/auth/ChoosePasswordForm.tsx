import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { StyledAuthScreen } from "./PersonalDetailsForm";
import { Margin } from "./PersonalDetailsForm";

import UiIcon from "ui/UiIcon";
import UiInput from "ui/UiInput";
import UiButton from "ui/UiButton";
import UiForm from "ui/UiForm";

export default function ChoosePasswordForm () {
  const [formData, setFormData] = useState({
    OTP: ''
  });
  function handleChange () {

  }
  function onSubmit () {

  }
  return (
    <StyledAuthScreen>
      <div className="header-container">
        <UiIcon icon="PasswordCheck" />
        <h1>Choose Password</h1>
        <p>
        Choose a strong password with at least 8 characters or more
        </p>
      </div>
      <div className="form-container">
        <UiForm  formData={formData} onSubmit={onSubmit}>
          {({ errors }) => (
            <>
            <UiInput
              label="Password*" 
              placeholder="Enter your password"
              type="password"
              value={formData.OTP}
              name="firstname"
              onChange={handleChange}
            />
            <Margin />
            <UiInput
              label="Confirm Password*" 
              placeholder="Confirm password"
              type="password"
              value={formData.OTP}
              name="firstname"
              onChange={handleChange}
            />
            
              <UiButton   size="large" variant="primary" isFullWidth>
                Continue
              </UiButton>
            </>
          )}
        </UiForm>
      </div>
    </StyledAuthScreen>
  );
}