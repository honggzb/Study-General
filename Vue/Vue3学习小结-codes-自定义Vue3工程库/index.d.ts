declare const useResize: {
  (el: HTMLElement, callback: Function): void;
  install: (app: App) => void;
};

export default useResize