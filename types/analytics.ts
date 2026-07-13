export interface NamedCount {
  name: string;
  clicks: number;
}

export interface ClicksByDate {
  date: string;
  clicks: number;
}

export interface LinkStatsAnalytics {
  clicksByDate: ClicksByDate[];
  topCountries: NamedCount[];
  topDevices: NamedCount[];
  topReferrers: NamedCount[];
}

export interface LinkStats {
  activeLinks: number;
  totalClicks: number;
  totalLinks: number;
  topLinks: {
    _id: string;
    slug: string;
    destination: string;
    clicks: number;
  }[];
  analytics: LinkStatsAnalytics;
}

export interface LinkAnalytics {
  link: {
    slug: string;
    destination: string;
    clicks: number;
    isActive: boolean;
    createdAt: string;
  };
  analytics: {
    totalClicks: number;
    uniqueVisitors: number;
    clicksByDate: ClicksByDate[];
    topCountries: NamedCount[];
    topCities: NamedCount[];
    topDevices: NamedCount[];
    topBrowsers: NamedCount[];
    topOS: NamedCount[];
    topReferrers: NamedCount[];
    recentClicks: {
      country: string;
      city: string;
      device: string;
      browser: string;
      os: string;
      referer: string | null;
      createdAt: string;
    }[];
  };
}

export interface CampaignStats {
  campaign: {
    _id: string;
    name: string;
    description: string;
  };
  links: {
    _id: string;
    slug: string;
    destination: string;
    clicks: number;
    isActive: boolean;
    createdAt: string;
  }[];
  analytics: {
    totalClicks: number;
    clicksByDate: ClicksByDate[];
    topCountries: NamedCount[];
    topDevices: NamedCount[];
  };
}
