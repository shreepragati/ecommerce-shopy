package com.example.ecommerces.controller;

import java.security.Principal;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ViewController {
    
    @RequestMapping("/user")
    public Principal user(Principal user) {
        return user;
    }
}
