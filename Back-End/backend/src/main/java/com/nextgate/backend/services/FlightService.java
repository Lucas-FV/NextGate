package com.nextgate.backend.services;

import com.nextgate.backend.models.Flight;
import com.nextgate.backend.repositories.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class FlightService {

   @Autowired
   private FlightRepository flightRepository;

   public Flight createFlight (Flight flight){
      if (flight.getDepartureTime().isBefore(LocalDateTime.now())) {
         throw new RuntimeException("A data de partida não pode ser anterior a hoje!");
      }

      if (flight.getArrivalTime().isBefore(flight.getDepartureTime())) {
         throw new RuntimeException("A data de chegada precisa ser após a data de partida!");
      }

      if (flight.getTotalCapacity() <= 0) {
         throw new RuntimeException("A capacidade total do avião precisa ser maior que zero!");
      }

      flight.setAvailableSeats(flight.getTotalCapacity());

      return flightRepository.save(flight);
   }

   public List<Flight> getAllFlights(){
      return flightRepository.findAll();
   }

   public List<Flight> getFlightByAirline (String airlineId){
      return flightRepository.findByAirlineId(airlineId);
   }
}

