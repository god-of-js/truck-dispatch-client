import styled from 'styled-components';

// These icons should be arranged alphabetically for easy sorting
import {
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
  Money,
  PaperPlaneTilt,
  PencilSimple,
  ShieldCheck,
  SignOut,
  Suitcase,
  Star,
  UsersThree,
  X,
} from 'phosphor-react';

import { ReactComponent as ArrowCircleLeft } from './icons/arrow-circle-left.svg';
import { ReactComponent as CaretLeft } from './icons/arrow-left.svg';
import { ReactComponent as ArrowRight } from './icons/arrow-right.svg';
import { ReactComponent as ArrowLeft } from './icons/arrow-left.svg';

import { ReactComponent as Close } from './icons/close.svg';
import { ReactComponent as CloseThick } from './icons/close-thick.svg';
import { ReactComponent as Chat } from './icons/chat.svg';
import { ReactComponent as ArrowCircleRight } from './icons/arrow-circle-right.svg';
import { ReactComponent as CallReceived } from './icons/call-received.svg';
import { ReactComponent as Car } from './icons/car.svg';
import { ReactComponent as ChartSquare } from './icons/chart-square.svg';
import { ReactComponent as Check } from './icons/check.svg';
import { ReactComponent as Menu } from './icons/menu.svg';
import { ReactComponent as Chiller } from './icons/chiller.svg';
import { ReactComponent as Company } from './icons/company.svg';
import { ReactComponent as DocumentUpload } from './icons/document-upload.svg';
import { ReactComponent as DuoTrucks } from './icons/duo-trucks.svg';
import { ReactComponent as Eye } from './icons/eye.svg';
import { ReactComponent as EyeSlash } from './icons/eye-slash.svg';
import { ReactComponent as FlatBed } from './icons/flatbed.svg';
import { ReactComponent as Jobs } from './icons/jobs.svg';
import { ReactComponent as InfoCircle } from './icons/info-circle.svg';
import { ReactComponent as Location } from './icons/location.svg';
import { ReactComponent as LocationTick } from './icons/location-tick.svg';
import { ReactComponent as Logout } from './icons/log-out.svg';
import { ReactComponent as MagicStar } from './icons/magic-star.svg';
import { ReactComponent as MiniVan } from './icons/mini-van.svg';
import { ReactComponent as MessageChat } from './icons/chat.svg';
import { ReactComponent as Moneys } from './icons/moneys.svg';
import { ReactComponent as Notification } from './icons/notification.svg';
import { ReactComponent as PasswordCheck } from './icons/password-check.svg';
import { ReactComponent as PickUpVan } from './icons/pick-up-van.svg';
import { ReactComponent as Refresh } from './icons/refresh.svg';
import { ReactComponent as Search } from './icons/search.svg';
import { ReactComponent as SemiTrailer } from './icons/semi-trailer.svg';
import { ReactComponent as Settings } from './icons/settings.svg';
import { ReactComponent as Tick } from './icons/tick.svg';
import { ReactComponent as Tanker } from './icons/tanker.svg';
import { ReactComponent as Truck } from './icons/truck.svg';
import { ReactComponent as TwentyFTTruck } from './icons/20-ft-truck.svg';
import { ReactComponent as TruckRemove } from './icons/truck-remove.svg';
import { ReactComponent as TruckTick } from './icons/ticked-truck.svg';
import { ReactComponent as Trailer } from './icons/trailer.svg';
import { ReactComponent as User } from './icons/user.svg';
import { ReactComponent as UserOctagon } from './icons/user-octagon.svg';
import { ReactComponent as UserSquare } from './icons/user-square.svg';
import { ReactComponent as Van } from './icons/van.svg';
import { ReactComponent as VerticalDots } from './icons/vertical-dots.svg';

// These icons should be arranged alphabetically for easy sorting
const icons = {
  ArrowCircleLeft: <ArrowCircleLeft />,
  ArrowCircleRight: <ArrowCircleRight />,
  ArrowLeft: <ArrowLeft />,
  CaretLeft: <CaretLeft />,
  ArrowRight: <ArrowRight />,
  ArrowUpRight: <ArrowUpRight />,
  Buildings: <Company />,
  CallReceived: <CallReceived />,
  Car: <Car />,
  CaretDown: <CaretDown />,
  CaretUp: <CaretUp />,
  Chats: <Chats />,
  Chat: <Chat />,
  ChartSquare: <ChartSquare />,
  Close: <Close />,
  CloseThick: <CloseThick />,
  CreditCard: <CreditCard />,
  Check: <Check />,
  Chiller: <Chiller />,
  Checks: <Checks />,
  DocumentUpload: <DocumentUpload />,
  DuoTrucks: <DuoTrucks />,
  DotsThree: <DotsThree />,
  DotsThreeVertical: <DotsThreeVertical />,
  Eye: <Eye />,
  EyeSlash: <EyeSlash />,
  FlatBed: <FlatBed />,
  FolderNotchOpen: <FolderNotchOpen />,
  House: <House />,
  InfoCircle: <InfoCircle />,
  Jobs: <Jobs />,
  Kanban: <Kanban />,
  Location: <Location />,
  LocationTick: <LocationTick />,
  Logout: <Logout />,
  MagicStar: <MagicStar />,
  Menu: <Menu />,
  MiniVan: <MiniVan />,
  Moneys: <Moneys />,
  Money: <Money />,
  MessageChat: <MessageChat />,
  Notification: <Notification />,
  PaperPlaneTilt: <PaperPlaneTilt />,
  PasswordCheck: <PasswordCheck />,
  PickUpVan: <PickUpVan />,
  Refresh: <Refresh />,
  Search: <Search />,
  SemiTrailer: <SemiTrailer />,
  PencilSimple: <PencilSimple />,
  ShieldCheck: <ShieldCheck />,
  SignOut: <SignOut />,
  Suitcase: <Suitcase />,
  Star: <Star />,
  Settings: <Settings />,
  Tick: <Tick />,
  Tanker: <Tanker />,
  TruckTick: <TruckTick />,
  Trailer: <Trailer />,
  Truck: <Truck />,
  TruckRemove: <TruckRemove />,
  User: <User />,
  UserOctagon: <UserOctagon />,
  UsersThree: <UsersThree />,
  UserSquare: <UserSquare />,
  Van: <Van />,
  VerticalDots: <VerticalDots />,
  TwentyFTTruck: <TwentyFTTruck />,
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
    height: ${({ size }: { size?: Props['size'] }) =>
      pxToRem((size && parseInt(size)) || 16)};
    fill: var(--color-gray-80);
  }
`;
