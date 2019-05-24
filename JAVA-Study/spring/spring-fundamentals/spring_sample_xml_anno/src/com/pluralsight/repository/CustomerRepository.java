package com.pluralsight.repository;

import java.util.List;

import com.pluralsight.model.Customer;

public interface CustomerRepository {

	List<Customer> findAll();

}