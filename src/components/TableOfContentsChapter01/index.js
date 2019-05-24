import chapters from '../../../config/tableOfContentsMetadata';
import {
  SubchapterTableOfContents,
} from '../SubchapterTableOfContents';

import * as React from 'react';

const fakeRoot = chapters[1].subchapters.map((sc) => (
  Object.assign({}, sc, { subchapters: [] }))
);

export const TableOfContentsChapter01 = () => (
  <SubchapterTableOfContents subchapters={fakeRoot} />
);
