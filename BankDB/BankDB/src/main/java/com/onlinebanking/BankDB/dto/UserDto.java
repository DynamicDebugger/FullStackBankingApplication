package com.onlinebanking.BankDB.dto;

import com.onlinebanking.BankDB.entity.Account;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserDto {
    private String username;
    private String password;
    private Account account;
}
