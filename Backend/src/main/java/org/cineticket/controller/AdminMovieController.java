package org.cineticket.controller;

import org.cineticket.entity.Movie;
import org.cineticket.repository.MovieRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/movies")
public class AdminMovieController {

    private final MovieRepository repo;
    public AdminMovieController(MovieRepository r){ repo = r; }

    @PostMapping
    public Movie add(@RequestBody Movie m){ return repo.save(m); }

    @PutMapping("/{id}")
    public Movie update(@PathVariable Long id, @RequestBody Movie m){
        m.setId(id);
        return repo.save(m);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        repo.deleteById(id);
    }
}
