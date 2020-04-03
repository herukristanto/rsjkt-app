export const ADD_FORM = 'ADD_FORM';
export const RESET_FORM = 'RESET_FORM';

export const initialState = {
  form: {
    namaLengkap: '',
    namaPanggilan: '',
    identitas: '',
    noIndentitas: '',
    tanggalLahir: new Date(),
    kelamin: 0,
    darah: '',
    pendidikan: '',
    agama: '',
    alamat: '',
    rt: '',
    rw: '',
    kota: '',
    kodePos: '',
    telp: '',
    telp2: '',
    email: '',
    alamatKeluarga: '',
    rtKeluarga: '',
    rwKeluarga: '',
    kotaKeluarga: '',
    kodePosKeluarga: '',
    telpKeluarga: '',
    telp2Keluarga: '',
    emailKeluarga: '',
    namaAyah: '',
    pekerjaanAyah: '',
    namaIbu: '',
    pekerjaan: '',
    namaPekerjaan: '',
    alamatPekerjaan: '',
    telpPekerjaan: '',
    departemen: '',
    jabatan: ''
  }
};

export const RegisterReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FORM:
      console.log(action.form);
      return {
        ...state,
        form: {
          ...state.form,
          ...action.form
        }
      };
    case RESET_FORM:
      return {
        ...state,
        form: {
          ...initialState.form
        }
      };
    default:
      return {
        ...state
      };
  }
};
