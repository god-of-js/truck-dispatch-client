import React, { useEffect } from 'react';
import styled from 'styled-components';
import UiIcon from 'ui/UiIcon';

interface Props {
  isActive?: boolean;
  rating: number;
  onRate?: (rating: number) => void;
}
export default function Ratings({ isActive = false, rating, onRate }: Props) {
  useEffect(() => {
    if (isActive) {
      const stars = document.querySelectorAll('.star');

      // add event listeners to each star element
      stars.forEach((star, index) => {
        star.addEventListener('mouseover', () => {
          // highlight the star and all previous stars
          for (let i = 0; i <= index; i++) {
            stars[i].classList.add('highlight');
          }
        });

        star.addEventListener('mouseout', () => {
          // remove highlighting from all stars
          stars.forEach((star) => star.classList.remove('highlight'));
        });
      });
    }
  });
  return (
    <div>
      {Array.from({ length: 5 }, (_, i) => i + 1).map((i) => (
        <RatingButton
          className={`star ${i <= rating && 'highlight-without-hover'}`}
          key={i}
          disabled={!isActive}
          onClick={() => onRate?.(i)}
        >
          <UiIcon icon="Star" size="20" />
        </RatingButton>
      ))}
    </div>
  );
}

const RatingButton = styled.button`
  border: transparent;
  background: transparent;
  cursor: pointer;

  &.highlight,
  &.highlight-without-hover {
    color: var(--color-warning);
  }
`;
