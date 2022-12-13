import React, { ReactNode } from 'react'

import Loader from '../Loader/Loader.component'

import styles from './Grid.component.module.scss'

// Row default for backward compatibility
export interface Column<T> {
  title?: string | ReactNode
  field: ((row: T) => ReactNode)
  width?: string
}

interface Props<T> {
  columns: Column<T>[],
  rows: T[] | null,
  rowKey: (row: T) => React.Key,
  loading?: boolean,
  emptyMessage?: ReactNode
}

// Row default for backward compatibility
const Grid = <T, >({
  columns,
  rows,
  rowKey,
  loading = false,
  emptyMessage = 'There are no items to show'
}: Props<T>) => (
    <table className={styles.table}>
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
          rows?.map((row) => (
            <tr key={`${rowKey(row)}`} className={styles.data}>
              {columns.map(({ field }, columnIndex) => (
                <td key={columnIndex} className={styles.cell}>{field(row)}</td>
              ))}
            </tr>
          ))
        }
        {
          rows && !rows.length && (
            <tr className={styles.emptyState}>
              <td colSpan={columns.length}>
                {emptyMessage}
              </td>
            </tr>
          )
        }
        {
          loading && (
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
