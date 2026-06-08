package com.nextgate.backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "bookings")
public class Booking {
   
   @Id
   private String id;
   private String passengerId;
   private String flightId;
   private LocalDateTime bookingDate;
   private BookingStatus status;
   private BigDecimal amountPaid;
   private String locatorCode;
}
