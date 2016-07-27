import expect from 'expect';
import esml from '../src';

describe('esml function', () => {
  it('Element without props', () => {
    const span = esml('span', null);
    expect(span).toEqual({ type: 'span', props: {}, children: [] });
  });

  it('Element with text child', () => {
    const span = esml('p', null, 'Hello world');
    expect(span).toEqual({ type: 'p', props: {}, children: ['Hello world'] });
  });

  it('Element with several props', () => {
    const span = esml('img', { src: 'http://example.com/', alt: 'An example' });
    expect(span).toEqual({ type: 'img', props: { src: 'http://example.com/', alt: 'An example' }, children: [] });
  });

  it('Element with element children', () => {
    const ul = esml('ul', { className: 'pagination' },
      esml('li', null, 'Previous'),
      [1, 2, 3, 4].map(i =>
        esml('li', null, i)
      ),
      esml('li', null, 'Next')
    );

    expect(ul.children.length).toBe(6);
    expect(ul.children.length).toBe(6);
  });
});
