import React from 'react';
// These icons should be arranged alphabetically for easy sorting
import {
  CaretDown,
  CaretUp,
  Eye,
  EyeSlash,
  House,
  Money,
  Suitcase,
  Truck,
  User,
  UsersThree,
} from 'phosphor-react';
import styled from 'styled-components';

// These icons should be arranged alphabetically for easy sorting
const icons = {
  CaretDown: <CaretDown />,
  CaretUp: <CaretUp />,
  Eye: <Eye />,
  EyeSlash: <EyeSlash />,
  House: <House />,
  Money: <Money />,
  Suitcase: <Suitcase />,
  Truck: <Truck />,
  User: <User />,
  UsersThree: <UsersThree />,
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
  font-size: ${({ size }: { size?: Props['size'] }) => `${size}px`};
`;
