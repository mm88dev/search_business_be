export interface FormattedOpeningHours {
  [day: string]: string[];
}

export interface PlaceData {
  id: string;
  name: string;
  address: string;
  openingHours: FormattedOpeningHours[];
  phoneNumbers: string[];
  websites: string[];
}
