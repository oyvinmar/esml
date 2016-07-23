import expect from 'expect';
import lmth, { render } from '../src';

describe('lmth', () => {
  it('Render simple span', () => {
    const span = lmth('span', null);

    render(span, document.getElementById('root'));

    expect(document.getElementById('root').innerHTML).toEqual('<span></span>');
  });

  it('Render p with text', () => {
    const p = lmth('p', null, 'Hello world');

    render(p, document.getElementById('root'));

    expect(document.getElementById('root').innerHTML).toEqual('<p>Hello world</p>');
  });

  it('Render img with with props (html attributes)', () => {
    const img = lmth('img', { className: 'example', src: 'http://example.com/', alt: 'An example' });

    render(img, document.getElementById('root'));

    expect(document.getElementById('root').innerHTML)
      .toEqual('<img class="example" src="http://example.com/" alt="An example">');
  });

  it('Render i with number', () => {
    const i = lmth('i', null, 1337);

    render(i, document.getElementById('root'));

    expect(document.getElementById('root').innerHTML).toEqual('<i>1337</i>');
  });

  it('Render div with onClick event', () => {
    const handleClick = expect.createSpy();
    const div = lmth('div', { onClick: handleClick, id: 'clickTest' });

    render(div, document.getElementById('root'));
    document.getElementById('clickTest').click();

    expect(handleClick.calls.length).toEqual(1);
  });

  it('Render input with boolean prop', () => {
    const input1 = lmth('input', { type: 'text', disabled: true });
    render(input1, document.getElementById('root'));
    expect(document.getElementById('root').innerHTML).toEqual('<input type="text" disabled="">');


    const input2 = lmth('input', { type: 'text', disabled: false });
    render(input2, document.getElementById('root'));
    expect(document.getElementById('root').innerHTML).toEqual('<input type="text">');
  });
});
