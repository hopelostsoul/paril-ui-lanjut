<script setup>
import { usePeminjamanStore } from '../stores/peminjaman'

const peminjaman = usePeminjamanStore()
</script>

<template>
  <h1>Peminjaman Saya</h1>
  <p class="subjudul">Buku yang sedang kamu pinjam.</p>

  <div class="katalog-grid">
    <div class="buku-card" v-for="b in peminjaman.bukuDipinjam" :key="b.id">
      <div class="buku-card__punggung"></div>
      <div class="buku-card__isi">
        <h3>{{ b.judul }}</h3>
        <p class="penulis">{{ b.penulis }}</p>
        <div class="row">
          <router-link class="btn secondary" :to="{ name: 'detail-buku', params: { id: b.id } }">
            Lihat detail
          </router-link>
          <button class="btn" @click="peminjaman.kembalikan(b.id)">Kembalikan</button>
        </div>
      </div>
    </div>
  </div>

  <div v-if="peminjaman.bukuDipinjam.length === 0" class="tidak-ada">
    <h3>Belum ada buku yang dipinjam</h3>
    <p>Jelajahi katalog untuk mulai meminjam buku.</p>
    <router-link class="btn" to="/katalog">Jelajahi katalog</router-link>
  </div>
</template>