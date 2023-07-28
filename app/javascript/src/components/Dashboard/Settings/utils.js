import { findBy } from "neetocommons/pure";

import { ROUTES } from "./constants";

export const getActiveSettingsTab = key => findBy({ key }, ROUTES);
