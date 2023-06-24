const setToSessionStorage = store => {
  Object.keys(store).map(key =>
    sessionStorage.setItem(key, JSON.stringify(store[key]))
  );
};

const getFromSessionStorage = key => JSON.parse(sessionStorage.getItem(key));

export { setToSessionStorage, getFromSessionStorage };
