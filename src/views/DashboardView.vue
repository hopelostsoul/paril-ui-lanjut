<script setup>
import { computed } from 'vue'
import { daftarBuku } from '../data/buku'
import { usePeminjamanStore } from '../stores/peminjaman'

const peminjaman = usePeminjamanStore()

const labelPeran = { mahasiswa: 'Mahasiswa', dosen: 'Dosen', pustakawan: 'Pustakawan' }

const dipinjam = (b) => !peminjaman.tersedia(b)

const total = daftarBuku.length
const jumlahDipinjam = computed(() => daftarBuku.filter(dipinjam).length)
const jumlahTersedia = computed(() => total - jumlahDipinjam.value)
</script>

<template>
  <div class="dashboard-overview">
    <h2>Selamat datang kembali, Pustakawan</h2>

    <!-- GROUPING & PROXIMITY: metrik dikelompokkan dalam kartu -->
    <div class="metrics-grid">
      <div class="metric-card">
        <h3>Total Koleksi</h3>
        <p class="metric-value">{{ total }}</p>
      </div>
      <div class="metric-card">
        <h3>Tersedia</h3>
        <p class="metric-value">{{ jumlahTersedia }}</p>
      </div>
      <div class="metric-card">
        <h3>Sedang Dipinjam</h3>
        <p class="metric-value">{{ jumlahDipinjam }}</p>
      </div>
    </div>

    <!-- DATA DENSITY & F-PATTERN: tabel rapat agar mudah dipindai baris demi baris -->
    <div class="data-table-container">
      <h3>Peminjaman Aktif</h3>
      <div class="table-scroll">
        <table class="data-table">
          <thead>
            <tr>
              <th>Peminjam</th>
              <th>Peran</th>
              <th>Buku</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in peminjaman.semuaPeminjaman" :key="r.username + r.buku.id">
              <td>{{ r.nama }}</td>
              <td>{{ labelPeran[r.peran] ?? r.peran }}</td>
              <td>
                <router-link :to="{ name: 'detail-buku', params: { id: r.buku.id } }">{{ r.buku.judul }}</router-link>
              </td>
            </tr>
            <tr v-if="peminjaman.semuaPeminjaman.length === 0">
              <td colspan="3" class="kosong">Belum ada peminjaman aktif.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="data-table-container">
      <h3>Daftar Koleksi</h3>
      <div class="table-scroll">
        <table class="data-table">
          <thead>
            <tr>
              <th>Judul</th>
              <th>Penulis</th>
              <th>Kategori</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="b in daftarBuku" :key="b.id">
              <td>
                <router-link :to="{ name: 'detail-buku', params: { id: b.id } }">{{ b.judul }}</router-link>
              </td>
              <td>{{ b.penulis }}</td>
              <td>{{ b.kategori }}</td>
              <td>
                <span class="badge" :class="dipinjam(b) ? 'no' : 'ok'">
                  {{ dipinjam(b) ? 'Dipinjam' : 'Tersedia' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-overview h2 {
  font-family: var(--font-judul);
  font-size: 1.4rem;
  margin: 0 0 var(--space-6);
}

/* GRID untuk menyusun metrik secara proporsional */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: var(--space-6);
  margin-bottom: var(--space-8);
}
.metric-card {
  background: var(--panel);
  padding: var(--space-6);
  border: 1px solid var(--garis);
  border-top: 3px solid var(--merah);
  box-shadow: var(--shadow-kartu);
}
.metric-card h3 { font-size: 0.95rem; font-weight: 500; color: var(--abu); margin: 0 0 var(--space-2); }
.metric-value { font-family: var(--font-judul); font-size: 2.2rem; font-weight: 700; color: var(--merah-tua); margin: 0; }

.data-table-container {
  background: var(--panel);
  padding: var(--space-6);
  border: 1px solid var(--garis);
  margin-bottom: var(--space-6);
}
.data-table-container h3 { font-family: var(--font-judul); font-size: 1.15rem; margin: 0 0 var(--space-4); }
.table-scroll { overflow-x: auto; }

.data-table { width: 100%; border-collapse: collapse; }
.data-table th,
.data-table td {
  padding: var(--space-3) var(--space-4);
  text-align: left;
  border-bottom: 1px solid var(--garis);
}
.data-table th {
  background: var(--krem);
  color: var(--abu);
  font-size: 0.85rem;
  font-weight: 600;
  white-space: nowrap;
}
.data-table td { font-size: 0.92rem; }
.data-table td a { color: var(--merah-tua); font-weight: 500; text-decoration: none; }
.data-table td a:hover { text-decoration: underline; }
.kosong { color: var(--abu); text-align: center; }
</style>