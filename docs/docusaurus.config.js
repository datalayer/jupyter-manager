/** @type {import('@docusaurus/types').DocusaurusConfig} */

// const path = require('path');

module.exports = {
  title: 'Jupyter Manager',
  tagline: '✅ UI and CLI to manage your 🪐 Jupyter stack.',
  url: 'https://jupyter-manager.datalayer.tech',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'datalayer',
  projectName: 'Jupyter Manager',
  plugins: [
    '@datalayer/jupyter-docusaurus-plugin'
  ],
  /*
			'docusaurus-plugin-typedoc',
			{
        entryPoints: ['../src/index.ts'],
        tsconfig: '../tsconfig.json',
			},
  */
  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
    },
    navbar: {
      title: 'Jupyter Manager',
      logo: {
        alt: 'Datalayer Logo',
        src: 'img/datalayer/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: '/category/welcome',
          position: 'left',
          label: 'Welcome',
        },
        {
          href: 'https://github.com/datalayer/jupyter-manager',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/datalayer/jupyter-manager',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/datalayerio',
            },
            {
              label: 'Linkedin',
              href: 'https://www.linkedin.com/company/datalayer',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Datalayer',
              to: 'https://datalayer.io',
            },
            {
              label: 'Blog',
              to: 'https://datalayer.blog',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Datalayer, Inc.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/datalayer/jupyter-manager/edit/main',
        },
        blog: {
          showReadingTime: true,
          editUrl:
            'https://datalayer.blog',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
