import React from 'react';
// These icons should be arranged alphabetically for easy sorting
import {
  ArrowLeft,
  ArrowRight,
  CaretDown,
  CaretUp,
  Chats,
  DotsThree,
  DotsThreeVertical,
  Eye,
  EyeSlash,
  House,
  MapPin,
  Money,
  PaperPlaneTilt,
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
  CaretDown: <CaretDown />,
  CaretUp: <CaretUp />,
  Chats: <Chats />,
  DotsThree: <DotsThree />,
  DotsThreeVertical: <DotsThreeVertical />,
  Eye: <Eye />,
  EyeSlash: <EyeSlash />,
  House: <House />,
  MapPin: <MapPin />,
  Money: <Money />,
  PaperPlaneTilt: <PaperPlaneTilt />,
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
