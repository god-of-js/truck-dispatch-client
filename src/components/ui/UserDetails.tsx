import styled from 'styled-components';
import UiAvatar from './UiAvatar';
import UiButton from './UiButton';
import UiIcon from './UiIcon';

interface Props {
  userId?: string;
  avatar?: string;
  userName: string;
  phoneOrEmail?: string;
  showPhone?: boolean;
  showViewProfile?: boolean;
  showMessage?: boolean;
  avatarIsHalfCurved?: boolean;
}
export default function UserDetails({
  avatar,
  userName,
  phoneOrEmail,
  avatarIsHalfCurved,
  showMessage,
  showViewProfile,
}: Props) {
  return (
    <UserDetailsStyling>
      <div className="user-profile">
        <UiAvatar avatar={avatar} isHalfCurved={avatarIsHalfCurved} />
        <div>
          <div className="user-details-name">{userName}</div>
          <div className="user-details-phone-or-email">
            {phoneOrEmail || '**********'}
          </div>
        </div>
      </div>
      <div className="user-details-actions">
        {showViewProfile && (
          <UiButton variant="secondary" size="md">
            View Profile
          </UiButton>
        )}
        {showMessage && (
          <UiButton size="md">
            <UiIcon icon="DoubleChat" />
          </UiButton>
        )}
      </div>
    </UserDetailsStyling>
  );
}

const UserDetailsStyling = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .user-profile {
    display: flex;
    gap: ${pxToRem(8)};
    align-items: center;
  }

  .user-details-name {
    font-style: normal;
    font-weight: 600;
    font-size: ${pxToRem(16)};
    line-height: 140%;
    letter-spacing: -0.02em;
    color: var(--color-neutralBlack);
  }

  .user-details-phone-or-email {
    font-style: normal;
    font-weight: 400;
    font-size: ${pxToRem(14)};
    line-height: 140%;
    letter-spacing: -0.02em;
    color: var(--color-gray-80);
  }

  .user-details-actions {
    display: flex;
    align-items: center;
    gap: ${pxToRem(8)};
  }
`;
