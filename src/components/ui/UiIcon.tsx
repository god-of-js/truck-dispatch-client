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
  Check,
  Checks,
  DotsThree,
  DotsThreeVertical,
  Eye,
  EyeSlash,
  House,
  Kanban,
  MapPin,
  Money,
  PaperPlaneTilt,
  ShieldCheck,
  SignOut,
  Suitcase,
  Star,
  Truck,
  User,
  UsersThree,
  X,
} from 'phosphor-react';
import styled from 'styled-components';

// These icons should be arranged alphabetically for easy sorting
const icons = {
  ArrowLeft: <ArrowLeft />,
  ArrowRight: <ArrowRight />,
  ArrowUpRight: <ArrowUpRight />,
  CaretDown: <CaretDown />,
  CaretUp: <CaretUp />,
  Chats: <Chats />,
  CreditCard: <CreditCard />,
  Check: <Check />,
  Checks: <Checks />,
  DotsThree: <DotsThree />,
  DotsThreeVertical: <DotsThreeVertical />,
  Eye: <Eye />,
  EyeSlash: <EyeSlash />,
  House: <House />,
  Kanban: <Kanban />,
  MapPin: <MapPin />,
  Money: <Money />,
  PaperPlaneTilt: <PaperPlaneTilt />,
  ShieldCheck: <ShieldCheck />,
  SignOut: <SignOut />,
  Suitcase: <Suitcase />,
  Star: <Star />,
  Truck: <Truck />,
  User: <User />,
  UsersThree: <UsersThree />,
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
`;
