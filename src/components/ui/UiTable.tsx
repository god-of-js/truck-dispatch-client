import React from 'react';
import styled from 'styled-components';

interface Header {
  title: string;
  /** This field would be used to query the data object for how the data should be displayed.
   * It should be the same as the key of the key-value pair in the array.
   */
  query: string;
}
interface Props {
  // Any is forbidden in this codebase. However, for the sake of the flexibility this component needs,
  // it's required that we disable the type checks to make it truly dynamic.
  /**
   * This field is used to pass in data that would be displayed by the custom table.
   * This field would be queried through the query parameter placed in the header of the table column.
   * Hence, it needs to be the same as the
   */
  data: Record<string, any>[];
  headers: Header[];
  options: [];
  children?: React.ReactNode[];
  ComponentProps?: Record<string, React.ReactNode>;
}

export const UiTable: React.FC<Props> = ({ data, headers, options = [] }) => {
  return (
    <div>
      <table>
        <tr>
          {headers.map((header) => (
            <th>{header.title}</th>
          ))}
        </tr>

        {data.map((item) => {
          return (
            <tr>
              {headers.map((header) => {
                return <td>{item[header.query]}</td>;
              })}
            </tr>
          );
        })}
      </table>
    </div>
  );
};
