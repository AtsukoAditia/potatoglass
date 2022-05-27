// import Cookies from 'js-cookie'
import Vue from 'vue'
import VueRouter from 'vue-router'
import { core } from '../config/pluginInit'

/* Layouts */
// const VerticleLayout = () => import('../layouts/VerticleLayout')
const Default = () => import('../layouts/BlankLayout')
const AuthLayout = () => import('../layouts/AuthLayouts/AuthLayout')
const TwoSidebar = () => import('../layouts/TwoSidebar')
// const HorizantalLayout = () => import('../layouts/HorizantalLayout')
/* Dashboards View */
const Dashboard1 = () => import('../views/Dashboards/Dashboard1.vue')
const DashboardVendor = () => import('../views/Dashboards/DashboardVendor.vue')
const DashboardContractor = () => import('../views/Dashboards/DashboardContractor.vue')
const ChatIndex = () => import('../views/Apps/Chat/Index')

/* Vendor Menu */
const MaterialList = () => import('../views/Pages/Vendor/MaterialList')
const MaterialAdd = () => import('../views/Pages/Vendor/MaterialAdd')
const MaterialEdit = () => import('../views/Pages/Vendor/editMaterialVendor')
const MaterialDetail = () => import('../views/Pages/Vendor/MaterialDetail')
const MaterialCategory = () => import('../views/Pages/Vendor/MaterialCategory')
// const Booking = () => import('../views/Pages/BookingBelanja')
const TransaksiSummary = () => import('../views/Pages/Vendor/TransaksiSummary')
const TransaksiPerVendor = () => import('../views/Pages/Vendor/TransaksiPerVendor')
const TransaksiByTanggal = () => import('../views/Pages/Vendor/TransaksiByTanggal')
const TransaksiJenisMaterial = () => import('../views/Pages/Vendor/TransaksiJenisMaterial')
const Wishlist = () => import('../views/Pages/Vendor/Wishlist')
const WishlistDetail = () => import('../views/Pages/Vendor/WishlistDetail')
const BookingAll = () => import('../views/Pages/Vendor/BookingAll')
const BookingContractor = () => import('../views/Pages/Vendor/BookingContractor')
const BookingMaterial = () => import('../views/Pages/Vendor/BookingMaterial')
const BookingDetail = () => import('../views/Pages/Vendor/BookingDetail')
const BookingPriceSetting = () => import('../views/Pages/Vendor/BookingPriceSetting')
const BookingHistory = () => import('../views/Pages/Vendor/BookingHistory')
const BookingDelivery = () => import('../views/Pages/Vendor/BookingDelivery')
const BookingTogether = () => import('../views/Pages/Vendor/BookingTogether')
const BookingTogetherList = () => import('../views/Pages/Vendor/BookingTogetherList')
const EditDataProfile = () => import('../views/Pages/Vendor/EditDataProfile')
const Gudang = () => import('../views/Pages/Vendor/Gudang')
const PriceComparison = () => import('../views/Pages/Vendor/PriceComparison')
const CompetitorList = () => import('../views/Pages/Vendor/CompetitorList')
const AccountInfo = () => import('../views/Pages/Vendor/Account/AccountInfo')
const ResolusiView = () => import('../views/Pages/Vendor/ResolusiView')
const SettingPenjualan = () => import('../views/Pages/Vendor/SettingPenjualan')
const SettingPengiriman = () => import('../views/Pages/Vendor/SettingPengiriman')
const SettingPromoVoc = () => import('../views/Pages/Vendor/SettingPromoVoc')
const SettingInformasi = () => import('../views/Pages/Vendor/SettingInformasi')
const SettingEtalase = () => import('../views/Pages/Vendor/SettingEtalase')
const SettingChat = () => import('../views/Pages/Vendor/SettingChat')
const WalletVendor = () => import('../views/Pages/Vendor/WalletVendor')

const selectAds = () => import('../views/Pages/Vendor/AdsSelect')
const searchAds = () => import('../views/Pages/Vendor/AdsSearch')
const relatedAds = () => import('../views/Pages/Vendor/AdsRelated')

