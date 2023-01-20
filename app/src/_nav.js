export default (i18n) => [
  {
    icon: "mdi-view-dashboard",
    text: i18n.t("menu.dashboard"),
    link: "/admin/dashboard",
  },
  { divider: true },

  // admin.getResourceLink("posts"),
  {
    icon: "mdi-card-bulleted-settings-outline",
    text: "Scooters",
    link: "/admin/scooter",
  },
  // {
  //   icon: "mdi-human-male",
  //   text: "Customer",
  //   link: "/admin/customer",
  // },
  // admin.getResourceLink("serial_no"),
  // admin.getResourceLink("users"),
];
