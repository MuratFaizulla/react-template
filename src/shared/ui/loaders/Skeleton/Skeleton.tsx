import React from 'react';
import styles from './Skeleton.module.css';

interface Props {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
}

export const Skeleton: React.FC<Props> = ({
  width = '100%',
  height = 16,
  borderRadius = 4,
  className
}) => {
  const style: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius
  };

  return <div className={`${styles.skeleton} ${className ?? ''}`} style={style} />;
};
