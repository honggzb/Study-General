package com.boot.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.boot.model.Shipwreck;

public interface ShipwreckRepository extends JpaRepository<Shipwreck, Long> {

}
