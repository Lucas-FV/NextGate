package com.nextgate.backend.controllers;

import com.nextgate.backend.models.Flight;
import com.nextgate.backend.services.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/flights")
public class FlightController {

   @Autowired
   private FlightService flightService;

   @PostMapping
   public ResponseEntity<?> createFlight(@RequestBody Flight flight) {
      try {
         Flight newFlight = flightService.createFlight(flight);
         return new ResponseEntity<>(newFlight, HttpStatus.CREATED);
      } catch (RuntimeException e) {
         return ResponseEntity.badRequest().body(e.getMessage());
      }
   }

   @GetMapping
   public ResponseEntity<List<Flight>> getAllFlights() {
      return ResponseEntity.ok(flightService.getAllFlights());
   }

   @GetMapping("/airline/{airlineId}")
   public ResponseEntity<List<Flight>> getFlightByAirline(@PathVariable String airlineId) {
      return ResponseEntity.ok(flightService.getFlightByAirline(airlineId));
   }

   @GetMapping("/{id}")
   public ResponseEntity<Flight> getFlightById(@PathVariable String id) {
      return ResponseEntity.ok(flightService.getFlightById(id));
   }

   @PutMapping("/{id}")
   public ResponseEntity<?> updateFlight(@PathVariable String id, @RequestBody Flight flight) {
      try {
         return ResponseEntity.ok(flightService.updateFlight(id, flight));
      } catch (RuntimeException e) {
         return ResponseEntity.badRequest().body(e.getMessage());
      }
   }

   @DeleteMapping("/{id}")
   public ResponseEntity<?> deleteFlight(@PathVariable String id) {
      flightService.deleteFlight(id);
      return ResponseEntity.ok().build();
   }
}
