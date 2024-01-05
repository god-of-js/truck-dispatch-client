import React, { lazy } from 'react';
import { Icons } from './UiIcon';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const UiIcon = lazy(() => import('./UiIcon'));
export interface DropDownData {
  hasDivider?: boolean;
  label?: string;
  path?: string;
  icon?: Icons;
  endIcon?: Icons;

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
    <RelativeContainer>
      <MenuMainStyled
        menuButton={
          <MenuButtonStyling>
            {trigger || <UiIcon icon="VerticalDots" size="20" />}
          </MenuButtonStyling>
        }
      >
        {options.map((option, index) => (
          <MenuItemStyling
            onClick={() =>  option.func?.(itemId!)}
            key={index}
            isdanger={option.isDanger ? 'true' : 'false'}
            hasdivider={option.hasDivider ? 'true' : 'false'}
          >
            <span className="content">
              {option.path && (
                <Link to={`${option.path}`}>
                  {option.icon && <UiIcon icon={option.icon} />}
                  {option.label}
                </Link>
              )}
              {!option.path && (
                <span className="content">
                  {option.icon && <UiIcon icon={option.icon} />}

                  <span className="content__text">{option.label}</span>
                </span>
              )}
            </span>
            {option.endIcon && <UiIcon icon={option.endIcon} />}
          </MenuItemStyling>
        ))}
      </MenuMainStyled>
    </RelativeContainer>
  );
}

const RelativeContainer = styled.div`
  position: relative;
  overflow: visible;
`;
interface ThemeProps {
  hasdivider?: string;
  isdanger?: string;
}

const MenuButtonStyling = styled(MenuButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-gray-50);
  border: transparent;
  border-radius: ${pxToRem(8)};
  position: relative;
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
    top: ${pxToRem(12)} !important;
    left: -${pxToRem(132)} !important;
  }
`;

const MenuItemStyling = styled(MenuItem)<ThemeProps>`
  font-size: ${pxToRem(14)};
  font-weight: normal;
  font-weight: 600;
  line-height: ${pxToRem(24)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${pxToRem(32)};
  min-height: ${pxToRem(28)};
  border-radius: ${pxToRem(8)};
  padding: ${pxToRem(4)} ${pxToRem(8)} !important;
  font-style: normal;
  color: ${({ isdanger }) =>
    isdanger === 'true' ? 'var(--color-danger)' : 'var(--color-gray-80)'};

  &:hover {
    background: ${({ isdanger }) =>
      isdanger === 'true' ? 'var(--color-danger-10)' : 'var(--color-gray-30)'};
  }

  a {
    width: 100%;
    height: 100%;
    font-size: ${pxToRem(14)};
    color: var(--color-gray-500);
    font-weight: 'thiccboi-semibold';
  }
  .content {
    display: flex;
    align-items: center;
    gap: ${pxToRem(8)};

    &__text {
      margin-bottom: ${pxToRem(2)};
    }
  }
`;
