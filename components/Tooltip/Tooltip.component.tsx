import React, { FC, ReactNode, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'

import styles from './Tooltip.component.module.scss'

const Tooltip: FC<{
  message: string,
  children: ReactNode
}> = ({ message, children }) => {
  const [show, setShow] = useState(false)
  const tooltip = useRef(null)

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={() => setShow(true)}
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
        setShow(true)
      }}
      onMouseLeave={() => setShow(false)}
    >
      {children}
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
        <div ref={tooltip} className={styles.tooltip}>
          <div className={styles.message}>{message}</div>
          <div className={styles.pointer} />
        </div>
      </CSSTransition>
    </div>
  )
}

export default Tooltip
