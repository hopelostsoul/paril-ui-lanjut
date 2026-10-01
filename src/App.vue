<template>
  <nav>
    <router-link to="/" class="brand" style="text-decoration: none;">
      <span class="brand__mark">TU</span>
      <span class="brand__teks">
        Perpustakaan
        <small>Telkom University</small>
      </span>
    </router-link>
    <router-link class="tautan" to="/">Beranda</router-link>
    <router-link class="tautan" to="/katalog">Katalog Buku</router-link>
    <router-link class="tautan" to="/pencarian">Pencarian</router-link>
    <router-link class="tautan" to="/peminjaman">Peminjaman Saya</router-link>
    <router-link class="tautan" to="/profil">Profil Saya</router-link>
  </nav>
  <main>
    <router-view />
  </main>
</template>