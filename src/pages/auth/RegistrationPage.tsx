import React from 'react';
import styled from 'styled-components';
import UiInput from '../../components/ui/UiInput';

interface Props {
  userType?: 'transporter' | 'client';
}
const RegistrationPage: React.FC<Props> = ({ userType }) => {
  return (
    <form>
      <UiInput label="lorem" value="" onChange={() => {}} />
    </form>
  );
};

export default RegistrationPage;
