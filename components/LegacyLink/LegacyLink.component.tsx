import React, { FC, ReactNode } from 'react'

const LegacyLink: FC<{
  href: string,
  children: ReactNode,
  [key:string]: unknown;
}> = ({ href, children, ...props }) => {
  if (!href) return (<>{children}</>)
  return (
    <a
      {...props}
      href={`${
        process.env.NODE_ENV === 'development'
          ? 'http://manager.nocnoc.local:88'
          : location.origin
      }${href}`}
    >
      {children}
    </a>
  )
}
export default LegacyLink
