import child_process from 'child_process';
import path from 'path';
import React from 'react';

export interface ButtonProps {
  children: React.ReactNode;
  props?: any;
}

function RunComparisonButton({ children, ...props }: ButtonProps) {
  const handleOnClick = () => {
    try {
      child_process.execFileSync(
        path.join(
          'C:/Users/piotrowskmarcel/Desktop/repos/kinect-electron-react-boilerplate/src/process_ollie',
          'processing_app.exe',
        ),
        [
          'C:/Users/piotrowskmarcel/Desktop/repos/process_ollie/data/interim_time/ok/jump_20231106120823716.csv',
          'C:/Users/piotrowskmarcel/Desktop/repos/process_ollie/data/interim_time/good/jump_20231106121119882.csv',
        ],
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`${error.name}: ${error.message}`);
      }
    }
  };

  return (
    <button type="button" onClick={handleOnClick} {...props}>
      {children}
    </button>
  );
}

export default RunComparisonButton;
