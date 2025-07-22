package ee.maarja.webshopbackend.model;

import lombok.Data;

@Data
public class LoginCredentials {
    private String email;
    private String password;
}
