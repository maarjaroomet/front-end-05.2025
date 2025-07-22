package ee.maarja.webshopbackend.model;

import lombok.Data;

@Data //@Getter, @Setter, @NoArgsConstructor on seal sees olemas
public class AuthToken {
    private String token;
    private String expiration;
}
