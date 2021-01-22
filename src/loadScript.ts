const FUNNELBRANCH_SCRIPT_URL = 'https://js.funnelbranch.com/funnelbranch.js';

export function loadScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const script = findScript() || injectScript();
      script.addEventListener('load', () => resolve());
      script.addEventListener('error', () => reject(new Error('Funnelbranch: failed to load script')));
    } catch (err) {
      reject(err);
    }
  });
}

function findScript(): HTMLScriptElement | undefined {
  const scripts = document.querySelectorAll<HTMLScriptElement>(`script[src="${FUNNELBRANCH_SCRIPT_URL}"]`);
  if (scripts.length > 0) {
    return scripts[0];
  }
}

function injectScript(): HTMLScriptElement {
  const script = document.createElement('script');
  script.src = FUNNELBRANCH_SCRIPT_URL;
  const headOrBody = document.head || document.body;
  if (!headOrBody) {
    throw new Error('Funnelbranch: cannot inject script without head or body');
  }
  headOrBody.appendChild(script);
  return script;
}
