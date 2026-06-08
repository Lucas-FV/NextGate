package com.nextgate.backend.repositories;

import com.nextgate.backend.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
   Optional<User> findByEmail(String emaiil);
}
