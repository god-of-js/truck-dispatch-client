import React from 'react';
import styled from 'styled-components';
import Rating from 'types/Rating';
import UiIcon from 'ui/UiIcon';

interface Props {
  ratings: Rating[];
}

export default function RatingsComponent({ ratings }: Props) {
  const totalRatings = ratings.length;

  return (
    <RatingContainer>
      {[5, 4, 3, 2, 1].map((ratingValue) => {
        const count = ratings.filter(
          (rating) => rating.starRating == ratingValue,
        ).length;

        const width = count > 0 ? `${(count / totalRatings) * 100}%` : '0%';

        return (
          <RatingStyle key={ratingValue}>
            <RatingLabel>
              <UiIcon size="10" icon="GoldStar" />
              {ratingValue}
            </RatingLabel>
            <RatingBarContainer>
              <RatingBar width={width} />
            </RatingBarContainer>
          </RatingStyle>
        );
      })}
    </RatingContainer>
  );
}

const RatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
`;

const RatingStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
`;

const RatingLabel = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%;
  letter-spacing: 0.3px;
`;

const RatingBarContainer = styled.div`
  width: 155px;
  overflow: hidden;
  border-radius: 100px;
  background: var(--color-grey-50, #e3e1e9);
`;

const RatingBar = styled.div<{ width: string }>`
  width: ${({ width }) => (width ? width : '0')};
  height: 8px;
  background: var(--color-primary-50, #6851cf);
  transition: width 0.5s;
`;
