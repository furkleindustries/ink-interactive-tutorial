const fm = require('front-matter');
const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');

const markdownDir = path.join(__dirname, '..', 'src', 'markdown');
const chaptersDir = path.join(markdownDir, 'chapters');
const chaptersGlobPath = path.join(chaptersDir, '**', '*.mdx');
const subchaptersDir = path.join(markdownDir, 'subchapters');
const subchaptersGlobPath = path.join(subchaptersDir, '**', '*.mdx');
const outDir = __dirname;
const outPath = path.join(outDir, 'tableOfContentsMetadata.js');

const chaptersPromise = new Promise((resolve, reject) => {
  glob(chaptersGlobPath, function cb(err, matches) {
    if (err) {
      return reject(err);
    }

    const promises = matches.map((filepath) => new Promise((resolve, reject) => {
      fs.readFile(filepath).then(
        (data) => {
          const {
            attributes: {
              index,
              title,
            },
          } = fm(String(data));

          return resolve({
            index,
            filepath,
            title,
            subchapters: [],
          });
        },
        reject,
      );
    }));

    Promise.all(promises).then(resolve, reject);
  });
});

const subchaptersPromise = new Promise((resolve, reject) => {
  glob(subchaptersGlobPath, (err, matches) => {
    if (err) {
      return reject(err);
    }

    const promises = matches.map((filepath) => new Promise((resolve, reject) => {
      fs.readFile(filepath).then(
        (data) => {
          const {
            attributes: {
              chapterIndex,
              index,
              title,
            },
          } = fm(String(data));

          return resolve({
            chapterIndex,
            index,
            filepath,
            title,
          });
        },
        reject,
      );
    }));

    Promise.all(promises).then(resolve, reject);
  });
});

Promise.all([ chaptersPromise, subchaptersPromise ]).then(
  ([
    chaptersArg,
    subchapters,
  ]) => {
    const chapters = chaptersArg.sort((
      { index: a },
      { index: b },
    ) => a < b ? -1 : 1);

    subchapters.forEach((subchapter) => {
      const chapterIndex = subchapter.chapterIndex;
      chapters[chapterIndex].subchapters.push(subchapter);
    });

    chapters.forEach((chapter) => {
      chapter.subchapters = chapter.subchapters.sort((
        { index: a },
        { index: b },
      ) => a < b ? -1 : 1);
    });

    const output = `export default ${JSON.stringify(chapters)};\n`;
    fs.writeFile(outPath, output).then(() => {}, console.error.bind(console));
  },
  console.error.bind(console),
);
