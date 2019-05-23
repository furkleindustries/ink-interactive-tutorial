import {
  getMdxComponents,
} from '../../functions/getMdxComponents';
import {
  Header,
} from '../Header';
import {
  MDXProvider,
} from '@mdx-js/tag';
import {
  Route,
} from 'react-router-dom';

import Chapter01 from '../../markdown/pages/chapter-01.mdx';
import Chapter02 from '../../markdown/pages/chapter-02.mdx';
import Chapter03 from '../../markdown/pages/chapter-03.mdx';
import Chapter04 from '../../markdown/pages/chapter-04.mdx';
import Chapter05 from '../../markdown/pages/chapter-05.mdx';
import Chapter06 from '../../markdown/pages/chapter-06.mdx';
import ExampleList from '../../markdown/pages/example-list.mdx';
import Home from '../../markdown/pages/home.mdx';
import Playground from '../../markdown/pages/playground.mdx';
import Search from '../../markdown/pages/search.mdx';
import TableOfContents from '../../markdown/pages/table-of-contents.mdx';
import Tutorial from '../../markdown/pages/tutorial.mdx';

import * as React from 'react';

const mdxComponents = getMdxComponents();

const Document = () => (
  <div>
    <Header />

    <MDXProvider components={mdxComponents}>
      <Route
        component={Home}
        path="/"
      />

      <Route
        component={Tutorial}
        path="/tutorial"
      />

      <Route
        component={Chapter01}
        path="/chapter01"
      />

      <Route
        component={Chapter02}
        path="/chapter02"
      />

      <Route
        component={Chapter03}
        path="/chapter03"
      />

      <Route
        component={Chapter04}
        path="/chapter04"
      />

      <Route
        component={Chapter05}
        path="/chapter05"      
      />

      <Route
        component={Chapter06}
        path="/chapter06"
      />

      <Route
        component={TableOfContents}
        path="/table-of-contents"
      />

      <Route
        component={Search}
        path="/search"
      />

      <Route
        component={ExampleList}
        path="/example-list"
      />

      <Route
        component={Playground}
        path="/playground"
      />
    </MDXProvider>
  </div>
);

export default Document;
