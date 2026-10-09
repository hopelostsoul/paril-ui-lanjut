<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Location Indicator: dibangun dari route.matched + meta.breadcrumb
// meta.breadcrumb boleh berupa teks atau fungsi (untuk label dinamis)
const crumbs = computed(() => {
  const list = route.matched
    .filter((r) => r.meta && r.meta.breadcrumb)
    .map((r) => ({
      label: typeof r.meta.breadcrumb === 'function' ? r.meta.breadcrumb(route) : r.meta.breadcrumb,
      // path dinamis (":id") diganti path aktual
      path: r.path.includes(':') ? route.path : r.path,
    }))

  if (route.name !== 'beranda') list.unshift({ label: 'Beranda', path: '/' })
  return list
})
</script>

<template>
  <!-- Di Beranda hanya ada satu crumb, jadi tidak ditampilkan -->
  <nav v-if="crumbs.length > 1" class="breadcrumb" aria-label="Breadcrumb">
    <ol>
      <li v-for="(crumb, i) in crumbs" :key="crumb.path">
        <span v-if="i > 0" class="separator" aria-hidden="true">/</span>
        <router-link v-if="i < crumbs.length - 1" :to="crumb.path">{{ crumb.label }}</router-link>
        <span v-else class="active-crumb" aria-current="page">{{ crumb.label }}</span>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.breadcrumb { margin-bottom: var(--space-6); font-size: 0.88rem; }
.breadcrumb ol {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2);
  margin: 0;
  padding: 0;
}
.breadcrumb li { display: flex; align-items: center; gap: var(--space-2); }
.breadcrumb a { color: var(--merah); text-decoration: none; font-weight: 500; }
.breadcrumb a:hover { text-decoration: underline; }
.separator { color: var(--abu); }
.active-crumb { color: var(--tinta); font-weight: 600; }
</style>