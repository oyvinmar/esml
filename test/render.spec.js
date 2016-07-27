import expect from 'expect';
import esml, { render } from '../src';

describe('render function', () => {
  it('Render simple span', () => {
    const span = esml('span', null);

    render(span, document.getElementById('root'));

    expect(document.getElementById('root').innerHTML).toEqual('<span></span>');
  });

  it('Render p with text', () => {
    const p = esml('p', null, 'Hello world');

    render(p, document.getElementById('root'));

    expect(document.getElementById('root').innerHTML).toEqual('<p>Hello world</p>');
  });

  it('Render img with with props (html attributes)', () => {
    const img = esml('img', { className: 'example', src: 'http://example.com/', alt: 'An example' });

    render(img, document.getElementById('root'));

    expect(document.getElementById('root').innerHTML)
      .toEqual('<img class="example" src="http://example.com/" alt="An example">');
  });

  it('Render i with number', () => {
    const i = esml('i', null, 1337);

    render(i, document.getElementById('root'));

    expect(document.getElementById('root').innerHTML).toEqual('<i>1337</i>');
  });

  it('Render div with onClick event', () => {
    const handleClick = expect.createSpy();
    const div = esml('div', { onClick: handleClick, id: 'clickTest' });

    render(div, document.getElementById('root'));
    document.getElementById('clickTest').click();

    expect(handleClick.calls.length).toEqual(1);
  });

  it('Render input with boolean prop', () => {
    const input1 = esml('input', { type: 'text', disabled: true });
    render(input1, document.getElementById('root'));
    expect(document.getElementById('root').innerHTML).toEqual('<input type="text" disabled="">');


    const input2 = esml('input', { type: 'text', disabled: false });
    render(input2, document.getElementById('root'));
    expect(document.getElementById('root').innerHTML).toEqual('<input type="text">');
  });
});
