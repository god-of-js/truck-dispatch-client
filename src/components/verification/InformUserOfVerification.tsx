import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import UiButton from 'ui/UiButton';
import UiModal from 'ui/UiModal';

interface Props {
  onClose: () => void;
}
export default function InformUserOfVerification({ onClose }: Props) {
  return (
    <UiModal onClose={onClose}>
      <Header>Verification is required for this action</Header>
      <TextContent>
        For security purposes, verification is required before you can gain
        access to the full suite of features we have in store.
      </TextContent>
      <TextContent>
        Kindly navigate to the{' '}
        <Link to="/profile/verification">Verification Page</Link> or click the
        button below to verify your profile and our team would get back to you
        shortly.
      </TextContent>
      <Link to="/profile/verification">
        <UiButton>Verify Profile</UiButton>
      </Link>
    </UiModal>
  );
}

const Header = styled.h1`
  font-size: ${pxToRem(20)};
`;

const TextContent = styled.p`
  padding: 12px;
`;
