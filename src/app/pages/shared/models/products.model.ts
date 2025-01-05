export interface Products {
  id?: number;
  nom: string;
  prix: number;
  stock: number;
  description: string;
  image?: string;    // Store the base64-encoded image string or URL for display purposes
  images?: string[]; // Array of base64-encoded image strings or URLs
}
