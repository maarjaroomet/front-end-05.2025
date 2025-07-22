package ee.maarja.webshopbackend.repository;

import ee.maarja.webshopbackend.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<Person, Long> {
    Person findByEmail(String email);
}
