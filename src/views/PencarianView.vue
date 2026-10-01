<script setup>
import { ref, computed } from 'vue'
import { daftarBuku } from '../data/buku'

const kataKunci = ref('')

const hasil = computed(() => {
  const q = kataKunci.value.trim().toLowerCase()
  if (!q) return []
  return daftarBuku.filter(
    (b) => b.judul.toLowerCase().includes(q) || b.penulis.toLowerCase().includes(q),
  )
})
</script>

<template>
  <h1>Pencarian</h1>
  <p class="subjudul">Cari buku berdasarkan judul atau nama penulis.</p>

  <input v-model="kataKunci" class="cari" placeholder="Ketik judul atau penulis..." />

  <div class="katalog-grid">
    <div class="buku-card" v-for="b in hasil" :key="b.id">
      <div class="buku-card__punggung"></div>
      <div class="buku-card__isi">
        <span class="kategori">{{ b.kategori }}</span>
        <h3>{{ b.judul }}</h3>
        <p class="penulis">{{ b.penulis }}</p>
        <router-link class="btn secondary" :to="{ name: 'detail-buku', params: { id: b.id } }">
          Lihat detail
        </router-link>
      </div>
    </div>
  </div>

  <p v-if="kataKunci.trim() && hasil.length === 0" class="pesan-kosong">
    Buku tidak ditemukan. Coba kata kunci lain.
  </p>
</template>