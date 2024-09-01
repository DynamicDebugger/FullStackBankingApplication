package com.onlinebanking.BankDB.mapper;

import com.onlinebanking.BankDB.dto.UserDto;
import com.onlinebanking.BankDB.entity.User;

public class UserMapper {

    public static User mapToUser(UserDto userDto) {
        User user = new User(
                userDto.getUsername(),
                userDto.getPassword(),
                userDto.getAccount()
        );
        return user;
    }

    public static UserDto mapToUserDto(User user) {
        UserDto userDto = new UserDto(
                user.getUsername(),
                user.getPassword(),
                user.getAccount()
        );
        return userDto;
    }
}
