export interface Link {
  _id: string;
  slug: string;
  ogMode: "custom" | "original" | "none";
  og: {
    title: string;
    description: string;
    image: string;
  };
  isActive: boolean;
  destination: string;
  campaignId: string | null;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  clicks: number;
}
