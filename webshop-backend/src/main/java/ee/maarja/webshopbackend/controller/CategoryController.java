package ee.maarja.webshopbackend.controller;

import ee.maarja.webshopbackend.entity.Category;
import ee.maarja.webshopbackend.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class CategoryController {

    // Dependency Injection
    @Autowired
    CategoryRepository categoryRepository;

    //localhost:8090/categories
    @GetMapping("categories")
    public List<Category> getCategories() {
        return categoryRepository.findAll();
    }

    @PostMapping("categories")
    public List<Category> addCategory(@RequestBody Category category) {
        categoryRepository.save(category);
        return categoryRepository.findAll();
    }

    @DeleteMapping("categories")
    public List<Category> deleteCategory(@RequestParam Long id){
        categoryRepository.deleteById(id);
        return categoryRepository.findAll();
    }
}
