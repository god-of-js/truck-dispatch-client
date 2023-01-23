import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  type?: 'transporter' | 'agent';
}

export default function AuthLayout({ children, type = 'transporter' }: Props) {
  return (
    <Layout>
      <ImageContainer />
      <FormContainer>{children}</FormContainer>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  gap: 12px;
`;

const ImageContainer = styled.div`
  display: none;
  height: 100vh;
  width: 60%;
  background: red;
`;

const FormContainer = styled.div`
  height: 100vh;
  width: 100%;
  padding: 24px;

  @media only screen and (min-width: calc(var(--mobile) + 3px)) {
    width: var(--mobile);
    background: red;
  }
`;
