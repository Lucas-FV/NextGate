package com.nextgate.backend.dto;

public class TicketDTO {
    
    private String id;
    private String passangerId;
    private String flightId;
    private String seat;
    private Double totalPrice;

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }

    public String getPassangerId() {
        return passangerId;
    }
    public void setPassangerId(String passangerId) {
        this.passangerId = passangerId;
    }

    public String getFlightId() {
        return flightId;
    }
    public void setFlightId(String flightId) {
        this.flightId = flightId;
    }

    public String getSeat() {
        return seat;
    }
    public void setSeat(String seat) {
        this.seat = seat;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }
    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    

}
