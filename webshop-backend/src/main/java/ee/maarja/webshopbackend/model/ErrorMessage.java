package ee.maarja.webshopbackend.model;

import lombok.Data;

import java.util.Date;

@Data
public class ErrorMessage {
    private String message;
    private int statusCode;
    private Date timestamp;
}
