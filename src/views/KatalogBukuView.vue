<script setup>
import { daftarBuku } from '../data/buku'
</script>

<template>
  <h1>Katalog Buku</h1>
  <p class="subjudul">Daftar seluruh buku yang tersedia di perpustakaan.</p>

  <div class="katalog-grid">
    <div class="buku-card" v-for="b in daftarBuku" :key="b.id">
      <div class="buku-card__punggung"></div>
      <div class="buku-card__isi">
        <div class="buku-card__meta">
          <span class="badge" :class="b.tersedia ? 'ok' : 'no'">
            {{ b.tersedia ? 'Tersedia' : 'Sedang dipinjam' }}
          </span>
          <span class="kategori">{{ b.kategori }}, {{ b.tahun }}</span>
        </div>
        <h3>{{ b.judul }}</h3>
        <p class="penulis">{{ b.penulis }}</p>
        <router-link class="btn secondary" :to="{ name: 'detail-buku', params: { id: b.id } }">
          Lihat detail
        </router-link>
      </div>
    </div>
  </div>
</template>