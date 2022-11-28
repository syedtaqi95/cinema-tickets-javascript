import TicketTypeRequest from './lib/TicketTypeRequest.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';
import TicketPaymentService from '../thirdparty/paymentgateway/TicketPaymentService.js';
import SeatReservationService from '../thirdparty/seatbooking/SeatReservationService.js';

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */
  purchaseTickets(accountId, ...ticketTypeRequests) {
    const ticketPaymentService = new TicketPaymentService();
    const seatReservationService = new SeatReservationService();
    let numTickets = 0;
    let numSeats = 0;
    let totalCost = 0;
    let purchasedAdultTicket = false;

    // Validate accountId input
    if (!this.#isValidAccountId(accountId)) {
      throw new InvalidPurchaseException('accountId must be a positive integer');
    }

    ticketTypeRequests.map(ticketRequest => {
      // Validate ticket request type
      if (!this.#isValidTicketTypeRequest(ticketRequest, numTickets)) {
        throw new InvalidPurchaseException('ticket request must be an object of class TicketTypeRequest');
      }

      // Validate number of tickets
      numTickets += ticketRequest.getNoOfTickets();
      if (!this.#isValidNumTickets(numTickets)) {
        throw new InvalidPurchaseException(`maximum of ${this.#MAX_TICKETS} tickets can be purchased at a time`);
      }

      // If adult ticket, set flag to true
      if (ticketRequest.getTicketType() === 'ADULT') {
        purchasedAdultTicket = true;
      }
    });

    // Throw error if no adult tickets were purchased
    if (!purchasedAdultTicket) {
      throw new InvalidPurchaseException('Child or Infant tickets cannot be purchased without an Adult ticket');
    }

    return true;
  }

  #isValidAccountId = (id) => Number.isInteger(id) && id > 0;

  #isValidTicketTypeRequest = (ticketReq) => ticketReq instanceof TicketTypeRequest;

  #isValidNumTickets = (numTickets) => numTickets < this.#MAX_TICKETS;

  #ticketPrices = {
    'ADULT': 20,
    'INFANT': 0,
    'CHILD': 10
  };

  #MAX_TICKETS = 20;
}
