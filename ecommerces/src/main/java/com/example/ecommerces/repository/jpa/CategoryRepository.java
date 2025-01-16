// package com.example.ecommerces.repository;

// import com.example.ecommerces.model.Category;
// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.stereotype.Repository;

// import java.util.Optional;

// @Repository
// public interface CategoryRepository extends JpaRepository<Category, Long> {

//     /**
//      * Finds a category by its name.
//      *
//      * @param name the name of the category
//      * @return an Optional containing the category if found, or empty if not
//      */
//     Optional<Category> findByName(String name);

//     /**
//      * Checks if a category exists by its name.
//      *
//      * @param name the name of the category
//      * @return true if the category exists, false otherwise
//      */
//     boolean existsByName(String name);
// }

package com.example.ecommerces.repository.jpa;

import com.example.ecommerces.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    // Add custom query methods if needed
}
