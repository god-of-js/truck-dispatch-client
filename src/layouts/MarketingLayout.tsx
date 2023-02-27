import React from 'react';
import MarketingTopNav from 'components/marketing/layout/MarketingTopNav';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

export default function MarketingLayout() {
  return (
    <>
      <MarketingTopNav />
      <Outlet />
    </>
  );
}

const Body = styled.div``;
