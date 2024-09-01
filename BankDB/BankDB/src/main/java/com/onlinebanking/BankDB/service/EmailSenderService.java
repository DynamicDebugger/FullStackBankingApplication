package com.onlinebanking.BankDB.service;

import com.onlinebanking.BankDB.entity.Account;
import com.onlinebanking.BankDB.entity.User;
import com.onlinebanking.BankDB.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.File;

@Service
public class EmailSenderService {
    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private UserRepository userRepository;

    public void sendSimpleEmail(String toEmail,
                                String subject,
                                String body
    ) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("fromemail@gmail.com");
        message.setTo(toEmail);
        message.setText(body);
        message.setSubject(subject);
        mailSender.send(message);
        System.out.println("Mail Send...");


    }
    public void sendLoginDetails(Account account){
        String username = account.getAccountHolderName();
        String email = account.getEmail();
        String password = account.getDob();
        User user = userRepository.findByUsername(email);
        String existingUser = user.getUsername();
        String existingPassword = user.getPassword();
        if (existingUser != email){
            System.out.println(email);
            sendSimpleEmail(email,"USER-LOGIN credentials","Hello "+username+"!,\n\tHere is your login credentials\n\t\tUsername: "+email+"\n\t\tPassword: "+password+"\n\tDo change your password after logging in to your account!");
        }else{
            System.out.println(email);
            sendSimpleEmail(email,"USER-LOGIN credentials","Hey "+username+"!,\n\tYou have already have an account in The Bank UniPay and your login credentials\n\t\tUsername: "+existingUser+"\n\t\tPassword: "+existingPassword+"\n\tDo change your password after logging in to your account!");
        }
    }

}

