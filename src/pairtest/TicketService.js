import TicketTypeRequest from './lib/TicketTypeRequest.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */
  #isValidAccountId = (id) => Number.isInteger(id) && id > 0;

  purchaseTickets(accountId, ...ticketTypeRequests) {    
    // validate accountId input
    if(!this.#isValidAccountId(accountId)) {
      throw new InvalidPurchaseException('accountId must be a positive integer');
    }
  }
}
