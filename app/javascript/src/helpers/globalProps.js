import {
  keysToCamelCase,
  deepFreezeObject,
} from "@bigbinary/neeto-commons-frontend/pure";

export default function initializeGlobalProps() {
  window.globalProps = keysToCamelCase(
    JSON.parse(
      document.getElementsByClassName("root-container")[0]?.dataset
        ?.reactProps || "{}"
    )
  );

  deepFreezeObject(window.globalProps);
}
