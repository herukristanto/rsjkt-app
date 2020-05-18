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

export const getJadwalFromDokter = (daftarDokter, dokter) => {
  const rawJadwal = daftarDokter.map((item) => {
    if (item.Dokter_ID === dokter) {
      const hari = moment(item.Tanggal).format('dddd');
      return {
        hari: hari,
        jamAwal: item.Jam_AwalFix.trim(),
        jamAkhir: item.Jam_AkhirFix.trim(),
        dayOfWeek: item.DayofWeek,
        date: item.Tanggal,
        TidakPraktek: item.TidakPraktek,
        color: item.TidakPraktek ? 'red' : 'black',
        label: `${hari}, ${moment(item.Tanggal).format(
          'DD/MM/YYYY'
        )}, ${item.Jam_AwalFix.trim()} - ${item.Jam_AkhirFix.trim()}`,
        value: `${hari}, ${moment(item.Tanggal).format(
          'DD/MM/YYYY'
        )}, ${item.Jam_AwalFix.trim()} - ${item.Jam_AkhirFix.trim()}`,
      };
    }
    return;
  });
  const filteredJadwal = rawJadwal.filter(Boolean);
  filteredJadwal.sort(
    (a, b) =>
      new moment(a.date).format('YYYYMMDD') -
      new moment(b.date).format('YYYYMMDD')
  );

  return filteredJadwal;
};
