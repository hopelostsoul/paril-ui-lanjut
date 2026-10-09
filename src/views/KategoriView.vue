<script setup>
import { computed } from 'vue'
import { daftarBuku } from '../data/buku'
import BookCard from '../components/BookCard.vue'

// GROUPING: buku dikelompokkan per kategori
const kelompok = computed(() => {
  const peta = {}
  for (const b of daftarBuku) (peta[b.kategori] ||= []).push(b)
  return Object.entries(peta)
    .map(([nama, buku]) => ({ nama, buku }))
    .sort((a, b) => a.nama.localeCompare(b.nama))
})
</script>

<template>
  <div class="kategori-page">
    <h1>Kategori</h1>
    <p class="subjudul">Telusuri koleksi berdasarkan bidang.</p>

    <section v-for="k in kelompok" :key="k.nama" class="kelompok">
      <h2>
        {{ k.nama }}
        <span class="jumlah">{{ k.buku.length }} buku</span>
      </h2>
      <div class="katalog-grid">
        <BookCard v-for="b in k.buku" :key="b.id" :buku="b" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.kelompok { margin-bottom: var(--space-12); }
.kelompok h2 {
  display: flex;
  align-items: baseline;
  gap: var(--space-3);
  font-family: var(--font-judul);
  font-size: 1.5rem;
  margin: 0 0 var(--space-4);
  padding-bottom: var(--space-2);
  border-bottom: 1px solid var(--garis);
}
.jumlah { font-family: var(--font-teks); font-size: 0.85rem; font-weight: 400; color: var(--abu); }
</style>