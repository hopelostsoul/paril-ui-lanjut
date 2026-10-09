import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { daftarPengguna } from '../data/pengguna'

const KUNCI = 'perpus-sesi'

function bacaSesi() {
  try {
    const data = localStorage.getItem(KUNCI)
    return data ? JSON.parse(data) : null
  } catch {
    return null
  }
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref(bacaSesi()) // data pengguna TANPA password
  const sudahLogin = computed(() => !!user.value)
  const peran = computed(() => user.value?.peran ?? null)

  // Mengembalikan true jika berhasil. `peranDipilih` = tab yang dipilih di form.
  function login(username, password, peranDipilih) {
    const cocok = daftarPengguna.find(
      (p) =>
        p.username === username.trim() &&
        p.password === password &&
        (!peranDipilih || p.peran === peranDipilih),
    )
    if (!cocok) return false

    const { password: _hapus, ...aman } = cocok
    user.value = aman
    try {
      localStorage.setItem(KUNCI, JSON.stringify(aman))
    } catch {
      /* penyimpanan tidak tersedia: sesi hanya berlaku sampai halaman ditutup */
    }
    return true
  }

  function logout() {
    user.value = null
    try {
      localStorage.removeItem(KUNCI)
    } catch {
      /* abaikan */
    }
  }

  return { user, sudahLogin, peran, login, logout }
})