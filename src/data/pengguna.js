// DATA AKUN CONTOH (khusus belajar/demo, semua nama fiktif).
// Catatan: menyimpan password di kode front-end TIDAK aman.
// Pada aplikasi sungguhan, login harus diverifikasi oleh server/backend.
export const daftarPengguna = [
  // ----- Mahasiswa (batas pinjam 3 buku) -----
  {
    username: '2026001',
    password: 'mahasiswa123',
    peran: 'mahasiswa',
    nama: 'Aulia Rahma',
    panggilan: 'Aulia',
    email: 'aulia.rahma@student.telkomuniversity.ac.id',
    unit: 'S1 Informatika',
    batasPinjam: 3,
  },
  {
    username: '2026002',
    password: 'mahasiswa123',
    peran: 'mahasiswa',
    nama: 'Raka Pratama',
    panggilan: 'Raka',
    email: 'raka.pratama@student.telkomuniversity.ac.id',
    unit: 'S1 Sistem Informasi',
    batasPinjam: 3,
  },
  {
    username: '2026003',
    password: 'mahasiswa123',
    peran: 'mahasiswa',
    nama: 'Nadia Putri',
    panggilan: 'Nadia',
    email: 'nadia.putri@student.telkomuniversity.ac.id',
    unit: 'S1 Desain Komunikasi Visual',
    batasPinjam: 3,
  },

  // ----- Dosen (batas pinjam 5 buku) -----
  {
    username: 'dosen01',
    password: 'dosen123',
    peran: 'dosen',
    nama: 'Dr. Budi Hartono, M.T.',
    panggilan: 'Pak Budi',
    email: 'budi.hartono@telkomuniversity.ac.id',
    unit: 'Fakultas Informatika',
    batasPinjam: 5,
  },
  {
    username: 'dosen02',
    password: 'dosen123',
    peran: 'dosen',
    nama: 'Siti Marlina, M.Kom.',
    panggilan: 'Bu Siti',
    email: 'siti.marlina@telkomuniversity.ac.id',
    unit: 'Fakultas Rekayasa Industri',
    batasPinjam: 5,
  },

  // ----- Pustakawan (akses Dashboard) -----
  {
    username: 'pustakawan01',
    password: 'pustaka123',
    peran: 'pustakawan',
    nama: 'Dewi Anggraini, S.IP.',
    panggilan: 'Bu Dewi',
    email: 'dewi.anggraini@telkomuniversity.ac.id',
    unit: 'Perpustakaan Pusat',
    batasPinjam: 5,
  },
]