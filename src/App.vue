<script setup>
import Breadcrumb from './components/Breadcrumb.vue'
import AppIcon from './components/AppIcon.vue'
</script>

<template>
  <header>
    <nav>
      <router-link to="/" class="brand">
        <AppIcon name="book" />
        <span>Perpustakaan Kampus</span>
      </router-link>
      <div class="links">
        <router-link to="/"><AppIcon name="home" />Beranda</router-link>
        <router-link to="/katalog"><AppIcon name="book" />Katalog Buku</router-link>
        <router-link to="/pencarian"><AppIcon name="search" />Pencarian</router-link>
        <router-link to="/peminjaman"><AppIcon name="clock" />Peminjaman</router-link>
        <router-link to="/profil"><AppIcon name="user" />Profil</router-link>
      </div>
    </nav>
  </header>

  <main>
    <Breadcrumb />
    <router-view />
  </main>

  <footer>Perpustakaan Kampus &middot; Tugas Pengembangan UI Lanjut</footer>
</template>