// Admin
const TypeList = () => import('../views/Pages/Admin/TypeList')
const UserList = () => import('../views/Pages/Admin/UserList')
const UserLog = () => import('../views/Pages/Admin/UserLog')
const UserManage = () => import('../views/Pages/Admin/UserManage')
const RoleList = () => import('../views/Pages/Admin/RoleList')
const CategoryList = () => import('../views/Pages/Admin/CategoryList')
const VendorList = () => import('../views/Pages/Admin/VendorList')
const VendorVerif = () => import('../views/Pages/Admin/VendorVerified')
const VendorAdd = () => import('../views/Pages/Admin/VendorAdd')
const VendorEdit = () => import('../views/Pages/Admin/VendorEdit')
const ContractorList = () => import('../views/Pages/Admin/ContractorList')
const ContractorVerif = () => import('../views/Pages/Admin/ContractorVerified')
const ContractorAdd = () => import('../views/Pages/Admin/ContractorAdd')
const ContractorEdit = () => import('../views/Pages/Admin/ContractorEdit')
const MaterialListAdm = () => import('../views/Pages/Admin/MaterialList')
const MaterialVendorAdm = () => import('../views/Pages/Admin/Report/MaterialVendor')
const TemplateList = () => import('../views/Pages/Admin/TemplateStdList')
const DocumentList = () => import('../views/Pages/Admin/DocumentList')
const WilayahList = () => import('../views/Pages/Admin/WilayahList')
const HelpList = () => import('../views/Pages/Admin/HelpList')
const TableList = () => import('../views/Pages/Admin/TableList')
const TableDetail = () => import('../views/Pages/Admin/TableDetail')
const MenuList = () => import('../views/Pages/Admin/MenuList')
const MenuDetail = () => import('../views/Pages/Admin/MenuDetail')
const transactionList = () => import('../views/Pages/Admin/TransactionList')
const MerkVerifList = () => import('../views/Pages/Admin/VendorMerk')
const MasterMaterialReq = () => import('../views/Pages/Admin/VendorCategory')

/* Authentic View */
const SignIn1 = () => import('../views/AuthPages/Default/SignIn1')
const SignUp1 = () => import('../views/AuthPages/Default/SignUp1')
const RecoverPassword1 = () => import('../views/AuthPages/Default/RecoverPassword1')
const LockScreen1 = () => import('../views/AuthPages/Default/LockScreen1')
const ConfirmMail1 = () => import('../views/AuthPages/Default/ConfirmMail1')
const Callback = () => import('../views/AuthPages/Default/Callback')

// Ecommerce
const ECommerceListing = () => import('../views/Pages/Ecommerce/Listing')
const MarketPlace = () => import('../views/Pages/MarketPlace')
const vDetailMaterial = () => import('../views/Pages/vDetailMaterial')
const vDetailVendor = () => import('../views/Pages/vDetailVendor')

/* Extra Pages */
const ComingSoon = () => import('../views/Pages/ComingSoon')

/* User View */
const Profile = () => import('../views/User/Profile')
const ProfileEdit = () => import('../views/User/ProfileEdit')
const AddUser = () => import('../views/User/AddUser')
/* Apps View */
const TicketListing = () => import('../views/Apps/Ticket/TicketListing')
const TicketDetail = () => import('../views/Apps/Ticket/TicketDetail')
Vue.use(VueRouter)

const childRoutes = (prop) => [
  {
    path: 'home-1',
    name: prop + '.home-1',
    meta: { auth: true,
      name: 'Dashboard Admin',
      breadcrumb: [
        { name: 'Home' }
      ] },
    component: Dashboard1
  },
  {
    path: 'vdashboard',
    name: prop + '.vdashboard',
    meta: { auth: true,
      name: 'Dashboard Vendor',
      breadcrumb: [
        { name: 'Home' }
      ] },
    component: DashboardVendor
  }, {
    path: 'cdashboard',
    name: prop + '.cdashboard',
    meta: { auth: true,
      name: 'Dashboard User',
      breadcrumb: [
        { name: 'Home' }
      ] },
    component: DashboardContractor
  }
  // {
  //   path: 'booking',
  //   name: prop + '.booking',
  //   meta: { auth: true, name: 'booking' },
  //   component: Booking
  // }
]

const marketplaceRoutes = (prop) => [
  {
    path: 'marketplace',
    name: prop + '.marketplace',
    // meta: { auth: true, name: 'Marketplace' },
    component: MarketPlace
  },
  {
    path: 'materials/:id',
    name: prop + '.detail',
    // meta: { auth: true, name: 'Marketplace' },
    component: vDetailMaterial
  },
  {
    path: 'store/:id',
    name: prop + '.detail-vendor',
    // meta: { auth: true, name: 'Marketplace' },
    component: vDetailVendor
  }
]

const ecommerceRoutes = (prop) => [
  {
    path: 'ecommerce',
    name: prop + '.e-commerce.index',
    meta: { auth: true, name: 'Product list' },
    component: ECommerceListing
  }
]

const ticketingRoutes = (prop) => [
  {
    path: 'ticket',
    name: prop + '.ticket',
    meta: { auth: true,
      name: 'Tiket',
      breadcrumb: [
        { name: 'Home', link: 'home-1' },
        { name: 'Tiket' }
      ] },
    component: TicketListing
  },
  {
    path: 'ticket/:id',
    name: prop + '.detail',
    meta: { auth: true,
      name: 'Tiket',
      breadcrumb: [
        { name: 'Home', link: 'home-1' },
        { name: 'Tiket', link: '/ticket' },
        { name: 'Tiket Detail' }
      ] },
    component: TicketDetail
  }
]

