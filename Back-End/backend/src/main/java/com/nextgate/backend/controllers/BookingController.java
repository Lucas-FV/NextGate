package com.nextgate.backend.controllers;

import com.nextgate.backend.models.Booking;
import com.nextgate.backend.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

   @Autowired
   private BookingService bookingService;

   @PostMapping
   public ResponseEntity<?> createBooking(@RequestBody Booking booking) {
      try {
         Booking newBooking = bookingService.createBooking(booking);
         return new ResponseEntity<>(newBooking, HttpStatus.CREATED);
      } catch (Exception e) {
         e.printStackTrace();
         return ResponseEntity.badRequest().body(e.getMessage());
      }
   }

   @GetMapping("/passenger/{passengerId}")
   public ResponseEntity<List<Booking>> getBookingsyPassenger(@PathVariable String passengerId) {
      return ResponseEntity.ok(bookingService.getBookingsByPassenger(passengerId));
   }
}
