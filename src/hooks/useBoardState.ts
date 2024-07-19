import { create } from "zustand";

interface DragState {
  groupIndex: number;
  itemIndex: number;
}

interface ColumnDragState {
  groupIndex?: number;
  targetGroupIndex?: number;
  isColumnDraggable?: boolean;
}

interface BoardState {
  dragState: DragState | null;
  targetItemIndex: number | null;
  columnDragState: ColumnDragState | null;
  setDragState: (dragState: DragState | null) => void;
  setTargetItemIndex: (index: number | null) => void;
  setColumnDragState: (columnDragState: ColumnDragState | null) => void;
}

export const useBoardState = create<BoardState>((set) => ({
  dragState: null,
  targetItemIndex: null,
  columnDragState: null,
  setDragState: (dragState: DragState | null) => set({ dragState }),
  setTargetItemIndex: (targetItemIndex: number | null) =>
    set({ targetItemIndex }),
  setColumnDragState: (columnDragState: ColumnDragState | null) =>
    set({ columnDragState }),
}));
