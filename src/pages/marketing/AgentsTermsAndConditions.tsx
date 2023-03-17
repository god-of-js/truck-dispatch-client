import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import Logo from '../../assets/img/truck-dispatch-logo-with-text.png';

import sizes from 'utils/sizes';

export default function AgentsTermsAndConditions() {
  return (
    <AgentsTNCStyling>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Terms and Conditions - TruckDispatch</title>
        <link
          rel="canonical"
          href="https://www.gettruckdispatch.com/terms-and-conditions"
        />
        <meta property="og:image" content={Logo} />
      </Helmet>
      <h2>General contracting terms and conditions</h2>
      <p>
        Welcome to TruckDispatch, an online platform connecting agents with
        transporters in Nigeria. By using our services, you agree to comply with
        the following terms and conditions:
      </p>
      <section>
        <h3>SERVICES</h3>
        <p>
          TruckDispatch is an online platform that broadcasts jobs sent by
          agents to transporters. agents can use the platform to find suitable
          transporters for their goods. Once the transporter has sent a bid, the
          agent selects the transporter with the most agreeable bid. After the
          trip has been marked as completed, the agent is expected to rate the
          transporter.
        </p>
      </section>
      <h3>USER STATUS</h3>
      <section>
        <h4>Account Creation</h4>
        <p>
          To contract a carriage service through the TruckDispatch platform, it
          is an essential pre-requisite that the effective Agent first formally
          registers as a "User".
        </p>
      </section>
      <section>
        <h4>Registration and Deregistration of Users</h4>
        <p>
          TruckDispatch's authorisation is required for an Effective Agent to
          register as a User and TruckDispatch reserves the right to reject the
          registration of any Agent, at its entire discretion, when it considers
          that the Agent does not comply with the parameters and meet the
          conditions set forth in these T&Cs and/or in the applicable
          regulations. In any case, TruckDispatch may reject registration
          requests made fraudulently or in violation of any law, regulation or
          right.
        </p>
        <p>
          TruckDispatch may deregister any Effective Agent as a User without the
          need for prior notice, without giving any reason and at any time, if
          it infringes these T&Cs, has acted in a way that shows that it has no
          intention or ability to comply with them, or it has not provided
          TruckDispatch with the requested documentation. In any event,
          TruckDispatch may deregister as a User any Agent that has not
          contracted any Service during a period of three (3) consecutive
          months.
        </p>
      </section>
      <section>
        <h4>Email and Password</h4>
        <p>
          On account creation a User requires an email and password to gain
          access to the platform. The User would be solely responsible for his
          email and password and will be liable for any harm or loss that may
          arise from it's improper use, assignment, disclosure or loss.
        </p>
      </section>
      <section>
        <h4>User's Obligations</h4>
        <p>
          The User agrees to make appropriate use of the Platform and, by way of
          example, but without limitation, undertakes not to engage in the
          following behaviours:
        </p>
        <ul>
          <li>
            Impersonate identities, provide false or information belonging to
            another person in the course of its registration or in its user
            profile.
          </li>
          <li>
            {' '}
            Attempt to access and, where appropriate, use the account of another
            User and modify its content.
          </li>
          <li>Collect information about a User without its consent.</li>
          <li>
            Publish, advertise, upload or transport articles that breach the
            provisions of this Contractual Agreement.
          </li>
          <li>
            Perform any act that could harm, directly or indirectly,
            TruckDispatch or another User.
          </li>
          <li>
            Suppress, circumvent, or manipulate the security measures
            implemented by TruckDispatch.
          </li>
          <li>
            Distribute viruses or other technologies that may harm TruckDispatch
          </li>
          <li>
            Engage in activities that are unlawful or contrary to good faith and
            public order
          </li>
        </ul>
        <p>
          In the event of carrying out any of the aforementioned activities, the
          Agent undertakes to compensate all damages (including direct damages
          and loss of profits) caused to both the Actual Transporter and
          TruckDispatch, leaving the latter harmless and releasing the latter
          from any liability.
        </p>
      </section>
      <h3>SCOPE OF PERFORMANCE OF THE CARRIAGE SERVICE</h3>
      <section>
        <h4>TruckDispatch: Transport Operator</h4>
        <p>
          TruckDispatch is a Transport Operator whose activity is the
          intermediation in the contracting of goods carriage, acting as an
          intermediary organisation between Effective Shippers and the Carriers.
        </p>
        <p>
          In this regard, without prejudice to strict regulatory compliance by
          TruckDispatch, the Effective agent declares that it is aware and
          agrees that:
        </p>
        <ul>
          <li>
            TruckDispatch is not aware of the goods that are the subject of the
            Service
          </li>
          <li>TruckDispatch is at no time in possession of the goods.</li>
          <li>
            TruckDispatch is not liable for the loss or any harm incurred on the
            goods.
          </li>
        </ul>
        <p>
          In addition, by contracting a Service on the Platform, the Effective
          agent expressly consents and authorises TruckDispatch, in general and
          at its free discretion, to subcontract the material performance of the
          Services, subject to the provisions of these T&Cs to third parties,
          natural persons or legal entities, that are legally authorised to
          provide services for the transport of goods by road.
        </p>
      </section>
      <h4>Procedure for the performance of the Carriage Service</h4>
      <p>
        The contracting procedure and subsequent performance of the Carriage
        Service consist in:{' '}
      </p>
      <ul>
        <li>The creation of the new trip order by the Agent.</li>
        <li>
          The broadcast of the new trip order by the Carriage
          Service(TruckDispatch).
        </li>
        <li>The acceptance of the carriage service by the transporter.</li>
        <li>The payment by the agent.</li>
        <li>Commencement of trip by transporter.</li>
      </ul>
      <section>
        <h5>New Trip Order</h5>
        <p>
          The contracting process begins when the agent fills in the new trip
          order on the platform with all neccessary specifications for the
          performance of the service. The completion of the New Trip Order
          entails the effective agents acceptance of <br />
          (i) these T&Cs undertaking all the obligations derived from them, (ii)
          the liability arising from any inaccuracy in the conditions,
          characteristics, and specifications of the Service and (iii) the
          Initial Price of the Service, which it is aware of beforehand and to
          which will be added any extra fees that may apply in each case.
        </p>
        <p>
          In the exceptional event that the Agent requests the contracting of a
          Service through a medium other than the Platform (by telephone, email
          or any other medium that provides a verifiable record), the provision
          of the Service will be carried out in accordance with the
          TruckDispatch T&C in force from time to time, which will have been
          accepted by the Agent when registering on the Platform.
        </p>
      </section>
      <section>
        <h5>Acceptance by the Transporter</h5>
        <p>
          Once the New Trip Order has been formalised and broadcasted on
          TruckDispatch, the Transporters registered on the Platform will be
          able to review and send bids on the trip. Nevertheless, and in order
          to meet the specific needs of the Service, TruckDispatch may directly
          offer the Service, before it is posted on the Platform, to registered
          Carriers that have previously demonstrated a high level of quality in
          the provision of their services.
        </p>
        <p>
          The transporter reserves the right to accept or reject any Carriage
          Service, at its entire discretion. Consequently, TruckDispatch does
          not guarantee the acceptance of a Shipment by a transporter and, if
          this is not accepted, TruckDispatch will notify the Agent of the lack
          of availability of Transporters, without TruckDispatch having to pay
          any amount in this regard or bear any liability whatsoever in
          connection with that Shipment.
        </p>
      </section>
      <section>
        <h3>Obligations of the Agent</h3>
        <p>
          By way of example, but without limitation, the Effective Agent's main
          obligations in respect of the Carriage Service are:
        </p>
        <div>
          <p>
            <b>(i) Filling the New Trip Order: </b>The information included in
            the New Trip Order is the sole responsibility of the Agent.
          </p>
          <p>
            In the event that specially equipped vehicles are required (e.g.,
            with controlled temperature or for hazardous goods), the Agent must
            state this accuracy, assuming the responsibility arising from any
            error or omission. In any event, the Agent expressly states that it
            is aware of and agrees that TruckDispatch has neither controlled
            temperature vehicles nor ones fitted with ADR, therefore, the Agent
            shall be fully responsible for loading goods that require transport
            in these circumstances.
          </p>
        </div>
        <div>
          <p>
            <b>
              (ii) Signing and handover of documents of carriage at the point of
              origin:{' '}
            </b>
            Make the necessary transport documents available to the Transporter
            and TruckDispatch to carry out the Carriage Service. Once the
            Transporter has collected the goods at the point of origin, the
            Agent or the Consignor, as the case may be, shall sign and deliver a
            physical copy of the Transport Documents to the Transporter; the
            merchandise is then deemed to have been delivered as per the terms
            agreed.
          </p>
          <p>
            The Client undertakes, in any case, to use the means made available
            to it by TruckDispatch for the provision of the Service (such as the
            Platform or the printing of labels).
          </p>
        </div>
        <div>
          <p>
            <b>
              (iii) Performance of the operations of loading and unloading,
              stowing, and stevedoring of the goods:{' '}
            </b>
            The Agent will bear the cost and responsibility of these operations
            unless it is expressly stated in the New Trip Order that these
            operations will be carried out by the Transporter. In the same way,
            the need for the Transporter to have transpalet/hand pallet to carry
            out these operations must be expressly stated in the New Trip Order.
          </p>
          <p>
            In any event, the Agent must make the goods available to the
            Transporter at the place and time indicated in the New Trip Order,
            assuming any responsibility that may arise from the breach of the
            foregoing.
          </p>
        </div>
        <div>
          <p>
            <b>(iv) Conditioning and labelling of goods: </b>
            The Agent is responsible for the correct packaging, packing and/or
            palletizing of the goods for transport. Likewise, it is the
            Effective Agents’s responsibility to identify the goods in
            accordance with the applicable regulations.
          </p>
        </div>
        <div>
          <p>
            <b>
              (v) Handover of the Consignment at the point of origin and
              acceptance at the destination:{' '}
            </b>
            The Agent must ensure the effective delivery of the goods to the
            Transporter by the Consignor at the place of origin, as well as the
            acceptance and receipt of the Shipment by the corresponding
            Consignee at the destination. In the event of impediments to
            delivery at the destination, the Agent shall be liable for the
            expenses and damages caused.
          </p>
          <p>
            Consequently, when the Carriage Service is not completed because the
            Consignor or the Consignee is not at the address indicated in the
            New Trip Form, because the goods are not received in the conditions
            set out in this Contractual Agreement, because of refusal to sign
            the corresponding documents of carriage, or because the Consignor or
            the Consignee does not have the technical equipment and/or human
            resources necessary for the loading, handling and unloading of the
            goods, the Agent shall bear the expenses and damages caused to the
            Transporter and TruckDispatch, as the case may be.
          </p>
          <p>
            In any case, any costs that the Transporter is obliged to pay for
            the entry to the place of Delivery shall be borne by the Agent.
          </p>
        </div>
        <div>
          <p>
            <b>(vi) Vehicle Inspection: </b>
            The Agent shall inspect the condition of the vehicle placed at its
            disposal, such as space, foul odours, or leaks, before proceeding to
            load the goods. If the Agent reasonably concludes that the vehicle
            is not acceptable, it must notify TruckDispatch immediately and
            request an alternative solution. In any event, TruckDispatch will
            understand that the Agent accepts the technical resources placed at
            its disposal at the moment it carries out the loading of the goods
            on the vehicle.
          </p>
        </div>
        <div>
          <p>
            <b>(vii) Payment for the Carriage Service: </b>
            The Agent shall pay TruckDispatch the Price in respect of the
            Carriage service. Under no circumstance shall the Agent pay the
            price to the Transporter. The Effective Agent will assume, not only
            the Price derived from the Transport Service, but also all those
            extraordinary services requested; among which are included the
            loading and unloading of goods, the stowage, handling and
            manipulation of the same, as well as any stoppages that may have
            been caused.
          </p>
        </div>
      </section>
      <section>
        <h3>Obligations of the Transporter</h3>
        <p>
          By way of example, but without limitation, the Transporter's main
          obligations in respect of the Carriage Service are:
        </p>
        <ol type="i">
          <li>
            <b>Vehicle availability: </b> The Transporter must make the vehicle
            available to the Agent at the point of origin and for the time
            specified in the Trip Order. Where applicable, the vehicle must be
            available up to the maximum time specified in Annex I.
          </li>
          <li>
            <b>Loading and unloading, stowage:</b> If expressly stated in the
            Trip Order prior to the start of the transport service, the loading
            and/or unloading, as well as the stowage of the goods to and from
            the vehicle shall be borne by and theresponsibility of the
            Transporter. Likewise, if the Trip Order provides for the obligation
            of the Transporter to have transpalet/hand pallet and the
            Transporter is unable to comply with this obligation, it must be
            notified to TruckDispatch before starting the Transport Service,
            otherwise the Transporter will be liable for any consequences
            arising from this fact. In any event, should there be any delays
            and/or standstills, the Transporter will have to wait up to the
            maximum time specified in Annex 1 for each case.
          </li>
          <li>
            <b>
              Signing and handover of documents of carriage at the point of
              origin:
            </b>
            At the moment the Transporter collects the goods at the point of
            origin, the Agent or the Consignor, where appropriate, shall sign
            and deliver a physical copy of the Transport Documents to the
            Transporter, thus considering the merchandise delivered as per the
            terms agreed. In turn, the Transporter shall sign the relevant
            Control Document on the Platform. In the event that the goods
            actually loaded do not match the details of the Service stated in
            the Shipper Order, the Transporter must notify TruckDispatch so that
            it can rectify the Control Document accordingly, the Transporter
            being liable for any and all damages arising from a failure to
            communicate such a circumstance to TruckDispatch.
          </li>
          <li>
            <b>Delivery: </b> The Transporter must deliver the goods to the
            Agent or the Consignee, where appropriate, at the destination
            indicated in the Shipper Order.
          </li>
          <li>
            <b>
              Signing and handover of documents of carriage at the destination:{' '}
            </b>
            At the moment the Transporter delivers the goods at the destination,
            the Agent or the Consignee, as the case may be, shall sign and
            deliver a physical copy of Documents to the Transporter; the
            merchandise is then deemed to have been delivered as per the terms
            agreed.
          </li>
          <li>
            <b></b>
          </li>
        </ol>
      </section>
      <section>
        <h4>Documents of Carriage</h4>
        <div>
          <h5>Transport Delivery Order</h5>
          <p>
            The Transporter would require a Transport Delivery Order before he
            can successfully load the trip. The Transport Deliver Order can be
            uploaded in the trip page.
          </p>
          <p>
            The Agent shall be liable for any harm or loss arising from any
            inaccuracy or inadequacy of the data in the Transport Delivery Order{' '}
          </p>
        </div>
      </section>
      <section>
        <h4>Prohibited Goods</h4>
        <p>
          Under no circumstances shall the Agent load the following goods on/in
          the vehicles placed at its disposal: (i) Items that are contraband or
          that are illegal, dangerous, radioactive, corrosive, flammable,
          explosive, poisonous, harmful, or offensive, (ii) live animals, (iii)
          aggregate, including stones, minerals, earth and any material from
          quarries, (iv) special transport and containers, tanks or cranes, as
          well as vehicles (caravans, trailers, pleasure craft and jet skis,
          motorcycles and mopeds), (v) cash, banknotes, commercial paper or bank
          drafts or bills exchange, bank, credit or telephone cards, securities
          and coupons of movable securities, lottery, pools and the like, (vi)
          jewellery, items sold in jewellers and watchmakers, works of art,
          precious metals, precious stones, (vii) any other goods that may be
          classified as hazardous due to its nature, due to the precautions that
          must be taken for their carriage, or, where applicable, due to the
          legal regulations that apply.
        </p>
        <p>
          The Agent shall be liable for any damage (including direct or indirect
          damage and loss of profits) or expense arising from breach of the
          foregoing, caused to both TruckDispatch and the Actual Transporter.
        </p>
      </section>
      <section>
        <h4>Liability</h4>
        <p>
          The Agent shall be solely responsible for contracting the Carriage
          Service, bearing any damage (material or moral, indirect damage, loss
          of earnings, loss of profits, interest, penalties, sanctions) against
          TruckDispatch and against third parties, as a result of, among other
          things, the breach of any obligation set out in the T&Cs or set out in
          the applicable domestic law. The Agents's liability shall consist in
          the total amount of the damages unless there is a lower limit provided
          by law.
        </p>
        <p>
          The Effective Agent assumes the payment of any type of penalty that
          the Effective Transporter may bring against it or TruckDispatch in the
          event that the Effective Transporter is forced to perform loading and
          unloading operations in contravention of the limitations, without
          prior agreement between the parties, provided that TruckDispatch has
          not been informed of this need, which must confirm the feasibility of
          the same prior to the performance of the same.
        </p>
        <p>
          The Agent agrees to defend, indemnify and hold harmless and/or release
          TruckDispatch (and its directors, employees and agents) from any
          claim, demand, loss, damage, expense and liability, including costs
          and lawyers' fees, arising from of the Agent's acts or omissions, or
          of its agents, employees or assistants, in respect of any item related
          to the contracting of the Carriage Service (i.e., its content,
          cancellation, etc.). Likewise, the Agent waives any action that it may
          bring against TruckDispatch for these items.
        </p>
        <p>
          In any event, TruckDispatch reserves the right, at the expense of the
          Agent, to undertake the defence and exclusive control of any matter
          for which the Agent must compensate it. The Agent undertakes to
          cooperate in the defence against said lawsuits, and to refrain from
          resolving or processing any matter without TruckDispatch's prior
          written consent
        </p>
      </section>
      <section>
        <h3>Price</h3>
        <h4>Initial Price</h4>
        <p>
          The transporter provides the initial price quote, and negotiations can
          occur between the transporter and agent. However, please note that
          there is a non-negotiable 7% fee for platform and business
          maintenance.
        </p>
        <h4>Final Price</h4>
        <p>
          Any incidents and expenses that may arise during the performance of
          the Service are added to the Initial Price, so that the Extras set out
          in Annex 1 are added to the said price accepted beforehand by the
          Agent, resulting in the Final Service Price. In this regard, the Agent
          understands and agrees that the Final Price shall always prevail over
          the Initial Price and is bound to pay the latter in accordance with
          the terms set out in this Contractual Agreement.
        </p>
        <p>
          In any event, TruckDispatch will inform the Agent with regard to the
          accrual of surcharges as soon as it becomes aware of the causes that
          give rise to them when reported by the Transporter or by the Agent
          itself.
        </p>
        <p>
          Notwithstanding the foregoing, the Agent is aware and agrees that, in
          the event that the initial information supplied to TruckDispatch in
          the New Trip Order proves insufficient or incorrect, the Initial Price
          will be amended accordingly, and TruckDispatch is authorised to charge
          the Agent for any additional expense arising from this circumstance
          without needing the latter's prior acceptance.
        </p>
        <p>
          The Agent agrees that the following Extras will be added to the
          Initial Price, resulting in the Final Price to be paid by the Agent
          (in accordance with the terms set out in <b>Annex 1</b>):
        </p>
        <ol type="i">
          <li>
            Standstills or delay in the goods loading and/or unloading process
            when said activity is carried out by the Agent.
          </li>
          <li>Extra pick-up or delivery during the Carriage Service.</li>
          <li>
            Greater volume of goods or substantial increase in weight over that
            stated in the New Trip Order.
          </li>
          <li>
            Loading and/or unloading, as well as the stwage of the goods, by the
            Agent with involvement of the Transporter (Cases of Additional
            Handling).
          </li>
          <li>
            Cancellation of the Carriage Service for reasons beyond the control
            of TruckDispatch or the Transporter.
          </li>
          <li>Reverse logistics (rejections/returns).</li>
          <li>Simple or additional handling.</li>
          <li>Failed collection or delivery.</li>
        </ol>
      </section>
      <section>
        <h4>Invoicing</h4>
        <h5>Issuance and Term</h5>
        <p>
          TruckDispatch would issue an invoice the moment it becomes aware of
          any outstanding bill.
        </p>
        <h5>Means of Payment</h5>
        <p>
          TruckDispatch accepts payments through our payment provider paystack.
        </p>
      </section>
    </AgentsTNCStyling>
  );
}

const AgentsTNCStyling = styled.div`
  min-height: 70vh;
  padding: ${pxToRem(160)} 0;
  width: 90%;
  margin: auto;

  * {
    font-weight: 400;
    color: var(--color-gray-600);
  }

  h2 {
    text-align: center;
    font-weight: 900;
    font-family: 'thiccboi-extrabold';
    font-size: ${pxToRem(32)};
    color: #000;
  }

  h3 {
    font-size: ${pxToRem(24)};
    font-weight: 800;
    color: #000;
  }

  h4 {
    font-size: ${pxToRem(20)};
    font-weight: 700;
    color: #000;
  }
  h5 {
    font-size: ${pxToRem(16)};
    font-weight: 600;
    color: #000;
  }
  b {
    font-weight: 600;
    color: #000;
  }
  @media only screen and (min-width: ${sizes.tabletMidWidth}) {
    width: 70%;
  }
`;
