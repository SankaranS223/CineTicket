package org.cineticket.controller;

import org.cineticket.repository.MovieRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/movies")
public class MovieController {

    private final MovieRepository repo;
    public MovieController(MovieRepository r){ repo = r; }

    @GetMapping
    public Object all(){
        return repo.findAll();
    }
}
