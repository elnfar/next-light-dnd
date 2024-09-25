"use client";

import React, { useState, DragEvent } from "react";
import { motion } from "framer-motion";

import SyntaxHighlighter from "react-syntax-highlighter";

import { atelierHeathDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

const Component = ({
  body,
  inlineNumbers,
}: {
  body: string;
  inlineNumbers: boolean;
}) => {
  return (
    <SyntaxHighlighter
      language="javascript"
      style={atelierHeathDark}
      showLineNumbers={inlineNumbers}
    >
      {body}
    </SyntaxHighlighter>
  );
};
enum Category {
  NEW = "NEW",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

type initialCards = {
  id: string;
  title: string;
  category: Category;
};

const testItems = [
  { id: "1", title: "Test Card 1", category: Category.NEW },
  { id: "2", title: "Test Card 2", category: Category.IN_PROGRESS },
  { id: "3", title: "Test Card 3", category: Category.DONE },
  { id: "4", title: "Test Card 4", category: Category.DONE },
];

export const CustomKanban = () => {
  return (
    <div className="text-neutral-50">
      <div className="w-3/4 mx-auto space-y-4">
        <Component body="Welcome to the Next-Light-DND" inlineNumbers={false} />
        <Board initialCards={testItems} />
        <Component
          inlineNumbers={true}
          body={`
            
  const Board = ({ initialCards }: { initialCards: initialCards[] }) => {
  const [cards, setCards] = useState(initialCards);
    return (
    <div className="flex min-h-[40vh] mx-auto w-3/4 gap-3 p-12">

      <Column
        title="New"
        column="NEW"
        headingColor="text-neutral-500"
        cards={cards}
        setCards={setCards}
      />

      <Column
        title="In Progress"
        column="IN_PROGRESS"
        headingColor="text-blue-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Done"
        column="DONE"
        headingColor="text-emerald-200"
        cards={cards}
        setCards={setCards}
      />
    </div>
  );
};
`}
        />

        <Component body="Add your mock data now" inlineNumbers={false} />

        <Component
          body={`const testItems = [
  { id: "1", title: "Test Card 1", category: Category.NEW },
  { id: "2", title: "Test Card 2", category: Category.IN_PROGRESS },
  { id: "3", title: "Test Card 3", category: Category.DONE },
  { id: "4", title: "Test Card 4", category: Category.DONE },
];`}
          inlineNumbers={false}
        />

        <Component
          inlineNumbers={true}
          body={`
const Column = ({
  title,
  headingColor,
  cards,
  column,
  setCards,
}: ColumnProps) => {
  const [active, setActive] = useState(false);

  const handleDragStart = (e: DragEvent, card: initialCards) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleDragEnd = async (e: DragEvent) => {
    const cardId = e.dataTransfer.getData("cardId");
    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);
    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...cards];
      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, category: column as Category };

      copy = copy.filter((c) => c.id !== cardId);
      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;
        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      setCards(copy);
    }
  };`}
        />
        <Component
          inlineNumbers={false}
          body={`Lastly, we need to have types of our last component which is Cards (draggable items)`}
        />

        <Component
          inlineNumbers={false}
          body={`
type CardProps = {
  title: string;
  id: string;
  category: string;
  handleDragStart: Function;
};

`}
        />

        <Component
          inlineNumbers={true}
          body={`
  const Card = ({ title, id, category, handleDragStart }: CardProps) => {
  return (
    <div>
      <DropIndicator beforeId={id} column={category} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { title, id, category })}
        className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 py-7 active:cursor-grabbing"
      >
        <p className="text-sm text-neutral-100">{title}</p>
      </motion.div>
    </div>
  );
};


Also, you can add drop-indicator component, which makes the component visually appealing.
  `}
        />

        <Component
          inlineNumbers={true}
          body={`
type DropIndicatorProps = {
  beforeId: string | null;
  column: string;
};

const DropIndicator = ({ beforeId, column }: DropIndicatorProps) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
    />
  );
};

`}
        />
      </div>
    </div>
  );
};

const Board = ({ initialCards }: { initialCards: initialCards[] }) => {
  const [cards, setCards] = useState(initialCards);

  return (
    <div className="flex min-h-[40vh] mx-auto w-3/4 gap-3 p-12">
      <Column
        title="New"
        column="NEW"
        headingColor="text-neutral-500"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="In Progress"
        column="IN_PROGRESS"
        headingColor="text-blue-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Done"
        column="DONE"
        headingColor="text-emerald-200"
        cards={cards}
        setCards={setCards}
      />
    </div>
  );
};

type ColumnProps = {
  title: string;
  headingColor: string;
  cards: initialCards[];
  column: string;
  setCards: React.Dispatch<React.SetStateAction<initialCards[]>>;
};

const Column = ({
  title,
  headingColor,
  cards,
  column,
  setCards,
}: ColumnProps) => {
  const [active, setActive] = useState(false);

  const handleDragStart = (e: DragEvent, card: initialCards) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleDragEnd = async (e: DragEvent) => {
    const cardId = e.dataTransfer.getData("cardId");
    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);
    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...cards];
      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, category: column as Category };

      copy = copy.filter((c) => c.id !== cardId);
      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;
        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      setCards(copy);
      // Handle the API call to update the card category if necessary
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    highlightIndicator(e);
    setActive(true);
  };

  const clearHighlights = (els?: HTMLElement[]) => {
    const indicators = els || getIndicators();
    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const highlightIndicator = (e: DragEvent) => {
    const indicators = getIndicators();
    clearHighlights(indicators);
    const el = getNearestIndicator(e, indicators);
    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (e: DragEvent, indicators: HTMLElement[]) => {
    const DISTANCE_OFFSET = 50;
    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = e.clientY - (box.top + DISTANCE_OFFSET);
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );
    return el;
  };

  const getIndicators = () => {
    return Array.from(
      document.querySelectorAll(
        `[data-column="${column}"]`
      ) as unknown as HTMLElement[]
    );
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  const filteredCards = cards.filter((c) => c.category === column);

  return (
    <div className="w-[35%] shrink-0 px-4 border-[rgb(95,95,95)] border-r-[1px] overflow-y-hidden">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400">
          {filteredCards.length}
        </span>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full transition-colors ${
          active ? "bg-neutral-800/50" : "bg-neutral-800/0"
        }`}
      >
        {filteredCards.map((c) => (
          <Card key={c.id} {...c} handleDragStart={handleDragStart} />
        ))}
        <DropIndicator beforeId={null} column={column} />
      </div>
    </div>
  );
};

type CardProps = {
  title: string;
  id: string;
  category: string;
  handleDragStart: Function;
};

const Card = ({ title, id, category, handleDragStart }: CardProps) => {
  return (
    <div>
      <DropIndicator beforeId={id} column={category} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { title, id, category })}
        className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 py-7 active:cursor-grabbing"
      >
        <p className="text-sm text-neutral-100">{title}</p>
      </motion.div>
    </div>
  );
};

type DropIndicatorProps = {
  beforeId: string | null;
  column: string;
};

const DropIndicator = ({ beforeId, column }: DropIndicatorProps) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
    />
  );
};
