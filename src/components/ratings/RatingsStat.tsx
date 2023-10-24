import { useMemo } from 'react';
import styled from 'styled-components';
import Rating from 'types/Rating';
import RatingsComponent from './RatingsComponent';

interface Props {
  ratings: Rating[];
}
export default function RatingsStat({ ratings }: Props) {
  const averageStarRating = useMemo(() => {
    if (ratings.length === 0) {
      return 0;
    }

    const totalRating = ratings
      .map(({ starRating }) => starRating)
      .reduce((accumulator, currentRating) => accumulator + currentRating, 0);

    const average = totalRating / ratings.length;
    return average;
  }, [ratings]);

  return (
    <RatingsStatStyling className="review-container">
      <h3>Transporter Reviews</h3>
      <div className="triple-grid">
        <DataCard>
          <div className="card-title">Total Reviews</div>
          <div className="card-value">{ratings.length}</div>
        </DataCard>
        <DataCard>
          <div className="card-title">Average Rating</div>
          <div className="card-value">
            <div>{averageStarRating}</div>
          </div>
        </DataCard>
        <DataCard>
          <RatingsComponent ratings={ratings} />
        </DataCard>
      </div>
    </RatingsStatStyling>
  );
}

const RatingsStatStyling = styled.div`
  padding: ${pxToRem(32)} 0;
  border-bottom: ${pxToRem(1)} solid var(--color-gray-50);
  h3 {
    margin-bottom: ${pxToRem(32)};
  }

  .triple-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: ${pxToRem(12)};
  }
`;

const DataCard = styled.div`
  background: var(--color-gray-20);
  padding: ${pxToRem(20)} ${pxToRem(16)};
  border-radius: ${pxToRem(8)};

  .card-title {
    color: var(--color-neutralBlack);
    font-size: ${pxToRem(14)};
    font-style: normal;
    font-weight: 600;
    line-height: ${pxToRem(24)};
    margin-bottom: ${pxToRem(24)};
  }
  .card-value {
    color: var(--color-neutralBlack);
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    display: flex;
    gap: ${pxToRem(8)};
  }
`;
