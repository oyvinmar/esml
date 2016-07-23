import expect from 'expect';
import lmth from '../src';

describe('lmth', () => {
  it('Simple without props', () => {
    const span = lmth('span', null);
    expect(span).toEqual({ type: 'span', props: {}, children: [] });
  });

  it('Element with text child', () => {
    const span = lmth('p', null, 'Hello world');
    expect(span).toEqual({ type: 'p', props: {}, children: ['Hello world'] });
  });

  it('Element with several props', () => {
    const span = lmth('img', { src: 'http://example.com/', alt: 'An example' });
    expect(span).toEqual({ type: 'img', props: { src: 'http://example.com/', alt: 'An example' }, children: [] });
  });

  it('Element with element children', () => {
    const ul = lmth('ul', { className: 'pagination' },
      lmth('li', null, 'Previous'),
      [1, 2, 3, 4].map(i =>
        lmth('li', null, i)
      ),
      lmth('li', null, 'Next')
    );

    expect(ul.children.length).toBe(6);
    expect(ul.children.length).toBe(6);
  });
});
