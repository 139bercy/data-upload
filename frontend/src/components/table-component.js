import React, { useMemo, useState } from "react";
import { useGlobalFilter, useSortBy, useTable } from "react-table";

export default function Table({ columns, data }) {
  const [filterInput, setFilterInput] = useState("");

  const columnsMemo = useMemo(
    () => columns,
    [columns]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter
  } = useTable(
    {
      columns: columnsMemo,
      data: data
    },
    useGlobalFilter,
    useSortBy
  );

  const handleFilterChange = e => {
    const value = e.target.value || "";
    console.log(value);
    setGlobalFilter(value);
    setFilterInput(value);
  };

  return (
    <>
      <div className="input-group mb-3">
        <input
          className="form-control"
          value={filterInput}
          onChange={handleFilterChange}
          placeholder={"Rechercher..."}
        />
      </div>
      <table className="table table-bordered table-striped text-center" {...getTableProps()}>
        <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                className={
                  column.isSorted
                    ? column.isSortedDesc
                    ? "sort-desc"
                    : "sort-asc"
                    : ""
                }
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
        </thead>
        <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);

          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                );
              })}
            </tr>
          );
        })}
        </tbody>
      </table>
    </>
  );
}
