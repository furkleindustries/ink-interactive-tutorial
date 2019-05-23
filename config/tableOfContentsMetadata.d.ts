declare type TableOfContents = Array<{
  index: number;
  filepath: string;
  subchapters: {
    [key: number]: {
      index: number;
      filepath: string;
      title: string;
    };
  };

  title: string;
}>;

export default TableOfContents;
