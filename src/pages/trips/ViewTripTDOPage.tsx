// import React, { useMemo, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import styled from 'styled-components';

// import { uploadItem } from '../../api/Cloudinary';

// import sizes from 'utils/sizes';
// import { toAnyAction } from 'utils/helpers';
// import UploadTDO from 'utils/validations/UploadTDO';

// import { createOrUpdateTrip, selectTrip, setTrips } from 'modules/Trips';

// import { RootState } from 'modules/index';

// import FileUploadWidget from 'ui/FileUploadWidget';
// import UiButton from 'ui/UiButton';
// import UiForm from 'ui/UiForm';
// import MessageWithImage from 'ui/MessageWithImage';
// import FileSent from '../../assets/img/file-sent.svg';
// import WaitingForUpload from '../../assets/img/waiting-for-upload.svg';
// import { Toast } from 'utils/toast';

// export default function ViewTripTDO() {
//   const { tripId } = useParams();
//   const dispatch = useDispatch();
//   const trips = useSelector((state: RootState) => state.trips.trips);
//   const trip = useSelector(selectTrip(tripId!));
//   const user = useSelector((state: RootState) => state.account.user);
//   const [formData, setformData] = useState<{ TDO: null | File }>({ TDO: null });
//   const [loading, setLoading] = useState(false);

//   function selectFile(param: { name: string; value: File | File[] }) {
//     if (!Array.isArray(param.value)) setformData({ TDO: param.value });
//     else setformData({ TDO: param.value[0] });
//   }

//   async function uploadTDO() {
//     try {
//       if (!formData.TDO || !trip) return;
//       setLoading(true);
//       const TDO = await uploadItem(formData.TDO);
//       const tripWithTDO = {
//         ...trip,
//         TDO,
//       };
//       dispatch(toAnyAction(createOrUpdateTrip(tripWithTDO)))
//         .then(() => {
//           const updatedTrips = trips.map((tripObj) =>
//             tripObj.id === tripWithTDO.id ? tripWithTDO : tripObj,
//           );
//           dispatch(setTrips(updatedTrips));
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     } catch (err) {
//       Toast.error({ msg: (err as Error).message });
//       setLoading(false);
//     }
//   }

//   const showUploadTDO = useMemo<boolean>(() => {
//     if (user?.userType === 'transporter') return false;

//     if (trip?.status === 'awaiting_bid') return false;

//     if (trip?.TDO) return false;

//     return true;
//   }, [user, trip]);

//   return (
//     <>
//       <CardContainer>
//         {showUploadTDO && (
//           <>
//             <h3>Upload Terminal Delivery Order</h3>
//             <p>
//               A Terminal Delivery Order (TDO) is a document that authorizes the
//               release of cargo from a shipping terminal or port to the consignee
//               or their authorized agent for final delivery. The TDO contains
//               information about the shipment, including the name of the
//               consignee, the destination address, and any special handling
//               instructions.
//             </p>

//             <UiForm schema={UploadTDO} formData={formData} onSubmit={uploadTDO}>
//               {({ errors }) => (
//                 <>
//                   <FileUploadWidget
//                     name="TDO"
//                     label="Terminal Delivery Order"
//                     fileType="document"
//                     value={formData.TDO}
//                     onChange={selectFile}
//                     error={errors.TDO}
//                   />

//                   <div className="button-container">
//                     <UiButton loading={loading}>Upload TDO</UiButton>
//                   </div>
//                 </>
//               )}
//             </UiForm>
//           </>
//         )}
//         {!showUploadTDO && user?.userType === 'agent' && (
//           <>
//             <MessageWithImage
//               img={FileSent}
//               title="Terminal Delivery Order has been sent"
//               subtitle="The TDO of your trip has been uploaded and is now accessible by the responsible transporter. Expect the transporter to reach out to you via phone or text for any other needed information."
//             />
//             <div className="button-container view-tdo-btn-container">
//               <a href={trip?.TDO} target="_blank">
//                 <UiButton>View TDO</UiButton>
//               </a>
//             </div>
//           </>
//         )}
//         {!!trip?.TDO && user?.userType === 'transporter' && (
//           <>
//             <MessageWithImage
//               img={FileSent}
//               title="Terminal Delivery Order has been Received"
//               subtitle="The agent has uploaded the TDO for this trip. This document authorizes the release of cargo from a shipping terminal or port and contains information about the shipment, including the name of the consignee, the destination address, and any special handling instructions. Kindly click the button below to view TDO "
//             />
//             <div className="button-container view-tdo-btn-container">
//               <a href={trip?.TDO} target="_blank">
//                 <UiButton>View TDO</UiButton>
//               </a>
//             </div>
//           </>
//         )}
//         {!trip?.TDO && user?.userType === 'transporter' && (
//           <MessageWithImage
//             img={WaitingForUpload}
//             title="Terminal Delivery Order has not been uploaded"
//             subtitle="The TDO of this trip is yet to be uploaded. Kindly reach out to the responsible agent via phone or text for the document."
//           />
//         )}
//       </CardContainer>
//     </>
//   );
// }

// const CardContainer = styled.div`
//   background: #ffffff;
//   width: 90%;
//   margin: auto;
//   border: 1px solid var(--color-gray-200);
//   padding: ${pxToRem(20)};
//   border-radius: ${pxToRem(8)};

//   h3 {
//     font-size: ${pxToRem(16)};
//     color: var(--color-gray-700);
//   }
//   p {
//     font-size: ${pxToRem(14)};
//     color: var(--color-gray-700);
//   }
//   .button-container {
//     margin-top: ${pxToRem(12)};
//   }
//   .view-tdo-btn-container {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   }
//   @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
//     width: 70%;
//   }
//   @media only screen and (min-width: ${sizes.laptopSmallWidth}) {
//     width: 40%;
//   }
// `;
