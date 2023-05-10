import Loader from 'components/layout/Loader';
import TripPickupAndDropOff from 'components/trips/TripPickupAndDropOff';
import InformUserOfVerification from 'components/verification/InformUserOfVerification';
import { RootState } from 'modules/index';
import { getJobs } from 'modules/Trips';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import UiAvatar from 'ui/UiAvatar';
import UiButton from 'ui/UiButton';
import UiIcon from 'ui/UiIcon';
import UiOverlay from 'ui/UiOverlay';
import { dateConverter, toAnyAction } from 'utils/helpers';
import sizes from 'utils/sizes';


interface Header {
  title: string;
  /** This field would be used to query the data object for how the data should be displayed.
   * It should be the same as the key of the key-value pair in the array.
   */
  query: string;
}
interface Props {
  isActionButtonDisabled?: boolean;
}

export default function TransporterJobs({
  isActionButtonDisabled,
} : Props) {

  const { tripId } = useParams();
  const jobs = useSelector((state: RootState) => state.trips.jobs);
  const user = useSelector((state: RootState) => state.account.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [loading, setLoading] = useState(true);
  const [
    isInformUserOfVerificationModalVisible,
    setIsInformUserOfVerificationModalVisible,
  ] = useState(false);

  function viewJob(jobId: string) {
    navigate(`${jobId}`);
  }
  
  useEffect(() => {
    dispatch(toAnyAction(getJobs())).finally(() => {
      setLoading(false);
    });
  }, []);

  function bidForJob() {
    if (user?.status !== 'verified') {
      setIsInformUserOfVerificationModalVisible(true);
      return;
    }
    navigate(`/available-jobs/${tripId}/bid`);
  }


  return (
    <>
      <MyJobsPageStyle className='flex-container'>
        {!loading ? (
          <>
          {jobs.map((job)=>{
            return (
              <Container>
              <TransporterInfo>
                 <UiAvatar avatar={job.tripOwner?.avatar} size='lg'/>
                 <div>
                 <div>{`${job.tripOwner?.lastName} ${job.tripOwner?.firstName}`}</div>
                 <div className='capitalize'>{job.tripOwner?.userType}</div>
                 </div>
              </TransporterInfo>

              <TransporterJobsDetail>
                <TransporterjobGoods>
                  <div className='capitalize'>Type of Goods</div>
                  <div>{job.typeOfGoods}</div>
                </TransporterjobGoods>

                <div className='underline'>
                  <TripPickupAndDropOff 
                    pickup={job.pickUpAddress}
                    dropOff={job.deliveryAddress}/>
                </div>

                 <TransporterJobDate>
                  <div>
                    <div className='capitalize'>PickUp date</div>
                    <div>{dateConverter(job.pickUpDate)}</div>
                  </div>

                  <UiIcon icon='ArrowRight' />

                  <div>
                    <div className='capitalize'>Delivery date</div>
                    <div>{dateConverter(job.deliveryDate)}</div>
                  </div>
                  </TransporterJobDate>

                  <SubmitButtonContainer className="submit-button-container">
                    <UiButton
                     loading={loading}
                     disabled={isActionButtonDisabled}
                     onClick={bidForJob}
                     >bid now</UiButton>
                  <UiButton
                     variant='secondary'
                     loading={loading}
                     disabled={isActionButtonDisabled}
                     onClick={()=> viewJob(job._id)}>View full Details</UiButton>
                  </SubmitButtonContainer>
              </TransporterJobsDetail>
              </Container>
            )
          })}
          </>
        ) : (
          <Loader />
  
        )}

      </MyJobsPageStyle>
        <UiOverlay isVisible={isInformUserOfVerificationModalVisible}>
          <InformUserOfVerification
            onClose={() => setIsInformUserOfVerificationModalVisible(false)}
          />
        </UiOverlay>
    </>
  );
}

const MyJobsPageStyle = styled.div`
  margin: ${pxToRem(32)} 0;
  display: flex;
  flex-direction: column;
  gap: ${pxToRem(20)};
  
  @media only screen and (min-width: ${sizes.laptopWidth}) {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .underline {
    border-bottom: ${pxToRem(1)} solid #848288;
    padding-bottom: ${pxToRem(24)};
  }

  .capitalize {
    text-transform: uppercase;
    font-weight: 400;
    font-size: ${pxToRem(10)};
    line-height: 1.5;
    letter-spacing: 0.05em;
  }
`;



const Container = styled.div`
margin: 0 auto;
width: ${pxToRem(330)};
border-radius: ${pxToRem(16)};
background: #ffffff;
overflow: hidden;
font-weight: 600;
font-size: ${pxToRem(16)};

@media only screen and (min-width: ${sizes.laptopWidth}) {
  margin: 0;
 }
`

const TransporterInfo = styled.div`
background: #F2F0FB;
padding: ${pxToRem(12)} ${pxToRem(24)} ;
display: flex;
align-items: center;
gap: ${pxToRem(8)};
`

const TransporterJobsDetail = styled.div`
padding: 0 ${pxToRem(24)};
display: flex;
flex-direction: column;
justify-content: space-between; 
height: ${pxToRem(400)}
`;

const TransporterjobGoods = styled.div`
  border-bottom: ${pxToRem(1)} solid #848288;
  padding: ${pxToRem(16)} 0;
`

const TransporterJobDate = styled.div`
display: flex;
justify-content: space-between;
`

const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${pxToRem(24)} 0;
  border-top: 1px solid #848288;
  
  & button:last-child {
    flex-grow: 1;
    margin-left: ${pxToRem(16)}
  }
`;
