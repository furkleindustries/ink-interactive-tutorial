import {
  getMdxComponents,
} from '../../functions/getMdxComponents';
import {
  MDXProvider,
} from '@mdx-js/tag';
import {
  default as React,
} from 'react';

import MdDoc from '../../markdown/document.mdx';

const mdxComponents = getMdxComponents();

const Document = () => (
  <MDXProvider components={mdxComponents}>
    <MdDoc components={mdxComponents} />
  </MDXProvider>
);

export default Document;
