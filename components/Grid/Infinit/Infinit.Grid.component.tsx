import React, { Key, ReactNode } from 'react'

import Button from '../../Button'
import Grid, { Column } from '../Grid.component'

import styles from './Infinit.Grid.component.module.scss'

interface Params<T> {
  columns: Column<T>[],
  rows: T[] | null,
  loading: boolean,
  hasMore: boolean | null,
  loadMoreItemsText?: string,
  onBottomReach: () => void,
  rowKey: (row: T) => Key,
  emptyMessage?: ReactNode,
}

const InfinitGrid = <T, >({
  columns,
  rows,
  loading,
  hasMore,
  loadMoreItemsText = 'Load more items',
  onBottomReach: bottomReachHandler,
  rowKey,
  emptyMessage
}: Params<T>) => {
  return (
    <>
      <Grid
        columns={columns}
        rows={rows}
        loading={loading}
        rowKey={rowKey}
        emptyMessage={emptyMessage}
      />
      <div className={styles.gridBottom}>
        {hasMore && !loading && (
          <Button
            primary
            compact
            loading={loading}
            onClick={bottomReachHandler}
          >
            {loadMoreItemsText}
          </Button>
        )}
      </div>
    </>
  )
}

export default InfinitGrid
