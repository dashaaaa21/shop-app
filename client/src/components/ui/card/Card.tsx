import { HTMLAttributes, ReactNode } from 'react';
import './Card.css';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = ({
  children,
  hoverable = false,
  padding = 'md',
  className = '',
  ...props
}: CardProps) => {
  const classes = [
    'card',
    `card--padding-${padding}`,
    hoverable && 'card--hoverable',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const CardHeader = ({ children, className = '', ...props }: CardHeaderProps) => {
  return (
    <div className={`card__header ${className}`} {...props}>
      {children}
    </div>
  );
};

interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const CardBody = ({ children, className = '', ...props }: CardBodyProps) => {
  return (
    <div className={`card__body ${className}`} {...props}>
      {children}
    </div>
  );
};

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const CardFooter = ({ children, className = '', ...props }: CardFooterProps) => {
  return (
    <div className={`card__footer ${className}`} {...props}>
      {children}
    </div>
  );
};
