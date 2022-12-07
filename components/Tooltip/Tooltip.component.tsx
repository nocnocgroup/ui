import React, { ReactNode, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'

import { Stylable } from '../types'

import styles from './Tooltip.component.module.scss'

interface Props extends Stylable {
  message: string
  children?: ReactNode
}
const Tooltip = ({ message, children, className = '', style = {} }: Props) => {
  const [show, setShow] = useState(false)
  const tooltip = useRef(null)

  return (
    <div
      className={`${styles.wrapper} ${className}`}
      onMouseEnter={() => setShow(true)}
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
        setShow(true)
      }}
      onMouseLeave={() => setShow(false)}
    >
      {children || <svg
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0
          1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="
          m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738
          3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252
          1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275
          0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0
          1 1 0 0 1 2 0z"/>
      </svg>}
      <CSSTransition
        nodeRef={tooltip}
        in={show}
        timeout={200}
        classNames={{
          enter: styles.enter,
          enterActive: styles.enterActive,
          exitActive: styles.exitActive,
          exit: styles.exit
        }}
        unmountOnExit
        mountOnEnter
      >
        <div ref={tooltip} className={styles.tooltip} style={style}>
          <div className={styles.message}>{message}</div>
          <div className={styles.pointer} />
        </div>
      </CSSTransition>
    </div>
  )
}

export default Tooltip
