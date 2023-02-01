import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

interface Tab {
  label: string;
  path?: string;
  onClick?: () => void;
}

interface Props {
  tabs: Tab[];
}
export default function UiTabs({ tabs }: Props) {
  const urlLocation = useLocation();
  console.log(urlLocation);
  return (
    <Tabs>
      {tabs.map((tab) => (
        <Tab isActive={tab.path === urlLocation.pathname}>
          {tab.path ? (
            <Link to={tab.path}>{tab.label}</Link>
          ) : (
            <button onClick={tab.onClick}>{tab.label}</button>
          )}
        </Tab>
      ))}
    </Tabs>
  );
}

const Tabs = styled.ul`
  list-style: none;
  display: flex;
  gap: ${pxToRem(16)};
  overflow: auto;
  padding: 0;
  margin: 0;
`;

const Tab = styled.li`
  font-size: ${pxToRem(16)};
  padding-bottom: ${pxToRem(12)};
  /* TODO: make border rounded */
  border-bottom: ${pxToRem(2)} solid transparent;

  a {
    color: ${({ isActive }: { isActive: boolean }) =>
      isActive ? 'var(--color-primary)' : 'var(--color-gray-400)'};
    font-weight: 500;
    &:hover {
      color: var(--color-primary-400);
    }
  }
  button {
    outline: none;
    background: transparent;
    border: transparent;
  }
`;
