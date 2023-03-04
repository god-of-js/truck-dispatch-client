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
  func?: () => void;
  isDanger?: boolean;
}

interface Props {
  options: DropDownData[];
  trigger?: React.ReactNode;
}

export default function UiDropDownMenu({ options, trigger }: Props) {
  return (
    <Menu
      menuButton={
        <MenuButtonStyling>
          {trigger || <UiIcon icon="DotsThreeVertical" size="20" />}
        </MenuButtonStyling>
      }
    >
      {options.map((option, index) => (
        <MenuItemStyling
          onClick={() => option.func?.()}
          key={index}
          isDanger={option.isDanger}
          hasDivider={option.hasDivider}
        >
          {option.icon && option.icon}

          {option.path && <Link to={`${option.path}`}>{option.label}</Link>}
          {!option.path && option.label}
        </MenuItemStyling>
      ))}
    </Menu>
  );
}

interface ThemeProps {
  hasDivider?: boolean;
  isDanger?: boolean;
}
function getThemeBasedOn(props: ThemeProps) {
  return `
  ${props.hasDivider && 'border-top: 1px solid var(--color-gray-200);'}
  ${
    props.isDanger && 'color: var(--color-danger); &:hover {background: var(--color-danger-100);}'
  }
  `;
}

const MenuButtonStyling = styled(MenuButton)`
  background: transparent;
  border: transparent;
  cursor: pointer;
  width: fit-content;
`;

const MenuItemStyling = styled(MenuItem)`
  text-transform: capitalize;
  font-size: ${pxToRem(16)};
  font-weight: normal;
  display: flex;
  align-items: center;
  gap: ${pxToRem(8)};
  ${(themeProps: ThemeProps) => getThemeBasedOn(themeProps)};

  a {
    width: 100%;
    height: 100%;
    font-size: ${pxToRem(16)};
    color: var(--color-gray-500);
    font-weight: normal;
  }
  span {
    margin-top: 2px;
  }
`;
