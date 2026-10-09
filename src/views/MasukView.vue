<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { daftarPengguna } from '../data/pengguna'
import LogoKampus from '../components/LogoKampus.vue'

// Ubah ke false sebelum aplikasi dipakai sungguhan
const TAMPILKAN_AKUN_DEMO = true

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()

const daftarPeran = [
  { kunci: 'mahasiswa', label: 'Mahasiswa', idLabel: 'NIM', contoh: '2026001' },
  { kunci: 'dosen', label: 'Dosen', idLabel: 'ID Dosen', contoh: 'dosen01' },
  { kunci: 'pustakawan', label: 'Pustakawan', idLabel: 'ID Pustakawan', contoh: 'pustakawan01' },
]

const peran = ref('mahasiswa')
const username = ref('')
const password = ref('')
const lihatSandi = ref(false)
const galat = ref('')

const peranAktif = computed(() => daftarPeran.find((p) => p.kunci === peran.value))
const akunDemo = computed(() => daftarPengguna.filter((p) => p.peran === peran.value))

function pilihPeran(kunci) {
  peran.value = kunci
  username.value = ''
  password.value = ''
  galat.value = ''
}

function isiOtomatis(akun) {
  username.value = akun.username
  password.value = akun.password
  galat.value = ''
}

function kirim() {
  galat.value = ''
  const { idLabel, label } = peranAktif.value

  if (!username.value.trim() || !password.value) {
    galat.value = `${idLabel} dan kata sandi wajib diisi.`
    return
  }
  if (!auth.login(username.value, password.value, peran.value)) {
    galat.value = `${idLabel} atau kata sandi salah, atau akun ini bukan akun ${label.toLowerCase()}.`
    return
  }

  // kembali ke halaman yang tadi dituju (hanya path internal)
  const r = route.query.redirect
  const aman = typeof r === 'string' && r.startsWith('/') && !r.startsWith('//')
  router.push(aman ? r : peran.value === 'pustakawan' ? '/dashboard' : '/')
}
</script>

<template>
  <div class="masuk-page">
    <div class="masuk-kartu">
      <aside class="panel-brand">
        <LogoKampus :ukuran="56" />
        <h2>Perpustakaan Telkom University</h2>
        <p>Masuk dengan akun kampus untuk meminjam buku dan memantau peminjamanmu.</p>
      </aside>

      <section class="panel-form">
        <h1>Masuk</h1>
        <p class="subjudul">Pilih jenis akunmu, lalu masukkan data login.</p>

        <div class="pilih-peran" role="group" aria-label="Jenis akun">
          <button
            v-for="p in daftarPeran"
            :key="p.kunci"
            type="button"
            class="peran"
            :class="{ aktif: peran === p.kunci }"
            :aria-pressed="peran === p.kunci"
            @click="pilihPeran(p.kunci)"
          >
            {{ p.label }}
          </button>
        </div>

        <form @submit.prevent="kirim" novalidate>
          <label class="field">
            <span>{{ peranAktif.idLabel }}</span>
            <input
              v-model="username"
              type="text"
              autocomplete="username"
              :placeholder="`Contoh: ${peranAktif.contoh}`"
            />
          </label>

          <label class="field">
            <span>Kata sandi</span>
            <div class="sandi">
              <input
                v-model="password"
                :type="lihatSandi ? 'text' : 'password'"
                autocomplete="current-password"
                placeholder="Masukkan kata sandi"
              />
              <button type="button" class="toggle" :aria-pressed="lihatSandi" @click="lihatSandi = !lihatSandi">
                {{ lihatSandi ? 'Sembunyikan' : 'Tampilkan' }}
              </button>
            </div>
          </label>

          <p v-if="galat" class="galat" role="alert">{{ galat }}</p>

          <button type="submit" class="btn btn-masuk">Masuk</button>
        </form>

        <details v-if="TAMPILKAN_AKUN_DEMO" class="demo">
          <summary>Akun contoh (khusus demo)</summary>
          <ul>
            <li v-for="a in akunDemo" :key="a.username">
              <span>
                <strong>{{ a.username }}</strong> / {{ a.password }}
                <small>{{ a.nama }}</small>
              </span>
              <button type="button" class="isi" @click="isiOtomatis(a)">Isi otomatis</button>
            </li>
          </ul>
        </details>
      </section>
    </div>
  </div>
