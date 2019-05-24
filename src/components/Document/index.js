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

import Introduction from '../../markdown/pages/chapter-00.mdx';
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
import Subchapter01_01 from '../../markdown/subchapters/01/subchapter-01_01.mdx';
import Subchapter01_02 from '../../markdown/subchapters/01/subchapter-01_02.mdx';
import Subchapter01_03 from '../../markdown/subchapters/01/subchapter-01_03.mdx';
import Subchapter01_04 from '../../markdown/subchapters/01/subchapter-01_04.mdx';
import Subchapter01_05 from '../../markdown/subchapters/01/subchapter-01_05.mdx';
import Subchapter01_06 from '../../markdown/subchapters/01/subchapter-01_06.mdx';
import Subchapter01_07 from '../../markdown/subchapters/01/subchapter-01_07.mdx';
import Subchapter01_08 from '../../markdown/subchapters/01/subchapter-01_08.mdx';
import Subchapter01_09 from '../../markdown/subchapters/01/subchapter-01_09.mdx';
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
        exact={true}
        path="/"
      />

      <Route
        component={Tutorial}
        exact={true}
        path="/tutorial"
      />

      <Route
        component={Introduction}
        exact={true}
        path="/chapter-00"
      />

      <Route
        component={Chapter01}
        exact={true}
        path="/chapter-01"
      />

      <Route
        component={Subchapter01_01}
        exact={true}
        path="/chapter-01/subchapter-01"
      />

      <Route
        component={Subchapter01_02}
        exact={true}
        path="/chapter-01/subchapter-02"
      />

      <Route
        component={Subchapter01_03}
        exact={true}
        path="/chapter-01/subchapter-03"
      />

      <Route
        component={Subchapter01_04}
        exact={true}
        path="/chapter-01/subchapter-04"
      />

      <Route
        component={Subchapter01_05}
        exact={true}
        path="/chapter-01/subchapter-05"
      />

      <Route
        component={Subchapter01_06}
        exact={true}
        path="/chapter-01/subchapter-06"
      />

      <Route
        component={Subchapter01_07}
        exact={true}
        path="/chapter-01/subchapter-07"
      />

      <Route
        component={Subchapter01_08}
        exact={true}
        path="/chapter-01/subchapter-08"
      />

      <Route
        component={Subchapter01_09}
        exact={true}
        path="/chapter-01/subchapter-09"
      />

      <Route
        component={Chapter02}
        exact={true}
        path="/chapter-02"
      />

      <Route
        component={Chapter03}
        exact={true}
        path="/chapter-03"
      />

      <Route
        component={Chapter04}
        exact={true}
        path="/chapter-04"
      />

      <Route
        component={Chapter05}
        exact={true}
        path="/chapter-05"      
      />

      <Route
        component={Chapter06}
        exact={true}
        path="/chapter-06"
      />

      <Route
        component={TableOfContents}
        exact={true}
        path="/table-of-contents"
      />

      <Route
        component={Search}
        exact={true}
        path="/search"
      />

      <Route
        component={ExampleList}
        exact={true}
        path="/example-list"
      />

      <Route
        component={Playground}
        exact={true}
        path="/playground"
      />
    </MDXProvider>
  </div>
);

export default Document;
