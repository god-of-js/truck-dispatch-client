import React from 'react';
import styled from 'styled-components';

interface Header {
  title: string;
  /** This field would be used to query the data object for how the data should be displayed.
   * It should be the same as the key of the key-value pair in the array.
   */
  query: string;
}
interface Row extends Record<string, any> {
  id: string;
}
interface Props {
  // Any is forbidden in this codebase. However, for the sake of the flexibility this component needs,
  // it's required that we disable the type checks to make it truly dynamic.
  /**
   * This field is used to pass in data that would be displayed by the custom table.
   * This field would be queried through the query parameter placed in the header of the table column.
   * Hence, it needs to be the same as the
   */
  tableTitle: string;
  data: Row[];
  headers: Header[];
  options: [];
  onRowClick: (id: string) => void;
}

export default function UiTable({
  tableTitle,
  data,
  headers,
  options = [],
  onRowClick,
}: Props) {
  return (
    <TableContainer>
      <TableContainerHeader>
        <TableTitle>{tableTitle}</TableTitle>
      </TableContainerHeader>
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHeadItem key={index}>{header.title}</TableHeadItem>
            ))}
          </TableRow>
        </TableHeader>
        <tbody>
          {data.map((item) => {
            return (
              <TableRow key={item.id} onClick={() => onRowClick(item.id)}>
                {headers.map((header, index) => {
                  return (
                    <TableDataItem key={index}>
                      {item[header.query]}
                    </TableDataItem>
                  );
                })}
              </TableRow>
            );
          })}
        </tbody>
      </Table>
    </TableContainer>
  );
}

const TableContainer = styled.div`
  border: 1px solid var(--color-gray-200);
  background: #ffffff;
`;

const TableContainerHeader = styled.header`
  border-bottom: 1px solid var(--color-gray-200);
`;
const TableTitle = styled.h2`
  padding: 0 ${pxToRem(12)};
  font-weight: 700;
  font-size: ${pxToRem(16)};
  line-height: ${pxToRem(28)};
  text-transform: uppercase;
  color: var(--color-gray-900);
`;

const Table = styled.table`
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  border-bottom: ${pxToRem(1)} solid var(--color-gray-200);
`;

const TableRow = styled.tr`
  border-bottom: ${pxToRem(1)} solid var(--color-gray-200);
  text-align: left;
  cursor: pointer;
  &:last-child {
    border-bottom: transparent;
  }
`;

const TableHeadItem = styled.th`
  padding: ${pxToRem(12)} ${pxToRem(24)};
  background: var(--color-gray-50);
  color: var(--color-gray-500);
  font-size: ${pxToRem(12)};
`;

const TableDataItem = styled.td`
  padding: ${pxToRem(12)} ${pxToRem(24)};
  color: var(--color-gray-500);
  font-weight: 700;
  font-size: ${pxToRem(14)};
  line-height: ${pxToRem(20)};
`;
