import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import Asset from 'types/Asset';
import FileUploadWidget from './FileUploadWidget';
import UiButton from './UiButton';
import UiIcon from './UiIcon';

type Size = 'sm' | 'lg';

interface Props {
  avatar?: Asset | File;
  size?: Size;
  isEdit?: boolean;
  name?: string;
  onChange?: (event: { name: string; value: File | File[] }) => void;
}

export default function UiAvatar({
  avatar,
  size = 'sm',
  isEdit,
  name,
  onChange = () => {},
}: Props) {
  const [avatarDataUrl, setAvatarDataUrl] = useState<string | undefined>();

  const formattedAvatar = useMemo(() => {
    if (avatar instanceof File) {
      return avatarDataUrl;
    }
    return avatar?.url as string;
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
      <Avatar size={size}>
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
  width: ${pxToRem(36)};
  height: ${pxToRem(36)};
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

const Avatar = styled.div`
  ${({ size }: { size: Size }) => getSizeVariant(size)}
  display: flex;
  align-items: flex-start;

  .user-icon {
    width: 100%;
    height: 100%;
    color: var(--color-gray-400);
    border: ${pxToRem(1)} solid var(--color-gray-200);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;
