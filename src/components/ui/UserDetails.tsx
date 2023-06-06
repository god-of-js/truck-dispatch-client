import styled from 'styled-components';
import UiAvatar from './UiAvatar';
import UiButton from './UiButton';
import UiIcon from './UiIcon';

type Sizes = 'large' | 'sm' | 'md'
interface Props {
  userId?: string;
  avatar?: string;
  userName: string;
  size?: Sizes;
  profileSubtitle?: string;
  showPhone?: boolean;
  showViewProfile?: boolean;
  showMessage?: boolean;
  avatarIsHalfCurved?: boolean;
}
export default function UserDetails({
  avatar,
  userName,
  profileSubtitle,
  avatarIsHalfCurved,
  size = 'large',
  showMessage,
  showViewProfile,
}: Props) {
  return (
    <UserDetailsStyling size={size}>
      <div className="user-profile">
        <UiAvatar avatar={avatar} isHalfCurved={avatarIsHalfCurved} />
        <div>
          <div className="user-details-name">{userName}</div>
          <div className="profile-subtitle">
            {profileSubtitle || '**********'}
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

const UserDetailsStyling = styled.div<{ size: Sizes}>`
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
    font-size: ${({ size }) => size === 'sm' ? pxToRem(14) : pxToRem(16)};
    line-height: 140%;
    letter-spacing: -0.02em;
    color: var(--color-neutralBlack);
    text-transform: capitalize;
  }

  .profile-subtitle {
    font-style: normal;
    font-weight: 400;
    font-size: ${({ size }) => size === 'sm' ? pxToRem(10) : pxToRem(14)};
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
