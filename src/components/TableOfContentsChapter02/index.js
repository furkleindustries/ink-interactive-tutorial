import chapters from '../../../config/tableOfContentsMetadata';
import {
  SubchapterTableOfContents,
} from '../SubchapterTableOfContents';

import * as React from 'react';

const fakeRoot = chapters[2].subchapters.map((sc) => (
  Object.assign({}, sc, { subchapters: [] }))
);

export const TableOfContentsChapter02 = () => (
  <SubchapterTableOfContents subchapters={fakeRoot} />  
);
