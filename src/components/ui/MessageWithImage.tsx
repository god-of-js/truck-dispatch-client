import React from 'react';
import styled from 'styled-components';
import filesSent from '../../assets/img/files-sent.svg';

interface Props {
  img?: {};
  title?: string;
  subtitle?: string;
}
export default function MessageWithImage({
  img = filesSent,
  title = 'User has been verified',
  subtitle = `Your profile has been verified. Now, you are eligible to partake in
rides, bonuses, and all features available to transporters.`,
}) {
  return (
    <MessageContainer>
      <img src={img} alt={title} />
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </MessageContainer>
  );
}

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: ${pxToRem(380)};
    margin: auto;
  }

  h2 {
    text-align: center;
    font-size: ${pxToRem(20)};
    font-family: 'Audiowide';
    margin-bottom: 0;
  }

  p {
    text-align: center;
  }
`;
