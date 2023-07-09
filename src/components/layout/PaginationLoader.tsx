import { lazy } from 'react';
import styled from 'styled-components';
import { Size } from 'types/Size';

const UiButton = lazy(() => import('ui/UiButton'));
const UiIcon = lazy(() => import('ui/UiIcon'));
const Loader = lazy(() => import('./Loader'));

interface Props {
  loading: boolean;
  page: number;
  btnSize?: Size;
  loaderSize?: Size;
  totalPages: number;
  removePadding?: boolean;
  nextPage: () => void;
}
export default function PaginationLoader({
  loading,
  page,
  totalPages,
  removePadding = false,
  btnSize = 'large',
  loaderSize = 'large',
  nextPage,
}: Props) {
  return (
    <LoaderContainer removePadding={removePadding}>
      {loading ? (
        <Loader size={loaderSize} />
      ) : (
        <UiButton
          size={btnSize}
          variant="secondary"
          disabled={page === totalPages || !totalPages}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            nextPage();
          }}
        >
          Load more <UiIcon icon="Refresh" />
        </UiButton>
      )}
    </LoaderContainer>
  );
}

const LoaderContainer = styled.div<{ removePadding: boolean }>`
  width: 100%;
  display: flex;
  justify-content: center;
  ${({ removePadding }) => !removePadding && `padding: ${pxToRem(32)} 0;`}

  button {
    width: ${pxToRem(182)};
  }
`;
