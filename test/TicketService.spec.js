/* eslint-disable */
import TicketService from "../src/pairtest/TicketService";
import InvalidPurchaseException from "../src/pairtest/lib/InvalidPurchaseException";
import TicketTypeRequest from "../src/pairtest/lib/TicketTypeRequest";

// Create object for testing
const ticketService = new TicketService();

describe('TicketService:', () => {

  it('contains a public purchaseTickets() method', () => {
    expect(ticketService.purchaseTickets).toBeInstanceOf(Function);
  });

  it('throws an InvalidPurchaseException if accountId is not a number', () => {
    expect(() => {
      ticketService.purchaseTickets('id2', null);
    }).toThrow(InvalidPurchaseException);
  });

  it('throws an InvalidPurchaseException if accountId is less than zero', () => {
    expect(() => {
      ticketService.purchaseTickets(-1, null);
    }).toThrow(InvalidPurchaseException);
  });

  it('throws an InvalidPurchaseException if ticketRequest type is incorrect', () => {
    const ticketReq = { type: 'ADULT', noOfTickets: 1 };
    expect(() => {
      ticketService.purchaseTickets(1, ticketReq);
    }).toThrow(InvalidPurchaseException);
  });

  it('throws an InvalidPurchaseException if over 20 tickets are purchased', () => {
    const ticketReq1 = new TicketTypeRequest('ADULT', 20);
    const ticketReq2 = new TicketTypeRequest('ADULT', 1);
    expect(() => {
      ticketService.purchaseTickets(1, ticketReq1, ticketReq2);
    }).toThrow(InvalidPurchaseException);
  });

  it('throws an InvalidPurchaseException if child tickets are purchased without adult ticket', () => {
    const ticketReq = new TicketTypeRequest('CHILD', 2);
    expect(() => {
      ticketService.purchaseTickets(1, ticketReq);
    }).toThrow(InvalidPurchaseException);
  });

  it('throws an InvalidPurchaseException if infant tickets are purchased without adult ticket', () => {
    const ticketReq = new TicketTypeRequest('INFANT', 2);
    expect(() => {
      ticketService.purchaseTickets(1, ticketReq);
    }).toThrow(InvalidPurchaseException);
  });

  it('is successful if 2 Adult tickets are purchased', () => {
    const ticketReq = new TicketTypeRequest('ADULT', 2);
    expect(ticketService.purchaseTickets(1, ticketReq)).toEqual({ numSeats: 2, totalCost: 40 });
  });



});