const adminRoutes = (prop) => [
  {
    path: 'type',
    name: prop + '.type',
    meta: { auth: true, name: 'Managemen Type' },
    component: TypeList
  },
  {
    path: 'user',
    name: prop + '.user',
    meta: { auth: true, name: 'Managemen Users' },
    component: UserList
  },
  {
    path: 'user-manage',
    name: prop + '.user-manage',
    meta: { auth: true, name: 'Managemen Akses untuk User' },
    component: UserManage
  },
  {
    path: 'user-log',
    name: prop + '.user-log',
    meta: { auth: true, name: 'Log Aktivitas Pengguna' },
    component: UserLog
  },
  {
    path: 'role',
    name: prop + '.role',
    meta: { auth: true, name: 'Managemen Role User' },
    component: RoleList
  },
  {
    path: 'category',
    name: prop + '.category',
    meta: { auth: true, name: 'Managemen Category' },
    component: CategoryList
  }
]
// const horizontalRoute = (prop) => [
// ]
// const coreChildRoute = (prop) => [
//   {
//     path: 'ui-colors',
//     name: prop + '.color',
//     meta: { auth: true, name: 'Colors' },
//     component: UiColors
//   },
//   {
//     path: 'ui-typography',
//     name: prop + '.typography',
//     meta: { auth: true, name: 'Typography' },
//     component: UiTypography
//   },
//   {
//     path: 'ui-alerts',
//     name: prop + '.alert',
//     meta: { auth: true, name: 'Alert' },
//     component: UiAlerts
//   },
//   {
//     path: 'ui-buttons',
//     name: prop + '.button',
//     meta: { auth: true, name: 'Button' },
//     component: UiButtons
//   },
//   {
//     path: 'ui-breadcrumb',
//     name: prop + '.breadcrumb',
//     meta: { auth: true, name: 'Breadcrumb' },
//     component: UiBreadcrumb
//   },
//   {
//     path: 'ui-badges',
//     name: prop + '.badges',
//     meta: { auth: true, name: 'Badges' },
//     component: UiBadges
//   },
//   {
//     path: 'ui-cards',
//     name: prop + '.cards',
//     meta: { auth: true, name: 'Card' },
//     component: UiCards
//   },
//   {
//     path: 'ui-carousel',
//     name: prop + '.carousel',
//     meta: { auth: true, name: 'Carousel' },
//     component: UiCarousel
//   },
//   {
//     path: 'ui-grid',
//     name: prop + '.grid',
//     meta: { auth: true, name: 'Grid' },
//     component: UiGrid
//   },
//   {
//     path: 'ui-embed-video',
//     name: prop + '.embed-video',
//     meta: { auth: true, name: 'Embed Video' },
//     component: UiEmbedVideo
//   },
//   {
//     path: 'ui-modal',
//     name: prop + '.modal',
//     meta: { auth: true, name: 'Model' },
//     component: UiModal
//   },
//   {
//     path: 'ui-listgroup',
//     name: prop + '.listgroup',
//     meta: { auth: true, name: 'List Group' },
//     component: UiListGroup
//   },
//   {
//     path: 'ui-images',
//     name: prop + '.images',
//     meta: { auth: true, name: 'Image' },
//     component: UiImages
//   },
//   {
//     path: 'ui-media-object',
//     name: prop + '.media-object',
//     meta: { auth: true, name: 'Media Object' },
//     component: UiMediaObject
//   },
//   {
//     path: 'ui-pagination',
//     name: prop + '.pagination',
//     meta: { auth: true, name: 'Paginations' },
//     component: UiPagination
//   },
//   {
//     path: 'ui-progressbars',
//     name: prop + '.progressbars',
//     meta: { auth: true, name: 'Progressbar' },
//     component: UiProgressBars
//   },
//   {
//     path: 'ui-tooltips',
//     name: prop + '.tooltips',
//     meta: { auth: true, name: 'Tooltip' },
//     component: UiTooltips
//   },
//   {
//     path: 'ui-popovers',
//     name: prop + '.popovers',
//     meta: { auth: true, name: 'Popover' },
//     component: UiPopovers
//   },
//   {
//     path: 'ui-notifications',
//     name: prop + '.notifications',
//     meta: { auth: true, name: 'Notification' },
//     component: UiNotifications
//   },
//   {
//     path: 'ui-tabs',
//     name: prop + '.tabs',
//     meta: { auth: true, name: 'Tabs' },
//     component: UiTabs
//   }
// ]

// const chartChildRoutes = (prop) => [
//   {
//     path: 'apex-charts',
//     name: prop + '.apex',
//     meta: { auth: true, name: 'Apex Chart' },
//     component: ApexCharts
//   },
//   {
//     path: 'am-charts',
//     name: prop + '.am',
//     meta: { auth: true, name: 'Am Chart' },
//     component: AmCharts
//   },
//   {
//     path: 'high-charts',
//     name: prop + '.high',
//     meta: { auth: true, name: 'High Chart' },
//     component: HighCharts
//   },
//   {
//     path: 'morris-charts',
//     name: prop + '.morris',
//     meta: { auth: true, name: 'Mirris Chart' },
//     component: MorrisCharts
//   }
// ]

