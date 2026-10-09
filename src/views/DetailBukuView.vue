<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { daftarBuku, warnaKategori } from '../data/buku'
import { usePeminjamanStore } from '../stores/peminjaman'
import AppIcon from '../components/AppIcon.vue'

const props = defineProps({ id: String })
const router = useRouter()
const peminjaman = usePeminjamanStore()

const buku = computed(() => daftarBuku.find((b) => b.id === Number(props.id)))

function inisial(judul) {
  return judul
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

function pinjam() {
  peminjaman.pinjam(buku.value.id)
  router.push({ name: 'peminjaman' })
}
</script>

<template>
  <div v-if="buku" class="card detail-layout">
    <div class="cover" :style="{ background: warnaKategori[buku.kategori] }">
      {{ inisial(buku.judul) }}
    </div>
    <div>
      <span class="badge" :class="buku.tersedia ? 'ok' : 'no'">
        {{ buku.tersedia ? 'Tersedia' : 'Sedang dipinjam' }}
      </span>
      <h1>{{ buku.judul }}</h1>
      <p class="meta">{{ buku.penulis }} &middot; {{ buku.kategori }} &middot; {{ buku.tahun }}</p>
      <p>{{ buku.sinopsis }}</p>
      <button
        class="btn"
        :disabled="!buku.tersedia || peminjaman.sudahDipinjam(buku.id)"
        @click="pinjam"
      >
        <AppIcon name="check-circle" />
        {{ peminjaman.sudahDipinjam(buku.id) ? 'Sudah kamu pinjam' : 'Pinjam buku' }}
      </button>
    </div>
  </div>

  <div v-else class="empty">
    <AppIcon name="alert" />
    <h3>Buku tidak ditemukan</h3>
    <p>Buku dengan id {{ id }} tidak ada di katalog.</p>
    <router-link class="btn secondary" to="/katalog">Kembali ke katalog</router-link>
  </div>
</template>