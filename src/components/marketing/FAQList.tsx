import React, { useState } from 'react';
import styled from 'styled-components';
import UiIcon from 'ui/UiIcon';

export default function FAQList() {
  const list = [
    {
      question: 'Is TruckDispatch free?',
      answer: `TruckDispatch is free for our transporters and they would be paid for every trip they carry out. However, agents are billed only 7% of the bid price they accept.`,
    },
    {
      question: 'How does TruckDispatch assign trips?',
      answer: `At the moment, TruckDispatch does not assign trips to transporters. Instead, TruckDispatch broadcasts trips to our network of transporters. Any transporter interested in the trip sends a bid which can either be accepted by the agent or rejected.`,
    },
    {
      question: 'How do I get paid as a transporter?',
      answer: `As a transporter, you can request payment after loading the trip. However, you have to upload the <b>Proof Of Loading</b> which is a video vividly showing the truck plate number and other details of the trip. <br /> No <b>Proof Of Loading (POL) =</b> No Payment`,
    },
    {
      question: 'What is required for transporter verification?',
      answer: `To get verified as a transporter, you need to take a selfie using our app, upload a valid means of identification, home address, a utility bill for your home address, garage address, company address, a guarantor and his identification details as well as his home address. Till a transporter is properly verified, he can't bid for jobs or be granted any job <br /> PS: All details are subject to thorough background checks and investigation.`,
    },
    {
      question: 'How does TruckDispatch handle fraud?',
      answer: `TruckDispatch transporters undergo a very thorough verification and vetting process which makes fraud almost impossible. However, TruckDispatch has penalties for transporters who are fraudulent and we eradicate their accounts in case of such. We are also working on a collaboration with the Nigeria Police Force(NPF) hence, all fraud cases would be directly handed over for further investigation and apprehension.`,
    },
  ];
  const [active, setActive] = useState(list[0].question);

  function isActive(question: string) {
    return active === question;
  }

  return (
    <ListStyle>
      {list.map((item, index) => (
        <Item key={index} isActive={isActive(item.question)}>
          <div
            className="header"
            onClick={() =>
              setActive(isActive(item.question) ? '' : item.question)
            }
          >
            <div className="question">{item.question}</div>
            <UiIcon icon={isActive(item.question) ? 'CaretUp' : 'CaretDown'} />
          </div>
          {isActive(item.question) && (
            <div
              className="answer"
              dangerouslySetInnerHTML={{ __html: item.answer }}
            />
          )}
        </Item>
      ))}
    </ListStyle>
  );
}

const ListStyle = styled.ul`
  padding: 0;
  margin: 0;
  list-style-type: none;
`;

const Item = styled.li`
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid
      ${({ isActive }: { isActive: boolean }) =>
        isActive ? 'transparent' : 'var(--color-gray-200)'};
    cursor: pointer;
    padding: ${pxToRem(20)};
    font-weight: bold;
  }

  &:last-child {
    .header {
      border-bottom: transparent;
    }
  }

  .answer {
    padding: 0 ${pxToRem(40)};
    display: ${({ isActive }: { isActive: boolean }) =>
      isActive ? 'block' : 'none'};
    font-size: ${pxToRem(16)};
    color: var(--color-gray-500);
  }
`;
