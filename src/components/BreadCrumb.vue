<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { daftarBuku } from '../data/buku'
import AppIcon from './AppIcon.vue'

const route = useRoute()

const trail = computed(() => {
  if (route.name === 'katalog' || route.name === 'detail-buku') {
    const items = [{ label: 'Katalog Buku', to: '/katalog' }]
    if (route.name === 'detail-buku') {
      const buku = daftarBuku.find((b) => b.id === Number(route.params.id))
      items.push({ label: buku ? buku.judul : 'Buku', to: null })
    }
    return items
  }
  return route.meta.title ? [{ label: route.meta.title, to: null }] : []
})
</script>

<template>
  <nav v-if="route.name !== 'beranda'" class="breadcrumb" aria-label="Breadcrumb">
    <router-link to="/" class="home-link"><AppIcon name="home" /></router-link>
    <template v-for="(item, i) in trail" :key="i">
      <span class="sep">/</span>
      <router-link v-if="item.to" :to="item.to">{{ item.label }}</router-link>
      <span v-else class="current">{{ item.label }}</span>
    </template>
  </nav>
</template> 