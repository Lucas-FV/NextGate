package com.nextgate.backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "tickets")
public class Ticket{

    @Id
    private String id;
    private String passangerId;
    private String flightId;
    private String seat;
    private Double totalPrice;
    private LocalDateTime purchaseDate;

    public Ticket(){

    }

    public Ticket(String passangerId, String flightId, String seat, Double totalPrice, LocalDateTime purchaseDate) {
        this.passangerId = passangerId;
        this.flightId = flightId;
        this.seat = seat;
        this.totalPrice = totalPrice;
        this.purchaseDate = purchaseDate;
    }

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

    public LocalDateTime getPurchaseDate() {
        return purchaseDate;
    }
    public void setPurchaseDate(LocalDateTime purchaseDate) {
        this.purchaseDate = purchaseDate;
    }
}