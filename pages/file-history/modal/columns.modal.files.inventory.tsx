import React from 'react'

import StatusBadge from '../components/file.inventory.badges'
import { Line } from '../types.file.inventory'

export const buildFileLinesColumn = (t: (k:string) => string) => [
  {
    title: t('line') + ' ⌄',
    field: (fileLine: Line) => fileLine.line,
    width: '80px'
  },
  {
    title: t('processed_status'),
    field: (fileLine: Line) => <StatusBadge status={fileLine.status} />,
    width: '250px'
  },
  {
    title: t('details'),
    field: (fileLine: Line) => {
      let details = (<span>-</span>)
      const detailsRaw = fileLine.details
      if (detailsRaw) {
        let detailsJson
        try {
          detailsJson = JSON.parse(detailsRaw)
        } catch {
          if (fileLine.status === 'PROCESSED_OK') {
            detailsJson = {
              errors: { General: detailsRaw },
              message: 'Line processed with errors.'
            }
          } else {
            detailsJson = { message: detailsRaw, errors: {} }
          }
        }
        if (typeof detailsJson === 'string') {
          details = (<b>{detailsJson}</b>)
        } else {
          // is an object
          details = (
            <>
              {detailsJson.message && <div><b>{detailsJson.message}</b></div>}
              {
                detailsJson.errors && Object.entries(detailsJson.errors).map(
                  ([errorKey, errorValue]) => (
                    <div key={errorKey}>
                      <b>[{errorKey}]</b> {errorValue as string}
                    </div>
                  )
                )
              }
            </>
          )
        }
      }
      return details
    }
  }
]