</template>

<style scoped>
.masuk-kartu {
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  max-width: 880px;
  margin: var(--space-6) auto 0;
  background: var(--panel);
  border: 1px solid var(--garis);
  box-shadow: var(--shadow-hover);
}

/* ----- Panel brand (kiri) ----- */
.panel-brand {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--space-4);
  padding: var(--space-12) var(--space-8);
  background: linear-gradient(160deg, var(--merah-tua), #2a0a12);
  color: #fff;
}
.panel-brand h2 { margin: 0; font-family: var(--font-judul); font-size: 1.5rem; line-height: 1.25; }
.panel-brand p { margin: 0; color: #f0c9cf; font-size: 0.92rem; }

/* ----- Form (kanan) ----- */
.panel-form { padding: var(--space-8); }
.panel-form h1 { font-size: 1.7rem; }
.panel-form .subjudul { margin-bottom: var(--space-6); }

.pilih-peran { display: flex; gap: var(--space-1); margin-bottom: var(--space-6); border-bottom: 1px solid var(--garis); }
.peran {
  flex: 1;
  padding: var(--space-3) var(--space-2);
  background: none;
  border: 0;
  border-bottom: 3px solid transparent;
  margin-bottom: -1px;
  color: var(--abu);
  font: inherit;
  font-size: 0.92rem;
  font-weight: 500;
  cursor: pointer;
}
.peran:hover { color: var(--merah-tua); }
.peran.aktif { color: var(--merah-tua); border-bottom-color: var(--merah); font-weight: 600; }

.field { display: block; margin-bottom: var(--space-4); }
.field > span { display: block; margin-bottom: var(--space-1); font-size: 0.85rem; font-weight: 600; }
.field input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--garis);
  background: #fff;
  font: inherit;
  font-size: 0.95rem;
}
.field input:focus { border-color: var(--merah); }

.sandi { display: flex; }
.sandi input { flex: 1; min-width: 0; }
.toggle {
  padding: 0 var(--space-4);
  background: var(--krem);
  border: 1px solid var(--garis);
  border-left: 0;
  color: var(--abu);
  font: inherit;
  font-size: 0.8rem;
  cursor: pointer;
}
.toggle:hover { color: var(--merah-tua); }

.galat {
  margin: 0 0 var(--space-4);
  padding: var(--space-3) var(--space-4);
  background: var(--merah-muda);
  border-left: 4px solid var(--merah);
  color: var(--merah-tua);
  font-size: 0.88rem;
}

.btn-masuk { width: 100%; padding: var(--space-3); font-size: 1rem; font-weight: 600; }

/* ----- Akun demo ----- */
.demo { margin-top: var(--space-6); padding-top: var(--space-4); border-top: 1px dashed var(--garis); font-size: 0.85rem; }
.demo summary { cursor: pointer; color: var(--abu); font-weight: 500; }
.demo ul { list-style: none; margin: var(--space-3) 0 0; padding: 0; }
.demo li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-2) 0;
  border-bottom: 1px solid var(--garis);
}
.demo small { display: block; color: var(--abu); }
.isi {
  flex-shrink: 0;
  padding: var(--space-1) var(--space-3);
  background: #fff;
  border: 1px solid var(--merah);
  color: var(--merah-tua);
  font: inherit;
  font-size: 0.78rem;
  cursor: pointer;
}
.isi:hover { background: var(--merah-muda); }

@media (max-width: 768px) {
  .masuk-kartu { grid-template-columns: 1fr; }
  .panel-brand { padding: var(--space-6); }
  .panel-form { padding: var(--space-6); }
}
</style>