<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import LogoKampus from '../LogoKampus.vue'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const isScrolled = ref(false)
const menuTerbuka = ref(false)

// Menu data-driven: hierarki Parent-Child diterjemahkan menjadi dropdown
// perluLogin: tampil hanya jika sudah login | peran: tampil hanya untuk peran tertentu
const menus = [
  { name: 'Beranda', path: '/' },
  {
    name: 'Katalog Buku',
    path: '/katalog',
    children: [
      {
        name: 'Semua Buku',
        path: '/katalog',
        children: [{ name: 'Detail Buku (contoh)', path: '/katalog/1' }],
      },
      { name: 'Kategori', path: '/katalog/kategori' },
    ],
  },
  { name: 'Pencarian', path: '/pencarian' },
  { name: 'Peminjaman Saya', path: '/peminjaman', perluLogin: true },
  { name: 'Profil Saya', path: '/profil', perluLogin: true },
  { name: 'Dashboard', path: '/dashboard', peran: ['pustakawan'] },
]

const menuTampil = computed(() =>
  menus.filter(
    (m) => (!m.perluLogin || auth.sudahLogin) && (!m.peran || m.peran.includes(auth.peran)),
  ),
)

const labelPeran = { mahasiswa: 'Mahasiswa', dosen: 'Dosen', pustakawan: 'Pustakawan' }

function aktif(path) {
  if (path === '/') return route.path === '/'
  return route.path === path || route.path.startsWith(path + '/')
}

function keluar() {
  auth.logout()
  menuTerbuka.value = false
  router.push('/')
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}
onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

// tutup menu mobile setelah berpindah halaman
watch(() => route.path, () => (menuTerbuka.value = false))
</script>

<template>
  <nav class="navbar" :class="{ scrolled: isScrolled }" aria-label="Navigasi utama">
    <div class="navbar-container">
      <router-link to="/" class="brand">
        <LogoKampus :ukuran="36" />
        <span class="brand__teks">
          Perpustakaan
          <small>Telkom University</small>
        </span>
      </router-link>

      <button
        class="hamburger-btn"
        type="button"
        :aria-expanded="menuTerbuka"
        aria-controls="menu-utama"
        aria-label="Buka menu"
        @click="menuTerbuka = !menuTerbuka"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      </button>

      <ul id="menu-utama" class="nav-menu" :class="{ open: menuTerbuka }">
        <li class="nav-item" v-for="menu in menuTampil" :key="menu.name">
          <router-link
            :to="menu.path"
            class="tautan"
            :class="{ active: aktif(menu.path) }"
            :aria-current="aktif(menu.path) ? 'page' : undefined"
          >
            {{ menu.name }}
            <svg v-if="menu.children" class="indikator" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </router-link>

          <!-- Dropdown level 1 -->
          <ul v-if="menu.children" class="dropdown-menu">
            <li v-for="child in menu.children" :key="child.name" class="dropdown-item">
              <router-link :to="child.path" class="dropdown-link">
                {{ child.name }}
                <svg v-if="child.children" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </router-link>

              <!-- Dropdown level 2 -->
              <ul v-if="child.children" class="submenu">
                <li v-for="sub in child.children" :key="sub.name">
                  <router-link :to="sub.path" class="dropdown-link">{{ sub.name }}</router-link>
                </li>
              </ul>
            </li>
          </ul>
        </li>

        <!-- Area akun: Masuk / info pengguna + Keluar -->
        <li class="nav-akun">
          <template v-if="auth.sudahLogin">
            <router-link to="/profil" class="akun-info" title="Lihat profil">
              <span class="akun-nama">{{ auth.user.nama }}</span>
              <span class="akun-peran">{{ labelPeran[auth.peran] }}</span>
            </router-link>
            <button type="button" class="tombol-akun" @click="keluar">Keluar</button>
          </template>
          <router-link v-else to="/masuk" class="tombol-akun">Masuk</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--merah-tua);
  border-bottom: 3px solid var(--merah);
  transition: box-shadow 0.3s;
}
.navbar.scrolled { box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25); }

.navbar-container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-1) var(--space-2);
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-3) var(--space-6);
}

