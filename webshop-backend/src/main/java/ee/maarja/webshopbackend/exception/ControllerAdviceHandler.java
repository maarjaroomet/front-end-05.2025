package ee.maarja.webshopbackend.exception;

import ee.maarja.webshopbackend.model.ErrorMessage;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Date;

@ControllerAdvice
public class ControllerAdviceHandler {

    @ExceptionHandler
    public ResponseEntity<ErrorMessage> handleException(RuntimeException e) {
        ErrorMessage errorMessage = new ErrorMessage();
        errorMessage.setMessage(e.getMessage());
        errorMessage.setStatusCode(400);
        errorMessage.setTimestamp(new Date());
        return ResponseEntity.status(400).body(errorMessage);
    }
}
