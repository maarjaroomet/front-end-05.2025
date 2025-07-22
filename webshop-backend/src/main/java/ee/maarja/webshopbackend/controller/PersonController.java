package ee.maarja.webshopbackend.controller;

import ee.maarja.webshopbackend.entity.Person;
import ee.maarja.webshopbackend.model.AuthToken;
import ee.maarja.webshopbackend.model.LoginCredentials;
import ee.maarja.webshopbackend.repository.PersonRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class PersonController {
    @Autowired
    PersonRepository personRepository;

    @PostMapping("login")
    public AuthToken login(@RequestBody LoginCredentials loginCredentials) {
        Person person = personRepository.findByEmail(loginCredentials.getEmail());
        if(person == null) {
            throw new RuntimeException("Person not found");
        }
        if(!person.getPassword().equals(loginCredentials.getPassword())) {
            throw new RuntimeException("Password not correct");
        }

        return new AuthToken();
    }

    @PostMapping("signup")
    public AuthToken signup(@RequestBody Person person) {
        personRepository.save(person);
        return new AuthToken();
    }
}
