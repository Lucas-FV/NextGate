package com.nextgate.backend.config;

import com.nextgate.backend.models.Role;
import com.nextgate.backend.models.User;
import com.nextgate.backend.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

//@Configuration
public class TestConfig {

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository) {
        return args -> {
            userRepository.deleteAll();

            User user = new User();
            user.setName("Lucas Vilela");
            user.setEmail("lucas.vilela@teste.com");
            user.setPassword("senha123");
            user.setRole(Role.PASSENGER);
            user.setDocument("12345678900");

            userRepository.save(user);
            
            System.out.println("✅ Usuário de teste salvo com sucesso no MongoDB!");
        };
    }
}