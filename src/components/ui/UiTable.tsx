import React, { lazy } from 'react';
import styled from 'styled-components';
import UidropdownMenu, { DropDownData } from './UiDropdownMenu';
import { Icons } from './UiIcon';

const UiEmptyList = lazy(() => import('./UiEmptyList'));
interface Header {
  title: string;
  /** This field would be used to query the data object for how the data should be displayed.
   * It should be the same as the key of the key-value pair in the array.
   */
  query: string;
}
interface Row extends Record<string, any> {
  _id: string;
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
  options?: DropDownData[] | ((tripStatus: Row) => DropDownData[]);
  onRowClick?: (id: string) => void;
  emptyTableIcon?: Icons;
  emptyTableText?: string;
  emptyTableBtnContent?: React.ReactNode;
  emptyTableAction?: () => void;
}

export default function UiTable({
  data,
  headers,
  options,
  emptyTableIcon,
  emptyTableText,
  emptyTableBtnContent,
  emptyTableAction,
  onRowClick,
}: Props) {
  const tableHeaders = options
    ? [...headers, { title: '', query: 'actions' }]
    : headers;

  return (
    <TableContainer>
      <Table>
        <TableHeader>
          <TableRow isHeader>
            {tableHeaders.map((header, index) => (
              <TableHeadItem key={index} isMenu={!header.title}>
                {header.title}
              </TableHeadItem>
            ))}
          </TableRow>
        </TableHeader>
        <tbody>
          {data.map((item) => {
            return (
              <TableRow key={item._id}>
                {headers.map((header, index) => {
                  return (
                    <TableDataItem
                      key={index}
                      onClick={() => onRowClick?.(item._id)}
                    >
                      <div>{item[header.query]}</div>
                    </TableDataItem>
                  );
                })}

                {options && (
                  <TableDataItem isMenu>
                    <div className="menu-container">
                      <UidropdownMenu
                        options={
                          typeof options === 'function'
                            ? options(item)
                            : options
                        }
                        itemId={item._id}
                      />
                    </div>
                  </TableDataItem>
                )}
              </TableRow>
            );
          })}
        </tbody>
      </Table>

      {!data.length && (
        <UiEmptyList
          emptyBtnContent={emptyTableBtnContent}
          emptyIcon={emptyTableIcon}
          emptyText={emptyTableText}
          onActionButtonClick={emptyTableAction}
        />
      )}
    </TableContainer>
  );
}

const TableContainer = styled.div`
  overflow-x: auto;
  /* TODO: figure out why  */
  padding-bottom: 120px;
  position: relative;
`;

const Table = styled.table`
  table-layout: fixed;
  width: 100%;
  min-width:1200px;
  border-spacing:0px 8px;
`;

const TableHeader = styled.thead`
  width: 100%;
`;

const TableRow = styled.tr<{ isHeader?: boolean }>`
  text-align: left;
  cursor: pointer;
  margin-bottom:20px;
  overflow: hidden;
  background: ${({ isHeader }) =>
    isHeader ? 'var(--color-primary-10)' : '#ffffff'};

  td,
  th {
    &:last-child {
      border-top-right-radius:8px;
      border-bottom-right-radius:8px;
      height: 100%;

      .menu-container {
        width:32px;
        margin-left: auto;
      }
    }
    &:first-child {
      border-top-left-radius:8px;
      border-bottom-left-radius:8px;
    }
  }
`;

const TableHeadItem = styled.th<{ isMenu: boolean }>`
  height: 48px;
  padding: 0 24px;
  color: var(--color-gray-70);
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  ${({ isMenu }) => isMenu && 'width:24px'};
`;

const TableDataItem = styled.td<{ isMenu?: boolean }>`
  padding:26px 24px;
  color: var(--color-neutralBlack);
  font-size: 14px;
  line-height: 16px;
  font-style: normal;
  font-weight: 400;
  ${({ isMenu }) => (isMenu ? 'width:24px;' : 'overflow-x: hidden;')}
`;
