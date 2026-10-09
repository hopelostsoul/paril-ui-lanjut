<script setup>
const user = {
  nama: 'Mahasiswa Contoh',
  email: 'mahasiswa@kampus.ac.id',
  nim: '2026001',
}
</script>

<template>
  <h1>Profil Saya</h1>
  <p class="lede">Data akun perpustakaan kamu.</p>

  <div class="card profile-card">
    <div class="avatar">{{ user.nama[0] }}</div>
    <div>
      <h3>{{ user.nama }}</h3>
      <p>Email: {{ user.email }}</p>
      <p>NIM: {{ user.nim }}</p>
    </div>
  </div>
</template>