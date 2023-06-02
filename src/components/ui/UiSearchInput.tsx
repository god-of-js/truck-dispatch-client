import styled from 'styled-components';
import sizes from 'utils/sizes';
import UiButton from './UiButton';
import UiIcon from './UiIcon';
import UiInput from './UiInput';

interface Props {
  handleQueryChange: (value: { name: string; value: string | null }) => void;
  searchQuery: string | null;
}
export default function UiSearchInput({
  searchQuery,
  handleQueryChange,
}: Props) {
  return (
    <SearchInputContainer>
      <UiInput
        onChange={handleQueryChange}
        value={searchQuery}
        name="searchQuery"
        placeholder="Search..."
        icon="Search"
        size="md"
      />
      <UiButton variant="icon-neutral" size="large">
        <UiIcon icon="Search" size="24" />
      </UiButton>
    </SearchInputContainer>
  );
}

const SearchInputContainer = styled.span`
  .ui-field {
    display: none;
  }

  @media screen and (min-width: ${sizes.mobileSmall}) {
    .ui-field {
      display: block;
    }

    button {
      display: none !important;
    }
  }
`;
