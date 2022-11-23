/* eslint-disable */
import TicketService from "../src/pairtest/TicketService";

// Create object for testing
const ticketService = new TicketService();

describe('TicketService:', () => {

  it('contains a public purchaseTickets() function', () => {
    expect(ticketService.purchaseTickets).toBeInstanceOf(Function)
  })
})