const appChildRoute = (prop) => [
  {
    path: 'chat',
    name: prop + '.chat',
    meta: { auth: true },
    component: ChatIndex
  }
//   {
//     path: 'email',
//     name: prop + '.email',
//     meta: { auth: true, name: 'Email' },
//     component: EmailListing
//   },
//   {
//     path: 'email-compose',
//     name: prop + '.email.compose',
//     meta: { auth: true, name: 'New Email' },
//     component: EmailCompose
//   },
//   {
//     path: 'project-management',
//     name: prop + '.project.management',
//     meta: { auth: true, name: 'Project Management' },
//     component: ProjectBoard
//   }
]

const authChildRoutes = (prop) => [
  {
    path: 'sign-in1',
    name: prop + '.sign-in1',
    meta: { auth: true },
    component: SignIn1
  },
  {
    path: 'sign-up1',
    name: prop + '.sign-up1',
    meta: { auth: true },
    component: SignUp1
  },
  {
    path: 'password-reset1',
    name: prop + '.password-reset1',
    meta: { auth: true },
    component: RecoverPassword1
  },
  {
    path: 'lock-screen1',
    name: prop + '.lock-screen1',
    meta: { auth: true },
    component: LockScreen1
  },
  {
    path: 'confirm-mail1',
    name: prop + '.confirm-mail1',
    meta: { auth: true },
    component: ConfirmMail1
  }
]

// const defaultlayout = (prop) => [
//   {
//     path: 'timeline',
//     name: prop + '.timeline',
//     meta: { auth: true, name: 'Timeline' },
//     component: TimeLine
//   },
//   {
//     path: 'invoice',
//     name: prop + '.invoice',
//     meta: { auth: true, name: 'Invoice' },
//     component: Invoice
//   },
//   {
//     path: 'blank-page',
//     name: prop + '.blank-page',
//     meta: { auth: true, name: 'Blank Page' },
//     component: BlankPage
//   },
//   {
//     path: 'pricing',
//     name: prop + '.pricing',
//     meta: { auth: true, name: 'Pricing' },
//     component: Pricing
//   },
//   {
//     path: 'pricing-1',
//     name: prop + '.pricing1',
//     meta: { auth: true, name: 'Pricing 1' },
//     component: Pricing1
//   },
//   {
//     path: 'faq',
//     name: prop + '.faq',
//     meta: { auth: true, name: 'Faq' },
//     component: FAQ
//   }
// ]

const pagesChildRoutes = (prop) => [
//   {
//     path: 'error/:code',
//     name: prop + '.error',
//     meta: { auth: true },
//     component: ErrorPage
//   },
  {
    path: 'coming-soon',
    name: prop + '.coming-soon',
    meta: { auth: true },
    component: ComingSoon
  }
//   {
//     path: 'maintenance',
//     name: prop + '.maintenance',
//     meta: { auth: true },
//     component: Maintenance
//   }
]

const transactionChildRoute = (prop) => [
  {
    path: 'transaction',
    name: prop + '.all',
    meta: { auth: true,
      name: 'Semua Pemesanan',
      breadcrumb: [
        { name: 'Home', link: 'home-1' },
        { name: 'Daftar Pesanan' }
      ] },
    component: transactionList
  }
]

