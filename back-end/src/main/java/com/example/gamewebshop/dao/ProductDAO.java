package com.example.gamewebshop.dao;

import com.example.gamewebshop.dto.ProductDTO;
import com.example.gamewebshop.models.Product;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Component
public class ProductDAO {

    private final GamesRepository gamesRepository;
    private final CategoryRepository categoryRepository;

    public ProductDAO(GamesRepository repository, CategoryRepository category) {
        this.gamesRepository = repository;
        this.categoryRepository = category;
    }

    public List<Product> getAllProducts(){
        return this.gamesRepository.findAll();
    }

    public Product getProductById(long id){
        Optional<Product> product = this.gamesRepository.findById(id);

        return product.orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "No product found with that id"
        ));
    }

    public List<Product> getAllProductsByCategory(long id){
        Optional<List<Product>> products =this.gamesRepository.findByCategoryId(id);

        if (products.get().isEmpty()){
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "No products found with that category id"
            );
        }

        return products.get();
    }


    @Transactional
    public void createProduct(Product product){
        this.categoryRepository.save(product.getCategory());
        this.gamesRepository.save(product);
    }

    public void updateProduct(ProductDTO productDTO, Long id){
        Optional<Product> productOptional = this.gamesRepository.findById(id);
        if (productOptional.isPresent()) {
            Product product = productOptional.get();
            product.setDescription(productDTO.getDescription());
            product.setName(productDTO.getName());
            this.gamesRepository.save(product);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found with id: " + id);
        }
    }


    public void deleteById(Long id) {
        this.gamesRepository.deleteById(id);
    }


}
