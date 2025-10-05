import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
  to?: string;
  ctaText?: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: '建立理财的全局框架',
    Svg: require('@site/static/img/icons/framework.svg').default,
    description: (
      <>给用户建立理财的全局框架 → 避免信息碎片化。</>
    ),
    to: '/docs/kecheng',
    ctaText: '从课程开始',
  },
  {
    title: '结构化知识 + 工具',
    Svg: require('@site/static/img/icons/tools.svg').default,
    description: (
      <>提供结构化知识 + 工具 → 让用户能行动（配置资产）。</>
    ),
    to: '/docs/gongju',
    ctaText: '查看工具',
  },
  {
    title: '优质信息渠道',
    Svg: require('@site/static/img/icons/channels.svg').default,
    description: (
      <>提供优质信息渠道，让用户更自由地探索。</>
    ),
    to: '/docs/qudao',
    ctaText: '浏览渠道',
  },
];

function Feature({title, Svg, description, to, ctaText, index}: FeatureItem & {index: number}) {
  return (
    <div className={styles.card}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <div className={styles.numberBadge}>{index + 1}</div>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
        {to ? (
          <div className="margin-top--sm">
            <Link className="button button--link button--sm" to={to}>
              {ctaText ?? '了解更多'}
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.grid}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} index={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