const adsChildRoute = (prop) => [
  {
    path: 'ads',
    name: prop + '.ads',
    meta: { auth: true,
      name: 'Promo Iklan',
      breadcrumb: [
        { name: 'Home', link: 'home-1' },
        { name: 'Promo Iklan' }
      ] },
    component: selectAds
  },
  {
    path: 'ads/search',
    name: prop + '.ads-search',
    meta: { auth: true,
      name: 'Iklan Pencarian',
      breadcrumb: [
        { name: 'Home', link: 'home-1' },
        { name: 'Promo Iklan' },
        { name: 'Pencarian' }
      ] },
    component: searchAds
  },
  {
    path: 'ads/related',
    name: prop + '.ads-related',
    meta: { auth: true,
      name: 'Iklan Produk Serupa',
      breadcrumb: [
        { name: 'Home', link: 'home-1' },
        { name: 'Promo Iklan' },
        { name: 'Produk Serupa' }
      ] },
    component: relatedAds
  }
]
const bookingChildRoute = (prop) => [
  {
    path: 'booking',
    name: prop + '.all',
    meta: { auth: true,
      name: 'Semua Pemesanan',
      breadcrumb: [
        { name: 'Home', link: 'home-1' },
        { name: 'Daftar Pesanan' }
      ] },
    component: BookingAll
  },
  {
    path: 'booking/contractor',
    name: prop + '.contractor',
    meta: { auth: true, name: 'Semua Pemesanan Berdasarkan Kontraktor' },
    component: BookingContractor
  },
  {
    path: 'booking/material',
    name: prop + '.material',
    meta: { auth: true, name: 'Semua Pemesanan Berdasarkan Material' },
    component: BookingMaterial
  },
  {
    path: 'booking/history',
    name: prop + '.history',
    meta: { auth: true, name: 'Riwayat Pesanan' },
    component: BookingHistory
  },
  {
    path: 'booking/:id',
    name: prop + '.detail',
    meta: {
      auth: true,
      name: 'Detail Pesanan',
      breadcrumb: [
        { name: 'Home', link: 'home-1' },
        { name: 'Daftar Pesanan', link: '/booking' },
        { name: 'Detail Pesanan' }
      ] },
    component: BookingDetail
  },
  {
    path: 'booking/:id/resolusi',
    name: prop + '.resolusi',
    meta: {
      auth: true,
      name: 'Detail Resolusi',
      breadcrumb: [
        { name: 'Home', link: 'home-1' },
        { name: 'Daftar Pesanan', link: '/booking' },
        { name: 'Resolusi Pesanan' }
      ] },
    component: ResolusiView
  },
  {
    path: 'booking/:id/price-setting',
    name: prop + '.price-setting',
    meta: { auth: true, name: 'Setting Diskon Pesanan' },
    component: BookingPriceSetting
  },
  {
    path: 'booking/:id/delivery',
    name: prop + '.delivery',
    meta: { auth: true, name: 'Setting Pengiriman Pesanan' },
    component: BookingDelivery
  },
  {
    path: 'booking-gabungan/:id',
    name: prop + '.together',
    meta: { auth: true,
      name: 'Detail Pesanan Gabungan',
      breadcrumb: [
        { name: 'Home', link: 'home-1' },
        { name: 'Daftar Order Gabungan', link: '/booking-gabungan' },
        { name: 'Detail Pesanan' }
      ] },
    component: BookingTogether
  },
  {
    path: 'booking-gabungan',
    name: prop + '.together-list',
    meta: { auth: true, name: 'Daftar Pesanan Gabungan' },
    component: BookingTogetherList
  }
]

const settingChildRoute = (prop) => [
  {
    path: 'setting/account',
    name: prop + '.account',
    meta: { auth: true, name: 'Pengaturan Toko' },
    component: AccountInfo
  }, {
    path: 'setting/penjualan',
    name: prop + '.penjualan',
    meta: { auth: true, name: 'Penjualan' },
    component: SettingPenjualan
  }, {
    path: 'setting/pengiriman',
    name: prop + '.pengiriman',
    meta: { auth: true, name: 'Pengiriman' },
    component: SettingPengiriman
  }, {
    path: 'setting/wallet',
    name: prop + '.wallet',
    meta: { auth: true, name: 'Dompet Penghasilan' },
    component: WalletVendor
  }, {
    path: 'setting/promo-voucher',
    name: prop + '.promo-voucher',
    meta: { auth: true, name: 'Atur Promo dan Voucher Anda' },
    component: SettingPromoVoc
  }, {
    path: 'setting/informasi',
    name: prop + '.informasi',
    meta: { auth: true, name: 'Atur Informasi Vendor' },
    component: SettingInformasi
  }, {
    path: 'setting/etalase',
    name: prop + '.etalase',
    meta: { auth: true, name: 'Atur Etalase Vendor' },
    component: SettingEtalase
  }, {
    path: 'setting/template-chat',
    name: prop + '.template-chat',
    meta: { auth: true, name: 'Atur Pesan Otomatis' },
    component: SettingChat
  }
]

const profileChildRoute = (prop) => [
  {
    path: 'profile',
    name: prop + '.profile',
    meta: { auth: true, name: 'Profile' },
    component: Profile
  },
  {
    path: 'profile/:id',
    name: prop + '.profile-other',
    meta: { auth: false, name: 'Profile Other' },
    component: Profile
  },
  {
    path: 'profile-edit',
    name: prop + '.edit',
    meta: { auth: true, name: 'Edit Profile' },
    component: ProfileEdit
  },
  {
    path: 'add-user',
    name: prop + '.add',
    meta: { auth: true, name: 'Add Profile' },
    component: AddUser
  },
  {
    path: 'edit-data-vendor',
    name: prop + '.edit-data-vendor',
    meta: { auth: true, name: 'Edit Vendor Profile' },
    component: EditDataProfile
  }
]

