/**
 * remarkLinkifyNasdaqTech
 * 在所有 Markdown 文档中将纯文本“纳指科技”替换为链接到 https://www.nasdaq.com
 * 规避：已存在的链接、代码块、行内代码内的替换
 */
function remarkLinkifyNasdaqTech() {
  const TARGET_TEXT = '纳指科技';
  const TARGET_URL = 'https://www.nasdaq.com';

  return function transformer(tree) {
    function processChildren(node) {
      if (!node || !Array.isArray(node.children)) return;

      // 跳过不应替换的父节点类型
      const skipInParent =
        node.type === 'link' ||
        node.type === 'inlineCode' ||
        node.type === 'code';
      if (skipInParent) return;

      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];

        if (child && child.type === 'text' && typeof child.value === 'string') {
          if (child.value.includes(TARGET_TEXT)) {
            const segments = child.value.split(TARGET_TEXT);
            const newNodes = [];
            for (let s = 0; s < segments.length; s++) {
              if (segments[s]) {
                newNodes.push({ type: 'text', value: segments[s] });
              }
              if (s < segments.length - 1) {
                newNodes.push({
                  type: 'link',
                  url: TARGET_URL,
                  title: null,
                  children: [{ type: 'text', value: TARGET_TEXT }],
                });
              }
            }
            // 用拆分后的节点替换原有文本节点
            node.children.splice(i, 1, ...newNodes);
            // 跳过已插入的新节点
            i += newNodes.length - 1;
            continue;
          }
        }

        // 递归处理
        if (child && typeof child === 'object') {
          processChildren(child);
        }
      }
    }

    processChildren(tree);
  };
}

module.exports = remarkLinkifyNasdaqTech;


