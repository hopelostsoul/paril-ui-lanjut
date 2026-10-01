<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { daftarBuku } from '../data/buku'
import { usePeminjamanStore } from '../stores/peminjaman'

const props = defineProps({ id: String })
const router = useRouter()
const peminjaman = usePeminjamanStore()

const buku = computed(() => daftarBuku.find((b) => b.id === Number(props.id)))

function pinjam() {
  peminjaman.pinjam(buku.value.id)
  router.push({ name: 'peminjaman' })
}
</script>

<template>
  <router-link class="back" to="/katalog">&larr; Kembali ke katalog</router-link>

  <div v-if="buku" class="detail-buku">
    <div class="sampul">{{ buku.judul.charAt(0) }}</div>
    <div class="detail-buku__isi">
      <span class="badge" :class="buku.tersedia ? 'ok' : 'no'">
        {{ buku.tersedia ? 'Tersedia' : 'Sedang dipinjam' }}
      </span>
      <h1>{{ buku.judul }}</h1>
      <p class="penulis">{{ buku.penulis }} &middot; {{ buku.kategori }}, {{ buku.tahun }}</p>
      <p class="sinopsis">{{ buku.sinopsis }}</p>
      <button
        class="btn"
        :disabled="!buku.tersedia || peminjaman.sudahDipinjam(buku.id)"
        @click="pinjam"
      >
        {{ peminjaman.sudahDipinjam(buku.id) ? 'Sudah kamu pinjam' : 'Pinjam buku' }}
      </button>
    </div>
  </div>

  <div v-else class="tidak-ada">
    <h3>Buku tidak ditemukan</h3>
    <p>Buku dengan id {{ id }} tidak ada di katalog.</p>
    <router-link class="btn" to="/katalog">Kembali ke katalog</router-link>
  </div>
</template>