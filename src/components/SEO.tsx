import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
}

const BASE_URL = 'https://aiautomationcoach.com';

export const SEO = ({ title, description, canonical, ogTitle, ogDescription }: SEOProps) => {
  const fullCanonical = canonical ? `${BASE_URL}${canonical}` : BASE_URL;
  const resolvedOgTitle = ogTitle ?? title;
  const resolvedOgDescription = ogDescription ?? description;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullCanonical} />
      <meta property="og:title" content={resolvedOgTitle} />
      <meta property="og:description" content={resolvedOgDescription} />
      <meta property="og:url" content={fullCanonical} />
    </Helmet>
  );
};
