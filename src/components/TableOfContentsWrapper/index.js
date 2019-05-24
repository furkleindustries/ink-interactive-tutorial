import {
  TableOfContents,
} from '../TableOfContents';

import * as React from 'react';

import chapters from '../../../config/tableOfContentsMetadata';

export const TableOfContentsWrapper = () => (
  <TableOfContents
    chapters={chapters}
    start={0}
  />
);
