# esml
esml is a ruthlessly simple library for rendering html using pure functions.

[![Build Status](https://travis-ci.org/oyvinmar/esml.svg?branch=master)](https://travis-ci.org/oyvinmar/esml)
[![npm version](https://img.shields.io/npm/v/esml.svg?style=flat-square)](https://www.npmjs.com/package/esml)
[![npm downloads](https://img.shields.io/npm/dm/esml.svg?style=flat-square)](https://www.npmjs.com/package/esml)

### Installation

```
npm install --save esml
```

### Documentation/API

esml consists of 2 functions:

#### render

```
render(
  esml element,
  DOMElement container
)
```
Renderes an esml element to a DOMElement container. Existing DOMElement child noes is removed.

#### esml

```
esml(
  string type,
  [object props],
  [children ...]
)
```
Create and return a new esml element of the given type. The type argument must be an html tag name string.

### Examples

#### Without jsx
```js
import esml, { render } from 'esml';
import persons from './persons';

const element =
  esml('article', null,
    esml('header', null,
      esml('h2', null, 'Example without jsx')
    ),
    esml('section', null,
      esml('table', { className: 'table'},
        esml('thead', null,
          esml('tr', null,
            esml('th', null, 'Given name'),
            esml('th', null, 'Surname'),
            esml('th', { className: 'align-right'}, 'Year of birth'),
            esml('th', null, 'Wikipedia link')
          )
        ),
        esml('tbody', null, persons.map(person => esml('tr', null,
          esml('td', null, person.givenName),
          esml('td', null, person.surname),
          esml('td', { className: 'align-right' }, person.yearOfBirth),
          esml('td', null ,
            esml('a', { href: person.wikiURL }, 'Link')
          )
        )))
      )
    )
  );

render(element, document.getElementById('root'));
```
#### With babel jsx transform
```js
/** @jsx esml */

import esml, { render } from 'esml';
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
