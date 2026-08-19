package com.nextgate.backend.dto;

public class TicketDTO {
    private String passengerId;
    private String flightId;
    private String seat;
    private Double totalPrice;

    // Getters e Setters
    public String getPassengerId() { return passengerId; }
    public void setPassengerId(String passengerId) { this.passengerId = passengerId; }

    public String getFlightId() { return flightId; }
    public void setFlightId(String flightId) { this.flightId = flightId; }

    public String getSeat() { return seat; }
    public void setSeat(String seat) { this.seat = seat; }

    public Double getTotalPrice() { return totalPrice; }
    public void setTotalPrice(Double totalPrice) { this.totalPrice = totalPrice; }
}