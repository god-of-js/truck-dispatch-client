import { RootState } from 'modules/index';
import React, { lazy, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { updateUser } from 'modules/Account';
import User from 'types/User';
import {
  deepRootedToFormData,
  removeUneditedFields,
  toAnyAction,
} from 'utils/helpers';
import sizes from 'utils/sizes';
import EditProfileSchema from 'utils/validations/EditProfileSchema';

const UiCard = lazy(() => import('ui/UiCard'));
const UiButton = lazy(() => import('ui/UiButton'));
const UiForm = lazy(() => import('ui/UiForm'));
const UiInput = lazy(() => import('ui/UiInput'));
const UiAvatar = lazy(() => import('ui/UiAvatar'));

export default function ProfileDetailsPage() {
  const user = useSelector((state: RootState) => state.account.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(user || ({} as User));
  const [isEditable, setIsEditable] = useState(false);
  const [loading, setLoading] = useState(false);

  async function editProfile() {
    try {
      setLoading(true);
      const editedData = removeUneditedFields<User>(user!, formData);
      const data = deepRootedToFormData(editedData);
      dispatch(toAnyAction(updateUser(data)))
        .then(() => {
          setIsEditable(false);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch {
      setLoading(false);
    }
  }

  function onChange(event: {
    name: string;
    value: string | File | File[] | null;
  }) {
    setFormData({
      ...formData,
      [event.name]: event.value,
    });
  }

  function cancelEdit() {
    setIsEditable(false);
    if (user) setFormData(user);
  }

  return (
    <CardContainer>
      <UiCard>
        <header>
          <h2>{isEditable && 'Edit'} Profile Details</h2>
          {!isEditable && (
            <div className="edit-btn">
              <UiButton
                size="s"
                variant="neutral"
                onClick={() => setIsEditable(true)}
              >
                Edit Profile
                {/* <UiIcon icon="PencilSimple" size="20" /> */}
              </UiButton>
            </div>
          )}
        </header>

        <UiForm
          formData={formData}
          schema={EditProfileSchema}
          onSubmit={editProfile}
        >
          {({ errors }) => (
            <>
              <div className="avatar-container">
                <UiAvatar
                  size="lg"
                  isEdit={isEditable}
                  name="avatar"
                  avatar={formData.avatar}
                  onChange={onChange}
                />
              </div>
              <GridSpacer>
                <UiInput
                  label="First Name"
                  value={formData.firstName}
                  name="firstName"
                  disabled={!isEditable}
                  error={errors.firstName}
                  onChange={onChange}
                />
                <UiInput
                  label="Last Name"
                  value={formData.lastName}
                  name="lastName"
                  error={errors.lastName}
                  disabled={!isEditable}
                  onChange={onChange}
                />
                <UiInput
                  label="Email"
                  value={formData.email}
                  name="email"
                  error={errors.email}
                  disabled
                  onChange={onChange}
                />
                <UiInput
                  label="Phone Number"
                  value={formData.phone}
                  name="phone"
                  error={errors.phone}
                  disabled
                  onChange={onChange}
                />
              </GridSpacer>
              {isEditable && (
                <div className="button-container">
                  <UiButton loading={loading}>Update Profile</UiButton>
                  <UiButton
                    variant="secondary"
                    type="button"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </UiButton>
                </div>
              )}
            </>
          )}
        </UiForm>
      </UiCard>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  width: 90%;
  margin: auto;
  color: var(--color-gray-600);

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px 0;
  }
  h2 {
    font-size: 20px;
    padding: 0;
    margin: 0;
  }
  .avatar-container {
    display: flex;
    justify-content: center;
  }
  .button-container {
    display: flex;
    gap: 8px;
  }
  .edit-btn {
    button {
      display: flex;
      gap: 8px;
    }
  }

  @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
    width: 80%;
  }
  @media only screen and (min-width: ${sizes.laptopSmallWidth}) {
    width: 45%;
  }
`;

const GridSpacer = styled.div`
  display: grid;
  grid-template-columns: auto;
  gap: 12px;
  margin: 20px 0;

  @media only screen and (min-width: ${sizes.laptopSmallWidth}) {
    grid-template-columns: auto auto;
  }
`;
