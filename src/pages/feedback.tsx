import React from 'react';
import Layout from '@theme/Layout';
import {useLocation} from '@docusaurus/router';

// 使用 Notion 提供的嵌入地址；如被 CSP/XFO 限制无法加载，用户仍可点击外链按钮
const NOTION_FORM_URL = 'https://crocus-pruner-e0a.notion.site/ebd/28388d510c9b804aab0deb5d78d9ce94';
const AUTHOR_UPDATES_URL = 'https://crocus-pruner-e0a.notion.site/ebd/28388d510c9b80b4987ac66cda94a586?v=28388d510c9b80a6ac7c000cb6486653';

export default function FeedbackPage(): JSX.Element {
  const {search} = useLocation();
  const isSubmitted = React.useMemo(() => {
    try {
      const params = new URLSearchParams(search);
      return params.get('submitted') === '1';
    } catch {
      return false;
    }
  }, [search]);
  return (
    <Layout title="反馈">
      <div className="container margin-vert--lg">
        <h1>💬 反馈</h1>
        {isSubmitted ? (
          <div
            style={{
              border: '1px solid var(--ifm-color-success-contrast-foreground)',
              borderRadius: 8,
              padding: 16,
              background: 'var(--ifm-color-success-contrast-background)'
            }}
          >
            <h2 style={{marginTop: 0}}>✅ 你的反馈已提交</h2>
            <p>如需查看作者最新的回复与处理进展，请点击下方按钮。</p>
            <a className="button button--primary" href="#author-updates">查看作者最新回复</a>
          </div>
        ) : (
          <>
            <p>欢迎留下你的建议与想法。如内嵌表单无法加载，请使用下方按钮在新窗口打开。</p>
            <div style={{ marginBottom: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <a
                className="button button--secondary"
                href={NOTION_FORM_URL}
                target="_blank"
                rel="noreferrer"
              >
                在新窗口打开表单
              </a>
              <a className="button button--primary" href="#author-updates">作者最新回复</a>
            </div>
            <div
              style={{
                position: 'relative',
                height: '80vh',
                border: '1px solid var(--ifm-color-emphasis-200)',
                borderRadius: 8,
                overflow: 'hidden',
                background: 'var(--ifm-background-surface-color)',
              }}
            >
              <iframe
                src={NOTION_FORM_URL}
                style={{ width: '100%', height: '100%', border: 0 }}
                loading="lazy"
                title="反馈表单"
                allow="clipboard-write; fullscreen"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            
          </>
        )}
        <div id="author-updates" className="margin-top--lg">
          <h2>📣 作者最新回复</h2>
          <div style={{ marginBottom: 12 }}>
            <a
              className="button button--primary"
              href={AUTHOR_UPDATES_URL}
              target="_blank"
              rel="noreferrer"
            >
              在新窗口查看作者最新回复
            </a>
          </div>
          <div
            style={{
              position: 'relative',
              height: '60vh',
              border: '1px solid var(--ifm-color-emphasis-200)',
              borderRadius: 8,
              overflow: 'hidden',
              background: 'var(--ifm-background-surface-color)',
            }}
          >
            <iframe
              src={AUTHOR_UPDATES_URL}
              style={{ width: '100%', height: '100%', border: 0 }}
              loading="lazy"
              title="作者最新回复"
              allow="clipboard-write; fullscreen"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}


