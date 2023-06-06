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
  return <SearchInputContainer></SearchInputContainer>;
}

const SearchInputContainer = styled.span``;
