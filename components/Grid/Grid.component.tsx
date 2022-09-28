import React, { FC, ReactNode } from 'react'

import Loader from '../Loader/Loader.component'

import styles from './Grid.component.module.scss'

export type PrimitiveValue = string | number | boolean | null | undefined

export interface Row {
  [key: string]: PrimitiveValue
}

export interface Column {
  title?: string | ReactNode
  field: string | ((row: Row) => PrimitiveValue | ReactNode)
  width?: string
}

const Grid: FC<{
  columns: Column[],
  rows: Row[] | null,
  gridKey: (row: Row) => string,
  emptyMessage?: ReactNode
}> = ({ columns, rows, gridKey, emptyMessage }) => (
  <div
    className={styles.grid}
    style={{
      gridTemplateColumns: columns.map(({ width = '1fr' }) => width).join(' ')
    }}
  >
    {columns.map(({ title }, index) => (
      <div key={`${title}-${index}`} className={styles.header}>{title}</div>
    ))}
    < div className={styles.separator} />
    {
      rows && rows.length === 0
        ? (<div className={styles.emptyState}>
          {emptyMessage || 'There are no items to show'}
        </div>)
        : ''
    }
    {
      rows?.map((row) => columns.map((
        { field }, columnIndex) => (
        <div key={`${gridKey(row)} ${columnIndex}`}>
          {typeof field === 'string' ? row[field] : field(row)}
        </div>
      )
      )) || <div className={styles.loadingState}><Loader /></div>
    }
  </div>
)

export default Grid