const vendorChildRoutes = (prop) => [
  {
    path: 'vendor/add',
    name: prop + '.addvendor',
    meta: { auth: true, name: 'Add Data Vendor' },
    component: VendorAdd
  },
  {
    path: '/vendor',
    name: prop + '.vendor',
    meta: { auth: true, name: 'Vendor' },
    component: VendorList
  },
  {
    path: '/vendor-verif',
    name: prop + '.vendorverif',
    meta: { auth: true, name: 'Vendor Perlu di Verifikasi' },
    component: VendorVerif
  },
  {
    path: '/vendor-category',
    name: prop + '.vendorcategory',
    meta: { auth: true, name: 'Category Perlu di Verifikasi' },
    component: MasterMaterialReq
  },
  {
    path: '/vendor-merk',
    name: prop + '.vendormerk',
    meta: { auth: true, name: 'Merk Perlu di Verifikasi' },
    component: MerkVerifList
  },
  {
    path: '/vendor/:id',
    name: prop + '.editvendor',
    meta: { auth: true, name: 'Edit Data Vendor' },
    component: VendorEdit
  }
]

const wishlistChildRoutes = (prop) => [
  {
    path: '/wishlist',
    name: prop + '.wishlist',
    meta: { auth: true, name: 'Wishlist' },
    component: Wishlist
  },
  {
    path: '/wishlist/:id',
    name: prop + '.detailwishlist',
    meta: { auth: true, name: 'Wishlist Detail' },
    component: WishlistDetail
  }
]

const contractorChildRoutes = (prop) => [
  {
    path: 'contractor/add',
    name: prop + '.addcontractor',
    meta: { auth: true, name: 'Add Data Contractor' },
    component: ContractorAdd
  },
  {
    path: '/contractor',
    name: prop + '.contractor',
    meta: { auth: true, name: 'Contractor' },
    component: ContractorList
  },
  {
    path: '/contractor-verif',
    name: prop + '.contractorverif',
    meta: { auth: true, name: 'Contractor Perlu di Verifikasi' },
    component: ContractorVerif
  },
  {
    path: '/contractor/:id',
    name: prop + '.editcontractor',
    meta: { auth: true, name: 'Edit Data Contractor' },
    component: ContractorEdit
  }
]

const templateChildRoutes = (prop) => [
  {
    path: '/template',
    name: prop + '.template',
    meta: { auth: true, name: 'Template' },
    component: TemplateList
  }
]

const documentChildRoutes = (prop) => [
  {
    path: '/document',
    name: prop + '.document',
    meta: { auth: true, name: 'Master Dokumen' },
    component: DocumentList
  }
]

const masterWilayahChildRoutes = (prop) => [
  {
    path: '/master-wilayah',
    name: prop + '.master-wilayah',
    meta: { auth: true, name: 'Master Wilayah' },
    component: WilayahList
  }
]

const TableChildRoutes = (prop) => [
  {
    path: '/table',
    name: prop + '.table',
    meta: { auth: true,
      name: 'Manajemen Tabel Aplikasi',
      breadcrumb: [
        { name: 'Home', link: 'home-1' },
        { name: 'Master Table' }
      ] },
    component: TableList
  },
  {
    path: '/table/:id',
    name: prop + '.detail',
    meta: { auth: true,
      name: 'Manajemen Tabel',
      breadcrumb: [
        { name: 'Home', link: 'home-1' },
        { name: 'Master Table', link: '/table' },
        { name: 'Detail' }
      ] },
    component: TableDetail
  }
]

const MenuChildRoutes = (prop) => [
  {
    path: '/menu',
    name: prop + '.menu',
    meta: { auth: true,
      name: 'Manajemen Menu Aplikasi',
      breadcrumb: [
        { name: 'Home', link: 'home-1' },
        { name: 'Master Menu' }
      ] },
    component: MenuList
  },
  {
    path: '/menu/:id',
    name: prop + '.detail',
    meta: { auth: true,
      name: 'Manajemen Menu',
      breadcrumb: [
        { name: 'Home', link: 'home-1' },
        { name: 'Master Menu', link: '/menu' },
        { name: 'Detail' }
      ] },
    component: MenuDetail
  }
]

const helpChildRoutes = (prop) => [
  {
    path: '/help',
    name: prop + '.help',
    meta: { auth: true, name: 'Master Help' },
    component: HelpList
  }
]

const materialChildRoutesAdmin = (prop) => [
  {
    path: '/master-material',
    name: prop + '.master-material',
    meta: { auth: true,
      name: 'Setting Kategori Material',
      breadcrumb: [
        { name: 'Home', link: 'home-1' },
        { name: 'Master Material' }
      ] },
    component: MaterialListAdm
  },
  {
    path: '/master-material/vendor/:id',
    name: prop + '.material-vendor',
    meta: {
      breadcrumb: [
        { name: 'Master Material', link: 'master-material' },
        { name: 'Material by Vendors' }
      ] },
    component: MaterialVendorAdm
  }
]

const gudangChildRoutes = (prop) => [
  {
    path: '/warehouse',
    name: prop + '.warehouse',
    meta: { auth: true,
      name: 'Gudang Vendor',
      breadcrumb: [
        { name: 'Home', link: 'home-1' },
        { name: 'Gudang' }
      ] },
    component: Gudang
  }
]

