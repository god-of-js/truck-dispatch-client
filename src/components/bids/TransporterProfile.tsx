import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import UiAvatar from 'ui/UiAvatar';
import UiButton from 'ui/UiButton';
import UiDataField from 'ui/UiDataField';
import UiField from 'ui/UiField';
import Bid from 'types/Bid';
import UiIcon from 'ui/UiIcon';
import VehicleComponent from 'components/vehicles/VehicleItem';

interface Props {
  job: Bid;
  jobId: string;
  negotiate: (jobid: string) => void;
}

export default function TransporterProfile({ jobId, job, negotiate }: Props) {
  return (
    <>
      <TransporterProfileStyle>
        <header>
          <div className="user-profile">
            <UiAvatar size="lg" avatar={job.transporter?.avatar} isHalfCurved />
            <div>
              <div className="user-name">{`${job.transporter?.lastName} ${job.transporter?.firstName}`}</div>
              <div className="field-name">{job.transporter?.userType}</div>
            </div>
          </div>
          <div className="button-container">
            <UiButton
              onClick={() => negotiate(jobId)}
              isFullWidth
              variant="primary-secondary"
            >
              <UiIcon icon="DoubleChat" />
              Message
            </UiButton>
            <UiButton>Add to Contacts</UiButton>
          </div>
        </header>
        <div className="container">
          <div className="data-field">
            <UiDataField
              title="Trips Completed"
              isCentered
              isBordered
              value={`${job.transporter?.completedTrips}`}
            />
            <UiDataField
              title="avg rating"
              isCentered
              isBordered
              value={`${job.transporter?.rating}`}
            />
            <UiDataField title="no of reviews" isCentered isBordered />
            <UiDataField
              title="no of trucks"
              isCentered
              isBordered
              value={`${job.transporter?.noOfVehicles}`}
            />
          </div>
          <div className="vehicle-field">
            <h3>TRUCKS</h3>
            <VehicleComponent
              hidden
              vehicle={job.vehicle}
              key={job.vehicle._id}
            />
          </div>
        </div>
      </TransporterProfileStyle>
    </>
  );
}

const TransporterProfileStyle = styled.div`
  border-radius: ${pxToRem(16)};
  overflow: hidden;
  background: #ffffff;

  header {
    background: var(--color-primary-10);
    padding: ${pxToRem(20)};
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${pxToRem(20)};

    .user-profile {
      display: flex;
      align-items: center;
      gap: ${pxToRem(16)};

      .user-name {
        color: var(--neutralBlack, #15131b);
        font-size: 24px;
        font-style: normal;
        font-weight: 600;
        letter-spacing: ${pxToRem(-0.48)};
      }
      .field-name {
        text-transform: uppercase;
        color: var(--neutral-shades-grey-70, #848288);
        font-size: ${pxToRem(12)};
        font-style: normal;
        font-weight: 400;
        line-height: 140%;
        letter-spacing: ${pxToRem(0.6)};
      }
    }
  }

  .container {
    padding: 0 ${pxToRem(32)};

    .data-field {
      border-bottom: 1px solid var(--color-gray-50);
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: ${pxToRem(12)};
      padding-bottom: 32px;
    }

    .vehicle-field {
      padding-top: 32px;
      border-bottom: 1px solid var(--color-gray-50);

      h3 {
        margin: 0;
        color: var(--neutral-shades-grey-70, #848288);
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 140%; /* 22.4px */
        letter-spacing: 0.8px;
      }
    }
  }

  .button-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: ${pxToRem(12)};
  }
`;
