export interface TocHeading {
  /** Id of the heading element to jump to. */
  id: string;
  text: string;
  /** `2` for a section, `3` for a subsection. Defaults to `2`. */
  level?: 2 | 3;
}
