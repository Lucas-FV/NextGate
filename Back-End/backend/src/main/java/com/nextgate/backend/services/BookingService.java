package com.nextgate.backend.services;

import com.nextgate.backend.models.Booking;
import com.nextgate.backend.models.BookingStatus;
import com.nextgate.backend.models.Flight;
import com.nextgate.backend.repositories.BookingRepository;
import com.nextgate.backend.repositories.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class BookingService {
   
   @Autowired
   private BookingRepository bookingRepository;

   @Autowired
   private FlightRepository flightRepository;

   public Booking createBooking (Booking booking){
      Flight flight = flightRepository.findById(booking.getFlightId())
             .orElseThrow(() -> new RuntimeException("Voo não encontrado"));
      if (flight.getAvailableSeats() <= 0) {
         throw new RuntimeException("Não há mais assentos disponíveis para este voo!");
      }

      booking.setBookingDate(LocalDateTime.now());
      booking.setAmountPaid(flight.getPrice());
      booking.setStatus(BookingStatus.CONFIRMED);

      String locator = UUID.randomUUID().toString().substring(0, 6).toUpperCase();
      booking.setLocatorCode(locator);

      flight.setAvailableSeats(flight.getAvailableSeats() - 1);
      flightRepository.save(flight);

      return bookingRepository.save(booking);
   }

   public List<Booking> getBookingsByPassenger(String passengerId){
      return bookingRepository.findByPassengerId(passengerId);
   }
   
}
