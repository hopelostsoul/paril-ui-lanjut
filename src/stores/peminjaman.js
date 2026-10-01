import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { daftarBuku } from '../data/buku'

export const usePeminjamanStore = defineStore('peminjaman', () => {
  const idDipinjam = ref([])

  const bukuDipinjam = computed(() =>
    daftarBuku.filter((b) => idDipinjam.value.includes(b.id)),
  )

  function sudahDipinjam(id) {
    return idDipinjam.value.includes(id)
  }

  function pinjam(id) {
    if (!sudahDipinjam(id)) idDipinjam.value.push(id)
  }

  function kembalikan(id) {
    idDipinjam.value = idDipinjam.value.filter((x) => x !== id)
  }

  return { idDipinjam, bukuDipinjam, sudahDipinjam, pinjam, kembalikan }
})