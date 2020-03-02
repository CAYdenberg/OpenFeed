// tslint:disable:no-console

export const scrollIntoView = (id?: string | null) => {
  if (!Element.prototype.scrollIntoView) {
    console.warn('scrollIntoView not available. Check your polyfills');
  }

  const el = id ? document.getElementById(id) : document.body;

  if (!el) {
    console.warn(`scrollIntoView: el ${id} does not exist`);
  }

  el?.scrollIntoView({ behavior: 'smooth' });
};
