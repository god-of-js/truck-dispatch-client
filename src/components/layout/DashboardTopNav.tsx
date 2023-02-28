import React from 'react';
import styled from 'styled-components';
import UiIcon from 'ui/UiIcon';
import UiAvatar from 'ui/UiAvatar';
import UidropdownMenu, { DropDownData } from 'ui/UiDropdownMenu';
import { useNavigate } from 'react-router-dom';
// TODO: change Home to a dynamic text
export default function DashboardTopNav() {
  const navigate = useNavigate();
  const logOutUser = () => {
    localStorage.removeItem('uid');
    navigate('auth/login');
  };

  const dropDownData : DropDownData[] = [
    {
      label: "View Profile",
      type: "route",
      path: "profile",
      icon: <UiIcon icon='User' />
    }, 
    {
      label: "Bank Accounts",
      type: "route",
      path: "profile/accounts",
      icon:<UiIcon icon='CreditCard' />
    },
    {
      type: 'divider'
    },
    {
      label: "Log out",
      type: "function",
      func: logOutUser,
      icon: <UiIcon icon='SignOut' />
    },
  ]
  

  return (
    <TopNav>
      <span>Home</span>
      <UidropdownMenu 
      data={dropDownData} 
      trigger={ <UiAvatar />}
      
      />
    </TopNav>
  );
}

const TopNav = styled.nav`
  background-color: #ffffff;
  border-bottom: ${pxToRem(1)} solid var(--color-gray-200);    
  padding: ${pxToRem(12)} ${pxToRem(24)};
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    font-size: ${pxToRem(16)};
    font-weight: 600;
    color: var(--color-gray-400);
  }
`;
