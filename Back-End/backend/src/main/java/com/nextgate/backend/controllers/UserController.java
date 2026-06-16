package com.nextgate.backend.controllers;

import com.nextgate.backend.models.User;
import com.nextgate.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.nextgate.backend.dto.LoginRequest;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
   
   @Autowired
   private UserService userService;

   @PostMapping
   public ResponseEntity<?> createUser(@RequestBody User user){
      try{
         User newUser = userService.createUser(user);
         return new ResponseEntity<>(newUser, HttpStatus.CREATED);
      } catch (RuntimeException e) {
         return ResponseEntity.badRequest().body(e.getMessage());
      }
   }

   @GetMapping
   public ResponseEntity<List<User>> getAllUsers(){
      return ResponseEntity.ok(userService.getAllUsers());
   }

  @PostMapping("/login")
   public ResponseEntity<?> loginUser (@RequestBody LoginRequest loginRequest){
      try {
         User authenticatedUser = userService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());

         return ResponseEntity.ok(authenticatedUser);
      } catch (RuntimeException e) {
         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
      }
   }
}
