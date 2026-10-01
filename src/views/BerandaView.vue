<script setup>
import { usePeminjamanStore } from '../stores/peminjaman'

const peminjaman = usePeminjamanStore()
</script>

<template>
  <h1>Selamat datang di Perpustakaan Telkom University</h1>
  <p class="subjudul">
    Telusuri koleksi buku, pinjam judul yang kamu butuhkan, dan pantau status peminjamanmu di satu tempat.
  </p>

  <div class="stat-pita">
    Sedang kamu pinjam <strong>{{ peminjaman.idDipinjam.length }}</strong> buku
  </div>

  <div class="aksi-grid">
    <div class="aksi-kartu">
      <h3>Katalog Buku</h3>
      <p>Jelajahi seluruh koleksi buku yang tersedia di perpustakaan.</p>
      <router-link class="btn" to="/katalog">Buka katalog</router-link>
    </div>

    <div class="aksi-kartu">
      <h3>Pencarian</h3>
      <p>Cari buku tertentu berdasarkan judul atau nama penulis.</p>
      <router-link class="btn" to="/pencarian">Cari buku</router-link>
    </div>

    <div class="aksi-kartu">
      <h3>Peminjaman Saya</h3>
      <p>Lihat daftar buku yang sedang kamu pinjam.</p>
      <router-link class="btn" to="/peminjaman">Lihat peminjaman</router-link>
    </div>
  </div>
</template>