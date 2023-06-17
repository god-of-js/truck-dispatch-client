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
  padding: 8px;
  border-radius: 8px;
  gap: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: ${({ customWidth }) =>
    customWidth ? `${customWidth}px` : 'fit-content'};
  white-space: nowrap;
  font-size: 14px;
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
    border-radius: 10px;
    padding: 0 4px;
    font-size: 10px;
    letter-spacing: -0.02em;
    border-radius: 2px;
    height: 19px;
  }
`;
