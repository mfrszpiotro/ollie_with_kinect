import React, { useState } from 'react';
import CHANNELS from '../../../ipc_channels';

export interface ButtonProps {
  children: React.ReactNode;
  props?: any;
}

function SelectFilepathButton({ children, ...props }: ButtonProps) {
  const [selectFileState, setSelectFileState] = useState(['starting']);
  const { dialog_open_file } = CHANNELS;
  const handleOnClick = () => {
    window.electronIpc.once(dialog_open_file, (arg) => {
      if (typeof arg === 'object') {
        // @ts-ignore
        setSelectFileState(arg);
      } else {
        setSelectFileState(['undefined']);
      }
    });
    window.electronIpc.sendMessage(dialog_open_file);
  };

  return (
    <>
      <p>{selectFileState}</p>
      <button type="button" onClick={handleOnClick} {...props}>
        {children}
      </button>
    </>
  );
}

export default SelectFilepathButton;
