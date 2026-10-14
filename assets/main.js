(function () {
  // Copy buttons. The status region announces the result to screen readers.
  var status = document.getElementById('copy-status');

  document.querySelectorAll('[data-copy-trigger]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy-trigger');
      var done = function () {
        btn.classList.add('copied');
        var original = btn.innerHTML;
        btn.innerHTML = '<span aria-hidden="true">✓</span>';
        if (status) {
          status.textContent = '';
          status.textContent = status.getAttribute('data-msg') + ': ' + text;
        }
        setTimeout(function () {
          btn.innerHTML = original;
          btn.classList.remove('copied');
        }, 1400);
      };
      try {
        navigator.clipboard.writeText(text).then(done).catch(function () {
          fallback(text, done);
        });
      } catch (e) {
        fallback(text, done);
      }
    });
  });

  function fallback(text, cb) {
    try {
      var ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      cb();
    } catch (e) { /* select the text */
      var el = document.querySelector('[data-copy="' + text.replace(/"/g,'\\"') + '"]');
      if (el) {
        var range = document.createRange(); range.selectNodeContents(el);
        var sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(range);
      }
    }
  }
})();
