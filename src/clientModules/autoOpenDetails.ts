export default function autoOpenDetails(): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const openAll = (): void => {
    const detailsList = document.querySelectorAll<HTMLDetailsElement>('details');
    detailsList.forEach((d) => {
      if (!d.hasAttribute('open')) d.setAttribute('open', 'open');
    });
  };

  // Open on initial load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', openAll);
  } else {
    openAll();
  }

  // Open when content changes during client-side navigation
  const observer = new MutationObserver(() => openAll());
  observer.observe(document.body, { childList: true, subtree: true });
}


