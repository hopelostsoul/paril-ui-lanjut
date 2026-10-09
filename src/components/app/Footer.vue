<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../../stores/auth'

const auth = useAuthStore()
const tahun = new Date().getFullYear()

// Peta situs mini: setiap tautan = satu destinasi di site map
const jelajahi = [
  { nama: 'Beranda', to: '/' },
  { nama: 'Katalog Buku', to: '/katalog' },
  { nama: 'Kategori', to: '/katalog/kategori' },
  { nama: 'Pencarian', to: '/pencarian' },
]
const akun = computed(() => {
  if (!auth.sudahLogin) return [{ nama: 'Masuk', to: '/masuk' }]
  const daftar = [
    { nama: 'Peminjaman Saya', to: '/peminjaman' },
    { nama: 'Profil Saya', to: '/profil' },
  ]
  if (auth.peran === 'pustakawan') daftar.push({ nama: 'Dashboard Pustakawan', to: '/dashboard' })
  return daftar
})
</script>

<template>
  <footer class="footer">
    <div class="footer-inner grid-12">
      <div class="kolom kolom-brand">
        <p class="footer-title">Perpustakaan Telkom University</p>
        <p class="footer-desc">
          Telusuri koleksi, pinjam buku yang kamu butuhkan, dan pantau status peminjamanmu di satu tempat.
        </p>
      </div>

      <nav class="kolom" aria-label="Peta situs: jelajahi">
        <h2>Jelajahi</h2>
        <ul>
          <li v-for="t in jelajahi" :key="t.to"><router-link :to="t.to">{{ t.nama }}</router-link></li>
        </ul>
      </nav>

      <nav class="kolom" aria-label="Peta situs: akun">
        <h2>Akun</h2>
        <ul>
          <li v-for="t in akun" :key="t.to"><router-link :to="t.to">{{ t.nama }}</router-link></li>
        </ul>
      </nav>
    </div>

    <div class="footer-bottom">&copy; {{ tahun }} Perpustakaan Telkom University</div>
  </footer>
</template>

<style scoped>
.footer { background: #2a0a12; color: #d8aab2; border-top: 3px solid var(--merah); }
.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-12) var(--space-6);
}
.kolom { grid-column: span 3; }
.kolom-brand { grid-column: span 6; }

.footer-title { margin: 0 0 var(--space-2); font-family: var(--font-judul); font-size: 1.15rem; font-weight: 700; color: #fff; }
.footer-desc { margin: 0; max-width: 44ch; font-size: 0.9rem; }
.kolom h2 {
  margin: 0 0 var(--space-3);
  font-family: var(--font-teks);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #fff;
}
.kolom ul { list-style: none; margin: 0; padding: 0; }
.kolom li { margin-bottom: var(--space-2); }
.kolom a { color: #d8aab2; text-decoration: none; font-size: 0.92rem; }
.kolom a:hover { color: #fff; text-decoration: underline; }

.footer-bottom {
  padding: var(--space-4) var(--space-6);
  text-align: center;
  font-size: 0.8rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

@media (max-width: 768px) {
  .kolom, .kolom-brand { grid-column: span 12; }
}
</style>