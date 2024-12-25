"use client"

import React, { useState, useRef, useEffect } from 'react';

interface WalletModalProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export const WalletModal = ({ title, isOpen = false, onClose, children }: WalletModalProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      const timeoutId = setTimeout(() => {
        setIsAnimating(false);
      }, 300); // Adjust duration as needed

      return () => clearTimeout(timeoutId);
    }
  }, [isOpen]);

  const handleClose = () => {
    onClose && onClose();
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === modalRef.current) {
      handleClose();
    }
  };

  const modalStyle: React.CSSProperties = {
    display: isOpen ? 'block' : 'none',
    opacity: isAnimating ? 1 : 0,
    transition: 'opacity 0.3s ease-in-out',
  };

  return (
    <>
      <div className="fixed full-screen top-0 right-0 backdrop-blur-sm bg-background/80" style={modalStyle}></div>
      <div ref={modalRef} className="fixed bg-grayscale-000 rounded-lg shadow-lg p-4 inset-x-1/2 pwc-modal" style={modalStyle} onClick={handleOverlayClick}>
        <div onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
          <div className='flex items-center justify-between px-2'>
            <div className="font-semibold">{title}</div>
            <button onClick={handleClose} className={"pol-connect-wallet"}>
              <svg aria-hidden="true" focusable="false" viewBox="0 0 16 16" width="16" height="16" fill="currentColor"><path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l3.22 3.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-3.22 3.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z"></path></svg>
            </button>
          </div>
          {children}
        </div>
      </div>
    </>
  );
};