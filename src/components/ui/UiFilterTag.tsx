import styled from 'styled-components';

interface Props {
  title: string;
  isActive?: boolean;
  value?: number | string;
  customWidth?: number;
  onClick?: () => void;
}
export default function UiFilterTag({
  title,
  isActive,
  value,
  customWidth,
  onClick,
}: Props) {
  return (
    <Tag
      isActive={isActive}
      customWidth={customWidth}
      className="ui-filter-tag"
      onClick={onClick}
    >
      <span>{title}</span>
      <span className="count">{value}</span>
    </Tag>
  );
}

const Tag = styled.span<{ isActive?: boolean; customWidth?: number }>`
  padding: ${pxToRem(8)};
  border-radius: ${pxToRem(8)};
  gap: ${pxToRem(8)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: ${({ customWidth }) =>
    customWidth ? pxToRem(customWidth) : 'fit-content'};
  white-space: no-wrap;
  font-size: ${pxToRem(14)};
  line-height: 140%;
  font-style: normal;
  font-weight: 600;
  letter-spacing: -0.02em;
  ${({ isActive }) => `
        color: ${isActive ? 'var(--color-primary)' : 'var(--color-gray-70)'};
        background: ${
          isActive ? 'var(--color-primary-10)' : 'var(--color-gray-30)'
        };

        .count {
        color: ${isActive ? 'var(--color-primary)' : ' var(--color-gray-70)'};
        background: ${
          isActive ? 'var(--color-primary-20)' : ' var(--color-gray-50)'
        };

        }
    `}

  .count {
    border-radius: ${pxToRem(10)};
    padding: 0 ${pxToRem(4)};
    font-size: ${pxToRem(10)};
    letter-spacing: -0.02em;
    border-radius: ${pxToRem(2)};
    height: ${pxToRem(19)};
  }
`;
