package com.onlinebanking.BankDB.service.impl;

import com.onlinebanking.BankDB.dto.UserDto;
import com.onlinebanking.BankDB.entity.User;
import com.onlinebanking.BankDB.mapper.UserMapper;
import com.onlinebanking.BankDB.repository.UserRepository;
import com.onlinebanking.BankDB.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public void changePassword(Long userId, String newPassword) {
        User user = userRepository.findByAccountId(userId);
        if (user == null) {
            throw new RuntimeException("User not found with account ID: " + userId);
        }
        user.setPassword(newPassword);
        userRepository.save(user);
    }

    @Override
    public UserDto getUserById(Long id) {
        User user = userRepository.findByAccountId(id);
        if (user != null) {
            return UserMapper.mapToUserDto(user);
        } else {
            throw new RuntimeException("User not found with account ID: " + id);
        }
    }




}
