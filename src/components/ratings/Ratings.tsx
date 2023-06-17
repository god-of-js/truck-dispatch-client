import React, { lazy, useEffect, useState } from 'react';
import styled from 'styled-components';

const UiIcon = lazy(() => import('ui/UiIcon'));
interface Props {
  isActive?: boolean;
  rating: number;
  onRate?: (rating: number) => void;
}
export default function Ratings({ isActive = false, rating, onRate }: Props) {
  const [activeStar, setActiveStar] = useState(rating);
  useEffect(() => {
    if (isActive) {
      const stars = document.querySelectorAll('.star');
      stars.forEach((star, index) => {
        star.addEventListener('mouseover', () => {
          setActiveStar(index + 1);
        });

        star.addEventListener('mouseout', () => {
          setActiveStar(rating);
        });
      });
    }
  }, []);

  return (
    <RatingsContainer>
      {Array.from({ length: 5 }, (_, i) => i + 1).map((i) => (
        <RatingButton
          className="star"
          key={i}
          disabled={!isActive}
          onClick={() => onRate?.(i)}
        >
          <UiIcon icon={activeStar >= i ? 'GoldStar' : 'Star'} size="20" />
        </RatingButton>
      ))}
    </RatingsContainer>
  );
}
const RatingsContainer = styled.div`
  display: flex;
  gap: ${pxToRem(6)};
`;
const RatingButton = styled.button`
  border: transparent;
  background: transparent;
  cursor: pointer;
  padding: 0;

  &.highlight,
  &.highlight-without-hover {
    color: var(--color-warning);
  }
`;
