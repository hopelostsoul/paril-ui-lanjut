<script setup>
import { usePeminjamanStore } from '../stores/peminjaman'

defineProps({
  buku: { type: Object, required: true },
  tampilStatus: { type: Boolean, default: true },
})

const peminjaman = usePeminjamanStore()
</script>

<template>
  <!-- COMMON REGION: border + bayangan menyatukan semua info buku jadi satu kelompok -->
  <article class="buku-card">
    <div class="buku-card__punggung"></div>
    <div class="buku-card__isi">
      <div class="buku-card__meta">
                <span v-if="tampilStatus" class="badge" :class="peminjaman.tersedia(buku) ? 'ok' : 'no'">
          {{ peminjaman.tersedia(buku) ? 'Tersedia' : 'Sedang dipinjam' }}
        </span>
        <span class="kategori">{{ buku.kategori }}, {{ buku.tahun }}</span>
      </div>

      <h3>{{ buku.judul }}</h3>
      <p class="penulis">{{ buku.penulis }}</p>

      <div class="card-footer">
        <!-- slot "default" bisa diganti (mis. tombol Kembalikan) -->
        <slot>
          <router-link class="btn-link" :to="{ name: 'detail-buku', params: { id: buku.id } }">
            Lihat detail &rarr;
          </router-link>
        </slot>
      </div>
    </div>
  </article>
</template>

<style scoped>
.buku-card {
  display: flex;
  background: var(--panel);
  border: 1px solid var(--garis);
  box-shadow: var(--shadow-kartu);
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}
.buku-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-hover); }

.buku-card__punggung { width: 5px; background: var(--merah); flex-shrink: 0; }

/* PROXIMITY: elemen berkaitan dirapatkan, footer dipisah garis */
.buku-card__isi {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  padding: var(--space-6);
}
.buku-card__meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
}
.kategori { font-size: 0.8rem; color: var(--abu); }

h3 {
  font-family: var(--font-judul);
  font-weight: 600;
  font-size: 1.2rem;
  line-height: 1.3;
  margin: 0 0 var(--space-1);
}
.penulis { margin: 0 0 var(--space-6); color: var(--abu); font-size: 0.9rem; }

.card-footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2) var(--space-4);
  margin-top: auto;
  padding-top: var(--space-4);
  border-top: 1px solid var(--garis);
}
.btn-link {
  color: var(--tinta);
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
}
.btn-link:hover { color: var(--merah); }
</style>