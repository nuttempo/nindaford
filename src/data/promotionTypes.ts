/** Data shape for the editable promotion (Everest Trend offer). */
export type PromotionData = {
  name: string;
  normalPrice: string;
  specialPrice: string;
  save: string;
  note: string;
  offerUrl: string;
  allOffersUrl: string;
};

/** Image item stored in localStorage (base64 src). */
export type StoredImageItem = {
  src: string;
  caption: string;
};
