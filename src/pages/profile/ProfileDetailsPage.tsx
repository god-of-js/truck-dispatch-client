import { RootState } from 'modules/index';
import React, { lazy, useMemo, useState } from 'react';
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
import UiDataField from 'ui/UiDataField';

const UiCard = lazy(() => import('ui/UiCard'));
const UiButton = lazy(() => import('ui/UiButton'));
const UiForm = lazy(() => import('ui/UiForm'));
const UiAvatar = lazy(() => import('ui/UiAvatar'));

export default function ProfileDetailsPage() {
  const user = useSelector((state: RootState) => state.account.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(user || ({} as User));

  const [loading, setLoading] = useState(false);

  const valuesHasBeenEdited = useMemo(() => {
    if (!user) return false;

    return user.avatar !== formData.avatar;
  }, [user, formData]);

  async function editProfile() {
    try {
      setLoading(true);
      const editedData = removeUneditedFields<User>(user!, formData);
      const data = deepRootedToFormData(editedData);
      dispatch(toAnyAction(updateUser(data)))
        .then((response: User) => {
          setFormData(response);
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
  return (
    <>
      <CardContainer>
        <UiForm formData={formData} onSubmit={editProfile}>
          {() => (
            <>
              <div className="details-page">
                <div className="details-page-head">
                  <div className="avatar-container">
                    <UiAvatar
                      size="xl"
                      isEdit
                      name="avatar"
                      avatar={formData.avatar}
                      onChange={onChange}
                    />
                  </div>

                  <div className="user-name">
                    <span>{user?.firstName}</span>
                    <span>{user?.lastName}</span>
                  </div>
                </div>

                <div className="user-details">
                  <UiDataField
                    title="Phone"
                    value={`${user?.phone}`}
                    variant="field"
                  />

                  <UiDataField
                    title="Email"
                    value={`${user?.email}`}
                    variant="field"
                  />
                </div>

                <GridSpacer>
                  <UiDataField
                    title="Trips Completed"
                    value={`${user?.completedTrips}`}
                    variant="field"
                    isCentered
                    size="s"
                  />
                  <UiDataField
                    title="Avg Rating"
                    value={`${user?.rating}`}
                    variant="field"
                    isCentered
                    size="s"
                  />
                  <UiDataField
                    title="No Of Reviews"
                    // to be changed to user.reviews
                    value={`${user?.rating}`}
                    variant="field"
                    isCentered
                    size="s"
                  />
                </GridSpacer>

                <div className="button-container">
                  <UiButton
                    size="large"
                    disabled={!valuesHasBeenEdited}
                    loading={loading}
                  >
                    Save Changes
                  </UiButton>
                </div>
              </div>
            </>
          )}
        </UiForm>
      </CardContainer>
    </>
  );
}

const CardContainer = styled.div`
  width: 100%;
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${pxToRem(24)} 0;
  }
  h2 {
    font-size: ${pxToRem(20)};
    padding: 0;
    margin: 0;
  }

  .details-page {
    gap: ${pxToRem(24)};
    display: flex;
    flex-direction: column;

    .details-page-head {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: ${pxToRem(24)};

      .avatar-container {
        display: flex;
        justify-content: center;
      }

      .user-name {
        gap: ${pxToRem(4)};
        display: flex;
        flex-direction: row;
        color: var(--neutral-black);
        font-size: 24px;
        font-style: normal;
        font-weight: 600;
        line-height: 140%;
        letter-spacing: -0.48px;
      }
    }

    .user-details {
      display: flex;
      flex-direction: column;
      gap: ${pxToRem(8)};
    }
  }

  .button-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: ${pxToRem(24)};
    margin-top: ${pxToRem(40)};
    button {
      margin: auto;
      width: 50%;
    }
  }
`;

const GridSpacer = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto auto auto;
  gap: ${pxToRem(12)};
  margin: ${pxToRem(20)} 0;

  @media only screen and (min-width: ${sizes.mobileSmall}) {
    grid-template-columns: auto auto auto;
    grid-template-rows: auto auto auto;
  }
`;
