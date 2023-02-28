import { useState } from 'react';
import styled from 'styled-components';

interface Data {
  title: string;
  subtitle: string;
  boldSubtitleStarter?: string;
}
interface Props {
  data: Data[];
}
export default function ListComponent({ data }: Props) {
  const [active, setActive] = useState(data[0].title);
  return (
    <>
      {data.map((item, index) => (
        <List key={index} onClick={() => setActive(item.title)}>
          <Indicator isActive={item.title === active}>
            <div className="inner">
              <div className="line" />
              <div className="square-box" />
            </div>
          </Indicator>
          <div className="content">
            <div className="heading">{item.title}</div>
            {item.title === active && (
              <div className="subtitle">
                <b>{item.boldSubtitleStarter}</b> {item.subtitle}
              </div>
            )}
          </div>
        </List>
      ))}
    </>
  );
}

const List = styled.div`
  display: flex;
  gap: ${pxToRem(28)};
  cursor: pointer;
  margin: ${pxToRem(32)} 0;
  &:first-child {
    margin: 0 0;
  }
  .content {
    .heading {
      font-size: ${pxToRem(20)};
      margin-top: ${pxToRem(-8)};
      color: white;
      font-weight: 800;
    }
    .subtitle {
      font-size: ${pxToRem(16)};
      margin-top: ${pxToRem(16)};
      color: white;
    }
  }
`;

const Indicator = styled.div`
  .inner {
    display: flex;
    align-items: center;
    .square-box {
      width: ${pxToRem(6)};
      height: ${pxToRem(6)};
      border: 1px solid white;
      background: ${({ isActive }: { isActive: boolean }) =>
        isActive ? 'white' : 'transparent'};
    }
    .line {
      width: ${pxToRem(52)};
      border-top: 1px solid
        ${({ isActive }: { isActive: boolean }) =>
          isActive ? 'var(--color-gray-500)' : 'transparent'};
    }
  }
`;
