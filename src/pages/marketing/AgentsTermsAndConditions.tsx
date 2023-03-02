import React from 'react';
import styled from 'styled-components';
import sizes from 'utils/sizes';

export default function AgentsTermsAndConditions() {
  return (
    <AgentsTNCStyling>
      <h2>General contracting terms and conditions for shippers</h2>
      <p>
        Welcome to TruckDispatch, an online platform connecting shippers with
        carriers in Nigeria. By using our services, you agree to comply with the
        following terms and conditions:
      </p>
      <section>
        <h3>Services</h3>
        <p>
          TruckDispatch is an online platform that broadcasts jobs sent by
          agents to transporters. Shippers can use the platform to find suitable
          carriers for their goods. Once the transporter has sent a bid, the
          agent selects the transporter with the most agreeable bid. After the
          trip has been marked as completed, the agent is expected to rate the
          carrier.
        </p>
      </section>
      <section>
        <h3>Responsibility</h3>
        <p>
          TruckDispatch is not responsible for any fraudulent activities of the
          carrier where the carrier runs away with the goods. We shall not be
          held liable for any loss of goods or damages. However, we will
          co-operate with the Nigeria Police Force to the best of our ability to
          ensure that justice is served.
        </p>
      </section>
      <section>
        <h3>Account Creation</h3>
        <p>
          To use our services, shippers must create an account on TruckDispatch.
          You must provide accurate and complete information when registering,
          and you must keep your account information up-to-date. We reserve the
          right to terminate any account that contains false or inaccurate
          information.
        </p>
      </section>
      <section>
        <h3>User Conduct</h3>
        <p>
          You agree to use our platform responsibly and to comply with all
          applicable laws and regulations. You agree not to use our platform for
          any illegal or fraudulent activities, including but not limited to
          money laundering, fraud, or theft.
        </p>
      </section>
      <section>
        <h3>Fees</h3>
        <p></p>
      </section>
    </AgentsTNCStyling>
  );
}

const AgentsTNCStyling = styled.div`
  min-height: 70vh;
  padding: ${pxToRem(160)} 0;
  width: 90%;
  margin: auto;

  h2 {
    text-align: center;
    font-weight: 900;
    font-family: 'thiccboi-extrabold';
    font-size: ${pxToRem(24)};
  }

  @media only screen and (min-width: ${sizes.tabletMidWidth}) {
    width: 70%;
  }
`;
