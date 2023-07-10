import { keysToCamelCase, deepFreezeObject } from "neetocommons/pure";

export default function initializeGlobalProps() {
  window.globalProps = keysToCamelCase(
    JSON.parse(
      document.getElementsByClassName("root-container")[0]?.dataset
        ?.reactProps || "{}"
    )
  );

  deepFreezeObject(window.globalProps);
}
