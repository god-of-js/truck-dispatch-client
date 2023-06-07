import styled from 'styled-components';
import UiModal from 'ui/UiModal';

interface Props {
  onClose: () => void;
}
export default function MakePayment({ onClose }: Props) {
  return (
    <UiModal title="Make Payment" onClose={onClose}>
      <ModalBody>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id, dolorum
        nulla sequi mollitia quia aspernatur a ut voluptatem fugiat sint
        deleniti modi, magnam expedita officiis non eveniet sit quidem? Dolore!
      </ModalBody>
    </UiModal>
  );
}

const ModalBody = styled.div`
  padding: ${pxToRem(26)} ${pxToRem(24)};
`;
