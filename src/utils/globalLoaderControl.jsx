// src/utils/globalLoaderControl.js
let showLoadingFn = null;
let hideLoadingFn = null;

export const setGlobalLoaderControl = (showFn, hideFn) => {
  showLoadingFn = showFn;
  hideLoadingFn = hideFn;
};

export const showGlobalLoader = () => {
  if (showLoadingFn) showLoadingFn();
};

export const hideGlobalLoader = () => {
  if (hideLoadingFn) hideLoadingFn();
};
