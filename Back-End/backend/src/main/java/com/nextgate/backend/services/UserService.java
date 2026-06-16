package com.nextgate.backend.services;

import com.nextgate.backend.models.User;
import com.nextgate.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
   
   @Autowired
   private UserRepository userRepository;

   public User createUser(User user){
      Optional<User> existingUser = userRepository.findByEmail(user.getEmail());

      if (existingUser.isPresent()){
         throw new RuntimeException("Este e-mail já está cadastrado no sistema!");
      }

      return userRepository.save(user);
   }

   public List<User> getAllUsers(){
      return userRepository.findAll();
   }

   public User authenticate(String email, String password){
      User user = userRepository.findByEmail(email)
      .orElseThrow(() ->new RuntimeException("E-mail ou senha incorretos."));

      if (!user.getPassword().equals(password)) {
         throw new RuntimeException("E-mail ou senha incorretos.");
      }

      return user;
   }
}
