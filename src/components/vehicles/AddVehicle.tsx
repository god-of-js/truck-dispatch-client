import UiModal from 'ui/UiModal';

interface Props {
  onClose: () => void;
}
export default function AddVehicle({ onClose }: Props) {
  return (
    <UiModal onClose={onClose}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa esse fugiat
      magnam, sunt alias velit laudantium commodi asperiores maxime aperiam
      aliquam consequatur nobis corrupti modi! Magnam quos quae nobis quidem.
    </UiModal>
  );
}
