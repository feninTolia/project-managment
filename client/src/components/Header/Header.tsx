import React, { ReactElement } from 'react';

type Props = {
  name: string;
  buttonComponent?: ReactElement;
  isSmallText?: boolean;
  className?: string;
};

const Header = ({ name, isSmallText, buttonComponent, className }: Props) => {
  return (
    <div
      className={`mb-5 flex w-full items-center justify-between ${className}`}
    >
      <h1 className={`${isSmallText ? 'text-lg' : 'text-2xl'} font-semibold`}>
        {name}
      </h1>
      {buttonComponent}
    </div>
  );
};

export default Header;