const materialChildRoutes = (prop) => [
  {
    path: 'material/add',
    name: prop + '.addmaterial',
    meta: { auth: true,
      name: 'Tambah Material',
      breadcrumb: [
        { name: 'Home', link: '/home-1' },
        { name: 'Material', link: '/material' },
        { name: 'Tambah Material' }
      ] },
    component: MaterialAdd
  },
  {
    path: '/material',
    name: prop + '.material',
    meta: { auth: true,
      name: 'Daftar Material',
      breadcrumb: [
        { name: 'Home', link: '/home-1' },
        { name: 'Daftar Material' }
      ] },
    component: MaterialList
  },
  {
    path: '/material/:id',
    name: prop + '.detailmaterial',
    meta: { auth: true,
      name: 'Material Detail',
      breadcrumb: [
        { name: 'Home', link: 'home-1' },
        { name: 'Material', link: '/material' },
        { name: 'Detail Material' }
      ] },
    component: MaterialDetail
  },
  {
    path: '/material/edit/:id',
    name: prop + '.editmaterial',
    meta: { auth: true,
      name: 'Ubah Material Data',
      breadcrumb: [
        { name: 'Home', link: 'home-1' },
        { name: 'Material', link: '/material' },
        { name: 'Ubah Data Material' }
      ] },
    component: MaterialEdit
  },
  {
    path: '/catcategory',
    name: prop + '.catmaterial',
    meta: { auth: true, name: 'Kategori Material' },
    component: MaterialCategory
  },
  {
    path: '/material-comparison',
    name: prop + '.pricecomparison',
    meta: { auth: true,
      breadcrumb: [
        { name: 'Home', link: 'home-1' },
        { name: 'Perbandingan' }
      ] },
    component: PriceComparison
  },
  {
    path: '/competitor',
    name: prop + '.competitor',
    meta: { auth: true,
      breadcrumb: [
        { name: 'Home', link: 'home-1' },
        { name: 'Kompetitor' }
      ] },
    component: CompetitorList
  }
]

