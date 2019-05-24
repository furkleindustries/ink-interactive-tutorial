import classnames from 'classnames';
import {
  Link,
} from '../Link';

import * as React from 'react';

import styles from './index.module.scss';

export const SubchapterTableOfContents = ({ subchapters }) => (
  <ol className={classnames(styles.subchapterTableOfContents)}>
    {subchapters.map(({
      chapterIndex,
      href,
      index,
      title,
    }) => {
      const paddedChapterIndex = chapterIndex < 10 ?
        `0${chapterIndex}` :
        chapterIndex;

      const paddedSubchapterIndex = index < 10 ? `0${index}` : index;

      let chapterHref;
      if (href) {
        chapterHref = href;
      } else {
        chapterHref = (
          `chapter-${paddedChapterIndex}/subchapter-${paddedSubchapterIndex}`
        );
      }

      return (
        <li
          className={styles.chapter}
          key={index}
        >
          <Link
            className={styles.subchapterLink}
            to={chapterHref}
          >{
            title
          }</Link>
        </li>
      );
    })}
  </ol>
);
