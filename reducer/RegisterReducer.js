export const ADD_FORM = 'ADD_FORM';

export const initialState = {
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
};

export const RegisterReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FORM:
      return {
        ...state,
        ...action.form
      };
    default:
      return state;
  }
};
