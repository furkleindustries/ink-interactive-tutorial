import classnames from 'classnames';

import * as React from 'react';

import styles from './index.module.scss';

export const TableOfContents = ({ chapters }) => (
  <ol className={classnames(styles.tableOfContents)}>
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
          <a
            className={styles.chapterLink}
            href={chapterHref}
          >{
            title
          }</a>
  
          {Object.keys(subchapters).length ?
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
                } else {
                  subchapterHref = `chapter-${paddedChapterIndex}#subchapter-${paddedSubchapterIndex}`;
                }

                return (
                  <li
                    className={classnames(styles.subchapter)}
                    key={index}
                  >
                    <a
                      className={classnames(styles.subchapterLink)}
                      href={subchapterHref}
                    >{
                      title
                    }</a>
                  </li>
                );
              })}
            </ol> :
            null}
        </li>
      );
    })}
  </ol>
);
