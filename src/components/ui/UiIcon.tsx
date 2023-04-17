import React from 'react';
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
  User,
  UsersThree,
  X,
} from 'phosphor-react';
import Buildings from './icons/Building';
import Car from './icons/Car';
import Check from './icons/Check';
import CallReceived from './icons/CallReceived';
import DocumentUpload from './icons/DocumentUpload';
import Eye from './icons/Eye';
import EyeSlash from './icons/EyeSlash';
import InfoCircle from './icons/InfoCircle';
import MagicStar from './icons/MagicStar';
import PasswordCheck from './icons/PasswordCheck';
import styled from 'styled-components';
import UserOctagon from './icons/UserOctagon';
import UserSquare from './icons/UserSquare';
// These icons should be arranged alphabetically for easy sorting
const icons = {
  ArrowLeft: <ArrowLeft />,
  ArrowRight: <ArrowRight />,
  ArrowUpRight: <ArrowUpRight />,
  Buildings: <Buildings />,
  CallReceived: <CallReceived />,
  Car: <Car />,
  CaretDown: <CaretDown />,
  CaretUp: <CaretUp />,
  Chats: <Chats />,
  CreditCard: <CreditCard />,
  Check: <Check />,
  Checks: <Checks />,
  DocumentUpload: <DocumentUpload />,
  DotsThree: <DotsThree />,
  DotsThreeVertical: <DotsThreeVertical />,
  Eye: <Eye />,
  EyeSlash: <EyeSlash />,
  FolderNotchOpen: <FolderNotchOpen />,
  House: <House />,
  InfoCircle: <InfoCircle />,
  Kanban: <Kanban />,
  MagicStar: <MagicStar />,
  MapPin: <MapPin />,
  Money: <Money />,
  PaperPlaneTilt: <PaperPlaneTilt />,
  PasswordCheck: <PasswordCheck />,
  PencilSimple: <PencilSimple />,
  ShieldCheck: <ShieldCheck />,
  SignOut: <SignOut />,
  Suitcase: <Suitcase />,
  Star: <Star />,
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
  return <IconStyle size={size}>{icons[icon]}</IconStyle>;
}

const IconStyle = styled.span`
  font-size: ${({ size }: { size?: Props['size'] }) =>
    pxToRem((size && parseInt(size)) || 16)};

  svg {
    width: ${({ size }: { size?: Props['size'] }) =>
      pxToRem((size && parseInt(size)) || 16)};
  }
`;
