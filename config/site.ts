export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'Blue Waterfall',
  description: 'Wij MAKEN WEBSITES MET PASSIE',
  nav: [
    { title: 'Overzicht', href: '/authenticated/overzicht' },
    { title: 'Vak Formulier', href: '/authenticated/vakformulier' },
  ],
};
