import {
  REGEX_ANY_TRAILING_SLASHES,
  REGEX_ANY_LEADING_SLASHES,
  REGEX_DUPLICATE_SLASHES,
} from "./constants";

const buildUrlPath = (rootPath, childPath) => {
  return `${rootPath}${childPath}`
    .replace(REGEX_ANY_TRAILING_SLASHES, "")
    .replace(REGEX_ANY_LEADING_SLASHES, "/")
    .replace(REGEX_DUPLICATE_SLASHES, "/");
};

const urls = {};

urls.root = "/";
urls.forbidden = "/forbidden";
urls.chat = buildUrlPath(urls.root, "/chat");
urls.logout = buildUrlPath(urls.root, "/logout");

export const clientUrls = urls;
