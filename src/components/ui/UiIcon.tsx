import styled from 'styled-components';

// These icons should be arranged alphabetically for easy sorting
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CaretDown,
  CaretUp,
  Chats,
  CreditCard,
  Checks,
  DotsThree,
  DotsThreeVertical,
  FolderNotchOpen,
  House,
  Kanban,
  MapPin,
  Money,
  PaperPlaneTilt,
  PencilSimple,
  ShieldCheck,
  SignOut,
  Suitcase,
  Star,
  Truck,
  UsersThree,
  X,
} from 'phosphor-react';
import { ReactComponent as ArrowCircleLeft } from './icons/arrow-circle-left.svg';
import { ReactComponent as ArrowCircleRight } from './icons/arrow-circle-right.svg';
import { ReactComponent as CallReceived } from './icons/call-received.svg';
import { ReactComponent as Car } from './icons/car.svg';
import { ReactComponent as ChartSquare } from './icons/chart-square.svg';
import { ReactComponent as Check } from './icons/check.svg';
import { ReactComponent as Company } from './icons/company.svg';
import { ReactComponent as DocumentUpload } from './icons/document-upload.svg';
import { ReactComponent as Eye } from './icons/eye.svg';
import { ReactComponent as EyeSlash } from './icons/eye-slash.svg';
import { ReactComponent as Jobs } from './icons/jobs.svg';
import { ReactComponent as InfoCircle } from './icons/info-circle.svg';
import { ReactComponent as Logout } from './icons/log-out.svg';
import { ReactComponent as MagicStar } from './icons/magic-star.svg';
import { ReactComponent as MessageChat } from './icons/chat.svg';
import { ReactComponent as Moneys } from './icons/moneys.svg';
import { ReactComponent as PasswordCheck } from './icons/password-check.svg';
import { ReactComponent as Settings } from './icons/settings.svg';
import { ReactComponent as TruckImg } from './icons/truck.svg';
import { ReactComponent as TruckTick } from './icons/ticked-truck.svg';
import { ReactComponent as User } from './icons/user.svg';
import { ReactComponent as UserOctagon } from './icons/user-octagon.svg';
import { ReactComponent as UserSquare } from './icons/user-square.svg';

// These icons should be arranged alphabetically for easy sorting
const icons = {
  ArrowCircleLeft: <ArrowCircleLeft />,
  ArrowCircleRight: <ArrowCircleRight />,
  ArrowLeft: <ArrowLeft />,
  ArrowRight: <ArrowRight />,
  ArrowUpRight: <ArrowUpRight />,
  Buildings: <Company />,
  CallReceived: <CallReceived />,
  Car: <Car />,
  CaretDown: <CaretDown />,
  CaretUp: <CaretUp />,
  Chats: <Chats />,
  ChartSquare: <ChartSquare />,
  Check: <Check />,
  Checks: <Checks />,
  CreditCard: <CreditCard />,
  DocumentUpload: <DocumentUpload />,
  DotsThree: <DotsThree />,
  DotsThreeVertical: <DotsThreeVertical />,
  Eye: <Eye />,
  EyeSlash: <EyeSlash />,
  FolderNotchOpen: <FolderNotchOpen />,
  House: <House />,
  InfoCircle: <InfoCircle />,
  Jobs: <Jobs />,
  Kanban: <Kanban />,
  Logout: <Logout />,
  MagicStar: <MagicStar />,
  MapPin: <MapPin />,
  MessageChat: <MessageChat />,
  Money: <Money />,
  Moneys: <Moneys />,
  PaperPlaneTilt: <PaperPlaneTilt />,
  PasswordCheck: <PasswordCheck />,
  PencilSimple: <PencilSimple />,
  ShieldCheck: <ShieldCheck />,
  SignOut: <SignOut />,
  Suitcase: <Suitcase />,
  Star: <Star />,
  Settings: <Settings />,
  TruckImg: <TruckImg />,
  TruckTick: <TruckTick />,
  Truck: <Truck />,
  User: <User />,
  UserOctagon: <UserOctagon />,
  UsersThree: <UsersThree />,
  UserSquare: <UserSquare />,
  X: <X />,
};

export type Icons = keyof typeof icons;
interface Props {
  /** Name of the icon as stored in the icons object */
  icon: Icons;
  size?: string;
}
export default function UiIcon({ icon, size = '16' }: Props) {
  return (
    <IconStyle size={size} className="icon">
      {icons[icon]}
    </IconStyle>
  );
}

const IconStyle = styled.span`
  font-size: ${({ size }: { size?: Props['size'] }) =>
    pxToRem((size && parseInt(size)) || 16)};

  svg {
    width: ${({ size }: { size?: Props['size'] }) =>
      pxToRem((size && parseInt(size)) || 16)};
  }
`;
