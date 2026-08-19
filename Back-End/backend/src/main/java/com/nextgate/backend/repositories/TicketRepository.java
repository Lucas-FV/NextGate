package com.nextgate.backend.repositories;

import com.nextgate.backend.models.Ticket;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface TicketRepository extends MongoRepository<Ticket, String> {
    // Método customizado para buscar as passagens de um passageiro específico
    List<Ticket> findByPassengerId(String passengerId);
    
    // Método para buscar os assentos já ocupados de um voo
    List<Ticket> findByFlightId(String flightId);
}