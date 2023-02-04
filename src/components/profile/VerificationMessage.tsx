import React from 'react';
import filesSent from '../../assets/img/files-sent.svg';

interface Props {
  img?: {};
  title?: string;
  subtitle?: string;
}
export default function VerificationMessage({
  img = filesSent,
  title = 'User has been verified',
  subtitle = `Your profile has been verified. Now, you are eligible to partake in
rides, bonuses, and all features available to transporters.`,
}) {
  return (
    <div className="details-feedback">
      <img src={img} alt={title} />
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  );
}
