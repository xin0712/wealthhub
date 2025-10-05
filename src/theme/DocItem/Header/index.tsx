import React from 'react';
import Original from '@theme-original/DocItem/Header';
import type {Props} from '@theme/DocItem/Header';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useDoc} from '@docusaurus/theme-common/internal';

export default function DocItemHeaderWrapper(props: Props) {
  const {siteConfig} = useDocusaurusContext();
  // 从文档上下文中获取 frontMatter（更可靠）
  const {frontMatter} = useDoc();
  const ebook: string | undefined = (frontMatter as any)?.ebook;
  const isEpub = typeof ebook === 'string' && ebook.toLowerCase().endsWith('.epub');
  const cover: string | undefined = (frontMatter as any)?.cover;
  const originalTitle: string | undefined = (frontMatter as any)?.originalTitle;
  const author: string | undefined = (frontMatter as any)?.author;
  const year: string | undefined = (frontMatter as any)?.year;
  const goodreads: string | undefined = (frontMatter as any)?.goodreads;
  const douban: string | undefined = (frontMatter as any)?.douban;
  return (
    <>
      <Original {...props} />
      {ebook ? (
        <div style={{marginTop: '0.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
          <a
            className="button button--primary button--sm"
            href={useBaseUrl(ebook)}
            download
          >
            {isEpub ? '下载电子书' : '下载PDF'}
          </a>
        </div>
      ) : null}

      {(cover || originalTitle || author || year || goodreads || douban) ? (
        <div
          style={{
            marginTop: '0.75rem',
            display: 'grid',
            gridTemplateColumns: '120px 1fr',
            gap: '0.75rem',
            alignItems: 'start',
            border: '1px solid var(--ifm-color-emphasis-200)',
            borderRadius: 8,
            padding: '0.75rem',
            background: 'var(--ifm-background-surface-color)'
          }}
        >
          <div>
            {cover ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={useBaseUrl(cover)}
                alt="书籍封面"
                style={{width: 120, height: 160, objectFit: 'cover', borderRadius: 4}}
              />
            ) : (
              <div style={{
                width: 120, height: 160, borderRadius: 4,
                background: 'var(--ifm-color-emphasis-200)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--ifm-color-emphasis-600)', fontSize: 12
              }}>暂无封面</div>
            )}
          </div>
          <div style={{fontSize: 14, lineHeight: 1.7}}>
            {originalTitle && (<div><strong>原书名：</strong>{originalTitle}</div>)}
            {author && (<div><strong>作者：</strong>{author}</div>)}
            {year && (<div><strong>出版日期：</strong>{year}</div>)}
            {goodreads && (
              <div><strong>Goodreads：</strong><a href={goodreads} target="_blank" rel="noreferrer">{goodreads}</a></div>
            )}
            {douban && (
              <div><strong>豆瓣：</strong><a href={douban} target="_blank" rel="noreferrer">{douban}</a></div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}


