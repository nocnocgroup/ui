export type FileStatus =
  'CREATED' |
  'PROCESSING' |
  'PROCESSED_OK' |
  'COMPLETED' |
  'COMPLETED_WITH_ERRORS'

export interface File {
  id: string
  file_key: string
  original_filename: string
  status: FileStatus
  type: 'update-product' | 'seller-product-asin' | 'seller-product'
  created_date: string
  updated_date: string
}

export type LineStatus =
  'CREATED' |
  'PROCESSING' |
  'PROCESSED_OK' |
  'PROCESSED_WITH_ERRORS'

export interface Line {
  id: string
  sid: string
  details: string
  line: number
  status: LineStatus
  created_date: string
  updated_date: string
}

export interface LinesResponse {
  lines: Line[]
  size: number
  last_key: string
}
