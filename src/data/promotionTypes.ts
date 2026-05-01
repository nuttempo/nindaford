/** Data shape for a single editable promotion. */
export type PromotionData = {
  name: string;
  normalPrice: string;
  specialPrice: string;
  save: string;
  note: string;
  offerUrl: string;
  allOffersUrl: string;
};

/** A complete promotion item: data + its images. */
export type PromotionItem = {
  id: string;
  data: PromotionData;
  images: StoredImageItem[];
};

/** Image item stored in localStorage (base64 src). */
export type StoredImageItem = {
  src: string;
  caption: string;
};
