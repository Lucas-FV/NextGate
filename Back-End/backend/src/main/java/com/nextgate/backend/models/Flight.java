package com.nextgate.backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "flights")
public class Flight {
   
   @Id
   private String id;
   private String airlineId;
   private String flightNumber;
   private String origin;
   private String destination;
   private LocalDateTime departureTime;
   private LocalDateTime arrivalTime;
   private BigDecimal price;
   private Integer totalCapacity;
   private Integer availableSeats;
}
