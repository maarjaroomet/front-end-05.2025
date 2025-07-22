package ee.maarja.webshopbackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private double price;

    @Column(length = 1855)
    private String description;
    //private String category;
    private String image;

    @ManyToOne
    private Category category;

    @OneToOne(cascade = CascadeType.ALL)
    private Rating rating;
}


