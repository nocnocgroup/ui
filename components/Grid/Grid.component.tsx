import React, { ReactNode } from 'react'

import Loader from '../Loader/Loader.component'

import styles from './Grid.component.module.scss'

// Row default for backward compatibility
export interface Column<T> {
  title?: string | ReactNode
  field: ((row: T) => ReactNode)
  width?: string
}

// Row default for backward compatibility
const Grid = <T, >({ columns, rows, rowKey, emptyMessage }: {
  columns: Column<T>[],
  rows: T[] | null,
  rowKey: (row: T) => React.Key,
  emptyMessage?: ReactNode
}) => (
    <table className={styles.grid}>
      <thead>
        <tr>
          {columns.map(({ title, width }, index) => (
            <th
              key={`${title}-${index}`}
              className={styles.cell}
              style={{ width: width || '' }}
            >
              {title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {
          rows && rows.length === 0
            ? (
              <tr className={styles.emptyState}>
                <td colSpan={columns.length}>
                  {emptyMessage || 'There are no items to show'}
                </td>
              </tr>
            )
            : undefined
        }
        {
          rows?.map((row) => (
            <tr key={`${rowKey(row)}`} className={styles.data}>
              {columns.map(({ field }, columnIndex) => (
                <td key={columnIndex} className={styles.cell}>{field(row)}</td>
              ))}
            </tr>
          )) || (
            <tr className={styles.emptyState}>
              <td colSpan={columns.length}>
                <div className={styles.loadingState}>
                  <Loader />
                </div>
              </td>
            </tr>
          )
        }
      </tbody>
    </table>
  )

export default Grid
