package com.onlinebanking.BankDB.controller;


import com.onlinebanking.BankDB.dto.AccountDto;
import com.onlinebanking.BankDB.entity.Transaction;
import com.onlinebanking.BankDB.dto.UserDto;
import com.onlinebanking.BankDB.entity.User;
import com.onlinebanking.BankDB.repository.UserRepository;
import com.onlinebanking.BankDB.service.AccountService;
import com.onlinebanking.BankDB.service.TransactionService;
//import com.onlinebanking.BankDB.service.impl.EmailServiceImpl;
import com.onlinebanking.BankDB.service.impl.TransactionServiceImpl;
import com.onlinebanking.BankDB.service.impl.UserServiceImpl;
import com.onlinebanking.BankDB.util.OtpUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {
    private AccountService accountService;
    private TransactionServiceImpl transactionService;
    private UserRepository userRepository;
    private UserServiceImpl userService;
//    private EmailServiceImpl emailService;
    @Autowired
    private OtpUtil otpUtil;

    public AccountController(AccountService accountService, TransactionServiceImpl transactionService,UserServiceImpl userService,
                             UserRepository userRepository) {
        this.accountService = accountService;
        this.transactionService = transactionService;
        this.userRepository  = userRepository;
        this.userService = userService;
//        this.emailService = emailService;
    }

    //Add account REST API
    @PostMapping
    public ResponseEntity<AccountDto> addAccount(@RequestBody AccountDto accountDto){
        AccountDto accountDto1 = accountService.createAccount(accountDto);
        Long accountId = accountDto1.getId();//Id to be refered from user-login table
        String username = accountDto.getEmail();//primary key of the user-login table if the username already exists it should not create a new user
        String password = accountDto.getDob();//initial password
        //And After creating this and stored in db a email should be sent to the user about their credentials

        return new ResponseEntity<>(accountDto1, HttpStatus.CREATED);
    }

    //Get account REST API
    @GetMapping("/{id}")
    public ResponseEntity<AccountDto> getAccountById(@PathVariable Long id){
        AccountDto accountDto = accountService.getAccountById(id);
        return ResponseEntity.ok(accountDto);
    }

    //Deposit REST API
    @PutMapping("/{id}/deposit")
    public ResponseEntity<AccountDto> deposit(@PathVariable Long id,
                                              @RequestBody Map<String, Double> request){
        Double amount = request.get("amount");
        AccountDto accountDto = accountService.deposit(id,amount);
        return ResponseEntity.ok(accountDto);
    }

    //Withdraw REST API
    @PutMapping("/{id}/withdraw")
    public ResponseEntity<AccountDto> withdraw(@PathVariable Long id,
                                               @RequestBody Map<String,Double> request){
        Double amount = request.get("amount");
        AccountDto accountDto = accountService.withdraw(id,amount);
        return ResponseEntity.ok(accountDto);
    }

    // Transfer between accounts within a bank
    @PutMapping("/transfer")
    public ResponseEntity<String> transferBetweenAccounts(@RequestBody Map<String, Object> request) {
        Long fromAccountId = Long.parseLong((String) request.get("fromAccountId"));
        Long toAccountId = Long.parseLong((String) request.get("toAccountId"));
        Long amount = Long.parseLong((String) request.get("amount"));
        String description = (String) request.get("description");

        transactionService.performTransaction(fromAccountId, toAccountId, amount, description);

        return ResponseEntity.ok("Transaction between accounts completed successfully");
    }

    //Get all transaction of User REST API
    // Get transaction history for an account
    @GetMapping("/{id}/transactions")
    public ResponseEntity<List<Transaction>> getTransactionHistoryForAccount(@PathVariable Long id) {
        List<Transaction> transactionHistory = transactionService.getTransactionHistoryForAccount(id);
        return ResponseEntity.ok(transactionHistory);
    }
    //Get all Accounts REST API
    @GetMapping
    public ResponseEntity<List<AccountDto>> getAllAccounts(){
        List<AccountDto> accounts = accountService.getAllAccounts();
        return ResponseEntity.ok(accounts);
    }

    //Delete Account REST API
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAccount(@PathVariable Long id){
        accountService.deleteAccount(id);
        return ResponseEntity.ok("Account is deleted successfully");
    }

}