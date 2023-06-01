import UiModal from 'ui/UiModal';
interface Props {
  onClose: () => void;
}
export default function TripHasBeenBroadcasted({ onClose }: Props) {
  return (
    <UiModal title='Trip has been broadcasted' onClose={onClose}>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos amet alias
      facilis fugiat accusantium illum ducimus. Illo iusto voluptas repudiandae
      temporibus necessitatibus, quod sequi dolorem voluptates quidem numquam
      accusamus deserunt?
    </UiModal>
  );
}
