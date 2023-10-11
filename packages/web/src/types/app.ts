export type Developer = {
  id?: string,
  name: string,
};

export type DeveloperName = string;
export type DeveloperId = string;

export type MethodologyType = 'Agile' | 'Waterfall'

export type Product = {
  productId?: number,
  productName: string,
  startDate: Date,
  methodology: MethodologyType,
  scrumMasterName: string,
  Developers: DeveloperName[],
  DeveloperIds: DeveloperId[],
  productOwnerName: string,
  location: string
};

export type ProductKey = keyof Product;

export const ProductLabel = {
  productId: 'Product Number',
  productName: 'Product Name',
  startDate: 'Start Date',
  methodology: 'Methodology',
  scrumMasterName: 'Scrum Master',
  productOwnerName: 'Product Owner',
  location: 'Location',
  Developers: 'Developer Names',
} as Record<ProductKey, string>;

export const methodologiesList = ['Agile', 'Waterfall'] as MethodologyType[];
