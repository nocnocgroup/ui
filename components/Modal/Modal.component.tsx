import React, { FC, useEffect, CSSProperties, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'

import styles from './Modal.component.module.scss'

const Modal: FC<{
  show?: boolean,
  compact?: boolean
  overflowAuto?: boolean,
  children?: React.ReactNode,
  className?: string,
  closeWhite?: boolean
  style?: CSSProperties
  onDismiss?: () => void
}> = ({
  show = true,
  onDismiss,
  compact = false,
  overflowAuto = true,
  children,
  className = '',
  closeWhite = false,
  style = {}
}) => {
  const modal = useRef(null)
  const modalOverlay = useRef(null)

  useEffect(() => {
    const keyupHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onDismiss && onDismiss()
      }
    }
    document.addEventListener('keyup', keyupHandler)

    return () => {
      document.removeEventListener('keyup', keyupHandler)
    }
  }, [])

  return (
    <>
      <CSSTransition
        nodeRef={modalOverlay}
        in={show}
        timeout={200}
        classNames={{
          enter: styles.overlayEnter,
          enterActive: styles.overlayEnterActive,
          exitActive: styles.overlayExitActive,
          exit: styles.overlayExit
        }}
        unmountOnExit
        mountOnEnter
      >
        <div
          ref={modalOverlay}
          className={styles.modalOverlay}
          onClick={onDismiss}
        />
      </CSSTransition>
      <CSSTransition
        nodeRef={modal}
        in={show}
        timeout={300}
        classNames={{
          enter: styles.modalEnter,
          enterActive: styles.modalEnterActive,
          exitActive: styles.modalExitActive,
          exit: styles.modalExit
        }}
        unmountOnExit
        mountOnEnter
      >
        <div
          ref={modal}
          className={`
            ${styles.modal}
            ${compact ? styles.compact : ''}
            ${overflowAuto ? styles.overflowAuto : ''}
            ${className}
          `}
          style={style}
        >
          {onDismiss &&
            <div
              className={`${styles.close} ${closeWhite ? styles.black : ''}`}
              onClick={onDismiss}
            >
              +
            </div>}
          {children}
        </div>
      </CSSTransition>
    </>
  )
}

export default Modal
