'use client';

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { useCallback } from 'react';
import { type ServerWidget, useWidgetStore } from '@/store/use-widget-store';
import { SortableWidget } from './draggable-widgets';

export function DndWidgetsProvider() {
  const { widgets, order, setOrder } = useWidgetStore();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (over && active.id !== over.id) {
        const oldIndex = order.indexOf(active.id as string);
        const newIndex = order.indexOf(over.id as string);

        const newOrder = [...order];
        newOrder.splice(oldIndex, 1);
        newOrder.splice(newIndex, 0, active.id as string);

        setOrder(newOrder);
      }
    },
    [order, setOrder]
  );

  // Sort widgets according to order
  const sortedWidgets: ServerWidget[] = order
    .map((id) => widgets.find((w) => w.id === id))
    .filter((w): w is ServerWidget => w !== undefined);

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={order} strategy={rectSortingStrategy}>
        <div className="w-full h-full grid grid-cols-2 gap-3 content-start">
          {sortedWidgets.map((widget) => (
            <SortableWidget key={widget.id} widget={widget} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
