/* eslint-disable */
import TicketService from "../src/pairtest/TicketService";
import InvalidPurchaseException from "../src/pairtest/lib/InvalidPurchaseException";
import TicketTypeRequest from "../src/pairtest/lib/TicketTypeRequest";

// Create objects for testing
const ticketService = new TicketService();

describe('TicketService:', () => {

  it('contains a public purchaseTickets() method', () => {
    expect(ticketService.purchaseTickets).toBeInstanceOf(Function)
  })

  it('throws an InvalidPurchaseException if accountId is not a number', () => {
    expect(() => {
      ticketService.purchaseTickets('id2', null)
    }).toThrow(InvalidPurchaseException)
  })

  it('throws an InvalidPurchaseException if accountId is less than zero', () => {
    expect(() => {
      ticketService.purchaseTickets(-1, null)
    }).toThrow(InvalidPurchaseException)
  })

  it('throws an InvalidPurchaseException if ticketRequest type is incorrect', () => {
    const ticketReq = { type: 'ADULT', noOfTickets: 1 }
    expect(() => {
      ticketService.purchaseTickets(1, ticketReq)
    }).toThrow(InvalidPurchaseException)
  })

})