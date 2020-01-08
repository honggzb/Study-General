package com.globomatics.bike.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.globomatics.bike.models.Bike;

public interface BikeRepository extends JpaRepository<Bike, Long> {
	
}
