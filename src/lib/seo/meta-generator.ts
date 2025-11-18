export interface MetaConfig {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'player';
  twitterSite?: string;
}

export function generateMetaTags(config: MetaConfig) {
  return {
    title: config.title,
    description: config.description,
    openGraph: {
      type: config.type || 'music.radio_station',
      url: config.url,
      title: config.title,
      description: config.description,
      images: config.image
        ? [
            {
              url: config.image,
              width: 1200,
              height: 630,
              alt: config.title,
            },
          ]
        : [],
    },
    twitter: {
      card: config.twitterCard || 'summary_large_image',
      site: config.twitterSite,
      title: config.title,
      description: config.description,
      images: config.image ? [config.image] : [],
    },
  };
}
