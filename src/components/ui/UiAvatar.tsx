import React from 'react';
import styled from 'styled-components';
import Asset from 'types/Asset';
import UiIcon from './UiIcon';

interface Props {
  avatar?: Asset;
}
export default function UiAvatar({ avatar }: Props) {
  return (
    <Avatar>
      <div className="user-icon">
        <UiIcon icon="User" size="20" />
      </div>
    </Avatar>
  );
}

const Avatar = styled.div`
  .user-icon {
    color: var(--color-gray-400);
    border: ${pxToRem(1)} solid var(--color-gray-200);
    border-radius: 50%;
    width: ${pxToRem(36)};
    height: ${pxToRem(36)};
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
