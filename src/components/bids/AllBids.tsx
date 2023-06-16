import { RootState } from 'modules/index';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import UiModal from 'ui/UiModal';
import BidItem from './BidItem';

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
  padding:32px 24px;
  height: 100%;
  overflow-y: auto;

  .bid-item {
    margin-bottom:24px;
  }
`;
