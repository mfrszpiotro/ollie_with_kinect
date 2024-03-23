import React, { useState } from 'react';
import CHANNELS from '../../../ipc_channels';

export interface ButtonProps {
  children: React.ReactNode;
  props?: any;
}

function RunComparisonButton({ children, ...props }: ButtonProps) {
  const [comparisonJsonContents, setComparisonJsonContents] = useState({});
  const { run_comparison } = CHANNELS;
  const handleOnClick = () => {
    try {
      window.electronIpc.once(run_comparison, (arg) => {
        setComparisonJsonContents(arg || {});
      });
      window.electronIpc.sendMessage(run_comparison);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <p>{JSON.stringify(comparisonJsonContents)}</p>
      <button type="button" onClick={handleOnClick} {...props}>
        {children}
      </button>
    </>
  );
}

export default RunComparisonButton;