/* ----- Brand ----- */
.brand {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-right: var(--space-6);
  text-decoration: none;
}
.brand__teks {
  color: #fff;
  font-family: var(--font-judul);
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.2;
}
.brand__teks small {
  display: block;
  font-family: var(--font-teks);
  font-weight: 400;
  font-size: 0.72rem;
  color: #f0c9cf;
}

/* ----- Menu ----- */
.nav-menu {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-1);
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 1;
}
.nav-item { position: relative; }

.tautan {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: #f3dade;
  text-decoration: none;
  padding: var(--space-2) var(--space-3);
  font-size: 0.92rem;
  font-weight: 500;
  border: 1px solid transparent;
}
.tautan:hover { color: #fff; border-color: rgba(255, 255, 255, 0.25); }
.tautan.active { background: #fff; color: var(--merah-tua); }
.indikator { transition: transform 0.2s; }
.nav-item:hover .indikator,
.nav-item:focus-within .indikator { transform: rotate(180deg); }

/* ----- Area akun ----- */
.nav-akun {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-left: auto;
}
.akun-info {
  display: flex;
  flex-direction: column;
  max-width: 180px;
  text-decoration: none;
  line-height: 1.25;
}
.akun-nama {
  color: #fff;
  font-size: 0.88rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.akun-peran { color: #f0c9cf; font-size: 0.72rem; }
.akun-info:hover .akun-nama { text-decoration: underline; }

.tombol-akun {
  display: inline-block;
  padding: var(--space-2) var(--space-4);
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.65);
  color: #fff;
  font: inherit;
  font-size: 0.88rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.tombol-akun:hover { background: #fff; color: var(--merah-tua); }

/* ----- Dropdown & submenu ----- */
.dropdown-menu,
.submenu {
  display: none;
  position: absolute;
  min-width: 220px;
  list-style: none;
  margin: 0;
  padding: 0;
  background: var(--panel);
  border: 1px solid var(--garis);
  border-top: 3px solid var(--merah);
  box-shadow: var(--shadow-hover);
}
.dropdown-menu { top: 100%; left: 0; }
.submenu { top: -3px; left: 100%; }

/* hover (mouse) + focus-within (keyboard) */
.nav-item:hover > .dropdown-menu,
.nav-item:focus-within > .dropdown-menu,
.dropdown-item:hover > .submenu,
.dropdown-item:focus-within > .submenu {
  display: block;
  animation: fadeIn 0.2s ease-out;
}
.dropdown-item { position: relative; }

.dropdown-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  color: var(--tinta);
  text-decoration: none;
  font-size: 0.9rem;
  border-bottom: 1px solid var(--garis);
}
.dropdown-link:hover { background: var(--merah-muda); color: var(--merah-tua); }

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ----- Hamburger (mobile) ----- */
.hamburger-btn {
  display: none;
  margin-left: auto;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  cursor: pointer;
}
.hamburger-btn:hover { background: rgba(255, 255, 255, 0.12); }

@media (max-width: 1180px) {
  .hamburger-btn { display: flex; }
  .nav-menu {
    display: none;
    flex: 0 0 100%;
    flex-direction: column;
    align-items: stretch;
    padding-top: var(--space-2);
  }
  .nav-menu.open { display: flex; }
  .nav-item { width: 100%; }
  .nav-akun {
    margin: var(--space-3) 0 var(--space-2);
    padding: var(--space-3) var(--space-3) 0;
    border-top: 1px solid rgba(255, 255, 255, 0.15);
    justify-content: space-between;
  }

  /* dropdown tampil statis di dalam menu mobile */
  .dropdown-menu,
  .submenu {
    display: block;
    position: static;
    min-width: 0;
    background: transparent;
    border: 0;
    box-shadow: none;
    padding-left: var(--space-4);
  }
  .dropdown-link {
    color: #f3dade;
    border-bottom: 0;
    padding: var(--space-2) var(--space-3);
  }
  .dropdown-link:hover { background: rgba(255, 255, 255, 0.1); color: #fff; }
  .dropdown-link svg, .indikator { display: none; }
}
</style>