const transaksiChildRoutes = (prop) => [
  {
    path: 'summary',
    name: prop + '.summary',
    meta: { auth: true, name: 'Transaksi Summary' },
    component: TransaksiSummary
  },
  {
    path: 'trans-1',
    name: prop + '.trans-1',
    meta: { auth: true, name: 'Transaksi project per-Vendor' },
    component: TransaksiPerVendor
  },
  {
    path: 'trans-2',
    name: prop + '.trans-2',
    meta: { auth: true, name: 'Transaksi project Vendor by Tanggal' },
    component: TransaksiByTanggal
  },
  {
    path: 'trans-3',
    name: prop + '.trans-3',
    meta: { auth: true, name: 'PV Transaksi per-Material' },
    component: TransaksiJenisMaterial
  },
  {
    path: 'coming-soon',
    name: prop + '.coming-soon',
    meta: { auth: true },
    component: ComingSoon
  }
]

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: TwoSidebar,
    meta: { auth: true },
    children: childRoutes('dashboard')
  },
  {
    path: '/app',
    name: 'app',
    component: TwoSidebar,
    meta: { auth: true },
    children: appChildRoute('app')
  },
  {
    path: '/',
    name: 'type',
    component: TwoSidebar,
    meta: { auth: true },
    children: adminRoutes('type')
  },
  {
    path: '/',
    name: 'user',
    component: TwoSidebar,
    meta: { auth: true },
    children: adminRoutes('user')
  },
  {
    path: '/',
    name: 'user-manage',
    component: TwoSidebar,
    meta: { auth: true },
    children: adminRoutes('user-manage')
  },
  {
    path: '/',
    name: 'user-log',
    component: TwoSidebar,
    meta: { auth: true },
    children: adminRoutes('user-log')
  },
  {
    path: '/',
    name: 'profile',
    component: TwoSidebar,
    meta: { auth: true },
    children: profileChildRoute('profile')
  },
  {
    path: '/',
    name: 'setting',
    component: TwoSidebar,
    meta: { auth: true },
    children: settingChildRoute('setting')
  },
  {
    path: '/',
    name: 'role',
    component: TwoSidebar,
    meta: { auth: true },
    children: adminRoutes('role')
  },
  {
    path: '/',
    name: 'category',
    component: TwoSidebar,
    meta: { auth: true },
    children: adminRoutes('category')
  },
  {
    path: '/',
    name: 'vendor',
    component: TwoSidebar,
    meta: { auth: true },
    children: vendorChildRoutes('vendor')
  },
  {
    path: '/',
    name: 'contractor',
    component: TwoSidebar,
    meta: { auth: true },
    children: contractorChildRoutes('contractor')
  },
  {
    path: '/',
    name: 'template',
    component: TwoSidebar,
    meta: { auth: true },
    children: templateChildRoutes('template')
  },
  {
    path: '/',
    name: 'document',
    component: TwoSidebar,
    meta: { auth: true },
    children: documentChildRoutes('document')
  },
  {
    path: '/',
    name: 'master-wilayah',
    component: TwoSidebar,
    meta: { auth: true },
    children: masterWilayahChildRoutes('masterWilayah')
  },
  {
    path: '/',
    name: 'table',
    component: TwoSidebar,
    meta: { auth: true },
    children: TableChildRoutes('table')
  },
  {
    path: '/',
    name: 'menu',
    component: TwoSidebar,
    meta: { auth: true },
    children: MenuChildRoutes('menu')
  },
  {
    path: '/',
    name: 'help',
    component: TwoSidebar,
    meta: { auth: true },
    children: helpChildRoutes('help')
  },
  {
    path: '/',
    name: 'master-material',
    component: TwoSidebar,
    meta: { auth: true },
    children: materialChildRoutesAdmin('admin')
  },
  {
    path: '/',
    name: 'material',
    component: TwoSidebar,
    meta: { auth: true },
    children: materialChildRoutes('material')
  },
  {
    path: '/',
    name: 'warehouse',
    component: TwoSidebar,
    meta: { auth: true },
    children: gudangChildRoutes('warehouse')
  },
  {
    path: '/',
    name: 'ecommerce',
    component: TwoSidebar,
    meta: { auth: true },
    children: ecommerceRoutes('ecommerce')
  },
  {
    path: '/',
    name: 'marketplace',
    component: Default,
    meta: { auth: false },
    children: marketplaceRoutes('marketplace')
  },
  {
    path: '/',
    name: 'transaction',
    component: TwoSidebar,
    meta: { auth: true },
    children: transactionChildRoute('transaction')
  },
  {
    path: '/',
    name: 'ads',
    component: TwoSidebar,
    meta: { auth: true },
    children: adsChildRoute('ads')
  },
  {
    path: '/',
    name: 'booking',
    component: TwoSidebar,
    meta: { auth: true },
    children: bookingChildRoute('booking')
  },
  {
    path: '/auth',
    name: 'auth1',
    component: AuthLayout,
    meta: { auth: true },
    children: authChildRoutes('auth1')
  },
  {
    path: '/transaksi',
    name: 'transaksi',
    component: TwoSidebar,
    meta: { auth: true },
    children: transaksiChildRoutes('transaksi')
  },
  {
    path: '/transportasi',
    name: 'transportasi',
    component: TwoSidebar,
    meta: { auth: true },
    children: pagesChildRoutes('transportasi')
  },
  {
    path: '/wishlist',
    name: 'wishlist',
    component: TwoSidebar,
    meta: { auth: true },
    children: wishlistChildRoutes('wishlist')
  },
  {
    path: '/votherss',
    name: 'vothers',
    component: TwoSidebar,
    meta: { auth: true },
    children: pagesChildRoutes('vothers')
  },
  {
    path: '/',
    name: 'ticket',
    component: TwoSidebar,
    meta: { auth: true },
    children: ticketingRoutes('ticket')
  },
  {
    path: '/callback',
    name: 'callback',
    meta: { auth: false },
    component: Callback
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.VUE_APP_BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  const publicPages = ['/auth/sign-in1', '/auth/sign-up1', '/auth/password-reset1', '/dark/auth/sign-in1', '/dark/auth/sign-up1']
  if (publicPages.includes(to.path)) {
    localStorage.removeItem('intro_v_dash')
    localStorage.removeItem('intro_v_mtrlist')
    localStorage.removeItem('intro_v_mtradd')
    localStorage.removeItem('user')
    localStorage.removeItem('access_token')
  }
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = JSON.parse(localStorage.getItem('user'))
  const timeToken = parseInt(localStorage.getItem('token_exp'))
  const expToken = new Date(timeToken * 1000)
  const nowTime = new Date()

  if (expToken < nowTime) {
    core.showSnackbar('error', 'Token Expired, harap masuk kembali.')
    localStorage.removeItem('user')
    localStorage.removeItem('intro_v_dash')
    localStorage.removeItem('intro_v_mtrlist')
    localStorage.removeItem('intro_v_mtradd')
    localStorage.removeItem('access_token')
    localStorage.removeItem('token_exp')
    return next('/auth/sign-in1')
  } else {
    if (to.meta.auth) {
      if (authRequired && loggedIn === null) {
        return next('/auth/sign-in1')
      } else if (to.name === 'dashboard' || to.name === 'mini.dashboard') {
        if (loggedIn.user.role === '10') {
          return next('/home-1')
        } else if (loggedIn.user.role === '1') {
          return next('/vdashboard')
        } else if (loggedIn.user.role === '2') {
          return next('/cdashboard')
        } else {
          return next('/auth/sign-in1')
        }
      }
    }
  }
  next()
})

export default router
