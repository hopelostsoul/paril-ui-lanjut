import { createRouter, createWebHistory } from 'vue-router'

import BerandaView from '../views/BerandaView.vue'
import KatalogBukuView from '../views/KatalogBukuView.vue'
import DetailBukuView from '../views/DetailBukuView.vue'
import PencarianView from '../views/PencarianView.vue'
import PeminjamanView from '../views/PeminjamanView.vue'
import ProfilSayaView from '../views/ProfilSayaView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'beranda', component: BerandaView },
    { path: '/katalog', name: 'katalog', component: KatalogBukuView },
    { path: '/katalog/:id', name: 'detail-buku', component: DetailBukuView, props: true },
    { path: '/pencarian', name: 'pencarian', component: PencarianView },
    { path: '/peminjaman', name: 'peminjaman', component: PeminjamanView },
    { path: '/profil', name: 'profil', component: ProfilSayaView },
  ],
})

export default router