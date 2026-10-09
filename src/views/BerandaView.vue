<script setup>
import { usePeminjamanStore } from '../stores/peminjaman'
import { daftarBuku } from '../data/buku'
import AppIcon from '../components/AppIcon.vue'

const peminjaman = usePeminjamanStore()
const totalTersedia = daftarBuku.filter((b) => b.tersedia).length
</script>

<template>
  <section class="hero">
    <h1>Selamat datang di Perpustakaan Kampus</h1>
    <p>Jelajahi katalog buku, cari judul favoritmu, dan pantau buku yang sedang kamu pinjam &mdash; semua dalam satu tempat.</p>
  </section>

  <div class="stats">
    <div class="stat">
      <div class="n">{{ daftarBuku.length }}</div>
      <div class="l">Total judul buku</div>
    </div>
    <div class="stat">
      <div class="n">{{ totalTersedia }}</div>
      <div class="l">Buku tersedia</div>
    </div>
    <div class="stat">
      <div class="n">{{ peminjaman.idDipinjam.length }}</div>
      <div class="l">Sedang kamu pinjam</div>
    </div>
  </div>

  <div class="quick-grid">
    <router-link class="quick" to="/katalog">
      <span class="icon-badge"><AppIcon name="book" /></span>
      <h3>Katalog Buku</h3>
      <p>Lihat semua buku yang tersedia di perpustakaan.</p>
    </router-link>

    <router-link class="quick" to="/pencarian">
      <span class="icon-badge"><AppIcon name="search" /></span>
      <h3>Pencarian</h3>
      <p>Cari buku berdasarkan judul atau penulis.</p>
    </router-link>

    <router-link class="quick" to="/peminjaman">
      <span class="icon-badge"><AppIcon name="clock" /></span>
      <h3>Peminjaman Saya</h3>
      <p>Pantau buku yang sedang kamu pinjam.</p>
    </router-link>
  </div>
</template>