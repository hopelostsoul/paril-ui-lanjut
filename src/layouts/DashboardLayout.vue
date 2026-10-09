<script setup>
import { RouterView, RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const router = useRouter()

function keluar() {
  auth.logout()
  router.push('/')
}
</script>

<template>
  <!-- RAIL & PANE SYSTEM: kerangka khusus produktivitas/pengelolaan -->
  <div class="dashboard-layout">
    <!-- RAIL: navigasi samping yang posisinya terkunci -->
    <aside class="dashboard-rail">
      <div class="rail-brand">
        <RouterLink to="/">Perpustakaan TelU</RouterLink>
        <small>Ruang Kerja Pustakawan</small>
      </div>
      <nav class="rail-nav" aria-label="Menu dashboard">
        <RouterLink to="/dashboard" class="rail-link">Ringkasan</RouterLink>
        <a href="#" class="rail-link" @click.prevent>Kelola Buku</a>
        <a href="#" class="rail-link" @click.prevent>Anggota</a>
        <a href="#" class="rail-link" @click.prevent>Sirkulasi</a>
      </nav>
      <div class="rail-footer">
        <RouterLink to="/" class="rail-link">&larr; Kembali ke situs</RouterLink>
      </div>
    </aside>

    <!-- PANE: area utama dinamis, bisa digulir secara mandiri -->
    <main class="dashboard-pane">
      <header class="pane-header">
        <h1>Dashboard</h1>
                <div class="user-profile">
          <span>{{ auth.user?.nama }}</span>
          <button type="button" class="keluar" @click="keluar">Keluar</button>
        </div>
      </header>
      <div class="pane-content">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style scoped>
/* Full-screen app layout: tinggi dikunci agar rail tidak ikut bergulir */
.dashboard-layout {
  display: flex;
  height: 100vh;
  height: 100dvh;
  overflow: hidden; /* tidak ada scroll global */
  background: var(--krem);
}

/* ----- RAIL ----- */
.dashboard-rail {
  width: 260px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background: #2a0a12; /* gelap: membedakan area nav dan konten */
  color: #fff;
}
.rail-brand {
  padding: var(--space-6);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.rail-brand a {
  display: block;
  color: #fff;
  text-decoration: none;
  font-family: var(--font-judul);
  font-size: 1.15rem;
  font-weight: 700;
}
.rail-brand small { color: #d8aab2; font-size: 0.75rem; }

.rail-nav { flex: 1; display: flex; flex-direction: column; padding: var(--space-6) 0; }
.rail-link {
  display: block;
  padding: var(--space-3) var(--space-6);
  color: #cdb4b8;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.92rem;
  border-left: 4px solid transparent;
  transition: background 0.2s, color 0.2s;
}
.rail-link:hover,
.rail-link.router-link-exact-active {
  background: rgba(255, 255, 255, 0.07);
  color: #fff;
  border-left-color: var(--merah);
}
.rail-footer { padding: var(--space-4) 0; border-top: 1px solid rgba(255, 255, 255, 0.1); }

/* ----- PANE ----- */
.dashboard-pane {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  overflow-y: auto; /* hanya jendela konten ini yang bisa digulir */
}
.pane-header {
  position: sticky;
  top: 0;
  z-index: 5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--panel);
  padding: var(--space-4) var(--space-8);
  border-bottom: 1px solid var(--garis);
}
.pane-header h1 { font-size: 1.5rem; margin: 0; }
.user-profile { display: flex; align-items: center; gap: var(--space-4); font-size: 0.9rem; color: var(--abu); }
.keluar {
  padding: var(--space-1) var(--space-4);
  background: #fff;
  border: 1px solid var(--merah);
  color: var(--merah-tua);
  font: inherit;
  font-size: 0.85rem;
  cursor: pointer;
}
.keluar:hover { background: var(--merah-muda); }  
.pane-content { padding: var(--space-8); }

@media (max-width: 768px) {
  .dashboard-layout { flex-direction: column; height: auto; overflow: visible; }
  .dashboard-rail { width: 100%; }
  .rail-nav { flex-direction: row; flex-wrap: wrap; padding: var(--space-2) var(--space-4); }
  .rail-link { padding: var(--space-2) var(--space-3); border-left: 0; border-bottom: 3px solid transparent; }
  .rail-link:hover, .rail-link.router-link-exact-active { border-bottom-color: var(--merah); }
  .rail-footer { padding: var(--space-2) var(--space-4); }
  .rail-footer .rail-link { padding-left: var(--space-3); }
  .dashboard-pane { overflow: visible; }
  .pane-header { padding: var(--space-4); }
  .pane-content { padding: var(--space-4); }
}
</style>