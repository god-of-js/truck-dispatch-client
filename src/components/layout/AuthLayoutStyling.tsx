import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  infoContent?: React.ReactNode;
  invert?: boolean;
}
export default function AuthLayoutStyling({
  children,
  infoContent,
  invert,
}: Props) {
  return (
    <LayoutStyling invert={invert}>
      <div className="info-content">{infoContent}</div>
      <div className="main-content">
        <div className="main-content__inner">{children}</div>
      </div>
    </LayoutStyling>
  );
}

const LayoutStyling = styled.div`
  display: flex;
  ${({ invert }: { invert?: boolean }) =>
    invert && 'flex-direction: row-reverse;'}
  min-height: 100vh;
  gap: ${pxToRem(20)};

  .main-content {
    width: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
    &__inner {
      width: 40%;
    }
  }
  .info-content {
    width: 40%;
    background: var(--color-primary-10);
  }
`;
