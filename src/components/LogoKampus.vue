<script setup>
defineProps({ ukuran: { type: Number, default: 32 } })
</script>

<template>
  <!-- Logo perpustakaan kampus: topi toga (wisuda) + buku terbuka -->
  <svg
    :width="ukuran"
    :height="ukuran"
    viewBox="0 0 40 40"
    role="img"
    aria-label="Logo Perpustakaan Telkom University"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="40" height="40" rx="4" fill="#c8102e" />
    <!-- topi toga -->
    <polygon points="20,6 33,12 20,18 7,12" fill="#fff" />
    <path d="M13 15 V20 Q20 23.5 27 20 V15 L20 18 Z" fill="#fff" opacity="0.75" />
    <line x1="33" y1="12" x2="33" y2="19" stroke="#fff" stroke-width="1.5" stroke-linecap="round" />
    <circle cx="33" cy="20" r="1.4" fill="#fff" />
    <!-- buku terbuka -->
    <path d="M6 26 Q13 23.5 20 26.5 V35 Q13 32.5 6 35 Z" fill="#fff" />
    <path d="M34 26 Q27 23.5 20 26.5 V35 Q27 32.5 34 35 Z" fill="#fff" />
    <line x1="20" y1="26.5" x2="20" y2="35" stroke="#c8102e" stroke-width="1" />
  </svg>
</template>