import { create } from "zustand";

interface DragState {
  groupIndex: number;
  itemIndex: number;
}

interface BoardState {
  dragState: DragState | null;
  targetItemIndex: number | null;
  setDragState: (dragState: DragState | null) => void;
  setTargetItemIndex: (index: number | null) => void;
}

export const useBoardState = create<BoardState>((set) => ({
  dragState: null,
  targetItemIndex: null,
  setDragState: (dragState: DragState | null) => set({ dragState }),
  setTargetItemIndex: (targetItemIndex: number | null) =>
    set({ targetItemIndex }),
}));
