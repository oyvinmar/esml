# lmth

lmth(html in revers) is a ruthlessly simple library for rendering html using pure functions.

### Installation

```
npm install --save lmth
```


### Documentation/API

lmth consists of 2 functions:

#### render

```
render(
  lmth element,
  DOMElement container
)
```
Renderes an lmth element to a DOMElement container. Existing DOMElement child noes is removed.

#### lmth

```
lmth(
  string type,
  [object props],
  [children ...]
)
```
Create and return a new lmth element of the given type. The type argument must be an html tag name string.

### Examples

#### Without jsx
```js
import lmth, { render } from 'lmth';
import persons from './persons';

const element =
  lmth('article', null,
    lmth('header', null,
      lmth('h2', null, 'Example without jsx')
    ),
    lmth('section', null,
      lmth('table', { className: 'table'},
        lmth('thead', null,
          lmth('tr', null,
            lmth('th', null, 'Given name'),
            lmth('th', null, 'Surname'),
            lmth('th', { className: 'align-right'}, 'Year of birth'),
            lmth('th', null, 'Wikipedia link')
          )
        ),
        lmth('tbody', null, persons.map(person => lmth('tr', null,
          lmth('td', null, person.givenName),
          lmth('td', null, person.surname),
          lmth('td', { className: 'align-right' }, person.yearOfBirth),
          lmth('td', null ,
            lmth('a', { href: person.wikiURL }, 'Link')
          )
        )))
      )
    )
  );

render(element, document.getElementById('root'));
```
#### With babel jsx transform
```js
/** @jsx lmth */

import lmth, { render } from 'lmth';
import persons from './persons';

const element = (
  <article>
    <header>
      <h2>Example with jsx</h2>
    </header>
    <section>
      <table className="table">
        <thead>
          <tr>
            <th>Given name</th>
            <th>Surname</th>
            <th className="align-right">Year of birth</th>
            <th>Wikipedia link</th>
          </tr>
        </thead>
        <tbody>
          { persons.map(person => (
            <tr>
              <td>{person.givenName}</td>
              <td>{person.surname}</td>
              <td className="align-right">{person.yearOfBirth}</td>
              <td><a href={person.wikiURL}>Link</a></td>
            </tr>
          )) }
        </tbody>
      </table>
    </section>
  </article>
);

render(element, document.getElementById('root'));
```


### License

The MIT License (MIT) Copyright (c) 2016 Øyvind Marthinsen
