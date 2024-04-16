package com.example.gamewebshop.dao;

import com.example.gamewebshop.dto.CategoryDTO;
import com.example.gamewebshop.models.Category;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CategoryDAO {

    private final CategoryRepository categoryRepository;

    public CategoryDAO(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> getAllCategories() {
        return this.categoryRepository.findAll();
    }

    public void createCategory(CategoryDTO categoryDTO) {
        this.categoryRepository.save(new Category(categoryDTO.name));
    }

    public Category getCategoryById(Long categoryId) {
        return this.categoryRepository.findById(categoryId).orElse(null);
    }

    public Category getCategoryByName(String categoryName) {
        return this.categoryRepository.findByName(categoryName);
    }

}
