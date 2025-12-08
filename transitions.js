// Smooth Page Transitions mit View Transitions API
// Funktioniert in modernen Browsern (Chrome 111+, Edge 111+, Safari 18+)

if (document.startViewTransition) {
  // Alle internen Links abfangen
  window.addEventListener('click', (e) => {
    const link = e.target.closest('a');

    // Nur interne Links ohne Hash (#) behandeln
    if (link && link.href &&
        link.href.startsWith(window.location.origin) &&
        !link.href.includes('#') &&
        !link.hasAttribute('target')) {

      e.preventDefault();

      // View Transition starten
      document.startViewTransition(() => {
        window.location.href = link.href;
      });
    }
  });
}
