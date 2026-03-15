import { create } from "zustand";

type ReportDraftState = {
  driverName: string;
  vehiclePlate: string;
  notes: string;
  setDriverName: (value: string) => void;
  setVehiclePlate: (value: string) => void;
  setNotes: (value: string) => void;
  reset: () => void;
};

const initialState = {
  driverName: "",
  vehiclePlate: "",
  notes: "",
};

export const useReportDraftStore = create<ReportDraftState>((set) => ({
  ...initialState,
  setDriverName: (value) => set({ driverName: value }),
  setVehiclePlate: (value) => set({ vehiclePlate: value }),
  setNotes: (value) => set({ notes: value }),
  reset: () => set(initialState),
}));
