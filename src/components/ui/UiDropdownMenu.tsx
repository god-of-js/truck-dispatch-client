import React from 'react';
import UiIcon from './UiIcon';
import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export interface DropDownData {
  type?: 'route' | 'function';
  label: string;
  path?: string;
  func?: () => void;
}

interface Props {
  options: DropDownData[];
  trigger?: React.ReactNode;
}

export default function UidropdownMenu({ options, trigger }: Props) {
  return (
    <Menu
      menuButton={
        <MenuButtonStyling>
          {trigger || <UiIcon icon="DotsThreeVertical" size="28" />}
        </MenuButtonStyling>
      }
    >
      {options.map((option) => (
        <>
          {option.type === 'route' && (
            <MenuItemStyling>
              <Link to={`${option.path}`}>{option.label}</Link>
            </MenuItemStyling>
          )}

          {option.type === 'function' && (
            <MenuItemStyling onClick={option.func}>
              {option.label}
            </MenuItemStyling>
          )}
        </>
      ))}
    </Menu>
  );
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
  color: var(--color-gray-500);
  font-weight: normal;
  a {
    width: 100%;
    height: 100%;
    font-size: ${pxToRem(16)};
    color: var(--color-gray-500);
    font-weight: normal;
  }
`;
