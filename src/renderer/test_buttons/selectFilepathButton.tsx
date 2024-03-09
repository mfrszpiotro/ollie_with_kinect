import React from 'react';
import CHANNELS from '../../ipc_channels';

export interface ButtonProps {
  children: React.ReactNode;
  props?: any;
}

function SelectFilepathButton({ children, ...props }: ButtonProps) {
  const { dialog_open_file } = CHANNELS;
  const handleOnClick = () => {
    window.electronIpc.once(dialog_open_file, (arg) => {
      console.log(arg);
    });
    window.electronIpc.sendMessage(dialog_open_file);
  };

  return (
    <button type="button" onClick={handleOnClick} {...props}>
      {children}
    </button>
  );
}

export default SelectFilepathButton;
