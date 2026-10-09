<script setup>
import { usePeminjamanStore } from '../stores/peminjaman'
import { warnaKategori } from '../data/buku'
import AppIcon from '../components/AppIcon.vue'

const peminjaman = usePeminjamanStore()

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
  <h1>Peminjaman Saya</h1>
  <p class="lede">Buku yang sedang kamu pinjam.</p>

  <div v-if="peminjaman.bukuDipinjam.length" class="book-grid">
    <div v-for="b in peminjaman.bukuDipinjam" :key="b.id" class="book-card">
      <div class="cover" :style="{ background: warnaKategori[b.kategori] }">
        {{ inisial(b.judul) }}
      </div>
      <div class="body">
        <h3>{{ b.judul }}</h3>
        <p class="meta">{{ b.penulis }}</p>
        <div class="row actions">
          <router-link class="btn secondary" :to="{ name: 'detail-buku', params: { id: b.id } }">
            Lihat detail
          </router-link>
          <button class="btn" @click="peminjaman.kembalikan(b.id)">Kembalikan</button>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="empty">
    <AppIcon name="clock" />
    <p>Belum ada buku yang dipinjam.</p>
    <router-link class="btn" to="/katalog">Jelajahi katalog</router-link>
  </div>
</template>