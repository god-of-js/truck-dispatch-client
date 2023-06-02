import React, { ReactNode } from 'react';
import styled from 'styled-components';
import sizes from 'utils/sizes';
import UiButton from './UiButton';
import UidropdownMenu, { DropDownData } from './UiDropdownMenu';
import UiIcon, { Icons } from './UiIcon';

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
}

export default function UiTable({
  data,
  headers,
  options,
  emptyTableIcon,
  emptyTableText,
  emptyTableBtnContent,
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
        <div className="empty-container">
          <div className="icon-container">
            <div className="icon-container__inner">
              <UiIcon icon={emptyTableIcon!} size="60" />
            </div>
          </div>
          <p>{emptyTableText}</p>
          <UiButton size="large">{emptyTableBtnContent}</UiButton>
        </div>
      )}
    </TableContainer>
  );
}

const TableContainer = styled.div`
  overflow: auto;
  position: relative;

  .empty-container {
    height: 60vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .icon-container {
      padding: ${pxToRem(32)};
      width: ${pxToRem(192)};
      height: ${pxToRem(192)};
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--color-gray-30);
      border-radius: 50%;

      &__inner {
        padding: ${pxToRem(32)};
        width: ${pxToRem(128)};
        height: ${pxToRem(128)};
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--color-gray-50);
        border-radius: 50%;
      }
    }
    p {
      font-style: normal;
      font-weight: 400;
      font-size: ${pxToRem(24)};
      line-height: 140%;
      text-align: center;
      letter-spacing: -0.02em;
      color: var(--color-gray-80);
      max-width: ${pxToRem(360)};
    }
  }
`;
const Table = styled.table`
  table-layout: fixed;
  width: 100%;
  min-width: ${pxToRem(1200)};
  border-spacing: ${pxToRem(0)} ${pxToRem(8)};
`;

const TableHeader = styled.thead`
  width: 100%;
`;

const TableRow = styled.tr<{ isHeader?: boolean }>`
  text-align: left;
  cursor: pointer;
  margin-bottom: ${pxToRem(20)};
  overflow: hidden;
  background: ${({ isHeader }) =>
    isHeader ? 'var(--color-primary-10)' : '#ffffff'};

  td,
  th {
    &:last-child {
      border-top-right-radius: ${pxToRem(8)};
      border-bottom-right-radius: ${pxToRem(8)};
      height: 100%;

      .menu-container {
        width: ${pxToRem(32)};
        margin-left: auto;
      }
    }
    &:first-child {
      border-top-left-radius: ${pxToRem(8)};
      border-bottom-left-radius: ${pxToRem(8)};
    }
  }
`;

const TableHeadItem = styled.th<{ isMenu: boolean }>`
  height: ${pxToRem(48)};
  padding: 0 ${pxToRem(24)};
  color: var(--color-gray-70);
  font-size: ${pxToRem(14)};
  font-style: normal;
  font-weight: 600;
  ${({ isMenu }) => isMenu && `width: ${pxToRem(24)}`};
`;

const TableDataItem = styled.td<{ isMenu?: boolean }>`
  padding: ${pxToRem(26)} ${pxToRem(24)};
  color: var(--color-neutralBlack);
  font-size: ${pxToRem(14)};
  line-height: ${pxToRem(16)};
  font-style: normal;
  font-weight: 400;
  ${({ isMenu }) => isMenu && `width: ${pxToRem(24)};`}
`;

const NoDataBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: ${pxToRem(400)};
  width: 100%;
  text-align: center;

  h3,
  .icon-container {
    color: var(--color-gray-500);
  }

  .no-data-text {
    color: var(--color-gray-500);
    font-weight: 700;
    width: 80%;
    font-size: ${pxToRem(14)};
    @media only screen and (min-width: ${sizes.laptopSmallWidth}) {
      width: 40%;
    }
  }
`;
