import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'WealthHub',
  tagline: '用正确观念与优质信息，构建可持续的个人理财体系。',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://www.wealthhub.wiki',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          remarkPlugins: [require('./src/markdown/remarkLinkifyNasdaqTech')],
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'daily',
          priority: 0.5,
          filename: 'sitemap.xml',
        },
      } satisfies Preset.Options,
    ],
  ],

  // Themes (register local search as a theme so it provides SearchBar/SearchPage)
  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      /** @type {import('@easyops-cn/docusaurus-search-local').PluginOptions} */ (
        {
          hashed: true,
          docsRouteBasePath: '/docs',
          highlightSearchTermsOnTargetPage: true,
          language: ['zh', 'en'],
        }
      ),
    ],
  ],

  // Plugins（仅在生产环境启用 gtag，避免本地预览受拦截插件影响报错）
  plugins: [
    ...(process.env.NODE_ENV === 'production'
      ? [
          [
            require.resolve('@docusaurus/plugin-google-gtag'),
            {
              trackingID: 'G-4JEYTCB9ES',
              anonymizeIP: true,
            },
          ],
        ]
      : []),
  ],

  // Load client modules (run in browser)
  clientModules: [],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: {
        hideable: true, // 在侧边栏底部显示可收缩按钮
        autoCollapseCategories: true,
      },
    },
    navbar: {
      title: 'WealthHub',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {type: 'docSidebar', sidebarId: 'kechengSidebar', label: ' 课程', position: 'left'},
        {type: 'docSidebar', sidebarId: 'jingyanSidebar', label: ' 经验', position: 'left'},
        {type: 'docSidebar', sidebarId: 'qudaoSidebar', label: ' 渠道', position: 'left'},
        {type: 'docSidebar', sidebarId: 'gongjuSidebar', label: ' 工具', position: 'left'},
        {type: 'docSidebar', sidebarId: 'shipinSidebar', label: ' 视频', position: 'left'},
        {type: 'docSidebar', sidebarId: 'bokeSidebar', label: ' 播客', position: 'left'},
        {
          type: 'docSidebar',
          sidebarId: 'shujiSidebar',
          label: ' 书籍',
          position: 'left',
        },
        {to: '/blog', label: ' 更新日志', position: 'left'},
        {type: 'search', position: 'right'},
        {to: '/feedback', label: ' 反馈', position: 'right'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} WealthHub. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
