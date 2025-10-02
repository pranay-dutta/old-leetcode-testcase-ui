(function () {
  'use strict';

  // === SVGs ===
  const circleCheckSVG = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle"
    class="svg-inline--fa fa-circle absolute left-1/2 top-1/2 h-[1em] -translate-x-1/2 -translate-y-1/2 align-[-0.125em]"
    role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <circle fill="currentColor" cx="256" cy="256" r="120"></circle>
  </svg>`;

  const circleXmarkSVG = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle"
    class="svg-inline--fa fa-circle absolute left-1/2 top-1/2 h-[1em] -translate-x-1/2 -translate-y-1/2 align-[-0.125em]"
    role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <circle fill="#f04741" cx="256" cy="256" r="120"></circle>
  </svg>`;

  // === Functions ===
  function replaceSquareIcon(svgElem) {
    if (!svgElem || svgElem.dataset.__replaced === '1') return;

    // Exclude any SVG inside #testcase_tab
    if (svgElem.closest('#testcase_tab')) return;

    let wrapper = document.createElement('div');
    let newSvg;

    try {
      if (svgElem.getAttribute('data-icon') === 'square-check' || svgElem.classList.contains('fa-square-check')) {
        wrapper.innerHTML = circleCheckSVG.trim();
      } else if (svgElem.getAttribute('data-icon') === 'square-xmark' || svgElem.classList.contains('fa-square-xmark')) {
        wrapper.innerHTML = circleXmarkSVG.trim();
      } else {
        return;
      }

      newSvg = wrapper.firstElementChild;

      // Preserve inline style if present
      if (svgElem.hasAttribute('style')) newSvg.setAttribute('style', svgElem.getAttribute('style'));
      if (svgElem.id) newSvg.id = svgElem.id;

      svgElem.replaceWith(newSvg);
      newSvg.dataset.__replaced = '1';
    } catch (err) {
      console.error('SVG replace error:', err);
    }
  }

  function initialPass() {
    // Replace icons
    document.querySelectorAll(
      'svg[data-icon="square-check"], svg.fa-square-check, svg.svg-inline--fa.fa-square-check,' +
      'svg[data-icon="square-xmark"], svg.fa-square-xmark, svg.svg-inline--fa.fa-square-xmark'
    ).forEach(replaceSquareIcon);
  }

  initialPass();

  // === MutationObserver for dynamic content ===
  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      m.addedNodes.forEach((node) => {
        if (node.nodeType === 1) {
          // Replace icons
          if (node.matches &&
            node.matches('svg[data-icon="square-check"], svg.fa-square-check, svg.svg-inline--fa.fa-square-check,' +
              'svg[data-icon="square-xmark"], svg.fa-square-xmark, svg.svg-inline--fa.fa-square-xmark')) {
            replaceSquareIcon(node);
          } else {
            const found = node.querySelectorAll &&
              node.querySelectorAll('svg[data-icon="square-check"], svg.fa-square-check, svg.svg-inline--fa.fa-square-check,' +
                'svg[data-icon="square-xmark"], svg.fa-square-xmark, svg.svg-inline--fa.fa-square-xmark');
            if (found && found.length) found.forEach(replaceSquareIcon);
          }
        }
      });
    }
  });

  observer.observe(document.documentElement || document.body, {
    childList: true,
    subtree: true,
  });

})();