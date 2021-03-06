export const GET_DAFTAR_PRAKTER = 'GET_DAFTAR_PRAKTER';
export const GET_DAFTAR_DOKTER = 'GET_DAFTAR_DOKTER';
export const GET_DAFTAR_JADWAL = 'GET_DAFTAR_JADWAL';
export const GET_DAFTAR_PERUSAHAAN = 'GET_DAFTAR_PERUSAHAAN';
export const ADD_TO_FORM = 'ADD_TO_FORM';
export const RESET_FORM = 'RESET_FORM';
export const RESPONSE_REGIS_POLI = 'RESPONSE_REGIS_POLI';

export const initialState = {
  form: {
    noRekamMedis: '',
    tanggalLahir: '',
    dokter: '',
    _label_dokter: '',
    poliklinik: '',
    tanggal: '',
    _label_tanggal: '',
    status: 0,
    jaminan: '',
    _label_jaminan: '',
    perusahaan: '',
    _label_perusahaan: '',
    noKartu: '',
    telp: '',
    qrCode: '',
    cluster: {
      cluster_id: '',
      cluster_nm: '',
    },
  },
  daftarPraktek: [],
  daftarPoli: [],
  daftarDokter: [],
  daftarJadwal: [],
  daftarPenjamin: [],
  daftarPerusahaan: [],
  noAntrian: '',
  kodeBooking: '',
  isLoading: true,
};

export const PoliklinikReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DAFTAR_PRAKTER:
      return {
        ...state,
        daftarPraktek: action.daftarPraktek,
        daftarPoli: action.daftarPoli,
        daftarPenjamin: action.daftarPenjamin,
        daftarPerusahaan: action.daftarPerusahaan,
        daftarDokter: action.daftarDokter,
        daftarJadwal: action.daftarJadwal,
        form: {
          ...state.form,
          ...action.user,
        },
        isLoading: false,
      };
    case GET_DAFTAR_DOKTER:
      return {
        ...state,
        daftarDokter: action.daftarDokter,
      };
    case GET_DAFTAR_JADWAL:
      return {
        ...state,
        daftarJadwal: action.daftarJadwal,
      };
    case GET_DAFTAR_PERUSAHAAN:
      return {
        ...state,
        daftarPerusahaan: action.daftarPerusahaan,
        form: {
          ...state.form,
          _label_jaminan: action.namaJaminan,
        },
      };
    case ADD_TO_FORM:
      return {
        ...state,
        form: {
          ...state.form,
          ...action.data,
        },
      };
    case RESET_FORM:
      return {
        ...state,
        form: {
          ...initialState.form,
        },
      };
    case RESPONSE_REGIS_POLI:
      return {
        ...state,
        ...action.response,
      };
    default:
      state;
  }
};
