<script setup>
const user = {
  nama: 'Mahasiswa Contoh',
  email: 'mahasiswa@telkomuniversity.ac.id',
  nim: '2026001',
}
</script>

<template>
  <h1>Profil Saya</h1>
  <p class="subjudul">Data akun perpustakaan kamu.</p>

  <div class="profil-kartu">
    <div class="profil-avatar">{{ user.nama.charAt(0) }}</div>
    <div>
      <h3>{{ user.nama }}</h3>
      <p>{{ user.email }}</p>
      <p>NIM: {{ user.nim }}</p>
    </div>
  </div>
</template>