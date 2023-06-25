export const useMenu = () => useState('menu',() =>[
  {
    path: "/",
    icon: "HomeFilled",
    title: "Home",
  },
  {
    path: "/transaksi",
    icon: "Memo",
    title: "Transaksi",
    sub_menu: [
      {
        path: "/transaksi/income",
        title: "Transaksi Masuk",
      },
      {
        path: "/transaksi/outgoing",
        title: "Transaksi Keluar",
      },
    ],
  },
  {
    path : "/user",
    icon : "User",
    title : "User Management"
  }
])
