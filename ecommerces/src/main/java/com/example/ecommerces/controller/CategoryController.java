// package com.example.ecommerces.controller;

// import com.example.ecommerces.model.Category;
// import com.example.ecommerces.repository.CategoryRepository;
// import org.springframework.data.domain.Page;
// import org.springframework.data.domain.PageRequest;
// import org.springframework.data.domain.Pageable;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// @RestController
// @RequestMapping("/api/categories")
// @CrossOrigin(origins = "http://localhost:5173") // Restrict to specific frontend origin
// public class CategoryController {

//     private final CategoryRepository categoryRepository;

//     public CategoryController(CategoryRepository categoryRepository) {
//         this.categoryRepository = categoryRepository;
//     }

//     /**
//      * Get paginated categories.
//      *
//      * @param page the page number (default is 0)
//      * @param size the number of items per page (default is 10)
//      * @return a paginated list of categories wrapped in a ResponseEntity
//      */
//     @GetMapping
//     public ResponseEntity<Page<Category>> getCategories(
//             @RequestParam(defaultValue = "0") int page,
//             @RequestParam(defaultValue = "10") int size
//     ) {
//         try {
//             Pageable pageable = PageRequest.of(page, size);
//             Page<Category> categories = categoryRepository.findAll(pageable);
//             if (categories.isEmpty()) {
//                 return ResponseEntity.noContent().build(); // HTTP 204 if no categories found
//             }
//             return ResponseEntity.ok(categories); // HTTP 200 with paginated categories
//         } catch (Exception e) {
//             return ResponseEntity.status(500).body(null); // HTTP 500 for server error
//         }
//     }
// }

package com.example.ecommerces.controller;

import com.example.ecommerces.model.Category;
import com.example.ecommerces.repository.jpa.CategoryRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryRepository categoryRepository;

    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @GetMapping
    public Page<Category> getAllCategories(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return categoryRepository.findAll(PageRequest.of(page, size));
    }

    // Additional endpoints (create, update, delete) as needed
}
