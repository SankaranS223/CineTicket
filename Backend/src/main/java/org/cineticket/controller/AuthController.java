package org.cineticket.controller;

import org.cineticket.dto.LoginRequest;
import org.cineticket.dto.LoginResponse;
import org.cineticket.entity.User;
import org.cineticket.repository.UserRepository;
import org.cineticket.security.JwtUtil;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserRepository repo;
    private final JwtUtil jwt;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public AuthController(UserRepository repo, JwtUtil jwt) {
        this.repo = repo;
        this.jwt = jwt;
    }

    @PostMapping("/register")
    public User register(@RequestBody User u) {
        u.setPassword(encoder.encode(u.getPassword()));
        if (u.getRole() == null) {
            u.setRole("ROLE_USER");
        }
        return repo.save(u);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest req) {

        System.out.println("LOGIN HIT");

        User u = repo.findByUsername(req.getUsername())
                .orElseThrow(() ->
                        new RuntimeException("Invalid username or password"));

        if (!encoder.matches(req.getPassword(), u.getPassword())) {
            throw new RuntimeException("Invalid username or password");
        }

        return new LoginResponse(
                jwt.generateToken(u.getUsername(), u.getRole())
        );
    }
}
