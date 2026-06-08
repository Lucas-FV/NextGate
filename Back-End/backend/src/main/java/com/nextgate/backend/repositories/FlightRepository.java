package com.nextgate.backend.repositories;

import com.nextgate.backend.models.Flight;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FlightRepository extends MongoRepository<Flight, String>{
   
   List<Flight> findByAirlineId(String airlineId);

   List<Flight> findByOriginAndDestination(String origin, String destination);
}
