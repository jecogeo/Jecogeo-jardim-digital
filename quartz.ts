import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import type { QuartzTransformerPluginInstance } from "./quartz/plugins/types"

const config = await loadQuartzConfig()

const fathom: QuartzTransformerPluginInstance = {
  name: "FathomAnalytics",

  externalResources() {
    return {
      js: [
        {
          script: `
            window.fathom = window.fathom || function () {
              (window.fathom.q = window.fathom.q || []).push(arguments)
            }

            fathom("set", "siteId", "QCMTI")
            fathom("set", "trackerUrl", "https://fathom.jecogeo.eu/collect")

            document.addEventListener("nav", () => {
              fathom("trackPageview")
            })
          `,
          loadTime: "afterDOMReady",
          contentType: "inline",
          spaPreserve: true,
        },
        {
          src: "https://fathom.jecogeo.eu/tracker.js",
          loadTime: "afterDOMReady",
          contentType: "external",
          spaPreserve: true,
        },
      ],
    }
  },
}

config.plugins.transformers.push(fathom)

export default config
export const layout = await loadQuartzLayout()
