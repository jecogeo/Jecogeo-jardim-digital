import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import type { QuartzTransformerPluginInstance } from "./quartz/plugins/types"

const config = await loadQuartzConfig()

const fathom: QuartzTransformerPluginInstance = {
  name: "FathomAnalytics",

  externalResources() {
    return {
      js: [
        {
          src: "https://fathom.jecogeo.eu/tracker.js",
          loadTime: "afterDOMReady",
          contentType: "external",
          spaPreserve: true,
        },
        {
          script: `
            window.fathom = window.fathom || function () {
              (window.fathom.q = window.fathom.q || []).push(arguments)
            }

            fathom("set", "siteId", "QCMTI")

            document.addEventListener("nav", () => {
              fathom("trackPageview")
            })
          `,
          loadTime: "afterDOMReady",
          contentType: "inline",
          spaPreserve: true,
        },
      ],
    }
  },
}

config.plugins.transformers.push(fathom)

export default config
export const layout = await loadQuartzLayout()
