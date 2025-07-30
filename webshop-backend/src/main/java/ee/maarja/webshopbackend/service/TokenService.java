package ee.maarja.webshopbackend.service;

import ee.maarja.webshopbackend.entity.Person;
import ee.maarja.webshopbackend.model.AuthToken;
import ee.maarja.webshopbackend.repository.PersonRepository;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;

@Service
@Log4j2
public class TokenService {
    String superSecretKey = "smalC6JwzwCVELsVKAScNJNrXoEKxrWEZu3yFDcyQbU";
    SecretKey secretKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(superSecretKey));

    @Autowired
    PersonRepository personRepository;

    public AuthToken generateToken(Person person) {
        AuthToken authToken = new AuthToken();

        //20 minuti pärast aegub                                ms   s    minutid
        Date expirationDate = new Date(new Date().getTime() + 1800 * 60 * 20 );

        String token = Jwts.builder()
                .subject(person.getId().toString())
                .expiration(expirationDate)
                .signWith(secretKey)
                .compact();

        authToken.setToken(token);

        return authToken;
    }

    public Person validateToken(String token) {
        String subject = null;
        try {
            subject = Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().getSubject();
        } catch (Exception e) {
            //System.out.println(e.getMessage());
            log.info(e.getMessage());

            //System.out.println("Juhtus tokeniga viga");
            //log.info("Juhtus tokeniga viga");
            throw new RuntimeException(e.getMessage());
        }
        Long id = Long.parseLong(subject);
        return personRepository.findById(id).orElseThrow();
    }
}
