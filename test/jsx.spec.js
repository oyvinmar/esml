/** @jsx lmth */
import expect from 'expect';
import lmth from '../src';

describe('transform jsx to lmth function calls', () => {
  it('Element without props', () => {
    const span = <span></span>;
    expect(span).toEqual({ type: 'span', props: {}, children: [] });
  });

  it('Element with text child', () => {
    const span = <p>Hello world</p>;
    expect(span).toEqual({ type: 'p', props: {}, children: ['Hello world'] });
  });

  it('Element with several props', () => {
    const span = <img src="http://example.com/" alt="An example" />;
    expect(span).toEqual({ type: 'img', props: { src: 'http://example.com/', alt: 'An example' }, children: [] });
  });

  it('Element with element children', () => {
    const ul = (
      <ul className="pagination">
        <li>Previous</li>
        {[1, 2, 3, 4].map(i => <li>{i}</li>)}
        <li>Next</li>
      </ul>
    );

    expect(ul.children.length).toBe(6);
  });
});
