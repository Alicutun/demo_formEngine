/// <reference types="react-scripts" />
declare global {
  interface Navigator {
    msSaveOrOpenBlob: (blob: Blob, defaultName?: string) => boolean;
  }
}
