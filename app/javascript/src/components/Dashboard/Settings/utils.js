import { ROUTES } from "./constants";

export const getActiveSettingsTab = key =>
  ROUTES.find(route => key === route.key);
