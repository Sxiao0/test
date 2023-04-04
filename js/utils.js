function transformArrays(arr1, arr2) {
  return arr1.reduce((acc, cur, index) => {
    acc.push({ value: cur, name: arr2[index] });
    return acc;
  }, []);
}
