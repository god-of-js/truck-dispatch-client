import React, { ReactNode } from 'react';
import styled from 'styled-components';
import sizes from 'utils/sizes';
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
  options?: DropDownData[];
  onRowClick?: (id: string) => void;
  noDataHeaderText?: string;
  noDataImage?: Icons;
  noDataParagraphText?: string;
  noDataPlaceHolder?: ReactNode;
}

export default function UiTable({
  data,
  headers,
  options,
  onRowClick,
  noDataImage = 'NoData',
  noDataParagraphText = 'You Have No Data',
  noDataPlaceHolder,
}: Props) {
  const tableHeaders = options
    ? [...headers, { title: '', query: 'actions' }]
    : headers;

  function emptyTablePlaceholder() {
    return (
      <NoDataBox>
        {noDataPlaceHolder ? (
          noDataPlaceHolder
        ) : (
          <>
            <div className="icon-container">
              <UiIcon icon={noDataImage} size="160" />
            </div>
            <p className="no-data-text">{noDataParagraphText}</p>
          </>
        )}
      </NoDataBox>
    );
  }

  return (
    <TableContainer>
      <Table>
        <TableHeader>
          <TableRow>
            {tableHeaders.map((header, index) => (
              <TableHeadItem key={index}>{header.title}</TableHeadItem>
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
                      <div className="mobile-title">{header.title}</div>
                      <div>{item[header.query]}</div>
                    </TableDataItem>
                  );
                })}
                {options && (
                  <td className="menu-container">
                    <UidropdownMenu options={options} itemId={item._id} />
                  </td>
                )}
              </TableRow>
            );
          })}
        </tbody>
      </Table>

      {!data.length && emptyTablePlaceholder()}
    </TableContainer>
  );
}

const TableContainer = styled.div`
  border: none;
`;

const Table = styled.table`
  position: relative;
  table-layout: fixed;
  width: 100%;
  border-spacing: ${pxToRem(0)} ${pxToRem(8)};
`;

const TableHeader = styled.thead`
  display: none;

  @media only screen and (min-width: ${sizes.laptopSmallWidth}) {
    display: table-header-group;
    width: 100%;
    border-bottom: ${pxToRem(1)} solid var(--color-gray-200);
  }
`;

const TableRow = styled.tr`
  border-bottom: ${pxToRem(1)} solid var(--color-gray-200);
  text-align: left;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: ${pxToRem(20)};

  .mobile-title {
    font-size: ${pxToRem(12)};
  }

  .menu-container {
    height: 98.5%;
    width: fit-content;
    position: absolute;
    background: #ffffff;
    display: flex;
    align-items: flex-start;
    right: 0;
    @media only screen and (min-width: ${sizes.laptopSmallWidth}) {
      align-items: center;
      justify-content: flex-end;
      width: 13%;
    }
  }

  @media only screen and (min-width: ${sizes.laptopSmallWidth}) {
    display: table-row;

    td,
    th {
      &:last-child {
        border-top-right-radius: ${pxToRem(8)};
        border-bottom-right-radius: ${pxToRem(8)};
      }
      &:first-child {
        border-top-left-radius: ${pxToRem(8)};
        border-bottom-left-radius: ${pxToRem(8)};
      }
    }

    .mobile-title {
      display: none;
    }
  }
  &:last-child {
    border-bottom: transparent;
  }
`;

const TableHeadItem = styled.th`
  padding: ${pxToRem(12)} ${pxToRem(24)};
  color: var(--color-gray-500);
  background: #f2f0fb;
  font-size: ${pxToRem(12)};
`;

const TableDataItem = styled.td`
  padding: ${pxToRem(12)} ${pxToRem(24)};
  color: var(--color-gray-500);
  font-weight: 700;
  font-size: ${pxToRem(14)};
  line-height: ${pxToRem(20)};
  background: #ffffff;
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
    font-weight: 400;
    width: 80%;
    font-size: ${pxToRem(18)};
    @media only screen and (min-width: ${sizes.laptopSmallWidth}) {
      width: 40%;
    }
  }
`;
