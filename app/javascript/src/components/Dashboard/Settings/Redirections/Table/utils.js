import { VALID_PATH_REGEX } from "../constants";

const isPath = path => path.match(VALID_PATH_REGEX);

const formatPath = path => {
  if (path.startsWith("/")) return path;

  return `/${path}`;
};

export const formatPaths = response => {
  const payload = { ...response };
  if (isPath(response.to)) payload.to = formatPath(response.to);

  if (isPath(response.from)) payload.from = formatPath(response.from);

  return payload;
};
