export function getStoredState() {
  let storedState = {};
  try {
    storedState = JSON.parse(window.localStorage.getItem("state"));
  } catch (e) {
    
  }
  return storedState;
}

export function storeState(state) {
  window.localStorage.setItem("state", JSON.stringify(state));
}
