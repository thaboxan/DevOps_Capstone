package com.booking.repository;

import com.booking.model.Booking;
import com.booking.model.Resource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.time.LocalDateTime;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserIdAndStatusNot(Long userId, Booking.BookingStatus status);
    
    @Query("SELECT b FROM Booking b WHERE b.resource = :resource " +
           "AND b.status = 'CONFIRMED' " +
           "AND ((b.startTime BETWEEN :start AND :end) " +
           "OR (b.endTime BETWEEN :start AND :end) " +
           "OR (:start BETWEEN b.startTime AND b.endTime))")
    List<Booking> findOverlappingBookings(Resource resource, LocalDateTime start, LocalDateTime end);
}
