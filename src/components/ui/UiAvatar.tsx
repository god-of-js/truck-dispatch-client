import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import FileUploadWidget from './FileUploadWidget';
import UiButton from './UiButton';
import UiIcon from './UiIcon';

type Size = 'sm' | 'lg';

interface Props {
  avatar?: string | File;
  size?: Size;
  isEdit?: boolean;
  name?: string;
  isHalfCurved?: boolean;
  onChange?: (event: { name: string; value: File | File[] }) => void;
}

export default function UiAvatar({
  avatar,
  size = 'sm',
  isEdit,
  name,
  isHalfCurved,
  onChange = () => {},
}: Props) {
  const [avatarDataUrl, setAvatarDataUrl] = useState<string | undefined>();

  const formattedAvatar = useMemo(() => {
    if (avatar instanceof File) {
      return avatarDataUrl;
    }
    return avatar as string;
  }, [avatar, avatarDataUrl]);

  const handleAvatarChange = (event: {
    name: string;
    value: File | File[];
  }) => {
    const reader = new FileReader();
    reader.readAsDataURL(event.value as File);
    reader.onload = () => {
      setAvatarDataUrl(reader.result as string);
      onChange({ name: event.name!, value: event.value });
    };
  };

  return (
    <AvatarContainer>
      <Avatar size={size} isHalfCurved={isHalfCurved}>
        {avatar ? (
          <img src={formattedAvatar} alt="" />
        ) : (
          <div className="user-icon">
            <UiIcon icon="User" size="24" />
          </div>
        )}
      </Avatar>
      {isEdit && (
        <FileUploadWidget
          name={name!}
          value={avatar!}
          onChange={handleAvatarChange}
        >
          <UiButton size="s" variant="secondary" type="button">
            <span>Edit Avatar</span>
          </UiButton>
        </FileUploadWidget>
      )}
    </AvatarContainer>
  );
}

function getSizeVariant(size: Size) {
  if (size === 'lg')
    return `
  width: ${pxToRem(52)};
  height: ${pxToRem(52)};
  `;
  return `
  width: ${pxToRem(40)};
  height: ${pxToRem(40)};
  `;
}

const AvatarContainer = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  flex-direction: column;

  button {
    margin-top: ${pxToRem(12)};
  }
`;

interface AvatarProps {
  size: Size;
  isHalfCurved?: boolean;
}
const Avatar = styled.div`
  ${({ size }: AvatarProps) => getSizeVariant(size)}
  display: flex;
  align-items: flex-start;

  .user-icon {
    width: 100%;
    height: 100%;
    border: ${pxToRem(1)} solid var(--color-gray-50);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: ${pxToRem(18)};
      height: ${pxToRem(18)};
      fill: var(--color-gray-70);
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: ${({ isHalfCurved }: AvatarProps) =>
      isHalfCurved ? pxToRem(8) : '50%'};
  }
`;
