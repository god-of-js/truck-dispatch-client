import { useParams } from "react-router-dom";
import React, { useState } from 'react';
import styled from "styled-components";
import { StyledAuthScreen } from "./PersonalDetailsForm";
import { Margin } from "./PersonalDetailsForm";

import UiIcon from "ui/UiIcon";
import UiInput from "ui/UiInput";
import UiButton from "ui/UiButton";
import UiSelect from "ui/UiSelect";
import { Option } from "ui/UiSelect";
import UiForm from "ui/UiForm";

export default function VerifyPhone () {
  const [formData, setFormData] = useState({
    firstname:'',
    lastname: '',
    phone: '',
    company_role: ''
  })
  const handleChange = () => {

  }
  const onSubmit = () => {

  }

  return (
    <StyledAuthScreen>
      <div className="header-container">
        <UiIcon icon="CallReceived" />
        <h1>Verify Phone Number</h1>
        <p>
          Enter the OTP (One Time Pin) that was sent tothe phone number you provided
        </p>
      </div>
      <div className="form-container">
        <UiForm  formData={formData} onSubmit={onSubmit}>
          {({ errors }) => (
            <>
            <UiInput
              label="Enter OTP"
              type="text"
              value={formData.firstname}
              name="firstname"
              onChange={handleChange}
            />
            <Margin />
            <StyledResendCode >
              <p>Didn’t get the code?</p>
              <UiButton  size="s" variant="secondary" disabled>
                Resend in 00:58
              </UiButton>
            </StyledResendCode>
              <UiButton  size="large" variant="primary" isFullWidth >
                Continue
              </UiButton>
            </>
          )}
        </UiForm>
      </div>
    </StyledAuthScreen>
  )
}

const StyledResendCode = styled.div`
  display: flex;
  justify-content: center;
  gap: ${pxToRem(9)};
  align-items: center;
  p{
    font-weight: 400;
      color: var(--color-gray-80);
      font-family:'thiccboi-regular';
      font-size: ${pxToRem(16)};
      line-height: ${pxToRem(24)};
  }
  button {
    margin: 0 !important;
  }
`