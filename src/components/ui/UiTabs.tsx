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
  return (
    <Tabs>
      {/* TODO: figure out how to retain active state for child routes. */}
      {tabs.map((tab, index) => (
        <Tab isActive={tab.path === urlLocation.pathname} key={index}>
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
  gap: 16px;
  overflow: auto;
  padding: 0;
  margin: 0;
`;

const Tab = styled.li`
  font-size: 14px;
  padding-bottom: 24px;
  /* TODO: make border rounded */
  border-bottom: 2px solid
    ${({ isActive }: { isActive: boolean }) =>
      isActive ? 'var(--color-primary)' : 'transparent'};

  a {
    color: ${({ isActive }: { isActive: boolean }) =>
      isActive ? 'var(--color-primary)' : 'var(--color-gray-400)'};
    font-weight: ${({ isActive }: { isActive: boolean }) =>
      isActive ? 600 : 400};
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
