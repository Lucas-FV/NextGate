package com.nextgate.backend.controllers;

import com.nextgate.backend.dto.TicketDTO;
import com.nextgate.backend.models.Flight;
import com.nextgate.backend.models.Ticket;
import com.nextgate.backend.repositories.FlightRepository;
import com.nextgate.backend.repositories.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = "http://localhost:5173") 
public class TicketController {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private FlightRepository flightRepository;

    // 1. Criar uma nova passagem (Compra)
    @PostMapping
    public ResponseEntity<?> createTicket(@RequestBody TicketDTO dto) {
        
        // Passo A: Busca o Voo correspondente no banco
        Optional<Flight> flightOptional = flightRepository.findById(dto.getFlightId());
        
        if (flightOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Voo não encontrado.");
        }

        Flight flight = flightOptional.get();

        // Passo B: Verifica se o voo possui assentos disponíveis
        if (flight.getAvailableSeats() != null && flight.getAvailableSeats() <= 0) {
            return ResponseEntity.badRequest().body("Este voo já está lotado.");
        }

        // Passo C: Cria a passagem
        Ticket newTicket = new Ticket(
                dto.getPassengerId(),
                dto.getFlightId(),
                dto.getSeat(),
                dto.getTotalPrice(),
                LocalDateTime.now() // Registra o momento exato da compra
        );

        Ticket savedTicket = ticketRepository.save(newTicket);

        // Passo D: Diminui a quantidade de assentos disponíveis no voo e salva
        if (flight.getAvailableSeats() != null) {
            flight.setAvailableSeats(flight.getAvailableSeats() - 1);
            flightRepository.save(flight);
        }

        return ResponseEntity.ok(savedTicket);
    }

    // 2. Buscar passagens de um passageiro (Para o Dashboard)
    @GetMapping("/passenger/{passengerId}")
    public ResponseEntity<List<Ticket>> getTicketsByPassenger(@PathVariable String passengerId) {
        List<Ticket> tickets = ticketRepository.findByPassengerId(passengerId);
        return ResponseEntity.ok(tickets);
    }

    // 3. Buscar assentos ocupados de um voo específico (Para bloquear no React)
    @GetMapping("/flight/{flightId}")
    public ResponseEntity<List<Ticket>> getTicketsByFlight(@PathVariable String flightId) {
        List<Ticket> tickets = ticketRepository.findByFlightId(flightId);
        return ResponseEntity.ok(tickets);
    }
}