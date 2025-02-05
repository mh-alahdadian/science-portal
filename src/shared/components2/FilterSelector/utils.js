export const selector = (param, set) => {
  set((l) => {
    let copy = [...l];
    const index = copy.indexOf(param);
    if (index != -1) {
      copy.splice(index, 1);
      return copy;
    }
    return [...copy, param];
  });
};
