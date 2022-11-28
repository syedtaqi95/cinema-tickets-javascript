import TicketTypeRequest from './lib/TicketTypeRequest.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';
import TicketPaymentService from '../thirdparty/paymentgateway/TicketPaymentService.js';
import SeatReservationService from '../thirdparty/seatbooking/SeatReservationService.js';

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */
  purchaseTickets(accountId, ...ticketTypeRequests) {
    let numTickets = 0;
    let numSeats = 0;
    let totalCost = 0;
    let purchasedAdultTicket = false;

    // Validate accountId
    if (!this.#isValidAccountId(accountId)) {
      throw new InvalidPurchaseException('accountId must be a positive integer');
    }

    // Calculate total cost and number of seats
    ticketTypeRequests.map(ticketRequest => {
      // Validate ticket request type
      if (!this.#isValidTicketTypeRequest(ticketRequest, numTickets)) {
        throw new InvalidPurchaseException('ticket request must be an object of class TicketTypeRequest');
      }

      const requestedTickets = ticketRequest.getNoOfTickets();
      const requestedTicketType = ticketRequest.getTicketType();

      // If adult ticket, set flag to true
      if (requestedTicketType === 'ADULT') {
        purchasedAdultTicket = true;
      }

      // Add seats if not Infant ticket(s)
      if (requestedTicketType !== 'INFANT') {
        numSeats += requestedTickets;
      }
      numTickets += requestedTickets;
      totalCost += requestedTickets * this.#ticketPrices[requestedTicketType];
    });

    // Validate number of tickets
    if (!this.#isValidNumTickets(numTickets)) {
      throw new InvalidPurchaseException(`maximum of ${this.#MAX_TICKETS} tickets can be purchased at a time`);
    }

    // Validate at least 1 adult ticket was purchased
    if (!purchasedAdultTicket) {
      throw new InvalidPurchaseException('Child or Infant tickets cannot be purchased without an Adult ticket');
    }

    // Request seat reservations and process payment
    const seatReservationService = new SeatReservationService();
    const ticketPaymentService = new TicketPaymentService();
    seatReservationService.reserveSeat(accountId, numSeats);
    ticketPaymentService.makePayment(accountId, totalCost);

    return {
      numSeats,
      totalCost
    };
  }

  // Returns true if 'id' is a positive integer
  #isValidAccountId = (id) => Number.isInteger(id) && id > 0;

  // Returns true if ticketReq is an object of type TicketTypeRequest
  #isValidTicketTypeRequest = (ticketReq) => ticketReq instanceof TicketTypeRequest;

  // Returns true if numTickets a valid number of tickets to purchase
  #isValidNumTickets = (numTickets) => numTickets >= 0 && numTickets < this.#MAX_TICKETS;

  #ticketPrices = {
    'ADULT': 20,
    'INFANT': 0,
    'CHILD': 10
  };

  #MAX_TICKETS = 20;
}
