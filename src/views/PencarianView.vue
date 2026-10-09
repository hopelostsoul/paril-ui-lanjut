<script setup>
import { ref, computed } from 'vue'
import { daftarBuku, warnaKategori } from '../data/buku'
import AppIcon from '../components/AppIcon.vue'

const kataKunci = ref('')

const hasil = computed(() => {
  const q = kataKunci.value.trim().toLowerCase()
  if (!q) return []
  return daftarBuku.filter(
    (b) => b.judul.toLowerCase().includes(q) || b.penulis.toLowerCase().includes(q),
  )
})

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
  <h1>Pencarian</h1>
  <p class="lede">Cari buku berdasarkan judul atau penulis.</p>

  <div class="search-box">
    <AppIcon name="search" />
    <input v-model="kataKunci" placeholder="Ketik judul atau penulis..." />
  </div>

  <div v-if="hasil.length" class="book-grid">
    <router-link
      v-for="b in hasil"
      :key="b.id"
      class="book-card"
      :to="{ name: 'detail-buku', params: { id: b.id } }"
    >
      <div class="cover" :style="{ background: warnaKategori[b.kategori] }">
        {{ inisial(b.judul) }}
      </div>
      <div class="body">
        <h3>{{ b.judul }}</h3>
        <p class="meta">{{ b.penulis }} &middot; {{ b.kategori }}</p>
      </div>
    </router-link>
  </div>

  <div v-else-if="kataKunci.trim()" class="empty">
    <AppIcon name="search" />
    <p>Buku tidak ditemukan. Coba kata kunci lain.</p>
  </div>
</template>