import type {ReactNode} from 'react';
import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx(styles.heroRoot)}>
      <div className={clsx('container', styles.heroWrap)}>
        <div className={styles.heroLeft}>
          <Heading as="h1" className={styles.heroTitle}>
            {siteConfig.title}
          </Heading>
          <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link className="button button--primary button--lg" to="/docs/shuji/reading-guide">
              开始学习
            </Link>
          </div>
        </div>
        <div className={styles.heroRight}>
          <img
            className={styles.heroImage}
            src="/img/hero/home-illustration.jpg"
            alt="WealthHub 首页插图"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    </header>
  );
}

// 单图展示，无轮播

function ThreeColumns() {
  return (
    <section className={styles.featuresSection}>
      <div className="container">
        <h2 className={styles.sectionTitle}>基本介绍</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureItem}>
            <h3>关于本教程</h3>
            <p>如果你开始有意愿打理自己的金钱，那么这份教程可以帮助你从零开始建立起一套可执行的路径。至少，不会让你在错误的道路上越走越远。</p>
          </div>
          <div className={styles.featureItem}>
            <h3>它不是什么？</h3>
            <p>本教程不是“速成秘籍”，而是强调方法论与原则，帮助你理解为什么有效。如果你相信自己的学习能力，并且愿意付出时间，那么这份教程可以帮助你少走弯路。本教程也不是权威指南，因为在这个领域，我也是个学生。</p>
          </div>
          <div className={styles.featureItem}>
            <h3>为什么写这份教程</h3>
            <p>作为一个初学者，研究个人投资和理财的时候，发现很多知识都过于碎片化，或者过于理论化，难以实践。</p>
            <p>所以想写一份教程，帮助大家从零开始建立起一套可执行的路径。</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <ThreeColumns />
      </main>
    </Layout>
  );
}
