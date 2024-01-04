interface HotelRecommended {
  id: number;
  idHotel: string;
  provider: string;
  validate_inicial: string;
  validade_final: string;
  status: false;
  created_at: string;
  updated_at: string;
}

export interface HotelSelected {
  name: string;
  provider: string;
  code: string;
  currency: string;
}

export interface ListRecommendedHotel extends Array<HotelRecommended> {}
