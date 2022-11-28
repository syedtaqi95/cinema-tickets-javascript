import TicketTypeRequest from './lib/TicketTypeRequest.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */
  purchaseTickets(accountId, ...ticketTypeRequests) {
    // validate accountId input
    if (!this.#isValidAccountId(accountId)) {
      throw new InvalidPurchaseException('accountId must be a positive integer');
    }

    ticketTypeRequests.map(ticketRequest => {      
      // reject if the request is not of type TicketTypeRequest
      if(!(ticketRequest instanceof TicketTypeRequest)) {
        throw new InvalidPurchaseException('ticket request must be an object of class TicketTypeRequest');
      }


    })

    return true;
  }

  #isValidAccountId = (id) => Number.isInteger(id) && id > 0;

  #ticketPrices = {
    'ADULT': 20,
    'INFANT': 0,
    'CHILD': 10
  }
}
