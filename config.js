// Tessallite website runtime config — set these at publish time.
// The pages read these window globals (with safe fallbacks if unset):
//   register.html / security.html -> TESSALLITE_ISSUER_URL   (the issuer function base URL)
//   download.html                 -> TESSALLITE_DOWNLOAD_URL  (the bundle bucket/base URL)
//                                    TESSALLITE_VERSION        (current release version)
//
// Fill these in once the issuer is deployed and the tessallite-io download bucket exists,
// then publish the site. Leaving a value unset keeps the page's safe placeholder behaviour.
window.TESSALLITE_ISSUER_URL = "https://issuer-6pjlis7ega-uc.a.run.app";  // deployed issuer (tessallite-vault)
// Bundle is served via the CDN-fronted host https://downloads.tessallite.io/tessallite-community-<VERSION>.tar.gz
// (Cloud CDN + backend bucket over gs://tessallite-io-downloads; edge-cached so GCS egress is bounded).
// Direct public download of the free bundle (the licence is registered for separately).
window.TESSALLITE_DOWNLOAD_URL = "https://downloads.tessallite.io";
window.TESSALLITE_VERSION = "1.1.4";
