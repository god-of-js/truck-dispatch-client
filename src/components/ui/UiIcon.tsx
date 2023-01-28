import React, { useState } from 'react';

import { Eye, EyeSlash } from 'phosphor-react';

const icons = {
  Eye: <Eye />,
  EyeSlash: <EyeSlash />,
};
interface Props {
  /** Name of the icon as stored in the icons object */
  icon: keyof typeof icons;
}
export default function UiIcon({ icon }: Props) {
  return <>{icons[icon]}</>;
}
