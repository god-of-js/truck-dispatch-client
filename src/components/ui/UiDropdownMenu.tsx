import React from 'react';
import UiIcon from './UiIcon';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getSyntheticLeadingComments } from 'typescript';

export interface DropDownData {
  hasDivider?: boolean;
  label?: string;
  path?: string;
  icon?: React.ReactNode;
  func?: (id: string) => void;
  isDanger?: boolean;
}

interface Props {
  options: DropDownData[];
  trigger?: React.ReactNode;
  itemId?: string;
}

export default function UiDropDownMenu({ options, itemId, trigger }: Props) {
  return (
    <MenuMainStyled
      menuButton={
        <MenuButtonStyling>
          {trigger || <UiIcon icon="VerticalDots" size="20" />}
        </MenuButtonStyling>
      }
    >
      {options.map((option, index) => (
        <MenuItemStyling
          onClick={() => option.func?.(itemId!)}
          key={index}
          isdanger={option.isDanger ? 'true' : 'false'}
          hasdivider={option.hasDivider ? 'true' : 'false'}
        >
          {option.path && <Link to={`${option.path}`}>{option.label}</Link>}
          {!option.path && option.label}
          {option.icon && option.icon}
        </MenuItemStyling>
      ))}
    </MenuMainStyled>
  );
}

interface ThemeProps {
  hasdivider?: string;
  isdanger?: string;
}
function getThemeBasedOn(props: ThemeProps) {
  return `
  ${
    props.hasdivider === 'true' &&
    'border-top: 1px solid var(--color-gray-200);'
  }
  ${
    props.isdanger === 'true' &&
    'color: var(--color-danger) !important; &:hover {background: var(--color-danger-10);}'
  }
  `;
}

const MenuButtonStyling = styled(MenuButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-gray-50);
  border: transparent;
  border-radius: ${pxToRem(8)};
  padding: ${pxToRem(8)} ${pxToRem(8)} ${pxToRem(5)};
  cursor: pointer;
  width: fit-content;

  &:hover {
    box-shadow: 0px 0px 0px 4px var(--color-gray-20);
  }
`;
const MenuMainStyled = styled(Menu)`
  ul {
    padding: ${pxToRem(8)};
    border-radius: ${pxToRem(16)};
    box-shadow: 0px 10px 16px rgba(21, 19, 27, 0.1);
    left: -132px !important;
    top: 29.067px !important;
  }
`;

const MenuItemStyling = styled(MenuItem)`
  text-transform: capitalize;
  font-size: ${pxToRem(16)};
  font-weight: normal;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${pxToRem(10)};
  border-radius: ${pxToRem(8)};
  padding: 0;
  padding: ${pxToRem(4)} ${pxToRem(8)} !important;
  color: var(--color-gray-80);
  ${(themeProps: ThemeProps) => getThemeBasedOn(themeProps)};

  &:hover {
    background: var(--color-gray-30);
  }

  a {
    width: 100%;
    height: 100%;
    font-size: ${pxToRem(14)};
    color: var(--color-gray-500);
    font-weight: 'thiccboi-semibold';
  }
  span {
    margin-top: 2px;
  }
`;
