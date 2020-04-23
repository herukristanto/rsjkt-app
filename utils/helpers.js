import React, { useRef, useEffect } from 'react';
import moment from 'moment';

export const getUnique = (arr, comp) => {
  const filteredArr = arr.filter(Boolean);
  const unique = filteredArr
    .map((e) => e[comp])

    // store the keys of the unique objects
    .map((e, i, final) => final.indexOf(e) === i && i)

    // eliminate the dead keys & store unique objects
    .filter((e) => filteredArr[e])
    .map((e) => filteredArr[e]);

  return unique;
};

export const useDidMountEffect = (func, deps) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
};

// export const getDateFromDay = (day) => {
//   let date;
//   for (let index = 1; index <= 7; index++) {
//     const today = moment();
//     today.add(index, 'days');
//     if (day === today.day() + 1) {
//       date = today;
//     }
//   }
//   return date;
// };
