import { motion } from "framer-motion";
import { useState } from "react";
import {
  card as cardStyle,
  stackContainer,
  completeButton,
  progressContainer,
  progressDot,
  progressDotActive,
  progressDotInactive,
} from "./StackCard.css";
import type { CardData } from "./types";
import { RotateCard } from "./RotateCard";
import { Button } from "@daycan/ui";
import { useNavigate } from "react-router-dom";
import { FullScreenCardModal } from "../FullScreenCardModal";

interface StackCardProps {
  randomRotation?: boolean;
  sensitivity?: number;
  cardDimensions?: { width: number; height: number };
  cardsData?: CardData[];
  animationConfig?: { stiffness: number; damping: number };
  sendToBackOnClick?: boolean;
}

export const StackCard = ({
  randomRotation = false,
  sensitivity = 300,
  cardDimensions = { width: 360, height: 400 },
  cardsData = [],
  animationConfig = { stiffness: 260, damping: 20 },
}: StackCardProps) => {
  const [cards, setCards] = useState<CardData[]>(cardsData);
  const [viewedCards, setViewedCards] = useState<Set<number>>(new Set());
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const totalCount = cardsData.length;
  const navigate = useNavigate();
  const sendToBack = (id: number) => {
    setCards((prev: CardData[]) => {
      const newCards = [...prev];
      const index = newCards.findIndex((card) => card.id === id);
      const [card] = newCards.splice(index, 1);
      newCards.unshift(card);
      return newCards;
    });

    // 카드를 하나씩 볼 때마다, 확인했음을 기록
    setViewedCards((prev) => new Set([...prev, id]));
  };

  const openCardModal = (card: CardData) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const closeCardModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  const isAllViewed = viewedCards.size === totalCount;

  return (
    <div
      className={stackContainer}
      style={{
        width: cardDimensions.width,
        height: cardDimensions.height,
      }}
    >
      {cards.map((card: CardData, index: number) => {
        const randomRotate = randomRotation ? Math.random() * 10 - 5 : 0;

        return (
          <RotateCard
            key={card.id}
            onSendToBack={() => sendToBack(card.id)}
            sensitivity={sensitivity}
          >
            <motion.div
              onClick={() => openCardModal(card)}
              animate={{
                rotateZ: (cards.length - index - 1) * 4 + randomRotate,
                scale: 1 + index * 0.06 - cards.length * 0.06,
                transformOrigin: "50% 100%",
              }}
              className={cardStyle}
              initial={false}
              transition={{
                type: "spring",
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping,
              }}
              style={{
                width: cardDimensions.width,
                height: cardDimensions.height,
                cursor: "pointer",
              }}
            >
              {card.content}
            </motion.div>
          </RotateCard>
        );
      })}

      <div className={progressContainer}>
        {Array.from({ length: totalCount }, (_, index) => (
          <div
            key={index}
            className={`${progressDot} ${
              index < viewedCards.size ? progressDotActive : progressDotInactive
            }`}
          />
        ))}
      </div>

      {isAllViewed && (
        <div className={completeButton}>
          <Button
            variant="primary"
            size="large"
            onClick={() => {
              navigate("/");
            }}
          >
            전부 확인했어요
          </Button>
        </div>
      )}

      <FullScreenCardModal isOpen={isModalOpen} onClose={closeCardModal}>
        {selectedCard?.content}
      </FullScreenCardModal>
    </div>
  );
};
