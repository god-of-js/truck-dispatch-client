import { RootState } from 'modules/index';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import UiModal from 'ui/UiModal';
import BidItem from './BidItem';

interface Props {
  onClose: () => void;
  editBid: (jobId: string) => void;
}
export default function AllBids({ onClose, editBid }: Props) {
  const bids = useSelector((state: RootState) => state.bid.bids);
  return (
    <UiModal title="My Bids" position="right" onClose={onClose}>
      <AllBidsStyling>
        {bids.map((bid) => (
          <BidItem bid={bid} edit={editBid} key={bid._id} />
        ))}
      </AllBidsStyling>
    </UiModal>
  );
}

const AllBidsStyling = styled.div`
  background: var(--color-gray-20);
  padding: ${pxToRem(32)} ${pxToRem(24)};
  height: 100%;
  display: grid;
  gap: ${pxToRem(12)};
`;
