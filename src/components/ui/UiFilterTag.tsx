import styled from 'styled-components';

interface Props {
  title: string;
  value?: string;
  isActive?: boolean;
}
export default function UiFilterTag({ title, value, isActive }: Props) {
  return (
    <Tag>
      <span>{title}</span>
      <span className="count">10</span>
    </Tag>
  );
}

const Tag = styled.span`
  padding: ${pxToRem(8)};
  background: var(--color-gray-30);
  border-radius: ${pxToRem(8)};
  gap: ${pxToRem(8)};
  display: flex;
  align-items: center;
  width: fit-content;
  font-size: ${pxToRem(14)};
  line-height: 140%;
  font-style: normal;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--color-gray-70);

  .count {
    border-radius: ${pxToRem(10)};
    background: var(--color-gray-50);
    padding: 0 ${pxToRem(4)};
    color: var(--color-gray-80);
    font-size: ${pxToRem(10)};
    letter-spacing: -0.02em;
    border-radius: ${pxToRem(2)};
    height: ${pxToRem(19)}
  }
`;
