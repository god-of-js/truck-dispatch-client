import { lazy } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'modules/index';
import styled from 'styled-components';
const UiModal = lazy(() => import('ui/UiModal'));
const BidItem = lazy(() => import('./BidItem'));

interface Props {
  onClose: () => void;
  editBid: (jobId: string) => void;
  deleteBid: (bidId: string, jobId: string) => void;
  isVisible: boolean;
}

export default function AllBids({
  onClose,
  editBid,
  deleteBid,
  isVisible,
}: Props) {
  const bids = useSelector((state: RootState) => state.bid.bids);
  return (
    <UiModal
      isVisible={isVisible}
      title="My Bids"
      position="right"
      onClose={onClose}
    >
      <AllBidsStyling>
        {bids.map((bid) => (
          <BidItem
            bid={bid}
            edit={editBid}
            key={bid._id}
            deleteItem={deleteBid}
          />
        ))}
      </AllBidsStyling>
    </UiModal>
  );
}

const AllBidsStyling = styled.div`
  background: var(--color-gray-20);
  padding: ${pxToRem(32)} ${pxToRem(24)};
  height: 100%;
  overflow-y: auto;

  .bid-item {
    margin-bottom: ${pxToRem(24)};
  }
`;
