package com.nextgate.backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "tickets")
public class Ticket {

    @Id
    private String id;
    private String passengerId; // ID do usuário que comprou
    private String flightId;    // ID do voo
    private String seat;        // Assento (ex: "3A")
    private Double totalPrice;  // Valor total pago
    private LocalDateTime purchaseDate; // Data da compra

    // Construtores
    public Ticket() {}

    public Ticket(String passengerId, String flightId, String seat, Double totalPrice, LocalDateTime purchaseDate) {
        this.passengerId = passengerId;
        this.flightId = flightId;
        this.seat = seat;
        this.totalPrice = totalPrice;
        this.purchaseDate = purchaseDate;
    }

    // Getters e Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getPassengerId() { return passengerId; }
    public void setPassengerId(String passengerId) { this.passengerId = passengerId; }

    public String getFlightId() { return flightId; }
    public void setFlightId(String flightId) { this.flightId = flightId; }

    public String getSeat() { return seat; }
    public void setSeat(String seat) { this.seat = seat; }

    public Double getTotalPrice() { return totalPrice; }
    public void setTotalPrice(Double totalPrice) { this.totalPrice = totalPrice; }

    public LocalDateTime getPurchaseDate() { return purchaseDate; }
    public void setPurchaseDate(LocalDateTime purchaseDate) { this.purchaseDate = purchaseDate; }
}