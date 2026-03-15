export type AccidentReport = {
  id: string;
  date: string;
  location: string;
  severity: "Low" | "Medium" | "High";
  status: "Draft" | "Submitted";
};

const seedReports: AccidentReport[] = [
  {
    id: "AR-1001",
    date: "2026-02-18",
    location: "Main St & 3rd Ave",
    severity: "Low",
    status: "Draft",
  },
  {
    id: "AR-1002",
    date: "2026-02-22",
    location: "Highway 7 Exit 12",
    severity: "High",
    status: "Submitted",
  },
  {
    id: "AR-1003",
    date: "2026-02-26",
    location: "Parking Lot B",
    severity: "Medium",
    status: "Draft",
  },
];

export function getSeedReports() {
  return seedReports;
}

export async function listAccidentReports(): Promise<AccidentReport[]> {
  await new Promise((r) => setTimeout(r, 450));
  return seedReports;
}
