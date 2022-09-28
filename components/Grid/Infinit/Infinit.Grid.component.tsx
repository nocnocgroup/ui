import React, { FC, ReactNode } from 'react'
import Button from '../../Button'
import Loader from '../../Loader'

import Grid, { Column, Row } from '../Grid.component'

import styles from './Infinit.Grid.component.module.scss'

const InfinitGrid: FC<{
  columns: Column[],
  rows: Row[] | null,
  loading: boolean,
  hasMore: boolean | null,
  onBottomReach: () => void,
  rowKey: (row: Row) => string,
  emptyMessage?: ReactNode,
}> = ({
  columns,
  rows,
  loading,
  hasMore,
  onBottomReach: bottomReachHandler,
  rowKey,
  emptyMessage
}) => {
  return (
    <>
      <Grid
        columns={columns}
        rows={rows}
        gridKey={rowKey}
        emptyMessage={emptyMessage}
      />
      {hasMore && <div className={styles.gridBottom}>
        {loading
          ? <Loader />
          : <Button
            primary
            compact
            loading={loading}
            onClick={bottomReachHandler}
          >Load more items</Button>
        }
      </div>}
    </>
  )
}

export default InfinitGrid
