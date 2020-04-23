export const ADD_FORM = 'ADD_FORM';
export const RESET_FORM = 'RESET_FORM';
export const GET_MASTER = 'GET_MASTER';

export const initialState = {
  form: {
    namaLengkap: '',
    namaPanggilan: '',
    identitas: '',
    noIndentitas: '',
    tanggalLahir: '',
    kelamin: '',
    darah: '',
    pendidikan: '',
    agama: '',
    kewarganegaraan: '',
    alamat: '',
    rt: '',
    rw: '',
    telp: '',
    email: '',
    kawin: '',
    namaAyah: '',
    pekerjaanAyah: '',
    namaIbu: '',
    namaSutri: '',
    pekerjaanSutri: '',
    pekerjaan: '',
    namaPerusahaan: '',
    nomorAsuransi: '',
    kodeAsuransi: '',
    namaAsuransi: '',
  },
  listAgama: [],
  listPekerjaan: [],
  listPendidikan: [],
  isLoading: true,
};

export const RegisterReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MASTER:
      return {
        ...state,
        listAgama: action.listAgama,
        listPekerjaan: action.listPekerjaan,
        listPendidikan: action.listPendidikan,
        isLoading: false,
      };
    case ADD_FORM:
      return {
        ...state,
        form: {
          ...state.form,
          ...action.form,
        },
      };
    case RESET_FORM:
      return {
        ...state,
        form: {
          ...initialState.form,
        },
      };
    default:
      return {
        ...state,
      };
  }
};
