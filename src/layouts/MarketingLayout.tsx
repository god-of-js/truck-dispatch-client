import React from 'react';
import MarketingTopNav from 'components/marketing/layout/MarketingTopNav';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import MarketingFooter from 'components/marketing/layout/MarketingFooter';

export default function MarketingLayout() {
  return (
    <Body>
      <MarketingTopNav />
      <Outlet />

      <MarketingFooter />
    </Body>
  );
}

const Body = styled.div`
  overflow-x: hidden;
`;
