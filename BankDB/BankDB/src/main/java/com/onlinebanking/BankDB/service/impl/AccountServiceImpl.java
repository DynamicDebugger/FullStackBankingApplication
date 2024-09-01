package com.onlinebanking.BankDB.service.impl;

import com.onlinebanking.BankDB.dto.AccountDto;
import com.onlinebanking.BankDB.entity.Account;
import com.onlinebanking.BankDB.entity.User;
import com.onlinebanking.BankDB.mapper.AccountMapper;
import com.onlinebanking.BankDB.repository.AccountRepository;
import com.onlinebanking.BankDB.repository.UserRepository;
import com.onlinebanking.BankDB.service.AccountService;
import com.onlinebanking.BankDB.service.EmailSenderService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AccountServiceImpl implements AccountService {

    private AccountRepository accountRepository;
    private UserRepository userRepository;
    private EmailSenderService senderService;
    public AccountServiceImpl(AccountRepository accountRepository, UserRepository userRepository, EmailSenderService emailSenderService) {
        this.accountRepository = accountRepository;
        this.userRepository = userRepository; // Ensure userRepository is of type UserRepository
        this.senderService = emailSenderService;
    }


    @Override
    public AccountDto createAccount(AccountDto accountDto) {
        Account account = AccountMapper.mapToAccount(accountDto);
        Account savedAccount = accountRepository.save(account);

        // Create user-login entry
        createUserLogin(savedAccount);

        return AccountMapper.mapToAccountDto(savedAccount);
    }

    private void createUserLogin(Account account) {
        // Check if a user with the same username already exists
        User existingUser = userRepository.findByUsername(account.getEmail());
        if (existingUser == null) {
            // If user does not exist, create a new one
            User user = new User();
            user.setUsername(account.getEmail());
            user.setPassword(account.getDob());
            user.setAccount(account);
            userRepository.save(user);

        }
        //now send user-login to user email
        senderService.sendLoginDetails(account);
    }
    @Override
    public AccountDto getAccountById(Long id) {
        Account account= accountRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("Account does not exists"));
        return AccountMapper.mapToAccountDto(account);
    }

    @Override
    public AccountDto deposit(Long id, double amount) {
        Account account = accountRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("Account does not exists")
                );

        double total = account.getBalance() + amount;
        account.setBalance(total);
        Account savedAccount = accountRepository.save(account);
        return AccountMapper.mapToAccountDto(savedAccount);
    }

    @Override
    public AccountDto withdraw(Long id, double amount) {
        Account account = accountRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("Account does not exists")
                );
        double total = account.getBalance();
        if(total < amount){
            throw new RuntimeException("Insufficient balance");
        }
        total -= amount;
        account.setBalance(total);
        Account savedAccount = accountRepository.save(account);
        return AccountMapper.mapToAccountDto(savedAccount);
    }


    public List<AccountDto> getAllAccounts() {
        List<Account> accounts = accountRepository.findAll();
        return accounts.stream().map((account) -> AccountMapper.mapToAccountDto(account)).collect(Collectors.toList());
    }

    @Override
    public void deleteAccount(Long id) {
        Account account= accountRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("Account does not exists"));

        accountRepository.deleteById(id);
    }
}