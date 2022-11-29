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
      ticketService.purchaseTickets('42', null);
    }).toThrow(InvalidPurchaseException);
  });

  it('throws an InvalidPurchaseException if accountId is negative', () => {
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

  it('throws an InvalidPurchaseException if there is a mix of valid and invalid ticketRequests', () => {
    const ticketReq1 = new TicketTypeRequest('ADULT', 20);
    const ticketReq2 = { type: 'ADULT', noOfTickets: 1 };
    expect(() => {
      ticketService.purchaseTickets(1, ticketReq1, ticketReq2);
    }).toThrow(InvalidPurchaseException);
  });

  it('throws an InvalidPurchaseException if over 20 tickets are purchased', () => {
    const ticketReq1 = new TicketTypeRequest('ADULT', 20);
    const ticketReq2 = new TicketTypeRequest('ADULT', 1);
    expect(() => {
      ticketService.purchaseTickets(1, ticketReq1, ticketReq2);
    }).toThrow(InvalidPurchaseException);
  });

  it('throws an InvalidPurchaseException if negative tickets are purchased', () => {
    const ticketReq1 = new TicketTypeRequest('ADULT', -2);
    const ticketReq2 = new TicketTypeRequest('ADULT', 5);
    expect(() => {
      ticketService.purchaseTickets(1, ticketReq1, ticketReq2);
    }).toThrow(InvalidPurchaseException);
  });

  it('thows an InvalidPurchaseException if no ticketTypeRequests are provided', () => {
    expect(() => {
      ticketService.purchaseTickets(1);
    }).toThrow(InvalidPurchaseException);
  });

  it('throws an InvalidPurchaseException if Child tickets are purchased without adult ticket', () => {
    const ticketReq = new TicketTypeRequest('CHILD', 2);
    expect(() => {
      ticketService.purchaseTickets(1, ticketReq);
    }).toThrow(InvalidPurchaseException);
  });

  it('throws an InvalidPurchaseException if Infant tickets are purchased without adult ticket', () => {
    const ticketReq = new TicketTypeRequest('INFANT', 2);
    expect(() => {
      ticketService.purchaseTickets(1, ticketReq);
    }).toThrow(InvalidPurchaseException);
  });

  it('is successful if 2 Adult tickets are purchased', () => {
    const ticketReq = new TicketTypeRequest('ADULT', 2);
    expect(ticketService.purchaseTickets(1, ticketReq)).toEqual({ numSeats: 2, totalCost: 40 });
  });

  it('is successful if 1 Adult and 1 Infant tickets are purchased', () => {
    const ticketReq1 = new TicketTypeRequest('ADULT', 1);
    const ticketReq2 = new TicketTypeRequest('INFANT', 1);
    expect(ticketService.purchaseTickets(1, ticketReq1, ticketReq2)).toEqual({ numSeats: 1, totalCost: 20 });
  });

  it('is successful if 1 Adult and 1 Child tickets are purchased', () => {
    const ticketReq1 = new TicketTypeRequest('ADULT', 1);
    const ticketReq2 = new TicketTypeRequest('CHILD', 1);
    expect(ticketService.purchaseTickets(1, ticketReq1, ticketReq2)).toEqual({ numSeats: 2, totalCost: 30 });
  });

  it('is successful if 1 Adult, 1 Infant, 1 Child tickets are purchased', () => {
    const ticketReq1 = new TicketTypeRequest('ADULT', 1);
    const ticketReq2 = new TicketTypeRequest('INFANT', 1);
    const ticketReq3 = new TicketTypeRequest('CHILD', 1);
    expect(ticketService.purchaseTickets(1, ticketReq1, ticketReq2, ticketReq3)).toEqual({ numSeats: 2, totalCost: 30 });
  });

});