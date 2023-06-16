import styled from 'styled-components';
import UiButton from 'ui/UiButton';
import UiIcon from 'ui/UiIcon';
import Loader from './Loader';

interface Props {
  loading: boolean;
  page: number;
  totalPages: number;
  nextPage: () => void;
}
export default function PaginationLoader({
  loading,
  page,
  totalPages,
  nextPage,
}: Props) {
  return (
    <LoaderContainer>
      {loading ? (
        <Loader size="lg" />
      ) : (
        <UiButton
          size="large"
          variant="secondary"
          disabled={page === totalPages || !totalPages}
          onClick={nextPage}
        >
          Load more <UiIcon icon="Refresh" />
        </UiButton>
      )}
    </LoaderContainer>
  );
}

const LoaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  button {
    width: 182px;
  }
`;
