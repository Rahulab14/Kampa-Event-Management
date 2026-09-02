export interface Contact {
  name?: string;
  phone?: string;
  email?: string;
  role?: string;
}

export interface Media {
  url?: string;
  type?: string;
  alt?: string;
}

export interface Event {
  id: string;

  name: string;
  type: string;

  shortDescription: string;
  description: string;

  startDate: string;
  endDate: string;

  venue: string;

  durationHours: number | string;
  teamSize: number | string;

  registrationFee: number | string;
  prizePool: number | string;
  eeCredits: number | string;

  registrationOpenAt: string;
  registrationUrl: string;
  whatsappUrl: string;

  organizer: string;
  department: string;
  school: string;

  contacts: Contact[];
  media: Media[];

  sourceEmailId: string;
  sourceEmailSubject: string;
  sourceEmailDate: string;
  sourceAttachmentUrl: string;

  sourceEmailUrl?: string;

  status: string;
  confidence: string;

  createdAt: string;
  updatedAt: string;

  registrationOpen?: boolean;
}