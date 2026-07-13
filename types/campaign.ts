export interface Campaign {
  _id: string;
  name: string;
  description: string;
  userId: string;
  linksCount?: number;
  totalClicks?: number;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}
