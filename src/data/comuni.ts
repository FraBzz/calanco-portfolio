import Fuse from "fuse.js";
import comuni from "../data/comuni_italiani.json";

const fuse = new Fuse(comuni, {
  keys: ['name'],
  threshold: 0.3,
  includeScore: true
});

export { fuse, comuni };
export type Comune = typeof comuni[0];
