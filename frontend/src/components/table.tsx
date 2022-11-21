import React, { useMemo } from 'react';
import { useTable, useSortBy } from 'react-table'; 

import "./table.css";

const Table: any = ({ data }: any) =>
{
    const columns = useMemo(() => [
        {
            Header: "Usuario Debitado",
            accessor: "debitedUsername"
        },
        {
            Header: "Usuario Creditado",
            accessor: "creditedUsername"
        },
        {
            Header: "Valor",
            accessor: "value"
        },
        {
            Header: "Data",
            accessor: "date",
            sortDescFirst: true
        },
    ], []);
    
    const { 
        getTableProps, 
        getTableBodyProps, 
        headerGroups, 
        rows, 
        prepareRow
    } =
        useTable({ columns, data }, useSortBy);
    return (
        <>
        <table className="styled-table" {...getTableProps()}>
                <thead>
                {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </td>
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

export default Table;