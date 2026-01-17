package org.cineticket.controller;

import org.cineticket.dto.BookingRequest;
import org.cineticket.entity.Booking;
import org.cineticket.entity.Movie;
import org.cineticket.entity.User;
import org.cineticket.repository.BookingRepository;
import org.cineticket.repository.MovieRepository;
import org.cineticket.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    private final BookingRepository bookingRepo;
    private final MovieRepository movieRepo;
    private final UserRepository userRepo;

    public BookingController(
            BookingRepository bookingRepo,
            MovieRepository movieRepo,
            UserRepository userRepo
    ) {
        this.bookingRepo = bookingRepo;
        this.movieRepo = movieRepo;
        this.userRepo = userRepo;
    }

    // ===============================
    // BOOK MOVIE
    // POST /bookings
    // ===============================
    @PostMapping
    public Booking book(@RequestBody BookingRequest request,
                        Principal principal) {

        User user = userRepo
                .findByUsername(principal.getName())
                .orElseThrow();

        Movie movie = movieRepo
                .findById(request.getMovieId())
                .orElseThrow();

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setMovie(movie);
        booking.setTickets(request.getTickets());
        booking.setStatus("Booked");

        return bookingRepo.save(booking);
    }

    // ===============================
    // MY BOOKINGS
    // GET /bookings/my
    // ===============================
    @GetMapping("/my")
    public List<Booking> myBookings(Principal principal) {
        return bookingRepo.findByUserUsername(principal.getName());
    }

    // ===============================
    // ALL BOOKINGS (ADMIN / DEBUG)
    // GET /bookings
    // ===============================
    @GetMapping
    public List<Booking> allBookings() {
        return bookingRepo.findAll();
    }
}
