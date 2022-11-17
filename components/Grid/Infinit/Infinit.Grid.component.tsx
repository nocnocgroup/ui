import React, { Key, ReactNode } from 'react'

import Button from '../../Button'
import Loader from '../../Loader'
import Grid, { Column } from '../Grid.component'

import styles from './Infinit.Grid.component.module.scss'

interface Params<T> {
  columns: Column<T>[],
  rows: T[] | null,
  loading: boolean,
  hasMore: boolean | null,
  onBottomReach: () => void,
  rowKey: (row: T) => Key,
  emptyMessage?: ReactNode,
}

const InfinitGrid = <T, >({
  columns,
  rows,
  loading,
  hasMore,
  onBottomReach: bottomReachHandler,
  rowKey,
  emptyMessage
}: Params<T>) => {
  return (
    <>
      <Grid
        columns={columns}
        rows={rows}
        rowKey={rowKey}
        emptyMessage={emptyMessage}
      />
      <div className={styles.gridBottom}>
        {rows && loading && <Loader />}
        {hasMore && !loading && (
          <Button
            primary
            compact
            loading={loading}
            onClick={bottomReachHandler}
          >
            Load more items
          </Button>
        )}
      </div>
    </>
  )
}

export default InfinitGrid
