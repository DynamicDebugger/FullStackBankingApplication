package com.onlinebanking.BankDB.service;

import com.onlinebanking.BankDB.dto.UserDto;

public interface UserService {
    void changePassword(Long userId, String newPassword);
    UserDto getUserById(Long id);
}
