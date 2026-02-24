export interface Link {
  _id: string;
  slug: string;
  susPopups: boolean;
  og: {
    title: string;
    description: string;
    image: string;
  };
  isActive: boolean;
  destination: string;
  createdAt: Date;
  updatedAt: Date;
}
