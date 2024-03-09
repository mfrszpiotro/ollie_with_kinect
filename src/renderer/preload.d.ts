import { ElectronIpc } from '../main/preload';

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    electronIpc: ElectronIpc;
  }
}

export {};
