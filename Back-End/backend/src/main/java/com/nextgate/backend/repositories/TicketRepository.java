package com.nextgate.backend.repositories;

import com.nextgate.backend.models.Ticket;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface TicketRepository extends MongoRepository<Ticket, String> {
    List<Ticket> findByPassangerId(String passangerId);
    List<Ticket> findByFlightId(String flightId);
}
