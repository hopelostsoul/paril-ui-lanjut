import { createRouter, createWebHistory } from 'vue-router'

// Lazy-loaded views: tiap halaman baru diunduh browser saat benar-benar
// dikunjungi, bukan sekaligus di awal (code-splitting).
const BerandaView = () => import('../views/BerandaView.vue')
const KatalogLayout = () => import('../views/KatalogLayout.vue')
const KatalogBukuView = () => import('../views/KatalogBukuView.vue')
const DetailBukuView = () => import('../views/DetailBukuView.vue')
const PencarianView = () => import('../views/PencarianView.vue')
const PeminjamanView = () => import('../views/PeminjamanView.vue')
const ProfilSayaView = () => import('../views/ProfilSayaView.vue')
const NotFoundView = () => import('../views/NotFoundView.vue')

// Site map:
// Beranda (entry point)
//  |- Katalog Buku (parent route, punya child route bersarang)
//  |    `- Detail Buku   (child route: /katalog/:id)
//  |- Pencarian
//  |- Peminjaman Saya
//  |- Profil Saya
//  `- path lain -> halaman 404

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'beranda', component: BerandaView, meta: { title: 'Beranda' } },
    {
      path: '/katalog',
      component: KatalogLayout,
      meta: { title: 'Katalog Buku' },
      children: [
        { path: '', name: 'katalog', component: KatalogBukuView },
        {
          path: ':id',
          name: 'detail-buku',
          component: DetailBukuView,
          props: true,
          meta: { title: 'Detail Buku' },
        },
      ],
    },
    {
      path: '/pencarian',
      name: 'pencarian',
      component: PencarianView,
      meta: { title: 'Pencarian' },
    },
    {
      path: '/peminjaman',
      name: 'peminjaman',
      component: PeminjamanView,
      meta: { title: 'Peminjaman Saya' },
    },
    {
      path: '/profil',
      name: 'profil',
      component: ProfilSayaView,
      meta: { title: 'Profil Saya' },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
      meta: { title: 'Halaman Tidak Ditemukan' },
    },
  ],
})

// Navigation guard: dijalankan setiap kali pindah halaman.
// Contoh paling umum: mengatur judul tab browser secara dinamis.
router.beforeEach((to) => {
  document.title = `${to.meta.title ?? 'Perpustakaan'} · Perpustakaan Kampus`
})

export default router