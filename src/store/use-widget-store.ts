'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ServerWidget {
  id: string;
  title: string;
  type: 'cpu' | 'memory' | 'network' | 'disk';
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
}

interface WidgetStore {
  widgets: ServerWidget[];
  order: string[];
  setOrder: (order: string[]) => void;
  updateWidgetValue: (id: string, value: number) => void;
}

const initialWidgets: ServerWidget[] = [
  { id: 'cpu', title: 'CPU Load', type: 'cpu', value: 42, unit: '%', trend: 'up' },
  { id: 'memory', title: 'Memory', type: 'memory', value: 67, unit: '%', trend: 'stable' },
  { id: 'network', title: 'Network', type: 'network', value: 128, unit: 'Mbps', trend: 'down' },
  { id: 'disk', title: 'Disk I/O', type: 'disk', value: 89, unit: 'MB/s', trend: 'up' },
];

const initialOrder = ['cpu', 'memory', 'network', 'disk'];

/**
 * Widget store with localStorage persistence.
 * Remembers the user's widget layout across sessions.
 */
export const useWidgetStore = create<WidgetStore>()(
  persist(
    (set) => ({
      widgets: initialWidgets,
      order: initialOrder,

      setOrder: (order) => {
        set({ order });
      },

      updateWidgetValue: (id, value) => {
        set((state) => ({
          widgets: state.widgets.map((widget) =>
            widget.id === id
              ? {
                  ...widget,
                  value,
                  trend: value > widget.value ? 'up' : value < widget.value ? 'down' : 'stable',
                }
              : widget
          ),
        }));
      },
    }),
    {
      name: 'cyberpunk-lab-widgets',
    }
  )
);
