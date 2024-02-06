/// <reference types="client" />
declare global {
    interface Window {
      gtag?: (...args: any[]) => void;
    }
}