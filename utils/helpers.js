export const getUnique = (arr, comp) => {
  const filteredArr = arr.filter(Boolean);
  const unique = filteredArr
    .map(e => e[comp])

    // store the keys of the unique objects
    .map((e, i, final) => final.indexOf(e) === i && i)

    // eliminate the dead keys & store unique objects
    .filter(e => filteredArr[e])
    .map(e => filteredArr[e]);

  return unique;
};
