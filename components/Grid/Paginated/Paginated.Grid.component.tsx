import React, { Key, ReactNode, CSSProperties } from 'react'

import Button from '../../Button'
import Grid, { Column } from '../Grid.component'

import styles from './Paginated.Grid.component.module.scss'

const itemsPerPage = [10, 25, 50, 100, 500]

// TODO: define a className and style interface
interface Props<T> {
  columns: Column<T>[]
  rows: T[] | null
  total: number
  loading: boolean,
  pageSize: number
  page: number
  onPageChange: (page: number, pageSize: number) => void
  rowKey: (row: T) => Key
  emptyMessage?: ReactNode
  style?: CSSProperties
  className?: string
  children?: ReactNode
}

const PaginatedGrid = <T, >({
  columns,
  rows,
  total,
  onPageChange,
  loading,
  rowKey,
  pageSize = 100,
  page = 0,
  emptyMessage,
  style = {},
  className = '',
  children
}: Props<T>) => {
  const totalPages = Math.ceil(total / pageSize)

  let pages: number[] = []
  if (totalPages > 6) {
    const pagesSet = new Set([
      0,
      1,
      page - 1,
      page,
      page + 1,
      totalPages - 2,
      totalPages - 1
    ])
    pages = Array.from(pagesSet)
      .filter((page) => page >= 0 && page < totalPages)
      .sort((a, b) => a - b)
  } else {
    pages = Array.from({ length: totalPages }, (_, i) => i)
  }

  const pagesElems: ReactNode[] = []
  for (let i = 0; i < pages.length; i++) {
    if (i > 0 && pages[i - 1] + 1 < pages[i]) {
      pagesElems.push((
        <div
          className={styles.threeDots}
          key={`${i}-...`}
        >
          ...
        </div>
      ))
    }

    pagesElems.push((
      <Button
        compact
        primary={pages[i] === page}
        key={`${i}-${pages[i]}`}
        onClick={() => onPageChange(pages[i], pageSize)}
      >
        {pages[i] + 1}
      </Button>
    ))
  }

  const pageAndOptionalActions = (
    <div className={styles.pageAndOptionalActions}>
      <div>
        Items per page:
        <select
          value={pageSize}
          onChange={
            (event) => onPageChange(0, parseInt(event.target.value))
          }
          className={styles.pageSizeSelect}
        >
          {itemsPerPage.map((itemPerPage) => (
            <option
              key={itemPerPage}
              value={itemPerPage}
            >
              {itemPerPage}
            </option>
          ))}
        </select>
      </div>
      {children && <div>
        { children }
      </div>}
    </div>
  )

  return (
    <div style={style} className={className}>
      <Grid
        columns={columns}
        loading={loading}
        rows={rows}
        rowKey={rowKey}
        emptyMessage={emptyMessage}
      />
      <div className={styles.pageActions}>
        <div>
          Total: {total}
        </div>
        <div>
          {totalPages > 1 && (<div className={styles.pagesList}>
            <Button
              compact
              icon='Arrow-Left-2'
              onClick={() => onPageChange(
                Math.max(page - 1, 0), pageSize
              )}
            />
            {pagesElems}
            <Button
              compact
              icon='Arrow-Right-2'
              onClick={() => onPageChange(
                Math.min(page + 1, totalPages - 1), pageSize
              )}
            />
          </div>)
          }
        </div>
        {pageAndOptionalActions}
      </div>
    </div>
  )
}

export default PaginatedGrid
