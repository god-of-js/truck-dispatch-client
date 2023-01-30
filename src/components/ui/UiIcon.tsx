import React from 'react';
import { CaretDown, CaretUp, Eye, EyeSlash } from 'phosphor-react';

const icons = {
  Eye: <Eye />,
  EyeSlash: <EyeSlash />,
  CaretDown: <CaretDown />,
  CaretUp: <CaretUp />,
};

interface Props {
  /** Name of the icon as stored in the icons object */
  name: keyof typeof icons;
}

export default function UiIcon({ name }: Props) {
  return <>{icons[name]}</>;
}
