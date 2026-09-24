import { routing } from "@/i18n/routing";
import { EMAIL, SITE_NAME, SITE_TAGLINE, SITE_URL, SOCIALS } from "@/lib/site";
import { educations, skills, workExperiences } from "@/lib/static-data";

/**
 * JSON-LD for the homepage. Search engines read the page copy either way, but
 * the graph is what turns "a page mentioning Yusuf Wandana" into "a person,
 * this job title, these accounts" — the shape Google needs before it will
 * show a knowledge panel or link the site to the GitHub and LinkedIn profiles.
 *
 * Everything here is derived from lib/static-data and lib/site rather than
 * retyped, so the markup cannot drift out of sync with what the page renders.
 */

const PERSON_ID = `${SITE_URL}/#person`;
const SITE_ID = `${SITE_URL}/#website`;

// mailto: belongs in `email`, not in the profile list.
const profiles = SOCIALS.filter((s) => s.href.startsWith("http")).map(
  (s) => s.href,
);

// The hard skills only: "Teamwork" is true but it is not a subject anyone
// searches for, and knowsAbout is meant to read as a topic list.
const topics = [...skills.backend, ...skills.frontend, ...skills.tools].map(
  (s) => s.name,
);

export function homeJsonLd(locale: string, description: string) {
  const url =
    locale === routing.defaultLocale ? SITE_URL : `${SITE_URL}/${locale}`;

  const person = {
    "@type": "Person",
    "@id": PERSON_ID,
    name: SITE_NAME,
    url: SITE_URL,
    email: `mailto:${EMAIL}`,
    jobTitle: SITE_TAGLINE,
    description,
    image: `${SITE_URL}/${locale}/opengraph-image`,
    sameAs: profiles,
    knowsAbout: topics,
    knowsLanguage: [
      { "@type": "Language", name: "Indonesian", alternateName: "id" },
      { "@type": "Language", name: "English", alternateName: "en" },
    ],
    address: { "@type": "PostalAddress", addressCountry: "ID" },
    // The current employer is the first entry; the rest of the history is on
    // the page for humans and does not belong in the graph.
    worksFor: {
      "@type": "Organization",
      name: workExperiences[0].company,
    },
    alumniOf: educations.map((e) => ({
      "@type": "EducationalOrganization",
      name: e.institution,
    })),
  };

  const website = {
    "@type": "WebSite",
    "@id": SITE_ID,
    url,
    name: SITE_NAME,
    description,
    inLanguage: locale,
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
  };

  const page = {
    "@type": "ProfilePage",
    url,
    name: SITE_NAME,
    description,
    inLanguage: locale,
    isPartOf: { "@id": SITE_ID },
    // Tells a crawler the page is *about* the person, which is what makes a
    // portfolio a profile page rather than a generic document.
    mainEntity: { "@id": PERSON_ID },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [person, website, page],
  };
}
