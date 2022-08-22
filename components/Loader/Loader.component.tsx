import React, { FC } from 'react'

import './Loader.component.scss'

const Loader: FC<{ loading?: boolean, forPrimary?: boolean }> = (
  { loading = true, forPrimary }
) => (
  <div
    className="loader"
    style={{ display: loading ? 'block' : 'none' }}
  >
    <svg
      viewBox="0 0 198 198"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="99"
        cy="99"
        r="81.5"
        stroke={forPrimary ? '#c8c8ff' : '#D9D9D9'}
        strokeWidth="35"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M99 163C63.6538 163 35 134.346 35 99C35 63.6538 63.6538 35 99
        35C134.346 35 163 63.6538 163 99H198C198 44.3238 153.676 0 99 0C44.3238
        0 0 44.3238 0 99C0 153.676 44.3238 198 99 198V163Z"
        fill={forPrimary ? 'white' : '#2F37AE'}
      />
    </svg>
  </div>
)

export default Loader
