import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import sizes from 'utils/sizes';
import TDLogo from '../../../assets/img/truck-dispatch-logo-with-text.svg';

export default function MarketingFooter() {
  const lists = [
    {
      title: 'TruckDispatch',
      children: [
        {
          title: 'Frequently Asked Questions',
          link: '/faqs',
          isExternal: false,
        },
      ],
    },
    {
      title: 'Legal',
      children: [
        {
          title: 'Privacy Policy',
          link: '/privacy-policy',
          isExternal: false,
        },
        {
          title: 'Terms and Conditions',
          link: '/terms-and-conditions',
          isExternal: false,
        },
      ],
    },
    {
      title: 'Contact',
      children: [
        {
          title: 'support@truckdispatch.ng',
          link: 'mailto:support@truckdispatch.ng',
          isExternal: true,
        },
      ],
    },
  ];
  return (
    <Footer>
      <div className="footer-inner">
        <div className="logo-container">
          <img src={TDLogo} alt="" width="350" />
        </div>
        <div className="list-container">
          {lists.map((item, index) => (
            <ul key={index}>
              <div className="list-title">{item.title}</div>
              {item.children.map((child, childIndex) => (
                <li key={childIndex}>
                  {child.isExternal ? (
                    <a href={child.link} target="_blank">
                      {child.title}
                    </a>
                  ) : (
                    <Link to={child.link}>{child.title}</Link>
                  )}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </Footer>
  );
}

const Footer = styled.footer`
  background-color: var(--color-gray-900);
  display: flex;
  justify-content: center;

  .footer-inner {
    width: 90%;
    color: var(--color-gray-100);
    min-height: ${pxToRem(100)};
    display: flex;
    flex-direction: column;

    .logo-container {
      width: 25%;
      img {
        margin: ${pxToRem(-40)} ${pxToRem(-40)} 0;
      }
    }
    .list-container {
      width: 75%;
      display: grid;
      grid-template-columns: auto;
      ul {
        list-style: none;

        .list-title {
          font-size: ${pxToRem(16)};
          font-weight: bold;
        }

        li {
          margin: ${pxToRem(12)} 0;
          a {
            color: var(--color-gray-500);
            font-weight: 400;
          }
        }
      }
    }

    @media only screen and (min-width: ${sizes.mobile}) {
      width: 80%;
      flex-direction: row;
      .list-container {
        padding-top: ${pxToRem(32)};
        display: grid;
        grid-template-columns: auto auto;
      }
    }
    @media only screen and (min-width: ${sizes.tabletMidWidth}) {
      width: 80%;
      flex-direction: row;
      .list-container {
        padding-top: ${pxToRem(32)};
        display: grid;
        grid-template-columns: auto auto auto;
      }
    }
  }
`;
