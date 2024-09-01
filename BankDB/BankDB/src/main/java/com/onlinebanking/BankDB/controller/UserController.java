package com.onlinebanking.BankDB.controller;

import com.onlinebanking.BankDB.dto.UserDto;
import com.onlinebanking.BankDB.entity.User;
import com.onlinebanking.BankDB.mapper.UserMapper;
import com.onlinebanking.BankDB.repository.UserRepository;
import com.onlinebanking.BankDB.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;

    @Autowired
    public UserController(UserService userService, UserRepository userRepository)
    {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    //Get mapping to fetch the User-login details REST API
    @RequestMapping(value = "/{userId}", method = RequestMethod.GET)
    public ResponseEntity<UserDto> returnAccountID(@PathVariable Long userId) {
        User user = userRepository.findByAccountId(userId);
        if (user != null) {
            return ResponseEntity.ok(UserMapper.mapToUserDto(user));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //Change password Account REST API
    @PutMapping("/{userId}/password")
    public ResponseEntity<String> changePassword(@PathVariable Long userId,
                                                 @RequestBody Map<String, String> requestBody) {
        String newPassword = requestBody.get("newPassword");
        userService.changePassword(userId, newPassword);
        return ResponseEntity.status(HttpStatus.OK).body("Password changed successfully");
    }

}
