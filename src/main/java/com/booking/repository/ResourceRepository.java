package com.booking.repository;

import com.booking.model.Resource;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ResourceRepository extends JpaRepository<Resource, Long> {
    List<Resource> findByTypeAndActiveTrue(Resource.ResourceType type);
}
