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
          'DD/MM/YYYY',
        )}, ${item.Jam_AwalFix.trim()} - ${item.Jam_AkhirFix.trim()}`,
        value: `${hari}, ${moment(item.Tanggal).format(
          'DD/MM/YYYY',
        )}, ${item.Jam_AwalFix.trim()} - ${item.Jam_AkhirFix.trim()}`,
      };
    }
    return;
  });
  const filteredJadwal = rawJadwal.filter(Boolean);
  filteredJadwal.sort(
    (a, b) =>
      new moment(a.date).format('YYYYMMDD') -
      new moment(b.date).format('YYYYMMDD'),
  );

  return filteredJadwal;
};

export const objectToUrlEncoded = (obj) => {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  return str.join('&');
};

export const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const validatedate = (dateString) => {
  // First check for the pattern
  if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) return false;

  // Parse the date parts to integers
  var parts = dateString.split('/');
  var day = parseInt(parts[0], 10);
  var month = parseInt(parts[1], 10);
  var year = parseInt(parts[2], 10);

  // Check the ranges of month and year
  if (year < 1000 || year > 3000 || month == 0 || month > 12) return false;

  var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Adjust for leap years
  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
    monthLength[1] = 29;

  // Check the range of the day
  return day > 0 && day <= monthLength[month - 1];
};
