'use client'

import {TableStyle} from "../styles";
import {clsx} from "clsx";

export type TableCellType = { label: string, type?: 'info' | 'data' }
export type TableRowType = TableCellType[]
export type TableType = TableRowType[]
export type TableProps = {
    table: TableType,
}

function TableCell({cell}: { cell: TableCellType }) {
    let className
    switch (cell.type) {
        case 'info':
            className = clsx(TableStyle.cell, TableStyle.info)
            break;
        case 'data':
        default:
            className = clsx(TableStyle.cell, TableStyle.data)
            break;
    }
    return <td className={className}>{cell.label}</td>
}

function TableRow({row}: { row: TableRowType }) {
    return <tr className={TableStyle.row}>{row.map((cell, i) => <TableCell cell={cell} key={i}/>)}</tr>
}

export default function Table({table}: TableProps) {
    return (
        <table className={TableStyle.table}>
            <tbody>
            {table.map((row, i) => <TableRow row={row} key={i}/>)}
            </tbody>
        </table>
    )
}