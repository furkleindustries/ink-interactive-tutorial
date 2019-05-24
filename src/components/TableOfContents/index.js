import classnames from 'classnames';
import {
  Link,
} from '../Link';

import * as React from 'react';

import styles from './index.module.scss';

export const TableOfContents = ({
  hashLinking,
  chapters,
  start = 1,
}) => (
  <ol
    className={classnames(styles.tableOfContents)}
    start={start}
  >
    {chapters.map(({
      href,
      index,
      subchapters,
      title,
    }) => {
      const paddedChapterIndex = index < 10 ? `0${index}` : index;
      let chapterHref;
      if (href) {
        chapterHref = href;
      } else {
        chapterHref = `chapter-${paddedChapterIndex}`;
      }

      return (
        <li
          className={styles.chapter}
          key={index}
        >
          <Link
            className={styles.chapterLink}
            to={chapterHref}
          >{
            title
          }</Link>

          <ol className={styles.subchapterList}>
            {Object.keys(subchapters).map((baseIndex) => {
              const {
                href,
                index,
                title,
              } = subchapters[baseIndex];

              const paddedSubchapterIndex = index < 10 ? `0${index}` : index;

              let subchapterHref;
              if (href) {
                subchapterHref = href;
              } else if (hashLinking) {
                subchapterHref = (
                  `chapter-${paddedChapterIndex}` +
                    `#subchapter-${paddedSubchapterIndex}`
                );
              } else {
                subchapterHref = (
                  `chapter-${paddedChapterIndex}/` +
                    `subchapter-${paddedSubchapterIndex}`
                );
              }

              return (
                <li
                  className={classnames(styles.subchapter)}
                  key={index}
                >
                  <Link
                    className={classnames(styles.subchapterLink)}
                    to={subchapterHref}
                  >{
                    title
                  }</Link>
                </li>
              );
            })}
          </ol>
        </li>
      );
    })}
  </ol>
);
