export type Product = {
  id:                   number;
  title:                string;
  description:          string;
  category:             string;
  price:                number;
  discountPercentage:   number;
  rating:               number;
  stock:                number;
  tags:                 string[];
  brand:                string;
  sku:                  string;
  weight:               number;
  dimensions:           Dimensions;
  warrantyInformation:  string;
  shippingInformation:  string;
  availabilityStatus:   string;
  reviews:              Review[];
  returnPolicy:         string;
  minimumOrderQuantity: number;
  meta:                 Meta;
  thumbnail:            string;
  images:               string[];
}

type Dimensions = {
  width:  number;
  height: number;
  depth:  number;
}

type Meta = {
  createdAt: Date;
  updatedAt: Date;
  barcode:   string;
  qrCode:    string;
}

type Review = {
  rating:        number;
  comment:       string;
  date:          Date;
  reviewerName:  string;
  reviewerEmail: string;
}