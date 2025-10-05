import React, {useEffect, useRef, useState} from 'react';
import Layout from '@theme/Layout';

declare global {
  interface Window {
    ePub: any;
  }
}

function useQuery() {
  if (typeof window === 'undefined') return new URLSearchParams('');
  return new URLSearchParams(window.location.search);
}

export default function Reader(): JSX.Element {
  const query = useQuery();
  const file = query.get('file') || '';
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [rendition, setRendition] = useState<any>(null);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // prefer local dependency if bundled
    if ((window as any).ePub) {
      setReady(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/epubjs/dist/epub.min.js';
    script.async = true;
    script.onload = () => setReady(true);
    document.body.appendChild(script);
    return () => {
      try { document.body.removeChild(script); } catch {}
    };
  }, []);

  useEffect(() => {
    if (!ready || !file || !containerRef.current) return;
    if (!window.ePub) return;
    const book = window.ePub(file);
    const container = containerRef.current;
    container.style.minHeight = '80vh';
    const r = book.renderTo(container, {
      width: '100%',
      height: 'calc(100vh - 160px)',
      flow: 'scrolled-doc',
      spread: 'auto',
    });
    r.themes.default({
      body: { color: 'var(--ifm-font-color-base)' },
      p: { lineHeight: '1.6' },
    });
    // 等待资源就绪后再展示，避免空白
    (book.ready ? book.ready : Promise.resolve()).then(() => {
      r.display().then(() => setRendered(true));
    });
    // 双保险：2秒后仍未渲染则再次触发
    setTimeout(() => {
      if (!rendered) {
        try { r.display(); } catch {}
      }
    }, 2000);
    setRendition(r);
    return () => {
      try { r && r.destroy && r.destroy(); } catch {}
    };
  }, [ready, file]);

  const isEpub = file.toLowerCase().endsWith('.epub');

  return (
    <Layout title="在线阅读" description="在线阅读 EPUB">
      <div style={{padding: '1rem 0'}}>
        {!file && <p style={{padding: '0 1rem'}}>未提供文件参数。请通过“在线阅读”按钮进入本页。</p>}
        {file && !isEpub && (
          <p style={{padding: '0 1rem'}}>当前仅支持 EPUB 在线阅读。文件：{file}</p>
        )}
        {file && (
          <div style={{display: 'flex', gap: '0.5rem', padding: '0 1rem 0.5rem'}}>
            <button className="button button--sm" onClick={() => rendition && rendition.prev()}>
              上一页
            </button>
            <button className="button button--sm" onClick={() => rendition && rendition.next()}>
              下一页
            </button>
            <a className="button button--secondary button--sm" href={file} download>
              下载原文件
            </a>
          </div>
        )}
        <div ref={containerRef} style={{borderTop: '1px solid var(--ifm-color-emphasis-200)'}} />
      </div>
    </Layout>
  );
}


