<script setup>
import { daftarBuku, warnaKategori } from '../data/buku'

function inisial(judul) {
  return judul
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}
</script>

<template>
  <h1>Katalog Buku</h1>
  <p class="lede">Daftar semua buku yang tersedia di perpustakaan.</p>

  <div class="book-grid">
    <router-link
      v-for="b in daftarBuku"
      :key="b.id"
      class="book-card"
      :to="{ name: 'detail-buku', params: { id: b.id } }"
    >
      <div class="cover" :style="{ background: warnaKategori[b.kategori] }">
        {{ inisial(b.judul) }}
      </div>
      <div class="body">
        <span class="badge" :class="b.tersedia ? 'ok' : 'no'">
          {{ b.tersedia ? 'Tersedia' : 'Dipinjam' }}
        </span>
        <h3>{{ b.judul }}</h3>
        <p class="meta">{{ b.penulis }} &middot; {{ b.kategori }} &middot; {{ b.tahun }}</p>
      </div>
    </router-link>
  </div>
</template>