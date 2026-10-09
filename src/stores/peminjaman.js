import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { daftarBuku } from '../data/buku'
import { daftarPengguna } from '../data/pengguna'
import { useAuthStore } from './auth'

const KUNCI = 'perpus-peminjaman'

function muat() {
  try {
    return JSON.parse(localStorage.getItem(KUNCI)) ?? {}
  } catch {
    return {}
  }
}

export const usePeminjamanStore = defineStore('peminjaman', () => {
  const auth = useAuthStore()

  // { username: [idBuku, ...] } -> peminjaman dipisah per akun
  const semua = ref(muat())
  watch(
    semua,
    (nilai) => {
      try {
        localStorage.setItem(KUNCI, JSON.stringify(nilai))
      } catch {
        /* abaikan */
      }
    },
    { deep: true },
  )

  // ----- milik akun yang sedang login -----
  const idDipinjam = computed(() => semua.value[auth.user?.username] ?? [])
  const bukuDipinjam = computed(() => daftarBuku.filter((b) => idDipinjam.value.includes(b.id)))
  const batas = computed(() => auth.user?.batasPinjam ?? 0)
  const batasTercapai = computed(() => idDipinjam.value.length >= batas.value)

  function sudahDipinjam(id) {
    return idDipinjam.value.includes(id)
  }

  // ----- status buku secara keseluruhan (dipinjam siapa pun) -----
  const idDipinjamSemua = computed(() => new Set(Object.values(semua.value).flat()))
  function tersedia(buku) {
    return buku.tersedia && !idDipinjamSemua.value.has(buku.id)
  }

  function pinjam(id) {
    const username = auth.user?.username
    const buku = daftarBuku.find((b) => b.id === id)
    if (!username || !buku || batasTercapai.value || !tersedia(buku)) return false
    semua.value[username] = [...idDipinjam.value, id]
    return true
  }

  function kembalikan(id) {
    const username = auth.user?.username
    if (!username) return
    semua.value[username] = idDipinjam.value.filter((x) => x !== id)
  }

  // Untuk dashboard pustakawan: seluruh peminjaman aktif
  const semuaPeminjaman = computed(() =>
    Object.entries(semua.value).flatMap(([username, ids]) => {
      const p = daftarPengguna.find((x) => x.username === username)
      return ids
        .map((id) => ({
          username,
          nama: p?.nama ?? username,
          peran: p?.peran ?? '-',
          buku: daftarBuku.find((b) => b.id === id),
        }))
        .filter((r) => r.buku)
    }),
  )

  return {
    idDipinjam,
    bukuDipinjam,
    batas,
    batasTercapai,
    sudahDipinjam,
    tersedia,
    pinjam,
    kembalikan,
    semuaPeminjaman,
  }
})