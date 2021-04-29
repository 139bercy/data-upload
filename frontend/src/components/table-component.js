import React, { useState, useMemo } from "react";
import { useTable, useFilters, useSortBy } from "react-table";

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
        setFilter
    } = useTable(
        {
            columns: columnsMemo,
            data: data
        },
        useFilters,
        useSortBy
    );

    const handleFilterChange = e => {
        const value = e.target.value || undefined;
        setFilter("show.name", value);
        setFilterInput(value);
      };

    return (
    <>
        <input
        value={filterInput}
        onChange={handleFilterChange}
        placeholder={"Search..."}
        />
        <table {...getTableProps()}>
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
            {rows.map((row, i) => {
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
