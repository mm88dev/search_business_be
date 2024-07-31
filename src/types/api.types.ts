interface ApiLocation {
  lat: number;
  lon: number;
  x: number;
  y: number;
  latlon: string;
  format2d: {
    lng: number;
    lat: number;
  };
  geohex: string;
}

interface ApiBoundingBox {
  lat1: number;
  lat2: number;
  lon1: number;
  lon2: number;
}

interface ApiGeography {
  location: ApiLocation;
  altitude: number;
  bounding_box: ApiBoundingBox;
}

interface ApiAddressWhere {
  street: string;
  city: string;
  state: string;
  geography: ApiGeography;
  house_number: string;
  zipcode: number;
}

interface ApiContact {
  _class: string;
  contact_type: string;
  service_code: string;
  formatted_service_code: string;
  call_link?: string;
  refuse_advertising?: boolean;
  freecall_enabled?: boolean;
  preferred: boolean;
  id: string;
  phone_number?: string;
  url?: string;
}

interface ApiAddress {
  _class: string;
  contacts: ApiContact[];
  address_id: string;
  address_types: string[];
  where: ApiAddressWhere;
  place_collections: {
    tags: string[];
    tag: string;
    id: string;
  }[];
  business: {
    identities: {
      profession: string;
      name: string;
      business_description: {
        de: string;
        it: string;
        fr: string;
        en: string;
      };
    }[];
    categories: {
      id: string;
      source_id: string;
      emoji: string;
      name: {
        rm: string;
        it: string;
        fr: string;
        de: string;
        en: string;
      };
      icon: {
        renditions: {
          icon: string;
        };
        alt: string;
        asset_id: string;
        url: string;
      };
    }[];
  };
}

interface ApiPlaceFeedbackSummary {
  recommendations: number;
  positive_recommendations: number;
  display_recommendations: boolean;
  ratings_count: number;
  feedbacks_count: number;
  reviews_count: number;
  average_rating: number;
  display_average_rating: boolean;
  rating_summaries: {
    dimension: string;
    count: number;
    average: number;
    display: boolean;
  }[];
  positive_recommendation_percentage: number;
}

interface ApiSource {
  provider: {
    name: string;
    properties: {
      display: {
        de: string;
        fr: string;
        it: string;
        en: string;
      };
    };
  };
  subscriber: {
    id: number;
  };
}

interface ApiOpeningHour {
  start: string;
  end: string;
  type: 'OPEN' | 'CLOSED';
}

export interface ApiOpeningHours {
  days: {
    [key: string]: ApiOpeningHour[];
  };
  closed_on_holidays?: boolean;
  open_by_arrangement?: boolean;
}

export interface BusinessApiResponse {
  _class: string;
  language: string;
  entry_type: string;
  local_entry_id: string;
  source: ApiSource;
  favorited: boolean;
  place_feedback_summary: ApiPlaceFeedbackSummary;
  addresses: ApiAddress[];
  tags: string[];
  displayed_what: string;
  displayed_where: string;
  opening_hours: ApiOpeningHours;
  creation_date: string;
  modified_date: string;
  _update_process_type: string;
}
