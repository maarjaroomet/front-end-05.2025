package ee.maarja.webshopbackend.controller;

import ee.maarja.webshopbackend.entity.Category;
import ee.maarja.webshopbackend.entity.Product;
import ee.maarja.webshopbackend.repository.CategoryRepository;
import ee.maarja.webshopbackend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class ProductController {

    // Dependency Injection
    @Autowired
    ProductRepository productRepository;
    @Autowired
    private CategoryRepository categoryRepository;

    //localhost:8090/products
    @GetMapping("products")
    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    @PostMapping("products")
    public List<Product> addProduct(@RequestBody Product product) {
        if(product.getId() != null) {
            throw new RuntimeException("Id must be null");
        }
        productRepository.save(product);
        return productRepository.findAll();
    }

    @PutMapping("add-all-products")
    public List<Product> addAllProductsTEST(@RequestBody List<Product> products) {
        for(Product p: products){
            String categoryName = p.getCategory().getName();
            Category category = categoryRepository.findByName(categoryName);
            p.setCategory(category);
        }
        productRepository.saveAll(products);
        return productRepository.findAll();
    }

    // DELETE localhost:8090/products?id=2
    @DeleteMapping("products")
    public List<Product> deleteProduct(@RequestParam Long id) {
        productRepository.deleteById(id);
        return productRepository.findAll();
    }

    // SET localhost:8090/products/2
    @GetMapping("products/{id}")
    public Product getProduct(@PathVariable Long id) {
        return productRepository.findById(id).orElseThrow();
    }

    // PUT localhost:8090/products + body'sse {id: 2, title: "BLA"}
    @PutMapping("products")
    public List<Product> editProduct(@RequestBody Product product) {
        if(product.getId() == null) {
            throw new RuntimeException("Id must not be null");
        }
        productRepository.save(product);
        return productRepository.findAll();
    }


}
