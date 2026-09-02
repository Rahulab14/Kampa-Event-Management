import type { Event } from "../types/event";

const SHEET_ID =
  import.meta.env.VITE_GOOGLE_SHEET_ID;

const API_KEY =
  import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;

const RANGE =
  import.meta.env.VITE_GOOGLE_SHEET_RANGE ||
  "Sheet1!A1:AB";

export async function fetchEventsFromSheet(): Promise<Event[]> {

  if (!SHEET_ID || !API_KEY) {
    console.warn(
      "Missing Google Sheets configuration."
    );

    return [];
  }

  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/` +
    `${SHEET_ID}/values/${encodeURIComponent(RANGE)}` +
    `?key=${API_KEY}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Sheets API error: ${response.status}`
      );
    }

    const result = await response.json();

    const rows: string[][] =
      result.values || [];

    if (rows.length < 2) {
      return [];
    }

    const headers =
      rows[0].map((header) =>
        header.trim()
      );

    const dataRows =
      rows.slice(1);

    return dataRows.map(
      (row, index) => {

        const record: Record<
          string,
          string
        > = {};

        headers.forEach(
          (header, columnIndex) => {
            record[header] =
              row[columnIndex] || "";
          }
        );

        return convertToEvent(
          record,
          index
        );
      }
    );
  } catch (error) {
    console.error(
      "Error fetching Kampa events:",
      error
    );

    return [];
  }
}

function convertToEvent(
  row: Record<string, string>,
  index: number
): Event {

  return {

    id:
      row.sourceEmailId ||
      `event-${index}`,

    name:
      row.name ||
      "Untitled Event",

    type:
      row.type ||
      "Event",

    shortDescription:
      row.shortDescription ||
      "",

    description:
      row.description ||
      "",

    startDate:
      row.startDate ||
      "",

    endDate:
      row.endDate ||
      "",

    venue:
      row.venue ||
      "Venue TBA",

    durationHours:
      Number(row.durationHours) ||
      0,

    teamSize:
      row.teamSize ||
      "All students",

    registrationFee:
      Number(row.registrationFee) ||
      0,

    prizePool:
      Number(row.prizePool) ||
      0,

    eeCredits:
      Number(row.eeCredits) ||
      0,

    registrationOpenAt:
      row.registrationOpenAt ||
      "",

    registrationUrl:
      row.registrationUrl ||
      "",

    whatsappUrl:
      row.whatsappUrl ||
      "",

    organizer:
      row.organizer ||
      "",

    department:
      row.department ||
      "",

    school:
      row.school ||
      "",

    contacts:
      parseArray(row.contacts),

    media:
      parseArray(row.media),

    sourceEmailId:
      row.sourceEmailId ||
      "",

    sourceEmailSubject:
      row.sourceEmailSubject ||
      "",

    sourceEmailDate:
      row.sourceEmailDate ||
      "",

    sourceAttachmentUrl:
      row.sourceAttachmentUrl ||
      "",

    status:
      row.status ||
      "REVIEW",

    confidence:
      row.confidence ||
      "Medium",

    createdAt:
      row.createdAt ||
      "",

    updatedAt:
      row.updatedAt ||
      "",
  };
}

function parseArray<T>(
  value: string
): T[] {

  if (!value) {
    return [];
  }

  try {
    return JSON.parse(value);
  } catch {
    return [];
  }
}