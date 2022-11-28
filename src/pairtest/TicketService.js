import TicketTypeRequest from './lib/TicketTypeRequest.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */
  purchaseTickets(accountId, ...ticketTypeRequests) {
    // Validate accountId input
    if (!this.#isValidAccountId(accountId)) {
      throw new InvalidPurchaseException('accountId must be a positive integer');
    }

    let numTickets = 0;
    ticketTypeRequests.map(ticketRequest => {
      // Reject if the request is not of type TicketTypeRequest
      if (!(ticketRequest instanceof TicketTypeRequest)) {
        throw new InvalidPurchaseException('ticket request must be an object of class TicketTypeRequest');
      }

      // Confirm number of tickets is valid
      numTickets += ticketRequest.getNoOfTickets();
      if (numTickets > this.#MAX_TICKETS) {
        throw new InvalidPurchaseException(`maximum of ${this.#MAX_TICKETS} tickets can be purchased at a time`);
      }
    });

    return true;
  }

  #isValidAccountId = (id) => Number.isInteger(id) && id > 0;

  #ticketPrices = {
    'ADULT': 20,
    'INFANT': 0,
    'CHILD': 10
  };

  #MAX_TICKETS = 20;
}
